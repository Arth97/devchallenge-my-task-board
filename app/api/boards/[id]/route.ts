import { deleteBoard, getBoardById, updateBoard } from '@/lib/db/boards';
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
    
    return Response.json(board);
  } catch (error) {
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
    return Response.json(updatedBoard);
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
  const body = await request.json();
  const supabase = await createClient();
  try {
    const response = await deleteBoard(supabase, id)
    return Response.json({ message: 'Board deleted successfully', data: response });
  } catch (error) {
    console.error('Error deleting board:', error);
    return Response.json(
      { message: 'Failed to delete board', error: (error as Error).message },
      { status: 500 }
    );
  }
}