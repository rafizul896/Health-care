import { Router } from "express";
import auth from "../../middlewares/auth";
import { UserController } from "./user.controller";
import { UserRole } from "@prisma/client";
import { upload } from "../../middlewares/fileUploader";

const router = Router();

router.post(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  upload.single("file"),
  UserController.createAdmin
);

export const UserRoutes = router;
