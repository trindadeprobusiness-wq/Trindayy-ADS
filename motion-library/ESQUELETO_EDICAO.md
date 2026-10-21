# ESQUELETO DE EDIÇÃO — Anúncio vertical em motion design (padrão Nexools)

> Cole este documento em qualquer chat, editor ou ferramenta (After Effects, Premiere, CapCut, Canva, código).
> Ele descreve **como** os criativos são editados: formato, camadas, tempos, animações, som e checklist.
> No fim há um **modelo em branco** para preencher a cada vídeo novo e um **exemplo real preenchido** (COU-A).

---

## 1. Formato da composição

| Item | Valor |
|---|---|
| Proporção | 9:16 vertical (Reels, Stories, TikTok) |
| Resolução | 1080 × 1920 px |
| Quadros por segundo | 30 fps |
| Duração | 25–38 s (segue a locução + 2–3 s de CTA) |
| Exportação | MP4 H.264, qualidade alta, áudio AAC 192 kbps, **sem metadados** |
| Área segura | **topo 220 px** e **base 380 px** livres de texto importante (interface do Instagram) |
| Faixa útil | conteúdo principal entre y = 300 e y = 1540 |

## 2. Camadas (de baixo para cima, como no After Effects)

| # | Camada | Função | Comportamento |
|---|---|---|---|
| 1 | **Fundo vivo** | fundo claro #F4F7FD + 3 manchas azuis em degradê radial + textura de pontos leve | as manchas derivam devagar durante o vídeo todo (nunca fica parado) |
| 2 | **Fundo escuro** (opcional) | degradê navy #13274A → #0B162A → #060C18 | entra/sai com fade de 0,35 s nas cenas de "conta"/preço |
| 3 | **Marca fixa** | logo Nexools centralizado em y = 232, altura 54 px | sempre visível; troca para a versão clara no fundo escuro |
| 4 | **Cenas** | uma pré-composição por bloco da fala | cada cena tem câmera própria (ver item 5) |
| 5 | **Logos flutuantes** | cartões brancos com logos oficiais (150 px, cantos 44 px, sombra suave) | entram com "pop" e flutuam ±40–50 px |
| 6 | **Flash** | branco 90% por 2 quadros | só em viradas fortes (revelação de preço) |
| 7 | **Rodapé legal** | texto 24 px, 50% de opacidade, y ≈ 1470 | só na cena final (CTA) |
| 8 | **Áudio** | locução + trilha + efeitos | ver item 8 |

## 3. Sistema visual

**Cores**

| Nome | Hex | Uso |
|---|---|---|
| Azul marca | #005AFC | preço, destaques, botões |
| Azul claro | #4D8DFF | degradês, ondas de áudio |
| Azul suave | #E6EFFF | fundo de ícones |
| Navy | #0B162A | texto principal |
| Cinza texto | #5B6B85 | textos de apoio |
| Papel | #F4F7FD | fundo |
| Vermelho | #FF3B4E | riscar preço antigo, "não" |
| Verde | #0B8A4C | ✓, "ativado", selos |
| Âmbar | #FFB020 | ícones de alerta/aviso |

**Tipografia**: Inter Display (títulos) e Inter (interface).

| Estilo | Tamanho | Peso | Uso |
|---|---|---|---|
| H1 | 92 px (80–120) | Bold, espaçamento −3,5% | frase principal da cena |
| H2 | 64 px | SemiBold | frase de apoio |
| Preço | 190–230 px | Bold, números tabulares | valor final |
| Rótulo | 34 px | Medium (Inter) | legendas, fontes |
| Legal | 24 px | Medium, 50% opacidade | rodapé |

**Elementos**: cartões brancos com cantos 40–56 px e sombra suave (0 40 80 rgba(11,22,42,.12)); chips arredondados (pílula); ícones de traço 2,2 px.

**Logos**: só logos oficiais dos produtos, sempre com o rodapé "Nexools é revendedora independente. Marcas citadas pertencem aos seus respectivos donos."

## 4. Ritmo e sincronia com a voz (regra principal)

1. Grave a locução primeiro (ElevenLabs) e marque o **tempo de cada palavra** (transcrição com carimbo de tempo).
2. Divida a fala em **blocos de 3–8 s**. Cada bloco = **uma cena**.
3. Todo elemento entra **0,06–0,12 s antes** da palavra que ele representa.
4. Nenhum quadro pode ficar vazio por mais de **0,3 s**: o primeiro elemento de cada cena aparece logo no início dela.
5. O **gancho aparece no quadro 1** (primeira palavra já na tela).
6. Uma ideia por cena; no máximo 2 frases na tela ao mesmo tempo.

## 5. Animações padrão (curvas e durações)

| Movimento | Como fazer | Duração | Curva |
|---|---|---|---|
| **Entrada de cena** | escala 0,94 → 1 + desfoque 10 → 0 px | 0,45 s | expo out (desacelera forte) |
| **Saída de cena** | opacidade 1 → 0 + desfoque 0 → 16 px + escala 1 → 1,12 | 0,30 s | power3 in (acelera) |
| **Câmera viva** | durante a cena inteira: escala 1 → 1,045 e subir 14 px | duração da cena | sine in-out |
| **Palavra a palavra** | cada palavra: opacidade 0 → 1, sobe 26 px, desfoque 14 → 0 | 0,50 s | expo out |
| **Pop** (cartões, chips, logos) | escala 0,6–0,7 → 1 + opacidade | 0,45–0,55 s | back out (leve overshoot 1,7) |
| **Preço** | escala 0,6 → 1 + desfoque 20 → 0 + brilho atrás + raios girando 40° | 0,6 s (raios 3 s) | back out 1,4 |
| **Riscar** | linha vermelha cresce da esquerda (scaleX 0 → 1) e o item vai a 45% | 0,3 s | power2 in-out |
| **Contador** | número sobe de 0 até o valor (ex.: R$ 0 → R$ 1.745,82) | 2–3 s | expo out |
| **Roleta de meses** | coluna 01…12 rola até o número final | 0,8–1,1 s | expo out |
| **Digitação** | texto aparece letra a letra + cursor piscando | 0,03 s por letra | linear |
| **Clique** | botão encolhe a 0,96 e volta; troca de rótulo para ✓ verde | 0,16 s + 0,25 s | — |
| **Onda de áudio** | barras que reagem ao volume real da locução | contínuo | — |

## 6. Biblioteca de cenas (blocos reutilizáveis)

| Cena | Para quê | Composição |
|---|---|---|
| **Gancho em pergunta** | abrir com dúvida/objeção | frase grande palavra a palavra + logos flutuando |
| **Objeções riscadas** | "não depende de…" | título + 2–3 chips que entram e são riscados |
| **Lista "Não é…"** | quebrar desconfiança | linhas com ✕ vermelho que viram ✓ verde |
| **Comparação** | preço oficial × oferta | valor antigo grande → risco vermelho → preço novo azul com raios + selo |
| **A conta** (fundo escuro) | mostrar o custo real | "E faz a conta:" + mensalidade × meses + grade de meses acendendo + contador |
| **Roleta + preço** | apresentar a oferta | "12 meses" rolando + produto com logo + preço com raios |
| **Licença / cupom** | provar a ativação na conta | cartão de conta → digitação do código → botão → "✓ Ativado/Liberado" + selo |
| **Demonstração de interface** | mostrar o produto funcionando | janela estilo app: campos, botões, progresso, onda de áudio |
| **Fluxo** | automação/etapas | nós conectados por linhas que se desenham + pontos percorrendo |
| **Agente em etapas** | tarefa sendo executada | painel com etapas: pendente → girando → ✓ + barra de progresso |
| **Mosaico / categorias** | variedade do catálogo | cartões de áreas entrando em sequência + certificado |
| **Revelação de nome** | "Essa é a proposta do X" | frase + logo/nome grande com raios atrás |
| **CTA final** | fechar | logo Nexools grande + headline + catálogo dos 5 produtos (o atual destacado em azul) + botão "Saiba Mais" + seta ↓ + rodapé legal |

## 7. Estrutura narrativa (25–35 s)

| Bloco | Tempo | Objetivo | Cenas típicas |
|---|---|---|---|
| 1. Gancho | 0–4 s | parar a rolagem | pergunta, contraste, preço grande |
| 2. Problema / contexto | 4–10 s | identificação | objeções riscadas, dor, rotina |
| 3. Solução / demonstração | 10–18 s | mostrar o produto | interface, fluxo, agente, mosaico |
| 4. Oferta | 18–24 s | valor e condição | conta, comparação, roleta + preço, cupom/licença |
| 5. CTA | últimos 3–5 s | ação | CTA final |

## 8. Som

| Faixa | Regra |
|---|---|
| Locução | normalizada a −16 LUFS, pico −2 dB |
| Trilha | original/licenciada, −17 dB, **abaixa automaticamente quando a voz fala** (sidechain: limiar 0,04, razão 5, ataque 15 ms, soltura 350 ms), fade out 1,6 s no fim |
| Efeitos | whoosh em toda transição (−14 dB, 0,12 s antes da saída) · pop em cartões/chips (−8 dB) · strike ao riscar (−4 a −6 dB) · impacto no preço (−2 a −4 dB) · tick na roleta · digitação · clique + chime no "ativado" |
| Mix final | −14 LUFS, pico −1 dB |

Nunca usar música, voz ou efeitos de terceiros sem licença.

## 9. Checklist antes de entregar

- [ ] Gancho visível no quadro 1
- [ ] Nenhum vazio > 0,3 s entre cenas
- [ ] Textos fora da área segura (topo 220 / base 380)
- [ ] Preços, meses e nomes iguais aos da locução
- [ ] Comparações de preço só se validadas
- [ ] Logos oficiais + rodapé legal no CTA
- [ ] Nada sobrepondo o preço (selos, logos flutuantes)
- [ ] Contraste do texto legível (mínimo 3:1)
- [ ] Som: voz clara, trilha abaixando, efeitos sincronizados
- [ ] Exportado 1080×1920, 30 fps, sem metadados
- [ ] Assistido inteiro no celular antes de publicar

---

## 10. MODELO EM BRANCO (preencha a cada vídeo)

```
VÍDEO: [código, ex.: COU-C]
PRODUTO: [nome] · PREÇO: [R$] · DURAÇÃO DO PLANO: [meses]
LOCUÇÃO: [arquivo .mp3] · VOZ: [nome] · DURAÇÃO TOTAL: [s]
ÂNGULO: [economia / dor / demonstração / objeção / aspiração]
DESTINO: [WhatsApp / página] · CTA: [texto da headline final]

ROTEIRO COM TEMPOS (palavra → segundo):
[0,40 Você] [0,62 já] ...

CENAS:
| # | Início–fim (s) | Fala coberta | Cena (item 6) | Elementos na tela | Tempos-chave (s) | Efeitos de som |
|---|---|---|---|---|---|---|
| 1 | 0,00–4,80 | "..." | Gancho em pergunta | ... | palavra X em 0,05 | pop 1,3 |
| 2 | 4,80–... | "..." | ... | ... | ... | whoosh na saída |
| … | | | | | | |
| N | ...–fim | "Toque em Saiba Mais…" | CTA final | headline, catálogo (destaque: [produto]), botão | botão em [s] | impacto no botão |

FUNDO ESCURO: [de s a s, ou "não usa"]
LOGOS: [quais e onde]
OBSERVAÇÕES: [comparação validada? prints reais?]
```

---

## 11. EXEMPLO PREENCHIDO — COU-A (Coursera, 26 s)

```
VÍDEO: COU-A
PRODUTO: Coursera Plus · PREÇO: R$ 89,90 · DURAÇÃO DO PLANO: 12 meses
LOCUÇÃO: COU-A.mp3 · VOZ: Aline Mota · DURAÇÃO TOTAL: 26,3 s
ÂNGULO: economia (comparação validada) · DESTINO: WhatsApp · CTA: "Continue aprendendo"
```

| # | Início–fim (s) | Fala coberta | Cena | Elementos e tempos-chave | Som |
|---|---|---|---|---|---|
| 1 | 0,00–5,75 | "Um ano de Coursera Plus custa US$ 399…" | Comparação (cartão que vira) | título palavra a palavra (0,34 · 0,52 · 0,64 · 0,90 · 1,46); cartão "Coursera Plus · 12 meses" entra em 0,2; "US$ 399 por ano" em 1,9; nota "Referência internacional" em 4,2; cartão vira para "≈ R$ 2.013 por ano" em 4,7 | pop no cartão, whoosh na virada e na saída |
| 2 | 5,75–7,95 | "Agora olha a oferta da Nexools" | Revelação de nome | frase palavra a palavra (5,9 → 7,0); logo Nexools grande em 7,44 | impacto no logo |
| 3 | 7,95–11,65 | "12 meses por R$ 89,90" | Roleta + preço (fundo escuro) | anel/roleta "12 meses" em 8,1; "US$ 399/ano" riscado; preço R$ 89,90 com raios em 9,48; logo Coursera | tick na roleta, impacto no preço |
| 4 | 11,65–20,05 | "…cursos de tecnologia, IA, negócios… com certificado" | Mosaico / categorias | chip em 12,12; Tecnologia 14,14 · Inteligência artificial 14,86 · Negócios 16,26 · e muito mais 17,0; certificado "IA Generativa na Prática" em 18,1 | pop em cada cartão |
| 5 | 20,05–26,3 | "Toque em Saiba Mais…" | CTA final | logo Nexools + "Continue aprendendo" + catálogo (Coursera em azul) + botão "Saiba Mais" em 22,24 + rodapé legal | impacto no botão, trilha em fade out |

Fundo escuro: 7,95–11,5 · Logos: Coursera (cena 3 e catálogo), demais no catálogo final.
