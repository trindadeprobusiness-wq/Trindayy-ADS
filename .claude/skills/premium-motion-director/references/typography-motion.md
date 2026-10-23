# Tipografia cinética

## Regras
1. **A animação não pode comprometer a leitura.** A frase fica 100% legível assim que a última palavra assenta; nada de wobble contínuo.
2. Uma hierarquia por tela: título (100–260 px em 1080p / 9:16), apoio (40–56 px), legenda (40–48 px em 9:16, 32–40 px em 16:9).
3. Tracking: display grande `-0.03em` a `-0.05em`; texto de apoio `0` a `-0.01em`; caixa-alta pequena `+0.12em` a `+0.2em`.
4. Destaque semântico: só a palavra que carrega o conceito (cor de acento, sweep de marcador ou peso). Máx. 1 por frase.
5. Não aplique a mesma animação a todas as palavras de todas as cenas — varie pela intenção.
6. Contraste mínimo WCAG AA (4,5:1) para texto de apoio; legendas sempre sobre fundo/caixa semi-opaca.

## Técnicas e quando usar (componentes em `src/lib/typography.tsx`)

| Técnica | Componente | Quando | Evite quando |
|---|---|---|---|
| Mask reveal (sobe de trás de uma linha) | `WordReveal mode="mask"` | Headline premium/editorial | Corpo de texto longo |
| Rise + fade | `WordReveal mode="rise"` | Listas, apoio | — |
| Blur resolve | `WordReveal mode="blur"` | Taglines, momentos contemplativos | Ritmo rápido (blur parece erro) |
| Fade puro | `WordReveal mode="fade"` | Estilo A, informação secundária | Quando precisa de energia |
| Sync com narração | `WordReveal wordStarts=[…]` | Toda peça com voz | Alinhamento só por frase (use frase inteira) |
| Character stagger | `CharStagger` | Logos, palavras curtas, números | Frases (prejudica leitura) |
| Tracking in | `TrackingIn` | Lockup de marca, assinatura | Texto que precisa ser lido rápido |
| Contagem | `CountUp` | KPIs (sempre `tabular-nums`) | Número não verificado de produto real |
| Negação | `StrikeThrough` | "Pare de X", antes/depois | — |
| Legenda karaokê | `Captions` | 9:16 com áudio (consumo mudo) | Quando a tipografia grande já diz a mesma frase |
| Destaque marcador | `highlight` + `highlightSweep` | Palavra-conceito | Mais de uma por frase |

## Composição
- Centralizado para afirmações; alinhado à esquerda para listas/editorial.
- Quebras de linha por sentido ("Automação / com IA"), nunca por acaso do layout. Use `\n` + `whiteSpace: pre-line` ou `maxWidth`.
- Espaço negativo é parte do design: em 16:9 premium, o texto raramente passa de 60% da largura.

## Fontes
Inter (texto/UI/display), Instrument Serif (acento editorial/itálico), JetBrains Mono (dados, labels técnicos). Todas OFL via @fontsource, carregadas com `ensureFonts()` que **falha o render** se uma face não carregar (fonte não carregada = reprovação automática).
