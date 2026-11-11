// C3 · "O motivo é o preço" (Paulo, 23,9 s). Etiqueta de preço → balança pesa → R$ 297 equilibra → café × R$ 0,81 → +R$ 903 → prints reais + WhatsApp → Saiba mais.
import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {Scene} from '../nexools-vsl/kit';
import {AdShell, Tag, Sweep, CTA, D, fr, timing, sfx, Pop, Kin, Ico, FD} from '../nexools-ads/akit';
import {progress, ease, springIn} from '../../lib';
import {Urgency, Zone, Balance, Coffee, Wallet, RealPrints, VagasStamp, pro, RED} from './ckit';
import data from './c3.json';

const {SEC, T, TS, words, total} = timing(data);
export const C3 = {id: 'NexoolsC3Motivo', total: fr(total + 1)};

/** Etiqueta de preço balançando no fio. */
const PriceTag: React.FC<{at: number; revealAt: number}> = ({at, revealAt}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const e = f < at ? 0 : springIn(f, fps, at, 'playful');
  const swing = Math.sin((f - at) * 0.09) * 10 * Math.exp(-(f - at) / 120);
  const r = progress(f, revealAt, 12, ease.out);
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: Math.min(1, e * 1.5), transform: `translateY(${(1 - Math.min(e, 1)) * -200}px)`}}>
      <div style={{width: 4, height: 110, background: '#9AA6BD'}} />
      <div style={{transform: `rotate(${swing}deg)`, transformOrigin: 'top center', width: 520, height: 300, borderRadius: '40px 40px 40px 40px', background: '#fff', border: `5px solid ${D.ink}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', boxShadow: '0 30px 70px -30px rgba(11,22,42,0.5)'}}>
        <div style={{position: 'absolute', top: 24, width: 34, height: 34, borderRadius: 17, border: `5px solid ${D.ink}`}} />
        <div style={{fontFamily: FD, fontWeight: 800, fontSize: 120, color: r > 0 ? RED : D.ink, letterSpacing: '-0.04em', marginTop: 30}}>{r > 0 ? 'PREÇO' : '?'}</div>
      </div>
    </div>
  );
};

const Hook: React.FC = () => {
  const {from, to} = SEC('hook');
  return (
    <Scene from={Math.min(from, 0)} to={to} fadeIn={1}>
      <Zone gap={50}>
        <Kin text="O motivo de muita gente não estudar?" starts={TS('hook', 'o motivo de muita gente nao estudar')} size={92} hl={['motivo']} hlColor={RED} />
        <PriceTag at={8} revealAt={T('hook', 'preço')} />
      </Zone>
    </Scene>
  );
};

/** Peso e preço na mesma cena: a balança despenca com R$ 1.200 e se equilibra com R$ 297. */
const PesoPreco: React.FC = () => {
  const from = SEC('peso').from, to = SEC('preco').to;
  const light = T('preco', 'duzentos');
  return (
    <Scene from={from} to={to}>
      <Zone gap={20}>
        <Kin text="R$ 1.200 por ano pesa." starts={TS('peso', 'perto de mil e duzentos')} size={92} hl={['pesa.']} hlColor={RED} out={light - 16} />
        <Balance at={from + 4} lightAt={light} />
        <Pop at={T('preco', 'Uma')}><Tag size={50}><Ico n="check" size={44} color="#0047D6" />Na Nexools: R$ 297, uma vez só</Tag></Pop>
      </Zone>
    </Scene>
  );
};

const Dia: React.FC = () => {
  const {from, to} = SEC('dia');
  return (
    <Scene from={from} to={to}>
      <Zone gap={50}>
        <Kin text="Menos que um cafezinho." starts={TS('dia', 'menos que um cafezinho')} size={100} hl={['cafezinho.']} hlColor={D.blue} />
        <Coffee at={from + 4} />
        <Pop at={T('dia', 'dia')}><div style={{fontFamily: FD, fontWeight: 700, fontSize: 56, color: D.muted}}>por dia, durante 12 meses</div></Pop>
      </Zone>
    </Scene>
  );
};

const Economia: React.FC = () => {
  const {from, to} = SEC('economia');
  return (
    <Scene from={from} to={to}>
      <Zone gap={40}>
        <Kin text="Você economiza." starts={TS('economia', 'e voce economiza')} size={110} hl={['economiza.']} hlColor="#12A150" />
        <Wallet at={from} amountAt={T('economia', 'novecentos') - 6} />
      </Zone>
    </Scene>
  );
};

const Confianca: React.FC = () => {
  const {from, to} = SEC('confianca');
  return (
    <Scene from={from} to={to}>
      <Zone gap={24}>
        <div style={{display: 'flex', gap: 18}}>
          <Pop at={from}><Tag tone="green" size={40}><Ico n="shield" size={36} color="#0E7A3D" />Conta no seu nome</Tag></Pop>
          <Pop at={T('confianca', 'pessoa')}><Tag tone="green" size={40}><Ico n="chat" size={36} color="#0E7A3D" />Gente de verdade</Tag></Pop>
        </div>
        <RealPrints at={T('confianca', 'pessoa') + 4} />
        <Pop at={T('confianca', 'WhatsApp')}><div style={{fontFamily: FD, fontWeight: 600, fontSize: 34, color: D.muted}}>Mensagens reais de clientes no WhatsApp</div></Pop>
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
        <CTA at={from} press={T('cta', 'Saiba')} sub="12 meses · R$ 297 · pagamento único" />
      </Zone>
    </Scene>
  );
};

const buildSfx = () => [
  pro(2, 'heartbeat', 0.45, 'tensão do problema'),
  sfx(T('hook', 'preço'), 'stamp', 0.45, 'revela: o motivo é o preço'),
  pro(SEC('peso').from + 14, 'sub_drop', 0.5, 'o peso derruba o prato da balança'),
  sfx(T('preco', 'duzentos') - 50, 'riser', 0.3, 'sobe antes da virada'),
  sfx(T('preco', 'duzentos'), 'impact', 0.55, 'R$ 297 equilibra a balança'),
  sfx(SEC('dia').from + 4, 'pop', 0.3, 'entra o café'),
  pro(SEC('economia').from + 10, 'coin', 0.35, 'notas entrando no bolso'),
  sfx(T('economia', 'novecentos'), 'chime', 0.35, '+ R$ 903'),
  pro(T('confianca', 'pessoa') + 4, 'notification', 0.35, 'chegam as mensagens reais'),
  sfx(SEC('cta').from + 4, 'stamp', 0.5, 'carimbo vagas limitadas'),
  sfx(T('cta', 'Saiba'), 'click', 0.5, 'botão pressionado'),
];

export const NexoolsC3: React.FC<{debugSafeArea?: boolean}> = ({debugSafeArea}) => {
  const f = useCurrentFrame();
  const s = React.useMemo(buildSfx, []);
  const tension = 0.8 * (1 - progress(f, T('preco', 'duzentos') - 10, 24, ease.inOut));
  return (
    <AdShell voice="nexools-c5/voice3.mp3" bed="nexools-c5/bed3.wav" total={C3.total} sfx={s} words={words} tension={tension} debugSafeArea={debugSafeArea}>
      <Hook /><PesoPreco /><Dia /><Economia /><Confianca /><Cta />
      <Urgency />
      <Sweep at={T('preco', 'duzentos') - 10} />
    </AdShell>
  );
};

