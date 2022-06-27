export interface Task {
  id?: number;
  assignment?: string;
  title?: string;
  description?: string;
  points?: number;
  created_at?: Date;
  completed?: boolean | number;
  id_user?: number;
}
