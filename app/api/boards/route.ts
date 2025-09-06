import { createClient } from '@/utils/supabase/server';
import { createDefaultBoard } from '@/lib/db/boards';
import { createDefaultTasks } from '@/lib/db/tasks';

export async function POST() {
  const supabase = await createClient();
  let board = null;
  try {
    board = await createDefaultBoard(supabase);
    const tasks = await createDefaultTasks(supabase, board.id);
    return Response.json({
      success: true,
      data: tasks,
      boardId: board.id
    }, { status: 200 })
  } catch (error) {
    console.error('Error creating default board or tasks:', error);
    if (board?.id) {
      const { error: deleteError } = await supabase.from('Boards').delete().eq('id', board.id);
      if (deleteError)
        console.error('Failed to delete board after task creation failure:', deleteError);
    }

    return Response.json({
      message: 'Failed to create board and tasks',
      error: (error as Error).message,
    }, { status: 500 });
  }
}