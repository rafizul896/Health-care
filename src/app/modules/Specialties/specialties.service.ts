import { Request } from "express";
import { sendImageToCloudinary } from "../../middlewares/fileUploader";
import prisma from "../../shared/prisma";

const createSpecialtiesIntoDB = async (req: Request) => {
  const file = req.file;
  const data = req.body;

  if (file) {
    const uploadToCloudinary = await sendImageToCloudinary(file);
    data.icon = uploadToCloudinary.secure_url;
  }

  const result = await prisma.specialties.create({
    data,
  });

  return result;
};

const getAllSercialtiesFromDB = async () => {
  const result = await prisma.specialties.findMany();

  return result;
};

const deleteSpecialtiesFromDB = async (id: string) => {
  const result = await prisma.specialties.delete({
    where: {
      id,
    },
  });

  return result;
};

export const SpecialtiesServices = {
  createSpecialtiesIntoDB,
  getAllSercialtiesFromDB,
  deleteSpecialtiesFromDB,
};
