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

export async function updateTask(supabase: SupabaseClient, id: string, task: NewTask) {
  const { data, error } = await supabase.from('Tasks').update(task).eq('id', id).select()
  if (error) throw error;
  return data
}

export async function deleteTaks(supabase: SupabaseClient, id: string) {
  const { data, error } = await supabase.from('Tasks').delete().eq('id', id).select()
  if (error) throw error;
  return data
}