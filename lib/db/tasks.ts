import { SupabaseClient } from "@supabase/supabase-js";
import { NewTask, Status } from "../types";

export async function createDefaultTasks(supabase: SupabaseClient, boardId: string) {
  const defaultTasks: NewTask[] = [
    { board_id: boardId, status: Status.IN_PROGRESS, title: "Task in Progress", description: "", icon: "⏰" },
    { board_id: boardId, status: Status.COMPLETED, title: "Task Completed", description: "", icon: "🏋️" },
    { board_id: boardId, status: Status.WONT_DO, title: "Task Won't Do", description: "", icon: "☕️" },
    { board_id: boardId, status: Status.TODO, title: "Task To Do", description: "Work on a Challenge on devChallenges.io, learn TypeScript.", icon: "📚" },
  ]
  const { data, error } = await supabase.from('Tasks').insert(defaultTasks).select()
  if (error) throw error;
  return data
}

export async function getTasksByBoardId(supabase: SupabaseClient, boardid: string) {
  const { data, error } = await supabase.from('Tasks').select().eq('board_id', boardid)
  if (error) throw error;
  return data
}

export async function createTask(supabase: SupabaseClient, task: NewTask) {
  const { data, error } = await supabase.from('Tasks').insert(task).select().single()
  if (error) throw error;
  return data
}

export async function updateTask(supabase: SupabaseClient, id: string, task: NewTask) {
  const { data, error } = await supabase.from('Tasks').update(task).eq('id', id).select().single()
  if (error) throw error;
  return data
}

export async function deleteTask(supabase: SupabaseClient, id: string) {
  const { error } = await supabase.from('Tasks').delete().eq('id', id);
  if (error) throw error;
  return true;
}