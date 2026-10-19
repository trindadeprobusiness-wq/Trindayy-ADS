# R-23 — Destaque de preço/valor com luz

**Linguagens:** Tipografia cinética · Oferta  
**Implementação:** documentada (camada de raios em SVG/CSS + R-01 + R-12)  
**Equivalente no HyperFrames:** rules: `asr-keyword-glow`; buscar "light rays / glow" no `hyperframes-registry` antes de construir do zero

## Objetivo
Fazer o número da oferta ser o momento de maior brilho visual da peça.

## Elementos necessários
Valor em fonte grande e tabular, fundo escuro, camada de raios/brilho na cor de destaque.

## Sequência de movimentos
1. Cena escurece (ou já é escura).
2. Rótulo pequeno ('a partir de') antes.
3. Valor entra (escala + blur) com raios de luz radiais atrás e partículas leves.
4. Hold ≥ 1 s antes do flash de saída.

## Parâmetros ajustáveis
| Parâmetro | Observado nas referências | Valor sugerido (ponto de partida) |
|---|---|---|
| Duração do destaque | ≈0,5 s até o flash (REF-008 4,8–5,27 s) | 1,0–1,5 s (mais tempo de leitura) |
| Cor | verde sobre preto | cor de destaque da marca |

> "Observado" vem de amostragem de frames (0,067–0,13 s) e métricas automáticas. Durações têm erro de ±1 frame da amostra; curvas de easing são **estimadas a olho**, não medidas.

## Referências de origem
REF-008 3,9–5,27 s

## Cuidados
Um único momento de excesso visual por peça. O preço precisa ser real e conferido com o cliente.
