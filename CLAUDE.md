# Trindayy-ADS

## Motion design / vídeos por código
Para qualquer pedido de vídeo, anúncio em motion ou referência nova:
1. Rode `bash motion-library/tools/setup.sh` (instala o motor HyperFrames, as skills e as ferramentas de análise; o container é efêmero).
2. Leia `motion-library/INDEX.md` (acervo + como escolher referências) e `motion-library/MOTION_PLAYBOOK.md` (linguagens, fluxo, checklist).
3. Receitas: `motion-library/recipes/`; código em `motion-library/engine/lib/recipes.js`.
4. Referência nova: siga "Como adicionar novas referências" no INDEX. Nunca apague análises anteriores: acrescente uma correção.
5. Não declare um vídeo pronto sem renderizar e revisar os frames (`tools/analyze.py --qa`, `tools/strip.py`).
6. Não use marcas, músicas, imagens ou fontes de terceiros vistas nas referências como ativos.
7. Exceção autorizada pelo usuário (19/10/2026): nos anúncios da Nexools podem aparecer os logos oficiais dos produtos revendidos (Gemini/Google, Coursera, ElevenLabs, n8n), via `simple-icons` (CC0), sempre com o rodapé "Nexools é revendedora independente. Marcas citadas pertencem aos seus respectivos donos." Prints reais só se o usuário enviar.

## Marca ativa: Nexools
Catálogo e direção por produto em `motion-library/brands/nexools/OFFERS.md` (dados em `offers.json`; custo/lucro são internos e nunca vão para vídeo). Roteiros em `motion-library/brands/nexools/roteiros/`.

## Estratégia de criativos
Antes de propor novos criativos, testes ou escala, siga `motion-library/strategy/PROMPT_MESTRE_CREATIVE_STRATEGY.md` (prompt-mestre do usuário, 20/10/2026). Estratégia atual da Nexools: `motion-library/brands/nexools/ESTRATEGIA_CRIATIVOS_v1.md` (também no Google Drive, pasta "Nexools — Criativos Meta Ads (out 2026)"). Registre resultados de testes no "Banco de aprendizados" desse arquivo.
