# Magn (Notion-like) — MVP

Editor em blocos + páginas aninhadas + sidebar + Ctrl+K + autosave.
Identidade: verde Magn (#9ec188), branco e preto.

## 1) Requisitos
- Node 18+
- PostgreSQL (pode ser Supabase/Neon)

## 2) Rodar local
1. Crie um banco Postgres e pegue sua `DATABASE_URL`
2. Crie um arquivo `.env` na raiz com:
   DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DB?schema=public"

3. Instale deps e rode migrações:
```bash
npm i
npm run prisma:migrate
npm run dev
```

Abra: http://localhost:3000

## 3) Deploy
- Vercel (Next)
- Neon/Supabase (Postgres)

## 4) Notas
- Realtime/colaboração (Yjs/Liveblocks) fica para fase 2.
