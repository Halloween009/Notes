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
    const body = await request.json();
    const ref = db.collection("notes").doc();
    const note = {
      id: ref.id,
      title: body.title ?? "",
      description: body.description ?? "",
      category: body.category ?? "other",
      type: body.type ?? "note",
      url: body.url ?? "",
      createdAt: body.createdAt ?? new Date().toISOString(),
    };
    await ref.set(note);
    return NextResponse.json({ success: true, ...note });
  } catch (error) {
    return NextResponse.json({ error: "Error adding note" }, { status: 500 });
  }
}
