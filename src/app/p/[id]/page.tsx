"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { Shell } from "@/components/Shell";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/react/style.css";
import { BlockNoteView } from "@blocknote/react";
import { useCreateBlockNote } from "@blocknote/react";

type PageT = {
  id: string;
  title: string;
  content: any;
  icon: string | null;
  coverUrl: string | null;
};

export default function PageEditor() {
  const { id } = useParams<{ id: string }>();
  const [page, setPage] = useState<PageT | null>(null);
  const [title, setTitle] = useState("");

  const editor = useCreateBlockNote({ initialContent: [] });

  async function load() {
    const res = await fetch(`/api/pages/${id}`);
    const data = await res.json();
    setPage(data);
    setTitle(data.title ?? "Untitled");
    if (data.content) editor.replaceBlocks(editor.document, data.content);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // autosave simples (melhorar com debounce depois)
  async function save(nextTitle?: string) {
    const payload: any = { content: editor.document };
    if (typeof nextTitle === "string") payload.title = nextTitle;

    await fetch(`/api/pages/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  }

  return (
    <Shell activeId={id}>
      <div className="mx-auto max-w-3xl p-10">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => save(title)}
          className="w-full bg-transparent text-4xl font-semibold outline-none"
          placeholder="Untitled"
        />

        <div className="mt-6">
          <BlockNoteView editor={editor} onChange={() => save()} />
        </div>
      </div>
    </Shell>
  );
}
