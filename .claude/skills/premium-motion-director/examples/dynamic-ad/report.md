# Teste B — Dynamic ad (Gabriel Trindade · automação com IA)

**Brief**: anúncio 9:16, 18 s, roteiro com narração. Marca real (site do repositório: verde #00C896). Nenhuma promessa numérica.
**Roteiro**: "Enquanto você perde tempo com processos manuais, outras empresas já estão automatizando tudo. Planilhas. E-mails. Relatórios. Tudo no automático. Pare de operar. Comece a escalar. Automação com IA. Gabriel Trindade."
**Timing**: `word-map.json` gerado por `alignment-to-timeline.py` a partir de `tests/fixtures/elevenlabs-alignment.json` — **fixture sintética, sem áudio de voz**. O vídeo tem música + SFX + legendas; a voz entra quando houver o arquivo real (`timeline.audio.narration`), com ducking automático.

| Cena | Frames | Intenção | Técnica |
|---|---|---|---|
| hook | 0–96 | Dor: tempo perdido em repetição | P05 palavras na voz + P06 loop |
| split | 96–186 | Contraste você × eles | P07 tela dividida |
| triad | 186–266 | 3 tarefas no frame exato de cada palavra | P08 |
| flow | 266–320 | Tarefas viram sistema | P09 |
| pivot | 320–406 | "Pare de operar. Comece a escalar." | P10 |
| cta | 406–540 | Assinatura + ação única, hold 2,6 s após a fala | P14 |

## Revisão crítica (com máscara de área segura)
1. "Tudo no automático." estourava a largura e a área segura → quebra em 2 linhas com `maxWidth`.
2. Nós do fluxo pequenos demais para 9:16 → `FlowNode scale` 1,45 e reposicionamento fora da faixa de UI à direita.
3. Gráfico de barras colidia com "escalar" → gráfico abaixo da palavra.
4. CTA de 1 linha tocava a borda; botão pequeno → "Automação / com IA" em 2 linhas, botão 40 px.
5. Legendas duplicavam a tipografia grande → legendas só nas cenas 1–2 (P16).

## Validação técnica
1080×1920 @30, 18,000 s, sem pretos/congelamentos, −14,0 LUFS, pico −1,4 dBTP → **PASS**. 10 cues de SFX em 18 s (5,6/10 s).

## Rubrica — 86/100
| Critério | Nota | Evidência |
|---|---|---|
| Direção criativa | 17/20 | Cada frase tem metáfora própria; estrutura de ad clássica |
| Clareza narrativa | 14/15 | Entendível sem som (legendas + palavras-chave) |
| Composição/tipografia | 13/15 | Corrigida; cena split ainda carregada sob a legenda |
| Movimento | 13/15 | Springs snappy, sync por palavra; transição push poderia ser match cut |
| Ritmo/sync | 8/10 | Sync exato **contra a fixture**; não verificado com voz real |
| Sound design | 7/10 | Sem narração; pulse sintético |
| Consistência | 5/5 | Tema B |
| Acabamento | 9/10 | Validação limpa |

**Para passar de 90**: narração real da ElevenLabs (o pipeline já aceita), trilha licenciada, simplificar a metade "ELES" da cena split.
