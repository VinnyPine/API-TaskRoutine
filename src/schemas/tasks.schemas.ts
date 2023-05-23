import { z } from "zod";
import { TaskStatus } from "../entities/task.entitie";

const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  status: z.nativeEnum(TaskStatus),
});

const taskRequestSchema = taskSchema.omit({
  id: true,
  status: true,
});

const taskUpdateSchema = taskSchema
  .omit({
    id: true,
  })
  .partial();

const tasksResponseSchema = z.array(taskSchema);

export { taskSchema, taskRequestSchema, taskUpdateSchema, tasksResponseSchema };
