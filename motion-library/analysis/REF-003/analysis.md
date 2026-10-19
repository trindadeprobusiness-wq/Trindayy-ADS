# REF-003 — "What if Apple made an ad for Spotify" (concept)

| Campo | Valor |
|---|---|
| Arquivo | `references/REF-003_spotify-concept-apple-style.mp4` |
| Nome original | `What_if_Apple_made_ad_for_Spotify_Personal_project_not_spons.mp4` |
| Duração / formato | 15,9 s · 16:9 · 1024×576 · 29,97 fps · AAC |
| Assinatura | "Concept ad by SzymonEdits" (tela final) — projeto pessoal, não oficial |
| Linguagens | **Minimalismo premium (Apple Style)** · Animação de interface |

Legenda: **[V]** observado/medido · **[H]** hipótese.

> Uso: estudar princípios. A marca Spotify, as capas de álbum e a UI pertencem a terceiros e **não** devem ser reutilizadas.

## Conceito e objetivo
[V] Exercício de estilo: apresentar recursos do Spotify (playlists personalizadas, descoberta semanal, curtidas, letras) com a linguagem de anúncio da Apple.

## Gancho e progressão
[V] O gancho é a própria premissa ("Spotify ad made by Apple.", 0–2,4 s). Depois vêm 4 blocos de benefício, cada um com **frase curta + prova de UI**: Playlists Made For You → Discover new sounds / Every week → Collect what you love → Feel every word. Fecha com o logo.

## Linha do tempo (medida em frames a cada 0,1–0,13 s)
| t (s) | Evento [V] |
|---|---|
| 0,0–0,4 | Logo nasce desfocado e grande, foca e reduz (≈0,4 s) |
| 0,9–2,4 | **"Trem de texto"**: a linha desliza para a esquerda enquanto "ad made by" e "Apple." entram pela direita com blur |
| 2,5 | "Apple." **avança em zoom contra a câmera** com motion blur forte (zoom-through) |
| 2,6–3,1 | "Playlists Made For You" nasce pequeno e desfocado e cresce até nítido |
| 3,6–5,0 | Grade de capas "Made For You" entra com blur. Texto anterior faz cross-blur |
| 5,6 | "Discover new sounds" (centrado) |
| 6,1–6,3 | Dissolve com blur → "Every week." inclinado ≈ −15° |
| 6,6–7,4 | Mosaico de capas inclinado entra por fade e desliza na diagonal. O texto some em 7,4 |
| 8,1–8,2 | Flash para verde liso (transição) |
| 8,3–8,5 | **Card do player entra inclinado em 3D com motion blur e assenta** |
| 8,5–9,9 | Player em leve deriva/escala contínua. "Collect what you love" entra por blur (9,2–9,6) |
| 10,0–10,4 | **Câmera avança nos controles** (push-in como transição) |
| 10,9–11,6 | Check verde + toast "Added to Liked Songs" |
| 12,2 | "Feel every word." (centrado, palavra em verde) |
| 12,9–13,5 | Card de letras em vidro fosco (glassmorphism), inclinado, linha atual em destaque |
| 14,2–15,5 | Logo final + "Concept ad by…" → fade |
| 15,8 | Corte para o fim |

## Linguagem visual
- **Tipografia [V]:** sans-serif de peso médio/semibold, pequena em relação ao quadro (≈5% da altura), centralizada, muito espaço negativo. Ênfase por cor (verde) em uma palavra.
- **Paleta [V]:** fundo em **gradiente mesh verde/preto em movimento lento**. Branco no texto. Cor só da marca.
- **Profundidade [V]:** cards de UI com vidro fosco e sombra, inclinação 3D, camadas desfocadas atrás (rack focus).

## Movimento
- **Easing [V/H]:** entradas chegam rápido e assentam longo (perfil tipo `expo.out`/`power4.out` [H]). Nunca há quique ou overshoot.
- **Câmera [V]:** push-ins e derivas lentas contínuas: nada fica 100% parado (energia de movimento p50 = 0,011, a maior entre as peças "calmas").
- **Transições [V]:** cross-blur de texto, zoom-through numa palavra, flash de cor, push-in de câmera. **Sem corte seco** até o final (1 corte, 15,8 s).

## Som
- [V] Áudio **muito baixo**: −37,6 LUFS integrado (inaudível em uso normal). Sem locução (a transcrição devolveu só alucinação).
- [H] Havia uma trilha e o volume foi reduzido na exportação ou no upload. Não dá para analisar a sincronia, e a coincidência medida de 0% entre corte e ataque não significa nada aqui.

## O que torna sofisticado
Uma ideia por tela, contenção tipográfica, UI como prova, movimento sempre ligado mas lento, transições que nascem do próprio conteúdo (palavra vira transição, câmera mergulha no botão).

## O que poderia melhorar
Texto pequeno demais para 9:16. [H] Em mobile vertical, precisaria de ~2× o tamanho relativo. O áudio inaudível na cópia recebida impede avaliar o som.

## Receitas extraídas
R-01 Blur-in · R-02 Saída por blur · R-15 Trem de texto (documentada) · R-16 Zoom-through (documentada) · R-08 Câmera/entrada 3D · R-11 Profundidade de campo

## Hipóteses
Ferramenta (After Effects provável, não verificável), curvas exatas, trilha original.
