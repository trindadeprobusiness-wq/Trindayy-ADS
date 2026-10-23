---
name: premium-motion-director
description: Direção criativa e produção de motion design premium (publicidade, produto, SaaS, anúncios de alta retenção, tipografia cinética) com Remotion + FFmpeg. Use para criar, roteirizar, storyboardar, animar, sonorizar, renderizar ou revisar vídeo/motion a partir de roteiro, narração (inclusive ElevenLabs), produto ou interface; analisar vídeo de referência e extrair técnicas para a biblioteca; ou melhorar direção de arte, ritmo e acabamento de um motion. Gatilhos: "motion premium", "vídeo para esse roteiro", "comercial", "apresentação de SaaS", "anúncio", "kinetic typography", "narração ElevenLabs", "analise esta referência", "melhore esse motion". Não use para edição de footage filmado (color grading, multicam), geração de imagem/vídeo por IA ou exportação para After Effects/CapCut.
license: MIT
---

# Premium Motion Director

Pergunta central de toda decisão: **"Qual é a melhor solução audiovisual para comunicar esta ideia?"** — nunca "que efeito posso adicionar?".
Sofisticação = intenção + precisão + consistência + acabamento. Cada elemento existe por razão narrativa, estética ou comercial.

## Onde está cada coisa

- **Estúdio do projeto** (Remotion/React/TS): procure `motion-studio/` (ou outra pasta com `remotion.config.ts` + `src/lib/index.ts`) na raiz do projeto atual. **Se não existir**, crie: `bash ${CLAUDE_SKILL_DIR}/scripts/init-studio.sh motion-studio` (copia o motor embutido, ferramentas e exemplos; roda `npm install`). Use `--no-examples` para começar vazio e `--update` para atualizar só a biblioteca de um estúdio existente.
- Biblioteca reutilizável: `<studio>/src/lib`. Exemplos de referência: `<studio>/src/examples/*` (cada um com `timeline.json` = contrato da direção). Projetos novos: `<studio>/src/projects/<nome>/`.
- Fonte canônica do motor: `${CLAUDE_SKILL_DIR}/engine/` (não edite projetos do usuário a partir daqui; copie com o init).
- Scripts (Python 3 + ffmpeg, executar, não ler): `${CLAUDE_SKILL_DIR}/scripts/`
- Referências (carregar só a que a fase pede): `${CLAUDE_SKILL_DIR}/references/`
- Templates de entrega: `${CLAUDE_SKILL_DIR}/templates/`
- Pré-requisitos: Node 18+, Python 3 + numpy, ffmpeg/ffprobe. Faltando algo, avise e instale só com autorização.

## Fluxo obrigatório (10 fases)

1. **Brief** — preencha `templates/creative-brief.md` (objetivo, público, produto, canal, duração, formato, identidade, roteiro, áudio, referências). Informação não crítica faltando → use padrão profissional e registre como premissa. Só pergunte o que muda o resultado (ex.: produto real sem material de referência).
2. **Estratégia** — leia `references/creative-direction.md`. Faça a análise semântica frase a frase (mensagem, emoção, conceito dominante, representação visual, intensidade, precisa de texto?, ponte com cena anterior/seguinte). Identifique hook, problema, mensagem central, revelação, CTA.
3. **Direção de arte** — escolha/combine estilos em `references/art-direction-styles.md` (A Apple-inspired, B High-retention, C SaaS cinematic, D Editorial, E Conceptual, F Performance ad). Justifique cada escolha; nunca aplique preset inteiro sem avaliar.
4. **Storyboard** — `templates/storyboard.md`, uma linha por cena com intenção narrativa. Consulte `references/pattern-library.md` para técnicas com contexto de uso e de *não* uso. Não repita a mesma metáfora em todo projeto.
5. **Motion timeline** — `templates/motion-timeline.json` em frames. Com narração: rode `python3 ${CLAUDE_SKILL_DIR}/scripts/alignment-to-timeline.py` (ver `references/narration-sync.md`); nunca invente timestamps de áudio não analisado e nunca altere o tempo da voz. Valide: `python3 ${CLAUDE_SKILL_DIR}/scripts/validate-assets.py <timeline.json> --public <studio>/public`.
6. **Produção** — implemente em `<studio>/src/projects/<projeto>/` reutilizando `src/lib` (ver `references/rendering-pipeline.md` para a API de componentes). Precisa de algo novo? Crie componente parametrizado em `src/lib`, nunca valores fixos de um vídeo só. Movimento: `references/motion-principles.md`; tipografia: `references/typography-motion.md`; transições/câmera: `references/cinematic-transitions.md`; som: `references/sound-design.md`.
7. **Render** (dentro de `<studio>`) — `npx tsc --noEmit`; prévias: `node scripts/render.mjs <Id> --stills 30,120,… --safe` (máscara de área segura); vídeo: `node scripts/render.mjs <Id>` (já masteriza em −14 LUFS).
8. **Revisão crítica** — olhe os frames (Read nas imagens) e rode `python3 ${CLAUDE_SKILL_DIR}/scripts/validate-render.py out/<Id>.mp4 --expect WxH@FPS --duration S --expect-audio --sheet out/<Id>_sheet.jpg`. Pontue com a rubrica de `references/quality-standards.md` citando evidência observável. Qualquer item de reprovação automática bloqueia a entrega.
9. **Refinamento** — corrija e re-renderize só o necessário. Código que executa ≠ trabalho pronto. Meta: ≥ 90/100.
10. **Entrega** — vídeo, fontes, timeline, brief/storyboard, relatório de validação (técnico separado do artístico) e limitações reais.

## Regras inegociáveis

- Legibilidade > efeito. Texto nunca cortado, sempre dentro da área segura (9:16: livre de 12% topo, 20% base, faixa direita de UI).
- Não anime sem finalidade; saiba quando a tela deve ficar quase estática. Velocidade não é qualidade.
- Som com intenção: todo cue de SFX tem `why`; densidade alvo ≤ 6 cues/10 s; voz sempre inteligível; true peak ≤ −1 dBTP.
- Interfaces: respeite o produto real; nunca invente funcionalidade, número ou depoimento de produto real. Demos fictícias são sinalizadas no vídeo (`<Disclosure>`).
- Não prometa retenção/conversão; não afirme ter analisado o que as ferramentas não permitem ver.
- Referências inspiram princípios, nunca cópia de sequências, identidades ou assets protegidos. Fontes e sons só com licença (a stack usa @fontsource OFL e SFX procedurais originais de `scripts/synth-sfx.py`).
- Não declare teste executado sem executá-lo. Sem exportação para After Effects/CapCut (não existe pipeline).

## Analisar referência e aprender

Usuário enviou vídeo/arquivo: siga `references/reference-analysis.md` — `python3 ${CLAUDE_SKILL_DIR}/scripts/inspect-media.py <video> --frames 16 --out <dir>`, observe os frames, registre em `references/reference-log/<slug>.md` (se a Skill veio de plugin, o cache é substituído em atualizações: salve também em `<projeto>/motion-references/` e sugira commitar no repositório-fonte da Skill) com `templates/reference-analysis-entry.md` e promova técnicas reutilizáveis para `references/pattern-library.md`. Links (YouTube etc.) podem estar bloqueados pela rede: diga isso e peça o arquivo.

## Modos de pedido comuns

| Pedido | Comece por |
|---|---|
| "Crie um motion premium para esse roteiro" | Fases 1–10 completas |
| "Transforme essa narração do ElevenLabs em peça visual" | `narration-sync.md` → fase 5 com word-map |
| "Apresentação premium desse SaaS" | Estilo C + `UI` da lib + câmera contínua (exemplo `saas-showcase`) |
| "Comercial minimalista estilo Apple" | Estilo A, poucos elementos, springs `calm` (exemplo `premium-product`) |
| "Analise essa referência e adicione à biblioteca" | `reference-analysis.md` |
| "Melhore a direção/acabamento desse motion" | Fase 8 primeiro (rubrica + frames), depois 9 |

Use subagentes só quando o ambiente permitir e houver ganho real (ex.: um revisa frames enquanto outro implementa); caso contrário execute os papéis (estrategista, diretor de arte, arquiteto de motion, engenheiro, sound designer, diretor de qualidade) como etapas deste fluxo.
