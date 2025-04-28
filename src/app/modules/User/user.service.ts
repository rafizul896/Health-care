import { Admin, Doctor, Patient, Prisma, UserRole } from "@prisma/client";
import bcrypt from "bcrypt";
import prisma from "../../shared/prisma";
import config from "../../config";
import { sendImageToCloudinary } from "../../middlewares/fileUploader";
import { IUploadedFile } from "../../interfaces/file";
import { Request } from "express";
import { IPaginationOptions } from "../../interfaces/pagination";
import { paginationHelper } from "../../utils/paginationHelper";
import { userSearchAbleFields } from "./user.constant";

const createAdmin = async (req: Request): Promise<Admin> => {
  const data = req.body;
  const file = req.file as IUploadedFile;

  if (file) {
    const uploadToCloudinary = await sendImageToCloudinary(file);
    req.body.admin.profilePhoto = uploadToCloudinary?.secure_url;
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

const createDoctor = async (req: Request): Promise<Doctor> => {
  const data = req.body;
  const file = req.file as IUploadedFile;

  if (file) {
    const uploadToCloudinary = await sendImageToCloudinary(file);
    req.body.doctor.profilePhoto = uploadToCloudinary?.secure_url;
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

const createPatient = async (req: Request): Promise<Patient> => {
  const data = req.body;
  const file = req.file as IUploadedFile;

  if (file) {
    const uploadToCloudinary = await sendImageToCloudinary(file);
    req.body.patient.profilePhoto = uploadToCloudinary?.secure_url;
  }

  const hashPassword = await bcrypt.hash(
    data.password,
    Number(config.BCRYPT_SALt_ROUNDS)
  );

  const userData = {
    email: data.patient.email,
    password: hashPassword,
    role: UserRole.PATIENT,
  };

  const result = await prisma.$transaction(async (tx) => {
    await tx.user.create({
      data: userData,
    });

    const createdPatientData = tx.patient.create({
      data: data.patient,
    });

    return createdPatientData;
  });

  return result;
};

const getAllFromDB = async (params: any, options: IPaginationOptions) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;
  const andCondition: Prisma.UserWhereInput[] = [];

  if (searchTerm) {
    andCondition.push({
      OR: userSearchAbleFields.map((field) => ({
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
          equals: (filterData as any)[field] as string,
        },
      })),
    });
  }

  const whereConditions: Prisma.UserWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};

  const result = await prisma.user.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },

    select: {
      id: true,
      email: true,
      role: true,
      needPasswordChange: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  const total = await prisma.user.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: {
      result,
    },
  };
};

export const UserService = {
  createAdmin,
  createDoctor,
  createPatient,
  getAllFromDB,
};
