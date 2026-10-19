# Motion Library — Índice

Acervo de referências de motion design + sistema de criação (playbook, receitas, motor de render).
**Comece aqui** para qualquer pedido de vídeo. Depois leia `MOTION_PLAYBOOK.md`.

## Mapa da biblioteca

| Pasta/arquivo | O que tem |
|---|---|
| `references/` | Vídeos originais (nunca editar nem apagar) + `catalog.json` (metadados, SHA-256, nome original) |
| `analysis/REF-xxx/` | `analysis.md` (análise com [V]erificado/[H]ipótese), `metrics.json` (medições), `asr_raw.txt` (transcrição bruta) |
| `contact-sheets/` | `REF-xxx_sheet.jpg` (grade com timestamps), `_timeline.png` (movimento × áudio × cortes), `_cuts.jpg`, `_detail_*.jpg` (quadros densos de transições) |
| `MOTION_PLAYBOOK.md` | Linguagens, princípios, tempos, fluxo de produção, checklist de qualidade |
| `recipes/` | 23 receitas (R-01 a R-23). R-01 a R-12 implementadas em `engine/lib/recipes.js` |
| `design-system/` | Tokens base (cor, tipo, forma, área segura) e tokens de movimento |
| `engine/` | Projeto HyperFrames modelo (GSAP local, fontes Inter, receitas, laboratório) |
| `brands/` | Marcas atendidas: ofertas (`offers.json`), direção por produto, roteiros. **Nexools:** `brands/nexools/OFFERS.md` |
| `projects/` | Um diretório por vídeo produzido + `BRIEF_TEMPLATE.md` |
| `assets/` | Ativos licenciados reutilizáveis (política de licença) |
| `tools/` | `analyze.py`, `strip.py`, `asr/transcribe.mjs`, `setup.sh` |

## Referências

| ID | Peça | Formato | Dur. | Linguagens | Áudio | Melhor para estudar |
|---|---|---|---|---|---|---|
| [REF-001](analysis/REF-001/analysis.md) | App Zei (comparador de preços) | 9:16 · 30 fps | 37,5 s | Demo de produto · UI · Tipo cinética | VO PT + trilha | Morph botão→tela, onda de revelação, cursor guiando |
| [REF-002](analysis/REF-002/analysis.md) | H4 Digital (agência) | 9:16 · 30 fps | 45,8 s | Institucional · Tipo cinética | VO PT + trilha | Estrutura de argumento, ticker de ano, órbita, claro↔escuro |
| [REF-003](analysis/REF-003/analysis.md) | Concept Spotify "by Apple" | 16:9 · 29,97 | 15,9 s | **Minimalismo premium** · UI | trilha quase inaudível (−37,6 LUFS) | Blur-in, trem de texto, zoom-through, card 3D |
| [REF-004](analysis/REF-004/analysis.md) | "Let's Edit" (editor, humor) | 9:16 · 29,97 | 18,3 s | Tipo cinética · Ritmo/humor | VO EN + trilha | Morph pill→card, lista que cresce, whip |
| [REF-005](analysis/REF-005/analysis.md) | Concept Uber (UI story) | 16:9 · 30 fps | 23,0 s | **UI storytelling** · Minimalismo | trilha (pulso forte) | Revelação circular, objeto-ponte, corte no tempo |
| [REF-006](analysis/REF-006/analysis.md) | Park Criativo (serviço) | 9:16 · 30 fps | 35,9 s | **Tipo cinética guiada por VO** | VO PT + trilha | Eco, flash de 2 frames, escurecer antes de revelar |
| [REF-007](analysis/REF-007/analysis.md) | refinedmotion (bento widgets) | 9:16 · 30 fps | 16,8 s | **Minimalismo premium** · UI · Câmera 3D | trilha + SFX (sem VO) | Montagem de grid, câmera 3D, estações + pull-back |
| [REF-008](analysis/REF-008/analysis.md) | OtoCriativo "Apple Style" | 9:16 · 30 fps | 27,8 s | Minimalismo (leitura simplificada) · Tipo cinética | VO PT + trilha | Preço com luz, pills convergindo, profundidade de campo |

Observações do acervo:
- REF-001 e REF-002 são **filmagens de tela** (celular apontado para o monitor): cor e medições degradadas.
- O 2º envio do REF-001 (`2b469fa8-…`) é idêntico ao 1º (mesmo SHA-256) e não foi duplicado.
- REF-006 e REF-008 usam praticamente o **mesmo roteiro** (template de mercado).
- Nenhuma referência tem dado de desempenho de campanha.

## Como escolher referências para um pedido

| Se o pedido é… | Principal | Apoio |
|---|---|---|
| "Apple Style", premium, produto bonito | REF-003 | REF-007, REF-005 |
| App/SaaS: mostrar como funciona | REF-005 (história) ou REF-001 (passo a passo) | REF-007 |
| Serviço com locução e oferta | REF-006 | REF-008, REF-002 |
| Agência/B2B, autoridade, números | REF-002 | REF-006 |
| Dashboard, dados, vários recursos | REF-007 | REF-003 |
| Marca pessoal, humor, orgânico | REF-004 | REF-006 |

Tags rápidas → receitas: blur/foco **R-01, R-02, R-11** · morph **R-04** · números **R-05, R-06, R-23** · câmera **R-08, R-16, R-22** · transições **R-07, R-12, R-18, R-20** · ênfase **R-09, R-10, R-21** · UI **R-13, R-17, R-19** · layout **R-03, R-14, R-15**.

## Como adicionar novas referências (toda sessão)

1. Preparar o ambiente: `bash motion-library/tools/setup.sh`.
2. Conferir duplicata: `sha256sum <arquivo>` contra `references/catalog.json`.
3. Copiar para `references/REF-0NN_<slug-descritivo>.mp4` (próximo número livre; nunca renumerar).
4. Medir: `python3 motion-library/tools/analyze.py motion-library/references/REF-0NN_*.mp4 REF-0NN --original-name "<nome original>"`.
5. Transcrever (se tiver fala): `node motion-library/tools/asr/transcribe.mjs <arquivo>` e salvar em `analysis/REF-0NN/asr_raw.txt`.
6. Assistir: ler `_sheet.jpg` e `_timeline.png`; gerar detalhes nas transições com `tools/strip.py`.
7. Escrever `analysis/REF-0NN/analysis.md` no mesmo formato ([V]/[H], linha do tempo, receitas).
8. Atualizar esta tabela, o playbook (se surgir padrão novo ou contra-exemplo) e `recipes/` (só o que foi observado).
9. Commit + push. **Nunca apagar análises anteriores**: corrija acrescentando uma nota de correção.

## Histórico
- 2026-10-19 · Marca Nexools registrada: catálogo de 5 ofertas, direção de motion por produto e modelo de roteiro.
- 2026-10-19 · v1: REF-001 a REF-005 (1º envio) + REF-006 a REF-008 (2º envio). Playbook v1, 23 receitas, motor HyperFrames com laboratório renderizado. A nota anterior foi preservada em `analysis/_legacy-notas-v1.md`.
