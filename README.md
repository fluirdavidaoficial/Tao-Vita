# Tao Vita

Atlas clínico de acupuntura em português: pontos dos 14 meridianos, protocolos por queixa, consulta (língua + pulso → síndrome), auriculoterapia e craniopuntura de Yamamoto (YNSA).

> Material educacional de apoio. Não substitui formação, diagnóstico nem conduta profissional.

## Stack

- Vite + React 19 + TypeScript
- TanStack Router
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

- `src/lib/acupuncture/` — catálogo de meridianos e pontos
- `src/lib/tcm/` — protocolos, mapas de orelha e YNSA
- `src/lib/consulta/` — motor de ranking da consulta
- `src/routes/` — telas (Atlas, Protocolos, Consulta, Diagnóstico, Orelha, Yamamoto)
- `public/images/` — fotos dos pontos e mapas
