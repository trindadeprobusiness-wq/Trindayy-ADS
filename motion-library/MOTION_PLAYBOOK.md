# Motion Playbook — v1

Sistema de criação extraído do acervo (`INDEX.md`). Versão 1 com 8 referências analisadas (REF-001 a REF-008). Cada afirmação aponta para a referência de origem. Onde houver um número, ele vem de medição automática (`analysis/REF-xxx/metrics.json`) ou de amostragem de frames. Curvas de easing e intenções são **estimativas**, marcadas como tal.

Nenhuma referência tem dado de campanha. Nada aqui está "validado em performance": são padrões de **acabamento e linguagem**, não de resultado.

---

## 1. Princípios que atravessam o acervo

1. **Uma ideia por tela.** Em todas as peças cada tela carrega 1–5 palavras ou 1 componente de UI (REF-003, 005, 006, 008 de forma mais pura).
2. **A transição nasce do conteúdo.** As melhores trocas usam um elemento da cena atual como ponte: bolha → círculo → logo → barra de busca (REF-005), pill → card (REF-004), botão → tela (REF-001), palavra → zoom-through (REF-003).
3. **Movimento contínuo e lento no premium; holds de leitura no informativo.** Fração do tempo quase parada (medida): REF-003 7%, REF-007 13%, REF-006 17% contra REF-005 85% e REF-002 64% (as duas últimas com muito texto/UI para ler). *REF-001/002 são filmagens de tela; o tremor da câmera distorce essa métrica.*
4. **Cor é informação.** Paletas de 1 neutro + 1 cor de destaque. A cor marca a palavra-chave ou o dado (REF-002 vermelho, REF-003 verde, REF-007 verde-limão/vermelho só nos dados).
5. **Texto espelha a locução.** Nas 5 peças com VO (REF-001, 002, 004, 006, 008) a palavra-chave aparece quando é falada: o vídeo funciona sem som e com som.
6. **Cortes seguem a fala ou a batida, nunca o acaso.** Peças de UI com trilha cortam no ataque (REF-005: 100% dos cortes a ≤ 2 frames de um ataque; REF-006: 80%). Peças guiadas por VO cortam na frase (REF-002: 33%, REF-004: 0%, abaixo do acaso).
7. **Um momento de excesso por peça.** O brilho forte, o flash e o preço com raios de luz aparecem uma vez, no clímax (REF-008 4,8 s; REF-006 8,2 s).
8. **Feche com logo + hold.** Todas terminam com logo/assinatura em hold de 1,5–4 s.

---

## 2. Linguagens identificadas

### 2.1 Minimalismo premium ("Apple Style")
**Base:** REF-003 (principal), REF-007, REF-005; REF-008 como leitura simplificada.

**Quando usar:** produto com interface ou objeto bonito; marca que quer parecer cara, precisa e confiável; mensagem com poucos benefícios (3–4) e prova visual de cada um.

**Composição e texto**
- Texto curto e centrado, com muito espaço negativo. Em 9:16 a REF-003 (16:9) ficaria pequena demais: **usar título ≥ 90 px a 1080 px de largura** (`--t-h1`).
- Peso médio/semibold, tracking levemente negativo, ênfase por **cor numa palavra**, não por tamanho.
- Fundo vivo e discreto: gradiente em movimento lento (REF-003) ou neutro com vinheta (REF-007).
- Prova por UI: frase → componente real → próxima frase.

**Movimento e transições:** blur-in e blur-out (R-01, R-02), câmera em plano-sequência com profundidade (R-08, R-22), entrada 3D inclinada de cards (REF-003 8,3 s), zoom-through numa palavra (R-16), revelação circular (R-07), rack focus (R-11). Easing sem overshoot nas entradas: chega rápido, assenta longo (`expo.out`/`power4.out`, estimado).

**Som:** trilha com pulso claro e SFX de UI discretos. Cortes e pops no ataque (REF-005). Locução, se houver, calma.

**Excessos que prejudicam:** muitos tipos de transição (REF-008 usa ~8 tipos em 28 s); texto fino e cinza-claro sobre branco (perde contraste, REF-006/008); overshoot e bounce nas entradas; partículas e brilhos em toda cena.

**Como interpretar o pedido "Apple Style" neste projeto:** clareza, tipografia bem resolvida, foco no produto, espaço negativo, movimentos precisos e apresentação sofisticada, **com a identidade da marca do cliente** (cores, fonte, tom), nunca imitando a Apple (sem logo, sem SF Pro, sem frases ou trilhas dela).

### 2.2 Tipografia cinética guiada por locução
**Base:** REF-006 (principal), REF-008, REF-002, REF-004, REF-001.

**Quando usar:** oferta de serviço, argumento de venda, explicação com locução; quando não há produto visual forte.

**Composição e texto**
- 1–3 palavras por tela; a palavra-chave tem tratamento (cor, pill, eco, sublinhado desenhado).
- Mistura de tamanhos na mesma frase para hierarquia ("Sua **empresa** até vende", REF-002).
- Alternância claro↔escuro como pontuação do argumento (REF-002, 006, 008).

**Movimento e transições:** blur-in por palavra no tempo da fala (R-01), pilha de eco na palavra mais importante (R-09), linha que se desenha (R-21), flash de 2 frames nas viradas (R-12), escurecer antes de revelar (R-20), lista que cresce (R-17).

**Sincronização:** obter os tempos das palavras (ASR) e ancorar cada entrada no início da palavra. A sílaba tônica pode puxar o pico em ±2 frames. Flashes e cortes no ataque da trilha.

**Excessos:** texto rápido demais para ler (cada tela precisa de pelo menos ~0,25 s por palavra exibida, sugestão); usar eco e flash em toda frase; roteiro genérico (REF-006 e REF-008 têm o mesmo roteiro, um template de mercado).

### 2.3 Demonstração de produto / animação de interface
**Base:** REF-001, REF-005, REF-007, REF-003.

**Quando usar:** app, SaaS, e-commerce; mostrar "como funciona" em passos.

**Composição:** um componente por vez, grande; cursor ou toque guiando (R-13); telas reais do cliente.

**Movimento:** morph de componente em componente (R-04), revelação circular a partir do toque (R-07), contadores e barras para provar dados (R-06), chat para contexto de uso (R-19), estações de câmera (R-22).

**Som:** SFX de UI (toque, envio, sucesso) alinhados aos eventos; trilha com pulso.

**Excessos:** UI pequena (REF-005/007 ficam ilegíveis em 9:16); UI inventada que o produto não tem; demonstração sem benefício dito.

### 2.4 Institucional de autoridade (argumento + prova)
**Base:** REF-002 (uma referência; padrão ainda a confirmar com mais material).

**Quando usar:** agência/consultoria/B2B; vender posicionamento e resultados.

**Estrutura observada:** provocação → contraste com concorrentes → diagnóstico → prova numérica → público → serviços → tese → logo/CTA.

**Movimento:** ticker de ano/número (R-05), hub com órbita (R-14), faixas inclinadas com palavras (REF-002 13,6 s), alternância escuro/claro.

**Excessos:** 45 s de texto contínuo; três tamanhos tipográficos competindo na mesma tela; números sem fonte.

### 2.5 Edição de ritmo com humor
**Base:** REF-004 (uma referência).

**Quando usar:** marca pessoal, conteúdo orgânico, público jovem.

**Movimento:** morph em cadeia, zoom-through (R-16), whip (R-18), lista por acúmulo (R-17), virada cômica com hold.

**Excessos:** meme dependente de contexto; imagem de pessoa sem autorização (risco legal).

---

## 3. Tempos de referência (pontos de partida, não regras)

| Evento | Observado | Sugerido |
|---|---|---|
| Palavra ficar nítida (blur-in) | 0,3–0,5 s | 0,6 s `expo.out` |
| Saída por blur | 0,2–0,4 s | 0,35 s `power3.in` |
| Morph de forma | 0,1–0,4 s | 0,4–0,55 s `expo.inOut` |
| Revelação circular | ≈0,5 s | 0,45–0,6 s `power3.in` |
| Montagem de grid | ≈0,7 s total | ≤ 0,6 s de escalonamento |
| Perna de câmera | 0,6–1,5 s | 0,9–1,2 s `power2.inOut` |
| Flash de corte | 2 frames | 2 frames a 30 fps |
| Hold do logo final | 1,5–4 s | 1,5–2,5 s |
| Duração das peças | 16–46 s | 15–25 s para Reels/TikTok [hipótese, sem dado de campanha] |

Valores observados vêm de amostragem a 0,067–0,13 s. O erro é de ±1 amostra.

---

## 4. Fluxo de produção para um novo vídeo

1. **Briefing** (`projects/BRIEF_TEMPLATE.md`): objetivo, público, mensagem, CTA, plataforma/formato, duração, marca (cores, fonte, logo), materiais disponíveis, locução/trilha. Perguntar só o que impede a execução.
2. **Selecionar referências:** abrir `INDEX.md`, filtrar por linguagem e formato, escolher 1 principal + 1–2 de apoio e registrar no projeto o porquê.
3. **Roteiro visual** (`projects/<slug>/STORYBOARD.md`): cenas com tempo, texto exato, receita (R-xx), áudio/VO por cena.
4. **Design:** tokens da marca sobre `engine/lib/tokens.css`. Fontes com licença, arquivos locais com `@font-face`.
5. **Implementar:** copiar `engine/` para `projects/<slug>/` (sem `node_modules`), uma sub-composição por cena, receitas de `lib/recipes.js`.
6. **Trecho representativo:** renderizar 3–5 s da cena mais difícil (`npx hyperframes render` ou `snapshot`) e aprovar a direção visual antes do resto.
7. **Render completo** + revisão com `tools/strip.py` e `tools/analyze.py` no próprio render (cortes, holds, sincronia).
8. **Corrigir e re-renderizar** até passar no checklist da seção 5.

---

## 5. Checklist de qualidade (no vídeo renderizado, não só no código)

- [ ] `npx hyperframes check` sem erros; avisos revisados.
- [ ] 1º frame com conteúdo (miniatura/gancho), sem tela vazia.
- [ ] Cada texto fica na tela ≥ tempo de leitura (sugestão: 0,25 s por palavra + 0,5 s, mínimo 1 s).
- [ ] Texto ≥ 30 px (rótulos) e ≥ 64 px (mensagens) em 1080×1920; contraste WCAG AA (o `check` mede).
- [ ] Elementos essenciais dentro da área segura 9:16 (topo 220 px, base 380 px, laterais 64 px).
- [ ] Sem tremor nem salto: verificar transições com `tools/strip.py` a passo de 1 frame.
- [ ] Sem frames vazios ou pretos acidentais (`analyze.py` → cortes inesperados).
- [ ] Áudio: VO inteligível, trilha abaixo da VO, cortes e pops no ataque (`hyperframes audio`). Loudness de entrega por volta de −14 LUFS [convenção comum de plataformas; conferir a exigida].
- [ ] Exportação: resolução, fps, duração e codec conferidos com `ffprobe`.
- [ ] Nenhum ativo de terceiro sem licença (marca, foto, música, fonte).
- [ ] No máximo 1 momento de excesso visual; ≤ 4 flashes; nenhum flash repetido > 3/s.

---

## 6. O que significa "melhor que a referência"

Maior clareza, legibilidade, coerência visual, precisão de movimento e qualidade de execução. Na prática, em relação ao acervo:
- texto maior e com mais contraste que REF-003/005/006/007/008 em 9:16;
- menos tipos de transição por peça que REF-008;
- roteiro específico do cliente (não o template de REF-006/008);
- dados reais e legíveis nos componentes (REF-007 mostra dados ilegíveis);
- CTA visual explícito (falta em REF-002).

Adicionar efeitos não é melhorar.

---

## 7. Ferramentas disponíveis (verificado em 19/10/2026)

- **HyperFrames 0.8.175** (HTML + GSAP 3.14.2 → MP4) em `engine/`: render local funcionando (laboratório de 10 s renderizado em ~19 s, 1080×1920, 30 fps).
- Skills do HyperFrames (`hyperframes-core`, `-animation`, `-keyframes`, etc.) instaladas pela CLI (`npx hyperframes skills update`). Ficam em `~/.claude/skills`, fora do repositório: reinstale em sessões novas.
- `tools/analyze.py` e `tools/strip.py` (ffmpeg + numpy/scipy) para medir referências e renders.
- `tools/asr/transcribe.mjs`: Whisper tiny offline (pacote npm `sts-whisper-tiny`), suficiente para localizar fala, fraco para transcrever palavras.
- Limitação de rede nesta sessão: só npm e PyPI liberados. A CDN jsDelivr está bloqueada (o GSAP é servido localmente em `engine/vendor/`) e o Hugging Face também.
