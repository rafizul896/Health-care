import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import sendResponse from "../../utils/sendResponse ";
import status from "http-status";

const createAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await UserService.createAdmin(req.body);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Admin created successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const UserController = {
  createAdmin,
};
