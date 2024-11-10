export interface Task {
  id: number;
  name: string;
  description: string;
  isCompleted: boolean;
  dueDate: Date;
  assignedUserIds: string[];
}

export interface TaskDTO {
  name: string;
  description: string;
  dueDate: Date;
  assignedUserIds: string[];
}
