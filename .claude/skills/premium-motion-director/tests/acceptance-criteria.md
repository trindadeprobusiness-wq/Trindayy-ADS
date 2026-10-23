# Critérios de aceitação

## Skill
- `scripts/validate-skill.py` passa (frontmatter, nome = diretório, descrição ≤ 1536, SKILL.md < 500 linhas, arquivos citados existem, scripts compilam).
- `python3 -m unittest tests/test_scripts.py` passa (alinhamento, validação de assets, SFX determinístico, inspeção de mídia, validação de render, masterização).

## Cada produção
1. Técnico (bloqueante): `validate-assets.py` e `validate-render.py` sem erros; `npx tsc --noEmit` limpo.
2. Visual (bloqueante): stills com `--safe` revisados — nenhum texto cortado, fora da área segura ou sobreposto indevidamente.
3. Artístico: rubrica de `references/quality-standards.md` com evidência por critério; meta ≥ 90. Nota abaixo disso é reportada, não arredondada.
4. Honestidade: limitações (fixture sintética, áudio procedural, produto fictício) declaradas no relatório e, quando aplicável, na tela.

## Comparação com/sem a Skill
Um A/B controlado (mesmo prompt sem a Skill, com avaliador independente) **não foi executado** neste ambiente. O que foi medido é o efeito do ciclo de revisão da Skill: cada relatório em `examples/*/report.md` lista os defeitos que a fase 8 encontrou e corrigiu (11 ao todo, incluindo 1 bug de script pego pelos testes).
