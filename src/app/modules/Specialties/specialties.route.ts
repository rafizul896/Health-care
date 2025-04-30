import { NextFunction, Request, Response, Router } from "express";
import { SpecialtiesController } from "./specialties.controller";
import { sendImageToCloudinary, upload } from "../../middlewares/fileUploader";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = Router();

router.post(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
      return SpecialtiesController.createSpecialtiesIntoDB(req, res, next);
    }
  }
);

export const SpecialtiesRoutes = router;
