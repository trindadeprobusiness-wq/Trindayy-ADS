# Biblioteca de padrões reutilizáveis

Formato de cada padrão: objetivo · funciona em · prejudica em · estrutura · curvas · composição · som · complexidade (1–3) · variações · implementação.
Novos padrões entram aqui a partir de `reference-log/` (ver `reference-analysis.md`). Princípios, nunca cópia.

---

### P01 Luz-semente (Light seed)
- **Objetivo**: gancho por contenção; criar curiosidade com quase nada.
- **Funciona**: produto premium, marca, abertura de keynote. **Prejudica**: performance ad com 1 s para prender.
- **Estrutura**: escuro total → ponto de luz nasce (spring heavy) e respira (±6%) → vira o próximo elemento.
- **Curvas**: spring `heavy`; respiração seno lento. **Composição**: centro exato, vinheta.
- **Som**: `shimmer` no nascimento. **Complexidade**: 1. **Variações**: linha que se desenha, gota, pixel.
- **Implementação**: `LightPoint` + elemento persistente (exemplo `premium-product`).

### P02 Ruído → ordem (Chaos to grid)
- **Objetivo**: visualizar "clareza", "organização", "sistema".
- **Funciona**: produtividade, dados, IA, consultoria. **Prejudica**: quando o produto é emocional/lúdico.
- **Estrutura**: partículas em caos com drift → grid no momento da palavra-virada → convergem com stagger + espiral para um ponto.
- **Curvas**: `inOut` 40–50 frames; convergência com stagger 0,5. **Composição**: atrás do texto com opacidade ≤ 0,5 enquanto há leitura.
- **Som**: silêncio no caos, `swell_reverse` → `impact_soft` na convergência. **Complexidade**: 2.
- **Implementação**: `ParticleField toGrid toPoint convergeStagger swirl`.

### P03 Portal (anel que vira passagem)
- **Objetivo**: revelar produto "de dentro" da ideia anterior.
- **Estrutura**: anel desenha (34 f) → expande ×2,6 e dissolve antes do próximo conteúdo de texto.
- **Prejudica**: se o anel permanecer atrás de texto (sobreposição indevida — erro encontrado e corrigido no teste A).
- **Implementação**: `Ring draw` + scale/opacity; cena seguinte com `zoomThrough`. **Complexidade**: 1.

### P04 Mask reveal de headline
- **Objetivo**: afirmação premium e legível. **Funciona**: quase sempre em headline curta. **Prejudica**: texto longo.
- **Curvas**: spring do tema; stagger 4–7 (A) / 2–3 (B). **Som**: nenhum ou o da cena.
- **Implementação**: `WordReveal mode="mask"`. **Complexidade**: 1.

### P05 Palavra na voz (narration-locked words)
- **Objetivo**: imagem e voz como um só gesto.
- **Estrutura**: `wordStarts` vindos do word-map; a palavra-conceito entra 0–2 frames antes da sílaba.
- **Prejudica**: alinhamento só por frase (aí anime a frase inteira).
- **Implementação**: `alignment-to-timeline.py` + `WordReveal wordStarts`. **Complexidade**: 2.

### P06 Repetição que não chega (Loop of futility)
- **Objetivo**: dor de trabalho manual/repetitivo.
- **Estrutura**: barra que enche até ~80% e reseta a cada ~26 f + contador de repetições.
- **Som**: um `tick` (não um por loop). **Complexidade**: 1. **Variações**: cursor copiando/colando, carimbo, relógio.

### P07 Contraste em tela dividida
- **Objetivo**: comparar dois mundos (você vs. eles, antes vs. depois).
- **Estrutura**: metades com velocidades opostas (1 elemento lento vs. fluxo rápido organizado); palavra-chave na divisória sobre pílula opaca.
- **Prejudica**: 16:9 com textos longos nas duas metades. **Som**: `whoosh_fast` na entrada. **Complexidade**: 2.

### P08 Tríade sincronizada
- **Objetivo**: concretizar uma lista falada (3 itens). **Estrutura**: cada card entra no frame da palavra, check 10 f depois.
- **Som**: `pop_soft` por item. **Prejudica**: > 4 itens (agrupe). **Complexidade**: 1.

### P09 Soltos → sistema (Nodes to flow)
- **Objetivo**: "tudo conectado/automático". **Estrutura**: nós entram com stagger → arestas desenham → pulsos percorrem.
- **Implementação**: `FlowNode`, `FlowEdge pulseAt`. **Som**: `whoosh_soft` na transformação; ticks nos nós (≤ 3). **Complexidade**: 2.

### P10 Negação → afirmação tipográfica
- **Objetivo**: virada de mentalidade ("Pare de X. Comece Y.").
- **Estrutura**: risco desenha em X no fim da palavra; frase sobe e esmaece; Y cresce em acento com barras subindo **abaixo** (nunca atrás das letras).
- **Som**: `riser_2s` terminando em `impact_low` no ataque de Y. **Complexidade**: 2.

### P11 Plano contínuo de UI (One-take product demo)
- **Objetivo**: demo de SaaS sem perder contexto. **Funciona**: SaaS, apps, dashboards. **Prejudica**: features sem relação espacial.
- **Estrutura**: janela entra com rotateX 20°→0 → push-in no botão (1,3×) → clique → câmera viaja ao painel → ação → pull-out mostrando o **efeito** (KPI muda, linha nova, toast).
- **Curvas**: câmera `inOut` 35–50 f; cursor `inOut` 14–24 f + pausa de ~6 f antes do clique.
- **Som**: `click_ui` só em cliques reais; `pop_soft` no toast. **Complexidade**: 3.
- **Implementação**: `Camera`, `Cursor clicks`, `AppWindow`, `Toast`, `CountUp` (exemplo `saas-showcase`).

### P12 Causa → efeito visível
- **Objetivo**: provar o benefício mostrando a consequência da ação, não descrevendo-a.
- **Estrutura**: após a ação, os números/linhas afetados recebem um glow breve (≤ 1 s) e mudam de valor.
- **Regra**: em produto real, só valores reais. **Complexidade**: 1.

### P13 Lockup com tracking
- **Objetivo**: assinatura elegante. **Estrutura**: símbolo entra (scale 0,8→1) + nome com tracking 0,4em→−0,03em + tagline em serif itálico com blur resolve.
- **Som**: `shimmer` baixo. **Hold**: ≥ 1,5 s. **Complexidade**: 1.

### P14 CTA com pressão
- **Objetivo**: ação única clara. **Estrutura**: headline → sub → botão (spring snappy) → press (scale 0,95) ~2,5 s depois.
- **Som**: `click_ui` no press. **Prejudica**: dois CTAs. **Complexidade**: 1.

### P15 Grid que se desenha
- **Objetivo**: base "engenheirada" para tech/SaaS, abertura de título. **Prejudica**: estilo A (vira ruído).
- **Implementação**: `GridLines` com máscara radial. **Complexidade**: 1.

### P16 Legenda karaokê seletiva
- **Objetivo**: consumo sem som em 9:16 sem duplicar texto. **Regra**: mostre legenda só onde a tipografia grande não repete a fala.
- **Implementação**: `Captions phrases={filtradas}`. **Complexidade**: 1.
