import {
  DataTypes, InferAttributes, InferCreationAttributes, Model,
} from 'sequelize';

import { db } from '@db/Connection';
import { Tournaments } from './Tournaments';

export interface RoundItem extends Record<string, unknown> {
  id: number;
  order: number;
  teamRepeat: boolean;
  roundRepeat: boolean;
}

export interface RoundModel extends Model<InferAttributes<RoundModel>, InferCreationAttributes<RoundModel>>, RoundItem {}

export const Rounds = db.define<RoundModel>(
  'rounds',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    order: {
      type: DataTypes.INTEGER,
      unique: true,
    },
    teamRepeat: {
      type: DataTypes.BOOLEAN,
    },
    roundRepeat: {
      type: DataTypes.BOOLEAN,
    },
  },
  { underscored: true, timestamps: false },
);

Rounds.belongsTo(Tournaments, { foreignKey: 'tournamentId', as: 'tournament' });
Tournaments.hasMany(Rounds, { as: 'rounds' });
