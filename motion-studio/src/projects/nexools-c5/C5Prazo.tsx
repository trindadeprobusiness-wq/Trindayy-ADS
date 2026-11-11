// C5 · "Até 30 de novembro" (Paulo, 18,7 s). Calendário 30/11 → R$ 297 → R$ 1.200 riscado + R$ 903 → "depois acaba" (relógio) → conta + pagamento único → Saiba mais.
import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Scene} from '../nexools-vsl/kit';
import {AdShell, Tag, Slam, Burst, Sweep, CTA, D, fr, timing, sfx, Pop, Kin, Ico, FD} from '../nexools-ads/akit';
import {progress, ease, mix} from '../../lib';
import {Urgency, Zone, OfficialCard, Calendar, VagasStamp, pro, RED} from './ckit';
import data from './c5.json';

const {SEC, T, TS, words, total} = timing(data);
export const C5 = {id: 'NexoolsC5Prazo', total: fr(total + 1)};

const Hook: React.FC = () => {
  const f = useCurrentFrame();
  const {to} = SEC('hook');
  const slam = T('hook', 'duzentos');
  const up = progress(f, slam - 30, 24, ease.inOut);
  return (
    <Scene from={0} to={to} fadeIn={1}>
      <Zone gap={20}>
        <div style={{transform: `scale(${mix(1, 0.6, up)})`, marginBottom: mix(0, -90, up), marginTop: mix(0, -90, up)}}><Calendar at={Math.max(2, T('hook', 'trinta') - 6)} /></div>
        <Slam at={slam} size={290}><span style={{fontSize: 110, verticalAlign: '0.95em', color: D.blue, marginRight: 14}}>R$</span>297</Slam>
        <Pop at={T('hook', 'Coursera')}><Tag size={46}>1 ano de Coursera Plus</Tag></Pop>
      </Zone>
      <Burst at={slam + 4} y={980} />
    </Scene>
  );
};

const Oficial: React.FC = () => {
  const {from, to} = SEC('oficial');
  const nove = T('oficial', 'novecentos');
  return (
    <Scene from={from} to={to}>
      <Zone gap={40}>
        <Pop at={from}><OfficialCard countAt={from + 4} countDur={Math.max(20, T('oficial', 'mil') - from)} strikeAt={T('oficial', 'mil') + 30} /></Pop>
        <Pop at={nove - 6}><div style={{fontFamily: FD, fontWeight: 800, fontSize: 96, color: '#12A150', letterSpacing: '-0.04em'}}>+ de R$ 900</div></Pop>
        <Pop at={T('oficial', 'diferença')}><div style={{fontFamily: FD, fontWeight: 700, fontSize: 52, color: D.muted}}>de diferença</div></Pop>
      </Zone>
    </Scene>
  );
};

/** Relógio com ponteiro correndo: o prazo acaba. */
const Clock: React.FC<{at: number}> = ({at}) => {
  const f = useCurrentFrame();
  const a = (f - at) * 6;
  const p = progress(f, at, 14, ease.out);
  return (
    <svg width={360} height={360} viewBox="0 0 100 100" style={{opacity: p, transform: `scale(${mix(0.85, 1, p)})`}}>
      <circle cx={50} cy={50} r={44} fill="#fff" stroke={RED} strokeWidth={5} />
      {Array.from({length: 12}, (_, i) => <line key={i} x1={50} y1={10} x2={50} y2={16} stroke={D.ink} strokeWidth={2} transform={`rotate(${i * 30} 50 50)`} />)}
      <line x1={50} y1={50} x2={50} y2={22} stroke={D.ink} strokeWidth={4} strokeLinecap="round" transform={`rotate(${a} 50 50)`} />
      <line x1={50} y1={50} x2={50} y2={30} stroke={RED} strokeWidth={4} strokeLinecap="round" transform={`rotate(${a / 12 + 300} 50 50)`} />
      <circle cx={50} cy={50} r={4} fill={D.ink} />
    </svg>
  );
};

const Prazo: React.FC = () => {
  const {from, to} = SEC('prazo');
  return (
    <Scene from={from} to={to}>
      <Zone gap={40}>
        <Clock at={from} />
        <Kin text="Depois do dia 30, acaba." starts={TS('prazo', 'depois do dia trinta essa')} size={104} hl={['acaba.']} hlColor={RED} />
      </Zone>
    </Scene>
  );
};

const Conta: React.FC = () => {
  const {from, to} = SEC('conta');
  return (
    <Scene from={from} to={to}>
      <Zone gap={30}>
        <Pop at={from}><Tag tone="green" size={60}><Ico n="shield" size={54} color="#0E7A3D" />Conta no seu nome</Tag></Pop>
        <Pop at={T('conta', 'pagamento')}><Tag tone="blue" size={60}><Ico n="check" size={54} color="#0047D6" />Pagamento único</Tag></Pop>
      </Zone>
    </Scene>
  );
};

const Cta: React.FC = () => {
  const {from, to} = SEC('cta');
  return (
    <Scene from={from} to={to + 90}>
      <Zone gap={44}>
        <VagasStamp at={from + 4} />
        <CTA at={from} press={T('cta', 'Saiba')} sub="Até 30/11 · R$ 297 · pagamento único" />
        <Pop at={T('cta', 'enquanto')}><div style={{fontFamily: FD, fontWeight: 700, fontSize: 48, color: RED}}>enquanto ainda dá</div></Pop>
      </Zone>
    </Scene>
  );
};

const buildSfx = () => [
  pro(Math.max(2, T('hook', 'trinta') - 6), 'page_flip', 0.4, 'calendário vira para 30/11'),
  pro(20, 'clock_tick', 0.3, 'prazo correndo'),
  sfx(T('hook', 'duzentos') - 50, 'riser', 0.3, 'sobe antes do preço'),
  sfx(T('hook', 'duzentos'), 'impact', 0.6, 'R$ 297 bate na tela'),
  sfx(T('oficial', 'mil') + 30, 'strike', 0.35, 'risca o preço oficial'),
  sfx(T('oficial', 'novecentos') - 6, 'chime', 0.35, '+ de R$ 900'),
  pro(SEC('prazo').from, 'heartbeat', 0.5, 'tensão: depois acaba'),
  pro(SEC('prazo').from + 30, 'clock_tick', 0.35, 'ponteiro correndo'),
  pro(SEC('conta').from, 'lock_click', 0.4, 'conta no seu nome'),
  sfx(SEC('cta').from + 4, 'stamp', 0.5, 'carimbo vagas limitadas'),
  sfx(T('cta', 'Saiba'), 'click', 0.5, 'botão pressionado'),
];

export const NexoolsC5: React.FC<{debugSafeArea?: boolean}> = ({debugSafeArea}) => {
  const f = useCurrentFrame();
  const s = React.useMemo(buildSfx, []);
  const p = SEC('prazo');
  const tension = 0.8 * progress(f, p.from - 10, 16, ease.inOut) * (1 - progress(f, p.to - 6, 16, ease.inOut)) + 0.4 * (1 - progress(f, T('hook', 'duzentos') - 10, 20, ease.inOut));
  return (
    <AdShell voice="nexools-c5/voice5.mp3" bed="nexools-c5/bed5.wav" total={C5.total} sfx={s} words={words} tension={tension} debugSafeArea={debugSafeArea}>
      <Hook /><Oficial /><Prazo /><Conta /><Cta />
      <Urgency />
      <Sweep at={SEC('oficial').from - 10} />
    </AdShell>
  );
};
