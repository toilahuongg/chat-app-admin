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
  const p = page <= 1 ? 1 : page;
  const skip = getSkipItems(p, limit);
  const totalPage = Math.floor((await AccountModel.countDocuments()) / limit);
  return {
    items: await AccountModel.find()
      .sort({ _id: sort === 'old' ? 1 : -1 })
      .skip(skip)
      .limit(limit)
      .select(getSelectData(select))
      .lean()
      .exec(),
    currentPage: p,
    totalPage: totalPage,
    prevPage: p <= 1 ? null : page - 1,
    nextPage: page >= totalPage ? null : p + 1,
  };
};

export const searchUsers = async <T>(
  text: string,
  page: number,
  limit: number,
  sort: string | undefined,
  select: T[],
) => {
  const skip = getSkipItems(page, limit);
  const totalPage = Math.floor(
    (await AccountModel.countDocuments({ $text: { $search: text } }, { score: { $meta: 'textScore' } })) / limit,
  );
  return {
    items: await AccountModel.find({ $text: { $search: text } }, { score: { $meta: 'textScore' } })
      .sort({ score: 1, _id: sort === 'ctime' ? -1 : 1 })
      .skip(skip)
      .limit(limit)
      .select(getSelectData(select))
      .lean()
      .exec(),
    currentPage: page <= 1 ? 1 : page,
    totalPage: totalPage,
    prevPage: page <= 1 ? null : page - 1,
    nextPage: page >= totalPage ? null : page + 1,
  };
};
