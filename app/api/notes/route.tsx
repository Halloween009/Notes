import { NextResponse, NextRequest } from "next/server";
import { db } from "./firebase";

export async function GET() {
  try {
    const snapshot = await db.collection("notes").get();
    const notes = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(notes);
  } catch (error) {
    return NextResponse.json({ error: "Error getting error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const note = await request.json();
    await db.collection("notes").doc(String(note.id)).set(note);
    return NextResponse.json({ success: true, id: note.id, ...note });
  } catch (error) {
    return NextResponse.json({ error: "Error adding note" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await db.collection("notes").doc(String(id)).delete();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting note" }, { status: 500 });
  }
}
