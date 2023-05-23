import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entitie";

export enum TaskStatus {
  TODO = "toDo",
  PROGRESS = "inProgress",
  REVISION = "inRevision",
  FINISHED = "finished",
}

@Entity("tasks")
class Task {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    type: "enum",
    enum: TaskStatus,
    default: TaskStatus.TODO,
  })
  status: TaskStatus;

  @ManyToOne(() => User)
  user: User;
}

export { Task };
