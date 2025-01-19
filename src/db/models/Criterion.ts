import {
  DataTypes, InferAttributes, InferCreationAttributes, Model,
} from 'sequelize';

import { db } from '@db/Connection';

export interface CriterionItem extends Record<string, unknown> {
  id: number;
  name: string;
  value: number;
}

export interface CriterionModel extends Model<InferAttributes<CriterionModel>, InferCreationAttributes<CriterionModel>>, CriterionItem {}

export const Criterions = db.define<CriterionModel>(
  'criterions',
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
    value: {
      type: DataTypes.INTEGER,
    },
  },
  { underscored: true, timestamps: false },
);
