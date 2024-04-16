import {
  DataTypes, InferAttributes, InferCreationAttributes, Model,
} from 'sequelize';

import { db } from '@db/Connection';
import { Armies } from './Armies';
import { Users } from './Users';
import { Tournaments } from './Tournaments';

export interface ParticipantItem extends Record<string, unknown> {
  id: number;
}

export interface ParticipantModel extends Model<InferAttributes<ParticipantModel>, InferCreationAttributes<ParticipantModel>>, ParticipantItem {}

export const Participants = db.define<ParticipantModel>(
  'participants',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  { underscored: true, timestamps: false },
);

Participants.belongsTo(Armies, { foreignKey: 'armyId', as: 'army' });
Armies.hasMany(Participants, { as: 'participants' });

Participants.belongsTo(Users, { foreignKey: 'userId', as: 'user' });
Users.hasMany(Participants, { as: 'participants' });

Participants.belongsTo(Tournaments, { foreignKey: 'tournamentId', as: 'tournament' });
Tournaments.hasMany(Participants, { as: 'participants' });
