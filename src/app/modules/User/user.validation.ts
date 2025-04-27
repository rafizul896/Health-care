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

const createDoctor = z.object({
  password: z.string().min(4, "Password must be at least 4 characters long"),
  doctor: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    profilePhoto: z.string().url("Invalid URL").optional().nullable(),
    contactNumber: z
      .string()
      .min(10, "Contact number must be at least 10 digits"),
    address: z.string().optional().nullable(),
    registrationNumber: z.string().min(1, "Registration number is required"),
    experience: z.number().int().min(0).default(0),
    gender: z.enum(["MALE", "FEMALE", "OTHER"]), // Assuming Gender is an ENUM
    appointmentFee: z
      .number()
      .int()
      .min(0, "Appointment fee must be a positive number"),
    qualification: z.string().min(1, "Qualification is required"),
    currentWorkingPlace: z.string().min(1, "Current working place is required"),
    designaton: z.string().min(1, "Designation is required"),
    isDeleted: z.boolean().default(false),
    averageRating: z.number().min(0).default(0),
  }),
});

export const UserValidationSchema = {
  createAdmin,
  createDoctor,
};
