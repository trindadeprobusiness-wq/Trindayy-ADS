# REF-007 — "refinedmotion": widgets em bento grid com câmera 3D

| Campo | Valor |
|---|---|
| Arquivo | `references/REF-007_refinedmotion.mp4` |
| Nome original | `refinedmotion.mp4` |
| Duração / formato | 16,8 s · 9:16 · 576×1024 · 30 fps · AAC estéreo |
| Assinatura | monograma "RM" no fim |
| Linguagens | **Minimalismo premium** · Animação de interface · Câmera 3D contínua |

Legenda: **[V]** observado/medido · **[H]** hipótese.

> Marca Mercedes-Benz e a foto do carro aparecem como conteúdo de widget: são de terceiros, só estudo.

## Conceito e objetivo
[V] Peça de portfólio/estilo: um painel de widgets (calendário "Daily Activity", bateria, relógio, carro carregando, navegação, chamada, próximo voo) apresentado como plano-sequência de câmera. [H] Objetivo: mostrar domínio de motion de UI.

## Linha do tempo (frames a cada 0,1–0,13 s)
| t (s) | Evento [V] |
|---|---|
| 0,0–0,1 | Fundo cinza com vinheta, vazio |
| 0,1–0,8 | **Tiles brancos e pretos surgem escalonados, de pequenos ao tamanho final, montando o grid** |
| 0,8–1,4 | Hold do grid montado (sem conteúdo) |
| 1,4–2,0 | **Câmera avança e inclina em 3D** em direção ao tile preto. O conteúdo "Daily Activity" aparece por fade |
| 1,7–2,0 | Pontos verdes do calendário acendem em sequência |
| 2,0–2,6 | Linhas do calendário populam linha a linha |
| 2,9–3,4 | Câmera desliza até o tile de bateria: **contador 4 → 7 → 11 → 17%** e barras enchendo |
| 3,5–6 | Bateria 38–57%, relógio analógico com ponteiro vermelho em movimento |
| 6,6–7,4 | Card "Mercedes-Benz": % de carga sobe (0 → 36%), barra verde enche |
| 8,0–8,8 | Carro entra no card com fumaça/partículas. "60m left" |
| 9,4–10,2 | Mapa de navegação: rota desenhada, pino azul, instruções "150m → 100m" |
| 10,9–12,3 | Card de chamada "Mom 08:21" com botão vermelho. Card "Next Flight Stuttgart → Dubai" |
| 12,6–13,7 | **Pull-back: a câmera recua e revela o grid inteiro**, desacelerando |
| 13,7–15,6 | Hold do grid completo com micro-animações vivas (bateria 64→65%) |
| 15,6 | **Corte seco** para preto com monograma "RM" (hold até o fim) |

## Linguagem visual
- **Composição [V]:** bento grid (tiles de tamanhos diferentes, cantos bem arredondados, ~4% da largura) alternando tiles claros e pretos. Plano 3D levemente inclinado.
- **Paleta [V]:** cinza neutro com vinheta + branco + preto. Cor só nos dados: verde-limão (progresso), vermelho (alerta, ponteiro, chamada), azul (navegação).
- **Luz/profundidade [V]:** sombras suaves sob os tiles, vinheta radial, perspectiva real (o tamanho dos tiles muda com a distância).

## Movimento
- [V] **Um único plano-sequência** (1 corte só, no fim). A câmera visita os widgets como "estações".
- [V] A curva de energia mostra ondas suaves a cada ~2–3 s (cada perna de câmera acelera e desacelera). Nunca para de vez até 13,7 s.
- [V] Dentro de cada widget, os dados se animam (contadores, barras, pontos, rota). A câmera mostra, o conteúdo prova.
- [H] Pernas de câmera com `power2.inOut`, pouso final com `power4.out` (assentamento longo em 12,6–13,7 s).

## Som e sincronia
- [V] Sem locução. Áudio com dinâmica maior (LRA 7,5 LU, a mais alta) e aglomerados de ataques em 1–2,5 s, 5–6,5 s e 10–11 s, coincidindo com momentos de pop/contadores. [H] É sound design de UI (cliques, ticks) sobre uma trilha suave.
- [V] O corte final não cai num ataque (0,32 s de distância).

## O que torna sofisticado
Plano-sequência com propósito, dados vivos em cada parada, paleta disciplinada (cor = informação) e montagem inicial do grid que "constrói" o palco antes do conteúdo.

## O que poderia melhorar
Os widgets têm texto pequeno (~1,5% da altura) e alguns dados não são legíveis no celular. Não há mensagem ou CTA: é demonstração de estilo, não anúncio.

## Receitas extraídas
R-03 Montagem escalonada · R-08 Câmera 3D · R-06 Contador · R-22 Estações de câmera + pull-back final (documentada, combina R-08) · R-11 Profundidade
