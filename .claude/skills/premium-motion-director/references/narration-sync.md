# Narração e sincronização (ElevenLabs e outros)

## Fluxo
1. Receber roteiro e áudio (`.mp3/.wav`). Copiar para `<studio>/public/voice/<projeto>.mp3`.
2. Inspecionar: `python3 scripts/inspect-media.py public/voice/x.mp3` → duração, LUFS, true peak, **silêncios** (pausas reais).
3. Obter timestamps por palavra, em ordem de preferência:
   a. **ElevenLabs** — gere com o endpoint de TTS *with timestamps* e salve o JSON de resposta (campos `alignment.characters`, `character_start_times_seconds`, `character_end_times_seconds`). Use a chave de API do próprio usuário via variável de ambiente; nunca grave a chave no repositório. Confirme o nome atual do endpoint na documentação oficial da ElevenLabs antes de chamar.
   b. **Transcrição com timestamps de palavra** (ex.: Whisper com `word_timestamps`) se a ferramenta estiver instalada — salve como lista `[{word,start,end}]`.
   c. **Sem alinhamento palavra a palavra confiável** → alinhamento por frase: use os silêncios do passo 2 para delimitar frases e escreva `{"phrases":[{text,start,end}]}`. Registre a limitação no relatório.
4. Converter: `python3 scripts/alignment-to-timeline.py alinhamento.json --fps 30 --out src/examples/<p>/word-map.json` (aceita os três formatos; nunca altera tempos, só converte; frases quebram em pausas ≥ 0,28 s ou pontuação final).
5. Mapa temporal: decida quais palavras são conceito (destaque), onde há pausa dramática (corte/hold), onde muda o cenário (início de frase), como simbolizar a transformação.
6. Cenas: `from` de cada cena = `startFrame` da frase que a abre (menos a transição). Duração total = fim da última palavra + hold do CTA (≥ 1,5 s).
7. Animar com `wordStarts` (palavra) ou `start` = `phrase.startFrame` (frase).
8. Som: `timeline.audio.narration = {src, volume}`; `MusicBed duck` = frases do word-map.
9. Renderizar, masterizar (−14 LUFS) e validar. Ouça/meça: voz inteligível sobre a música (ducking ativo).

## Exemplo de decisão
Narração: "A inteligência artificial não está chegando. Ela já está transformando o mercado."
- Destaques: "não está chegando" (negação → tipografia riscada ou recuo), "já" (urgência → corte seco), "transformando" (metamorfose visual).
- Pausa após "chegando." → 8–12 frames de silêncio musical; cena muda no ataque de "Ela".
- Elemento principal: um objeto que muda de estado durante "transformando", terminando no conceito "mercado" (gráfico/rede).

## Fixture de teste
`tests/fixtures/elevenlabs-alignment.json` é **sintético** (tempos escritos à mão, sem áudio) — serve para testar o pipeline e o exemplo `dynamic-ad`. Para produção, substitua pela resposta real da ElevenLabs e coloque o áudio em `timeline.audio.narration`.
