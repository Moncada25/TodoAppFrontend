export interface Task {
  id?: number;
  assignment?: string;
  title?: string;
  description?: string;
  points?: number;
  createdAt?: Date;
  completed?: boolean | number;
  id_user?: number;
}
