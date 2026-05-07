# Portfolio Mendes — Contexto do Agente

## Stack
- Next.js 16 (App Router, static export para GitHub Pages)
- React 19, TypeScript 5
- Tailwind CSS 4 (via `@theme` no globals.css)
- Framer Motion 12 (animações)
- Lucide React (ícones)
- Deploy: `npm run build` → `gh-pages -d out`

## Estrutura de arquivos relevante
```
src/
  app/
    globals.css          — tokens de cor, keyframes, scrollbar, reset
    layout.tsx           — fontes (Inter + Syne), metadados
    page.tsx             — composição das seções
  components/
    layout/
      Navbar.tsx         — fixed top, progresso de scroll, IntersectionObserver por seção
      Footer.tsx         — CTA de contato + links sociais (id="contact")
      MobileBottomNav.tsx — bottom nav mobile (pointer: coarse)
      Providers.tsx      — MotionConfig reducedMotion="user"
    sections/
      Hero.tsx           — split layout: texto esquerda, terminal de código direita (desktop)
      About.tsx          — sticky esquerda, cards direita, parallax "SOBRE", mouse glow
      Projects.tsx       — server component, busca repos do GitHub
      ProjectsGrid.tsx   — grade de repos, tilt 3D no hover (desktop)
      ProjectsHeader.tsx — cabeçalho da seção
      Experience.tsx     — timeline com cards de experiência
      Skills.tsx         — grid de categorias com pills clicáveis
      Certifications.tsx — grade de certificações
  lib/
    github.ts            — fetch de repos públicos
agent/
  CONTEXT.md             — este arquivo (leia sempre antes de trabalhar)
```

## Paleta de cores (CSS vars)
```
--color-bg:          #0A0A0A   (fundo principal)
--color-bg-secondary:#111111
--color-bg-card:     #161616
--color-border:      #262626
--color-text:        #EDEDED
--color-muted:       #737373
--color-teal:        #0D9488   (cor de destaque primária)
--color-teal-light:  #14B8A6
--color-teal-dim:    #0D948820
```
Fontes: `--font-syne` (display/títulos), `--font-inter` (corpo)

## Regras de idioma
- Conteúdo geral: **Português**
- Termos técnicos: **Inglês** (Stack, Skills, Frontend, Backend, Mobile, Core Stack, Full-Stack, CI/CD, etc.)
- Nomes de certificações: **Inglês** (são nomes oficiais)
- Labels de categorias técnicas (Skills): **Inglês** (UI/UX, Server/API, QA, Data, Infra, Design, Fintech)
- "Brasil" (não "Brazil") quando referência geográfica em PT

## Decisões de performance (IMPORTANTES — não reverter)
1. `useScroll`+`useTransform` só permitido em elementos **decorativos** (ex: texto "SOBRE") — NUNCA em colunas de conteúdo inteiro
2. `backdropFilter: blur()` removido de badges/botões — mantido apenas na Navbar quando scrollada
3. `CodeTerminal` (Hero) não monta no mobile (< 920px) — evita setIntervals desnecessários
4. `SkillPill` usa `whileHover` próprio — sem estado em cascata no pai
5. Scroll listeners sempre com `{ passive: true }`
6. Animações `whileInView` com `once: true` para não re-disparar

## Animação interativa do About
- Background "SOBRE": parallax via `useScroll` + `useTransform` (só Y, decorativo)
- Mouse tracking: glow radial que segue o cursor via DOM direto (sem setState)
- NÃO mover colunas de conteúdo com scroll — apenas elementos decorativos

## Seções e seus ids
| id              | Seção              |
|-----------------|--------------------|
| hero            | Hero               |
| about           | Sobre              |
| projects        | Projetos           |
| experience      | Experiência        |
| skills          | Stack & Skills     |
| certifications  | Certificações      |
| contact         | Footer (CTA)       |

## Commit style (CLAUDE.md)
Sempre single-line, sem body, sem bullet points, sem co-author.
Formato: `type(scope): short description`
