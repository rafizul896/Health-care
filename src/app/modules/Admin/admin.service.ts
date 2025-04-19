import { Prisma } from "@prisma/client";
import { adminSearchAbleFields } from "./admin.constant";
import paginationHelper from "../../utils/paginationHelper";
import prisma from "../../shared/prisma";

const getAllFromDB = async (params: any, options: any) => {
  const meta = paginationHelper(options);
  const { searchTerm, ...filterData } = params;
  const andCondition: Prisma.AdminWhereInput[] = [];

  if (searchTerm) {
    andCondition.push({
      OR: adminSearchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andCondition.push({
      AND: Object.keys(filterData).map((field) => ({
        [field]: {
          equals: filterData[field],
        },
      })),
    });
  }

  const whereConditions: Prisma.AdminWhereInput = { AND: andCondition };

  const result = await prisma.admin.findMany({
    where: whereConditions,
    ...meta,
  });

  return result;
};

export const AdminService = {
  getAllFromDB,
};
