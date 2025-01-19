import { OrderOption } from '@models/Pagination';
import { DEFAULT_PAGINATION } from '../../config/data/DefaultPagination';

export const getPagination = (page?: string, rowsPerPage?: string) => {
  const _page = +(page || DEFAULT_PAGINATION.PAGE);
  const _rowsPerPage = +(rowsPerPage || DEFAULT_PAGINATION.SIZE);
  const limit = _rowsPerPage;
  const offset = (_page - 1) * limit;

  return { limit, offset, page: _page };
};

export const getOrder = (sortBy?: string, descending?: string, attributes?: Record<string, unknown>) => {
  const _sortBy = sortBy && (attributes && sortBy in attributes) ? sortBy : DEFAULT_PAGINATION.ORDER_BY;
  const _descending: OrderOption = descending === 'false' ? 'ASC' : DEFAULT_PAGINATION.DESCENDING;
  return [[_sortBy, _descending] as [string, string]];
};

export const pagedResponse = <T>(
  items: { rows: T[]; count: number },
  pagination: { limit: number; offset: number; page?: number },
  order?: [string, string][],
) => {
  return {
    page: pagination.page,
    rowsPerPage: pagination.limit,
    rowsNumber: items.count,
    rows: items.rows,
    sortBy: order?.at(0)?.at(0),
    descending: order?.at(0)?.at(1),
  };
};
