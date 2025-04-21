import prisma from "../../shared/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

  const accessToken = jwt.sign(jwtPayload, "zxcvbnm", {
    expiresIn: "10m",
    algorithm: "HS256",
  });

  const refreshToken = jwt.sign(jwtPayload, "asdfghjkl", {
    expiresIn: "30d",
    algorithm: "HS256",
  });

  return {
    accessToken,
    refreshToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

export const AuthServices = {
  loginUser,
};
