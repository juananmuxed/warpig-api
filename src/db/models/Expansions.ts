import {
  DataTypes, InferAttributes, InferCreationAttributes, Model,
} from 'sequelize';

import { db } from '@db/Connection';
import { Armies } from './Armies';

export interface ExpansionItem extends Record<string, unknown> {
  id: number;
  name: string;
}

export interface ExpansionModel extends Model<InferAttributes<ExpansionModel>, InferCreationAttributes<ExpansionModel>>, ExpansionItem {}

export const Expansions = db.define<ExpansionModel>(
  'expansions',
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

Armies.belongsTo(Expansions, { foreignKey: 'expansionId', as: 'expansion' });
Expansions.hasMany(Armies, { as: 'armies' });
