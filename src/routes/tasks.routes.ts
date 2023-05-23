import { Router } from "express";
import {
  createTaskController,
  deleteTaskController,
  listTasksController,
  updateTaskController,
} from "../controllers/tasks.controller";
import { ensureauthMiddleware } from "../middlewares/ensureAuth.middleware";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { taskRequestSchema, taskUpdateSchema } from "../schemas/tasks.schemas";
import { ensureIsOwnerMiddleware } from "../middlewares/ensureIsOwner.middleware";

const tasksRoutes = Router();

tasksRoutes.use(ensureauthMiddleware);

tasksRoutes.post(
  "",
  ensureDataIsValidMiddleware(taskRequestSchema),
  createTaskController
);
tasksRoutes.get("", listTasksController);
tasksRoutes.patch(
  "/:id",
  ensureIsOwnerMiddleware,
  ensureDataIsValidMiddleware(taskUpdateSchema),
  updateTaskController
);
tasksRoutes.delete("/:id", ensureIsOwnerMiddleware, deleteTaskController);

export { tasksRoutes };
