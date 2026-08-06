# Design Brief — Redesign do Portfólio de Luiz Mendes

> **Como usar:** cole este documento inteiro no Claude Design junto com a pasta do projeto. Ele contém (1) a diretriz do que você deve entregar, (2) quem é o dono, (3) o design system atual como âncora, (4) as regras técnicas inegociáveis, e (5) o pedido específico da seção de Projetos. Use TODAS as skills de design disponíveis (frontend-design, ui-ux-pro-max, brand-designer, dataviz) para entregar algo **único** — não um template genérico de IA.

---

## 1. Diretriz principal (o pedido)

Você é um designer sênior de produto + brand. Redesenhe este portfólio para que pareça o site pessoal de um **engenheiro full-stack sênior** — memorável, com personalidade forte e acabamento premium, do nível de sites que ganham Awwwards/Site of the Day. **Fuja do "cara de template de IA"**: nada de layout hero-centralizado + 3 cards + gradiente roxo genérico. Quero uma direção de arte com ponto de vista.

Objetivos:
- **Público-alvo:** recrutadores tech e leads de engenharia avaliando em 30–60 segundos.
- **Sensação:** confiança técnica, capricho obsessivo com detalhe, um toque de ousadia editorial.
- **Diferencial real do dono:** métricas de impacto de produção ($1M+ processados, -40% tempo de atendimento, -60% em queries) e clientes grandes (Sabesp, Petrobras). Isso precisa saltar aos olhos — hoje fica escondido.
- **Entregue uma direção com identidade**, não incremental. Pode evoluir ou substituir a paleta/tipografia atuais, desde que respeite as regras da seção 4.

---

## 2. Quem é o dono

**Luiz Felipe Barreto Mendes** — Desenvolvedor Full Stack JR/Pleno, 22 anos, São Paulo/BR.
- GitHub: `Lzdevmendes` · LinkedIn: `in/lzmendess` · Email: `lzmendestechdev@gmail.com`
- +$1.0M processados em soluções de pagamento (Stripe). Clientes: Obracon (Sabesp), Multiclínica, GCB (Petrobras).
- Stack forte: React/Next, Node/NestJS, TypeScript, .NET/C#, PostgreSQL, Docker, Azure/AWS, React Native/Expo (mobile).
- Personalidade da marca: técnico e direto, sem enrolação, mas com bom gosto visual. Confiante, não arrogante.

---

## 3. Design system ATUAL (âncora — pode evoluir, mas parta daqui)

**Stack visual:** Next.js 16 (App Router, `output: "export"` estático), React 19, Tailwind CSS v4 (tokens no `@theme` do `globals.css`), Framer Motion v12, Lucide icons.

### Cores (CSS custom properties em `globals.css`)
```
--color-bg:           #0A0A0A   /* fundo principal (dark, quase preto) */
--color-bg-secondary: #111111
--color-bg-card:      #161616   /* cards e painéis */
--color-border:       #262626   /* bordas sutis */
--color-text:         #EDEDED   /* texto principal */
--color-muted:        #737373   /* texto secundário */
--color-teal:         #0D9488   /* destaque primário (teal) */
--color-teal-light:   #14B8A6   /* destaque claro */
--color-teal-dim:     #0D948820 /* glow sutil */
```
Tema **dark-first**, alto contraste, com teal como única cor de marca. → *Você pode propor uma paleta secundária/acento mais rica se justificar; mantenha o dark premium.*

### Tipografia
- **Display/títulos:** Syne (800, letter-spacing negativo forte, ex `-0.03em` a `-0.045em`).
- **Corpo:** Inter.
- Números com `font-variant-numeric: tabular-nums`.
- Fontes carregadas via `next/font/google`. Se trocar, precisa ser Google Font ou self-hosted (export estático, sem CDN externo em runtime).

### Movimento / interação (filosofia atual)
- Easing padrão: `cubic-bezier(0.4,0,0.2,1)`; spring: `cubic-bezier(0.34,1.56,0.64,1)`.
- Entradas de seção: `opacity 0→1` + `y 24→0`, `viewport once`, duração ~0.6s.
- Hover em card: `y:-3` + borda teal.
- Detalhes de assinatura existentes: contador animado de stats, terminal de código digitando no Hero, glow que segue o mouse no About, mockup de MacBook que abre a tampa no scroll, barra de progresso de scroll na navbar, scrollbar teal de 3px.
- **Respeita `prefers-reduced-motion`** (via `MotionConfig reducedMotion="user"`).

### Estrutura de seções (ordem atual)
`Hero → About → Projects → Experience → Skills → Certifications → Contact → Footer`
Navbar fixa com barra de progresso; bottom nav no mobile; back-to-top flutuante.

> **Conteúdo detalhado** (experiências, certificações, stats, skills por categoria) está todo em `agent/CONTEXT.md` — leia esse arquivo, ele é a fonte de verdade do conteúdo e das regras.

---

## 4. Regras técnicas INEGOCIÁVEIS (não quebrar)

1. **Export estático** (`output: "export"`) — sem API routes, sem SSR dinâmico, sem recursos de servidor em runtime. Assets self-hosted (sem CDN externo carregado em runtime).
2. **Sem Three.js / react-three-fiber / WebGL pesado.** Foram removidos de propósito por performance. Não reintroduzir.
3. **Performance mobile é sagrada** (ver `CONTEXT.md §7`): `backdrop-filter` só na navbar; sem `setState` em `onMouseMove` (DOM direto); scroll listeners `passive`; `useScroll`/`useTransform` só em elementos decorativos com `will-change`, nunca em colunas de conteúdo; `whileInView` sempre `once`.
4. **Bilíngue PT/EN** via context client-side (`useLanguage`). Todo texto precisa existir nos dois idiomas. Narrativa em PT, termos técnicos universais em EN (ver `CONTEXT.md §6`).
5. **Acessibilidade:** focus-visible teal, skip-link, touch targets ≥44px, contraste AA, `prefers-reduced-motion`.
6. **Sem `overflow-x` no `html`** (quebra scroll no deploy estático) — só no `body`.
7. **Deploy:** GitHub Pages via `gh-pages -d out`. Imagens `unoptimized: true`.

---

## 5. Pedido específico: seção de Projetos (já planejado)

A seção de Projetos precisa de reforma estrutural, não só cosmética. Hoje ela empilha 3 mockups de MacBook em largura total com dashboards falsos idênticos → polui e prejudica credibilidade. Direção acordada:

- **Home:** grid enxuto e escaneável de cards de projeto (não empilhar mockups grandes). Cada card leva a uma **página de detalhe** (`/projects/[slug]`) via botão "Ver projeto →".
- **Página de detalhe:** um case study por projeto (problema → solução → stack → galeria → métricas), onde o mockup premium vive **um por página**.
- **Web e mobile:** projetos web usam frame de desktop/browser; projetos mobile (Expo/React Native) usam frame de celular. Escolha o device pelo tipo.
- **Honestidade:** screenshots reais, nunca UI inventada repetida.
- Projetos reais (GitHub `Lzdevmendes`): `finance-app` (web, tem live: financeapp-sage.vercel.app), `barbersync-mobile` (mobile), `litoralnapalma` (mobile), `galvao-store` + `post-studio` (web).

*(Blueprint técnico completo desta seção está em `.claude/plans/` / descrito no CONTEXT — a estrutura de dados e roteamento já foi desenhada e é redesign-safe.)*

---

## 6. O que quero de volta (deliverables)

1. **Direção de arte / moodboard** em palavras: conceito central, referência de estilo (ex: editorial brutalista? swiss minimal técnico? terminal/dev aesthetic elevado?), e por que serve pra este dono.
2. **Design tokens propostos:** paleta final (com hex), par tipográfico, escala de espaçamento, raios, sombras, tokens de motion.
3. **Layout de cada seção** (Hero, About, Projects grid + detail, Experience, Skills, Certifications, Contact) — wireframe/descrição ou artifact HTML navegável.
4. **Sistema de componentes:** card, botão, badge, chip, device frames (laptop + phone), navbar.
5. **Micro-interações de assinatura:** 2–3 momentos memoráveis que dão personalidade (respeitando as regras de performance).
6. Se possível, um **artifact HTML** de alta fidelidade da home + de uma página de detalhe de projeto, self-contained, para eu ver antes de virar código.

Entregue algo que um recrutador lembre depois de fechar a aba. Use as skills de design a fundo. Capriche.
