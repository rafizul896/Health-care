import { NextFunction, Request, Response, Router } from "express";
import auth from "../../middlewares/auth";
import { UserController } from "./user.controller";
import { UserRole } from "@prisma/client";
import { upload } from "../../middlewares/fileUploader";
import { UserValidationSchema } from "./user.validation";
import validateRequest from "../../utils/validateRequest";

const router = Router();

router.get(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  UserController.getAllFromDB
);

router.get(
  "/me",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
  UserController.getMyProfile
);

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
    req.body = UserValidationSchema.createDoctor.parse(
      JSON.parse(req.body.data)
    );

    return UserController.createDoctor(req, res, next);
  }
);

router.post(
  "/create-patient",
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = UserValidationSchema.createPatient.parse(
      JSON.parse(req.body.data)
    );

    return UserController.createPatient(req, res, next);
  }
);

router.patch(
  "/:id/status",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  validateRequest(UserValidationSchema.changeProfileStatus),
  UserController.changeProfileStatus
);

router.patch(
  "/update-my-profile",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    return UserController.updateMyProfile(req, res, next);
  }
);

export const UserRoutes = router;
