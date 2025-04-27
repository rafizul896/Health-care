import { NextFunction, Request, Response, Router } from "express";
import auth from "../../middlewares/auth";
import { UserController } from "./user.controller";
import { UserRole } from "@prisma/client";
import { upload } from "../../middlewares/fileUploader";
import { UserValidationSchema } from "./user.validation";

const router = Router();

router.post(
  "/create-admin",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = UserValidationSchema.createAdmin.parse(
      JSON.parse(req.body.data)
    );

    return UserController.createAdmin(req, res, next);
  }
);

router.post(
  "/create-doctor",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = UserValidationSchema.createAdmin.parse(
      JSON.parse(req.body.data)
    );

    return UserController.createDoctor(req, res, next);
  }
);

export const UserRoutes = router;
