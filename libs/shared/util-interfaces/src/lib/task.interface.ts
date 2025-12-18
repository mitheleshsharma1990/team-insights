import { User } from "./user.interface"

export interface Task {
  id:string;
  title:string;
  userId?:string;  
  user?:User;
  priority:string;
  isUrgent?:boolean;
}

export type CreateTaskRequest = Omit<Task, 'id'>;