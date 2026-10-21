# ESQUELETO UNIVERSAL DE EDIÇÃO — Vídeo vertical em motion design

> Serve para **qualquer pessoa, marca, produto ou tema**.
> Você traz: **a fala** (roteiro ou áudio) e **o tema/marca**. O esqueleto diz como transformar isso em vídeo.
> Funciona em After Effects, Premiere, CapCut, Canva, DaVinci ou para mandar a uma IA (ChatGPT, Claude, Gemini).
>
> Como usar:
> 1. Preencha a **Ficha do projeto** (seção 1).
> 2. Siga as regras das seções 2 a 9.
> 3. Monte o **Plano de cenas** (seção 10).
> 4. Confira o **Checklist** (seção 11).
> Para mandar a uma IA, copie o **Prompt pronto** (seção 12).

---

## 1. Ficha do projeto (preencha)

```
MARCA / CRIADOR: ____________________
TEMA / PRODUTO: ____________________
OBJETIVO DO VÍDEO: [vender / gerar mensagem / ensinar / divulgar / outro]
PÚBLICO: [quem vai assistir, em uma frase]
PLATAFORMA: [Reels / Stories / TikTok / Shorts / Feed]
DURAÇÃO DESEJADA: [15 / 30 / 45 / 60 s]
FALA: [cole o roteiro ou anexe o áudio]
VOZ: [própria / locutor / IA (ElevenLabs etc.)]
CHAMADA FINAL (CTA): [ex.: "Toque em Saiba Mais", "Comenta EU QUERO", "Link na bio"]
DESTINO: [WhatsApp / site / perfil / loja]

IDENTIDADE VISUAL
- Cor principal: #______   - Cor escura (texto): #______
- Cor de fundo: #______    - Cor de destaque positivo: #______ (ex.: verde)
- Cor de alerta/negativo: #______ (ex.: vermelho)
- Fonte de títulos: ______  - Fonte de apoio: ______
- Logo: [arquivo PNG/SVG] · Estilo: [claro premium / escuro tech / colorido / minimalista]

ATIVOS DISPONÍVEIS: [prints reais, fotos do produto, depoimentos, gravações de tela]
RESTRIÇÕES: [o que NÃO pode aparecer; avisos legais obrigatórios]
```

> Sem identidade definida? Use o **padrão neutro**: fundo #F4F7FD, texto #0B162A, destaque #005AFC, positivo #0B8A4C, negativo #FF3B4E, fonte Inter.

---

## 2. Formato

| Item | Valor padrão |
|---|---|
| Proporção | 9:16 vertical (4:5 para feed, se preferir) |
| Resolução | 1080 × 1920 px |
| Quadros por segundo | 30 fps |
| Exportação | MP4 H.264, áudio AAC 192 kbps, sem metadados |
| **Área segura** | **topo 220 px e base 380 px** livres de texto importante (botões e legendas da plataforma) |
| Faixa útil | entre y = 300 e y = 1540 |

## 3. Camadas (de baixo para cima)

| # | Camada | O que é | Regra |
|---|---|---|---|
| 1 | Fundo vivo | cor de fundo + 2–3 manchas de luz da cor principal + textura leve | sempre se movendo devagar; nunca estático |
| 2 | Fundo alternativo (opcional) | versão escura/colorida | para "virar o clima" em momentos de revelação (fade 0,35 s) |
| 3 | Marca fixa | logo pequeno no topo (abaixo da área segura) | visível o vídeo todo |
| 4 | Cenas | uma pré-composição por bloco da fala | cada uma com câmera própria (item 5) |
| 5 | Elementos flutuantes | ícones/logos em cartões | entram com "pop" e flutuam |
| 6 | Flash (opcional) | branco 90% por 2 quadros | só nas viradas fortes |
| 7 | Legenda / aviso legal | texto pequeno | quando exigido (geralmente no fim) |
| 8 | Áudio | voz + trilha + efeitos | item 8 |

## 4. Regras de ritmo (o coração do método)

1. **A voz manda.** Grave/gere a fala primeiro e anote o segundo de cada palavra (qualquer transcrição com tempo serve: CapCut, Premiere, Whisper).
2. Corte a fala em **blocos de 3 a 8 segundos**. **Cada bloco é uma cena.**
3. Cada elemento entra **0,06 a 0,12 s antes** da palavra que ele representa.
4. **O gancho aparece no primeiro quadro.** Nunca abra com tela vazia.
5. **Nenhum vazio maior que 0,3 s** entre cenas.
6. **Uma ideia por cena.** No máximo 2 frases na tela ao mesmo tempo.
7. A tela **sempre mostra o que a voz está dizendo**: número falado = número na tela; "riscou" na fala = risco na tela.

## 5. Animações padrão

| Movimento | Como fazer | Duração | Curva (aceleração) |
|---|---|---|---|
| Entrada de cena | escala 94% → 100% + desfoque 10 → 0 px | 0,45 s | desacelera forte (expo out) |
| Saída de cena | some + desfoque 0 → 16 px + escala 100% → 112% | 0,30 s | acelera (ease in) |
| Câmera viva | a cena inteira aproxima 4,5% e sobe 14 px | duração da cena | suave (ease in-out) |
| Palavra a palavra | cada palavra sobe 26 px, aparece e perde o desfoque | 0,50 s | desacelera forte |
| Pop | escala 60–70% → 100% com leve "quique" | 0,45–0,55 s | back out |
| Número/preço herói | escala 60% → 100% + brilho atrás + raios girando | 0,6 s | back out |
| Riscar | linha vermelha cresce da esquerda; item vai a 45% de opacidade | 0,3 s | ease in-out |
| Contador | número sobe de 0 até o valor | 2–3 s | desacelera |
| Roleta | coluna de números rola até o valor final | 0,8–1,1 s | desacelera |
| Digitação | letra a letra + cursor | 0,03 s/letra | linear |
| Clique | botão encolhe 4% e volta; troca para ✓ | 0,16 s + 0,25 s | — |
| Onda de áudio | barras reagindo ao volume da voz | contínuo | — |

> Regra de ouro: **nada fica 100% parado.** Se não há animação nova, a câmera viva e o fundo continuam se mexendo.

## 6. Biblioteca de cenas (escolha conforme a fala)

| Quando a fala… | Use a cena | Como montar |
|---|---|---|
| faz uma pergunta / provoca | **Gancho em pergunta** | frase grande palavra a palavra + ícones flutuando |
| lista o que NÃO precisa / objeções | **Objeções riscadas** | título + 2–3 chips que entram e são riscados |
| quebra desconfiança ("não é…") | **Lista ✕ → ✓** | linhas com ✕ vermelho que viram ✓ verde |
| compara antes × depois / caro × barato | **Comparação** | valor antigo → risco → valor novo grande com raios + selo |
| faz contas / mostra custo real | **A conta** (fundo escuro) | "Faz a conta:" + valor × quantidade + grade acendendo + contador |
| anuncia oferta / prazo | **Roleta + número** | "12 meses" rolando + produto + preço herói |
| explica como ativar / passo a passo | **Cartão de ativação** | cartão → digitação → botão → "✓ concluído" |
| mostra um app/serviço funcionando | **Demonstração de interface** | janela tipo app: campos, botões, barra de progresso |
| fala de processo / automação | **Fluxo** | blocos conectados por linhas que se desenham |
| fala de tarefas sendo feitas | **Etapas** | lista: pendente → girando → ✓ + barra de progresso |
| mostra variedade / catálogo | **Mosaico** | cartões de categorias entrando em sequência |
| conta uma rotina repetitiva | **Rotina** | "Dia 1 → Dia 2 → Dia 3" com as mesmas tarefas se repetindo |
| apresenta o nome da marca/produto | **Revelação** | frase + logo grande com raios atrás |
| traz prova / depoimento | **Prova real** | print ou gravação real (sem recriar), dados pessoais borrados |
| encerra | **CTA final** | logo + frase final + botão + seta ↓ + aviso legal |

## 7. Estrutura da história

| Bloco | % do vídeo | Objetivo | Cenas mais usadas |
|---|---|---|---|
| 1. Gancho | 0–15% | parar a rolagem | pergunta, contraste, número grande |
| 2. Problema / contexto | 15–35% | identificação | objeções, rotina, dor |
| 3. Solução / demonstração | 35–65% | mostrar como funciona | interface, fluxo, etapas, mosaico |
| 4. Oferta / prova | 65–85% | valor e confiança | comparação, conta, roleta, ativação, prova real |
| 5. CTA | 85–100% (mín. 3 s) | ação | CTA final |

> Vídeo educativo (sem venda): troque "Oferta" por "Resumo/dica principal" e o CTA por "Salve / Siga / Comente".

## 8. Som

| Faixa | Regra |
|---|---|
| Voz | volume normalizado (≈ −16 LUFS), clara, sem música por cima atrapalhando |
| Trilha | licenciada ou original, ≈ −17 dB, **abaixa sozinha quando a voz fala** (ducking/sidechain), fade out no fim |
| Efeitos | whoosh nas transições · pop em cartões · risco ao riscar · impacto no número herói · tick na roleta · clique + "plim" ao concluir |
| Mix final | ≈ −14 LUFS, pico −1 dB |

Nunca use música, voz, imagens ou fontes de terceiros sem licença.

## 9. Adaptação por estilo

| Estilo | Fundo | Movimento | Combina com |
|---|---|---|---|
| Claro premium | claro + luz da cor principal | suave e preciso | tecnologia, cursos, serviços |
| Escuro tech | quase preto + brilhos | mais rápido, flashes | IA, games, cripto, software |
| Colorido | cores sólidas fortes | pops e quiques | varejo, infantil, alimentação |
| Minimalista | branco/preto | pouco movimento, tipografia grande | moda, arquitetura, luxo |

## 10. Plano de cenas (modelo)

```
VÍDEO: [código]   DURAÇÃO TOTAL: [s]   ESTILO: [item 9]

FALA COM TEMPOS:
[0,40 palavra] [0,62 palavra] [0,90 palavra] ...

| # | Início–fim (s) | Trecho da fala | Cena (item 6) | O que aparece e quando (s) | Som |
|---|---|---|---|---|---|
| 1 | 0,00–__ | "..." | Gancho | primeira palavra em 0,05; ... | pop |
| 2 | __–__ | "..." | ... | ... | whoosh na saída |
| … | | | | | |
| N | __–fim | "chamada final" | CTA final | botão em __ | impacto |

FUNDO ALTERNATIVO: [de __ a __ s, ou "não usa"]
ATIVOS REAIS USADOS: [prints, fotos]
AVISO LEGAL: [texto, se houver]
```

### Exemplo genérico (30 s · tema: "app de finanças pessoais")

| # | Início–fim (s) | Trecho da fala | Cena | O que aparece e quando |
|---|---|---|---|---|
| 1 | 0,0–4,0 | "Você sabe para onde vai o seu salário?" | Gancho em pergunta | frase palavra a palavra desde 0,05; ícones de moeda flutuando em 1,2 |
| 2 | 4,0–9,5 | "Planilha que ninguém atualiza, app complicado, susto no fim do mês…" | Objeções riscadas | 3 chips em 4,3 / 5,6 / 7,2, riscados logo depois de cada um |
| 3 | 9,5–17,0 | "Com o [App], cada gasto entra sozinho e vira gráfico" | Demonstração de interface | celular com lista de gastos entrando 10,2–12,5; gráfico crescendo em 14,0 |
| 4 | 17,0–25,0 | "Por R$ 9,90 por mês, menos que um lanche" | Roleta + número | "R$ 9,90" com raios em 18,4; comparação com ícone de lanche em 21,0 |
| 5 | 25,0–30,0 | "Toque em Saiba Mais e comece hoje" | CTA final | logo + "Comece hoje" + botão em 26,2 |

## 11. Checklist final

- [ ] Gancho na tela no primeiro quadro
- [ ] Nenhum vazio maior que 0,3 s
- [ ] Texto fora da área segura (topo 220 px / base 380 px)
- [ ] Tudo o que é dito aparece certo na tela (números, nomes, prazos)
- [ ] Nada cobrindo o número/preço principal
- [ ] Contraste legível (texto escuro em fundo claro ou o contrário)
- [ ] Promessas e comparações verdadeiras e comprováveis
- [ ] Logos e marcas de terceiros só com permissão + aviso legal quando necessário
- [ ] Voz clara, trilha abaixando sob a voz, efeitos no tempo certo
- [ ] Exportado 1080×1920, 30 fps, sem metadados
- [ ] Assistido inteiro no celular, com e sem som

## 12. Prompt pronto para mandar a uma IA

```
Você é editor de motion design para anúncios verticais.
Siga o ESQUELETO UNIVERSAL DE EDIÇÃO abaixo à risca.

1. Leia a minha FICHA DO PROJETO e a FALA com os tempos.
2. Divida a fala em cenas de 3–8 s.
3. Para cada cena, escolha um tipo da Biblioteca de cenas (seção 6).
4. Preencha o Plano de cenas (seção 10), com o segundo exato em que cada elemento entra (0,06–0,12 s antes da palavra).
5. Indique fundo, cores, animações (seção 5) e efeitos de som (seção 8) de cada cena.
6. No fim, rode o Checklist (seção 11) e aponte o que falta ou o que precisa de material real.

Não invente números, depoimentos ou provas que eu não forneci.
Se a fala não tiver tempos, estime pela velocidade média de 2,5 palavras por segundo e avise que são estimativas.

[COLE AQUI O ESQUELETO]
[COLE AQUI A FICHA DO PROJETO]
[COLE AQUI A FALA / TRANSCRIÇÃO COM TEMPOS]
```
