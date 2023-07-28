import { FilterQuery, Model, Types } from 'mongoose';
import { getSelectData, getSkipItems } from '@server/utils';
import { TSort } from '@src/types';

export class Pagination<T1, T2> {
  private model: Model<T1>;
  private match: FilterQuery<T1>;
  private page: number;
  private limit: number;
  private sort: TSort;
  private select: T2[];

  constructor(
    model: Model<T1>,
    match: FilterQuery<T1>,
    page: number,
    limit: number,
    select: T2[],
    sort: TSort = 'new',
  ) {
    this.model = model;
    this.page = page;
    this.match = match;
    this.limit = limit;
    this.select = select;
    this.sort = sort;
  }
  async paginate() {
    return this.query();
  }

  async query() {
    const skip = getSkipItems(this.page, this.limit);
    const totalPage = Math.floor((await this.model.countDocuments(this.match)) / this.limit) + 1;
    return {
      items: await this.model
        .find(this.match)
        .sort({ _id: this.sort === 'new' ? -1 : 1 })
        .skip(skip)
        .limit(this.limit)
        .select(getSelectData(this.select))
        .lean()
        .exec(),
      currentPage: this.page <= 1 ? 1 : this.page,
      totalPage: totalPage,
      prevPage: this.page <= 1 ? null : this.page - 1,
      nextPage: this.page >= totalPage ? null : this.page + 1,
    };
  }
}

export class Pagination2<T1, T2> {
  private model: Model<T1>;
  private match: FilterQuery<T1>;
  private limit: number;
  private cursor: Types.ObjectId | undefined;
  private sort: TSort;
  private select: T2[];

  constructor(
    model: Model<T1>,
    match: FilterQuery<T1>,
    cursor: Types.ObjectId | undefined,
    limit: number,
    select: T2[],
    sort: TSort = 'new',
  ) {
    this.model = model;
    this.match = match;
    this.limit = limit;
    this.select = select;
    this.cursor = cursor;
    this.sort = sort;
  }
  async paginate() {
    return this.query();
  }

  async query() {
    const items = await this.model
      .find(this.cursor ? Object.assign(this.match, { _id: { $lt: this.cursor } }) : this.match)
      .sort({ _id: this.sort === 'new' ? -1 : 1 })
      .limit(this.limit)
      .select(getSelectData(this.select))
      .lean()
      .exec();
    return {
      items,
      lastCursor: items[items.length - 1]?._id,
    };
  }
}
