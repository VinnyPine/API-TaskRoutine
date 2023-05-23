import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Task } from "../../entities/task.entitie";
import {
  TTaskResponse,
  TTaskUpdateRequest,
} from "../../interfaces/tasks.interfaces";
import { AppError } from "../../errors/AppError";
import { taskSchema } from "../../schemas/tasks.schemas";

const updateTaskService = async (
  data: TTaskUpdateRequest,
  taskId: string
): Promise<TTaskResponse> => {
  const tasksRepository: Repository<Task> = AppDataSource.getRepository(Task);
  const oldTask: Task | null = await tasksRepository.findOneBy({ id: taskId });

  if (!oldTask) {
    throw new AppError("Task not found", 404);
  }

  const newTaskData = tasksRepository.create({
    ...oldTask,
    ...data,
  });

  await tasksRepository.save(newTaskData);

  return taskSchema.parse(newTaskData);
};

export { updateTaskService };
