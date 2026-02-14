import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const CreateSchema = z.object({
  title: z.string().min(1).optional(),
  parentId: z.string().optional().nullable(),
});

export async function GET() {
  const pages = await prisma.page.findMany({
    where: { isDeleted: false },
    select: { id: true, parentId: true, title: true, updatedAt: true },
    orderBy: { updatedAt: "desc" },
  });
  return NextResponse.json(pages);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { title, parentId } = CreateSchema.parse(body);

  const page = await prisma.page.create({
    data: { title: title ?? "Untitled", parentId: parentId ?? null },
    select: { id: true, parentId: true, title: true },
  });
  return NextResponse.json(page);
}
