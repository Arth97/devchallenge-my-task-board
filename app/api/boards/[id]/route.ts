type ContextParams = {
  params: Promise<{
    id: string;
  }>
}

export async function GET() {
  console.log("")
  console.log("request")
  return Response.json({msg: "hola"})
}
 
export async function PUT(request: Request, { params }: ContextParams ) {
  const id = await params;
}
 
export async function DELETE(request: Request) {

}