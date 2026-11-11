// C2 · "A maioria paga o preço cheio" (Paulo, 25,5 s). Recibo de preço cheio → a conta (−R$ 903) → um quarto do preço → mesmos 12 meses + certificado → Saiba mais.
import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Scene} from '../nexools-vsl/kit';
import {AdShell, Tag, Sweep, CTA, D, fr, timing, sfx, Pop, Kin, Ico, CourseraMark, FD, FU} from '../nexools-ads/akit';
import {progress, ease, mix} from '../../lib';
import {Urgency, Zone, Calc, QuarterBars, CourseWall, Brands, Certificate, VagasStamp, pro, RED} from './ckit';
import data from './c2.json';

const {SEC, T, TS, words, total} = timing(data);
export const C2 = {id: 'NexoolsC2Maioria', total: fr(total + 1)};
const NAMES = ['Machine Learning', 'Python', 'Análise de Dados', 'Liderança', 'Cloud Computing', 'Prompt Engineering', 'Excel Avançado', 'SQL Essencial', 'Gestão Ágil', 'Power BI', 'IA Generativa', 'UX Design'];

/** Recibo que imprime o preço cheio e leva o carimbo. */
const Receipt: React.FC<{at: number; stampAt: number}> = ({at, stampAt}) => {
  const f = useCurrentFrame();
  const p = progress(f, at, 40, ease.out);
  const s = progress(f, stampAt, 10, ease.out);
  const line = (a: string, b: string, bold?: boolean) => (
    <div style={{display: 'flex', justifyContent: 'space-between', fontFamily: '"JetBrains Mono", monospace', fontSize: 34, color: D.ink, fontWeight: bold ? 700 : 500, padding: '8px 0'}}><span>{a}</span><span>{b}</span></div>
  );
  return (
    <div style={{width: 640, height: 560, overflow: 'hidden', position: 'relative'}}>
      <div style={{position: 'absolute', left: 0, right: 0, top: 0, background: '#fff', padding: '40px 46px', borderRadius: '16px 16px 0 0', boxShadow: '0 30px 70px -30px rgba(11,22,42,0.45)',
        transform: `translateY(${mix(-560, 0, p)}px)`}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18}}><CourseraMark size={40} color={D.ink} /><span style={{fontFamily: FD, fontWeight: 700, fontSize: 34, color: D.ink}}>Coursera Plus</span></div>
        {line('Plano anual', '12 meses')}
        {line('Site oficial', '')}
        <div style={{borderTop: '3px dashed #B8C2D6', margin: '14px 0'}} />
        {line('TOTAL', '≈ R$ 1.200', true)}
        <div style={{height: 90}} />
      </div>
      {f >= stampAt && (
        <div style={{position: 'absolute', left: 140, top: 390, transform: `rotate(-10deg) scale(${mix(1.8, 1, s)})`, opacity: s, padding: '14px 30px', border: `6px solid ${RED}`, borderRadius: 16,
          fontFamily: FD, fontWeight: 800, fontSize: 60, color: RED, letterSpacing: '0.06em', background: 'rgba(253,236,236,0.85)'}}>PREÇO CHEIO</div>
      )}
    </div>
  );
};

const Hook: React.FC = () => {
  const {from, to} = SEC('hook');
  return (
    <Scene from={Math.min(from, 0)} to={to} fadeIn={1}>
      <Zone gap={40}>
        <Kin text="A maioria paga o preço cheio." starts={TS('hook', 'a maioria das pessoas paga')} size={100} hl={['cheio.']} hlColor={RED} />
        <Receipt at={6} stampAt={T('hook', 'cheio')} />
        <Pop at={T('hook', 'porque')}><div style={{fontFamily: FD, fontWeight: 600, fontSize: 50, color: D.muted, textAlign: 'center'}}>…porque nem sabe que dá pra pagar menos.</div></Pop>
      </Zone>
    </Scene>
  );
};

const Conta: React.FC = () => {
  const {from, to} = SEC('conta');
  return (
    <Scene from={from} to={to}>
      <Zone gap={44}>
        <Kin text="Faz a conta comigo." starts={TS('conta', 'faz a conta comigo')} size={100} hl={['conta']} hlColor={D.blue} />
        <Calc rows={[{at: T('conta', 'mil') - 10, label: 'Site oficial (1 ano)', value: 'R$ 1.200'}, {at: T('conta', 'Nexools') - 4, label: 'Na Nexools', value: '− R$ 297', tone: 'blue'}]}
          resultAt={to - 34} />
      </Zone>
    </Scene>
  );
};

const Quarto: React.FC = () => {
  const {from, to} = SEC('quarto');
  return (
    <Scene from={from} to={to}>
      <Zone gap={60}>
        <Kin text="Cerca de um quarto do preço." starts={TS('quarto', 'cerca de um quarto do preco')} size={96} hl={['quarto']} hlColor={D.blue} />
        <QuarterBars at={from} quarterAt={T('quarto', 'quarto') - 6} />
      </Zone>
    </Scene>
  );
};

const Produto: React.FC = () => {
  const f = useCurrentFrame();
  const {from, to} = SEC('produto');
  const cert = T('produto', 'certificado');
  return (
    <Scene from={from} to={to} push={0.02}>
      <CourseWall from={from} to={to} names={NAMES} opacity={0.22} />
      <div style={{position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 46%, ${D.bg}F2 0%, ${D.bg}C0 50%, ${D.bg}30 85%)`}} />
      {f < cert - 4 && (
        <Zone gap={40}>
          <Pop at={from}><Tag size={52}><Ico n="calendar" size={46} color="#0047D6" />Os mesmos 12 meses</Tag></Pop>
          <Pop at={T('produto', 'milhares')}><div style={{fontFamily: FD, fontWeight: 800, fontSize: 104, color: D.ink, letterSpacing: '-0.04em', textAlign: 'center'}}>milhares de cursos</div></Pop>
          <Brands ats={['Google', 'IBM', 'Meta', 'Stanford'].map((n) => T('produto', n))} />
        </Zone>
      )}
      {f >= cert - 4 && (
        <Zone gap={30}>
          <Pop at={cert}><Certificate lineAt={T('produto', 'nome')} /></Pop>
          <Pop at={T('produto', 'programas')}><div style={{fontFamily: FU, fontSize: 34, color: D.muted}}>certificado nos programas incluídos</div></Pop>
        </Zone>
      )}
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
  pro(1, 'tension_stinger', 0.35, 'abre com tensão: paga caro sem saber'),
  pro(10, 'typing_burst', 0.3, 'recibo imprimindo'),
  sfx(T('hook', 'cheio'), 'stamp', 0.5, 'carimbo preço cheio'),
  sfx(T('conta', 'mil') - 10, 'pop', 0.3, 'linha do preço oficial'),
  sfx(T('conta', 'Nexools') - 4, 'pop', 0.3, 'linha da Nexools'),
  sfx(SEC('conta').to - 34, 'impact', 0.55, 'resultado: R$ 903'),
  sfx(T('quarto', 'quarto') - 6, 'whoosh', 0.35, 'barra encolhe para um quarto'),
  sfx(SEC('produto').from, 'whoosh', 0.3, 'entra o catálogo'),
  sfx(T('produto', 'Google'), 'pop', 0.25, 'marcas aparecem'),
  sfx(T('produto', 'certificado'), 'chime', 0.4, 'certificado no seu nome'),
  sfx(SEC('cta').from + 4, 'stamp', 0.5, 'carimbo vagas limitadas'),
  sfx(T('cta', 'Saiba'), 'click', 0.5, 'botão pressionado'),
];

export const NexoolsC2: React.FC<{debugSafeArea?: boolean}> = ({debugSafeArea}) => {
  const f = useCurrentFrame();
  const s = React.useMemo(buildSfx, []);
  const tension = 0.75 * (1 - progress(f, T('conta', 'Nexools') - 10, 24, ease.inOut));
  return (
    <AdShell voice="nexools-c5/voice2.mp3" bed="nexools-c5/bed2.wav" total={C2.total} sfx={s} words={words} tension={tension} debugSafeArea={debugSafeArea}>
      <Hook /><Conta /><Quarto /><Produto /><Cta />
      <Urgency />
      <Sweep at={SEC('produto').from - 10} />
    </AdShell>
  );
};
