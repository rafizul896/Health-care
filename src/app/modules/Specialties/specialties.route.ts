import { NextFunction, Request, Response, Router } from "express";
import { SpecialtiesController } from "./specialties.controller";
import { sendImageToCloudinary, upload } from "../../middlewares/fileUploader";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { SpecialtiesValidation } from "./specialties.validation";

const router = Router();

router.post(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = SpecialtiesValidation.createSpecialtiesSchema.parse(
      JSON.parse(req.body.data)
    );

    return SpecialtiesController.createSpecialtiesIntoDB(req, res, next);
  }
);

router.get("/", SpecialtiesController.getAllSercialtiesFromDB);

router.delete("/:id", SpecialtiesController.deleteSpecialtiesFromDB);

export const SpecialtiesRoutes = router;
