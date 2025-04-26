import { z } from "zod";

const createAdmin = z.object({
  password: z.string().min(4, "Password must be at least 4 characters long"),
  admin: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    contactNumber: z
      .string()
      .min(10, "Contact number must be at least 10 digits"),
  }),
});

export const UserValidationSchema = {
  createAdmin,
};
