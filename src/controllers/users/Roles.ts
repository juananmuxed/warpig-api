import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'sequelize';
import { getPagination, getOrder, pagedResponse } from '@controllers/utils/Pagination';
import { RoleItem, RoleModel, Roles } from '@db/models/Roles';
import { InternalError, NotFoundError } from '@models/Errors';
import { ERRORS } from '@config/data/Errors';
import { TypedRequest } from '@db/models/common/ExpressTypes';
import { Pagination } from '@models/Pagination';

export class RolesController {
  getRoles = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const roles = await Roles.findAll();

      res.json(roles);
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError));
    }
  };

  getRolesPaginated = async (req: TypedRequest<Pagination>, res: Response, next: NextFunction) => {
    const {
      page, rowsPerPage, sortBy, descending,
    } = req.query;

    try {
      const pagination = getPagination(Number(page), Number(rowsPerPage));
      const order = getOrder(sortBy?.toString(), descending?.toString());

      const pagedRoles = await Roles.findAndCountAll({
        ...pagination,
        distinct: true,
        order,
      });

      res.json(pagedResponse<RoleModel>(pagedRoles, pagination, order));
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError));
    }
  };

  createRole = async (req: TypedRequest<RoleItem>, res: Response, next: NextFunction) => {
    const { body } = req;

    try {
      const newRole = await Roles.create(body);

      res.status(201).json(newRole);
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError));
    }
  };

  updateRole = async (req: TypedRequest<RoleItem>, res: Response, next: NextFunction) => {
    const { body } = req;

    try {
      const role = await Roles.findByPk(body.id);

      if (!role) next(new NotFoundError(ERRORS.NOT_FOUND('Role')));

      const newRole = await role?.update(body);

      res.json(newRole);
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError));
    }
  };

  deleteRole = async (req: TypedRequest<RoleItem>, res: Response, next: NextFunction) => {
    const { body } = req;

    try {
      const role = await Roles.findByPk(body.id);

      if (!role) next(new NotFoundError(ERRORS.NOT_FOUND('Role')));

      const newRole = await role?.destroy();

      res.json(newRole);
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError));
    }
  };
}
