import { UserService } from "./user.service";
import sendResponse from "../../utils/sendResponse ";
import status from "http-status";
import catchAsync from "../../utils/catchAsync ";
import pick from "../../shared/pick";
import { userFilterableFields } from "./user.constant";

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

const getAllFromDB = catchAsync(async (req, res) => {
  const filters = pick(req.query, userFilterableFields);
  const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);

  const result = await UserService.getAllFromDB(filters, options);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User data fetched!",
    meta: result.meta,
    data: result.data,
  });
});

const changeProfileStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserService.changeProfileStatus(id, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Users profile status changed!",
    data: result,
  });
});

const getMyProfile = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await UserService.getMyProfile(user.email);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "My Profile data fetched!",
    data: result,
  });
});

const updateMyProfile = catchAsync(async (req, res) => {
  const result = await UserService.updateMyProfile(req);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "My Profile data updated!",
    data: result,
  });
});

export const UserController = {
  createAdmin,
  createDoctor,
  createPatient,
  getAllFromDB,
  changeProfileStatus,
  getMyProfile,
  updateMyProfile,
};
