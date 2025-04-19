import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const createAdmin = async (data: any) => {
  const hashPassword: string = await bcrypt.hash(data.password, 10);

  const userData = {
    email: data.admin.email,
    password: hashPassword,
    role: UserRole.ADMIN,
  };

  const result = await prisma.$transaction(async (tx) => {
    await tx.user.create({
      data: userData,
    });

    const createdAdminData = await tx.admin.create({
      data: data.admin,
    });

    return createdAdminData;
  });

  return result;
};

export const UserService = {
  createAdmin,
};
