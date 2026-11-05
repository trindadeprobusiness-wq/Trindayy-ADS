# Nexools VSL · Passe Anual com 3 travas (Coursera Plus 12 meses · R$ 297)

## Brief
- **Objetivo:** levar quem chega do anúncio à página de vendas a comprar com clareza (o que é, por que é seguro, quanto custa, como recebe).
- **Público:** adulto que quer crescer na carreira em 2027 e desconfia de "conta barata".
- **Canal/formato:** VSL na página de vendas, **16:9, 1920×1080, 60 qps**, 7:31 (narração ElevenLabs "Ana Alice", 449,96 s).
- **Oferta (da narração, confirmada pelo usuário em 04/11):** R$ 297 pagos uma vez, condição de Black Friday até 30/11 23:59 (Brasília); oficial ≈ R$ 1.200; 75% abaixo; R$ 0,81/dia; 7 dias de arrependimento (CDC).
- **Identidade:** Nexools claro premium (#F4F7FC / azul #005AFC / navy #0B162A), Inter Display (OFL), logo oficial. Logo do Coursera via simple-icons (autorizado, item 7 do CLAUDE.md). Google, IBM, Meta, Stanford e Duke aparecem só como texto.
- **Premissas:** telas de curso/certificado/conta são mockups ilustrativos (sem imitar a interface do Coursera); **depoimentos**: espaço marcado "[inserir print real]" até o usuário enviar os prints (nunca inventados).

## Estratégia (análise semântica resumida)
| Bloco | Seções | Função | Visual dominante |
|---|---|---|---|
| Gancho | hook | preço como choque + "uma vez só" | R$ 297 gigante, "por mês" riscado → "pelo ano todo" |
| Objeção + loop aberto | golpe | antecipar "é golpe?" e prometer "a única coisa para conferir" | carimbo vermelho; cartão com cadeado fechado (volta no fim) |
| Identificação | paraquem, lista, culpa | espelho da lista de metas que nunca sai | cartões de desejo, gráfico mercado×você, lista sem nada riscado, vaga pedindo IA/dados |
| Problema | travas, trava1–4 | as 4 travas (fundo navy, cadeados vermelhos) | preço oficial + IOF; cursos avulsos; vídeos sem fim; conta de grupo caindo |
| Solução | desconfianca, sol1–4 | "Passe Anual com 3 travas" (fundo claro, cadeados azuis) | conta sua (senha/nome), pagamento único em reais, atendimento humano |
| Transparência | porque | revendedora independente | cartão com logo + o que somos / não somos |
| Futuro | imagina, trilhas, catalogo, certificado | o ano de estudos | celular com aula, 5 trilhas, parede de cursos, certificado com "Seu nome", 3→5 certificados |
| Prova | depoimentos | prova social | [prints reais pendentes] |
| Preço | conta, preco | ancoragem e queda | 1.200 / 600 / 400 riscados → R$ 297 → R$ 0,81 por dia |
| Risco + loop fechado | risco | "fale com a gente antes de pagar" + 7 dias | o cadeado do começo abre |
| Urgência | prazo | 30/11 23:59 | cartão de data |
| Ação | passos, final, cta | 4 passos, 2 caminhos em dez/2027, botão | linha de passos, caminho 1 cinza × caminho 2 com certificados, botão + seta |

## Movimento e som
- Padrão `launch-motion`: entradas com spring de leve overshoot, saídas mais rápidas, deslocamento entre elementos, nada 100% parado (drift + micro push-in por cena), contadores de ~1 s, troca de cena sequencial (sem dupla exposição).
- Sincronia: cada elemento entra na palavra exata da narração (`align.json`, roteiro corrigido alinhado ao áudio, 85% de âncoras diretas). Busca de palavra inexistente quebra o render (nada adivinhado).
- Trilha original (`bed_vsl.py`): energia por seção (problema contido, solução e preço mais altos, crescendo para o CTA). ~42 SFX, todos com motivo, ≤ 6 por 10 s.

## Arquivos
`script.txt` (roteiro corrigido) · `align.json` (tempos) · `bed-map.json` (energia da trilha) · `kit.tsx` · `NexoolsVSL.tsx`.
Ferramentas novas reutilizáveis: `motion-studio/scripts/tools/align-script.py`, `motion-library/tools/audio/bed_vsl.py`.
