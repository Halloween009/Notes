import { NextRequest, NextResponse } from "next/server";
import { db } from "../firebase";

export async function GET(
  _: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  try {
    const snapshot = await db.collection("notes").get();
    const note = snapshot.docs.find((doc) => doc.id === String(id));
    if (!note) {
      return NextResponse.json(
        { error: "not found", env: process.env },
        { status: 404 },
      );
    }
    return NextResponse.json({ id: note.id, ...note.data(), env: process.env });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: message, projectId: process.env.FIREBASE_PROJECT_ID },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id?: string }> },
) {
  try {
    const { id } = await context.params;
    await db.collection("notes").doc(String(id)).delete();
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
