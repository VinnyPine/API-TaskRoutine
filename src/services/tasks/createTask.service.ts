import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Task } from "../../entities/task.entitie";
import { User } from "../../entities/user.entitie";
import { TTaskRequest, TTaskResponse } from "../../interfaces/tasks.interfaces";
import { AppError } from "../../errors/AppError";
import { taskSchema } from "../../schemas/tasks.schemas";

const createTaskService = async (
  data: TTaskRequest,
  userId: string
): Promise<TTaskResponse> => {
  const tasksRepository: Repository<Task> = AppDataSource.getRepository(Task);
  const usersRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await usersRepository.findOneBy({
    id: userId,
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const task: Task = tasksRepository.create({
    ...data,
    user,
  });

  await tasksRepository.save(task);

  return taskSchema.parse(task);
};

export { createTaskService };
