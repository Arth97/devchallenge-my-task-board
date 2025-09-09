import { deleteBoard, getBoardById, updateBoard } from '@/lib/db/boards';
import { getTasksByBoardId } from '@/lib/db/tasks';
import { createClient } from '@/utils/supabase/server';

type Params = {
  params: Promise<{
    id: string
  }>
}

export async function GET(request: Request, { params }: Params) {
  const { id } = await params;
  const supabase = await createClient();
  try {
    const board = await getBoardById(supabase, id);
    if (!board)
      return Response.json({ message: 'Board not found' }, { status: 404 });

    const tasks = await getTasksByBoardId(supabase, id);
    
    return Response.json({
      board: board,
      tasks: tasks
    }, { status: 200 });
  } catch (error) {
    console.log("TESTTEEERRRRR")
    console.error('Error getting board:', error);
    return Response.json(
      { message: 'Failed to get board', error: (error as Error).message },
      { status: 500 }
    );
  }
}
 
export async function PUT(request: Request, { params }: Params) {
  const { id } = await params;
  const body = await request.json();
  const supabase = await createClient();
  try {
    const updatedBoard = await updateBoard(supabase, id, body);
    return Response.json({
      data: updatedBoard
    }, { status: 200 });
  } catch (error) {
    console.error('Error updating board:', error);
    return Response.json(
      { message: 'Failed to update board', error: (error as Error).message },
      { status: 500 }
    );
  }
}
 
export async function DELETE(request: Request, { params }: Params) {
  const { id } = await params;
  const supabase = await createClient();
  try {
    const success = await deleteBoard(supabase, id)
    if (!success) throw new Error('Failed to delete board');
    return Response.json({
      message: 'Board deleted successfully',
      data: id
    }, { status: 200 });
  } catch (error) {
    console.error('Error deleting board:', error);
    return Response.json(
      { message: 'Failed to delete board', error: (error as Error).message },
      { status: 500 }
    );
  }
}