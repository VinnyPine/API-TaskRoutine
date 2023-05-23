import { Repository } from "typeorm"
import { Task } from "../../entities/task.entitie"
import { AppDataSource } from "../../data-source"
import { AppError } from "../../errors/AppError"


const deleteTaskService = async (taskId: string): Promise<void> => {
    const tasksRepository: Repository<Task> = AppDataSource.getRepository(Task)
    const task: Task | null = await tasksRepository.findOneBy({ id: taskId })

    if (!task) {
        throw new AppError("Task not found", 404)
    }

    await tasksRepository.remove(task)
}

export { deleteTaskService }