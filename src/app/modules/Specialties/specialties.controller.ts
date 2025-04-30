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

export const SpecialtiesController = {
  createSpecialtiesIntoDB,
};
