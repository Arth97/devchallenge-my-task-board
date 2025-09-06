import { createClient } from '@/utils/supabase/server';
import { createTask } from '@/lib/db/tasks';

export async function POST(request: Request) {
	const supabase = await createClient();
	const body = await request.json();
	try {
		console.log("body", body)
		const task = await createTask(supabase, body);
		return Response.json({
			success: true,
			data: task
		}, { status: 200 })
	} catch (error) {
		console.error('Error creating task:', error);
		return Response.json(
			{ message: 'Failed to create task', error: (error as Error).message },
			{ status: 500 }
		);
	}
}