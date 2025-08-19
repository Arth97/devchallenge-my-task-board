export type Board = {
  id: string;
  name: string;
  description?: string | null;
  created_at: string;
};

export type Task = {
  id: string;
  board_id: string;
  title: string;
  description?: string | null;
  icon?: string | null;
  status: 'inprogress' | 'completed' | "wontdo" | null;
  created_at: string;
};

export type NewBoard = Omit<Board, 'id' | 'created_at'>;
export type NewTask = Omit<Task, 'id' | 'created_at'>;
