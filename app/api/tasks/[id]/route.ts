import { createClient } from "@supabase/supabase-js";

type Params = {
  params: Promise<{
    id: string
  }>
}

export async function PUT(request: Request, { params }: Params) {
	const { id } = await params;
	const supabase = await createClient();
}
 
export async function DELETE(request: Request, { params }: Params) {
	const { id } = await params;
	const supabase = await createClient();
}