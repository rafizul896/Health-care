import jwt from "jsonwebtoken";

export const generateToken = (
  payload: { email: string; role: string },
  secret: string,
  expiresIn: any
) => {
  return jwt.sign(payload, secret, {
    algorithm: "HS256",
    expiresIn,
  });
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret);
};
