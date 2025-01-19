import {
  DataTypes, InferAttributes, InferCreationAttributes, Model,
} from 'sequelize';

import { db } from '@db/Connection';

export interface CountryItem extends Record<string, unknown> {
  id: number;
  name: string;
}

export interface CountryModel extends Model<InferAttributes<CountryModel>, InferCreationAttributes<CountryModel>>, CountryItem {}

export const Countries = db.define<CountryModel>(
  'countries',
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
