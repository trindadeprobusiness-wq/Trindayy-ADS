# Referências pendentes — links do YouTube (23/10/2026)

- https://youtu.be/Ct5_C2xC-oo
- https://youtu.be/5UnK3c-nlIs
- https://youtu.be/WcMOCtas1pg

**Status: não analisados.** A política de rede deste ambiente bloqueou youtube.com (proxy 403 / DNS), e buscas na web não retornaram título nem transcrição desses IDs. Nenhuma afirmação sobre o conteúdo deles foi feita na Skill.

Para analisar: envie os arquivos (.mp4) ou rode a análise numa máquina com acesso:
```bash
yt-dlp -f "bv*[height<=1080]+ba/b" -o "ref/%(id)s.%(ext)s" <link>   # só se você tiver direito de baixar
python3 <pasta-da-skill>/scripts/inspect-media.py ref/<id>.mp4 --frames 16 --out ref/<id>_frames
```
Depois peça: "Analise esta referência e adicione seus princípios à biblioteca".
