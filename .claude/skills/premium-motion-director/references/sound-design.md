# Sound design

## Princípios
- Som é metade da percepção de qualidade. Cada cue tem intenção registrada (`why` no timeline).
- **Não** sonorize todo movimento. Densidade alvo ≤ 6 cues por 10 s (ads dinâmicos toleram um pouco mais; o validador avisa).
- Hierarquia de mix: voz > SFX de momento-chave > música > SFX de textura.
- Silêncio é recurso: corte a música 4–8 frames antes de uma revelação e volte com o impacto.

## Paleta procedural (original, sem licença de terceiros)
`python3 scripts/synth-sfx.py <public>/sfx` gera (48 kHz, determinístico):

| Arquivo | Uso | Volume típico |
|---|---|---|
| `whoosh_soft` | Entrada/saída de cena grande, transformação | 0,35–0,5 |
| `whoosh_fast` | Push/troca rápida em ads | 0,4–0,55 |
| `impact_low` | Clímax, palavra-chave principal | 0,6–0,8 |
| `impact_soft` | Revelação de produto/logo premium | 0,5–0,7 |
| `click_ui` | Clique real de cursor | 0,5–0,7 |
| `tick` | Micro-evento (item, relógio) | 0,25–0,5 |
| `pop_soft` | Card/ícone entrando, toast | 0,45–0,6 |
| `riser_2s` | Tensão que culmina num impacto (comece 60 frames antes) | 0,3–0,45 |
| `shimmer` | Luz, mágica, assinatura | 0,3–0,5 |
| `swell_reverse` | Sucção antes de um impacto (comece ~33 frames antes) | 0,4–0,5 |
| `bed_minimal` | Música calma (pad) | 0,35–0,45 |
| `bed_pulse` | Música 110 bpm para ads | 0,4–0,55 |

Se o cliente fornecer música/SFX licenciados, prefira-os e registre a licença no brief.

## Sincronia
- SFX no frame do **evento visual** (contato, chegada), não no início do movimento. Whoosh: começa 2–4 frames antes da passagem.
- Impacto: alinhe ao ataque da sílaba tônica da palavra (word-map), não ao fim.
- Música em 110 bpm = 16,36 frames por batida @30 fps; cortes em batida quando não há narração.

## Voz (narração)
- Nunca altere o tempo da narração. A imagem segue a voz.
- `MusicBed duck=[{from,to}]` com as frases do word-map: música cai para ~35% durante a fala (rampa 8 frames).
- Alvo de loudness: −14 LUFS integrado (social) ou −16 (web), true peak ≤ −1 dBTP. `validate-render.py` mede; clipping > −1 dBTP reprova.
