import {
  DataTypes, InferAttributes, InferCreationAttributes, Model,
} from 'sequelize';
import { db } from '@db/Connection';

import { Users } from './Users';

export interface TeamItem extends Record<string, unknown> {
  id: number;
  name: string;
}

export interface TeamModel extends Model<InferAttributes<TeamModel>, InferCreationAttributes<TeamModel>>, TeamItem {}

export const Teams = db.define<TeamModel>(
  'teams',
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
Users.belongsTo(Teams, { foreignKey: 'teamId', as: 'team' });
Teams.hasMany(Users, { as: 'users' });
