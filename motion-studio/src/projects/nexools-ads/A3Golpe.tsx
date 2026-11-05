// A3 · "É golpe?" (Diego, 30,7 s): objeção de frente → quem somos → conta no seu nome → fale antes de pagar → 7 dias (CDC) → Saiba mais · até 30/11.
import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {Scene} from '../nexools-vsl/kit';
import {AdShell, Stage, Glass, Tag, Burst, CTA, D, GLOW, fr, timing, sfx, Pop, Kin, Ico, Lock, Logo, FD, FU} from './akit';
import {progress, ease, mix, springIn, keyframes} from '../../lib';
import data from './a3.json';

const {SEC, T, TS, words, total} = timing(data);
export const A3 = {id: 'NexoolsAdA3', total: fr(total + 1)};
const W = '#fff';

/** Many "é golpe?" messages surround the headline (overwhelm / close-in). */
const BUBBLES: [number, number, number][] = [[80, 300, -6], [640, 290, 5], [40, 1010, 4], [620, 1060, -4], [330, 1150, 2]];
const Golpe: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const {to} = SEC('golpe');
  const stamp = springIn(frame, fps, T('golpe', 'golpe'), 'snappy');
  const msgs = T('golpe', 'pergunta');
  const calm = progress(frame, T('golpe', 'justa') - 10, 30, ease.inOut);
  return (
    <Scene from={0} to={to} fadeIn={1}>
      {BUBBLES.map(([x, y, r], i) => {
        const at = msgs + i * 6;
        const e = frame < at ? 0 : springIn(frame, fps, at, 'snappy');
        return (
          <div key={i} style={{position: 'absolute', left: x, top: y, transform: `rotate(${r}deg) scale(${mix(0.6, 1, Math.min(e, 1.05))})`, opacity: Math.min(1, e * 2) * mix(1, 0.15, calm)}}>
            <div style={{background: 'rgba(255,255,255,0.1)', border: `1.5px solid ${D.line}`, borderRadius: 30, padding: '20px 30px', fontFamily: FU, fontSize: 38, color: W}}>É golpe?</div>
          </div>
        );
      })}
      <Stage gap={30}>
        <div style={{position: 'relative'}}>
          <Kin text="É golpe?" starts={[4, 10]} size={200} color={W} />
          <div style={{position: 'absolute', inset: '-14px -44px', border: `10px solid ${D.red}`, borderRadius: 30, opacity: Math.min(1, stamp),
            transform: `rotate(-5deg) scale(${mix(1.7, 1, Math.min(stamp, 1.05))})`, boxShadow: GLOW(D.red, 26)}} />
        </div>
        <Pop at={msgs}><Tag tone="ghost" size={44}>A pergunta que mais recebemos</Tag></Pop>
        <Pop at={T('golpe', 'ela') - 8}><div style={{fontFamily: FD, fontWeight: 700, fontSize: 96, color: D.blue, textShadow: GLOW(D.blue, 30)}}>E ela é justa.</div></Pop>
      </Stage>
    </Scene>
  );
};

const Quem: React.FC = () => {
  const {from, to} = SEC('quem');
  return (
    <Scene from={from} to={to}>
      <Stage gap={36}>
        <Pop at={from}><Glass glow={D.blue} style={{padding: '50px 60px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24}}>
          <Logo height={84} /><div style={{fontFamily: FD, fontWeight: 700, fontSize: 60, color: W}}>Revendedora independente</div>
        </Glass></Pop>
        <Pop at={T('quem', 'Coursera')}><Tag tone="red" size={46}><Ico n="x" size={40} color="#FF8A95" stroke={2.8} />Não somos o Coursera</Tag></Pop>
        <Pop at={T('quem', 'fala')}><Tag tone="red" size={46}><Ico n="x" size={40} color="#FF8A95" stroke={2.8} />Não falamos em nome dele</Tag></Pop>
      </Stage>
    </Scene>
  );
};

const Conta: React.FC = () => {
  const frame = useCurrentFrame();
  const {from, to} = SEC('conta');
  const pw = T('conta', 'troca');
  return (
    <Scene from={from} to={to}>
      <Stage gap={34}>
        <Kin text="A conta vem no seu nome." starts={TS('conta', 'a conta vem no seu nome')} size={104} color={W} hl={['nome.']} hlColor={D.blue} />
        <Pop at={T('conta', 'conta') + 10}>
          <Glass glow={D.blue} style={{width: 860, padding: '44px 50px'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 22}}>
              <div style={{width: 96, height: 96, borderRadius: 48, background: 'rgba(61,139,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Ico n="user" size={54} color={D.ice} /></div>
              <div><div style={{fontFamily: FD, fontWeight: 700, fontSize: 48, color: W}}>Seu nome</div><div style={{fontFamily: FU, fontSize: 28, color: D.muted}}>conta individual</div></div>
              <div style={{marginLeft: 'auto'}}><Lock size={84} color={D.green} closeAt={pw + 30} /></div>
            </div>
            <div style={{marginTop: 28, height: 88, borderRadius: 22, border: `2px solid ${frame >= pw ? D.green : D.line}`, display: 'flex', alignItems: 'center', padding: '0 28px', fontFamily: FD, fontSize: 40, fontWeight: 600, color: W}}>
              {frame < pw ? 'Senha provisória' : <>Nova senha {'•'.repeat(Math.min(8, Math.floor((frame - pw) / 5)))}<span style={{marginLeft: 'auto'}}>{frame > pw + 40 && <Ico n="check" size={44} color={D.green} stroke={3} />}</span></>}
            </div>
          </Glass>
        </Pop>
        <Pop at={T('conta', 'primeiro')}><Tag tone="green" size={44}>Troca a senha no primeiro acesso</Tag></Pop>
      </Stage>
    </Scene>
  );
};

const Antes: React.FC = () => {
  const frame = useCurrentFrame();
  const {from, to} = SEC('antes');
  const q = T('antes', 'pergunta');
  const typing = frame > q - 30 && frame < q + 20;
  return (
    <Scene from={from} to={to}>
      <Stage gap={30}>
        <Kin text="Antes de pagar:" starts={TS('antes', 'antes de pagar')} size={110} color={W} hl={['pagar:']} hlColor={D.blue} />
        <Pop at={T('antes', 'fala')}>
          <Glass style={{width: 880, overflow: 'hidden'}}>
            <div style={{height: 120, background: '#0A2A1C', display: 'flex', alignItems: 'center', gap: 22, padding: '0 34px'}}>
              <div style={{width: 72, height: 72, borderRadius: 36, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FD, fontWeight: 800, color: D.blueDeep, fontSize: 38}}>N</div>
              <div><div style={{fontFamily: FD, fontWeight: 700, fontSize: 40, color: W}}>Pessoa real · Nexools</div><div style={{fontFamily: FU, fontSize: 26, color: '#7DF0B0'}}>online · via WhatsApp</div></div>
            </div>
            <div style={{padding: 34, display: 'flex', flexDirection: 'column', gap: 18}}>
              <Pop at={T('antes', 'verdade')} dx={40} dy={0}><div style={{display: 'flex', justifyContent: 'flex-end'}}><div style={{maxWidth: 640, background: '#1E5A3C', borderRadius: 30, padding: '22px 30px', fontFamily: FU, fontSize: 36, color: W}}>A conta é só minha mesmo?</div></div></Pop>
              {typing && <div style={{width: 130, height: 62, borderRadius: 31, background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10}}>
                {[0, 1, 2].map((i) => <span key={i} style={{width: 14, height: 14, borderRadius: 7, background: W, opacity: 0.3 + 0.7 * Math.max(0, Math.sin(frame * 0.22 - i))}} />)}</div>}
              <Pop at={q + 20} dx={-40} dy={0}><div style={{maxWidth: 680, background: 'rgba(255,255,255,0.1)', borderRadius: 30, padding: '22px 30px', fontFamily: FU, fontSize: 36, color: W}}>É sim! Você troca a senha e coloca seu nome. Pergunta o que quiser.</div></Pop>
            </div>
          </Glass>
        </Pop>
      </Stage>
    </Scene>
  );
};

const Garantia: React.FC = () => {
  const frame = useCurrentFrame();
  const {from, to} = SEC('garantia');
  const ring = progress(frame, T('garantia', 'sete') - 6, 40, ease.inOut);
  const r = 220, L = 2 * Math.PI * r;
  return (
    <Scene from={from} to={to}>
      <Stage gap={34}>
        <div style={{position: 'relative', width: 520, height: 520}}>
          <svg width={520} height={520} style={{position: 'absolute', inset: 0, transform: 'rotate(-90deg)', filter: `drop-shadow(0 0 18px ${D.green})`}}>
            <circle cx={260} cy={260} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={18} />
            <circle cx={260} cy={260} r={r} fill="none" stroke={D.green} strokeWidth={18} strokeLinecap="round" strokeDasharray={`${L * ring} ${L}`} />
          </svg>
          <Pop at={T('garantia', 'sete')} style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <div style={{fontFamily: FD, fontWeight: 700, fontSize: 260, color: W, lineHeight: 0.9}}>7</div>
            <div style={{fontFamily: FD, fontWeight: 700, fontSize: 64, color: W}}>dias</div>
          </Pop>
        </div>
        <Pop at={T('garantia', 'desistir')}><div style={{fontFamily: FD, fontWeight: 700, fontSize: 72, color: W}}>para desistir</div></Pop>
        <Pop at={T('garantia', 'Código')}><Tag tone="green" size={40}><Ico n="shield" size={38} color="#7DF0B0" />Código de Defesa do Consumidor</Tag></Pop>
      </Stage>
    </Scene>
  );
};

const Cta: React.FC = () => {
  const {from, to} = SEC('cta');
  return (
    <Scene from={from} to={to + 90}>
      <Stage gap={40}>
        <Kin text="Ainda ficou com dúvida?" starts={TS('cta', 'ainda ficou com duvida')} size={90} color={W} />
        <CTA at={T('cta', 'Toca') - 4} press={T('cta', 'Saiba')} />
        <Pop at={T('cta', 'condição')}><Tag tone="red" size={44}><Ico n="calendar" size={40} color="#FF8A95" />Condição até 30 de novembro</Tag></Pop>
      </Stage>
    </Scene>
  );
};

const buildSfx = () => [
  sfx(T('golpe', 'golpe'), 'stamp', 0.6, 'carimbo "é golpe?"'),
  sfx(T('golpe', 'pergunta'), 'pop', 0.3, 'mensagens chegando'),
  sfx(T('golpe', 'pergunta') + 18, 'pop', 0.25, 'mensagens chegando'),
  sfx(T('golpe', 'justa'), 'chime', 0.35, 'virada: "ela é justa"'),
  sfx(SEC('quem').from, 'whoosh', 0.35, 'entra a Nexools'),
  sfx(T('quem', 'Coursera'), 'strike', 0.3, 'não somos o Coursera'),
  sfx(T('conta', 'troca') + 30, 'click', 0.4, 'cadeado fecha'),
  sfx(T('antes', 'verdade'), 'pop', 0.3, 'pergunta enviada'),
  sfx(T('antes', 'pergunta') + 20, 'pop', 0.35, 'resposta da pessoa real'),
  sfx(T('garantia', 'sete') - 6, 'riser', 0.25, 'anel da garantia'),
  sfx(T('garantia', 'sete'), 'impact', 0.45, '7 dias'),
  sfx(T('cta', 'Saiba'), 'click', 0.5, 'botão pressionado'),
  sfx(T('cta', 'condição'), 'tick', 0.35, 'prazo'),
];

export const NexoolsAdA3: React.FC<{debugSafeArea?: boolean}> = ({debugSafeArea}) => {
  const frame = useCurrentFrame();
  const s = React.useMemo(buildSfx, []);
  const tension = keyframes(frame, [{at: 0, value: 0.8}, {at: T('golpe', 'justa') - 10, value: 0.8}, {at: T('golpe', 'justa') + 20, value: 0}]);
  return (
    <AdShell voice="nexools-ads/voice3.mp3" bed="nexools-ads/bed3.wav" total={A3.total} sfx={s} words={words} tension={tension} debugSafeArea={debugSafeArea}>
      <Golpe /><Quem /><Conta /><Antes /><Garantia /><Cta />
      <Burst at={T('garantia', 'sete') + 34} y={760} color={D.green} />
    </AdShell>
  );
};
