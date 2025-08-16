import { createClient } from '@/utils/supabase/server';
import { createDefaultBoard } from '@/lib/db/boards';
import { createDefaultTasks } from '@/lib/db/tasks';

export async function POST() {
  const supabase = await createClient();
  try {
    const board = await createDefaultBoard(supabase);
    console.log("board", board)
    const tasks = await createDefaultTasks(supabase, board.id);
    return Response.json(board)
  } catch (error) {
    console.error('Error creating board:', error);
    return Response.json(
      { message: 'Failed to create board', error: (error as Error).message },
      { status: 500 }
    );
  }
}