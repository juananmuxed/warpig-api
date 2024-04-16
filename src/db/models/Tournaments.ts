import {
  DataTypes, InferAttributes, InferCreationAttributes, Model,
} from 'sequelize';

import { db } from '@db/Connection';
import { Countries } from './Countries';
import { States } from './States';
import { Games } from './Games';
import { Expansions } from './Expansions';

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

Tournaments.belongsTo(Games, { foreignKey: 'gameId', as: 'game' });
Games.hasMany(Tournaments, { as: 'tournaments' });

Tournaments.belongsTo(Countries, { foreignKey: 'countryId', as: 'country' });
Countries.hasMany(Tournaments, { as: 'tournaments' });

Tournaments.belongsTo(States, { foreignKey: 'stateId', as: 'state' });
States.hasMany(Tournaments, { as: 'tournaments' });
