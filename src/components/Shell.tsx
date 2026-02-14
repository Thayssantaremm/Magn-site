"use client";

import { useEffect, useState } from "react";
import { MagnMark } from "./MagnMark";
import { PageTree } from "./PageTree";
import { CmdK } from "./CmdK";

type Row = { id: string; parentId: string | null; title: string };

export function Shell({
  activeId,
  children,
}: {
  activeId?: string;
  children: React.ReactNode;
}) {
  const [rows, setRows] = useState<Row[]>([]);

  async function load() {
    const res = await fetch("/api/pages");
    setRows(await res.json());
  }

  async function create(parentId: string | null = null) {
    const res = await fetch("/api/pages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Nova página", parentId }),
    });
    const page = await res.json();
    window.location.href = `/p/${page.id}`;
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="flex min-h-screen">
      <aside className="w-72 shrink-0 border-r border-magn-border bg-white">
        <div className="flex items-center gap-2 border-b border-magn-border px-4 py-3">
          <MagnMark />
          <div className="leading-tight">
            <div className="text-sm font-semibold">Magn</div>
            <div className="text-xs text-gray-500">Workspace</div>
          </div>
        </div>

        <div className="p-3">
          <button
            onClick={() => create(null)}
            className="w-full rounded-md border border-magn-border px-3 py-2 text-sm hover:bg-magn-hover"
          >
            New page
          </button>

          <div className="mt-3">
            <PageTree rows={rows} activeId={activeId} />
          </div>

          <div className="mt-4 text-xs text-gray-500">
            Ctrl/⌘ + K para buscar
          </div>
        </div>
      </aside>

      <main className="flex-1 bg-white">
        <CmdK rows={rows.map((r) => ({ id: r.id, title: r.title }))} onCreate={() => create(null)} />
        {children}
      </main>
    </div>
  );
}
