import { DeleteButton } from "@/components/ClientSide";
import Link from "next/link";

export default async function NotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const { id } = await params;
  const res = await fetch(`${baseUrl}/api/notes/${id}`);
  const note = await res.json();
  if (!note) return <div>Заметка не найдена</div>;
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl mt-10 font-semibold">{note.title}</h1>
      <article className="border-4 border-amber-600 w-1/4 mx-auto p-5 my-10 rounded-2xl bg-white">
        <div className="my-5">
          <p>Description: {note.description}</p>
          <p>Category: {note.category}</p>
          <p>Date: {note.createdAt}</p>
          {note?.type === "link" && <p>{note?.url}</p>}
        </div>
      </article>
      <div className="gap-2 flex">
        <Link
          href="/"
          className="px-4 py-3 border border-amber-950 rounded-2xl bg-amber-950 text-white "
        >
          Back
        </Link>
        <DeleteButton id={id} />
      </div>
    </div>
  );
}
