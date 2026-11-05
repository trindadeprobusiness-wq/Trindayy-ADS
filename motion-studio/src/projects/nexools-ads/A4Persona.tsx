// A4 · Persona analista administrativo (Aline, 24,7 s): crachá → o mercado pede → IA/Excel/dados/gestão → cursos + certificado → R$ 297 → R$ 0,81/dia → Saiba mais.
import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {Scene} from '../nexools-vsl/kit';
import {AdShell, Stage, Glass, Tag, Slam, Burst, Sweep, CTA, D, GLOW, fr, timing, sfx, Pop, Ico, CourseraMark, FD, FU} from './akit';
import {progress, ease, mix, springIn} from '../../lib';
import data from './a4.json';

const {SEC, T, words, total} = timing(data);
export const A4 = {id: 'NexoolsAdA4', total: fr(total + 1)};
const W = '#fff';
const REQS: [string, number, number, number][] = [['Inteligência artificial', 40, 300, -5], ['Power BI', 640, 360, 4], ['Análise de dados', 70, 1000, 3], ['Gestão de projetos', 560, 1060, -3], ['Excel avançado', 660, 760, 5], ['Inglês', 60, 720, -4]];

const Persona: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const {to} = SEC('persona');
  const ask = T('persona', 'pedindo');
  const shrink = progress(frame, T('persona', 'escuta') - 10, 24, ease.inOut);
  return (
    <Scene from={0} to={to} fadeIn={1}>
      {REQS.map(([l, x, y, r], i) => {
        const at = ask + i * 7;
        const e = frame < at ? 0 : springIn(frame, fps, at, 'snappy');
        return <div key={l} style={{position: 'absolute', left: x, top: y, transform: `rotate(${r}deg) scale(${mix(0.5, 1, Math.min(e, 1.05))})`, opacity: Math.min(1, e * 2) * (1 - shrink)}}>
          <Tag tone="red" size={36}>{l}</Tag></div>;
      })}
      <Stage gap={34} style={{transform: `scale(${mix(1, 0.9, shrink)})`}}>
        <Pop at={0} scale={0.8}>
          <Glass glow={D.blue} style={{width: 640, padding: '46px 50px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22}}>
            <div style={{width: 150, height: 150, borderRadius: 75, background: 'linear-gradient(135deg, #3D8BFF, #12306E)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Ico n="user" size={86} color="#fff" /></div>
            <div style={{fontFamily: FU, fontSize: 30, color: D.muted, letterSpacing: '0.12em'}}>CRACHÁ</div>
            <div style={{fontFamily: FD, fontWeight: 700, fontSize: 60, color: W, textAlign: 'center', lineHeight: 1.05}}>Analista<br />administrativo</div>
          </Glass>
        </Pop>
        <Pop at={T('persona', 'ninguém')}><div style={{fontFamily: FD, fontWeight: 700, fontSize: 64, color: W, textAlign: 'center'}}>coisas que <span style={{color: '#FF8A95'}}>ninguém te ensinou</span></div></Pop>
      </Stage>
    </Scene>
  );
};

const Skills: React.FC = () => {
  const {from, to} = SEC('skills');
  const items: [string, string][] = [['Inteligência', 'Inteligência artificial'], ['Excel', 'Excel'], ['dados', 'Dados'], ['gestão', 'Gestão']];
  return (
    <Scene from={from} to={to}>
      <Stage gap={22}>
        {items.map(([k, l], i) => (
          <Pop key={k} at={T('skills', k) - 4} dx={i % 2 ? 80 : -80} dy={0} scale={1.2}>
            <div style={{fontFamily: FD, fontWeight: 700, fontSize: i === 0 ? 108 : 150, color: i % 2 ? D.blue : W, letterSpacing: '-0.045em', lineHeight: 1, textShadow: i % 2 ? GLOW(D.blue, 30) : 'none'}}>{l}</div>
          </Pop>
        ))}
      </Stage>
    </Scene>
  );
};

const Cursos: React.FC = () => {
  const frame = useCurrentFrame();
  const {from, to} = SEC('cursos');
  const cert = T('cursos', 'certificado');
  return (
    <Scene from={from} to={to}>
      <Stage gap={34}>
        <div style={{display: 'flex', gap: 16}}>
          {['Google', 'IBM', 'Stanford'].map((n, i) => <Pop key={n} at={T('cursos', n)} seed={i}><Tag tone="white" size={50}>{n}</Tag></Pop>)}
        </div>
        <Pop at={cert}>
          <div style={{width: 900, background: '#fff', borderRadius: 40, padding: '50px 56px', boxShadow: GLOW(D.blue, 40)}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: FU, fontSize: 26, letterSpacing: '0.14em', color: '#56607A', fontWeight: 600}}>CERTIFICADO DE CONCLUSÃO<Ico n="cert" size={58} /></div>
            <div style={{fontFamily: FD, fontWeight: 700, fontSize: 100, color: '#0B162A', letterSpacing: '-0.04em', margin: '26px 0 6px'}}>Seu nome</div>
            <div style={{height: 6, width: progress(frame, T('cursos', 'nome'), 20) * 500, background: D.blueDeep, borderRadius: 3}} />
            <div style={{fontFamily: FD, fontSize: 32, color: '#56607A', fontWeight: 500, marginTop: 20}}>nos programas incluídos no Coursera Plus</div>
          </div>
        </Pop>
      </Stage>
    </Scene>
  );
};

const Oferta: React.FC = () => {
  const frame = useCurrentFrame();
  const {from, to} = SEC('oferta');
  const price = T('oferta', 'duzentos'), day = T('oferta', 'Oitenta');
  return (
    <Scene from={from} to={to}>
      {frame < day - 4 ? (
        <Stage gap={28}>
          <Pop at={from}><Tag size={50}><CourseraMark size={50} color={D.ice} />Coursera Plus · 12 meses</Tag></Pop>
          <Slam at={price} size={290}><span style={{fontSize: 108, verticalAlign: '0.95em', color: D.ice, marginRight: 12}}>R$</span>297</Slam>
          <Pop at={T('oferta', 'Uma')}><Tag tone="green" size={50}><Ico n="check" size={44} color="#7DF0B0" stroke={3} />Uma vez só</Tag></Pop>
        </Stage>
      ) : (
        <Stage gap={16}>
          <Slam at={day} size={250}><span style={{fontSize: 100, verticalAlign: '0.95em', color: D.ice, marginRight: 12}}>R$</span>0,81</Slam>
          <Pop at={T('oferta', 'dia')}><div style={{fontFamily: FD, fontWeight: 700, fontSize: 80, color: W}}>por dia</div></Pop>
        </Stage>
      )}
      <Burst at={price + 4} y={820} />
    </Scene>
  );
};

const Cta: React.FC = () => {
  const {from, to} = SEC('cta');
  return (
    <Scene from={from} to={to + 90}>
      <Stage><CTA at={from - 4} press={T('cta', 'Saiba')} sub="12 meses · R$ 297 · pagamento único" /></Stage>
    </Scene>
  );
};

const buildSfx = () => [
  sfx(0, 'whoosh', 0.35, 'crachá entra'),
  sfx(T('persona', 'pedindo'), 'pop', 0.3, 'exigências do mercado'),
  sfx(T('persona', 'pedindo') + 21, 'pop', 0.25, 'exigências do mercado'),
  sfx(T('persona', 'escuta'), 'impact', 0.35, '"escuta isso"'),
  sfx(T('skills', 'Inteligência') - 4, 'whoosh', 0.3, 'skill 1'),
  sfx(T('skills', 'Excel') - 4, 'tick', 0.35, 'skill 2'),
  sfx(T('skills', 'dados') - 4, 'tick', 0.35, 'skill 3'),
  sfx(T('skills', 'gestão') - 4, 'tick', 0.35, 'skill 4'),
  sfx(T('cursos', 'certificado'), 'chime', 0.4, 'certificado no seu nome'),
  sfx(T('oferta', 'duzentos') - 60, 'riser', 0.3, 'tensão antes do preço'),
  sfx(T('oferta', 'duzentos'), 'impact', 0.6, 'R$ 297'),
  sfx(T('oferta', 'Oitenta'), 'impact', 0.45, 'R$ 0,81 por dia'),
  sfx(T('cta', 'Saiba'), 'click', 0.5, 'botão pressionado'),
];

export const NexoolsAdA4: React.FC<{debugSafeArea?: boolean}> = ({debugSafeArea}) => {
  const s = React.useMemo(buildSfx, []);
  return (
    <AdShell voice="nexools-ads/voice4.mp3" bed="nexools-ads/bed4.wav" total={A4.total} sfx={s} words={words} debugSafeArea={debugSafeArea}>
      <Persona /><Skills /><Cursos /><Oferta /><Cta />
      <Sweep at={SEC('oferta').from - 10} />
    </AdShell>
  );
};
