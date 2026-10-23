# Transições, câmera e profundidade

## Transição precisa conectar ideias
Escolha por significado (`<Scene transitionIn/transitionOut>` em `src/lib/scene.tsx`):

| Tipo | Significado | Frames | Notas |
|---|---|---|---|
| `cut` | Ritmo, contraste, batida | 0 | A mais premium muitas vezes. Corte no ataque da palavra/batida. |
| `fade` | Tempo passando, calma | 10–18 | — |
| `blur` | Mudança de foco/pensamento | 10–14 | Padrão do estilo A. |
| `push` | Sequência, "próximo" | 8–12 | Direção carrega sentido (para cima = avanço/subida). |
| `wipe` | Substituir, revelar | 10–16 | Melhor com um elemento conduzindo a borda. |
| `iris` | Foco a partir de um ponto | 12–16 | Combine com sujeito circular (luz, botão, logo). `origin` no sujeito. |
| `zoomThrough` | Entrar em um elemento | 10–18 | Saída escala ×2,2 a partir de `origin`; chegada no detalhe. |

Sobreposição: a cena seguinte começa `transitionIn.frames` antes do fim da anterior (o validador exige exatamente isso; gaps não planejados são erro).

## Transições de continuidade (sem componente pronto — construa na cena)
- **Match cut de forma**: o círculo da cena A está na mesma posição/tamanho do círculo da cena B.
- **Match de movimento**: o objeto sai pela direita em velocidade X, o próximo entra pela esquerda na mesma velocidade.
- **Elemento persistente**: um layer fora das `Scene` que atravessa a peça (ex.: `LightStory` no `premium-product`: luz → partículas → grid → ponto → anel → portal).
- **Transformação**: o card vira nó, a palavra vira botão, o gráfico vira o fundo.

## Câmera (`src/lib/camera.tsx`)
- `<Camera keys=[{at, x, y, scale, rotateX, rotateY, ease}]>`: câmera virtual sobre um "mundo". `x,y` = ponto (px a partir do centro) para onde a câmera olha. Propriedades não informadas num keyframe são carregadas do anterior.
- Push-in de respiro: escala 0,97 → 1,03 ao longo da cena (`softOut`).
- Push para detalhe de UI: 1,2–1,35×, 30–45 frames `inOut`, mantendo contexto (não centralize 100% o alvo; deixe o entorno visível).
- Pull-out para "ver o efeito": volte a 0,9–0,95 depois da ação.
- `driftAmount` ≤ 6 px para flutuação viva; 0 em estilo A estático.
- Perspectiva de entrada (rotateX 15–22° → 0) dá peso de "objeto" à janela; use uma vez por peça.
- `<ParallaxLayer depth>` dentro da câmera; `<FocusLayer depth focus=[…]>` para rack focus simulado (blur pela distância ao plano focado).

## Evite
- Transições "de template" (spin, cubo 3D, glitch) sem motivo semântico.
- Mais de 2 tipos de transição numa peça de 15 s.
- Câmera e elementos se movendo forte ao mesmo tempo (o olho não sabe o que seguir).
- Movimento de câmera em tipografia que precisa ser lida.
