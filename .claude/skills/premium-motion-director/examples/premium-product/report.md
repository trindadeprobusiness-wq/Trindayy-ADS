# Teste A — Premium product ("Lumen", produto fictício)

**Brief**: apresentar um app de notas com IA (fictício) em linguagem minimalista Apple-inspired. 16:9, 15 s, sem narração. Premissa: sem dados reais → nenhum número de desempenho.
**Ideia-mestra**: luz → ruído → ordem → clareza → produto. Um único elemento (a luz) atravessa a peça.

| Cena | Frames | Intenção | Técnica (padrão) |
|---|---|---|---|
| birth | 0–96 | Gancho por contenção | P01 Luz-semente |
| noise | 84–186 | Problema: "Menos ruído." | P04 Mask reveal + P02 (caos) |
| clarity | 174–270 | Virada: "Mais clareza." — partículas viram grid quando a palavra assenta | P02 |
| converge | 258–312 | Tensão: grid converge para um ponto | P02 + swell → impact |
| product | 300–396 | Produto nasce do anel; 3 benefícios em 1 palavra | P03 Portal |
| lockup | 382–450 | "Lumen — Pense com clareza." hold 2,2 s | P13 |

## Revisão crítica (problemas encontrados e corrigidos)
1. Anel do portal ficava atrás das palavras "Captura/Conecta" (sobreposição indevida) → anel expande ×2,6 e some até o f 352, antes das palavras.
2. Convergência do grid parecia um "quadradinho cinza" (bloco encolhendo) → stagger por partícula + leve espiral + partículas encolhem; resultado: ponto de luz limpo.
3. Loudness −24,9 LUFS (baixo demais) → etapa de masterização adicionada ao pipeline (−14,1 LUFS, pico −1,5 dBTP).

## Validação técnica (validate-render.py)
1920×1080 @30, 15,000 s, sem segmentos pretos, −14,1 LUFS, true peak −1,5 dBTP → **PASS**. Observação: hold de 2,5 s no início (ponto de luz quase parado) — intencional.

## Rubrica — 88/100
| Critério | Nota | Evidência |
|---|---|---|
| Direção criativa | 18/20 | Metáfora contínua e original; benefícios ainda genéricos |
| Clareza narrativa | 13/15 | Entende-se "app de notas com resumo"; 2,5 s iniciais lentos para social |
| Composição/tipografia | 14/15 | Espaço negativo, 1 hierarquia por tela, card legível |
| Movimento | 13/15 | Springs calm, convergência elegante; anel cruza o card por ~1 s (f 320–350) |
| Ritmo/sync | 8/10 | Sem narração; ritmo bom para web, lento para Reels |
| Sound design | 8/10 | 8 cues com intenção; timbres sintéticos (procedurais) |
| Consistência | 5/5 | Tokens do tema A do início ao fim |
| Acabamento | 9/10 | Grain/vinheta sutis, validação limpa |

**Para passar de 90**: música/SFX licenciados de qualidade de estúdio; tela real do produto do cliente; corte de 1 s no gancho para versão social.
