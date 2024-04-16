import {
  DataTypes, InferAttributes, InferCreationAttributes, Model,
} from 'sequelize';

import { db } from '@db/Connection';
import { Expansions } from './Expansions';

export interface GameItem extends Record<string, unknown> {
  id: number;
  name: string;
}

export interface GameModel extends Model<InferAttributes<GameModel>, InferCreationAttributes<GameModel>>, GameItem {}

export const Games = db.define<GameModel>(
  'games',
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
  },
  { underscored: true, timestamps: false },
);

Expansions.belongsTo(Games, { foreignKey: 'gameId', as: 'game' });
Games.hasMany(Expansions, { as: 'expansions' });
