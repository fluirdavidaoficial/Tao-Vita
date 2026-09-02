# Tao Vita

Atlas de estudo de acupuntura em português. Boas-vindas → menu vertical: Atlas (ficha, consulta, língua e pulso, 361 pontos), Yamamoto, Auriculoterapia, Veterinária e Massagem (em aberto).

> Apoio ao estudo. O app não examina. Não substitui formação nem conduta profissional.

## Stack

- Vite + React 19 + TypeScript
- TanStack Router / Start
- Tailwind CSS 4

## Desenvolvimento

```bash
npm install
npm run dev
```

O app sobe em `http://localhost:8080`.

```bash
npm run typecheck
npm run build
```

## Estrutura

- `src/lib/acupuncture/` — 14 meridianos, 361 pontos WHO, especificações
- `src/lib/tcm/` — protocolos, orelha, YNSA, veterinária, exame (língua/pulso)
- `src/lib/consulta/` — ranking determinístico da consulta
- `src/routes/` — boas-vindas `/`, menu `/inicio`, atlas e mapas
- `public/images/` — fotos dos pontos e placas (orelha, crânio, cão/gato/cavalo)
