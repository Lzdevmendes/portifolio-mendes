# PROMPT — Claude Code · Portfólio Mendes v2

> Cole este arquivo inteiro na primeira mensagem do Claude Code, junto com `01-SPEC-EXPERIENCIA-SCROLL.md` e `02-scenes.data.ts`.

---

## Contexto

Repo: `Lzdevmendes/portifolio-mendes` — Next 16 App Router, `output: "export"`, deploy GitHub Pages.

Vamos reconstruir a **camada de apresentação** do portfólio como uma experiência 3D dirigida por scroll (referência: edolus.com — PlayCanvas + WebGL, câmera movida pelo scroll dentro de uma cena 3D).

**Todo o conteúdo já existe no repo e não deve ser reescrito.** Experiências, projetos, skills, certificações, i18n pt/en: extrair dos componentes atuais para `src/data/` e reaproveitar. Se você inventar um dado que não está no repo, é bug.

Leia `01-SPEC-EXPERIENCIA-SCROLL.md` antes de escrever qualquer linha. Ele tem stack, tokens, storyboard dos 7 atos, especificação do notebook 3D, regras de performance e acessibilidade.

---

## Regras de operação

1. **Plano antes de código.** Em toda fase: apresente o plano (arquivos que vai criar/alterar, decisões técnicas, o que fica de fora) e **pare**. Só execute depois do meu "ok".
2. **Uma fase por vez.** Não adiante fase seguinte, mesmo que pareça trivial.
3. **Escopo travado.** Não crie página, seção, rota ou componente que não esteja na spec. Se achar que falta algo, proponha — não implemente.
4. **Commits:** uma linha só, formato `type(scope): descrição curta`. Sem corpo, sem bullets, sem co-author. (Regra do `CLAUDE.md`.)
5. **Ao final de cada fase:** rode `npm run build` e `npm run lint`. Se quebrar, conserte antes de me devolver.
6. **`agent/CONTEXT.md`:** está desatualizado (cita `ProjectsGrid.tsx`, `ProjectsHeader.tsx`, `src/lib/github.ts` que não existem) e diz que Three.js não deve ser adicionado. Corrija o arquivo na Fase 0 e registre a decisão de reintroduzir Three.js com o motivo.
7. **Não deletar** o código antigo até a Fase 8. As seções atuais continuam funcionando enquanto a nova camada é construída em paralelo.

---

## Fases

### FASE 0 — Auditoria e extração de dados
- Ler todo o `src/`, listar o que existe de fato vs o que o `CONTEXT.md` afirma.
- Corrigir o `agent/CONTEXT.md`.
- Criar `src/data/` com `profile.ts`, `experience.ts`, `projects.ts`, `skills.ts`, `certifications.ts` — **movendo** os arrays dos componentes, com tipos explícitos e a estrutura `Record<Lang, T[]>` que já existe.
- Os componentes atuais passam a importar de `src/data/`. Site deve continuar idêntico ao final desta fase.
- Reportar toda inconsistência de dado encontrada (ex.: `$1.5M` na descrição vs `$1.0M` no highlight do `Experience.tsx`). **Não corrigir sozinho — listar e perguntar.**

**Gate:** lista de inconsistências + diff da extração.

---

### FASE 1 — Fundação de scroll
- Instalar `lenis` e `gsap`.
- `src/lib/scroll/LenisProvider.tsx`: Lenis + `ScrollTrigger.scrollerProxy` + RAF unificado.
- `src/lib/scroll/scrollStore.ts`: progresso global e por ato em **refs**, com API `subscribe`/`getProgress`. Zero re-render por frame.
- Remover `scroll-behavior: smooth` do `globals.css` (conflita com Lenis).
- Respeitar `prefers-reduced-motion`: desliga Lenis, scroll nativo.
- Página de teste `/dev-scroll` (não commitada no deploy) mostrando o progresso numérico ao vivo.

**Gate:** scroll suave funcionando, número de progresso correto, zero warning no console.

---

### FASE 2 — HUD e cursor
- Tokens novos no `@theme` do `globals.css` (§3 da spec). JetBrains Mono no `layout.tsx`.
- `Preloader.tsx` com contador real (por enquanto só `document.fonts.ready` + imagens; o `useProgress` do drei entra na Fase 3).
- `Cursor.tsx` — orbit + hint, lerp 0.12, `transform` direto no DOM dentro de RAF, desabilitado em `pointer: coarse`.
- `Reticle.tsx`, `Coordinates.tsx`, `ScrambleText.tsx`.
- Grain + vinheta globais.

**Gate:** HUD sobreposto ao site atual, cursor fluido, scramble disparando por ScrollTrigger.

---

### FASE 3 — Cena 3D base
- Instalar `three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`.
- `SceneRoot.tsx`: uma `<Canvas>` fixa, `dynamic(..., { ssr: false })`, `<PerformanceMonitor>`, `dpr={[1, 1.75]}`, ACES tone mapping.
- `CameraRig.tsx`: lê `scrollStore` em `useFrame` e interpola keyframes de `src/data/scenes.ts` com `MathUtils.damp`.
- `Effects.tsx`: bloom sutil + aberração cromática ativada só nas fronteiras de ato.
- Placeholder geométrico simples em cada ato (cubo/plano) só para validar o movimento de câmera.
- Preloader passa a usar `useProgress()`.

**Gate:** câmera percorrendo os 7 atos com o scroll, 60 FPS, nada de conteúdo final ainda.

---

### FASE 4 — Atos 1 a 4 (órbita, descida, malha, corredor)
- `OrbitAct`, `CoastAct`, `MeshAct`, `CorridorAct` conforme §4 da spec.
- Camada DOM de cada ato em `src/components/acts/` — texto real, links reais, vindos de `src/data/`.
- Dados: `profile.ts` no Ato 1–2, `experience.ts` no Ato 3, `skills.ts` no Ato 4.
- Se algum asset (textura de Terra, heightmap do litoral) não existir, use placeholder procedural e **me avise o que precisa ser providenciado** — não baixe asset aleatório da internet.

**Gate:** review visual ato por ato.

---

### FASE 5 — A bancada (LMBook) ← seção-âncora
- Rota procedural da §5 da spec. Nada de logo ou nome de marca de terceiro.
- `LMBook/index.tsx`, `Keyboard.tsx` (instancedMesh), `materials.ts`, `ScreenUI.tsx`.
- `ScreenUI` = o componente `MacOSPlaceholder` que já existe dentro do `ProjectsShowcase.tsx`, movido e renomeado.
- Tampa abre 0° → 105° dirigida pelo scroll, com damp.
- Projeto ativo na tela via `<Html transform occlude>` (links clicáveis de verdade). Inativos via textura.
- Navegação horizontal entre os 3 projetos de `projects.ts`.
- `<Environment>`, duas `RectAreaLight`, `ContactShadows`, luz da tela batendo na base.

**Gate:** screenshots em 3 ângulos + revisão de realismo antes de seguir. Espero iteração aqui — é a parte que mais importa.

---

### FASE 6 — Atos 6 e 7 (chip LM-01 e contato)
- `ChipAct` com a ficha técnica em datasheet, único uso do `--color-flare`.
- Certificações como selos na borda do wafer, vindas de `certifications.ts`.
- Ato de contato: 3 canais + download do CV (`/cv_luizmendes.pdf`, já existe no `public/`).

**Gate:** review visual.

---

### FASE 7 — Fallback, acessibilidade e performance
- `StaticBench.tsx` e rota estática completa para mobile / `coarse` / `reduced-motion` / sem WebGL. **Não é versão degradada — é o site inteiro sem canvas.**
- Garantir que mobile não baixa o bundle 3D (checar na aba Network).
- Navegação por teclado atravessando os atos, foco visível, skip link, `aria-hidden` no canvas.
- Passar a checklist §11 da spec item por item e me reportar cada um.

**Gate:** relatório da checklist + Lighthouse mobile e desktop.

---

### FASE 8 — Limpeza e áudio
- Remover os componentes de seção antigos que foram substituídos.
- Áudio ambiente + 2 SFX, começando **mutado**, com toggle persistindo em `sessionStorage`.
- Atualizar `agent/CONTEXT.md` e `README.md` com a arquitetura final.

**Gate:** build limpo, deploy de preview.

---

## O que NÃO fazer

- Não adicionar Zustand, Redux, Jotai ou state manager novo. Refs resolvem.
- Não trocar Tailwind 4 por outra coisa, não migrar para CSS Modules.
- Não usar Framer Motion para dirigir scroll. Ele fica só em micro-interações.
- Não criar blog, seção de depoimentos, formulário de contato ou qualquer coisa fora da spec.
- Não commitar `node_modules`, assets brutos não comprimidos, ou arquivos `.hdr` acima de 2 MB.
- Não inventar métrica, cliente, projeto, certificação ou data que não esteja no repo.

---

**Comece pela FASE 0. Mostre o plano e pare.**
