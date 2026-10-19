# Projetos

Um diretório por vídeo: `projects/<aaaa-mm>-<slug>/`.

## Começar um projeto
```bash
cd motion-library
rsync -a --exclude node_modules --exclude .hyperframes --exclude renders engine/ projects/<slug>/
cp projects/BRIEF_TEMPLATE.md projects/<slug>/BRIEF.md
cd projects/<slug> && npm install            # hyperframes + gsap fixados
npx hyperframes check                        # gate de qualidade
npx hyperframes render -o renders/<slug>-v1.mp4
python3 ../../tools/analyze.py renders/<slug>-v1.mp4 <slug>-v1 --qa
```

## Conteúdo esperado em cada projeto
- `BRIEF.md`: briefing + referências escolhidas (com o porquê).
- `STORYBOARD.md`: cenas, tempos, textos, receitas, áudio.
- `index.html` + `compositions/` (uma sub-composição por cena).
- `assets/`: só material do cliente ou com licença registrada.
- `REVIEW.md`: checklist do playbook §5 preenchido sobre o render.
- Render final versionado (`renders/` fica fora do git por padrão; commitar o final se tiver < 20 MB, ou registrar onde ficou guardado).

`_recipes-lab/` é a prova técnica do motor (não é um anúncio).
