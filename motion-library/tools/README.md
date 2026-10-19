# Ferramentas

| Ferramenta | Para quê | Uso |
|---|---|---|
| `setup.sh` | Instala tudo numa sessão nova | `bash motion-library/tools/setup.sh` |
| `analyze.py` | Mede referência (metadados, cortes, movimento, áudio, sincronia) e gera folhas | `python3 motion-library/tools/analyze.py <video> REF-0NN --original-name "<nome>"` |
| `analyze.py --qa` | O mesmo para renders próprios (não toca no catálogo) | `python3 motion-library/tools/analyze.py <render.mp4> <id> --qa` |
| `strip.py` | Quadros densos de um trecho (estudar transição) | `python3 motion-library/tools/strip.py <video> 2.4 3.4 0.067 <saida.jpg>` |
| `asr/transcribe.mjs` | Transcrição offline aproximada | `node motion-library/tools/asr/transcribe.mjs <video> --lang portuguese` |

## O que as métricas significam
- **Corte seco:** score de cena do ffmpeg ≥ 0,30. Cortes em frames consecutivos contam como 1 evento (`multi_frame_flash_cuts_s` = flashes). Transições suaves (blur, morph, wipe) **não** aparecem como corte.
- **Energia de movimento:** diferença média entre frames (0–1) em 96 px de largura. `near_static_holds_s` = trechos ≥ 0,5 s com energia < 0,004 (pausas de leitura).
- **Áudio:** LUFS integrado e LRA (ebur128), ataques por fluxo espectral, BPM por autocorrelação (resolução ±3 BPM; confiança < 0,15 = sem pulso claro).
- **Sincronia corte/ataque:** fração dos cortes a ≤ 2 frames de um ataque, comparada com `chance_baseline` (o que se teria por acaso com aquela densidade de ataques). Só é significativo quando é bem maior que o acaso.

Limitações: filmagens de tela (REF-001/002) inflam o movimento; não há separação de fontes (VO × trilha × SFX); o Whisper tiny não é confiável para texto exato.
