# Teste C — SaaS showcase ("Fluxo", produto fictício)

**Brief**: demonstrar um SaaS de automação em 16:9, 18 s. Produto e números fictícios, sinalizados no vídeo ("Demonstração · produto e dados fictícios").
**Ideia-mestra**: um único plano contínuo — ver o painel → criar automação → ativar → ver o efeito no painel (causa → efeito).

| Momento (local) | Frames | Câmera | Interação |
|---|---|---|---|
| Título | 0–78 | — | Grid desenha, "Fluxo" em stagger |
| Entrada do app | 66–110 | rotateX 20°→0, 0,72→0,86 | KPIs contam, gráfico desenha |
| Push no botão | 166–216 | 1,32× no canto sup. direito | Cursor viaja, pausa, clique (f 206) |
| Fluxo | 216–308 | viaja ao painel, 1,18× | Nós entram, arestas desenham, pulsos de preview |
| Ativar | 308–346 | vai ao toggle, 1,3× | Clique (f 346), toggle on, pulsos "ao vivo" |
| Efeito | 366–462 | pull-out 0,92× | Painel fecha, KPIs 1.284→1.291 e 7→8 com glow, linha nova "Ativa", toast |
| End card | 450–540 | — | "Menos operação. Mais decisão." + CTA |

## Revisão crítica
1. Nós do fluxo pequenos no painel → `scale 1.25` e arestas reposicionadas.
2. Loudness −25,1 LUFS → masterização (−14,0 LUFS).
3. Duração 18,1 s após masterização (padding do loudnorm) → áudio cortado na duração exata do vídeo; validação voltou a 18,000 s.

## Validação técnica
1920×1080 @30, 18,000 s, −14,0 LUFS, pico −1,3 dBTP → **PASS**.

## Rubrica — 88/100
| Critério | Nota | Evidência |
|---|---|---|
| Direção criativa | 17/20 | Plano contínuo com causa→efeito; estética SaaS esperada |
| Clareza narrativa | 14/15 | A ação e o resultado são legíveis sem narração |
| Composição/tipografia | 13/15 | Metade superior do painel de fluxo fica vazia |
| Movimento | 14/15 | Câmera inOut, cursor humano com pausa antes do clique |
| Ritmo/sync | 8/10 | Sem narração; trechos de câmera poderiam ser 10% mais curtos |
| Sound design | 8/10 | Cliques reais e confirmação; pad sintético |
| Consistência | 5/5 | Tema C |
| Acabamento | 9/10 | Disclosure honesto, validação limpa |

**Para passar de 90**: telas reais do produto do cliente, narração, preencher o painel (gatilho/condições) e encurtar as viagens de câmera.
