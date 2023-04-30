import AccountModel from '../account.model';
import { getSelectData, getSkipItems } from '@server/utils';

export const findAllUsers = async <T>(
  text: string | undefined,
  page: number,
  limit: number,
  sort: string | undefined,
  select: T[],
) => {
  if (text) return searchUsers(text, page, limit, sort, select);
  return queryUsers(page, limit, sort, select);
};

export const queryUsers = async <T>(page: number, limit: number, sort: string | undefined, select: T[]) => {
  const skip = getSkipItems(page, limit);
  return await AccountModel.find()
    .sort({ _id: sort === 'ctime' ? -1 : 1 })
    .skip(skip)
    .limit(limit)
    .select(getSelectData(select))
    .lean()
    .exec();
};

export const searchUsers = async <T>(
  text: string,
  page: number,
  limit: number,
  sort: string | undefined,
  select: T[],
) => {
  const skip = getSkipItems(page, limit);
  return await AccountModel.find({ $text: { $search: text } }, { score: { $meta: 'textScore' } })
    .sort({ score: 1, _id: sort === 'ctime' ? -1 : 1 })
    .skip(skip)
    .limit(limit)
    .select(getSelectData(select))
    .lean()
    .exec();
};
