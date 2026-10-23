# Trindayy-ADS

## Motion design / vídeos por código
Para qualquer pedido de vídeo, anúncio em motion ou referência nova:
1. Rode `bash motion-library/tools/setup.sh` (instala o motor HyperFrames, as skills e as ferramentas de análise; o container é efêmero).
2. Leia `motion-library/INDEX.md` (acervo + como escolher referências) e `motion-library/MOTION_PLAYBOOK.md` (linguagens, fluxo, checklist).
3. Receitas: `motion-library/recipes/`; código em `motion-library/engine/lib/recipes.js`.
4. Referência nova: siga "Como adicionar novas referências" no INDEX. Nunca apague análises anteriores: acrescente uma correção.
5. Não declare um vídeo pronto sem renderizar e revisar os frames (`tools/analyze.py --qa`, `tools/strip.py`).
6. Não use marcas, músicas, imagens ou fontes de terceiros vistas nas referências como ativos.
7. Exceção autorizada pelo usuário (19/10/2026): nos anúncios da Nexools podem aparecer os logos oficiais dos produtos revendidos (Gemini/Google, Coursera, ElevenLabs, n8n via `simple-icons`, CC0; Manus via `@lobehub/icons-static-svg`, MIT, autorizado em 20/10/2026), sempre com o rodapé "Nexools é revendedora independente. Marcas citadas pertencem aos seus respectivos donos." Prints reais só se o usuário enviar.
8. **Skill obrigatória em todo projeto de vídeo (pedido do usuário, 23/10/2026):** carregue `premium-motion-director` (`.claude/skills/premium-motion-director/`) e siga o fluxo de 10 fases dela: brief → estratégia/análise semântica → direção de arte (estilos A–F) → storyboard → timeline → produção → render → revisão crítica com a rubrica (meta ≥ 90/100, evidência por critério) → refinamento → entrega. Valem as regras inegociáveis dela (área segura 9:16, ≤ 6 SFX/10 s com `why`, true peak ≤ −1 dBTP, nada de número ou funcionalidade inventada).
   - Motor: os anúncios da Nexools continuam no HyperFrames (`tools/build.py`), que já tem a mistura de áudio, a trilha de retenção e a remoção de metadados. Use o estúdio Remotion da skill (`bash .claude/skills/premium-motion-director/scripts/init-studio.sh motion-studio`) quando a peça pedir algo que só ele tem (câmera virtual, demo de SaaS em plano contínuo, sincronia palavra a palavra com o JSON da ElevenLabs) ou quando o usuário pedir. Vídeo feito no Remotion também sai sem metadados antes da entrega.
   - Referência nova analisada: registre em `motion-library/` (como no item 4) **e** em `.claude/skills/premium-motion-director/references/reference-log/`; padrões reutilizáveis vão para `references/pattern-library.md`.

## Marcas
- **Moovi** (finanças pessoais pelo WhatsApp): ficha, logos e narrações em `motion-library/brands/moovi/BRAND.md`. Não guarde senhas no repositório.

## Marca ativa: Nexools
Catálogo e direção por produto em `motion-library/brands/nexools/OFFERS.md` (dados em `offers.json`; custo/lucro são internos e nunca vão para vídeo). Roteiros em `motion-library/brands/nexools/roteiros/`.

## Estratégia de criativos
Antes de propor novos criativos, testes ou escala, siga `motion-library/strategy/PROMPT_MESTRE_CREATIVE_STRATEGY.md` (prompt-mestre do usuário, 20/10/2026). Estratégia atual da Nexools: `motion-library/brands/nexools/ESTRATEGIA_CRIATIVOS_v1.md` (também no Google Drive, pasta "Nexools — Criativos Meta Ads (out 2026)"). Registre resultados de testes no "Banco de aprendizados" desse arquivo.
