import { z } from "zod";
import { DeepPartial } from "typeorm";
import {
  taskSchema,
  taskRequestSchema,
  tasksResponseSchema,
} from "../schemas/tasks.schemas";

type TTask = z.infer<typeof taskSchema>;
type TTaskRequest = z.infer<typeof taskRequestSchema>;
type TTaskResponse = z.infer<typeof taskSchema>;
type TTasksResponse = z.infer<typeof tasksResponseSchema>;
type TTaskUpdateRequest = DeepPartial<TTaskRequest>;

export {
  TTask,
  TTaskRequest,
  TTaskResponse,
  TTaskUpdateRequest,
  TTasksResponse,
};
