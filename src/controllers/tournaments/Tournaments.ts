import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'sequelize';
import { Countries } from '@db/models/Countries';
import { Games } from '@db/models/Games';
import { States } from '@db/models/States';
import { TournamentModel, TournamentTypes, Tournaments } from '@db/models/Tournaments';
import { UserItem, Users } from '@db/models/Users';
import { InternalError } from '@models/Errors';
import {
  getOrder, getPagination, pagedResponse,
} from '@controllers/utils/Pagination';
import { PaginationQuery } from '@models/Pagination';

export const tournamentsInclude = [
  {
    model: Games,
    as: 'game',
    required: false,
  },
  {
    model: TournamentTypes,
    as: 'type',
    required: false,
  },
  {
    model: Countries,
    as: 'country',
    required: false,
  },
  {
    model: States,
    as: 'state',
    required: false,
  },
  {
    model: Users,
    as: 'creator',
    required: false,
  },
];

export class TournamentsController {
  getOwnedTournaments = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const jwtPayload = res.locals.jwtPayload as UserItem;

      const tournaments = await Tournaments.findAll({
        where: {
          userId: jwtPayload.id,
        },
        include: tournamentsInclude,
      });

      res.json(tournaments);
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError));
    }
  };

  getTournamentsTypes = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const tournamentsTypes = await TournamentTypes.findAll();

      res.json(tournamentsTypes);
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError));
    }
  };

  getTournamentsPaginated = async (
    req: Request<Record<string, never>, Record<string, never>, Record<string, never>, PaginationQuery>,
    res: Response,
    next: NextFunction,
  ) => {
    const {
      page, rowsPerPage, sortBy, descending,
    } = req.query;
    try {
      const pagination = getPagination(page, rowsPerPage);
      const order = getOrder(sortBy, descending, Tournaments.getAttributes());

      const pagedTournaments = await Tournaments.findAndCountAll({
        include: tournamentsInclude,
        ...pagination,
        distinct: true,
        order,
      });

      res.json(pagedResponse<TournamentModel>(pagedTournaments, pagination, order));
    } catch (error) {
      next(new InternalError(undefined, error as ValidationError));
    }
  };
}
