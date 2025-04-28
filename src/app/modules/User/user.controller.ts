import { UserService } from "./user.service";
import sendResponse from "../../utils/sendResponse ";
import status from "http-status";
import catchAsync from "../../utils/catchAsync ";

const createAdmin = catchAsync(async (req, res) => {
  const result = await UserService.createAdmin(req);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Admin created successfully",
    data: result,
  });
});

const createDoctor = catchAsync(async (req, res) => {
  const result = await UserService.createDoctor(req);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Doctor created successfully",
    data: result,
  });
});

const createPatient = catchAsync(async (req, res) => {
  const result = await UserService.createPatient(req);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Patient created successfully",
    data: result,
  });
});

export const UserController = {
  createAdmin,
  createDoctor,
  createPatient
};
