import status from "http-status";
import catchAsync from "../../utils/catchAsync ";
import sendResponse from "../../utils/sendResponse ";
import { AuthServices } from "./auth.service";

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);

  const { refreshToken, ...others } = result;

  res.cookie("refreshToken", refreshToken, { secure: false, httpOnly: true });

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User Login Success",
    data: others,
  });
});

export const AuthController = {
  loginUser,
};
