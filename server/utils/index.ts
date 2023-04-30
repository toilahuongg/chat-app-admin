import { pick } from 'lodash';

export const getInfoData = <T>(obj: T, paths: (keyof T)[]) => pick(obj, paths);
export const getSelectData = <T>(select: T[]) => Object.fromEntries(select.map((el) => [el, 1]));
export const getSkipItems = (page: number, limit: number) => (page <= 1 ? 0 : page) * limit;
