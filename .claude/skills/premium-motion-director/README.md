# premium-motion-director — guia

Skill do Claude Code para direção criativa + produção de motion design premium com Remotion e FFmpeg.

## Instalação (escolha uma)

### 1. Plugin via marketplace — recomendado (qualquer projeto, máquina local)
```text
/plugin marketplace add trindadeprobusiness-wq/O-Trindade
/plugin install premium-motion-director@trindade-skills
```
(ou no terminal: `claude plugin marketplace add trindadeprobusiness-wq/O-Trindade` e `claude plugin install premium-motion-director@trindade-skills`).
Atualizar depois: `/plugin marketplace update trindade-skills` (a versão está em `plugins/premium-motion-director/.claude-plugin/plugin.json`; aumente-a a cada release).

### 2. Ativar automaticamente num repositório (inclusive sessões na nuvem / app do celular)
Dentro do outro repositório, rode uma vez e faça commit do `.claude/settings.json` gerado:
```bash
claude plugin marketplace add trindadeprobusiness-wq/O-Trindade --scope project
claude plugin install premium-motion-director@trindade-skills --scope project
```
Ou cole o bloco de `templates/project-settings.json` no `.claude/settings.json` do projeto.

### 3. Skill pessoal (sem plugin)
```bash
git clone --depth 1 https://github.com/trindadeprobusiness-wq/O-Trindade /tmp/o-trindade
mkdir -p ~/.claude/skills && cp -R /tmp/o-trindade/plugins/premium-motion-director/skills/premium-motion-director ~/.claude/skills/
```
Ativa como `/premium-motion-director`.

### 4. Copiar para dentro de um projeto
Copie a pasta da Skill para `<projeto>/.claude/skills/premium-motion-director/` e faça commit.

### 5. claude.ai (upload de Skill)
Baixe `dist/premium-motion-director.zip` da raiz do repositório (ou gere com `bash scripts/package-skill.sh`). Observação: o ambiente de código do claude.ai pode não ter Node/ffmpeg/rede para npm; nesse caso a Skill serve para direção criativa, storyboard e código, e o render é feito no Claude Code.

### Motor de animação
Em cada projeto a Skill cria o estúdio com:
```bash
bash <pasta-da-skill>/scripts/init-studio.sh motion-studio            # cria (com exemplos) + npm install
bash <pasta-da-skill>/scripts/init-studio.sh motion-studio --update   # atualiza só src/lib, scripts e configs
bash <pasta-da-skill>/scripts/init-studio.sh motion-studio --no-examples
```
Requisitos: Node 18+, Python 3 + numpy, ffmpeg/ffprobe. Chromium: o Remotion baixa sozinho; em ambientes sem download, aponte `REMOTION_BROWSER` para um headless Chromium.

## Ativação
Automática quando o pedido envolve motion/vídeo/roteiro/narração/referência de vídeo; ou explícita com `/premium-motion-director` (skill pessoal/projeto) ou `/premium-motion-director:premium-motion-director` (plugin).

## Comandos de exemplo
- "Crie um motion premium para esse roteiro: <roteiro>. Formato 9:16, 20 s, público PMEs."
- "Transforme essa narração do ElevenLabs em uma peça cinematográfica" (anexe o .mp3 e o JSON *with-timestamps*).
- "Crie uma apresentação visual premium desse SaaS" (anexe prints reais das telas e o que cada uma faz).
- "Produza um comercial minimalista inspirado na linguagem de apresentação de produtos da Apple para <produto>."
- "Analise este vídeo (anexo) e desenvolva uma versão original com qualidade semelhante ou superior."
- "Analise essa referência e adicione seus princípios técnicos à biblioteca."
- "Melhore a direção artística e o acabamento do motion `DynamicAd`."
- "Faça uma versão 1:1 e 4:5 do teste C."

## Verificação rápida
```bash
bash <pasta-da-skill>/tests/run-all.sh [motion-studio]            # estrutura, 11 testes, typecheck, renders existentes
bash <pasta-da-skill>/tests/run-all.sh motion-studio --render      # + re-renderiza os 3 exemplos (~11 min)
```

## Guia de evolução
- **Nova referência** → `references/reference-analysis.md`; registro em `references/reference-log/`; técnica reutilizável vira um `P__` em `references/pattern-library.md`.
- **Nova técnica com código** → componente parametrizado em `engine/src/lib/<módulo>.tsx` (fonte canônica; projetos recebem com `init-studio.sh --update`), exportado em `index.ts`, documentado na tabela de API de `references/rendering-pipeline.md`. Sem valores fixos de um vídeo só; use tokens do `Theme`.
- **Novo estilo/marca** → novo `Theme` em `theme.tsx` + linha em `references/art-direction-styles.md`.
- **Novo som** → função em `scripts/synth-sfx.py` (registry) ou arquivo licenciado em `public/` com a licença anotada no brief; documente em `references/sound-design.md`.
- **Nova versão** → aumente `version` em `plugins/premium-motion-director/.claude-plugin/plugin.json` e rode `claude plugin validate .` na raiz do repositório.
- **Novo script** → `scripts/`, teste em `tests/test_scripts.py`, citação no SKILL.md só se fizer parte do fluxo.
- Mantenha `SKILL.md` curto (< 500 linhas) — detalhes vão para `references/` (carregados sob demanda).
- Depois de qualquer mudança: `tests/run-all.sh`.

## Limitações conhecidas
- Links de YouTube são bloqueados pela rede deste ambiente: envie arquivos para análise.
- SFX/música são procedurais (originais, sem licença de terceiros) — funcionais, não substituem trilha de estúdio.
- Sem exportação para After Effects/CapCut; entrega é MP4 + código.
- `AudioReactiveElement` não implementado (sem caso de teste).
- Licença do Remotion: confira os termos para empresas antes de uso comercial.
