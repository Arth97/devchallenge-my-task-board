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
  status: 'inprogress' | 'completed' | "wontdo" | "todo" | null;
  created_at: string;
};

export type NewBoard = Omit<BoardType, 'id' | 'created_at'>;
export type NewTask = Omit<TaskType, 'id' | 'created_at'>;
