import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'sequelize';

import {
  getPagination, getOrder, pagedResponse,
} from '@controllers/utils/Pagination';
import { UserItem, UserModel, Users } from '@db/models/Users';
import { ERRORS } from '@config/data/Errors';
import { TypedRequest } from '@db/models/common/ExpressTypes';
import { Roles } from '@db/models/Roles';
import { Teams } from '@db/models/Teams';
import { PaginationQuery } from '@models/Pagination';
import { InternalError } from '@models/errors/InternalError';
import { NotFoundError } from '@models/errors/NotFoundError';

const include = [
  {
    model: Roles,
    as: 'role',
  },
  {
    model: Teams,
    as: 'team',
  },
];

export class UsersController {
  getUsers = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await Users.findAll({
        include,
      });

      res.json(users);
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError));
    }
  };

  getUsersPaginated = async (
    req: Request<Record<string, never>, Record<string, never>, Record<string, never>, PaginationQuery>,
    res: Response,
    next: NextFunction,
  ) => {
    const {
      page, rowsPerPage, sortBy, descending,
    } = req.query;
    try {
      const pagination = getPagination(page, rowsPerPage);
      const order = getOrder(sortBy, descending, Users.getAttributes());

      const pagedUsers = await Users.findAndCountAll({
        include,
        ...pagination,
        distinct: true,
        order,
      });

      res.json(pagedResponse<UserModel>(pagedUsers, pagination, order));
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError));
    }
  };

  createUser = async (req: TypedRequest<UserItem>, res: Response, next: NextFunction) => {
    const { body } = req;

    try {
      const newUser = await Users.create(body);

      res.status(201).json(newUser);
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError));
    }
  };

  updateUser = async (req: TypedRequest<UserItem>, res: Response, next: NextFunction) => {
    const { body } = req;

    try {
      const user = await Users.findByPk(body.id);

      if (!user) next(new NotFoundError(ERRORS.NOT_FOUND('User')));

      const newUser = await user?.update(body);

      res.json(newUser);
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError));
    }
  };

  deleteUser = async (req: TypedRequest<UserItem>, res: Response, next: NextFunction) => {
    const { body } = req;

    try {
      const user = await Users.findByPk(body.id);

      if (!user) next(new NotFoundError(ERRORS.NOT_FOUND('User')));

      const newUser = await user?.destroy();

      res.json(newUser);
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError));
    }
  };
}
