import { Request, Response } from "express";
import { createTaskService } from "../services/tasks/createTask.service";
import { listTasksService } from "../services/tasks/listTasks.service";
import { TTaskUpdateRequest } from "../interfaces/tasks.interfaces";
import { updateTaskService } from "../services/tasks/updateTask.service";
import { deleteTaskService } from "../services/tasks/deleteTask.service";

const createTaskController = async (req: Request, res: Response) => {
  const userid = res.locals.userId;

  const newTask = await createTaskService(req.body, userid);

  return res.status(201).json(newTask);
};

const listTasksController = async (req: Request, res: Response) => {
  const userid = res.locals.userId;
  const tasks = await listTasksService(userid);

  return res.json(tasks);
};

const updateTaskController = async (req: Request, res: Response) => {
  const taskId = req.params.id;
  const updatedValues: TTaskUpdateRequest = req.body;
  const updateTask = await updateTaskService(updatedValues, taskId);
  return res.json(updateTask);
};

const deleteTaskController = async (req: Request, res: Response) => {
  const taskId = req.params.id;
  await deleteTaskService(taskId);
  res.status(204).send();
};

export {
  createTaskController,
  listTasksController,
  updateTaskController,
  deleteTaskController,
};
