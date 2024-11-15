export interface Task {
  id: number;
  name: string;
  description: string;
  isCompleted: boolean;
  dueDate: Date;
  assignedUserIds: string[];
}

export interface TaskDTO {
  id: number;
  name: string;
  description: string;
  isCompleted: boolean;
  createdAt: Date;
  dueDate: Date;
  projectId: number;
  assignedUserIds: string[];
}

export interface CreateTaskDTO {
  name: string;
  description: string;
  createdAt: Date;
  dueDate: Date;
  projectId: number;
  assignedUserIds: string[];
}

export interface EditTaskDTO {
  name: string;
  description: string;
  isCompleted: boolean;
  dueDate: Date;
  assignedUserIds: string[];
}
