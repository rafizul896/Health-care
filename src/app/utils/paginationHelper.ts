interface IOptions {
  page?: number;
  limit?: number;
  sortOrder?: string;
  sortBy?: string;
}

interface IOptionsResult {
  skip: number;
  take: number;
  orderBy: object;
}

const paginationHelper = (option: IOptions): IOptionsResult => {
  const page: number = Number(option.page) || 1;
  const limit: number = Number(option.limit) || 10;
  const skip: number = (page - 1) * limit;
  const sortBy: string = option.sortBy || "createdAt";
  const sortOrder: string = option.sortOrder || "desc";

  return {
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  };
};

export default paginationHelper;
