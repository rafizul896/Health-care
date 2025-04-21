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

router.post("/refresh-token", AuthController.refreshToken);

export const AuthRoutes = router;
