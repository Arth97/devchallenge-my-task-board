export type BoardType = {
  id: string;
  name: string;
  description?: string | null;
  created_at: string;
};

export type TaskType = {
  id: string;
  board_id: string;
  title: string;
  description?: string | null;
  icon?: string | null;
  status: Status;
  created_at: string;
};

export enum Status {
  IN_PROGRESS = 'inprogress',
  COMPLETED = 'completed',
  WONT_DO = 'wontdo',
  TODO = 'todo'
}

export type NewBoard = Omit<BoardType, 'id' | 'created_at'>;
export type NewTask = Omit<TaskType, 'id' | 'created_at'>;
