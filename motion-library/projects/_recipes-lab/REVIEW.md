# Laboratório de receitas — revisão do render

**O que é:** prova técnica do pipeline (não é anúncio). Fonte: `engine/index.html`. Exercita R-01 a R-12 com texto neutro.
**Arquivo:** `recipes-lab.mp4`. QA automático em `recipes-lab_qa/` (folha, linha do tempo, métricas).

## Especificação verificada (ffprobe)
1080×1920 · 30 fps · 10,00 s · H.264 yuv420p · sem áudio (de propósito: o lab não testa som).

## Gate `npx hyperframes check`
0 erros. Contraste 38/38 WCAG AA. 3 avisos `nested_structure_needs_subcomposition` (a cena está no próprio index.html). Aceito no lab; em projetos reais, uma sub-composição por cena.

## Revisão visual (frames a cada 0,1–0,33 s)
| Cena | t (s) | Receitas | Resultado |
|---|---|---|---|
| A claro | 0–3,2 | R-01, R-04, R-10, R-02 | OK após correção 1 e 2 |
| B escuro | 3,2–5,9 | R-12, R-05, R-06, R-07 | OK: ticker trava em 2026, contador +38%, disco nasce do badge |
| C bento | 5,9–10 | R-03, R-08, R-11, R-06 | OK: montagem, inclinação 3D e rack focus, contador 87% |

## Problemas encontrados e corrigidos
1. **1º frame vazio** (frames 0–7 em branco no 1º render). Corrigido: o título começa em t=0 com 25% de opacidade (`fromOpacity`).
2. **Quebra ruim do título** ("quadro." sozinho na 2ª linha). Corrigido com `text-wrap: balance`.

## Frames "vazios" restantes (intencionais)
Frames 97–98 = flash cinza (R-12). Frames 175–176 = disco cobrindo o quadro (R-07), seguidos da cena C com a mesma cor.

## Desempenho
Render de 10 s em ~19 s (captura beginframe, GPU por software, 2 workers).
