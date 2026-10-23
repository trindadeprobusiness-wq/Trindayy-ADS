# Padrões de qualidade

Três níveis distintos — nunca confunda:
1. **Validação técnica verificável** (scripts): passa/falha.
2. **Avaliação artística** com a rubrica abaixo, citando evidência observável (frame, tempo, medida).
3. **Feedback humano subjetivo** do cliente — o único que confirma "excelência". Aprovação automática ≠ garantia artística.

## Reprovação automática (qualquer item bloqueia a entrega)
| Item | Como verificar |
|---|---|
| Texto cortado / fora da área segura | Stills com `--safe` + Read |
| Fonte não carregada | `ensureFonts()` cancela o render; confira frames |
| Frames vazios/pretos não planejados | `validate-render.py` (blackdetect) |
| Piscadas de 1 frame (blocos pretos, camada que some) | `repair-glitches.py` (roda sozinho no `render.mjs`); confira os frames que sobrarem |
| Falha de renderização / resolução / fps / duração errados | `validate-render.py --expect --duration` |
| Áudio com clipping (true peak > −1 dBTP) | `validate-render.py` |
| Sincronização claramente incorreta | word-map vs. frames da palavra |
| Componentes sobrepostos indevidamente | Stills + Read |
| Assets ausentes / caminhos absolutos | `validate-assets.py` |
| Transição quebrada (gap/overlap não planejado) | `validate-assets.py` |
| Afirmação comercial inventada | Revisão do texto contra o brief |

## Rubrica (0–100). Meta premium ≥ 90
| Critério | Pts | 100% significa |
|---|---|---|
| Direção criativa | 20 | Ideia-mestra clara e original; cada cena serve a ela |
| Clareza narrativa | 15 | Mensagem entendida sem som e sem contexto |
| Composição e tipografia | 15 | Hierarquia única por tela, grid, espaço negativo, legibilidade |
| Qualidade do movimento | 15 | Curvas adequadas, nada linear indevido, secundário discreto, continuidade |
| Ritmo e sincronização | 10 | Contraste rápido/lento; eventos no frame certo da voz/batida |
| Sound design | 10 | Cada som com intenção, densidade sob controle, mix limpo, −14 LUFS |
| Consistência visual | 5 | Um sistema (tokens) do início ao fim |
| Acabamento técnico | 10 | Validação técnica limpa, grain/vinheta/sombras sutis, sem artefatos |

Escreva a nota assim: `Movimento 13/15 — evidência: convergência com stagger e espiral (f 258–296); desconto: anel do portal cruza o card por ~1 s (f 320–350).`
Nunca dê nota alta sem evidência; desconte o que não pôde ser observado (ex.: sync com voz real quando só há fixture).

## Checklist de revisão crítica (fase 8)
Legibilidade · animações desnecessárias · inconsistência visual · ritmo · sincronização · contraste · cortes desconfortáveis · alinhamento · som · falhas técnicas.
