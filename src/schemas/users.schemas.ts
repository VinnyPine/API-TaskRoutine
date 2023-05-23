import { z } from "zod";

const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

const userRequestSchema = userSchema.omit({
  id: true,
});

const userResponseSchema = userSchema.omit({
  password: true,
});

export { userSchema, userRequestSchema, userResponseSchema };
