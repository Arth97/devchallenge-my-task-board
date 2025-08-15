import { createClient } from "@/utils/supabase/server";
import { Board } from "@/lib/types";

export async function createDefaultBoard(): Promise<Board> {
  const supabase = await createClient();

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

export async function getBoardById(id:string): Promise<Board | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from('Boards').select().eq('id', id).single();
  if (error) throw error;
  return data;
}