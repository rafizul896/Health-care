import { Request, Response } from "express";
import { AdminService } from "./admin.service";
import pick from "../../shared/pick";
import { adminFilterableFields } from "./admin.constant";
import sendResponse from "../../utils/sendResponse ";

const getAllFromDB = async (req: Request, res: Response) => {
  try {
    const filters = pick(req.query, adminFilterableFields);
    const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);

    const result = await AdminService.getAllFromDB(filters, options);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admin data fetched!",
      meta: result.meta,
      data: result.data,
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({
        success: false,
        message: err?.name || "Something went wrong",
        error: err,
      });
    }
  }
};

const getByIdFromDB = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await AdminService.getByIdFromDB(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admin data fetched by id!",
      data: result,
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({
        success: false,
        message: err?.name || "Something went wrong",
        error: err,
      });
    }
  }
};

const updateIntoDB = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const result = await AdminService.updateIntoDB(id, payload);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admin data updated",
      data: result,
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({
        success: false,
        message: err?.name || "Something went wrong",
        error: err,
      });
    }
  }
};

const deleteFromDB = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await AdminService.deleteFromDB(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admin data is Deleted!",
      data: result,
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({
        success: false,
        message: err?.name || "Something went wrong",
        error: err,
      });
    }
  }
};

const softDeleteFromDB = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await AdminService.softDeleteFromDB(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admin data is Deleted!",
      data: result,
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({
        success: false,
        message: err?.name || "Something went wrong",
        error: err,
      });
    }
  }
};

export const AdminController = {
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
  softDeleteFromDB,
};
