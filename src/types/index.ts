export type Pagination = {
  totalPage: number;
  currentPage: number;
  nextPage: number;
  prevPage: number;
};

export type PaginationData<T> = Pagination & {
  items: T[];
};
