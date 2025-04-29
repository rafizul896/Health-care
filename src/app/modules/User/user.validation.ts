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

const createPatient = z.object({
  password: z.string().min(4, "Password must be at least 4 characters long"),
  patient: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    profilePhoto: z.string().url("Invalid URL").optional().nullable(),
    contactNumber: z
      .string()
      .min(10, "Contact number must be at least 10 digits"),
    address: z.string().min(1, "Address is required"),
    bloodGroup: z
      .enum([
        "A_POSITIVE",
        "A_NEGATIVE",
        "B_POSITIVE",
        "B_NEGATIVE",
        "AB_POSITIVE",
        "AB_NEGATIVE",
        "O_POSITIVE",
        "O_NEGATIVE",
      ])
      .optional()
      .nullable(),
    gender: z.enum(["MALE", "FEMALE"]),
    age: z.number().int().min(0, "Age must be a positive number"),
    dateOfBirth: z
      .union([z.string(), z.date()])
      .transform((val) => (typeof val === "string" ? new Date(val) : val))
      .optional()
      .nullable(),
    isDeleted: z.boolean().default(false),
  }),
});

const changeProfileStatus = z.object({
  body: z.object({
    status: z.enum(["ACTIVE", "BLOCKED", "DELETED"], {
      errorMap: () => ({
        message: "Status must be either ACTIVE, BLOCKED, or DELETED",
      }),
    }),
  }),
});

export const UserValidationSchema = {
  createAdmin,
  createDoctor,
  createPatient,
  changeProfileStatus
};
