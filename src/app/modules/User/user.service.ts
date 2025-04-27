import { UserRole } from "@prisma/client";
import bcrypt from "bcrypt";
import prisma from "../../shared/prisma";
import config from "../../config";
import { sendImageToCloudinary } from "../../middlewares/fileUploader";
import { IUploadedFile } from "../../interfaces/file";

const createAdmin = async (req: any) => {
  const data = req.body;
  const file: IUploadedFile = req.file;

  if (file) {
    const uploadToCloudinary = await sendImageToCloudinary(file);
    req.body.admin.profilePhoto = uploadToCloudinary?.secure_url;

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

const createDoctor = async (req: any) => {
  const data = req.body;
  const file: IUploadedFile = req.file;

  if (file) {
    const uploadToCloudinary = await sendImageToCloudinary(file);
    req.body.doctor.profilePhoto = uploadToCloudinary?.secure_url;

    console.log(data);
  }

  const hashPassword: string = await bcrypt.hash(
    data.password,
    Number(config.BCRYPT_SALt_ROUNDS)
  );

  const userData = {
    email: data.doctor.email,
    password: hashPassword,
    role: UserRole.DOCTOR,
  };

  const result = await prisma.$transaction(async (tx) => {
    await tx.user.create({
      data: userData,
    });

    const createdDoctorData = await tx.doctor.create({
      data: data.doctor,
    });

    return createdDoctorData;
  });

  return result;
};

export const UserService = {
  createAdmin,
  createDoctor,
};
