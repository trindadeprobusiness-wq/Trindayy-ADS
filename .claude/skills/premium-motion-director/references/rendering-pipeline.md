# Pipeline técnico (Remotion + FFmpeg)

## Ambiente verificado (out/2026)
Node 22, Remotion 4.0.538 (+ bundler, renderer, cli, transitions, paths), React 19.2, TypeScript 5.6, Python 3.13 + numpy, FFmpeg 6.1, Chromium headless do Playwright em `/opt/pw-browsers` (detectado por `<studio>/scripts/find-browser.mjs`; sobrescreva com `REMOTION_BROWSER`). APIs foram conferidas nos `.d.ts` instalados — reconfira após atualizar versões.

**Licença do Remotion**: gratuito para indivíduos e empresas pequenas; empresas maiores precisam de licença da Remotion. Confirme no site oficial antes de uso comercial.

**Neste container (out/2026):** não existe `chrome-headless-shell` e o download do Remotion é bloqueado. Rode com `export REMOTION_BROWSER=/opt/pw-browsers/chromium-1194/chrome-linux/chrome`; o `render.mjs` detecta Chromium completo e usa `chromeMode: 'chrome-for-testing'` (headless novo). Sobrescreva com `REMOTION_CHROME_MODE` se precisar.

## Criar/atualizar o estúdio num projeto
```bash
bash ${CLAUDE_SKILL_DIR}/scripts/init-studio.sh motion-studio            # copia engine/ + ferramentas + npm install
bash ${CLAUDE_SKILL_DIR}/scripts/init-studio.sh motion-studio --update   # só src/lib, scripts/, configs
```
`engine/` (dentro da Skill) é a fonte canônica da biblioteca; cada projeto recebe uma cópia própria.

## Comandos (rodar em `<studio>/`)
```bash
npx tsc --noEmit                              # typecheck
npm run studio                                # preview interativo (Remotion Studio)
node scripts/render.mjs <Id> --stills 0,90,180 --safe   # prévias PNG com máscara de área segura
node scripts/render.mjs <Id>                  # MP4 h264/yuv420p/AAC + masterização −14 LUFS
node scripts/render.mjs all                   # todas as composições
python3 ${CLAUDE_SKILL_DIR}/scripts/validate-assets.py src/examples/<p>/timeline.json --public public
python3 ${CLAUDE_SKILL_DIR}/scripts/validate-render.py out/<Id>.mp4 --expect 1920x1080@30 --duration 15 --expect-audio --allow-black-edges --sheet out/<Id>_sheet.jpg
```
Render de 15–18 s em 1080p com 3 workers: ~3–5 min neste container.

## Novo projeto
1. `src/projects/<projeto>/timeline.json` (a partir de `templates/motion-timeline.json`).
2. `src/projects/<projeto>/<Nome>.tsx` usando `scene(tl, id)` para `from/duration/transitions`.
3. Registrar em `src/Root.tsx` com `fromTimeline(json)`.
4. Assets em `public/` (caminhos relativos, `staticFile()`); SFX gerados em `public/sfx` por `scripts/tools/synth-sfx.py` (ignorado no git, recriado automaticamente pelo render).

## API da biblioteca (`src/lib`)
| Módulo | Exporta |
|---|---|
| `motion.ts` | `ease`, `springs`, `progress(frame,start,dur,ease)`, `springIn(frame,fps,delay,preset)`, `keyframes(frame,[{at,value,ease}])`, `mix`, `sec`, `drift` |
| `theme.tsx` | `Theme`, presets A–F, `ThemeProvider`, `useTheme` |
| `fonts.ts` | `ensureFonts()` (Inter, Instrument Serif, JetBrains Mono — OFL) |
| `typography.tsx` | `WordReveal`, `CharStagger`, `TrackingIn`, `CountUp`, `StrikeThrough`, `Captions` |
| `camera.tsx` | `Camera`, `ParallaxLayer`, `FocusLayer`, `useCamera` |
| `abstract.tsx` | `GradientField`, `GridLines`, `Grain`, `Vignette`, `ParticleField`, `LightPoint`, `Ring`, `KineticLines` |
| `scene.tsx` | `Scene` + transições `cut/fade/blur/push/wipe/iris/zoomThrough` |
| `ui.tsx` | `Icon`, `AppWindow`, `Card`, `Enter`, `LineChart`, `BarChart`, `Button`, `Toggle`, `Toast`, `FlowNode`, `FlowEdge`, `Cursor` |
| `overlays.tsx` | `CTAReveal`, `SafeArea`, `Disclosure` |
| `audio.tsx` | `SfxCues`, `MusicBed` (fade + ducking) |
| `timeline.ts` | tipos `Timeline`, `scene()` |

Equivalências pedidas no briefing: AnimatedTitle/WordReveal/MaskedText → `WordReveal`; KineticParagraph → `WordReveal` por linha + `Captions`; ProductShowcase → `Camera` + `Card`; FeatureCard → `Card`+`Enter`; AnimatedDashboard → `AppWindow`+`LineChart`/`BarChart`/`CountUp`; DynamicBackground → `GradientField`/`GridLines`/`ParticleField`; CinematicTransition → `Scene`; MotionShape → `Ring`/`LightPoint`; CTAReveal → `CTAReveal`. `AudioReactiveElement` **não** foi implementado (sem caso de uso nos testes); para criá-lo use `@remotion/media-utils` (`useAudioData` + `visualizeAudio`) — conferir API instalada antes.

## Requisitos de execução
- Determinístico: sem `Math.random`, `Date`, CSS transitions. Use `random(seed)` / `drift()`.
- Sem caminhos absolutos; sem segredos no código (API keys via env).
- Erros: `ensureFonts` e `scene()` lançam erro explícito; `validate-assets` antes do render evita asset ausente.
- Formatos: MP4 H.264 yuv420p + AAC 48 kHz (compatível com redes). Para ProRes/WebM ajuste `codec` em `render.mjs`.
- Não há exportação para After Effects/CapCut/Premiere. Entrega = MP4 + código-fonte.
