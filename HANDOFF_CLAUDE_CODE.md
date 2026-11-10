# Passagem para o Claude Code no seu Mac · criativos Nexools (Coursera Plus R$ 297)

Escrito em 10/11/2026 a partir da sessão na nuvem. Leia isto primeiro; depois siga o `CLAUDE.md` da raiz.

## 0. Jeito mais completo: clonar o repositório
O pacote ZIP é uma cópia leve (sem vídeos prontos, sem `node_modules`). O repositório tem tudo:
```bash
git clone -b claude/tender-brahmagupta-uwvdro https://github.com/trindadeprobusiness-wq/Trindayy-ADS.git
cd Trindayy-ADS
```

## 1. Preparar o Mac (uma vez)
```bash
# Homebrew: https://brew.sh
brew install node python ffmpeg
python3 -m pip install numpy scipy pillow
cd motion-studio && npm install      # Remotion 4.0.538; na 1ª renderização ele baixa o próprio Chrome
npx tsc --noEmit                      # tem que passar sem erro
```
Prévia ao vivo: `npm run studio` (abre o Remotion Studio no navegador).

## 2. O que tem no pacote e para que serve
| Caminho | Para que serve |
|---|---|
| `CLAUDE.md` | Regras do projeto (obrigatório ler). Itens 8–11: skills de motion, perguntas de briefing, fluidez. |
| `.claude/skills/premium-motion-director/` | Fluxo de 10 fases (brief → estratégia → direção de arte → storyboard → timeline → produção → render → revisão com nota ≥ 90 → refino → entrega), referências, scripts de validação. |
| `.claude/skills/launch-motion/` | Padrão de movimento nível After Effects (easing, overshoot, saídas mais rápidas, 60 qps). |
| `motion-studio/` | Estúdio Remotion. `src/lib` = componentes reutilizáveis; `src/projects/nexools-ads/akit.tsx` = kit dos anúncios 9:16 no **tema claro** (fundo, legenda palavra a palavra, cartões, preço, CTA, rodapé legal); `A1…A4*.tsx` = os 4 anúncios prontos como exemplo. |
| `motion-studio/scripts/render.mjs` | Renderiza, corrige quadros falhados (`repair-glitches.py`) e masteriza o áudio em −14 LUFS. |
| `motion-studio/scripts/tools/export-final.sh` | **Exportação final sem metadados** (obrigatória em toda entrega). |
| `motion-studio/scripts/tools/align-script.py` | Alinha o roteiro às palavras da narração (para legenda e animação sincronizadas). |
| `motion-studio/scripts/tools/repair-glitches.py` | Detector/correção de quadros que piscam. |
| `motion-library/tools/audio/` | `bed_vsl.py` (trilha original por seções: tensa/motivadora/calma) e `sfx_pro.py` (16 efeitos sonoros originais). |
| `motion-library/strategy/` | Postura de mídia paga (decidir por lucro, sem dado inventado) e prompt-mestre de estratégia. |
| `motion-library/brands/nexools/` | Ofertas, estratégia, prompts de campanha e **roteiros** (`roteiros/COURSERA_297_ECONOMIA_v1.md`, `COURSERA_297_HOOKS_v1.md`). |
| `motion-library/analysis/REF-009/` | Análise do vídeo dos "3 hooks" (fórmulas presta atenção / a maioria / o motivo). |
| `motion-library/INDEX.md`, `MOTION_PLAYBOOK.md`, `BRIEFING_PERGUNTAS.md` | Acervo de referências, linguagens de motion e as perguntas antes de cada vídeo. |

## 3. Regras que não se negociam
- **Sem metadados**: todo vídeo entregue passa por `bash scripts/tools/export-final.sh in.mp4 out.mp4`.
- **9:16, 1080×1920, 60 qps**; área segura livre (12% em cima, 20% embaixo, faixa direita dos botões do Reels).
- **Áudio**: −14 LUFS, pico ≤ −1 dBTP; voz sempre clara; no máximo 6 efeitos a cada 10 s, cada um com motivo.
- **Tema claro** da Nexools (fundo branco-gelo `#F4F7FC`, texto `#0B162A`, azul `#005AFC`). Nada de máscara CSS no fundo: ela fazia quadros piscarem.
- **Rodapé em todo anúncio**: "Nexools é revendedora independente. Marcas citadas pertencem aos seus respectivos donos."
- **Nada inventado**: só os fatos abaixo. Economia = **R$ 903** ("mais de novecentos reais"), não "mais de mil", a não ser que o preço oficial em reais hoje seja maior (guarde print).
- **Você é o vendedor**: no vídeo com você, diga que é da Nexools; nunca "eu paguei só R$ 297" como se fosse cliente.
- **Dados pessoais**: borrar e-mail, nome completo, telefone e qualquer dado de terceiros que apareça na tela.
- Não declarar pronto sem renderizar e olhar os quadros (detector de pisca + folha de contato).

### Fatos permitidos (Coursera Plus pela Nexools)
12 meses · R$ 297 pagos uma vez (Pix ou cartão) · R$ 0,81 por dia · sem mensalidade e sem renovação automática · perto de R$ 1.200 no site oficial · conta no nome do cliente (troca a senha) · não é conta compartilhada · pessoa real no WhatsApp antes de pagar · 7 dias para desistir (CDC) · cursos do Google, IBM, Meta e de universidades como Stanford · certificado no seu nome **nos programas incluídos** · condição até 30/11.

## 4. A tarefa agora: os 4 vídeos gravados (UGC) na pasta Descargas
Arquivos (Descargas, 10/11, 14:38): `F07E3959-….MP4`, `B326CA2E-….MP4`, `60B7065E-….MP4`, `6302BF01-….MP4` (200–330 MB cada).
Roteiros de referência: U1, U2, U3 em `motion-library/brands/nexools/roteiros/COURSERA_297_ECONOMIA_v1.md`.

Fluxo sugerido:
1. **Inspecionar**: `ffprobe` (resolução, qps, duração) e uma folha de contato de cada vídeo (`ffmpeg -vf fps=1/2,scale=270:-1,tile=6x5`).
2. **Transcrever** a fala (com internet no Mac funciona `faster-whisper` modelo `small` ou `medium`, idioma pt) e marcar os melhores takes de cada trecho do roteiro.
3. **Montar** um projeto novo em `motion-studio/src/projects/nexools-ugc/` usando `<OffthreadVideo>` do Remotion com os trechos escolhidos (cortes secos, sem respiro morto), reenquadrado para 9:16, e por cima o kit claro de `akit.tsx`: legenda palavra a palavra (`ReelsCaptions`, alimentada pelo `align-script.py`), preço R$ 1.200 riscado → R$ 297 (`Strike`, `Slam`), selos (conta no seu nome · Pix ou cartão · sem renovação), zoom suave nos detalhes da tela, rodapé legal e CTA "Saiba mais".
4. **Áudio**: voz original + trilha baixa (`bed_vsl.py`, energia por seção) + poucos efeitos de `sfx_pro.py`; masterizar em −14 LUFS (o `render.mjs` já faz).
5. **Renderizar**: `node scripts/render.mjs <Id>` → conferir quadros (`repair-glitches.py`, folha de contato) → `export-final.sh`.
6. **Revisar** com a rubrica da skill (`references/quality-standards.md`), nota ≥ 90, e só então entregar.

## 5. Prompt para colar no Claude Code (Antigravity)
```
Leia HANDOFF_CLAUDE_CODE.md e CLAUDE.md na raiz deste repositório e siga as skills premium-motion-director e launch-motion.

Tarefa: editar os 4 vídeos que gravei (pasta ~/Downloads, arquivos .MP4 de hoje às 14:38) em criativos 9:16 para Meta Ads da Nexools (Coursera Plus 12 meses por R$ 297), usando os roteiros U1, U2 e U3 de motion-library/brands/nexools/roteiros/COURSERA_297_ECONOMIA_v1.md como guia.

1. Antes de editar, analise os 4 vídeos (duração, conteúdo, fala transcrita) e me mostre quais trechos você vai usar em cada criativo. Faça no máximo 6 perguntas de briefing (motion-library/BRIEFING_PERGUNTAS.md), com recomendação.
2. Monte no Remotion (motion-studio) com o kit claro de src/projects/nexools-ads/akit.tsx: legenda palavra a palavra, preço R$ 1.200 riscado → R$ 297, selos de confiança, rodapé legal, CTA "Saiba mais", 60 qps.
3. Borre qualquer dado pessoal que aparecer na tela.
4. Respeite as regras da seção 3 do HANDOFF (economia de R$ 903, eu sou da Nexools, nada inventado).
5. Renderize, rode o detector de quadros piscando, revise os quadros, exporte sem metadados com scripts/tools/export-final.sh e salve em motion-library/brands/nexools/renders/.
```
