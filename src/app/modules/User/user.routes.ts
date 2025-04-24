import { Router } from "express";
import auth from "../../middlewares/auth";
import { UserController } from "./user.controller";
import { UserRole } from "@prisma/client";

const router = Router();

router.post(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  UserController.createAdmin
);

export const UserRoutes = router;
