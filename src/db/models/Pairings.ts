import {
  DataTypes, InferAttributes, InferCreationAttributes, Model,
} from 'sequelize';

import { db } from '@db/Connection';
import { Rounds } from './Rounds';
import { Participants } from './Participants';
import { Criterions } from './Criterion';

export interface PairingItem extends Record<string, unknown> {
  id: number;
  teamRedValue: number;
  teamBlueValue: number;
}

export interface PairingModel extends Model<InferAttributes<PairingModel>, InferCreationAttributes<PairingModel>>, PairingItem {}

export const Pairings = db.define<PairingModel>(
  'pairings',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    teamRedValue: {
      type: DataTypes.INTEGER,
    },
    teamBlueValue: {
      type: DataTypes.INTEGER,
    },
  },
  { underscored: true, timestamps: false },
);

Pairings.belongsTo(Rounds, { foreignKey: 'roundId', as: 'round' });
Rounds.hasMany(Pairings, { as: 'pairings' });

export const ParticipantsPairingsRed = db.define(
  'participants_pair_red',
  {
    participantId: {
      type: DataTypes.INTEGER,
      references: {
        model: Participants,
        key: 'id',
      },
    },
    pairingId: {
      type: DataTypes.INTEGER,
      references: {
        model: Pairings,
        key: 'id',
      },
    },
  },
  { underscored: true, timestamps: false },
);

Pairings.belongsToMany(Participants, { through: ParticipantsPairingsRed, as: 'participantsRed' });
Participants.belongsToMany(Pairings, { through: ParticipantsPairingsRed, as: 'pairingsRed' });

export const ParticipantsPairingsBlue = db.define(
  'participants_pair_blue',
  {
    participantId: {
      type: DataTypes.INTEGER,
      references: {
        model: Participants,
        key: 'id',
      },
    },
    pairingId: {
      type: DataTypes.INTEGER,
      references: {
        model: Pairings,
        key: 'id',
      },
    },
  },
  { underscored: true, timestamps: false },
);

Pairings.belongsToMany(Participants, { through: ParticipantsPairingsBlue, as: 'participantsBlue' });
Participants.belongsToMany(Pairings, { through: ParticipantsPairingsBlue, as: 'pairingsBlue' });

export const CriterionPairingsRed = db.define(
  'criterion_pair_red',
  {
    criterionId: {
      type: DataTypes.INTEGER,
      references: {
        model: Criterions,
        key: 'id',
      },
    },
    pairingId: {
      type: DataTypes.INTEGER,
      references: {
        model: Pairings,
        key: 'id',
      },
    },
  },
  { underscored: true, timestamps: false },
);

Pairings.belongsToMany(Criterions, { through: CriterionPairingsRed, as: 'criterionsRed' });
Criterions.belongsToMany(Pairings, { through: CriterionPairingsRed, as: 'pairingsRed' });

export const CriterionPairingsBlue = db.define(
  'criterion_pair_blue',
  {
    criterionId: {
      type: DataTypes.INTEGER,
      references: {
        model: Criterions,
        key: 'id',
      },
    },
    pairingId: {
      type: DataTypes.INTEGER,
      references: {
        model: Pairings,
        key: 'id',
      },
    },
  },
  { underscored: true, timestamps: false },
);

Pairings.belongsToMany(Criterions, { through: CriterionPairingsBlue, as: 'criterionsBlue' });
Criterions.belongsToMany(Pairings, { through: CriterionPairingsBlue, as: 'pairingsBlue' });
