export const Orders = ['DESC', 'ASC'] as const;

export type OrderOption = typeof Orders[number] | undefined;

export interface PaginationQuery {
  page?: string;
  rowsPerPage?: string;
  sortBy?: string;
  descending?: string;
}
