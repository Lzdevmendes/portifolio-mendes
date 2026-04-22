# Portfólio — Luiz Mendes

Portfólio pessoal de **Luiz Mendes** ([@Lzdevmendes](https://github.com/Lzdevmendes)), desenvolvedor Full Stack com foco em React, Node.js e TypeScript.

## Stack

- **Framework:** Next.js 15 (App Router) + React 19
- **Linguagem:** TypeScript
- **Estilo:** Tailwind CSS v4 + variáveis CSS customizadas
- **Animações:** Framer Motion
- **Ícones:** Lucide React
- **Deploy:** gh-pages / Vercel

## Seções

| Seção          | ID                | Descrição                                 |
| -------------- | ----------------- | ----------------------------------------- |
| Hero           | `#about`          | Apresentação, stats e CTA                 |
| About          | `#about`          | Áreas de foco (Frontend, Backend, Mobile) |
| Projects       | `#projects`       | Repos do GitHub via API                   |
| Experience     | `#experience`     | Histórico profissional (timeline)         |
| Skills         | `#skills`         | Stack técnica por categoria               |
| Certifications | `#certifications` | Certificações e cursos                    |
| Footer         | `#contact`        | Contato e redes sociais                   |

## Rodando localmente

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

## Estrutura

```
src/
├── app/
│   ├── page.tsx          # Página principal
│   ├── layout.tsx        # Layout raiz + metadados
│   └── globals.css       # Estilos globais + tokens
├── components/
│   ├── layout/           # Navbar, Footer, MobileBottomNav
│   └── sections/         # Hero, About, Projects, Experience, Skills, Certifications
└── lib/
    └── github.ts         # Integração GitHub API
```
