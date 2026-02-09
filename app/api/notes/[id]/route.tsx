import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { Note } from "@/types/types";
import { promises as fs } from "fs";
const filePath = path.join(process.cwd(), "/app/api/notes/notes.json");

export async function GET(
  _: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const data = await fs.readFile(filePath, "utf-8");
  const notes = JSON.parse(data);
  const note = notes.find((note: Note) => note.id === id);
  if (!note) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
  return NextResponse.json(note);
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id?: string }> },
) {
  console.log("Server params:", context.params);
  try {
    const { id } = await context.params;
    const data = await fs.readFile(filePath, "utf-8");
    const notes = JSON.parse(data);
    const filter = notes.filter((note: Note) => note.id !== id);
    await fs.writeFile(filePath, JSON.stringify(filter, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
