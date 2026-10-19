# Receitas de motion

Cada receita foi extraída de referências analisadas (`analysis/`). **R-01 a R-12 têm código** em `engine/lib/recipes.js` (testadas no render do laboratório, `projects/_recipes-lab/`). R-13 a R-23 estão documentadas e indicam a regra/blueprint do HyperFrames a usar.

| ID | Receita | Código | Origem |
|---|---|---|---|
| [R-01](R-01_blur-in-palavras.md) | Blur-in por palavra | sim | REF-003 (0,9–2,4 s, 2,6–3,1 s), REF-006 (quase todas as frases), REF-008 (2,8 s, 9,2 s), REF-004 (1,8–2,5 s) |
| [R-02](R-02_saida-por-blur.md) | Saída por blur (dissolve com desfoque) | sim | REF-003 6,1 s |
| [R-03](R-03_montagem-escalonada.md) | Montagem escalonada (pop / grid / convergência) | sim | REF-007 0,1–0,8 s |
| [R-04](R-04_morph-de-forma.md) | Morph de forma (pill → card, bolha → tile, botão → tela) | sim | REF-004 1,1–1,5 s |
| [R-05](R-05_ticker-vertical.md) | Ticker vertical (roleta de números/anos) | sim | REF-002 15,6–18,1 s |
| [R-06](R-06_contador.md) | Contador (count-up) com barra | sim | REF-007 3,0 s, 6,6 s |
| [R-07](R-07_revelacao-circular.md) | Revelação circular (wipe radial) | sim | REF-005 7,07 s |
| [R-08](R-08_camera-3d.md) | Câmera 3D (estado único, pernas de movimento) | sim | REF-007 (peça inteira) |
| [R-09](R-09_pilha-de-eco.md) | Pilha de eco (palavra repetida) | sim | REF-006 8,2–8,8 s |
| [R-10](R-10_brilho-que-varre.md) | Brilho que varre (light sweep) | sim | REF-006 8,3–8,7 s |
| [R-11](R-11_profundidade-de-campo.md) | Profundidade de campo (rack focus) | sim | REF-008 5,3–5,6 s |
| [R-12](R-12_flash-de-corte.md) | Flash de corte (pontuação claro↔escuro) | sim | REF-006 5,33 / 8,13 / 20,97 s |
| [R-13](R-13_demo-com-cursor.md) | Demonstração guiada por cursor | doc | REF-001 1,7 s, 8,0–8,4 s |
| [R-14](R-14_hub-com-orbita.md) | Hub com satélites em órbita | doc | REF-002 7,9–9,3 s e 25–32 s |
| [R-15](R-15_trem-de-texto.md) | Trem de texto (frase que desliza enquanto cresce) | doc | REF-003 0,9–2,4 s |
| [R-16](R-16_zoom-through.md) | Zoom-through (atravessar o elemento) | doc | REF-003 2,53 s |
| [R-17](R-17_lista-que-cresce.md) | Lista que cresce no ritmo da fala | doc | REF-004 3,4–10,3 s |
| [R-18](R-18_whip-motion-blur.md) | Whip (chicote lateral) com motion blur | doc | REF-004 10,8 s |
| [R-19](R-19_sequencia-de-chat.md) | Sequência de mensagens (chat) | doc | REF-005 0–7 s |
| [R-20](R-20_escurecer-antes-de-revelar.md) | Escurecer antes de revelar | doc | REF-006 7,5–8,2 s |
| [R-21](R-21_linha-que-se-desenha.md) | Linha que se desenha (arcos, sublinhados, traços) | doc | REF-006 0,5 s, 6,3 s, 17,4 s, 34,2 s (logo) |
| [R-22](R-22_estacoes-e-pullback.md) | Estações de câmera + pull-back final | doc | REF-007 (estrutura completa) |
| [R-23](R-23_destaque-de-preco.md) | Destaque de preço/valor com luz | doc | REF-008 3,9–5,27 s |

## Como adicionar uma receita
1. Só a partir de algo **observado** numa referência (cite REF e tempo).
2. Copie o formato de um arquivo existente. Separe o valor observado do sugerido.
3. Se implementar, acrescente a função em `engine/lib/recipes.js` com o mesmo ID no comentário e teste no laboratório (`engine/index.html`).
