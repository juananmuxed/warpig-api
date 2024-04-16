import {
  DataTypes, InferAttributes, InferCreationAttributes, Model,
} from 'sequelize';

import { db } from '@db/Connection';

export interface ArmyItem extends Record<string, unknown> {
  id: number;
  name: string;
}

export interface ArmyModel extends Model<InferAttributes<ArmyModel>, InferCreationAttributes<ArmyModel>>, ArmyItem {}

export const Armies = db.define<ArmyModel>(
  'armies',
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
