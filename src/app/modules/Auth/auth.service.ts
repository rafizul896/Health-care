import prisma from "../../shared/prisma";
import bcrypt from "bcrypt";
import { generateToken, verifyToken } from "./auth.utils";
import { UserStatus } from "@prisma/client";
import config from "../../config";

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  const isCurrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );

  if (!isCurrectPassword) {
    throw new Error("Invalid email or password");
  }

  const jwtPayload = {
    email: userData.email,
    role: userData.role,
  };

  const accessToken = generateToken(
    jwtPayload,
    config.JWT_ACCESS_SECRET as string,
    config.JWT_ACCESS_EXPIRES_IN
  );

  const refreshToken = generateToken(
    jwtPayload,
    config.JWT_REFRESH_SECRET as string,
    config.JWT_REFRESH_EXPIRES_IN
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

const refreshToken = async (token: string) => {
  let decodedData;

  try {
    decodedData = verifyToken(token, config.JWT_REFRESH_SECRET as string);
  } catch (err) {
    throw new Error("You are not autherized!");
  }

  const isUserExist = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData?.email,
      status: UserStatus.ACTIVE,
    },
  });

  const jwtPayload = {
    email: isUserExist?.email,
    role: isUserExist?.role,
  };

  const accessToken = generateToken(
    jwtPayload,
    config.JWT_ACCESS_SECRET as string,
    config.JWT_ACCESS_EXPIRES_IN
  );

  return { accessToken };
};

export const AuthServices = {
  loginUser,
  refreshToken,
};
