import { updateTask, deleteTask } from "@/lib/db/tasks";
import { createClient } from '@/utils/supabase/server';
import { Truculenta } from "next/font/google";

type Params = {
  params: Promise<{
    id: string
  }>
}

export async function PUT(request: Request, { params }: Params) {
	const { id } = await params;
	const body = await request.json();
	const supabase = await createClient();
	try { 
		const updatedTask = await updateTask(supabase, id, body)
		return Response.json({
			success: true,
			data: updatedTask
		}, { status: 200 })
	} catch (error) {
		console.error('Error updating task:', error);
		return Response.json(
			{ message: 'Failed to update task', error: (error as Error).message },
			{ status: 500 }
		);
	}
}

export async function DELETE(request: Request, { params }: Params) {
	const { id } = await params;
	const supabase = await createClient();
	try{
		const succes = await deleteTask(supabase, id)
		if (!succes) throw new Error('Failed to delete task');
		return Response.json({
			success: succes,
			message: 'Task deleted successfully',
			data: id
		}, { status: 200 })
	} catch (error) {
		console.error('Error deleting task:', error);
		return Response.json(
			{ message: 'Failed to delete task', error: (error as Error).message },
			{ status: 500 }
		);
	}
}