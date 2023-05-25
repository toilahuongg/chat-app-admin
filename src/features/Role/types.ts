import { PaginationData } from '@src/types';

export interface Role {
  _id: string;
  name: string;
  desc?: string;
  scopes: string[];
}
export type PaginateRole = PaginationData<Role>;
