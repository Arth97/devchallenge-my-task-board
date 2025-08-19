import { SupabaseClient } from "@supabase/supabase-js";
import { NewTask } from "../types";


export async function createDefaultTasks(supabase: SupabaseClient, boardId: string) {
  const defaultTasks: NewTask[] = [
    { board_id: boardId, status: "inprogress", title: "Task in Progress", description: "", icon: "⏰" },
    { board_id: boardId, status: "completed", title: "Task Completed", description: "", icon: "🏋️" },
    { board_id: boardId, status: "wontdo", title: "Task Won't Do", description: "", icon: "☕️" },
  ]
  const { data, error } = await supabase.from('Tasks').insert(defaultTasks).select()
  console.log("data", data)
  if (error) throw error;
  return data
}