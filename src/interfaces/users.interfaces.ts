import { z } from "zod";
import {
  userSchema,
  userRequestSchema,
  userResponseSchema,
} from "../schemas/users.schema";

type TUser = z.infer<typeof userSchema>;
type TUserRequest = z.infer<typeof userRequestSchema>;
type TUserResponse = z.infer<typeof userResponseSchema>;

export { TUser, TUserRequest, TUserResponse };
