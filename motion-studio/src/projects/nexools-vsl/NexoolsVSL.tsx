// Nexools — VSL "Passe Anual com 3 travas" (Coursera Plus 12 meses · R$ 297 Black Friday). 1920×1080 @ 60 fps, 7:30.
// Story: preço-gancho → objeção "é golpe?" (loop aberto) → identificação (lista do ano) → 4 travas (problema, navy)
// → Passe Anual com 3 travas (solução, claro) → transparência → futuro → prova → conta/preço → risco (loop fechado) → prazo → passos → 2 caminhos → CTA.
import React from 'react';
import {AbsoluteFill, Html5Audio, staticFile, useCurrentFrame} from 'remotion';
import {MusicBed, SfxCues, SafeArea} from '../../lib';
import type {SfxCue} from '../../lib';
import {
  C, FD, FU, SEC, T, TS, fr, TOTAL_S, ensureInterDisplay, useIn, Pop, Kin, Strike, Count, Card, Chip, Ico, Lock, CourseraMark, Logo, Tile,
  Scene, Center, Backdrop, Captions, Footer, keyframes, progress, ease, mix, SHADOW,
} from './kit';

export const VSL = {id: 'NexoolsVSL', total: fr(TOTAL_S + 1), voice: 'nexools-vsl/voice.mp3', bed: 'nexools-vsl/bed.wav'};
const A = (n: string) => `nexools-vsl/sfx_${n}.wav`;

/* dark background per section (navy = problem / tension, light = solution / clarity) */
const DARK = new Set(['golpe', 'culpa', 'travas', 'trava1', 'trava2', 'trava3', 'trava4', 'conta', 'preco', 'prazo']);
const darkKeys = () => {
  const ids = ['hook', 'golpe', 'paraquem', 'lista', 'culpa', 'travas', 'trava1', 'trava2', 'trava3', 'trava4', 'desconfianca', 'sol1', 'porque', 'imagina', 'depoimentos', 'conta', 'preco', 'risco', 'prazo', 'passos', 'final', 'cta'];
  const k: {at: number; value: number}[] = [];
  let prev = 0;
  for (const id of ids) {
    const v = DARK.has(id) ? 1 : 0;
    const at = id === 'desconfianca' ? T('desconfianca', 'Nexools') - 10 : SEC(id).from;
    k.push({at: at - 4, value: prev}, {at: at + 18, value: v});
    prev = v;
  }
  return k;
};

/* ---------------------------------------------------------------- scenes */
const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const {from, to} = SEC('hook');
  const p0 = T('hook', 'Duzentos'), pUp = T('hook', 'Esse'), pMes = T('hook', 'Não'), pAno = T('hook', 'pelo');
  const up = keyframes(frame, [{at: pUp, value: 0}, {at: pUp + 40, value: 1}, {at: pMes - 6, value: 1}, {at: pMes + 30, value: 0.5}]);
  const priceIn = useIn(p0, 'snappy');
  return (
    <Scene from={from} to={to}>
      <div style={{position: 'absolute', left: 0, right: 0, top: mix(300, 90, up), display: 'flex', justifyContent: 'center'}}>
        <div style={{fontFamily: FD, fontWeight: 700, color: C.blue, letterSpacing: '-0.05em', lineHeight: 1, fontSize: mix(300, 170, up),
          transform: `scale(${mix(0.6, 1, Math.min(priceIn, 1.06))})`, opacity: Math.min(1, priceIn * 2)}}>
          <span style={{fontSize: '0.42em', verticalAlign: '0.9em', marginRight: 10}}>R$</span>297
        </div>
      </div>
      {frame >= pUp && frame < pMes + 4 && (
        <Center top={250} style={{gap: 40}}>
          <Kin text="Um ano inteiro estudando" starts={TS('hook', 'um ano inteiro estudando')} size={64} weight={600} out={pMes - 10} />
          <div style={{display: 'flex', gap: 22}}>
            <Pop at={T('hook', 'inteligência')} out={pMes - 10}><Chip size={40}>Inteligência artificial</Chip></Pop>
            <Pop at={T('hook', 'dados')} out={pMes - 10}><Chip size={40}>Dados</Chip></Pop>
            <Pop at={T('hook', 'negócios')} out={pMes - 10}><Chip size={40}>Negócios</Chip></Pop>
          </div>
          <div style={{display: 'flex', gap: 18, alignItems: 'center', fontFamily: FD, fontSize: 34, color: C.ink2}}>
            <Pop at={T('hook', 'cursos')} out={pMes - 10}><span>cursos de</span></Pop>
            {['Google', 'IBM', 'Stanford'].map((n) => (
              <Pop key={n} at={T('hook', n)} out={pMes - 10}><Chip tone="white" size={36} style={{boxShadow: SHADOW}}>{n}</Chip></Pop>
            ))}
          </div>
        </Center>
      )}
      {frame >= pMes && (
        <Center top={330} style={{gap: 30}}>
          <div style={{display: 'flex', gap: 40, alignItems: 'baseline', fontFamily: FD, fontWeight: 700, fontSize: 84, letterSpacing: '-0.03em'}}>
            <Pop at={pMes}><Strike at={T('hook', 'mês')}><span style={{color: C.ink2}}>por mês</span></Strike></Pop>
            <Pop at={pAno}><span style={{color: C.ink}}>pelo <span style={{color: C.blue}}>ano todo</span></span></Pop>
          </div>
          <Pop at={T('hook', 'Uma')} scale={1.3} dy={0}><Chip tone="navy" size={46}><Ico n="check" size={40} color="#fff" stroke={2.6} />Uma vez só</Chip></Pop>
        </Center>
      )}
    </Scene>
  );
};

const Golpe: React.FC = () => {
  const frame = useCurrentFrame();
  const {from, to} = SEC('golpe');
  const ot = T('golpe', 'Ótimo'), loop = T('golpe', 'única');
  const stamp = useIn(T('golpe', 'golpe'), 'snappy');
  const lift = progress(frame, ot, 24, ease.inOut);
  const toCard = progress(frame, loop - 30, 30, ease.inOut);
  return (
    <Scene from={from} to={to}>
      <Center style={{gap: 44, transform: `translateY(${mix(0, -150, toCard)}px) scale(${mix(1, 0.7, toCard)})`}}>
        <Kin text="Eu sei o que você pensa agora:" starts={TS('golpe', 'eu sei o que voce pensa agora')} size={50} weight={500} color="rgba(255,255,255,0.72)" />
        <div style={{position: 'relative', transform: `translateY(${lift * -10}px)`, opacity: mix(1, 0.4, lift)}}>
          <Kin text="Isso é golpe?" starts={TS('golpe', 'isso e golpe')} size={150} color="#fff" />
          <div style={{position: 'absolute', inset: '-10px -36px', border: `8px solid ${C.red}`, borderRadius: 26, opacity: Math.min(1, stamp) * 0.95,
            transform: `rotate(-4deg) scale(${mix(1.6, 1, Math.min(stamp, 1.05))})`}} />
        </div>
        <Pop at={ot}><div style={{fontFamily: FD, fontWeight: 700, fontSize: 120, color: C.blue2, letterSpacing: '-0.04em'}}>Ótimo.</div></Pop>
        <Kin text="Continua pensando assim." starts={TS('golpe', 'continua pensando assim')} size={48} weight={500} color="rgba(255,255,255,0.8)" />
      </Center>
      <div style={{position: 'absolute', left: 0, right: 0, top: 560, display: 'flex', justifyContent: 'center'}}>
        <Pop at={loop}>
          <Card dark style={{padding: '34px 48px', display: 'flex', alignItems: 'center', gap: 34, border: `2px solid ${C.blue2}`}}>
            <Lock size={110} color={C.blue2} closeAt={loop + 20} />
            <div style={{fontFamily: FD, color: '#fff'}}>
              <div style={{fontSize: 46, fontWeight: 700, letterSpacing: '-0.02em'}}>A única coisa para conferir</div>
              <div style={{fontSize: 46, fontWeight: 700, letterSpacing: '-0.02em', color: C.blue2}}>antes de pagar qualquer centavo</div>
              <div style={{fontSize: 30, fontWeight: 500, color: 'rgba(255,255,255,0.6)', marginTop: 10}}>Eu mostro no fim do vídeo.</div>
            </div>
          </Card>
        </Pop>
      </div>
    </Scene>
  );
};

const ParaQuem: React.FC = () => {
  const frame = useCurrentFrame();
  const {from, to} = SEC('paraquem');
  const gOut = T('paraquem', 'simplesmente') - 6, graph = T('paraquem', 'parar'), fica = T('paraquem', 'fica') - 12;
  const draw = progress(frame, graph + 10, 110, ease.inOut);
  const items: [string, string, string][] = [['crescer', 'Crescer na carreira em 2027', 'star'], ['ganhar', 'Ganhar mais', 'bolt'], ['mudar', 'Mudar de área', 'repeat']];
  return (
    <Scene from={from} to={to}>
      {frame < gOut + 20 && (
        <Center style={{gap: 50}}>
          <Kin text="Esse vídeo é pra você que quer" starts={TS('paraquem', 'esse video e pra voce que quer')} size={64} weight={600} out={gOut} />
          <div style={{display: 'flex', gap: 30}}>
            {items.map(([k, label, icon], i) => (
              <Pop key={k} at={T('paraquem', k)} out={gOut + i * 3} seed={i}>
                <Card style={{width: 440, padding: '40px 36px', display: 'flex', flexDirection: 'column', gap: 22}}>
                  <div style={{width: 76, height: 76, borderRadius: 22, background: C.blueSoft, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Ico n={icon as never} size={42} /></div>
                  <div style={{fontFamily: FD, fontWeight: 700, fontSize: 44, color: C.ink, letterSpacing: '-0.02em', lineHeight: 1.1}}>{label}</div>
                </Card>
              </Pop>
            ))}
          </div>
        </Center>
      )}
      {frame >= graph && frame < fica + 10 && (
        <Pop at={graph} out={fica - 6} style={{position: 'absolute', left: 260, top: 130}}>
          <Card style={{width: 1400, height: 640, padding: 50, position: 'relative'}}>
            <div style={{fontFamily: FD, fontWeight: 700, fontSize: 46, color: C.ink}}>O mercado está andando mais rápido</div>
            <svg width={1300} height={460} style={{position: 'absolute', left: 50, top: 140}}>
              <line x1={0} y1={440} x2={1300} y2={440} stroke={C.line} strokeWidth={3} />
              <path d="M0 420 C 400 400, 800 260, 1260 40" fill="none" stroke={C.blue} strokeWidth={10} strokeLinecap="round" pathLength={1} strokeDasharray={`${draw} 1`} />
              <path d="M0 425 C 400 415, 800 395, 1260 360" fill="none" stroke="#A9B4C7" strokeWidth={10} strokeLinecap="round" pathLength={1} strokeDasharray={`${draw} 1`} />
            </svg>
            <div style={{position: 'absolute', right: 70, top: 150, opacity: draw > 0.9 ? 1 : 0}}><Chip>Mercado</Chip></div>
            <div style={{position: 'absolute', right: 70, top: 470, opacity: progress(frame, T('paraquem', 'você', 1), 12)}}><Chip tone="white" style={{boxShadow: SHADOW}}>Você</Chip></div>
          </Card>
        </Pop>
      )}
      {frame >= fica && (
        <Center style={{gap: 30}}>
          <Kin text="Fica até o final." starts={TS('paraquem', 'fica ate o final')} size={130} hl={['final.']} />
          <Kin text="O seu próximo ano pode ser bem diferente deste." starts={TS('paraquem', 'o seu proximo ano')} size={50} weight={500} color={C.ink2} />
        </Center>
      )}
    </Scene>
  );
};

const Lista: React.FC = () => {
  const frame = useCurrentFrame();
  const {from, to} = SEC('lista');
  const items: [number, string][] = [[T('lista', 'Ano', 1), 'Aprender inteligência artificial'], [T('lista', 'Ano', 2), 'Fazer aquele curso de dados'], [T('lista', 'Ano', 3), 'Atualizar meu LinkedIn']];
  const nov = T('lista', 'novembro'), q = T('lista', 'Quantos');
  const shake = frame > q ? Math.sin((frame - q) * 0.9) * 6 * Math.max(0, 1 - (frame - q) / 40) : 0;
  return (
    <Scene from={from} to={to}>
      <div style={{position: 'absolute', left: 230, top: 120}}>
        <Pop at={T('lista', 'Dezembro')}>
          <Card style={{width: 900, padding: '44px 54px', transform: `translateX(${shake}px) rotate(-1.2deg)`}}>
            <div style={{fontFamily: FU, fontSize: 28, color: C.ink2, fontWeight: 500}}>Dezembro do ano passado</div>
            <div style={{fontFamily: FD, fontSize: 54, fontWeight: 700, color: C.ink, letterSpacing: '-0.02em', marginBottom: 26}}>Metas para o ano que vem</div>
            {items.map(([at, label], i) => (
              <Pop key={i} at={at} seed={i}>
                <div style={{display: 'flex', alignItems: 'center', gap: 24, padding: '20px 0', borderTop: `2px dashed ${C.line}`}}>
                  <div style={{width: 46, height: 46, borderRadius: 12, border: `4px solid ${frame > q ? C.red : '#B9C2D3'}`}} />
                  <div style={{fontFamily: FD, fontSize: 42, fontWeight: 600, color: C.ink}}>{label}</div>
                </div>
              </Pop>
            ))}
          </Card>
        </Pop>
      </div>
      <div style={{position: 'absolute', left: 1220, top: 150}}>
        <Pop at={nov} dx={60} dy={0}>
          <Card style={{width: 520, overflow: 'hidden', textAlign: 'center'}}>
            <div style={{background: C.blue, color: '#fff', fontFamily: FD, fontWeight: 700, fontSize: 40, padding: '18px 0'}}>Novembro</div>
            <div style={{fontFamily: FD, fontWeight: 700, fontSize: 118, color: C.ink, padding: '26px 0 14px', letterSpacing: '-0.04em', whiteSpace: 'nowrap'}}>de novo</div>
            <div style={{fontFamily: FU, fontSize: 26, color: C.ink2, paddingBottom: 28}}>e a lista continua igual</div>
          </Card>
        </Pop>
        <Pop at={q} style={{marginTop: 40}}>
          <div style={{fontFamily: FD, fontWeight: 700, fontSize: 64, color: C.ink, textAlign: 'center'}}>Riscados: <span style={{color: C.red}}>0 de 3</span></div>
        </Pop>
      </div>
    </Scene>
  );
};

const Culpa: React.FC = () => {
  const frame = useCurrentFrame();
  const {from, to} = SEC('culpa');
  const jobs = T('culpa', 'enquanto') - 20, dist = T('culpa', 'cada') - 30;
  const reqs: [string, string][] = [['Inteligência', 'Inteligência artificial'], ['análise', 'Análise de dados'], ['gestão', 'Gestão'], ['inglês', 'Inglês para negócios']];
  const gap = progress(frame, dist + 20, 200, ease.inOut);
  return (
    <Scene from={from} to={to}>
      {frame < jobs + 10 && (
        <Center style={{gap: 22}}>
          <Kin text="Não é culpa sua." starts={TS('culpa', 'nao e culpa sua')} size={110} color="#fff" out={jobs - 6} />
          <Kin text="Não é preguiça." starts={TS('culpa', 'nao e preguica')} size={110} color={C.blue2} out={jobs - 6} />
          <div style={{display: 'flex', alignItems: 'center', gap: 26, marginTop: 20}}>
            <Kin text="Todo caminho tinha uma trava." starts={TS('culpa', 'todo caminho tinha uma trava')} size={56} weight={500} color="rgba(255,255,255,0.8)" out={jobs - 6} />
            <Pop at={T('culpa', 'trava')} out={jobs - 6}><Lock size={84} color={C.red} closeAt={T('culpa', 'trava') + 10} /></Pop>
          </div>
        </Center>
      )}
      {frame >= jobs && frame < dist + 10 && (
        <Center style={{gap: 40}}>
          <Kin text="As vagas que pagam melhor pedem:" starts={TS('culpa', 'as vagas que pagam melhor')} size={64} color="#fff" out={dist - 6} />
          <Pop at={T('culpa', 'vagas')} out={dist - 6}>
            <Card style={{width: 1180, padding: '40px 50px'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div style={{fontFamily: FD, fontWeight: 700, fontSize: 46, color: C.ink}}>Vaga · Analista</div>
                <Chip tone="green" size={30}>Salário acima da média</Chip>
              </div>
              <div style={{fontFamily: FU, fontSize: 28, color: C.ink2, margin: '18px 0 22px'}}>Requisitos</div>
              <div style={{display: 'flex', gap: 16, flexWrap: 'wrap'}}>
                {reqs.map(([k, label], i) => <Pop key={k} at={T('culpa', k)} seed={i}><Chip size={34}><Ico n="check" size={30} stroke={2.6} />{label}</Chip></Pop>)}
              </div>
            </Card>
          </Pop>
        </Center>
      )}
      {frame >= dist && (
        <Center style={{gap: 30}}>
          <Kin text="A cada mês, a distância aumenta." starts={TS('culpa', 'a cada mes')} size={70} color="#fff" />
          <div style={{position: 'relative', width: 1460, height: 260}}>
            <div style={{position: 'absolute', left: 0, top: mix(120, 30, gap), width: 1000, height: 10, borderRadius: 9, background: C.blue2}} />
            <div style={{position: 'absolute', left: 0, top: mix(140, 230, gap), width: 1000, height: 10, borderRadius: 9, background: 'rgba(255,255,255,0.35)'}} />
            <div style={{position: 'absolute', left: 1030, top: mix(108, 16, gap), whiteSpace: 'nowrap', fontFamily: FD, fontSize: 30, color: C.blue2, fontWeight: 600}}>O que o mercado pede</div>
            <div style={{position: 'absolute', left: 1030, top: mix(126, 214, gap), whiteSpace: 'nowrap', fontFamily: FD, fontSize: 30, color: 'rgba(255,255,255,0.6)', fontWeight: 600}}>O que você estudou</div>
          </div>
        </Center>
      )}
    </Scene>
  );
};

const TRAVAS: [string, string][] = [['trava1', 'O curso bom é caro'], ['trava2', 'O curso avulso'], ['trava3', 'O gratuito'], ['trava4', 'A conta barata de grupo']];
const TravaHeader: React.FC<{n: number}> = ({n}) => {
  const {from} = SEC(`trava${n}`);
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: 70, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 22}}>
      <Pop at={from}><Chip tone="ghost" size={34}><Lock size={36} color={C.red} />Trava {n} de 4</Chip></Pop>
    </div>
  );
};

const Travas: React.FC = () => {
  const {from, to} = SEC('travas');
  return (
    <Scene from={from} to={to}>
      <Center style={{gap: 50}}>
        <Kin text="Quais são essas travas?" starts={TS('travas', 'quais sao essas travas')} size={84} color="#fff" />
        <div style={{display: 'flex', gap: 28}}>
          {TRAVAS.map(([, label], i) => (
            <Pop key={i} at={from + 8 + i * 6} seed={i}>
              <Card dark style={{width: 330, height: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 22}}>
                <Lock size={96} color={C.red} closeAt={T('travas', 'aposto') + i * 8} />
                <div style={{fontFamily: FD, fontSize: 36, fontWeight: 700, color: '#fff'}}>Trava {i + 1}</div>
                <div style={{fontFamily: FU, fontSize: 24, color: 'rgba(255,255,255,0.55)', textAlign: 'center', padding: '0 20px'}}>{label}</div>
              </Card>
            </Pop>
          ))}
        </div>
      </Center>
    </Scene>
  );
};

const Trava1: React.FC = () => {
  const {from, to} = SEC('trava1');
  const card = T('trava1', 'O', 1);
  const extras: [string, string][] = [['cartão', 'Cartão internacional'], ['IOF', 'IOF'], ['câmbio', 'Câmbio do dia'], ['renovação', 'Renovação automática']];
  return (
    <Scene from={from} to={to}>
      <TravaHeader n={1} />
      <Center top={60} style={{gap: 40}}>
        <Kin text="O curso bom é caro." starts={TS('trava1', 'o curso bom e caro')} size={96} color="#fff" hl={['caro.']} hlColor={C.red} />
        <div style={{display: 'flex', gap: 40, alignItems: 'center'}}>
          <Pop at={card}>
            <Card style={{width: 620, padding: '40px 46px'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 18}}><CourseraMark size={54} /><div style={{fontFamily: FD, fontWeight: 700, fontSize: 40, color: C.ink}}>Coursera Plus · anual</div></div>
              <div style={{fontFamily: FD, fontWeight: 700, fontSize: 110, color: C.ink, letterSpacing: '-0.04em', marginTop: 14}}>
                <span style={{fontSize: 44, color: C.ink2}}>≈ R$ </span><Count at={T('trava1', 'mil')} from={0} to={1200} />
              </div>
              <div style={{fontFamily: FU, fontSize: 28, color: C.ink2}}>no site oficial</div>
            </Card>
          </Pop>
          <div style={{display: 'flex', flexDirection: 'column', gap: 18}}>
            {extras.map(([k, label], i) => <Pop key={k} at={T('trava1', k)} dx={-40} dy={0} seed={i}><Chip tone="red" size={36}><Ico n="x" size={30} color={C.red} stroke={2.8} />{label}</Chip></Pop>)}
          </div>
        </div>
      </Center>
    </Scene>
  );
};

const Trava2: React.FC = () => {
  const frame = useCurrentFrame();
  const {from, to} = SEC('trava2');
  const stop = T('trava2', 'para');
  const buys = [T('trava2', 'um'), T('trava2', 'depois', 0), T('trava2', 'depois', 1)];
  return (
    <Scene from={from} to={to}>
      <TravaHeader n={2} />
      <Center top={60} style={{gap: 50}}>
        <Kin text="O curso avulso." starts={TS('trava2', 'o curso avulso')} size={96} color="#fff" />
        <div style={{display: 'flex', gap: 30}}>
          {buys.map((at, i) => (
            <Pop key={i} at={at} seed={i}>
              <Card style={{width: 380, padding: 30, opacity: i === 2 && frame > stop ? 0.35 : 1}}>
                <Tile title={`Curso ${i + 1}`} area="Certificado próprio" i={i} w={320} />
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 22, fontFamily: FD, fontWeight: 700, fontSize: 32, color: C.ink}}>
                  <span>Pagamento</span>
                  {i < 2 ? <Chip tone="red" size={28}>pago à parte</Chip> : <Strike at={stop}><Chip tone="white" size={28}>parou aqui</Chip></Strike>}
                </div>
              </Card>
            </Pop>
          ))}
        </div>
        <Kin text="Cada certificado custa como se fosse o único." starts={TS('trava2', 'cada certificado custa')} size={50} weight={500} color="rgba(255,255,255,0.85)" />
      </Center>
    </Scene>
  );
};

const Trava3: React.FC = () => {
  const frame = useCurrentFrame();
  const {from, to} = SEC('trava3');
  const grid = T('trava3', 'O', 1);
  const scroll = progress(frame, grid, to - grid, ease.linear) * 260;
  const nos: [string, string][] = [['trilha', 'Sem trilha'], ['certificado', 'Sem certificado'], ['fim', 'Sem fim']];
  return (
    <Scene from={from} to={to}>
      <TravaHeader n={3} />
      <Pop at={grid} style={{position: 'absolute', left: 170, top: 190, width: 900, height: 640, overflow: 'hidden', borderRadius: 30}}>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 280px)', gap: 20, transform: `translateY(${-scroll}px)`}}>
          {Array.from({length: 24}, (_, i) => (
            <div key={i} style={{height: 158, borderRadius: 18, background: `linear-gradient(135deg, hsl(${(i * 47) % 360} 55% 42%), hsl(${(i * 47 + 40) % 360} 60% 28%))`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <div style={{width: 58, height: 58, borderRadius: 29, background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Ico n="play" size={30} color={C.navy} /></div>
            </div>
          ))}
        </div>
        <div style={{position: 'absolute', inset: 0, background: `linear-gradient(${C.navy}00 70%, ${C.navy})`}} />
      </Pop>
      <div style={{position: 'absolute', left: 1130, top: 190, display: 'flex', flexDirection: 'column', gap: 26}}>
        <Kin text="O gratuito." starts={TS('trava3', 'o gratuito')} size={92} color="#fff" align="left" />
        {nos.map(([k, label], i) => <Pop key={k} at={T('trava3', k)} dx={-40} dy={0} seed={i}><Chip tone="red" size={40}><Ico n="x" size={34} color={C.red} stroke={2.8} />{label}</Chip></Pop>)}
        <Pop at={T('trava3', 'vinte')}><div style={{fontFamily: FD, fontSize: 40, fontWeight: 600, color: 'rgba(255,255,255,0.85)', marginTop: 10}}>20 vídeos depois…<br /><span style={{color: C.red}}>no mesmo lugar.</span></div></Pop>
      </div>
    </Scene>
  );
};

const Trava4: React.FC = () => {
  const frame = useCurrentFrame();
  const {from, to} = SEC('trava4');
  const crowd = T('trava4', 'Conta', 1), cai = T('trava4', 'cai'), some = T('trava4', 'some');
  const bar = Math.min(progress(frame, crowd, 120, ease.out) * 0.46, 0.46);
  return (
    <Scene from={from} to={to}>
      <TravaHeader n={4} />
      <Center top={60} style={{gap: 40}}>
        <Kin text="A conta barata de grupo." starts={TS('trava4', 'a conta barata de grupo')} size={92} color="#fff" hl={['grupo.']} hlColor={C.red} />
        <div style={{display: 'flex', gap: 34, alignItems: 'stretch'}}>
          <Pop at={crowd}>
            <Card style={{width: 620, padding: '36px 40px'}}>
              <div style={{fontFamily: FD, fontWeight: 700, fontSize: 38, color: C.ink}}>Login compartilhado</div>
              <div style={{display: 'flex', marginTop: 22}}>
                {Array.from({length: 8}, (_, i) => (
                  <div key={i} style={{width: 66, height: 66, borderRadius: 33, marginLeft: i ? -16 : 0, border: '4px solid #fff', background: `hsl(${(i * 53) % 360} 50% 62%)`,
                    transform: `scale(${progress(frame, crowd + i * 4, 14, ease.overshoot)})`}} />
                ))}
                <Pop at={T('trava4', 'quinze')} dy={0}><div style={{marginLeft: 14, height: 66, display: 'flex', alignItems: 'center'}}><Chip tone="red" size={32}>+15 pessoas</Chip></div></Pop>
              </div>
              <div style={{marginTop: 30, height: 14, borderRadius: 7, background: C.line}}><div style={{width: `${bar * 100}%`, height: '100%', borderRadius: 7, background: frame > cai ? C.red : C.blue}} /></div>
              <div style={{fontFamily: FU, fontSize: 24, color: C.ink2, marginTop: 10}}>Progresso do curso</div>
            </Card>
          </Pop>
          <div style={{display: 'flex', flexDirection: 'column', gap: 22, justifyContent: 'center'}}>
            <Pop at={cai} dx={-40} dy={0}><Card style={{padding: '24px 30px', display: 'flex', gap: 18, alignItems: 'center', border: `2px solid ${C.red}`}}><Ico n="wifiOff" size={46} color={C.red} /><div style={{fontFamily: FD, fontWeight: 700, fontSize: 34, color: C.ink}}>Acesso caiu no meio do curso</div></Card></Pop>
            <Pop at={some} dx={-40} dy={0}><Card style={{padding: '24px 30px', display: 'flex', gap: 18, alignItems: 'center'}}><Ico n="chat" size={46} color={C.ink2} /><div style={{fontFamily: FD, fontWeight: 700, fontSize: 34, color: C.ink}}>Vendedor sumiu</div></Card></Pop>
          </div>
        </div>
      </Center>
    </Scene>
  );
};

const Desconfianca: React.FC = () => {
  const frame = useCurrentFrame();
  const {from, to} = SEC('desconfianca');
  const brand = T('desconfianca', 'Nexools'), passe = T('desconfianca', 'Passe');
  return (
    <Scene from={from} to={to}>
      {frame < brand - 26 && (
        <Center style={{gap: 24}}>
          <Kin text="Eu entendo a sua desconfiança." starts={TS('desconfianca', 'eu entendo a sua desconfianca')} size={84} color="#fff" out={brand - 46} />
          <Kin text="Ela é justa." starts={TS('desconfianca', 'ela e justa')} size={84} color={C.blue2} out={brand - 46} />
        </Center>
      )}
      {frame >= brand + 4 && (
        <Center style={{gap: 40}}>
          <Pop at={brand + 6} scale={0.8}><Logo height={92} /></Pop>
          <Kin text="Passe Anual com 3 travas" starts={TS('desconfianca', 'passe anual com tres travas')} size={100} hl={['3', 'travas']} />
          <div style={{display: 'flex', gap: 60}}>
            {[0, 1, 2].map((i) => <Pop key={i} at={passe + 20 + i * 10}><Lock size={110} color={C.blue} closeAt={passe + 40 + i * 10} fill={C.blueSoft} /></Pop>)}
          </div>
        </Center>
      )}
    </Scene>
  );
};

const SolHeader: React.FC<{n: number; title: string; at: number}> = ({n, title, at}) => (
  <div style={{position: 'absolute', left: 0, right: 0, top: 70, display: 'flex', justifyContent: 'center'}}>
    <Pop at={at}><Chip size={40}><Lock size={42} color={C.blue} closeAt={at + 14} />Trava {n}: {title}</Chip></Pop>
  </div>
);
const Field: React.FC<{label: string; children: React.ReactNode}> = ({label, children}) => (
  <div style={{marginTop: 22}}>
    <div style={{fontFamily: FU, fontSize: 24, color: C.ink2, marginBottom: 8}}>{label}</div>
    <div style={{height: 76, borderRadius: 18, border: `2px solid ${C.line}`, display: 'flex', alignItems: 'center', padding: '0 24px', fontFamily: FD, fontSize: 36, fontWeight: 600, color: C.ink}}>{children}</div>
  </div>
);
const Typed: React.FC<{text: string; at: number; cps?: number}> = ({text, at, cps = 14}) => {
  const frame = useCurrentFrame();
  const n = Math.max(0, Math.min(text.length, Math.floor(((frame - at) / 60) * cps)));
  const caret = frame >= at && n < text.length && Math.floor(frame / 15) % 2 === 0;
  return <>{text.slice(0, n)}{caret ? <span style={{color: C.blue}}>|</span> : null}</>;
};

const Sol1: React.FC = () => {
  const frame = useCurrentFrame();
  const {from, to} = SEC('sol1');
  const pw = T('sol1', 'troca'), nm = T('sol1', 'coloca');
  return (
    <Scene from={from} to={to}>
      <SolHeader n={1} title="a conta é sua" at={T('sol1', 'Primeira')} />
      <div style={{position: 'absolute', left: 300, top: 190}}>
        <Pop at={T('sol1', 'Você')}>
          <Card style={{width: 720, padding: '40px 46px'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
              <div style={{width: 84, height: 84, borderRadius: 42, background: C.blueSoft, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Ico n="user" size={46} /></div>
              <div><div style={{fontFamily: FD, fontWeight: 700, fontSize: 40, color: C.ink}}>Sua conta</div><div style={{fontFamily: FU, fontSize: 24, color: C.ink2}}>Acesso individual · 12 meses</div></div>
            </div>
            <Field label="Senha">{frame < pw ? '•••••••• (provisória)' : <><Typed text="••••••••••" at={pw} cps={20} />{frame > pw + 40 && <span style={{marginLeft: 'auto'}}><Ico n="check" size={34} color={C.green} stroke={3} /></span>}</>}</Field>
            <Field label="Nome no perfil"><Typed text="Seu nome aqui" at={nm} /></Field>
          </Card>
        </Pop>
      </div>
      <div style={{position: 'absolute', left: 1110, top: 260, display: 'flex', flexDirection: 'column', gap: 26}}>
        {([['Ninguém', 'Só você usa', 'user'], ['Ela', 'Não é compartilhada', 'shield'], ['cai', 'Não cai no meio do curso', 'check']] as const).map(([k, label, ic], i) => (
          <Pop key={k} at={T('sol1', k)} dx={-50} dy={0} seed={i}><Chip tone="green" size={40}><Ico n={ic} size={36} color={C.green} stroke={2.6} />{label}</Chip></Pop>
        ))}
      </div>
    </Scene>
  );
};

const Sol2: React.FC = () => {
  const frame = useCurrentFrame();
  const {from, to} = SEC('sol2');
  const nos: [string, string][] = [['dólar', 'Dólar'], ['IOF', 'IOF'], ['mensalidade', 'Mensalidade'], ['renovação', 'Renovação automática']];
  const pix = T('sol2', 'Pix'), card = T('sol2', 'cartão');
  return (
    <Scene from={from} to={to}>
      <SolHeader n={2} title="um pagamento só, em reais" at={T('sol2', 'Segunda')} />
      <div style={{position: 'absolute', left: 260, top: 200}}>
        <Pop at={T('sol2', 'pagamento')}>
          <Card style={{width: 700, padding: '44px 50px'}}>
            <div style={{fontFamily: FU, fontSize: 26, color: C.ink2}}>Pagamento único</div>
            <div style={{fontFamily: FD, fontWeight: 700, fontSize: 92, color: C.ink, letterSpacing: '-0.04em'}}>em <span style={{color: C.blue}}>reais</span></div>
            <div style={{display: 'flex', gap: 18, marginTop: 26}}>
              {[['Pix', pix, 'pix'], ['Cartão', card, 'card']].map(([l, at, ic]) => (
                <div key={l as string} style={{flex: 1, height: 96, borderRadius: 22, border: `3px solid ${frame >= (at as number) ? C.blue : C.line}`, background: frame >= (at as number) ? C.blueSoft : '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, fontFamily: FD, fontWeight: 700, fontSize: 38, color: C.ink, transform: `scale(${1 + 0.04 * Math.max(0, 1 - Math.abs(frame - (at as number) - 4) / 8)})`}}>
                  <Ico n={ic as never} size={38} />{l}
                </div>
              ))}
            </div>
          </Card>
        </Pop>
      </div>
      <div style={{position: 'absolute', left: 1080, top: 200, display: 'flex', flexDirection: 'column', gap: 20}}>
        {nos.map(([k, label], i) => (
          <Pop key={k} at={T('sol2', k)} dx={-40} dy={0} seed={i}><div style={{fontFamily: FD, fontWeight: 700, fontSize: 48, color: C.ink}}><span style={{color: C.ink2, fontWeight: 500, marginRight: 14}}>sem</span><Strike at={T('sol2', k) + 12}>{label}</Strike></div></Pop>
        ))}
        <Pop at={T('sol2', 'Acabou')} style={{marginTop: 16}}><Chip tone="green" size={34}><Ico n="calendar" size={32} color={C.green} />Acabou o ano: nenhuma cobrança sem você pedir</Chip></Pop>
      </div>
    </Scene>
  );
};

const Bubble: React.FC<{me?: boolean; at: number; children: React.ReactNode}> = ({me, at, children}) => (
  <Pop at={at} dx={me ? 40 : -40} dy={10}>
    <div style={{display: 'flex', justifyContent: me ? 'flex-end' : 'flex-start'}}>
      <div style={{maxWidth: 560, background: me ? '#DCF5E3' : '#fff', borderRadius: 26, padding: '20px 28px', fontFamily: FU, fontSize: 32, color: C.ink, boxShadow: '0 8px 20px -12px rgba(11,22,42,0.3)'}}>{children}</div>
    </div>
  </Pop>
);
const Sol3: React.FC = () => {
  const frame = useCurrentFrame();
  const {from, to} = SEC('sol3');
  const q = T('sol3', 'Travou'), a = T('sol3', 'alguém');
  const typing = frame > q + 30 && frame < a;
  return (
    <Scene from={from} to={to}>
      <SolHeader n={3} title="gente de verdade" at={T('sol3', 'Terceira')} />
      <div style={{position: 'absolute', left: 240, top: 190}}>
        <Pop at={T('sol3', 'Uma')}>
          <Card style={{width: 760, height: 620, overflow: 'hidden', background: '#EEF1F6'}}>
            <div style={{height: 100, background: C.navy, display: 'flex', alignItems: 'center', gap: 18, padding: '0 30px'}}>
              <div style={{width: 58, height: 58, borderRadius: 29, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FD, fontWeight: 800, color: C.blue, fontSize: 30}}>N</div>
              <div><div style={{fontFamily: FD, fontWeight: 700, fontSize: 32, color: '#fff'}}>Atendimento Nexools</div><div style={{fontFamily: FU, fontSize: 22, color: 'rgba(255,255,255,0.65)'}}>via WhatsApp · pessoa real</div></div>
            </div>
            <div style={{padding: 30, display: 'flex', flexDirection: 'column', gap: 18}}>
              <Bubble at={q} me>Travei no acesso, consegue me ajudar?</Bubble>
              {typing && <div style={{width: 110, height: 56, borderRadius: 28, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8}}>
                {[0, 1, 2].map((i) => <span key={i} style={{width: 12, height: 12, borderRadius: 6, background: C.ink2, opacity: 0.4 + 0.6 * Math.max(0, Math.sin(frame * 0.2 - i))}} />)}
              </div>}
              <Bubble at={a}>Claro! Me manda um print da tela que eu resolvo com você agora.</Bubble>
            </div>
          </Card>
        </Pop>
      </div>
      <div style={{position: 'absolute', left: 1130, top: 290, display: 'flex', flexDirection: 'column', gap: 26}}>
        <Pop at={T('sol3', 'antes')} dx={-40} dy={0}><Chip tone="green" size={40}><Ico n="check" size={36} color={C.green} stroke={2.6} />Antes de você pagar</Chip></Pop>
        <Pop at={T('sol3', 'durante')} dx={-40} dy={0}><Chip tone="green" size={40}><Ico n="check" size={36} color={C.green} stroke={2.6} />Durante os 12 meses</Chip></Pop>
      </div>
    </Scene>
  );
};

const Sol4: React.FC = () => {
  const {from, to} = SEC('sol4');
  const labels = ['A conta é sua', 'Pagamento único em reais', 'Gente de verdade'];
  return (
    <Scene from={from} to={to}>
      <Center style={{gap: 50}}>
        <div style={{display: 'flex', gap: 40}}>
          {labels.map((l, i) => (
            <Pop key={l} at={from + i * 8}>
              <Card style={{width: 400, height: 280, boxSizing: 'border-box', padding: '40px 30px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20}}>
                <Lock size={100} color={C.blue} closeAt={from + 16 + i * 8} fill={C.blueSoft} />
                <div style={{fontFamily: FD, fontWeight: 700, fontSize: 38, color: C.ink, textAlign: 'center'}}>{l}</div>
              </Card>
            </Pop>
          ))}
        </div>
        <Kin text="Uma pra cada medo." starts={TS('sol4', 'uma pra cada medo')} size={80} hl={['medo.']} />
      </Center>
    </Scene>
  );
};

const Porque: React.FC = () => {
  const frame = useCurrentFrame();
  const {from, to} = SEC('porque');
  const ans = T('porque', 'Nexools') - 24;
  return (
    <Scene from={from} to={to}>
      {frame < ans && (
        <Center style={{gap: 30}}>
          <Kin text="Por que tão mais barato?" starts={TS('porque', 'por que tao mais barato')} size={110} out={ans - 10} />
          <Kin text="Pergunta justa." starts={TS('porque', 'pergunta justa')} size={60} weight={500} color={C.ink2} out={ans - 10} />
        </Center>
      )}
      {frame >= ans - 2 && (
        <Center style={{gap: 30}}>
          <Pop at={ans}><Card style={{padding: '34px 50px', display: 'flex', alignItems: 'center', gap: 30}}><Logo height={64} /><div style={{width: 2, height: 70, background: C.line}} /><div style={{fontFamily: FD, fontWeight: 700, fontSize: 48, color: C.ink}}>Revendedora independente</div></Card></Pop>
          <div style={{display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 1500}}>
            <Pop at={T('porque', 'não')}><Chip tone="white" size={38} style={{boxShadow: SHADOW}}><Ico n="x" size={32} color={C.red} stroke={2.6} />Não somos o Coursera</Chip></Pop>
            <Pop at={T('porque', 'fala')}><Chip tone="white" size={38} style={{boxShadow: SHADOW}}><Ico n="x" size={32} color={C.red} stroke={2.6} />Não falamos em nome dele</Chip></Pop>
            <Pop at={T('porque', 'condição')}><Chip size={38}><Ico n="check" size={32} stroke={2.6} />Condição comercial própria</Chip></Pop>
            <Pop at={T('porque', 'público')}><Chip size={38}><Ico n="check" size={32} stroke={2.6} />Pensada para o público brasileiro</Chip></Pop>
          </div>
          <Pop at={T('porque', 'mostrar')}><Chip tone="navy" size={42}><Ico n="shield" size={38} color="#fff" />A gente mostra tudo antes de você pagar</Chip></Pop>
        </Center>
      )}
    </Scene>
  );
};

const Imagina: React.FC = () => {
  const frame = useCurrentFrame();
  const {from, to} = SEC('imagina');
  const open = T('imagina', 'abre'), done = T('imagina', 'aula', 0);
  const prog = progress(frame, T('imagina', 'dez'), done - T('imagina', 'dez'), ease.inOut);
  return (
    <Scene from={from} to={to}>
      <div style={{position: 'absolute', left: 300, top: 110}}>
        <Pop at={open}>
          <div style={{width: 400, height: 760, borderRadius: 60, background: C.navy, padding: 16, boxShadow: SHADOW}}>
            <div style={{width: '100%', height: '100%', borderRadius: 46, background: '#fff', overflow: 'hidden', position: 'relative'}}>
              <div style={{height: 230, background: 'linear-gradient(135deg,#2F80FF,#6A5BFF)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <div style={{width: 84, height: 84, borderRadius: 42, background: 'rgba(255,255,255,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Ico n="play" size={40} color={C.navy} /></div>
              </div>
              <div style={{padding: 26, fontFamily: FD}}>
                <div style={{fontSize: 22, color: C.ink2, fontWeight: 500}}>Aula 3 · Trilha de IA</div>
                <div style={{fontSize: 32, color: C.ink, fontWeight: 700, marginTop: 6}}>Prompts no trabalho</div>
                <div style={{marginTop: 26, height: 12, borderRadius: 6, background: C.line}}><div style={{width: `${prog * 100}%`, height: '100%', borderRadius: 6, background: C.blue}} /></div>
                <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 22, color: C.ink2, marginTop: 10}}><span>{Math.round(prog * 10)} min</span><span>10 min</span></div>
                {frame > done && <Pop at={done}><div style={{marginTop: 30}}><Chip tone="green" size={30}><Ico n="check" size={28} color={C.green} stroke={3} />Aula concluída</Chip></div></Pop>}
              </div>
            </div>
          </div>
        </Pop>
      </div>
      <div style={{position: 'absolute', left: 860, top: 190, display: 'flex', flexDirection: 'column', gap: 26}}>
        <Kin text="Próximos 12 meses:" starts={TS('imagina', 'proximos doze meses')} size={72} align="left" maxWidth={900} />
        <Pop at={T('imagina', 'ônibus')} dx={-40} dy={0}><Chip size={40}><Ico n="bus" size={36} />No ônibus, 10 minutos</Chip></Pop>
        <Pop at={T('imagina', 'Sem', 0)} dx={-40} dy={0}><Chip size={40}><Ico n="x" size={36} stroke={2.6} />Sem aula ao vivo</Chip></Pop>
        <Pop at={T('imagina', 'sem', 1)} dx={-40} dy={0}><Chip size={40}><Ico n="clock" size={36} />Sem horário marcado</Chip></Pop>
        <div style={{display: 'flex', gap: 18}}>
          <Pop at={T('imagina', 'celular')}><Chip tone="navy" size={40}><Ico n="phone" size={36} color="#fff" />Celular</Chip></Pop>
          <Pop at={T('imagina', 'computador')}><Chip tone="navy" size={40}><Ico n="laptop" size={36} color="#fff" />Computador</Chip></Pop>
        </div>
      </div>
    </Scene>
  );
};

const Trilhas: React.FC = () => {
  const {from, to} = SEC('trilhas');
  const tr: [string, string, string][] = [['Inteligência', 'IA no seu trabalho', 'Sem medo da tecnologia'], ['Excel', 'Excel, SQL e Power BI', 'Planilha vira decisão'], ['Gestão', 'Gestão de projetos', 'Liderança e entrega'], ['Marketing', 'Marketing digital', 'Crescimento e vendas'], ['Inglês', 'Inglês para negócios', 'Reuniões e carreira']];
  return (
    <Scene from={from} to={to}>
      <Center style={{gap: 50}}>
        <Kin text="Você escolhe uma trilha." starts={TS('trilhas', 'voce escolhe uma trilha')} size={90} hl={['trilha.']} />
        <div style={{display: 'flex', gap: 24}}>
          {tr.map(([k, t, s], i) => <Pop key={k} at={T('trilhas', k)} seed={i}><Tile title={t} area={s} i={i} w={320} /></Pop>)}
        </div>
      </Center>
    </Scene>
  );
};

const NAMES = ['Machine Learning', 'Python', 'Análise de Dados', 'UX Design', 'Liderança', 'Cibersegurança', 'Cloud Computing', 'Finanças Pessoais', 'Prompt Engineering', 'Excel Avançado', 'SQL Essencial', 'Gestão Ágil', 'Marketing Digital', 'Comunicação', 'Power BI', 'Inglês p/ Negócios', 'IA Generativa', 'Ética em IA'];
const Catalogo: React.FC = () => {
  const frame = useCurrentFrame();
  const {from, to} = SEC('catalogo');
  const pan = progress(frame, from, to - from, ease.linear);
  const pt = T('catalogo', 'Não');
  return (
    <Scene from={from} to={to} push={0.02}>
      <div style={{position: 'absolute', inset: -200, transform: `rotate(-8deg) translate(${-pan * 420}px, ${-pan * 120}px)`, display: 'grid', gridTemplateColumns: 'repeat(9, 280px)', gap: 26, opacity: 0.95}}>
        {Array.from({length: 45}, (_, i) => <Tile key={i} title={NAMES[i % NAMES.length]} area={['Tecnologia', 'Negócios', 'Dados', 'Carreira'][i % 4]} i={i} w={280} />)}
      </div>
      <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 46%, rgba(244,247,252,0.96) 0%, rgba(244,247,252,0.8) 38%, rgba(244,247,252,0.1) 75%)'}} />
      <Center style={{gap: 30}}>
        <Pop at={T('catalogo', 'milhares')}><Chip tone="navy" size={52}><CourseraMark size={50} color="#fff" />+ milhares de cursos e especializações</Chip></Pop>
        <div style={{display: 'flex', gap: 18, alignItems: 'center', fontFamily: FD, fontSize: 34, color: C.ink2}}>
          <Pop at={T('catalogo', 'empresas')}><span>Empresas</span></Pop>
          {['Google', 'IBM', 'Meta'].map((n) => <Pop key={n} at={T('catalogo', n)}><Chip tone="white" size={38} style={{boxShadow: SHADOW}}>{n}</Chip></Pop>)}
          <Pop at={T('catalogo', 'universidades')}><span style={{marginLeft: 20}}>Universidades</span></Pop>
          {['Stanford', 'Duke'].map((n) => <Pop key={n} at={T('catalogo', n)}><Chip tone="white" size={38} style={{boxShadow: SHADOW}}>{n}</Chip></Pop>)}
        </div>
        <Pop at={T('catalogo', 'quantos')}><Chip size={42}><Ico n="check" size={36} stroke={2.6} />Entre em quantos quiser, sem pagar a mais</Chip></Pop>
        {frame >= pt && (
          <div style={{display: 'flex', gap: 20}}>
            <Pop at={T('catalogo', 'português', 0)}><Chip tone="green" size={40}><Ico n="globe" size={36} color={C.green} />Cursos em português</Chip></Pop>
            <Pop at={T('catalogo', 'legendas')}><Chip tone="green" size={40}><Ico n="globe" size={36} color={C.green} />Legendas em português</Chip></Pop>
          </div>
        )}
      </Center>
    </Scene>
  );
};

const Certificado: React.FC = () => {
  const frame = useCurrentFrame();
  const {from, to} = SEC('certificado');
  const cert = T('certificado', 'recebe'), prof = T('certificado', 'Daqui');
  const n = frame < T('certificado', 'três') ? 0 : frame < T('certificado', 'quatro') ? 3 : frame < T('certificado', 'cinco') ? 4 : 5;
  return (
    <Scene from={from} to={to}>
      {frame < prof && (
        <Center style={{gap: 36}}>
          <Pop at={cert} out={prof - 14}>
            <Card style={{width: 1000, padding: '50px 60px', border: `2px solid ${C.blueSoft}`}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div style={{fontFamily: FU, fontSize: 24, letterSpacing: '0.14em', color: C.ink2, fontWeight: 600}}>CERTIFICADO DE CONCLUSÃO</div>
                <Ico n="cert" size={56} />
              </div>
              <div style={{fontFamily: FD, fontWeight: 700, fontSize: 84, color: C.ink, letterSpacing: '-0.03em', margin: '26px 0 6px', minHeight: 90}}><Typed text="Seu nome" at={T('certificado', 'seu')} cps={10} /></div>
              <div style={{fontFamily: FD, fontSize: 32, color: C.ink2, fontWeight: 500}}>concluiu um programa incluído no Coursera Plus</div>
            </Card>
          </Pop>
          <div style={{display: 'flex', gap: 22}}>
            {([['currículo', 'Currículo', 'cert'], ['LinkedIn', 'LinkedIn', 'linked'], ['entrevista', 'Próxima entrevista', 'star']] as const).map(([k, l, ic], i) => (
              <Pop key={k} at={T('certificado', k)} out={prof - 10} seed={i}><Chip size={40}><Ico n={ic} size={36} />{l}</Chip></Pop>
            ))}
          </div>
        </Center>
      )}
      {frame >= prof && (
        <Center style={{gap: 30}}>
          <Kin text="Daqui a um ano:" starts={TS('certificado', 'daqui a um ano')} size={70} />
          <Pop at={prof + 10}>
            <Card style={{width: 1100, padding: '40px 50px'}}>
              <div style={{fontFamily: FD, fontWeight: 700, fontSize: 40, color: C.ink, marginBottom: 24}}>Seus certificados</div>
              <div style={{display: 'flex', gap: 20}}>
                {Array.from({length: 5}, (_, i) => (
                  <div key={i} style={{width: 180, height: 130, borderRadius: 20, background: i < n ? `linear-gradient(135deg, ${['#2F80FF', '#18B37E', '#9B5BFF', '#FF8A3D', '#1FA2FF'][i]}, #0B162A)` : C.paper,
                    border: i < n ? 'none' : `3px dashed ${C.line}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${i < n ? 1 : 0.94})`}}>
                    {i < n && <Ico n="cert" size={58} color="#fff" />}
                  </div>
                ))}
              </div>
            </Card>
          </Pop>
          <Kin text="Dessa vez, você fez o que prometeu." starts={TS('certificado', 'dessa vez voce fez')} size={56} weight={600} hl={['prometeu.']} />
        </Center>
      )}
    </Scene>
  );
};

/** Placeholder until the real testimonial prints arrive (never fabricated). */
const Depoimentos: React.FC = () => {
  const {from, to} = SEC('depoimentos');
  return (
    <Scene from={from} to={to}>
      <Center style={{gap: 40}}>
        <Kin text="Não acredita só em mim." starts={TS('depoimentos', 'nao acredita so em mim')} size={84} />
        <div style={{display: 'flex', gap: 30}}>
          {[0, 1, 2].map((i) => (
            <Pop key={i} at={T('depoimentos', 'Olha') + i * 8}>
              <div style={{width: 440, height: 360, borderRadius: 30, border: `4px dashed ${C.blue2}`, background: 'rgba(255,255,255,0.6)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, fontFamily: FD}}>
                <Ico n="chat" size={64} color={C.blue2} />
                <div style={{fontSize: 34, fontWeight: 700, color: C.ink}}>Depoimento {i + 1}</div>
                <div style={{fontSize: 24, color: C.ink2}}>[ inserir print real ]</div>
              </div>
            </Pop>
          ))}
        </div>
      </Center>
    </Scene>
  );
};

const Conta: React.FC = () => {
  const {from, to} = SEC('conta');
  const rows: [string, string][] = [['R$ 1.200', 'duzentos'], ['R$ 600', 'seiscentos'], ['R$ 400', 'quatrocentos']];
  return (
    <Scene from={from} to={to}>
      <Center style={{gap: 40}}>
        <Kin text="Vamos fazer a conta." starts={TS('conta', 'vamos fazer a conta')} size={90} color="#fff" />
        <Pop at={T('conta', 'No')}>
          <Card dark style={{padding: '26px 40px', display: 'flex', alignItems: 'center', gap: 20}}>
            <CourseraMark size={46} color="#fff" /><div style={{fontFamily: FD, fontWeight: 600, fontSize: 38, color: '#fff'}}>Site oficial: Coursera Plus anual ≈ R$ 1.200</div>
          </Card>
        </Pop>
        <div style={{display: 'flex', gap: 60, marginTop: 10}}>
          {rows.map(([v, k], i) => (
            <Pop key={v} at={T('conta', k, k === 'duzentos' ? 1 : 0) - 24} seed={i}>
              <div style={{fontFamily: FD, fontWeight: 700, fontSize: 104, color: 'rgba(255,255,255,0.85)', letterSpacing: '-0.04em'}}>
                <Strike at={T('conta', k, k === 'duzentos' ? 1 : 0) + 4}>{v}</Strike>
              </div>
            </Pop>
          ))}
        </div>
      </Center>
    </Scene>
  );
};

const Preco: React.FC = () => {
  const frame = useCurrentFrame();
  const {from, to} = SEC('preco');
  const big = T('preco', 'duzentos'), pct = T('preco', 'São'), div = T('preco', 'Divide'), day = T('preco', 'oitenta'), cmp = T('preco', 'Menos', 0);
  const s = useIn(big, 'snappy');
  const glow = 0.5 + 0.5 * Math.sin(frame * 0.05);
  const phase2 = frame >= div;
  return (
    <Scene from={from} to={to}>
      <div style={{position: 'absolute', left: 0, right: 0, top: 70, display: 'flex', justifyContent: 'center'}}>
        <Pop at={T('preco', 'Black')}><Chip tone="ghost" size={40} style={{border: `2px solid ${C.blue2}`}}>Condição de Black Friday · Nexools</Chip></Pop>
      </div>
      {!phase2 && (
        <Center style={{gap: 24}}>
          <div style={{fontFamily: FD, fontWeight: 700, color: '#fff', fontSize: 260, letterSpacing: '-0.05em', lineHeight: 1, opacity: Math.min(1, s * 2),
            transform: `scale(${mix(0.5, 1, Math.min(s, 1.05))})`, textShadow: `0 0 ${60 + glow * 40}px rgba(77,141,255,0.55)`}}>
            <span style={{fontSize: '0.36em', verticalAlign: '1.1em', marginRight: 12, color: C.blue2}}>R$</span>297
          </div>
          <Pop at={T('preco', 'Pagos')}><Chip size={44}><Ico n="check" size={40} stroke={2.8} />Pagos uma vez só · 12 meses</Chip></Pop>
          {frame >= pct && (
            <Pop at={pct} style={{width: 1100}}>
              <div style={{display: 'flex', flexDirection: 'column', gap: 14, fontFamily: FD, fontWeight: 600, fontSize: 30, color: 'rgba(255,255,255,0.8)'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: 20}}><span style={{width: 210}}>Site oficial</span><div style={{flex: 1, height: 26, borderRadius: 13, background: 'rgba(255,255,255,0.3)'}} /><span style={{width: 150}}>≈ R$ 1.200</span></div>
                <div style={{display: 'flex', alignItems: 'center', gap: 20}}><span style={{width: 210}}>Nexools</span><div style={{flex: 1}}><div style={{width: `${progress(frame, pct + 10, 50, ease.out) * 24.75}%`, height: 26, borderRadius: 13, background: C.blue2}} /></div><span style={{width: 150, color: C.blue2}}>R$ 297</span></div>
                <div style={{alignSelf: 'center', marginTop: 12}}><Chip tone="green" size={40}>75% abaixo do preço oficial</Chip></div>
              </div>
            </Pop>
          )}
        </Center>
      )}
      {phase2 && (
        <Center style={{gap: 34}}>
          <div style={{display: 'flex', alignItems: 'baseline', gap: 30, fontFamily: FD, fontWeight: 700, color: 'rgba(255,255,255,0.75)', fontSize: 80}}>
            <Pop at={div}><span>R$ 297</span></Pop>
            <Pop at={T('preco', 'trezentos')}><span>÷ 365 dias</span></Pop>
          </div>
          <Pop at={day} scale={0.6}>
            <div style={{fontFamily: FD, fontWeight: 700, color: '#fff', fontSize: 200, letterSpacing: '-0.05em', lineHeight: 1}}>
              <span style={{fontSize: '0.4em', color: C.blue2, marginRight: 10}}>R$</span>0,81<span style={{fontSize: '0.3em', color: 'rgba(255,255,255,0.7)', marginLeft: 22, letterSpacing: '-0.01em'}}>por dia</span>
            </div>
          </Pop>
          <div style={{display: 'flex', gap: 24}}>
            <Pop at={cmp}><Chip tone="ghost" size={40}><Ico n="coffee" size={38} color="#fff" />Menos que um cafezinho</Chip></Pop>
            <Pop at={T('preco', 'Menos', 1)}><Chip tone="ghost" size={40}><Ico n="bus" size={38} color="#fff" />Menos que a passagem do ônibus</Chip></Pop>
          </div>
        </Center>
      )}
    </Scene>
  );
};

const Risco: React.FC = () => {
  const frame = useCurrentFrame();
  const {from, to} = SEC('risco');
  const reveal = T('risco', 'isso') - 18, seven = T('risco', 'mesmo');
  return (
    <Scene from={from} to={to}>
      {frame < T('risco', 'Lembra') && (
        <Center><Kin text="O risco fica do nosso lado, não do seu." starts={TS('risco', 'o risco fica do nosso lado')} size={92} hl={['nosso', 'lado,']} out={T('risco', 'Lembra') - 8} /></Center>
      )}
      {frame >= T('risco', 'Lembra') && frame < seven && (
        <Center style={{gap: 34}}>
          <Pop at={T('risco', 'Lembra')}>
            <Card style={{padding: '40px 56px', display: 'flex', alignItems: 'center', gap: 36, border: `3px solid ${C.blue}`}}>
              <Lock size={120} color={C.blue} openAt={reveal} />
              <div style={{fontFamily: FD}}>
                <div style={{fontSize: 34, color: C.ink2, fontWeight: 500}}>A única coisa para conferir antes de pagar:</div>
                <div style={{fontSize: 70, fontWeight: 700, color: C.ink, letterSpacing: '-0.03em', opacity: progress(frame, T('risco', 'Fala'), 14)}}>Fale com a gente antes.</div>
              </div>
            </Card>
          </Pop>
          <div style={{display: 'flex', gap: 22}}>
            <Pop at={T('risco', 'Chama')}><Chip tone="green" size={40}><Ico n="chat" size={36} color={C.green} />Pergunte tudo no WhatsApp</Chip></Pop>
            <Pop at={T('risco', 'Só')}><Chip size={40}><Ico n="shield" size={36} />Só pague quando estiver seguro</Chip></Pop>
          </div>
        </Center>
      )}
      {frame >= seven && (
        <Center style={{gap: 30}}>
          <Pop at={seven} scale={0.8}>
            <div style={{width: 360, height: 360, borderRadius: 180, background: '#fff', boxShadow: SHADOW, border: `10px solid ${C.green}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: FD}}>
              <div style={{fontSize: 170, fontWeight: 700, color: C.ink, lineHeight: 0.9}}>7</div>
              <div style={{fontSize: 44, fontWeight: 700, color: C.ink}}>dias</div>
            </div>
          </Pop>
          <Kin text="para desistir depois de pagar" starts={TS('risco', 'para desistir')} size={60} />
          <Pop at={T('risco', 'Código')}><Chip tone="green" size={36}><Ico n="shield" size={34} color={C.green} />Código de Defesa do Consumidor</Chip></Pop>
        </Center>
      )}
    </Scene>
  );
};

const Prazo: React.FC = () => {
  const frame = useCurrentFrame();
  const {from, to} = SEC('prazo');
  const pulse = 1 + 0.015 * Math.sin(frame * 0.15);
  return (
    <Scene from={from} to={to}>
      <Center style={{gap: 40}}>
        <Kin text="Presta atenção." starts={TS('prazo', 'presta atencao')} size={70} color="rgba(255,255,255,0.8)" />
        <Pop at={T('prazo', 'Esse')}>
          <Card style={{width: 1180, overflow: 'hidden', textAlign: 'center', transform: `scale(${pulse})`}}>
            <div style={{background: C.red, color: '#fff', fontFamily: FD, fontWeight: 700, fontSize: 40, padding: '18px 0'}}>Preço válido até</div>
            <div style={{fontFamily: FD, fontWeight: 700, fontSize: 124, color: C.ink, letterSpacing: '-0.04em', padding: '26px 0 0', whiteSpace: 'nowrap'}}>30 de novembro</div>
            <div style={{fontFamily: FD, fontWeight: 600, fontSize: 56, color: C.ink2, padding: '6px 0 34px', opacity: progress(frame, T('prazo', 'vinte'), 14)}}>23:59 · horário de Brasília</div>
          </Card>
        </Pop>
      </Center>
    </Scene>
  );
};

const Passos: React.FC = () => {
  const frame = useCurrentFrame();
  const {from, to} = SEC('passos');
  const steps: [number, string, string, string][] = [
    [T('passos', 'Clica'), 'Clique no botão', 'aqui embaixo do vídeo', 'arrowDown'],
    [T('passos', 'Você', 0), 'Pagamento seguro', 'R$ 297 no Pix ou cartão', 'card'],
    [T('passos', 'Logo'), 'Acesso na hora', 'no WhatsApp e no e-mail', 'mail'],
    [T('passos', 'Você', 1), 'Sua conta', 'troque a senha, coloque seu nome', 'user'],
  ];
  const line = progress(frame, steps[0][0], steps[3][0] + 30 - steps[0][0], ease.inOut);
  return (
    <Scene from={from} to={to}>
      <Center style={{gap: 50}}>
        <Kin text="É simples." starts={TS('passos', 'e simples')} size={90} />
        <div style={{position: 'relative', display: 'flex', gap: 34}}>
          <div style={{position: 'absolute', left: 190, right: 190, top: 64, height: 6, borderRadius: 3, background: C.line}}><div style={{width: `${line * 100}%`, height: '100%', borderRadius: 3, background: C.blue}} /></div>
          {steps.map(([at, t, s, ic], i) => (
            <Pop key={i} at={at} seed={i}>
              <div style={{width: 380, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, textAlign: 'center'}}>
                <div style={{width: 128, height: 128, borderRadius: 64, background: frame >= at ? C.blue : '#fff', boxShadow: SHADOW, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'}}>
                  <Ico n={ic as never} size={60} color={frame >= at ? '#fff' : C.blue} />
                  <div style={{position: 'absolute', top: -8, right: -8, width: 46, height: 46, borderRadius: 23, background: C.navy, color: '#fff', fontFamily: FD, fontWeight: 700, fontSize: 26, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{i + 1}</div>
                </div>
                <div style={{fontFamily: FD, fontWeight: 700, fontSize: 40, color: C.ink}}>{t}</div>
                <div style={{fontFamily: FU, fontSize: 28, color: C.ink2}}>{s}</div>
              </div>
            </Pop>
          ))}
        </div>
        <Pop at={T('passos', 'dúvida')}><Chip tone="green" size={38}><Ico n="chat" size={34} color={C.green} />Dúvida no caminho? Uma pessoa da Nexools resolve com você.</Chip></Pop>
      </Center>
    </Scene>
  );
};

const Final: React.FC = () => {
  const frame = useCurrentFrame();
  const {from, to} = SEC('final');
  const split = T('final', 'No', 0), two = T('final', 'No', 1), diff = T('final', 'diferença') - 20;
  const choose = progress(frame, two + 20, 40, ease.inOut);
  return (
    <Scene from={from} to={to}>
      {frame < split && (
        <Center style={{gap: 30}}>
          <Kin text="Dezembro de 2027 vai chegar" starts={TS('final', 'dezembro de 2027 vai chegar')} size={100} hl={['2027']} out={split - 10} />
          <Kin text="de qualquer jeito." starts={TS('final', 'de qualquer jeito')} size={70} weight={500} color={C.ink2} out={split - 10} />
        </Center>
      )}
      {frame >= split - 2 && (
        <Center style={{gap: 34}}>
          <div style={{display: 'flex', gap: 50}}>
            <Pop at={split}>
              <Card style={{width: 700, height: 480, padding: '40px 46px', opacity: mix(1, 0.45, choose), transform: `scale(${mix(1, 0.94, choose)})`, filter: `grayscale(${choose})`}}>
                <Chip tone="white" size={30} style={{border: `2px solid ${C.line}`}}>Caminho 1</Chip>
                <div style={{fontFamily: FD, fontWeight: 700, fontSize: 46, color: C.ink, margin: '26px 0 20px'}}>A mesma lista de novo</div>
                {['Aprender inteligência artificial', 'Fazer aquele curso de dados', 'Atualizar meu LinkedIn'].map((l) => (
                  <div key={l} style={{display: 'flex', gap: 18, alignItems: 'center', padding: '12px 0', fontFamily: FD, fontSize: 32, color: C.ink2}}><div style={{width: 34, height: 34, borderRadius: 9, border: '4px solid #B9C2D3'}} />{l}</div>
                ))}
                <div style={{fontFamily: FD, fontSize: 34, fontWeight: 600, color: C.red, marginTop: 10}}>“Ano que vem eu estudo.”</div>
              </Card>
            </Pop>
            <Pop at={two}>
              <Card style={{width: 700, height: 480, padding: '40px 46px', border: `3px solid ${C.blue}`, transform: `scale(${mix(1, 1.04, choose)})`}}>
                <Chip size={30}>Caminho 2</Chip>
                <div style={{fontFamily: FD, fontWeight: 700, fontSize: 46, color: C.ink, margin: '26px 0 20px'}}>Seu LinkedIn com certificados</div>
                <div style={{display: 'flex', gap: 16}}>
                  {[0, 1, 2].map((i) => (
                    <Pop key={i} at={T('final', 'certificados') + i * 8}>
                      <div style={{width: 180, height: 130, borderRadius: 20, background: `linear-gradient(135deg, ${['#2F80FF', '#18B37E', '#9B5BFF'][i]}, #0B162A)`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Ico n="cert" size={58} color="#fff" /></div>
                    </Pop>
                  ))}
                </div>
                <div style={{fontFamily: FD, fontSize: 34, fontWeight: 600, color: C.blue, marginTop: 30}}>O ano em que você decidiu começar.</div>
              </Card>
            </Pop>
          </div>
          <Pop at={diff}><div style={{fontFamily: FD, fontWeight: 700, fontSize: 64, color: C.ink, letterSpacing: '-0.02em'}}>A diferença: <span style={{color: C.blue}}>R$ 0,81 por dia</span></div></Pop>
        </Center>
      )}
    </Scene>
  );
};

const Cta: React.FC = () => {
  const frame = useCurrentFrame();
  const {from, to} = SEC('cta');
  const press = T('cta', 'botão');
  const pr = 1 - 0.05 * Math.max(0, 1 - Math.abs(frame - press - 4) / 5);
  const bob = Math.sin((frame - from) * 0.12) * 12;
  return (
    <Scene from={from} to={to + 120}>
      <Center style={{gap: 40}}>
        <Pop at={from}><Logo height={84} /></Pop>
        <Pop at={from + 10}>
          <div style={{transform: `scale(${pr})`, background: C.blue, color: '#fff', fontFamily: FD, fontWeight: 700, fontSize: 56, padding: '34px 80px', borderRadius: 999, boxShadow: `0 30px 70px -20px ${C.blue}`}}>
            Garantir meu ano · R$ 297
          </div>
        </Pop>
        <Pop at={T('cta', 'embaixo')}><div style={{transform: `translateY(${bob}px)`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, fontFamily: FD, fontWeight: 600, fontSize: 34, color: C.ink}}>Botão aqui embaixo do vídeo<Ico n="arrowDown" size={64} stroke={2.6} /></div></Pop>
        <Pop at={T('cta', 'gente')}><Chip tone="green" size={36}><Ico n="chat" size={34} color={C.green} />A gente se fala no WhatsApp</Chip></Pop>
      </Center>
    </Scene>
  );
};

/* ----------------------------------------------------------------- sound */
const cue = (at: number, n: string, volume: number, why: string): SfxCue => ({at, src: A(n), volume, why});
const buildSfx = (): SfxCue[] => [
  cue(T('golpe', 'golpe'), 'stamp', 0.45, 'carimbo vermelho em "golpe"'),
  cue(T('golpe', 'única') + 20, 'click', 0.35, 'cadeado do loop aberto fecha'),
  cue(T('hook', 'mês') + 2, 'strike', 0.35, 'risca "por mês"'),
  cue(T('hook', 'Uma'), 'pop', 0.4, '"uma vez só"'),
  cue(T('paraquem', 'Se'), 'whoosh', 0.25, 'virada para o convite'),
  cue(T('lista', 'Dezembro'), 'whoosh', 0.25, 'entra a lista'),
  cue(T('lista', 'novembro'), 'pop', 0.35, 'calendário: novembro de novo'),
  cue(T('lista', 'Quantos'), 'impact', 0.3, '"quantos você riscou?"'),
  cue(T('culpa', 'trava') + 10, 'click', 0.35, 'cadeado vermelho fecha'),
  cue(T('travas', 'aposto'), 'click', 0.3, 'as 4 travas fecham'),
  cue(T('trava1', 'mil'), 'tick', 0.3, 'contador do preço oficial'),
  cue(T('trava2', 'para') + 4, 'strike', 0.3, 'para no segundo'),
  cue(T('trava3', 'fim'), 'pop', 0.3, '"sem fim"'),
  cue(T('trava4', 'cai'), 'whoosh_down', 0.35, 'acesso cai'),
  cue(T('desconfianca', 'Passe') + 40, 'chime', 0.35, 'as 3 travas da Nexools fecham'),
  cue(T('sol1', 'Primeira') + 14, 'click', 0.3, 'trava 1'),
  cue(T('sol1', 'coloca'), 'typing', 0.3, 'digitando o nome'),
  cue(T('sol2', 'Segunda') + 14, 'click', 0.3, 'trava 2'),
  cue(T('sol2', 'Pix') + 2, 'tick', 0.3, 'Pix selecionado'),
  cue(T('sol3', 'Terceira') + 14, 'click', 0.3, 'trava 3'),
  cue(T('sol3', 'alguém'), 'pop', 0.35, 'resposta da pessoa real'),
  cue(T('sol4', 'Três') + 16, 'chime', 0.3, '3 travas fechadas'),
  cue(T('porque', 'Nexools') - 24, 'whoosh', 0.25, 'resposta: revendedora'),
  cue(T('imagina', 'aula', 0), 'chime', 0.3, 'aula concluída'),
  cue(T('trilhas', 'Inteligência'), 'pop', 0.25, 'primeira trilha'),
  cue(T('catalogo', 'milhares'), 'whoosh', 0.25, 'catálogo'),
  cue(T('certificado', 'recebe'), 'chime', 0.35, 'certificado no seu nome'),
  cue(T('certificado', 'três'), 'pop', 0.3, 'certificado 3'),
  cue(T('certificado', 'quatro'), 'pop', 0.3, 'certificado 4'),
  cue(T('certificado', 'cinco'), 'pop', 0.3, 'certificado 5'),
  cue(T('conta', 'duzentos', 1) + 4, 'strike', 0.35, 'risca 1.200'),
  cue(T('conta', 'seiscentos') + 4, 'strike', 0.35, 'risca 600'),
  cue(T('conta', 'quatrocentos') + 4, 'strike', 0.35, 'risca 400'),
  cue(T('preco', 'duzentos') - 120, 'riser', 0.35, 'tensão antes do preço'),
  cue(T('preco', 'oitenta'), 'impact', 0.35, 'R$ 0,81 por dia'),
  cue(T('risco', 'isso') - 18, 'click', 0.4, 'o cadeado do começo abre'),
  cue(T('risco', 'mesmo'), 'chime', 0.3, '7 dias de garantia'),
  cue(T('prazo', 'Esse'), 'tick', 0.35, 'prazo'),
  cue(T('passos', 'Clica') + 4, 'click', 0.35, 'clique no botão'),
  cue(T('passos', 'Logo'), 'pop', 0.3, 'acesso chega'),
  cue(T('final', 'No', 1), 'whoosh', 0.25, 'segundo caminho'),
  cue(T('cta', 'botão') + 4, 'click', 0.4, 'botão pressionado'),
];

/* ------------------------------------------------------------------ main */
export const NexoolsVSL: React.FC<{debugSafeArea?: boolean}> = ({debugSafeArea}) => {
  ensureInterDisplay();
  const frame = useCurrentFrame();
  const dark = keyframes(frame, darkKeys());
  const sfx = React.useMemo(buildSfx, []);
  return (
    <AbsoluteFill style={{background: C.paper, overflow: 'hidden'}}>
      <Backdrop dark={dark} />
      <Hook /><Golpe /><ParaQuem /><Lista /><Culpa /><Travas /><Trava1 /><Trava2 /><Trava3 /><Trava4 />
      <Desconfianca /><Sol1 /><Sol2 /><Sol3 /><Sol4 /><Porque /><Imagina /><Trilhas /><Catalogo /><Certificado />
      <Depoimentos /><Conta /><Preco /><Risco /><Prazo /><Passos /><Final /><Cta />
      <div style={{position: 'absolute', left: 56, top: 40, opacity: 0.85 - 0.85 * progress(frame, SEC('cta').from - 20, 20)}}><Logo dark={dark > 0.5} height={38} /></div>
      <Captions dark={dark} />
      <Footer dark={dark} />
      <Html5Audio src={staticFile(VSL.voice)} />
      <MusicBed src={VSL.bed} volume={0.22} total={VSL.total} fadeIn={30} fadeOut={90} />
      <SfxCues cues={sfx} />
      <SafeArea show={debugSafeArea} />
    </AbsoluteFill>
  );
};
