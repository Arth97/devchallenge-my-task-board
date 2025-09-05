import { BoardType } from "@/lib/types";
import { SupabaseClient } from "@supabase/supabase-js";

export async function createDefaultBoard(supabase: SupabaseClient): Promise<BoardType> {
  const defaultBoard = {
    name: 'My Task Board',
    description: 'Task to keep organised',
  };
  const { data, error } = await supabase
    .from('Boards')
    .insert([defaultBoard])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function getBoardById(supabase: SupabaseClient, id:string): Promise<BoardType | null> {
  const { data, error } = await supabase.from('Boards').select().eq('id', id).single();
  if (error) throw error;
  return data;
}

export async function updateBoard(supabase: SupabaseClient, id: string, board: BoardType) {
  const { data, error } = await supabase.from('Boards').update(board).eq('id', id).select()
  if (error) throw error;
  return data
}

export async function deleteBoard(supabase: SupabaseClient, id: string) {
  const { data, error } = await supabase.from('Boards').delete().eq('id', id).select()
  if (error) throw error;
  return data
}
