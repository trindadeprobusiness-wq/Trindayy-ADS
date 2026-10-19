# Design system base

Tokens neutros de trabalho, derivados dos padrões do acervo. **Cada projeto substitui cor, fonte e logo pelos da marca do cliente.** Implementação: `engine/lib/tokens.css`.

## Cor (papéis, não marcas)
| Token | Valor base | Papel | Origem do padrão |
|---|---|---|---|
| `--paper` | #f5f5f7 | fundo claro premium | REF-003/006/008 (branco/off-white dominante) |
| `--ink` | #111114 | texto principal | todas |
| `--ink-2` | #6b6b76 | texto secundário (só ≥ 30 px) | REF-008 (cuidado com contraste) |
| `--night` | #0b0b0e | fundo escuro / viradas | REF-002, REF-006 5,4 s |
| `--accent` | #2f6bff | **placeholder** da cor da marca | 1 cor de destaque por peça |
| `--accent-2` | #9cff3a | cor de dado/progresso | REF-007 |

Regra: 1 neutro dominante + 1 escuro de contraste + 1 destaque. Cor de destaque só na palavra-chave ou no dado.

## Tipografia (1080×1920)
| Token | Tamanho | Uso |
|---|---|---|
| `--t-hero` | 132 px | 1–3 palavras de impacto |
| `--t-h1` | 96 px | frase curta (Apple Style: semibold, tracking −0,035 em) |
| `--t-h2` | 64 px | título de card, mensagem secundária |
| `--t-body` | 40 px | itens de lista, UI |
| `--t-label` | 30 px | mínimo legível em celular |

Fonte base: **Inter / Inter Display** (OFL 1.1, arquivos em `engine/assets/fonts/`, licença junto). As referências usam geométricas tipo Poppins (REF-006/008) [H] e grotescas condensadas (REF-002/004). Para seguir esses estilos, use fontes licenciadas da marca ou de licença aberta, sempre como arquivo local com `@font-face`.

## Forma e profundidade
- Raios: pill 999 px · card 44 px · tile 36 px (REF-007: cantos bem arredondados).
- Sombras: `--shadow-soft` (cards claros), `--shadow-night` (sobre escuro).
- Profundidade: perspectiva 1600–2000 px; desfoque de planos 6–12 px.

## Área segura (Reels/TikTok 9:16)
Topo 220 px · base 380 px · laterais 64 px (`--safe-*`). Mensagem, preço e CTA sempre dentro dela. [Valores de convenção de mercado; conferir a interface atual de cada plataforma.]

Movimento: ver `motion-tokens.md`.
