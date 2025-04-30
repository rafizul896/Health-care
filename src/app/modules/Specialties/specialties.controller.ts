import status from "http-status";
import catchAsync from "../../utils/catchAsync ";
import sendResponse from "../../utils/sendResponse ";
import { SpecialtiesServices } from "./specialties.service";

const createSpecialtiesIntoDB = catchAsync(async (req, res) => {
  const result = await SpecialtiesServices.createSpecialtiesIntoDB(req);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Spacialties created successfully!",
    data: result,
  });
});

const getAllSercialtiesFromDB = catchAsync(async (req, res) => {
  const result = await SpecialtiesServices.getAllSercialtiesFromDB();

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Spacialties data fetched successfully!",
    data: result,
  });
});
const deleteSpecialtiesFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SpecialtiesServices.deleteSpecialtiesFromDB(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Spacialties data deleted successfully!",
    data: result,
  });
});

export const SpecialtiesController = {
  createSpecialtiesIntoDB,
  getAllSercialtiesFromDB,
  deleteSpecialtiesFromDB,
};
