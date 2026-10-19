# engine — projeto HyperFrames modelo

Criado com `hyperframes init` (0.8.175). `CLAUDE.md`/`AGENTS.md` foram gerados pelo HyperFrames.

Diferenças locais:
- **GSAP servido localmente** (`vendor/gsap.min.js` 3.14.2): a CDN jsDelivr estava bloqueada no ambiente. Não volte para a CDN.
- `lib/tokens.css` (design system) e `lib/recipes.js` (receitas R-01 a R-12).
- Fontes Inter/Inter Display locais em `assets/fonts/` (OFL).
- `index.html` = **laboratório de receitas** (prova técnica, 10 s). Revisão em `../projects/_recipes-lab/REVIEW.md`.
- Versões fixadas em `package.json` (`hyperframes` 0.8.175, `gsap` 3.14.2).

```bash
npm install && npx hyperframes check && npx hyperframes render -o renders/lab.mp4
```
