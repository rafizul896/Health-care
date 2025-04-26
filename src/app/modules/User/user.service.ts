import { UserRole } from "@prisma/client";
import bcrypt from "bcrypt";
import prisma from "../../shared/prisma";
import config from "../../config";
import { sendImageToCloudinary } from "../../middlewares/fileUploader";

const createAdmin = async (req: any) => {
  const data = req.body.data;
  const file = req.file;

  if (file) {
    const uploadToCloudinary = await sendImageToCloudinary(file);
    req.body.data.admin.profilePhoto = uploadToCloudinary?.secure_url;

    console.log(data);
  }

  const hashPassword: string = await bcrypt.hash(
    data.password,
    Number(config.BCRYPT_SALt_ROUNDS)
  );

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
