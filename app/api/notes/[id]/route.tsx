import { NextRequest, NextResponse } from "next/server";
import { db } from "../firebase";

export async function GET(
  _: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  try {
    const doc = await db.collection("notes").doc(String(id)).get();
    if (!doc.exists) {
      // ВОЗВРАЩАЕМ projectId для диагностики
      return NextResponse.json({ error: "not found", projectId: process.env.FIREBASE_PROJECT_ID }, { status: 404 });
    }
    return NextResponse.json({ id: doc.id, ...doc.data(), projectId: process.env.FIREBASE_PROJECT_ID });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message, projectId: process.env.FIREBASE_PROJECT_ID }, { status: 500 });
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
