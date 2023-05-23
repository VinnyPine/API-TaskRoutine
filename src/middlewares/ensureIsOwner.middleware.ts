import { Request, Response, NextFunction } from "express"
import { AppDataSource } from "../data-source"
import { Task } from "../entities/task.entitie"

const ensureIsOwnerMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const tasksRepositoy = AppDataSource.getRepository(Task)

    const taskId: string = req.params.id
    const userId: string = res.locals.userId

    const task = await tasksRepositoy.findOne({
        where: {
            id: taskId
        },
        relations: {
            user: true
        }
    })

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        })
    }

    if (task.user.id !== userId) {
        return res.status(403).json({
            message: "You don`t have permissions"
        })
    }

    return next()
}

export { ensureIsOwnerMiddleware }