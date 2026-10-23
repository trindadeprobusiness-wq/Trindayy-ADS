# Princípios de movimento (valores concretos)

Todos os valores assumem 30 fps. Para 60 fps, dobre frames; para 24 fps, × 0,8.

## Curvas (`ease` em `src/lib/motion.ts`)

| Nome | Bezier | Uso |
|---|---|---|
| `out` | (0.16, 1, 0.3, 1) | Padrão para tudo que **entra**. Desaceleração longa = sensação premium. |
| `softOut` | (0.25, 0.1, 0.25, 1) | Objetos grandes e lentos (fundo, produto, câmera de respiro). |
| `in` | (0.7, 0, 0.84, 0) | Saídas. Sai mais rápido do que entra (≈ 60–70% da duração de entrada). |
| `inOut` | (0.65, 0, 0.35, 1) | Câmera, morphs, deslocamento entre dois estados de repouso. |
| `standard` | (0.4, 0, 0.2, 1) | Mudanças de estado de UI (toggle, aba). |
| `overshoot` | (0.34, 1.56, 0.64, 1) | Confirmação, marca lúdica. Nunca em estilo A. |
| `anticipate` | (0.36, 0, 0.66, −0.56) | Recuo antes de avançar (botão sendo "carregado", objeto lançado). |
| `linear` | — | Só para loops contínuos (rotação, scroll infinito, partículas). |

## Springs (`springs`)

| Preset | damping/stiffness/mass | Caráter |
|---|---|---|
| `calm` | 200/90/1 | Sem overshoot. Apple-like. |
| `precise` | 28/180/1 | Assenta rápido, overshoot imperceptível. UI e tipografia. |
| `snappy` | 15/220/0.8 | Micro-overshoot visível. Ads dinâmicos. |
| `playful` | 10/160/0.9 | Bounce claro. Marcas lúdicas apenas. |
| `heavy` | 24/70/2.2 | Peso. Revelação de produto, objetos grandes. |

## Durações de referência (frames @30)

| Ação | Faixa |
|---|---|
| Micro-interação (clique, check) | 4–8 |
| Entrada de palavra/ícone | 10–18 (spring) |
| Card / painel | 14–22 |
| Transição entre cenas | 8–18 (cut = 0) |
| Movimento de câmera em UI | 30–50 |
| Push-in lento de respiro | duração da cena inteira, deslocamento ≤ 4% de escala |
| Hold de leitura | ≥ 0,3 s por palavra lida + 0,5 s; CTA final ≥ 1,5 s |

## Stagger
- Palavras: 2 (dinâmico) – 7 (contemplativo) frames.
- Caracteres: 1–3 frames, só em palavras curtas/logos.
- Listas/cards: 3–6 frames. Mais de 8 itens → agrupe ou reduza para 2.
- Com narração: o stagger é **a fala** (`wordStarts`), não um número fixo.

## Os 12 princípios aplicados a motion gráfico
- **Antecipação**: 2–4 frames de recuo antes de um avanço forte (botão pressionado: scale 0,95).
- **Follow-through / overlapping**: elementos filhos chegam 2–4 frames depois do pai (card → conteúdo).
- **Movimento secundário**: menor e mais lento que o principal (drift de fundo, grain, glow respirando). Se compete, remova.
- **Arcos**: cursores e objetos em trajetórias levemente curvas, não retas perfeitas.
- **Slow in/out**: nunca linear em algo que começa ou termina parado.
- **Exagero**: proporcional ao estilo (`theme.motion.intensity`: A 0,45 · C 0,7 · B 1).
- **Timing**: contraste rápido/lento cria ritmo; três cenas no mesmo andamento cansam.

## Continuidade espacial
- Mantenha um eixo: se a narrativa "avança" para a esquerda, não alterne direções sem motivo.
- Câmera virtual (`<Camera>`) em vez de cortes para demonstrações: o espectador nunca perde o contexto.
- Profundidade: no máximo 3 planos (fundo, sujeito, primeiro plano). Parallax: fundo 0,2–0,5; sujeito 1; frente 1,2–1,5.

## Determinismo (render)
- Nada de `Math.random()`/`Date.now()`: use `random(seed)` do Remotion ou `drift()` da lib.
- Toda animação é função do frame. CSS transitions/animations são proibidas (não sincronizam com o render).
