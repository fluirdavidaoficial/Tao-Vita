# Tao Vita

Atlas de estudo de acupuntura em português. Boas-vindas → menu: Atlas (ficha, consulta, língua e pulso, 361 pontos), Yamamoto, Auriculoterapia, Veterinária e Massagem/gatilhos.

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


## Documentação

Pacote completo em `public/docs/` (também em **Menu → Documentos** no app):

| Arquivo | Conteúdo |
|---|---|
| [Tao-Vita-documentacao.html](public/docs/Tao-Vita-documentacao.html) | Manual do produto v2.1 |
| [Tao-Vita-documentacao.pdf](public/docs/Tao-Vita-documentacao.pdf) | PDF do manual (com prints) |
| [Tao-Vita-galeria-telas.html](public/docs/Tao-Vita-galeria-telas.html) | Galeria de telas (desktop e telefone) |
| [Tao-Vita-homologacao.html](public/docs/Tao-Vita-homologacao.html) | Homologação HOMO-TV-2.1 (9/09/2026) |

Evidências da homologação: `public/docs/prints/` (série numerada da galeria + `h2-*` da rodada 2.1).
