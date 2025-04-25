import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../modules/Auth/auth.utils";
import config from "../config";
import { Secret } from "jsonwebtoken";
import AppError from "../errors/AppError";
import status from "http-status";

const auth = (...roles: string[]) => {
  return async (
    req: Request & { user?: any },
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token: string = req.headers.authorization!;

      if (!token) {
        throw new AppError(status.UNAUTHORIZED, "You are not authorized!");
      }

      const verifyUser = verifyToken(token, config.JWT_ACCESS_SECRET as Secret);
      req.user = verifyUser;

      if (roles.length && !roles.includes(verifyUser.role)) {
        throw new AppError(status.UNAUTHORIZED, "You are not authorized!");
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};

export default auth;
