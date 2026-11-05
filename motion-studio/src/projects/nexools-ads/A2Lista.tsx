// A2 · A lista (Ana Alice, 48,4 s): metas de 31/12 → somem → novembro, nada riscado → por quê → oferta → "dessa vez, risca a lista".
import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {Scene} from '../nexools-vsl/kit';
import {AdShell, Stage, Glass, Tag, Slam, Burst, Sweep, CTA, D, GLOW, fr, timing, sfx, Pop, Kin, Ico, CourseraMark, FD, FU} from './akit';
import {progress, ease, mix, springIn, keyframes} from '../../lib';
import data from './a2.json';

const {SEC, T, TS, words, total} = timing(data);
export const A2 = {id: 'NexoolsAdA2', total: fr(total + 1)};
const W = '#fff';
const ITEMS = ['Aprender inteligência artificial', 'Fazer um curso de dados', 'Atualizar o LinkedIn', 'Ganhar mais'];

/** Dark notes-app list. `typedAt[i]` = when item i is written; `checkAt[i]` = when it gets checked (green strike). */
const NoteList: React.FC<{typedAt: number[]; checkAt?: number[]; red?: number; title?: string}> = ({typedAt, checkAt = [], red = 0, title = 'Metas para o ano que vem'}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <Glass style={{width: 900, padding: '44px 50px'}}>
      <div style={{fontFamily: FU, fontSize: 28, color: D.muted}}>Notas</div>
      <div style={{fontFamily: FD, fontWeight: 700, fontSize: 54, color: W, margin: '6px 0 18px'}}>{title}</div>
      {ITEMS.map((it, i) => {
        const at = typedAt[i];
        const n = Math.max(0, Math.min(it.length, Math.floor((frame - at) / 1.6)));
        const ck = checkAt[i] !== undefined && frame >= checkAt[i] ? springIn(frame, fps, checkAt[i], 'snappy') : 0;
        const box = ck > 0 ? D.green : red > 0.5 ? D.red : 'rgba(255,255,255,0.35)';
        return (
          <div key={i} style={{display: 'flex', alignItems: 'center', gap: 26, padding: '20px 0', borderTop: `1.5px solid ${D.line}`, opacity: frame >= at - 4 ? 1 : 0.0}}>
            <div style={{width: 54, height: 54, borderRadius: 14, border: `4px solid ${box}`, background: ck > 0 ? D.green : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transform: `scale(${1 + 0.2 * Math.max(0, 1 - Math.abs(ck - 1) * 4)})`}}>{ck > 0 && <Ico n="check" size={40} color="#04140A" stroke={3.4} />}</div>
            <div style={{position: 'relative', fontFamily: FD, fontSize: 46, fontWeight: 600, color: ck > 0 ? 'rgba(255,255,255,0.6)' : W}}>
              {it.slice(0, n)}{n < it.length && frame >= at && Math.floor(frame / 12) % 2 === 0 ? <span style={{color: D.blue}}>|</span> : null}
              {ck > 0 && <span style={{position: 'absolute', left: 0, top: '52%', height: 6, borderRadius: 3, background: D.green, width: `${Math.min(1, ck) * 100}%`}} />}
            </div>
          </div>
        );
      })}
    </Glass>
  );
};

const Data: React.FC = () => {
  const frame = useCurrentFrame();
  const {to} = SEC('data');
  const items = [T('data', 'aprender'), T('data', 'fazer'), T('data', 'atualizar'), T('data', 'ganhar')];
  const up = progress(frame, T('data', 'Você') - 10, 30, ease.inOut);
  return (
    <Scene from={0} to={to} fadeIn={1}>
      <Stage gap={30}>
        <div style={{transform: `scale(${mix(1, 0.55, up)})`, marginBottom: mix(0, -120, up)}}>
          <Pop at={0} scale={0.8}>
            <Glass glow={D.blue} style={{width: 560, overflow: 'hidden', textAlign: 'center'}}>
              <div style={{background: D.blueDeep, color: W, fontFamily: FD, fontWeight: 700, fontSize: 52, padding: '20px 0', letterSpacing: '0.08em'}}>DEZEMBRO</div>
              <div style={{fontFamily: FD, fontWeight: 700, fontSize: 260, color: W, lineHeight: 1.05, letterSpacing: '-0.05em', padding: '10px 0 20px'}}>31</div>
            </Glass>
          </Pop>
        </div>
        <Pop at={T('data', 'escreve') - 10}><NoteList typedAt={items} /></Pop>
      </Stage>
    </Scene>
  );
};

const MONTHS = ['JANEIRO', 'FEVEREIRO', 'MARÇO'];
const Meses: React.FC = () => {
  const frame = useCurrentFrame();
  const {from, to} = SEC('meses');
  const ats = [T('meses', 'Janeiro'), T('meses', 'Fevereiro'), T('meses', 'março')];
  const idx = keyframes(frame, [{at: ats[0], value: 0}, {at: ats[1] - 4, value: 0}, {at: ats[1] + 10, value: 1, ease: 'out'}, {at: ats[2] - 4, value: 1}, {at: ats[2] + 10, value: 2, ease: 'out'}]);
  const sink = progress(frame, T('meses', 'sumiu') - 10, 60, ease.inOut);
  return (
    <Scene from={from} to={to}>
      <Stage gap={60}>
        <div style={{height: 190, overflow: 'hidden'}}>
          <div style={{transform: `translateY(${-idx * 190}px)`}}>
            {MONTHS.map((m) => <div key={m} style={{height: 190, fontFamily: FD, fontWeight: 700, fontSize: 150, color: W, letterSpacing: '-0.04em', lineHeight: '190px', textAlign: 'center', textShadow: GLOW(D.blue, 24)}}>{m}</div>)}
          </div>
        </div>
        <div style={{position: 'relative', width: 900, height: 520}}>
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} style={{position: 'absolute', left: 0, right: 0, top: 0, transform: `translateY(${i * 34 * sink}px) scale(${1 - i * 0.03 * sink})`, opacity: i === 0 ? 1 : sink * (1 - i * 0.15), zIndex: 10 - i}}>
              {i === 0
                ? <div style={{transform: `translateY(${sink * 260}px) scale(${mix(1, 0.86, sink)})`, filter: `blur(${sink * 7}px)`, opacity: mix(1, 0.35, sink)}}><NoteList typedAt={[0, 0, 0, 0]} /></div>
                : <Glass style={{height: 220, padding: '30px 40px', fontFamily: FD, fontSize: 38, color: D.muted}}>{['Lista de compras', 'Senha do wi-fi', 'Ideias de presente', 'Lembretes'][i - 1]}</Glass>}
            </div>
          ))}
        </div>
      </Stage>
    </Scene>
  );
};

const Novembro: React.FC = () => {
  const {from, to} = SEC('novembro');
  const zero = T('novembro', 'Nenhum');
  return (
    <Scene from={from} to={to}>
      <Stage gap={34}>
        <Pop at={from}><Tag tone="red" size={54}><Ico n="calendar" size={50} color="#FF8A95" />Novembro</Tag></Pop>
        <Pop at={T('novembro', 'olha') - 6}><NoteList typedAt={[0, 0, 0, 0]} red={1} /></Pop>
        <Pop at={zero}><div style={{fontFamily: FD, fontWeight: 700, fontSize: 96, color: W}}>Riscados: <span style={{color: D.red, textShadow: GLOW(D.red, 26)}}>0 de 4</span></div></Pop>
      </Stage>
    </Scene>
  );
};

const Porque: React.FC = () => {
  const {from, to} = SEC('porque');
  const rows: [string, string, string, string][] = [['caro', 'O curso bom', 'era caro', 'card'], ['certificado', 'O barato', 'sem certificado', 'cert'], ['fim', 'O gratuito', 'não tinha fim', 'repeat']];
  return (
    <Scene from={from} to={to}>
      <Stage gap={34}>
        <Kin text="Não foi preguiça." starts={TS('porque', 'nao foi preguica')} size={116} color={W} hl={['preguiça.']} hlColor={D.blue} />
        {rows.map(([k, a, b, ic], i) => (
          <Pop key={k} at={T('porque', k) - 30} seed={i} dx={-60} dy={0}>
            <Glass glow={D.red} style={{width: 900, padding: '30px 40px', display: 'flex', alignItems: 'center', gap: 28}}>
              <div style={{width: 92, height: 92, borderRadius: 26, background: 'rgba(255,77,94,0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Ico n={ic as never} size={52} color="#FF8A95" /></div>
              <div style={{fontFamily: FD, fontWeight: 700, fontSize: 52, color: W}}>{a} <span style={{color: '#FF8A95'}}>{b}</span></div>
            </Glass>
          </Pop>
        ))}
      </Stage>
    </Scene>
  );
};

const Virada: React.FC = () => {
  const {from, to} = SEC('virada');
  return (
    <Scene from={from} to={to} fadeIn={4}>
      <Stage>
        <Kin text="Esse ano dá pra ser diferente." starts={TS('virada', 'esse ano da pra ser diferente')} size={124} color={W} hl={['diferente.']} hlColor={D.blue} />
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
        <Stage gap={30}>
          <Pop at={from}><Tag size={50}><CourseraMark size={50} color={D.ice} />Coursera Plus · 12 meses</Tag></Pop>
          <Pop at={T('oferta', 'conta')}><Tag tone="green" size={46}><Ico n="user" size={42} color="#7DF0B0" />Numa conta só sua</Tag></Pop>
          <Slam at={price} size={280}><span style={{fontSize: 106, verticalAlign: '0.95em', color: D.ice, marginRight: 12}}>R$</span>297</Slam>
          <Pop at={T('oferta', 'pagos')}><div style={{fontFamily: FD, fontWeight: 600, fontSize: 56, color: D.muted}}>pagos uma vez</div></Pop>
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
  const frame = useCurrentFrame();
  const {from, to} = SEC('cta');
  const risca = T('cta', 'risca');
  const checks = [0, 1, 2, 3].map((i) => risca + i * 9);
  const toCta = T('cta', 'Toca') - 6;
  return (
    <Scene from={from} to={to + 90}>
      {frame < toCta + 10 && (
        <Stage gap={30} style={{opacity: 1 - progress(frame, toCta, 10, ease.in)}}>
          <Kin text="Dessa vez, risca a lista." starts={TS('cta', 'dessa vez risca a lista')} size={100} color={W} hl={['risca']} hlColor={D.green} />
          <Pop at={from}><NoteList typedAt={[0, 0, 0, 0]} checkAt={checks} title="Metas para 2027" /></Pop>
        </Stage>
      )}
      {frame >= toCta && <Stage><CTA at={toCta} press={T('cta', 'Saiba')} sub="12 meses · R$ 297 · pagamento único" /></Stage>}
    </Scene>
  );
};

const buildSfx = () => [
  sfx(0, 'impact', 0.35, 'abre: 31 de dezembro'),
  sfx(T('data', 'aprender'), 'typing', 0.25, 'digitando a lista'),
  sfx(T('data', 'atualizar'), 'typing', 0.22, 'digitando a lista'),
  sfx(T('meses', 'Janeiro'), 'tick', 0.35, 'virada de mês'),
  sfx(T('meses', 'Fevereiro'), 'tick', 0.35, 'virada de mês'),
  sfx(T('meses', 'março'), 'tick', 0.35, 'virada de mês'),
  sfx(T('meses', 'sumiu'), 'whoosh_down', 0.35, 'lista some'),
  sfx(T('novembro', 'Nenhum'), 'impact', 0.4, '0 de 4'),
  sfx(T('porque', 'caro') - 30, 'pop', 0.3, 'motivo 1'),
  sfx(T('porque', 'certificado') - 30, 'pop', 0.3, 'motivo 2'),
  sfx(T('porque', 'fim') - 30, 'pop', 0.3, 'motivo 3'),
  sfx(SEC('virada').from - 4, 'whoosh', 0.4, 'virada'),
  sfx(T('oferta', 'duzentos') - 70, 'riser', 0.35, 'tensão antes do preço'),
  sfx(T('oferta', 'duzentos'), 'impact', 0.6, 'R$ 297'),
  sfx(T('oferta', 'Oitenta'), 'impact', 0.45, 'R$ 0,81 por dia'),
  sfx(T('cta', 'risca'), 'chime', 0.4, 'itens riscados'),
  sfx(T('cta', 'Saiba'), 'click', 0.5, 'botão pressionado'),
];

export const NexoolsAdA2: React.FC<{debugSafeArea?: boolean}> = ({debugSafeArea}) => {
  const frame = useCurrentFrame();
  const s = React.useMemo(buildSfx, []);
  const tension = keyframes(frame, [{at: SEC('novembro').from - 10, value: 0}, {at: SEC('novembro').from + 20, value: 0.7}, {at: SEC('virada').from - 6, value: 0.7}, {at: SEC('virada').from + 6, value: 0}]);
  const flash = Math.max(0, 1 - Math.abs(frame - SEC('virada').from) / 8) * 0.5;
  return (
    <AdShell voice="nexools-ads/voice2.mp3" bed="nexools-ads/bed2.wav" total={A2.total} sfx={s} words={words} tension={tension} flash={flash} debugSafeArea={debugSafeArea}>
      <Data /><Meses /><Novembro /><Porque /><Virada /><Oferta /><Cta />
      <Burst at={T('cta', 'risca') + 30} y={820} color={D.green} />
      <Sweep at={SEC('oferta').from - 10} />
    </AdShell>
  );
};
