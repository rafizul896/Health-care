import { NextFunction, Request, Response } from "express";
import { AdminService } from "./admin.service";
import pick from "../../shared/pick";
import { adminFilterableFields } from "./admin.constant";
import sendResponse from "../../utils/sendResponse ";
import status from "http-status";

const getAllFromDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const filters = pick(req.query, adminFilterableFields);
    const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);

    const result = await AdminService.getAllFromDB(filters, options);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Admin data fetched!",
      meta: result.meta,
      data: result.data,
    });
  } catch (err) {
    next(err);
  }
};

const getByIdFromDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await AdminService.getByIdFromDB(id);

    console.log(result);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Admin data fetched by id!",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const updateIntoDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const result = await AdminService.updateIntoDB(id, payload);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Admin data updated",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteFromDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await AdminService.deleteFromDB(id);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Admin data is Deleted!",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const softDeleteFromDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await AdminService.softDeleteFromDB(id);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Admin data is Deleted!",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const AdminController = {
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
  softDeleteFromDB,
};
