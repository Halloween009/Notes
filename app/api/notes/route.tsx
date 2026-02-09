import { NextResponse, NextRequest } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "/app/api/notes/notes.json");

export async function GET() {
  const data = await fs.readFile(filePath, "utf-8");
  const notes = JSON.parse(data);
  return NextResponse.json(notes);
}

export async function POST(request: NextRequest) {
  const note = await request.json();
  const data = await fs.readFile(filePath, "utf-8");
  const notes = JSON.parse(data);
  notes.push(note);
  await fs.writeFile(filePath, JSON.stringify(notes, null, 2));
  return NextResponse.json({ success: true, note });
}
