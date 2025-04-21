import { Router } from "express";
import { AuthController } from "./auth.controller";
import validateRequest from "../../utils/validateRequest";
import { AuthValidation } from "./auth.validation";

const router = Router();

router.post(
  "/",
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.loginUser
);

export const AuthRoutes = router;
