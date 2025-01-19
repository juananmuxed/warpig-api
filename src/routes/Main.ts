import { Application } from 'express';

import usersRoutes from '@routes/users/Users';
import rolesRoutes from '@routes/users/Roles';
import tournamentRoutes from '@routes/tournaments/Tournaments';
import authenticationRoutes from '@routes/auth/Auth';

export const PATHS = [
  'docs',
  'users',
  'roles',
  'tournaments',
  'authentication',
] as const;

type ApiPaths = typeof PATHS[number];

const rootPath = '/api/';
export const apiPaths: Record<ApiPaths, string> = {
  docs: `${rootPath}docs`,
  users: `${rootPath}users`,
  roles: `${rootPath}roles`,
  tournaments: `${rootPath}tournaments`,
  authentication: `${rootPath}auth`,
};

export const setRoutes = (app: Application) => {
  app.use(apiPaths.users, usersRoutes);
  app.use(apiPaths.roles, rolesRoutes);
  app.use(apiPaths.authentication, authenticationRoutes);
  app.use(apiPaths.tournaments, tournamentRoutes);
};
