# Analisar referências e alimentar a biblioteca

Isto é uma **biblioteca persistente** de conhecimento (arquivos neste diretório), não retreino do modelo.

## Entrada
- Arquivo de vídeo local (preferido) em uma pasta própria, ex. `references/reference-log/media/<slug>.mp4` (não versione vídeos de terceiros; adicione ao `.gitignore` se necessário).
- Link: tente acessar; se a rede bloquear (comum para YouTube neste ambiente), **diga isso** e peça o arquivo ou prints. Nunca descreva um vídeo que não foi visto.

## Procedimento
1. `python3 scripts/inspect-media.py <video> --frames 16 --out <dir>` → metadados, cortes (cena), ritmo (mediana de plano, cortes/10 s), loudness, silêncios, frames + contact sheet.
2. Abra o contact sheet e frames individuais (Read). Para momentos de transição, extraia mais frames ao redor do corte: `ffmpeg -ss <t-0.3> -i v.mp4 -frames:v 10 -vf fps=30 <dir>/t_%02d.png`.
3. Analise nas 6 dimensões e preencha `templates/reference-analysis-entry.md`:
   - A **Narrativa** (abertura, progressão, picos, encerramento)
   - B **Movimento** (transições, easing percebido, spring/overshoot, antecipação, secundário, continuidade, câmera)
   - C **Design** (grid, tipografia, paleta, contraste, profundidade, textura, 3D)
   - D **Edição** (duração de planos — use os números do script; alternância denso/simples)
   - E **Som** (só o que o áudio permite medir/ouvir: silêncios e loudness são medidos; tipos de SFX são inferência — marque como tal)
   - F **Inteligência criativa** (por que funciona, conceito, o que melhoraria, como adaptar)
4. Marque cada afirmação como **medido** (script), **observado** (frames) ou **inferido**.
5. Salve em `references/reference-log/<slug>.md`.
6. Promova técnicas transferíveis para `pattern-library.md` (novo P-número, formato padrão). Se exigir código novo, crie componente parametrizado em `engine/src/lib` (e no estúdio do projeto) e cite-o.

## Evitar cópia cega
- Extraia princípio ("revela o produto de dentro do elemento anterior"), não a execução literal (mesmas formas, cores, tempos, sequência).
- Não reproduza logos, personagens, identidades, trilhas ou sequências inteiras de terceiros.
- Ao produzir "versão original com qualidade semelhante": mude a metáfora, a paleta, a estrutura e o som; mantenha só os princípios de ritmo, hierarquia e acabamento.

## Referências de linguagem (conhecimento geral, não vídeos analisados aqui)
- Apple: minimalismo, produto como herói, ritmo controlado, tipografia precisa, silêncio.
- Buck / Giant Ant: animação conceitual, storytelling expressivo, personagens/metáforas.
- Ordinary Folk: refinamento de movimento e design narrativo.
- ManvsMachine: direção de arte forte, materiais, movimento de câmera e tratamento.
Esses nomes orientam vocabulário; nenhum trabalho deles foi assistido/copiado nesta biblioteca.
