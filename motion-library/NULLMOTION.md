# NullMotion no projeto

Repositório: https://github.com/blixvip/NullMotion (MIT), instalado como submódulo em `vendor/NullMotion`.
Requer Node 22+. Sem dependências.

```bash
git submodule update --init vendor/NullMotion   # (o setup.sh já faz)
cd vendor/NullMotion && npm start               # http://127.0.0.1:4343
```

## O que ele é (e o que não é)
- **É** um estúdio de *estudo e planejamento* de motion: mostra o filme final em cima e, embaixo, um rascunho simples (preto e branco, HyperFrames + GSAP) de cada seção, sincronizados quadro a quadro. Exporta essa decupagem em MP4 (Chrome/Edge).
- **Traz 23 cenas-modelo** em HTML + GSAP (1920×1080), cada uma um movimento pronto e fluido: chat digitando, notificações caindo, CTA sendo clicado, celular 3D, título cinético, barras comparativas, curva crescendo, grid de integrações, blur reveal…
- **Não é** um After Effects nem gera vídeo sozinho: geração e render do próprio NullMotion vêm desligados (respondem "not connected"). O render final continua no nosso pipeline (Remotion / HyperFrames), que já entrega MP4 9:16 sem metadados.

## Como ele entra na nossa "máquina"
| Etapa (skill premium-motion-director) | Ferramenta |
|---|---|
| 2–4 · Estratégia, direção e storyboard | **NullMotion**: decupar a referência em seções e beats (gancho, revelação, app, CTA) e ver o ritmo de cada corte |
| 4 · Escolher movimentos | **Cenas-modelo do NullMotion** como cardápio de movimento (tabela abaixo) |
| 6 · Produção | **Remotion** (`motion-studio/`, kit Moovi) ou **HyperFrames** (`tools/build.py`, Nexools) |
| 7–8 · Render e revisão | `render.mjs` (reparo de quadros + −14 LUFS), `validate-render.py`, `export-final.sh` (sem metadados) |

## Cardápio de movimentos (cena NullMotion → onde já existe no nosso kit)
| Cena NullMotion | Uso em anúncio | Equivalente no projeto |
|---|---|---|
| 07 AI Chat Sim / 20 Search Typing / 08 Prompt Bar | demonstração de uso | `Chat` + `Typing` (moovi-kit) |
| 06 Notification / 24 Showreel Notify | lembrete, prova de valor | `LockScreen` + `Notif` |
| 18 CTA Click / 01 CTA Pill | fechamento | `EndCard` (botão + dica) |
| 19 Phone Showcase | apresentação do app | `PhoneStage` (câmera + mergulho 3D) |
| 22 Kinetic Headline / 12 Blur Reveal | gancho | `Kinetic`, `StrikeWord`, `Beat` (blur in/out) |
| 13 Compare Bars / 16 Line Growth / 15 3D Bar | preço x valor, antes/depois | **a portar** (ótimo para "US$ 399 → R$ 97") |
| 02 Three Step | "como funciona" em 3 passos | **a portar** (LP e anúncio do Coursera) |
| 17 Integrations Grid / 21 Connector List | n8n, Manus | **a portar** |
| 14 Leaderboard | ranking de ferramentas | **a portar** |
| 04 Morph Panel | botão vira modal | **a portar** |

"A portar" = reescrever a ideia do movimento como componente do nosso kit, em 9:16, com nossas cores e fontes. Não copiamos o HTML nem as marcas de terceiros que aparecem nos modelos (ícones Adobe, Claude, Gemini etc.); a exceção são os logos autorizados da Nexools (CLAUDE.md, item 7).

## Regras
- Os vídeos de exemplo do `showcase/` são de outros criadores: servem para estudo, nunca como ativo.
- Não versionar referências importadas (`.local-media/`, `public/references/`), como o próprio projeto pede.
- O submódulo fica no commit fixado; atualizar só quando houver motivo (`git -C vendor/NullMotion pull`).
