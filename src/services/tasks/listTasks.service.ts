import { Repository } from "typeorm";
import { TTasksResponse } from "../../interfaces/tasks.interfaces";
import { Task } from "../../entities/task.entitie";
import { User } from "../../entities/user.entitie";
import { AppError } from "../../errors/AppError";
import { AppDataSource } from "../../data-source";
import { tasksResponseSchema } from "../../schemas/tasks.schemas";

const listTasksService = async (userId: string): Promise<TTasksResponse> => {
  const tasksRepository: Repository<Task> = AppDataSource.getRepository(Task);
  const usersRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await usersRepository.findOneBy({
    id: userId,
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const tasks: Task[] = await tasksRepository.find({
    where: {
      user: user,
    },
  });

  return tasksResponseSchema.parse(tasks);
};

export { listTasksService };
