import {
  DataTypes, InferAttributes, InferCreationAttributes, Model,
} from 'sequelize';
import { db } from '@db/Connection';
import { TOURNAMENT_TYPES } from '@db/data/TournamentTypes';

import { Countries } from './Countries';
import { States } from './States';
import { Games } from './Games';
import { Expansions } from './Expansions';
import { Criterions } from './Criterion';
import { Users } from './Users';

export type TournamentTypesCodes = typeof TOURNAMENT_TYPES[number];

export interface TournamentItem extends Record<string, unknown> {
  id: number;
  name: string;
  date: Date;
}

export interface TournamentModel extends Model<InferAttributes<TournamentModel>, InferCreationAttributes<TournamentModel>>, TournamentItem {}

export const Tournaments = db.define<TournamentModel>(
  'tournaments',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      unique: true,
    },
    date: {
      type: DataTypes.DATE(),
    },
  },
  { underscored: true, timestamps: false },
);

export interface TournamentTypeItem extends Record<string, unknown> {
  id: number;
  name: string;
  code: TournamentTypesCodes;
}

export interface TournamentTypeModel extends Model<InferAttributes<TournamentTypeModel>, InferCreationAttributes<TournamentTypeModel>>, TournamentTypeItem {}

export const TournamentTypes = db.define<TournamentTypeModel>(
  'tournament_types',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      unique: true,
    },
    code: {
      type: DataTypes.STRING(40),
    },
  },
  { underscored: true, timestamps: false },
);

export const ExpansionsTournaments = db.define(
  'expansions_tournaments',
  {
    expansionId: {
      type: DataTypes.INTEGER,
      references: {
        model: Expansions,
        key: 'id',
      },
    },
    tournamentId: {
      type: DataTypes.INTEGER,
      references: {
        model: Tournaments,
        key: 'id',
      },
    },
  },
  { underscored: true, timestamps: false },
);

Tournaments.belongsToMany(Expansions, { through: ExpansionsTournaments, as: 'expansions' });
Expansions.belongsToMany(Tournaments, { through: ExpansionsTournaments, as: 'tournaments' });

export const CriterionsTournaments = db.define(
  'criterions_tournaments',
  {
    criterionId: {
      type: DataTypes.INTEGER,
      references: {
        model: Criterions,
        key: 'id',
      },
    },
    tournamentId: {
      type: DataTypes.INTEGER,
      references: {
        model: Tournaments,
        key: 'id',
      },
    },
  },
  { underscored: true, timestamps: false },
);

Tournaments.belongsToMany(Criterions, { through: CriterionsTournaments, as: 'criterions' });
Criterions.belongsToMany(Tournaments, { through: CriterionsTournaments, as: 'tournaments' });

Tournaments.belongsTo(Games, { foreignKey: 'gameId', as: 'game' });
Games.hasMany(Tournaments, { as: 'tournaments' });

Tournaments.belongsTo(TournamentTypes, { foreignKey: 'typeId', as: 'type' });
TournamentTypes.hasMany(Tournaments, { as: 'tournaments' });

Tournaments.belongsTo(Countries, { foreignKey: 'countryId', as: 'country' });
Countries.hasMany(Tournaments, { as: 'tournaments' });

Tournaments.belongsTo(States, { foreignKey: 'stateId', as: 'state' });
States.hasMany(Tournaments, { as: 'tournaments' });

Tournaments.belongsTo(Users, { foreignKey: 'userId', as: 'creator' });
Users.hasMany(Tournaments, { as: 'tournaments' });
