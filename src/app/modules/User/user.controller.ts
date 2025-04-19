import { Request, Response } from "express";
import { UserService } from "./user.service";

const createAdmin = async (req: Request, res: Response) => {
  try {
    const result = await UserService.createAdmin(req.body);

    res.status(200).json({
      success: true,
      message: "Admin created successfully",
      result,
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({
        success: false,
        message: err?.message || "Something went wrong",
        error: err
      });
    }
  }
};

export const UserController = {
  createAdmin,
};
