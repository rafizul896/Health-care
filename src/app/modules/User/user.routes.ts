import { Router } from "express";
import auth from "../../middlewares/auth";
import { UserController } from "./user.controller";

const router = Router();

router.post(
  "/",
  auth("SUPER_ADMIN", "ADMIN", "DOCTOR", "PATIENT"),
  UserController.createAdmin
);

export const UserRoutes = router;
