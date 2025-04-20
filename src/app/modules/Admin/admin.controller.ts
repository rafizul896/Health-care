import { Request, Response } from "express";
import { AdminService } from "./admin.service";
import pick from "../../shared/pick";
import { adminFilterableFields } from "./admin.constant";

const getAllFromDB = async (req: Request, res: Response) => {
  try {
    const filters = pick(req.query, adminFilterableFields);
    const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);

    const result = await AdminService.getAllFromDB(filters, options);

    res.status(200).json({
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

    res.status(200).json({
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

    res.status(200).json({
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

    res.status(200).json({
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
};
