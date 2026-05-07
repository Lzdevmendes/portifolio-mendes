# Portfolio Mendes — Contexto Completo do Agente

> **LEIA ESTE ARQUIVO ANTES DE QUALQUER AÇÃO NO PROJETO.**
> Atualiza este documento sempre que fizer mudanças estruturais.

---

## 1. Quem é o dono do projeto

**Luiz Felipe Barreto Mendes** — Desenvolvedor Full Stack JR/Pleno, 22 anos, São Paulo/BR.
- GitHub: `Lzdevmendes`
- Email: `lzmendestechdev@gmail.com`
- LinkedIn: `linkedin.com/in/lzmendess`
- Membro de 2 organizações no GitHub
- Processou +$1.0M em soluções de pagamento
- Clientes: Obracon (Sabesp), Multiclínica, GCB (Petrobras)

---

## 2. Stack técnica do projeto

| Item | Versão / Detalhe |
|---|---|
| Next.js | 16.1.6 — App Router, `output: "export"` (static) |
| React | 19.2.3 |
| TypeScript | ^5 |
| Tailwind CSS | ^4 via `@tailwindcss/postcss` — tokens no `@theme` do globals.css |
| Framer Motion | ^12 |
| Lucide React | ^0.575 (ícones) |
| Fontes | Inter (corpo) + Syne (display/títulos) via `next/font/google` |
| Deploy | GitHub Pages via `gh-pages -d out` (`npm run deploy`) |
| Imagens | `unoptimized: true`, remotePatterns: avatars.githubusercontent.com |

**Não há Three.js, @react-three/fiber, @react-three/drei.** Foram removidos — não adicionar de volta sem discussão explícita.

---

## 3. Estrutura de arquivos

```
/
├── agent/
│   └── CONTEXT.md              ← este arquivo — leia sempre primeiro
├── src/
│   ├── app/
│   │   ├── globals.css         ← tokens de cor, keyframes, scrollbar, reset global
│   │   ├── layout.tsx          ← fontes, <html lang="pt-BR">, metadata SEO
│   │   └── page.tsx            ← composição das seções (ordem: Hero→About→Projects→Experience→Skills→Certs→Footer)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx      ← fixed top, barra de progresso scroll, IntersectionObserver por seção
│   │   │   ├── Footer.tsx      ← id="contact", CTA de contato, sociais, back-to-top
│   │   │   ├── MobileBottomNav.tsx ← bottom nav (pointer: coarse / max-width 768px), IntersectionObserver
│   │   │   └── Providers.tsx   ← MotionConfig reducedMotion="user"
│   │   └── sections/
│   │       ├── Hero.tsx        ← layout split: texto esquerda | terminal de código direita (só desktop ≥920px)
│   │       ├── About.tsx       ← sticky esquerda | cards direita; parallax "SOBRE" + mouse glow interativo
│   │       ├── Projects.tsx    ← server component async, busca repos GitHub de "Lzdevmendes"
│   │       ├── ProjectsHeader.tsx ← cabeçalho da seção Projetos (client)
│   │       ├── ProjectsGrid.tsx   ← grade de repo cards, tilt 3D no hover (desktop only, isTouch guard)
│   │       ├── Experience.tsx  ← timeline de 3 experiências, cards com whileHover
│   │       ├── Skills.tsx      ← grid de 7 categorias de skills, pills clicáveis com whileHover próprio
│   │       └── Certifications.tsx ← grade 3-colunas de 6 certificações, hover interativo
│   └── lib/
│       └── github.ts           ← fetch repos GitHub (revalidate 3600s, filtra forks)
├── next.config.ts              ← output:"export", images unoptimized
├── CLAUDE.md                   ← regras de commit para o Claude Code
└── package.json
```

---

## 4. Paleta de cores (CSS custom properties)

Definidas em `globals.css` via `@theme {}`:

```css
--color-bg:           #0A0A0A    /* fundo principal */
--color-bg-secondary: #111111
--color-bg-card:      #161616    /* cards e painéis */
--color-border:       #262626    /* bordas sutis */
--color-text:         #EDEDED    /* texto principal */
--color-muted:        #737373    /* texto secundário */
--color-teal:         #0D9488    /* cor de destaque primária */
--color-teal-light:   #14B8A6   /* destaque mais claro */
--color-teal-dim:     #0D948820 /* glow sutil */
```

Easing tokens: `--ease-smooth: cubic-bezier(0.4,0,0.2,1)` | `--ease-spring: cubic-bezier(0.34,1.56,0.64,1)`

---

## 5. Detalhamento de cada componente

### `layout.tsx`
- `lang="pt-BR"`, fontes Inter + Syne como variáveis CSS
- Metadata SEO completa com openGraph e twitter card
- Título: "Luiz Mendes — Desenvolvedor Fullstack JR / Pleno"

### `globals.css`
- Reset completo, `box-sizing: border-box`, `scroll-behavior: smooth`
- `scroll-padding-top: 80px` (offset do navbar fixo)
- `overscroll-behavior-y: contain` (evita pull-to-refresh)
- `padding-bottom` do body: `72px + safe-area` no mobile (espaço para MobileBottomNav)
- Keyframes: `teal-pulse`, `fade-up`, `pulse-dot` (usado em badges pulsantes)
- Scrollbar customizada: 3px, gradiente teal
- Touch targets: `min-height: 44px` somente em `button` e `[role="button"]` — **não em `<a>`**

### `Navbar.tsx`
- Fixed top, `useScroll()` + `useSpring()` para barra de progresso
- Scroll listener com `{ passive: true }`
- `backdropFilter: blur(16px)` SOMENTE quando `scrolled === true`
- 2 IntersectionObservers: "nearby" (rootMargin -5%) e "active" (rootMargin -40%) por seção
- Mobile menu (`< 768px`): sem backdrop-filter (removido por performance)
- Dot indicator por link: escala e opacidade via spring animation

### `Footer.tsx` (id="contact")
- CTA de contato com email e LinkedIn
- Localização: "Brasil" (não "Brazil")
- Back-to-top via `window.scrollTo({ top: 0, behavior: "smooth" })`
- Ícones sociais: GitHub, LinkedIn, Email

### `MobileBottomNav.tsx`
- Renderiza apenas em `pointer: coarse` ou `max-width: 768px`
- IntersectionObserver com threshold 0.3 para detectar seção ativa
- Scroll programático: `window.scrollTo({ top, behavior: "smooth" })` com offset de 72px (navbar)
- `layoutId="nav-dot"` para animação de seleção fluida

### `Hero.tsx`
- Layout: `grid-template-columns: 1.1fr 0.9fr` (desktop ≥ 920px)
- **Esquerda**: nome, badges, bio, CTAs, stats com stagger animation
- **Direita** (só desktop): `CodeTerminal` (typed animation com 2 setIntervals) + `TechChips`
  - `isDesktop` state via `useEffect` + `window.innerWidth >= 920`
  - Terminal **NÃO monta no mobile** — evita setIntervals correndo em background
- Background: dot grid + 2 blobs radiais (teal direita, roxo esquerda)
- Scroll indicator: linha teal animada `y: [0, 9, 0]`, oculta em mobile
- `PulseDot`: CSS `animation: pulse-dot 1.5s ease-in-out infinite` (não Framer Motion)
- CodeTerminal: 2 `setInterval` — 105ms (typing), 520ms (blink cursor)

### `About.tsx` ← **ANIMAÇÃO INTERATIVA — leia com atenção**
- `useScroll` + `useTransform` aplicado **SOMENTE** no texto "SOBRE" decorativo (`bgY`: -10% → 10%)
- Mouse glow: `handleMouseMove` atualiza `glowRef.current.style.background` (DOM direto, zero `setState`)
  - Gradiente radial de 700px segue o cursor, `transition: background 0.4s ease`
  - `onMouseLeave` seta background para `"transparent"`
- **Coluna esquerda**: sticky `top: 120px`, entrance via `whileInView` once
- **Coluna direita**: `div` simples, cada `FocusCard` tem próprio `whileInView`
- `FocusCard`: `whileHover={{ x: 4 }}` + `onMouseEnter/Leave` para bordas coloridas
- **Regra crítica**: NUNCA aplicar `useTransform` em colunas de conteúdo inteiro (causa jank)

### `Projects.tsx`
- **Server Component** async — fetch em `getGithubRepos("Lzdevmendes")`
- API: `https://api.github.com/users/{user}/repos?sort=updated&per_page=20&type=public`
- Revalidate 3600s (ISR), filtra forks
- Fallback: mensagem de erro + link direto pro GitHub

### `ProjectsGrid.tsx`
- `isTouch` state via `window.matchMedia("(pointer: coarse)")`
- Tilt 3D: `useMotionValue` + `useSpring` por card — **só ativa em `!isTouch`**
- `whileInView` com `once: true` por card

### `Experience.tsx`
- 3 experiências: Obracon/Sabesp, Multiclínica, GCB/Petrobras
- Timeline vertical: linha estática com gradiente teal (sem scroll-linking — foi removido por performance)
- `ExperienceItem`: `whileInView` entrance + `whileHover` no card (y:-3, border teal)
- Layout `grid-template-columns: 140px 1fr` desktop / `1fr` mobile

### `Skills.tsx`
- 7 categorias: Frontend, Backend, Testes, Banco de Dados, DevOps & Cloud, Arquitetura, Pagamentos
- `FeaturedTech` strip: 8 techs principais com `whileInView` + `whileHover`
- `CategoryCard`: `motion.div` com `variants` (stagger via parent)
- `SkillPill`: **self-contained** — usa `whileHover="hover"` próprio com `variants` (sem estado no pai)
  - Pills com URL abrem em nova aba, mostram `ArrowUpRight` no hover via variant child

### `Certifications.tsx`
- 6 certificações: Full-Stack Training, React Developer, Node.js Developer, AWS Cloud Practitioner, JS Algorithms, Advanced TypeScript
- Grid 3 colunas desktop / 2 tablet / 1 mobile
- `CertCard`: hover via `useState` — borda colorida, accent bar top, credencial muda de cor

---

## 6. Regras de idioma

| Tipo de conteúdo | Idioma |
|---|---|
| Conteúdo narrativo | **Português** |
| Termos técnicos universais | **Inglês** (Stack, Skills, Frontend, Backend, Mobile, Full-Stack, CI/CD, Core Stack, etc.) |
| Nomes de certificações | **Inglês** (são nomes oficiais das plataformas) |
| Labels de categorias Skills | **Inglês** (UI/UX, Server/API, QA, Data, Infra, Design, Fintech) |
| Referência geográfica | **"Brasil"** — nunca "Brazil" |
| Títulos de seção | **Português** ("Experiência Profissional", "Competências", "Formação") |

---

## 7. Regras de performance (CRÍTICAS — nunca reverter)

1. **`useScroll` + `useTransform`** → permitido APENAS em elementos decorativos (`willChange: "transform"` obrigatório). NUNCA em colunas de conteúdo.
2. **`backdropFilter: blur()`** → apenas na Navbar quando scrollada. Removido de todos os outros elementos.
3. **`CodeTerminal`** → não monta no mobile (< 920px). Os 2 `setInterval` só rodam em desktop.
4. **`SkillPill`** → `whileHover` self-contained. Sem `useState` no pai `CategoryCard`.
5. **Scroll listeners** → sempre `{ passive: true }`.
6. **`whileInView`** → sempre `viewport={{ once: true }}`. Nunca re-disparar.
7. **Mouse tracking** → DOM direto (`ref.style`), nunca `setState` em `onMouseMove`.
8. **Timeline Experience** → linha estática. Não reconectar `useScroll` para `lineHeight`.
9. **About right column** → `div` simples. Não colocar transforms scroll-linked.

---

## 8. Seções e seus IDs

| ID | Componente | Label no Nav |
|---|---|---|
| `hero` | Hero.tsx | — |
| `about` | About.tsx | Sobre |
| `projects` | Projects.tsx | Projetos |
| `experience` | Experience.tsx | Experiência |
| `skills` | Skills.tsx | Skills |
| `certifications` | Certifications.tsx | Certs |
| `contact` | Footer.tsx | Contato |

---

## 9. Dados de conteúdo

### Experiências profissionais
| Empresa | Cliente | Período | Stack |
|---|---|---|---|
| Obracon | Sabesp | Mar 2023 — Mar 2026 | Node.js, React, .NET, PostgreSQL, Docker, Azure |
| Multiclínica | — | 2022 — 2023 | React, Node.js, TypeScript, PostgreSQL, Stripe, AWS |
| GCB | Petrobras | 2021 — 2022 | .NET, React, SQL Server, C#, Azure DevOps |

### Certificações
| Título | Plataforma | Ano |
|---|---|---|
| Full-Stack Training | Rocketseat | 2024 |
| React Developer | Rocketseat | 2024 |
| Node.js Developer | Rocketseat | 2023 |
| AWS Cloud Practitioner | Amazon Web Services | 2024 |
| JavaScript Algorithms & Data Structures | freeCodeCamp | 2023 |
| Advanced TypeScript | DIO | 2023 |

### Stats do Hero
- 1.5+ anos de experiência
- $1M+ em pagamentos
- 3 grandes clientes

### Stats do About
- 10+ projetos entregues
- 2 orgs no GitHub
- 7+ stacks dominadas

---

## 10. Padrões de animação Framer Motion aprovados

```tsx
// Entrada de seção (use sempre viewport once:true)
initial={{ opacity: 0, y: 24 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-80px" }}
transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}

// Hover em cards
whileHover={{ y: -3, borderColor: "rgba(13,148,136,0.38)" }}
transition={{ duration: 0.25 }}

// Parallax decorativo (APENAS elementos visuais, não conteúdo)
const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] })
const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])
// + willChange: "transform" no elemento

// Stagger de lista
const container = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.25 } } }
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.65 } } }
```

---

## 11. Deploy

```bash
npm run build   # gera pasta /out com static export
npm run deploy  # gh-pages -d out → GitHub Pages
```

Next.js exporta para `/out`. GitHub Actions ou manual via `npm run deploy`.
Não há API routes — apenas fetch de server components (revalidado em build/ISR).

---

## 12. Regras de commit (CLAUDE.md — obrigatório)

- **Sempre single-line** — title only, sem body, sem bullet points
- **Sem co-author signatures** ("Co-Authored-By", "Generated by", etc.)
- Formato: `type(scope): short description`
- Exemplos: `feat(hero): add open to work badge` | `fix(navbar): correct mobile menu spacing` | `style(about): adjust card padding`

---

## 13. Como trabalhar neste projeto

1. **Sempre leia este arquivo primeiro** antes de codar qualquer coisa
2. Ao modificar um componente, verifique as regras de performance da seção 7
3. Ao adicionar texto, aplique as regras de idioma da seção 6
4. Ao criar animações, siga os padrões da seção 10
5. Após mudanças estruturais, **atualize este CONTEXT.md**
6. Commits: single-line, sem body, sem assinaturas automáticas
