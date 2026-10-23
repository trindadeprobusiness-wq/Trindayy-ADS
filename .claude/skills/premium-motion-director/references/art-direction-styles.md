# Sistema de direção de arte (estilos A–F)

Cada estilo existe como `Theme` em `<studio>/src/lib/theme.tsx` (fonte canônica: `engine/src/lib/theme.tsx`) (cores, fontes, `motion.intensity`, spring, stagger, grain). Combine com critério: ex. "A + C" = produto SaaS minimalista (tokens de A, componentes de UI de C). **Nunca aplique um preset inteiro sem checar adequação à marca e ao canal.**

| | A Apple-inspired | B High-retention | C SaaS cinematic | D Editorial | E Conceptual | F Performance ad |
|---|---|---|---|---|---|---|
| Theme | `applePremium` | `highRetention` | `saasCinematic` | `editorial` | `conceptual` | `performanceAd` |
| Intensidade | 0,45 | 1,0 | 0,7 | 0,6 | 0,75 | 0,85 |
| Spring | calm | snappy | precise | precise | heavy | snappy |
| Cenas/15 s | 3–5 | 6–9 | 3–5 (plano contínuo) | 4–6 | 3–5 | 5–7 |
| Transições | blur, fade, elemento persistente | cut, push, iris | câmera contínua, blur | wipe, cut, máscara | morph, match cut | cut, push |
| Tipografia | 1 família, peso 600, muito espaço | display 700–800, destaque cromático | UI real + títulos 600 | serif + grotesca, contraste de escala | mínima, a imagem fala | legível a 1 m do celular |
| Cor | monocromática + 1 acento | alto contraste + acento + alerta | neutros + acento de marca | papel, tinta, 1 cor viva | paleta da metáfora | marca + CTA destacado |
| Som | pad, shimmer, 1 impacto | pulse 110 bpm, pops, riser/impact | pad leve, clicks reais | texturas, silêncio | design sonoro da metáfora | pulse + CTA claro |
| Risco | ficar "vazio" sem ideia forte | virar ruído | virar tour de botões | ilegibilidade | metáfora obscura | parecer genérico |

## Design system por peça (defina no brief)
- **Grid**: 16:9 — 12 colunas, margem 96 px (5%); 9:16 — margem lateral 64–80 px, zonas de UI das redes livres (topo 12%, base 20%, faixa direita 14% entre 40–80% da altura).
- **Escala tipográfica** (16:9): 168 / 96 / 52 / 30 / 18. (9:16): 260 / 150 / 110 / 46 / 26.
- **Espaçamento**: múltiplos de 8.
- **Paleta**: `bg`, `bg2`, `surface`, `line`, `fg`, `muted`, `accent`, `accent2`, `danger`. Um acento domina; o segundo só para dados.
- **Profundidade**: sombra longa e suave (0 40px 120px −20px), nunca sombras duras múltiplas. Grain 3–6% para tirar o "digital flat".
- **Formatos**: 16:9 1920×1080 (YouTube, site, apresentação); 9:16 1080×1920 (Reels/TikTok/Shorts); 1:1 1080×1080 e 4:5 1080×1350 (feed). Crie uma `Composition` por formato; recomponha, não apenas recorte.

## Identidade do cliente
Se houver marca (cores, fonte, logo), crie um `Theme` novo derivado do estilo escolhido e substitua tokens — não espalhe hex pelo código. Fonte da marca: instale via @fontsource se for OFL; caso contrário peça o arquivo e confirme a licença.
