// C1 · "Antes de assinar, presta atenção" (Paulo, 27,7 s). Tensão → R$ 1.200 → R$ 297 → +R$ 903 no bolso → conta sua → pagamento único → Saiba mais.
import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Scene} from '../nexools-vsl/kit';
import {AdShell, Glass, Tag, Slam, Burst, Sweep, CTA, D, fr, timing, sfx, Pop, Kin, Ico, Strike, FD} from '../nexools-ads/akit';
import {progress, ease, mix} from '../../lib';
import {Urgency, Zone, OfficialCard, Wallet, SharedVsOwn, VagasStamp, pro, RED} from './ckit';
import data from './c1.json';

const {SEC, T, TS, words, total} = timing(data);
export const C1 = {id: 'NexoolsC1Atencao', total: fr(total + 1)};

const Hook: React.FC = () => {
  const f = useCurrentFrame();
  const {from, to} = SEC('hook');
  const stop = T('hook', 'presta');
  const cur = progress(f, 6, Math.max(1, stop - 12), ease.inOut);
  const freeze = f >= stop;
  const ring = progress(f, stop, 30, ease.out);
  return (
    <Scene from={Math.min(from, 0)} to={to} fadeIn={1}>
      <Zone gap={60}>
        <Kin text="Vai assinar o Coursera Plus?" starts={TS('hook', 'se voce esta pensando')} size={104} hl={['Coursera', 'Plus?']} hlColor={D.blue} />
        <div style={{position: 'relative'}}>
          <div style={{padding: '40px 90px', borderRadius: 999, background: freeze ? '#fff' : D.blue, color: freeze ? RED : '#fff', border: `4px solid ${freeze ? RED : D.blue}`,
            fontFamily: FD, fontWeight: 800, fontSize: 64, boxShadow: '0 24px 50px -20px rgba(0,71,214,0.6)'}}>Assinar agora</div>
          {freeze && <div style={{position: 'absolute', inset: -16 - ring * 40, borderRadius: 999, border: `5px solid ${RED}`, opacity: 1 - ring}} />}
          <svg width={90} height={90} viewBox="0 0 24 24" style={{position: 'absolute', left: mix(620, 330, cur), top: mix(320, 70, cur) + Math.sin(cur * Math.PI) * -60}}>
            <path d="M4 2l16 10-7 1.5L10 21z" fill={D.ink} stroke="#fff" strokeWidth={1.4} />
          </svg>
        </div>
        <div style={{minHeight: 110}}><Kin text="Presta atenção antes." starts={TS('hook', 'presta atencao antes')} size={96} hl={['atenção']} hlColor={RED} /></div>
      </Zone>
    </Scene>
  );
};

const Oficial: React.FC = () => {
  const {from, to} = SEC('oficial');
  return (
    <Scene from={from} to={to}>
      <Zone gap={40}>
        <Pop at={from}><Tag tone="red" size={44}><Ico n="globe" size={40} color="#C9323A" />Site oficial</Tag></Pop>
        <Pop at={from + 6}><OfficialCard countAt={from + 10} countDur={Math.max(20, T('oficial', 'mil') - from)} /></Pop>
        <Pop at={T('oficial', 'reais')}><div style={{fontFamily: FD, fontWeight: 700, fontSize: 64, color: D.ink}}>por um ano.</div></Pop>
      </Zone>
    </Scene>
  );
};

const Preco: React.FC = () => {
  const f = useCurrentFrame();
  const {from, to} = SEC('preco');
  const slam = T('preco', 'duzentos');
  const shrink = progress(f, from, 20, ease.inOut);
  return (
    <Scene from={from} to={to}>
      <Zone gap={34}>
        <div style={{transform: `scale(${mix(1, 0.62, shrink)})`, opacity: mix(1, 0.8, shrink), marginBottom: -110}}>
          <OfficialCard countAt={-100} countDur={1} strikeAt={from + 10} />
        </div>
        <Pop at={T('preco', 'Nexools')}><Tag size={46}>Aqui na Nexools</Tag></Pop>
        <Slam at={slam} size={300}><span style={{fontSize: 110, verticalAlign: '0.95em', color: D.blue, marginRight: 14}}>R$</span>297</Slam>
        <Pop at={slam + 20}><div style={{fontFamily: FD, fontWeight: 700, fontSize: 52, color: D.muted}}>o mesmo ano</div></Pop>
      </Zone>
      <Burst at={slam + 4} y={900} />
    </Scene>
  );
};

const Economia: React.FC = () => {
  const {from, to} = SEC('economia');
  return (
    <Scene from={from} to={to}>
      <Zone gap={40}>
        <Kin text="Fica no seu bolso." starts={TS('economia', 'ficam no seu bolso')} size={100} hl={['bolso.']} hlColor="#12A150" />
        <Wallet at={from} amountAt={T('economia', 'novecentos') - 6} />
      </Zone>
    </Scene>
  );
};

const Conta: React.FC = () => {
  const {from, to} = SEC('conta');
  return (
    <Scene from={from} to={to}>
      <Zone gap={50}>
        <Kin text="A conta é sua." starts={TS('conta', 'a conta e sua')} size={110} hl={['sua.']} hlColor={D.blue} />
        <SharedVsOwn at={T('conta', 'compartilhada') - 14} ownAt={T('conta', 'sua')} />
      </Zone>
    </Scene>
  );
};

const Pagamento: React.FC = () => {
  const {from, to} = SEC('pagamento');
  const pix = T('pagamento', 'Pix'), card = T('pagamento', 'cartão'), ren = T('pagamento', 'renovação');
  return (
    <Scene from={from} to={to}>
      <Zone gap={40}>
        <Kin text="Um pagamento só." starts={TS('pagamento', 'um pagamento so')} size={110} hl={['só.']} hlColor={D.blue} />
        <div style={{display: 'flex', gap: 26}}>
          {([['Pix', pix, 'pix'], ['Cartão', card, 'card']] as const).map(([l, at, ic]) => (
            <Pop key={l} at={at}><Glass style={{width: 400, height: 170, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, fontFamily: FD, fontWeight: 700, fontSize: 56, color: D.ink}}><Ico n={ic} size={56} color={D.blue} />{l}</Glass></Pop>
          ))}
        </div>
        <Pop at={ren - 10}><div style={{fontFamily: FD, fontWeight: 700, fontSize: 60, color: D.ink}}><span style={{color: D.muted, fontWeight: 500, marginRight: 18}}>sem</span><Strike at={ren + 8} color={RED}>renovação automática</Strike></div></Pop>
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
        <Pop at={T('cta', 'confere')}><Tag tone="ghost" size={38}><Ico n="check" size={34} color={D.blue} />Confere antes de decidir</Tag></Pop>
      </Zone>
    </Scene>
  );
};

const buildSfx = () => [
  pro(2, 'heartbeat', 0.45, 'tensão: a pessoa está prestes a pagar caro'),
  sfx(T('hook', 'presta'), 'stamp', 0.45, 'o cursor trava: presta atenção'),
  sfx(T('oficial', 'mil') - 20, 'tick', 0.3, 'contador do preço oficial'),
  sfx(SEC('preco').from + 10, 'strike', 0.4, 'risca R$ 1.200'),
  sfx(T('preco', 'duzentos') - 60, 'riser', 0.3, 'sobe antes da virada'),
  sfx(T('preco', 'duzentos'), 'impact', 0.6, 'R$ 297 bate na tela'),
  pro(SEC('economia').from + 10, 'coin', 0.35, 'notas entrando no bolso'),
  sfx(T('economia', 'novecentos'), 'chime', 0.35, '+ R$ 903'),
  sfx(T('conta', 'compartilhada') + 4, 'strike', 0.35, 'risca a conta compartilhada'),
  pro(T('conta', 'sua') + 14, 'lock_click', 0.45, 'cadeado da sua conta fecha'),
  sfx(T('pagamento', 'Pix'), 'click', 0.35, 'Pix'),
  sfx(T('pagamento', 'cartão'), 'click', 0.3, 'cartão'),
  sfx(T('pagamento', 'renovação') + 8, 'strike', 0.35, 'sem renovação'),
  sfx(SEC('cta').from + 4, 'stamp', 0.5, 'carimbo vagas limitadas'),
  sfx(T('cta', 'Saiba'), 'click', 0.5, 'botão pressionado'),
];

export const NexoolsC1: React.FC<{debugSafeArea?: boolean}> = ({debugSafeArea}) => {
  const f = useCurrentFrame();
  const s = React.useMemo(buildSfx, []);
  const tension = 0.8 * (1 - progress(f, SEC('preco').from - 10, 24, ease.inOut));
  return (
    <AdShell voice="nexools-c5/voice1.mp3" bed="nexools-c5/bed1.wav" total={C1.total} sfx={s} words={words} tension={tension} debugSafeArea={debugSafeArea}>
      <Hook /><Oficial /><Preco /><Economia /><Conta /><Pagamento /><Cta />
      <Urgency />
      <Sweep at={SEC('preco').from - 10} />
    </AdShell>
  );
};
