import prisma from "../../shared/prisma";
import bcrypt from "bcrypt";
import { generateToken, verifyToken } from "./auth.utils";
import { JwtPayload } from "jsonwebtoken";

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
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

  const accessToken = generateToken(jwtPayload, "zxcvbnm", "5m");
  const refreshToken = generateToken(jwtPayload, "asdfghjkl", "30d");

  return {
    accessToken,
    refreshToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

const refreshToken = async (token: string) => {
  let decodedData;

  try {
    decodedData = verifyToken(token, "asdfghjkl") as JwtPayload;
  } catch (err) {
    throw new Error("You are not autherized!");
  }

  const isUserExist = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData?.email,
    },
  });

  const jwtPayload = {
    email: isUserExist?.email,
    role: isUserExist?.role,
  };

  const accessToken = generateToken(jwtPayload, "zxcvbnm", "5m");

  return { accessToken };
};

export const AuthServices = {
  loginUser,
  refreshToken,
};
