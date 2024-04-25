import {
  DataTypes, InferAttributes, InferCreationAttributes, Model,
} from 'sequelize';
import { db } from '@db/Connection';

import { Countries } from './Countries';

export interface StateItem extends Record<string, unknown> {
  id: number;
  name: string;
}

export interface StateModel extends Model<InferAttributes<StateModel>, InferCreationAttributes<StateModel>>, StateItem {}

export const States = db.define<StateModel>(
  'states',
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

States.belongsTo(Countries, { foreignKey: 'countryId', as: 'country' });
Countries.hasMany(States, { as: 'states' });
