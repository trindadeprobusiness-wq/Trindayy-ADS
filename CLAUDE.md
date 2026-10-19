# Trindayy-ADS

## Motion design / vídeos por código
Para qualquer pedido de vídeo, anúncio em motion ou referência nova:
1. Rode `bash motion-library/tools/setup.sh` (instala o motor HyperFrames, as skills e as ferramentas de análise; o container é efêmero).
2. Leia `motion-library/INDEX.md` (acervo + como escolher referências) e `motion-library/MOTION_PLAYBOOK.md` (linguagens, fluxo, checklist).
3. Receitas: `motion-library/recipes/`; código em `motion-library/engine/lib/recipes.js`.
4. Referência nova: siga "Como adicionar novas referências" no INDEX. Nunca apague análises anteriores: acrescente uma correção.
5. Não declare um vídeo pronto sem renderizar e revisar os frames (`tools/analyze.py --qa`, `tools/strip.py`).
6. Não use marcas, músicas, imagens ou fontes de terceiros vistas nas referências como ativos.
