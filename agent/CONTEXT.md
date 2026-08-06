# Portfolio Mendes — Contexto Completo do Agente

> **LEIA ESTE ARQUIVO ANTES DE QUALQUER AÇÃO NO PROJETO.**
> Atualiza este documento sempre que fizer mudanças estruturais.

---

## 1. Quem é o dono do projeto

**Luiz Felipe Barreto Mendes** — Desenvolvedor Full Stack JR/Pleno, São Paulo/BR.
- GitHub: `Lzdevmendes`
- Email: `lzmendestechdev@gmail.com`
- LinkedIn: `linkedin.com/in/lzmendess`
- Membro de 2 organizações no GitHub
- Fundador do Litoral na Palma (app mobile georreferenciado, +90 pontos de interesse, 4 municípios)
- Clientes/experiência: Obracon (Sabesp), GCB (Petrobras)
- **Fonte de verdade do conteúdo:** o CV em `/home/luiz/Documentos/cv_luizmendes.pdf` (copiado também
  pra `public/cv_luizmendes.pdf`). Sempre que o dono trouxer uma versão nova do CV, reconciliar
  Experience.tsx/Certifications.tsx/Hero.tsx/About.tsx com ele antes de qualquer outra mudança de
  conteúdo — foi o que gerou a divergência que motivou o refactor de 2026-08.

---

## 2. Stack técnica do projeto

| Item | Versão / Detalhe |
|---|---|
| Next.js | 16.1.6 — App Router, `output: "export"` (static) |
| React | 19.2.3 |
| TypeScript | ^5 |
| Tailwind CSS | ^4 via `@tailwindcss/postcss` — tokens no `@theme` do globals.css |
| Framer Motion | ^12 — via `LazyMotion`/`m.*`, não `motion.*` (ver §14) |
| GSAP + @gsap/react | ^3.15 / ^2.1 — dono do scroll e de timelines (ver §14) |
| Lucide React | ^0.575 (ícones) |
| Fontes | Inter (corpo) + Syne (display/títulos) via `next/font/google` |
| Deploy | GitHub Pages via `gh-pages -d out` (`npm run deploy`) |
| Imagens | `unoptimized: true`, remotePatterns: avatars.githubusercontent.com |

**Decisão (2026-08-04): Three.js está sendo reintroduzido.** Motivo: rebuild da camada de apresentação
como experiência 3D dirigida por scroll (referência edolus.com), especificada em
`agent/scroll-experience-spec/` (`00-PROMPT-CLAUDE-CODE.md` = regras de operação e fases,
`01-SPEC-EXPERIENCIA-SCROLL.md` = spec técnica completa, `02-scenes.data.ts` = dados de cena prontos
para `src/data/scenes.ts`). Stack alvo: `lenis` + `gsap`/`ScrollTrigger` (dono do scroll) + `three` +
`@react-three/fiber` + `@react-three/drei` + `@react-three/postprocessing`. Rebuild em 8 fases, uma por
vez com aprovação antes de cada uma — ver o prompt operacional para o detalhamento. Nenhum pacote 3D
foi instalado ainda; a Fase 0 (auditoria + extração de dados para `src/data/`) é a única concluída até
aqui.

---

## 3. Estrutura de arquivos

```
/
├── agent/
│   ├── CONTEXT.md               ← este arquivo — leia sempre primeiro
│   └── DESIGN_BRIEF.md          ← brief de redesign (não versionado), pra colar no Claude Design
├── src/
│   ├── app/
│   │   ├── globals.css          ← tokens de cor, keyframes, scrollbar, reset global
│   │   ├── layout.tsx           ← fontes (Inter, Syne, Space Mono), <html lang="pt-BR">, metadata SEO
│   │   ├── opengraph-image.tsx  ← imagem OG gerada via next/og (1200×630)
│   │   └── page.tsx             ← ⚠️ MODO MANUTENÇÃO ATIVO: renderiza só <Maintenance/>. O portfólio
│   │                              completo (Hero→About→Projects→Experience→Skills→Certs→Contact→Footer)
│   │                              está comentado no mesmo arquivo, pronto pra restaurar.
│   ├── data/                    ← NOVO (2026-08-04): fonte única de conteúdo de negócio. profile.ts,
│   │                              experience.ts, projects.ts, skills.ts, certifications.ts — cada
│   │                              componente de seção importa daqui em vez de manter array local. Copy
│   │                              de apresentação específica de layout (labels de seção, headings)
│   │                              continua nos componentes.
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx      ← fixed top, barra de progresso scroll, IntersectionObserver por seção
│   │   │   ├── Footer.tsx      ← rodapé simples: brand LM, back-to-top (desktop), copyright
│   │   │   ├── BackToTop.tsx   ← botão flutuante fixed bottom-right, aparece após 400px scroll
│   │   │   ├── MobileBottomNav.tsx ← bottom nav (pointer: coarse / max-width 768px), IntersectionObserver
│   │   │   └── Providers.tsx   ← MotionConfig reducedMotion="user" + LanguageProvider
│   │   └── sections/
│   │       ├── Hero.tsx             ← layout split: texto esquerda | terminal de código direita (só desktop ≥920px); stats com AnimatedStat (counter animado no viewport)
│   │       ├── About.tsx            ← sticky esquerda | cards direita; parallax "SOBRE" + mouse glow interativo
│   │       ├── Projects.tsx         ← wrapper da seção `#projects`, só renderiza <ProjectsShowcase/>
│   │       ├── ProjectsShowcase.tsx ← dados de projeto HARDCODED (array `PROJECTS`, sem fetch de API); mockups fake (`MacOSPlaceholder`) — reforma planejada em `DESIGN_BRIEF.md`
│   │       ├── Experience.tsx       ← timeline de 4 experiências (ver §9), cards com whileHover
│   │       ├── Skills.tsx           ← grid de 7 categorias de skills, pills clicáveis com whileHover próprio
│   │       ├── Certifications.tsx   ← grade de certificações/formação, hover interativo
│   │       ├── Contact.tsx          ← id="contact", card premium: Email/LinkedIn/GitHub + download CV
│   │       └── Maintenance.tsx      ← página exibida enquanto o site está em modo manutenção
│   └── contexts/
│       └── language.tsx        ← LanguageProvider/useLanguage — toggle pt/en client-side via localStorage
├── next.config.ts              ← output:"export", images unoptimized
├── CLAUDE.md                   ← regras de commit para o Claude Code
└── package.json
```

**Não existe mais `src/lib/github.ts`.** A arquitetura antiga (fetch de repos via API do GitHub)
foi abandonada — `ProjectsShowcase.tsx` hoje tem os projetos hardcoded em `Record<Lang, Project[]>`.
`next.config.ts` ainda tem `images.remotePatterns` pra `avatars.githubusercontent.com` de uma época
em que isso era usado — hoje é config morta (nenhum `next/image` no projeto).

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
- Reset completo, `box-sizing: border-box`
- `html`: apenas `scroll-behavior: smooth` + `scroll-padding-top: 80px` — **sem overflow-x** (causava bloqueio de scroll no deploy estático)
- `body`: `overflow-x: hidden` (apenas no body, não no html — regra crítica)
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

### `Footer.tsx`
- Rodapé simples — sem CTA de contato (movida para Contact.tsx)
- Brand: "LM" teal + MapPin "Brasil"
- Back-to-top inline (desktop only, hidden em mobile ≤480px)
- Copyright: "© {year} Luiz Mendes. Todos os direitos reservados."

### `BackToTop.tsx`
- Botão flutuante `position: fixed`, `right: 20px`
- Desktop: `bottom: 28px` | Mobile (pointer:coarse / ≤768px): `bottom: 88px` (acima MobileBottomNav)
- Aparece após 400px de scroll via `window.scrollY`
- AnimatePresence com scale+opacity+y de entrada/saída
- `ArrowUp` icon, glassmorphism com blur

### `Contact.tsx` (id="contact")
- Seção dedicada antes do Footer, substituiu a CTA band que estava no Footer
- Card premium com ambient glows (teal direita, indigo esquerda)
- Badge "Disponível para novas oportunidades" com pulse-dot
- Grid 3 colunas de ChannelCards: Email, LinkedIn, GitHub — cada um com cor e border próprios
- CTA de download de CV: `/cv_luizmendes.pdf` (existe em `/public`)
- Responsive: 3 cols desktop / 1 col ≤700px

### `MobileBottomNav.tsx`
- Renderiza apenas em `pointer: coarse` ou `max-width: 768px`
- IntersectionObserver com threshold 0.3 para detectar seção ativa
- Scroll programático: `window.scrollTo({ top, behavior: "smooth" })` com offset de 72px (navbar)
- `layoutId="nav-dot"` para animação de seleção fluida

### `Hero.tsx`
- Layout: `grid-template-columns: 1.1fr 0.9fr` (desktop ≥ 920px)
- **Esquerda**: nome, badges, bio, CTAs, stats com stagger animation
- **Stats**: `AnimatedStat` — usa `animate(0, end)` do Framer Motion + `useInView` once; `fontVariantNumeric: tabular-nums`
  - `{ end: 2, suffix: "+" }` (anos) | `{ end: 90, suffix: "+" }` (pontos de interesse mapeados) | `{ end: 2 }` (grandes clientes)
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

### `Projects.tsx` / `ProjectsShowcase.tsx`
- `Projects.tsx` é só um wrapper (`<section id="projects">` + separador) que renderiza `<ProjectsShowcase/>`
- `ProjectsShowcase.tsx` (client component) importa os projetos de `src/data/projects.ts`
  (`PROJECTS: Record<Lang, Project[]>`) — sem fetch de API. Hoje mostra 2 cases (Obracon×Sabesp,
  GCB×Petrobras) com mockup fake (`MacOSPlaceholder`) porque nenhum tem `image`/`video` real ainda.
  Multiclínica foi removida daqui também em 2026-08-04 (decisão do dono) — antes só tinha saído de
  Experience, ver §9
- Reforma estrutural (grid enxuto + página de detalhe por projeto, projetos reais do GitHub) já
  está desenhada em `agent/DESIGN_BRIEF.md` — **ON HOLD** até o dono trazer o resultado do Claude Design

### `Experience.tsx`
- 4 experiências (ver §9): GCB/Petrobras → Obracon Suporte TI/Sabesp → Obracon Full Stack/Sabesp →
  Litoral na Palma (projeto pessoal, fundador)
- Timeline vertical: linha estática com gradiente teal (sem scroll-linking — foi removido por performance)
- `ExperienceItem`: `whileInView` entrance + `whileHover` no card (y:-3, border teal)
- Layout `grid-template-columns: 140px 1fr` desktop / `1fr` mobile
- **Atenção à `key`**: como duas entradas são da mesma empresa (Obracon, cargos diferentes), a key do
  map é `${exp.company}-${exp.period}`, não só `exp.company`

### `Skills.tsx`
- 7 categorias: Frontend, Backend, Testes, Banco de Dados, DevOps & Cloud, Arquitetura, UI/UX Design
  (categoria "Pagamentos/Fintech" foi removida — era lastreada só pelo case da Multiclínica, que saiu
  da Experiência, ver §9)
- `CategoryCard`: `motion.div` com `variants` (stagger via parent)
- `SkillPill`: **self-contained** — usa `whileHover="hover"` próprio com `variants` (sem estado no pai)
  - Pills com URL abrem em nova aba, mostram `ArrowUpRight` no hover via variant child

### `Certifications.tsx`
- 5 itens: Técnico em Informática (IFSP), React Developer (DIO), PRO Python Developer (DIO),
  IA Generativa (Universia/DIO), Análise e Desenvolvimento de Sistemas (Anhanguera, em andamento)
- Grid responsivo (1/2/3 colunas conforme breakpoint)
- `CertCard`: hover via `useState` — borda colorida, accent bar top, credencial muda de cor

### `Maintenance.tsx`
- Página única exibida por `page.tsx` enquanto o modo manutenção está ativo
- Links diretos: Email, LinkedIn, GitHub (mesmo conjunto de `Contact.tsx`)

### `src/contexts/language.tsx`
- `LanguageProvider`/`useLanguage()` — Context simples (sem lib de i18n), estado `lang: "pt" | "en"`
- Persiste em `localStorage` (`portfolio-lang`), lido só no client via `useEffect` (evita mismatch de hidratação)
- Usado por praticamente todo componente de seção/layout — qualquer texto novo precisa existir nos
  dois idiomas dentro do objeto `Record<Lang, ...>` de cada arquivo

---

## 6. Regras de idioma

**O site é bilíngue pt/en** via `src/contexts/language.tsx` (toggle client-side, ver §5). Todo texto
narrativo precisa existir nos dois idiomas dentro do `Record<Lang, ...>` do componente — não é só uma
"regra de tom", é um requisito estrutural do código.

| Tipo de conteúdo | Idioma |
|---|---|
| Conteúdo narrativo | **Português e Inglês** (via `Record<Lang, ...>` em cada componente) |
| Termos técnicos universais | **Inglês** em ambos os idiomas (Stack, Skills, Frontend, Backend, Mobile, Full-Stack, CI/CD, Core Stack, etc.) |
| Nomes de certificações | **Como emitidos** (nomes oficiais das instituições/plataformas) |
| Labels de categorias Skills | **Inglês** (UI/UX, Server/API, QA, Data, Infra, Design) |
| Referência geográfica | **"Brasil"** em pt, **"Brazil"** em en |
| Títulos de seção | Traduzidos por idioma (ex.: "Experiência Profissional" / "Professional Experience") |

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
| `contact` | Contact.tsx | Contato |

---

## 9. Dados de conteúdo

**Fonte de verdade:** CV em `/home/luiz/Documentos/cv_luizmendes.pdf` (== `public/cv_luizmendes.pdf`).
Última reconciliação: 2026-08-03.

### Experiências profissionais
| # | Empresa/Projeto | Cliente | Cargo | Período |
|---|---|---|---|---|
| 1 | GCB Manutenção | Petrobras | Desenvolvedor Backend Jr | Fev 2024 — Mai 2024 |
| 2 | Obracon Engenharia | Sabesp | Técnico de Suporte de TI | Dez 2024 — mudança de função |
| 3 | Obracon Engenharia | Sabesp | Desenvolvedor Full Stack | Mar 2025 — Mar 2026 |
| 4 | Litoral na Palma (projeto pessoal) | — | Fundador & Desenvolvedor Full Stack | Jul 2025 — Presente |

**Multiclínica foi removida** (não consta nas 2 páginas do CV atual). Se reaparecer em uma versão
futura do CV, reconciliar de novo antes de reintroduzir no site.

### Certificações / Formação
| Título | Emissor | Data |
|---|---|---|
| Técnico em Informática | IFSP — Campus Caraguatatuba | 2019 — 2021 |
| React Developer | DIO | 2024 |
| PRO Python Developer | DIO | 2025 |
| Introdução aos Fundamentos de IA Generativa | Universia / DIO | Set. 2025 |
| Análise e Desenvolvimento de Sistemas | Anhanguera | 2026 — em andamento |

### Stats do Hero
- 2+ anos de experiência
- 90+ pontos de interesse mapeados (Litoral na Palma)
- 2 grandes clientes (Sabesp, Petrobras)

### Stats do About
- 10+ projetos entregues
- 2 orgs no GitHub
- 7+ stacks dominadas

### Métrica removida
O destaque "$1.0M+ processados em pagamentos" (Hero, About, categoria Skills "Pagamentos") foi
**removido** — não consta no CV atual (que agora destaca o Litoral na Palma). Em 2026-08-04, na
auditoria da Fase 0 do rebuild scroll-3D, foi confirmado que a métrica ainda sobrevivia no terminal
simulado do Hero e na descrição do projeto Multiclínica em `ProjectsShowcase.tsx` — o dono confirmou
remoção definitiva, agora aplicada nos dois lugares. Não reintroduzir sem nova confirmação do dono.

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
4. Ao criar animações, siga os padrões da seção 10 (Framer) e a seção 14 (GSAP/ownership)
5. Após mudanças estruturais, **atualize este CONTEXT.md**
6. Commits: single-line, sem body, sem assinaturas automáticas

---

## 14. Arquitetura de animação (GSAP + Framer Motion)

**Status: Fases 1-4 implementadas (2026-08-03).** Fase 5 (expandir GSAP seção por seção) e Fase 6
(Anime.js) ficam pendentes — cada uma exige validação visual no navegador antes de avançar, e o
site está em modo manutenção (não dá pra validar visualmente sem sair dele, ver §3).

### Regra de ownership — inviolável

**Cada elemento do DOM tem um dono.** Se GSAP anima um elemento, ele é um `<div>`/`<h1>`/etc. comum
com `ref` + `data-anim="gsap"` — nunca `<m.div>`. Se Framer Motion anima, é `<m.div>` — GSAP nunca
recebe ref nele. Um elemento com os dois é bug. `data-anim="gsap"` é documentação viva, não afeta CSS.

### Framer Motion — LazyMotion obrigatório

- `Providers.tsx` envolve tudo em `<LazyMotion features={domAnimation} strict>`. `strict` faz o build
  quebrar se alguém usar `motion.div` em vez de `m.div` — **todo componente usa `import { m } from
  "framer-motion"`**, nunca `import { motion }`.
- Framer possui: `AnimatePresence`, `layoutId`, gestos (`whileHover`/`whileTap`/`whileInView`), tudo
  ligado ao ciclo de vida do React. **Nunca** `useScroll`/`useTransform` em elemento com scroll real —
  isso agora é trabalho do GSAP (ver abaixo).

### GSAP — dono do scroll (Opção A, decidida 2026-08-03)

- `ScrollTrigger` é a única fonte de scroll-linked animation no projeto. Motivo: `useScroll`/
  `useTransform` do Framer e `ScrollSmoother` do GSAP conflitam silenciosamente se usados juntos —
  centralizar num sistema só elimina essa classe de bug.
- Padrão de uso: hook `useGSAP()` de `@gsap/react` (cleanup automático — obrigatório em React 19
  StrictMode), `gsap.registerPlugin(...)` uma vez no topo do arquivo, `scope` apontando pro ref raiz do
  componente.
- **Migrado para GSAP:** `About.tsx` — `bgTextRef` (parallax do texto "SOBRE", `scrub: true`),
  `leftPanelRef` (painel esquerdo sticky) e `rightPanelRef` (coluna direita) via `gsap.fromTo` +
  `ScrollTrigger`. Isso resolve a contradição que a auditoria encontrou com a regra 9 da seção 7 (que
  dizia "não usar transform scroll-linked na coluna direita" — a intenção da regra continua válida, só
  que agora é o GSAP que respeita, não o Framer).
- **`Hero.tsx`**: headline ("Luiz Mendes") usa `SplitText` (`gsap/SplitText`, grátis desde 2025) com
  reveal char-a-char (`stagger: 0.02`, `power4.out`), `delay: 0.32` pra encaixar no stagger do resto do
  Hero (que continua Framer). Cleanup via `split.revert()` no unmount — **obrigatório**, sem isso o
  texto fica fragmentado em `<span>` no DOM e leitores de tela leem letra por letra.
- **`ProjectsShowcase.tsx` ainda usa `useScroll`/`useTransform` do Framer** (animação do MacBook que
  abre a tampa) — **deliberadamente não migrado**. Essa seção inteira está ON HOLD pro redesign do
  `DESIGN_BRIEF.md` (grid + página de detalhe), que vai substituir esse mockup por completo — migrar
  pra GSAP agora seria trabalho jogado fora.
- Demais seções (Skills, Certifications, Experience, Contact, Navbar, Footer, etc.) **continuam
  100% Framer** — não têm scroll-linking, só `whileInView`/`whileHover`, que é território do Framer.
  Não converter pra GSAP sem necessidade real.

### Motion tokens (`src/lib/motion.ts`)

`DURATION`, `EASE` (array, pro Framer), `GSAP_EASE` (string cubic-bezier, pro GSAP), `STAGGER` e
`prefersReducedMotion()`. `Hero.tsx`, `About.tsx` e `Contact.tsx` já importam `EASE.out` no lugar do
antigo `const ease = [0.4, 0, 0.2, 1]` local. **Os demais arquivos ainda têm o array de easing inline**
(`ease: [0.4, 0, 0.2, 1] as [...]`, repetido ~17x em Certifications/Experience/Skills/ProjectsShowcase/
Navbar/BackToTop/MobileBottomNav/Maintenance) — migrar pros tokens é seguro (mesmos valores) mas foi
deixado de fora desta rodada pra manter o escopo contido; pode ser feito a qualquer momento sem risco
visual, já que `EASE.out` tem curva diferente da antiga (`[0.16,1,0.32,1]` vs `[0.4,0,0.2,1]`) — só
`Hero`/`About`/`Contact` tiveram a curva trocada até agora.

### Acessibilidade

- GSAP: todo `useGSAP` que anima checa `prefersReducedMotion()` (de `src/lib/motion.ts`) antes de
  criar o tween/ScrollTrigger — se reduzido, seta o estado final direto via `gsap.set(...)`, sem
  transição.
- Framer: `MotionConfig reducedMotion="user"` (em `Providers.tsx`) já cobre todo `m.*` do projeto.

### Pendente (não implementado — exige validação visual primeiro)

1. Migrar o resto dos arrays de easing inline pros tokens (`EASE`/`GSAP_EASE`) — zero risco, é só
   consistência.
2. Expandir GSAP seção por seção conforme a tabela abaixo, **uma de cada vez, com validação visual
   entre cada uma** (o dono precisa ver no navegador — não implementar tudo de uma vez):

| Seção | Dono hoje | Efeito planejado (quando migrar) |
|---|---|---|
| Skills | Framer | Stagger de entrada + DrawSVG nos ícones |
| Experience | Framer | DrawSVG traçando a linha da timeline conforme o scroll |
| Projects (pós-redesign) | Framer (`layoutId`) | `layoutId` pra card→detalhe; GSAP Flip nos filtros |
| Hero — terminal de código | Framer (`setInterval`) | Timeline GSAP com `TextPlugin` |

3. **Anime.js — só se o redesign do Claude Design pedir um background em grid.** Se não pedir, não
   instalar. Único caso de uso real: `stagger({ grid: [...], from: "center" })` pra partículas/grid
   decorativo fora do ciclo de vida do React.
