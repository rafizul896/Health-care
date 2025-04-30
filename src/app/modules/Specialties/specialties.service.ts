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

export const SpecialtiesServices = {
  createSpecialtiesIntoDB,
};
