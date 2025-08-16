import { getBoardById } from '@/lib/db/boards';
import { createClient } from '@/utils/supabase/server';

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const supabase = await createClient();
  try {
    const board = await getBoardById(supabase, params.id);
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
 
export async function PUT(request: Request) {

}
 
export async function DELETE(request: Request) {

}