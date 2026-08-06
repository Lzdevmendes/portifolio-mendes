# SPEC — Portfólio Luiz Mendes v2 · Experiência 100% dirigida por scroll

> Documento de referência técnica. O prompt operacional para o Claude Code está em `00-PROMPT-CLAUDE-CODE.md`.
> Baseado no repo real `Lzdevmendes/portifolio-mendes` (Next 16.1.6 · React 19.2.3 · Tailwind 4 · Framer Motion 12 · static export → GitHub Pages).

---

## 1. Tese

O site de referência (EDOLUS) roda dentro de um `<canvas>` PlayCanvas: o scroll não rola a página, ele move uma câmera dentro de uma cena 3D. Replicar o motor inteiro é projeto de meses. **Replicar a sensação com Three.js + R3F + Lenis + GSAP ScrollTrigger é projeto de dias.**

A diferença entre "cópia" e "autoral" está na metáfora. EDOLUS conta satélite → data center → chip porque vende infraestrutura espacial. O teu material é outro: **infraestrutura hídrica (Sabesp), operação offshore (Petrobras), saúde digital (Multiclínica), litoral norte de SP.**

Metáfora escolhida: **uma sonda descendo da órbita até a bancada.** Órbita → costa → malha de infraestrutura → corredor de servidores → bancada com o notebook → ficha técnica do "chip" LM-01. Mesma gramática visual, conteúdo que só pode ser teu.

---

## 2. Stack

### Manter
| Item | Motivo |
|---|---|
| Next 16 App Router + `output: "export"` | Deploy GitHub Pages já funciona. R3F roda 100% client-side, não quebra export. |
| React 19 · TypeScript · Tailwind 4 | Sem motivo para trocar. |
| Framer Motion | **Só** para micro-interações e entrada de DOM (hover, badges, overlays). Não toca no scroll. |
| `contexts/language.tsx` (pt/en) | i18n existente é reaproveitado inteiro. |

### Adicionar
```bash
npm i lenis gsap three @react-three/fiber @react-three/drei @react-three/postprocessing postprocessing
npm i -D @types/three
```

| Lib | Papel exato |
|---|---|
| `lenis` | Único dono do scroll. RAF loop que suaviza e normaliza. |
| `gsap` + `ScrollTrigger` | Timeline das cenas. Sincronizado ao Lenis via `scrollerProxy`. GSAP 3.13+ tem todos os plugins grátis. |
| `three` + `@react-three/fiber` | Cena 3D persistente. |
| `@react-three/drei` | `useProgress` (loader real), `Environment`, `ContactShadows`, `RoundedBox`, `Html`, `useGLTF`, `PerformanceMonitor`. |
| `@react-three/postprocessing` | Bloom sutil + aberração cromática **só nas transições**. |

### Regra dura de arquitetura
**Uma única fonte de verdade de scroll.** Lenis emite `scroll` → atualiza `ScrollTrigger` → escreve progresso normalizado (`0..1` global e `0..1` por cena) em **refs**, nunca em state. A cena 3D lê esses refs dentro de `useFrame`. Qualquer `setState` por frame = jank garantido. Isso é o mesmo erro que o `agent/CONTEXT.md` já documenta para o `About.tsx`.

```
lenis.on("scroll", ScrollTrigger.update)
  └─> scrollStore (ref-based, sem re-render)
        ├─> useFrame na cena 3D (lerp de câmera/uniforms)
        └─> ScrollTrigger por seção (fade/scramble de DOM)
```

---

## 3. Design tokens

Evolução da paleta atual (`#0A0A0A` + teal `#0D9488`), não substituição. O preto ganha temperatura de água profunda; o teal continua sendo a assinatura.

```css
@theme {
  --color-void:    #05070A;  /* fundo — preto azulado, água profunda */
  --color-panel:   #0C1116;  /* painéis, cards, racks */
  --color-line:    #1B242C;  /* hairlines de HUD */
  --color-foam:    #E6EDF0;  /* texto principal, branco frio */
  --color-muted:   #6B7A85;  /* labels, coordenadas */
  --color-signal:  #0D9488;  /* assinatura herdada */
  --color-sonar:   #5EEAD4;  /* glow, estado ativo, linhas de conexão */
  --color-flare:   #F59E0B;  /* USAR UMA VEZ SÓ: chip LM-01 */
}
```

**Regra do `--flare`:** aparece exclusivamente no Ato 6. Se aparecer em dois lugares, perde a função.

### Tipografia
| Papel | Fonte | Uso |
|---|---|---|
| Display | **Syne** 700/800 (já no projeto) | Nome, títulos de ato. `letter-spacing: -0.03em`. |
| Corpo | **Inter** 400/500 (já no projeto) | Parágrafos, descrições. |
| HUD / Utility | **JetBrains Mono** 400/500 (adicionar) | Coordenadas, percentual do loader, scramble text, labels de rack, ficha técnica. `letter-spacing: 0.08em`, `uppercase`. |

A camada mono é onde a personalidade mora. Todo dado numérico do site (coordenadas, `$1.0M+`, `LM-01`, timestamps) é mono e tabular (`font-variant-numeric: tabular-nums`).

### Vocabulário visual (repetir em todos os atos)
- **Cantos em colchete** (`⌐ ¬ ∟ ⌐`) em botões e molduras — 1px, `--color-line`, 12px de braço.
- **Retículo central** discreto no HUD, opacidade 0.15.
- **Coordenadas vivas** no canto inferior esquerdo: `-23.6203 / -45.4130` (Caraguatatuba) mudando conforme o ato.
- **Grain + vinheta** leves sobre tudo (`mix-blend-mode: overlay`, opacity 0.04).

---

## 4. Storyboard — 7 atos

Cada ato ocupa uma faixa de scroll. Total sugerido: **700vh**.

### ATO 0 — `BOOT` (preloader)
- Fundo `--color-void` puro. Contador mono central `000%` → `100%`, sem barra.
- Progresso **real** via `useProgress()` do drei + `Promise.all` dos vídeos/texturas. Nunca fake.
- Linha inferior: `PORTFOLIO.LM // CARREGANDO ATIVOS` e, abaixo, `RECOMENDADO: FONES DE OUVIDO`.
- Só libera com 100% + `requestIdleCallback`. Fade de 600ms para o Ato 1.

### ATO 1 — `ÓRBITA` (0–12% · hero)
- Terra vista do espaço, curvatura no terço inferior, litoral brasileiro visível. Rotação lentíssima (ambiente, independe do scroll).
- Nome **Luiz Mendes** em Syne 800, tamanho grande. Abaixo: `DESENVOLVEDOR FULL STACK` em mono.
- Badge `DISPONÍVEL PARA TRABALHO` com dot pulsante (reaproveitar `pulse-dot` do `globals.css`).
- Botão com cantos em colchete: `INICIAR` → dispara scroll programático via `lenis.scrollTo`.
- Toggle de áudio fixo no canto superior direito. Toggle PT/EN ao lado.
- Indicador `ROLE PARA NAVEGAR` com linha vertical animada.

### ATO 2 — `DESCIDA` (12–26% · sobre)
- Câmera mergulha na atmosfera. Transição por **dissolução com ruído + aberração cromática** (não fade).
- Chega num mapa plano de satélite do Litoral Norte que **ganha relevo 3D** (displacement map) conforme o scroll: Serra do Mar sobe, o mar fica plano.
- Moldura de HUD com retículos. Coordenadas travam em `-23.6203 / -45.4130 · CARAGUATATUBA/SP`.
- Copy: bio curta (vem do `About.tsx` atual). Texto entra com **scramble**.

### ATO 3 — `MALHA` (26–44% · experiência)
- A superfície vira grafo: 3 nós grandes pulsando, linhas de conexão tipo constelação entre eles.
- Um nó por contrato: **Obracon × Sabesp**, **Multiclínica**, **GCB × Petrobras**.
- Scroll aproxima de um nó por vez. Nó ativo: expande, ilumina em `--color-sonar`, e o painel lateral escreve com scramble: período, cargo, stack, 3 highlights.
- Painel lateral é **DOM real** (clicável, selecionável, acessível), não texto em canvas.
- Dados: importar de `src/data/experience.ts` (extraído do `Experience.tsx` atual, sem reescrever).

### ATO 4 — `CORREDOR` (44–58% · skills)
- Corredor de data center: racks nos dois lados, piso reflexivo, facho de luz volumétrico central. Câmera avança fisicamente.
- Cada rack unit acesa = uma categoria de skill. Label mono na lateral do rack.
- Ao passar por um rack, as pills daquela categoria aparecem em DOM sobreposto, com stagger.
- Reaproveitar `SKILL_URLS` e as categorias do `Skills.tsx` atual — as pills continuam links reais.

### ATO 5 — `BANCADA` (58–84% · projetos) ← **seção-âncora, ver §5**
- A câmera sai do corredor e pousa numa bancada escura. No centro: o notebook.
- Tampa fechada → **abre conforme o scroll** (0° → 105°).
- Tela liga com flicker curto e mostra o projeto ativo.
- Navegação horizontal entre os 3 projetos: o scroll vertical vira translação lateral da câmera (padrão "pin + horizontal"). Alternativamente, setas ⌐ ¬ nas laterais.
- Conteúdo da tela é **DOM real** via `<Html transform occlude>` — links de GitHub/live clicáveis de verdade.

### ATO 6 — `LM-01` (84–96% · ficha técnica)
- Câmera aproxima até um wafer/chip. Este é o único momento com `--color-flare`.
- Layout de datasheet: `LM-01 // FULL STACK UNIT` e, ao lado, a ficha em mono com scramble:
  ```
  ARQUITETURA .... CLEAN / DDD / EVENT-DRIVEN
  RUNTIME ........ NODE · .NET · GO · PYTHON
  INTERFACE ...... REACT · NEXT · FLUTTER
  PERSISTÊNCIA ... POSTGRES · SQL SERVER · MONGO
  PROCESSADO ..... $1.0M+ EM PAGAMENTOS
  CLIENTES ....... SABESP · PETROBRAS · MULTICLÍNICA
  LOCALIZAÇÃO .... -23.6203 / -45.4130
  ```
- Certificações entram como "selos de fabricação" na borda do wafer.

### ATO 7 — `CONTATO` (96–100%)
- Câmera recua. Fundo volta ao void puro.
- Três canais em cards com cantos em colchete: Email · LinkedIn · GitHub. Download do CV (`/cv_luizmendes.pdf`, arquivo já existe no `public/`).
- Fecha com o retículo colapsando no centro.

---

## 5. A bancada — notebook realista

Pedido explícito: "algo bem realista". Duas rotas; **a recomendada é a B**.

### ⚠️ Antes: nome e marca
Não usar logo da Apple nem o nome "MacBook" no site. É IP de terceiro e num portfólio pessoal não agrega nada. A silhueta de um notebook 14" de alumínio com bezel fino comunica exatamente a mesma coisa. Chamar internamente de **`LMBook`**.

### Rota A — GLB pronto
- Buscar modelo CC0/CC-BY de notebook em Poly Pizza ou Sketchfab. Remover qualquer logo antes de usar.
- Comprimir: `gltf-transform optimize in.glb out.glb --texture-compress ktx2` + Draco. **Alvo: < 2 MB.**
- Prós: rápido. Contras: geometria e UV alheias, difícil de casar com a luz da cena.

### Rota B — procedural em R3F (recomendada)
Controle total, zero dependência de asset externo, ~250 linhas.

```
Proporções reais (14"): 312.6 × 221.2 × 15.5 mm → escala 3.126 × 2.212 × 0.155 unidades
```

**Geometria**
- Base e tampa: `<RoundedBox radius={0.06} smoothness={8} />`. O bevel é o que separa "realista" de "caixa cinza" — não pular.
- Dobradiça: `<group>` pai na aresta traseira, `rotation.x` dirigido pelo scroll com `MathUtils.damp`.
- Teclado: `<instancedMesh>` com ~78 teclas (`RoundedBox` 0.16³, radius 0.02). Uma instância, não 78 meshes.
- Trackpad: plano recuado 0.5mm, roughness levemente menor que o corpo.
- Grade de alto-falante: textura de pontos com alpha, não geometria.
- Pés: 4 cilindros achatados de borracha (roughness 0.9).

**Materiais** (aqui mora o realismo)
```ts
// alumínio escovado
<meshPhysicalMaterial
  color="#8A8F94" metalness={1} roughness={0.34}
  clearcoat={0.25} clearcoatRoughness={0.4}
  envMapIntensity={1.1}
/>

// vidro da tela — camada separada, na frente do display
<meshPhysicalMaterial
  transmission={0} roughness={0.06} metalness={0}
  clearcoat={1} clearcoatRoughness={0.02}
  reflectivity={0.5} opacity={0.12} transparent
/>
```
- Anisotropia de metal escovado: `roughnessMap` com ruído direcional horizontal sutil (pode ser gerado em canvas, não precisa de arquivo).

**Iluminação**
- `<Environment preset="warehouse" />` ou HDRI custom escuro — reflexo é 70% do realismo em metal.
- Duas `<RectAreaLight>`: uma superior larga (key), uma lateral estreita e fria (rim). Sem `pointLight` genérica.
- `<ContactShadows blur={2.4} opacity={0.65} resolution={1024} />`.
- `toneMapping: ACESFilmicToneMapping`, `outputColorSpace: SRGBColorSpace`.

**A tela — parte clicável**
1. Projeto ativo: `<Html transform occlude distanceFactor={1.2}>` renderizando DOM real. Links funcionam, teclado funciona, leitor de tela funciona.
2. Projetos inativos: `<meshBasicMaterial map={texture} toneMapped={false} />` com screenshot — muito mais barato.
3. Reaproveitar o componente **`MacOSPlaceholder`** que já existe no `ProjectsShowcase.tsx` como conteúdo da tela. Ele já está pronto e é bonito — renomear para `ScreenUI` e mover para `src/components/three/`.
4. Brilho da tela: `emissive` + `<pointLight>` fraca na frente projetando a luz azulada na base do notebook. É o detalhe que vende a cena.

**Fallback obrigatório**
Mobile, `prefers-reduced-motion` ou WebGL indisponível → mockup **SVG estático** do notebook com o `ScreenUI` dentro, e os projetos viram cards empilhados normais. O conteúdo nunca depende do 3D.

---

## 6. Efeitos assinatura

### Scramble text
```ts
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\<>[]{}*#";
// Revela da esquerda para a direita, ~2 frames por caractere,
// caracteres não revelados sorteiam de CHARS a cada frame.
// Dispara via ScrollTrigger onEnter, once: true.
```
Aplicar em: títulos de ato, ficha técnica LM-01, labels de rack. **Não** em parágrafos longos — vira ruído e prejudica leitura.

### Cursor customizado (2 elementos, `position: fixed`, `pointer-events: none`, `z-index: 9999`)
- `cursor-orbit`: 120×120px, anel 1px em `--color-sonar`, opacidade 0.4, girando devagar. Segue o mouse com **lerp de 0.12** (o atraso é o efeito).
- `cursor-hint`: texto mono 10px que segue com offset `+70/+70`. Lê `data-cursor` do elemento sob o mouse (`ABRIR`, `ARRASTAR`, `COPIAR`).
- Atualizar via `transform: translate3d()` direto no DOM dentro de um RAF. **Nunca** `setState` no `mousemove`.
- Desabilitar em `pointer: coarse`.

### Transições entre atos
`ChromaticAberration` (offset 0 → 0.004 → 0) + `Noise` durante 400ms na fronteira de cada ato. Fora das fronteiras, offset zerado — pós-processamento constante custa caro.

### Áudio
Um loop ambiente (drone grave, ~1min, `.webm` < 400KB) + 2 SFX curtos (transição de ato, hover de nó). Começa **mutado** — autoplay com som é bloqueado e é hostil. Botão `AUDIO ON/OFF` persiste em `sessionStorage`.

---

## 7. Performance — inegociável

| Regra | Detalhe |
|---|---|
| Zero `setState` em `useFrame` | Refs + `MathUtils.damp`. |
| `dpr={[1, 1.75]}` | Cap de device pixel ratio. |
| `<PerformanceMonitor>` | Se FPS < 45, derruba dpr e desliga bloom automaticamente. |
| Uma `<Canvas>` só | Fixa, `inset: 0`, `z-index: 0`, `pointer-events: none` (exceto onde precisa). DOM rola por cima. |
| `frameloop="demand"` no Ato 0 e 7 | Onde não há animação contínua. |
| Modelos < 2 MB, texturas KTX2/WebP | `useGLTF.preload()` no boot. |
| Mobile / `coarse` / `reduced-motion` | Rota estática completa, sem canvas. Não é fallback degradado — é uma versão inteira. |
| Budget | LCP < 2.5s em 4G, bundle JS inicial < 250KB gzip (3D em `dynamic(..., { ssr: false })`). |

## 8. Acessibilidade — inegociável

- Todo conteúdo textual existe em DOM. Nada de informação exclusiva do canvas.
- Navegação por teclado percorre os atos em ordem; `Tab` num link fora da viewport dispara `lenis.scrollTo` até ele.
- `prefers-reduced-motion: reduce` → Lenis desligado, scroll nativo, atos viram seções empilhadas com fade simples.
- Foco visível sempre: outline 2px `--color-sonar`, offset 2px.
- Skip link `Pular para o conteúdo` como primeiro elemento focável.
- `aria-label` nos toggles de áudio e idioma. Canvas com `aria-hidden="true"`.

---

## 9. Estrutura de arquivos alvo

```
src/
├── app/
│   ├── globals.css              ← tokens novos + grain/vinheta + cursor
│   ├── layout.tsx               ← + JetBrains Mono
│   └── page.tsx                 ← <Experience /> (orquestrador dos atos)
├── data/                        ← NOVO: dados extraídos, fonte única
│   ├── profile.ts               ← nome, cargo, bio, contatos, coordenadas
│   ├── experience.ts            ← extraído de Experience.tsx
│   ├── projects.ts              ← extraído de ProjectsShowcase.tsx
│   ├── skills.ts                ← extraído de Skills.tsx (+ SKILL_URLS)
│   ├── certifications.ts        ← extraído de Certifications.tsx
│   └── scenes.ts                ← ranges de scroll, keyframes de câmera, copy de HUD
├── lib/
│   ├── scroll/
│   │   ├── LenisProvider.tsx    ← Lenis + ScrollTrigger.scrollerProxy
│   │   └── scrollStore.ts       ← refs de progresso global e por ato
│   ├── scramble.ts
│   └── audio.ts
├── components/
│   ├── three/
│   │   ├── SceneRoot.tsx        ← <Canvas> única + Suspense + PerformanceMonitor
│   │   ├── CameraRig.tsx        ← lê scrollStore, interpola keyframes
│   │   ├── Effects.tsx          ← bloom + aberração condicional
│   │   ├── acts/
│   │   │   ├── OrbitAct.tsx
│   │   │   ├── CoastAct.tsx
│   │   │   ├── MeshAct.tsx
│   │   │   ├── CorridorAct.tsx
│   │   │   ├── BenchAct.tsx     ← LMBook
│   │   │   └── ChipAct.tsx
│   │   ├── LMBook/
│   │   │   ├── index.tsx
│   │   │   ├── Keyboard.tsx
│   │   │   ├── ScreenUI.tsx     ← ex-MacOSPlaceholder
│   │   │   └── materials.ts
│   │   └── fallback/StaticBench.tsx
│   ├── hud/
│   │   ├── Preloader.tsx
│   │   ├── Reticle.tsx
│   │   ├── Coordinates.tsx
│   │   ├── Cursor.tsx
│   │   ├── AudioToggle.tsx
│   │   └── ScrambleText.tsx
│   └── acts/                    ← camada DOM de cada ato (texto real, links reais)
└── contexts/language.tsx        ← mantido
```

---

## 10. Riscos e pontos de atenção

1. **`Projects.tsx` é server component com fetch na API do GitHub.** Com `output: "export"` isso resolve em build time. Se o rate limit da API estourar no CI, o build sai com lista vazia e ninguém percebe. Adicionar fallback estático em `src/data/projects.ts` e `try/catch` que loga aviso.
2. **`agent/CONTEXT.md` está desatualizado.** Cita `ProjectsHeader.tsx`, `ProjectsGrid.tsx` e `src/lib/github.ts` — nenhum existe na árvore atual. Corrigir antes de qualquer coisa, senão o agente trabalha em cima de um mapa errado.
3. **`CONTEXT.md` diz: "Não há Three.js. Não adicionar de volta sem discussão explícita."** Esta spec é a discussão explícita. Registrar a decisão e o motivo no arquivo.
4. **Números inconsistentes no repo.** `Experience.tsx` (pt) diz "+$1.5M em transações" na descrição e "+$1.0M processados" no highlight logo abaixo. O Hero usa `$1.0M+`. Escolher **um** número e propagar para todos os arquivos + CV. Recrutador confere.
5. **Período da Obracon:** o repo diz "Mar. 2023 — Mar. 2026". Conferir contra o CV antes de publicar.
6. **Peso dos assets vs GitHub Pages.** Sem CDN próprio. Manter total de assets 3D + vídeo abaixo de ~6 MB, ou a primeira carga em 4G fica ruim.
7. **Lenis + `scroll-behavior: smooth` do CSS brigam.** Remover a regra do `globals.css` ao ativar o Lenis.
8. **`overflow-x: hidden` no body** já está documentado como regra crítica no CONTEXT — não mexer, o Lenis convive bem com isso.

---

## 11. Critérios de aceite

- [ ] Loader mostra progresso **real** e nunca trava em 99%.
- [ ] Scroll do início ao fim sem queda abaixo de 50 FPS em notebook mediano.
- [ ] Nenhum `setState` dentro de `useFrame` (verificar por busca no código).
- [ ] Todo link/CTA acessível por teclado, com foco visível.
- [ ] `prefers-reduced-motion` entrega versão estática legível e completa.
- [ ] Mobile não carrega o bundle 3D (verificar na aba Network).
- [ ] `npm run build` gera `out/` sem erro e o site funciona em `file://` server estático.
- [ ] PT e EN completos — nada hardcoded em português dentro dos componentes de ato.
- [ ] Zero logo ou nome de marca de terceiro na cena da bancada.
- [ ] `agent/CONTEXT.md` atualizado com a nova arquitetura.
