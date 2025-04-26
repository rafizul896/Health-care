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

export const UserController = {
  createAdmin,
};
