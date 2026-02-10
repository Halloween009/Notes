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
    const docRef = await db.collection("notes").add(note);
    return NextResponse.json({ success: true, id: docRef.id, ...note });
  } catch (error) {
    return NextResponse.json({ error: "Error adding note" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json(); // исправлено: вызов функции
    await db.collection("notes").doc(String(id)).delete();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting note" }, { status: 500 });
  }
}
