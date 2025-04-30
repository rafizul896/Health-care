import { z } from "zod";

const createSpecialtiesSchema = z.object({
  title: z.string({
    required_error: "Title is Required!",
  }),
});

export const SpecialtiesValidation = {
  createSpecialtiesSchema,
};
