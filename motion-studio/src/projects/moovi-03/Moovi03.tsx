// MOOVI_03 — "Você não largou o controle financeiro por preguiça." (29,5 s de voz)
// Ideia-mestra: o cansaço é anotar um por um → um print do extrato resolve tudo (lê, separa, confere, não duplica).
import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {ease, mix, progress, springIn} from '../../lib';
import type {SfxCue} from '../../lib';
import {Bold, C, F, brl, f} from '../moovi-kit/base';
import {BotBubble, Chat, Dashboard, ReviewList, StatementImage, UserBubble} from '../moovi-kit/screens';
import {Beat, EndCard, FloatCard, Guarantee, Kinetic, PhoneStage, StrikeWord, VideoShell} from '../moovi-kit/stage';
import {camPath} from '../moovi-kit/poses';

export const M03 = {id: 'Moovi03', total: 966, voice: 'moovi/voice03.mp3', bed: 'moovi/bed03.wav'};

const CHUNKS: [number, string][] = [
  [0, ''], [4.14, 'Largou porque anotar gasto por gasto…'], [6.94, ''],
  [7.8, 'Na Moovi, você tira um print'], [9.36, 'do extrato do banco e manda.'],
  [11.24, 'Ela lê cada lançamento,'], [12.92, 'separa por categoria'], [13.98, 'e te mostra antes de salvar.'],
  [15.84, 'Você confere, fala “sim”'], [17.36, 'e tá tudo lançado.'],
  [19.12, 'Se alguma coisa já estava lá,'], [20.92, 'ela não repete.'],
  [22.14, 'Depois é só abrir o painel'], [23.4, 'e ver pra onde foi cada real.'],
  [25.3, 'Se não gostar, em 7 dias'], [27.16, 'você pede o dinheiro de volta.'],
  [28.8, 'Link aqui embaixo.'],
];

export const SFX03: SfxCue[] = [
  {at: f(3.3), src: 'sfx/whoosh_fast.wav', volume: 0.35, why: 'risco em "preguiça"'},
  {at: f(6.94), src: 'sfx/impact_low.wav', volume: 0.4, why: '"Cansa." — a pilha desaba'},
  {at: 230, src: 'sfx/whoosh_soft.wav', volume: 0.35, why: 'celular entra'},
  {at: f(9.06), src: 'sfx/click_ui.wav', volume: 0.5, why: 'print (obturador)'},
  {at: f(9.4), src: 'moovi/msg_send.wav', volume: 0.45, why: 'extrato enviado'},
  {at: f(11.24), src: 'moovi/scan.wav', volume: 0.4, why: 'leitura do extrato'},
  {at: f(12.14), src: 'moovi/msg_recv.wav', volume: 0.45, why: 'lista para conferir'},
  {at: 514, src: 'moovi/msg_send.wav', volume: 0.4, why: '"sim"'},
  {at: 545, src: 'moovi/msg_recv.wav', volume: 0.45, why: 'tudo lançado'},
  {at: f(19.34), src: 'sfx/pop_soft.wav', volume: 0.4, why: 'duplicado identificado'},
  {at: 662, src: 'sfx/whoosh_soft.wav', volume: 0.3, why: 'painel'},
  {at: 758, src: 'sfx/whoosh_soft.wav', volume: 0.3, why: 'entra a garantia'},
  {at: 866, src: 'sfx/shimmer.wav', volume: 0.3, why: 'assinatura'},
];

const PILE: [string, number][] = [
  ['Café', 6.5], ['Ônibus', 4.4], ['Almoço', 32], ['Mercado', 87.3], ['Farmácia', 21.9], ['Padaria', 9], ['Uber', 18.6], ['Lanche', 14], ['Gasolina', 120],
];

/** "Anotar gasto por gasto": manual entries drop in faster and faster, then the pile slumps on "Cansa." */
const EntryPile: React.FC<{at: number; tiredAt: number}> = ({at, tiredAt}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const tired = progress(frame, tiredAt, 22, ease.inOut);
  let t = at;
  return (
    <div style={{position: 'absolute', top: 430, left: 0, width: '100%', height: 760, fontFamily: F}}>
      {PILE.map(([n, v], i) => {
        const start = t;
        t += Math.max(4, 14 - i * 1.6); // accelerating rhythm
        const e = springIn(frame, fps, start, 'snappy');
        if (frame < start) return null;
        const col = i % 2;
        const row = Math.floor(i / 2);
        const fall = tired * (0.6 + (i % 3) * 0.25);
        return (
          <div key={n} style={{position: 'absolute', left: col ? 560 : 120, top: row * 140 + (col ? 60 : 0), width: 400, display: 'flex', justifyContent: 'space-between',
            padding: '24px 30px', boxSizing: 'border-box', borderRadius: 26, background: '#fff', color: C.text, fontSize: 34, fontWeight: 600,
            opacity: Math.min(1, e * 1.4) * mix(1, 0.4, tired), filter: `grayscale(${tired})`, boxShadow: '0 20px 50px -20px rgba(0,0,0,0.7)',
            transform: `translateY(${(1 - e) * -60 + fall * 120}px) rotate(${(col ? 1 : -1) * fall * 9}deg)`}}>
            <span>{n}</span><span style={{color: C.red}}>−{brl(v).replace('R$ ', '')}</span>
          </div>
        );
      })}
    </div>
  );
};

/** Screenshot flash on the stage. */
const Flash: React.FC<{at: number}> = ({at}) => {
  const frame = useCurrentFrame();
  const v = Math.max(0, 1 - Math.abs(frame - at - 2) / 5) * 0.55;
  return v > 0 ? <AbsoluteFill style={{background: '#fff', opacity: v}} /> : null;
};

export const Moovi03: React.FC<{debugSafeArea?: boolean}> = ({debugSafeArea}) => {
  const cam = camPath([[0, 'hidden'], [226, 'chat', 'out'], [658, 'dash'], [684, 'donut']], 20);
  const msgs = [
    {at: f(9.4), h: 446, node: <StatementImage scanAt={f(11.24)} />},
    {at: f(12.14), h: 560, node: <ReviewList at={f(12.14) + 6} checkAt={f(16.18)} dupIndex={5} intro={<>Li <Bold>6 lançamentos</Bold>. Confere antes de eu salvar:</>} />},
    {at: 514, h: 108, node: <UserBubble>sim</UserBubble>},
    {at: 545, h: 136, node: <BotBubble>Prontinho! <Bold>5 lançamentos</Bold> salvos no seu painel.</BotBubble>},
  ];
  return (
    <VideoShell voice={M03.voice} bed={M03.bed} total={M03.total} sfx={SFX03} chunks={CHUNKS} capEnd={30.2} duck={[{from: 8, to: 866}]} debugSafeArea={debugSafeArea}>
      <Beat from={0} to={122}>
        <Kinetic y={560} lines={[
          {text: 'Você não largou o', starts: [f(0.48), f(0.76), f(1.06), f(1.4)], size: 100},
          {text: 'controle financeiro', starts: [f(1.52), f(2.0)], size: 100, highlight: ['financeiro']},
        ]} />
        <StrikeWord text="por preguiça." at={f(2.38)} strikeAt={f(3.3)} y={830} size={110} />
      </Beat>
      <Beat from={122} to={232}>
        <EntryPile at={f(4.3)} tiredAt={f(6.94)} />
        <Kinetic y={1200} lines={[{text: 'Cansa.', starts: [f(6.94)], size: 150, color: '#fff'}]} />
      </Beat>
      <PhoneStage cam={{...cam, opacity: [{at: 226, value: 0}, {at: 232, value: 1}, {at: 750, value: 1}, {at: 760, value: 0}], blur: [{at: 750, value: 0}, {at: 760, value: 16}]}} screens={[
        {from: 0, node: <Chat msgs={msgs} typing={[{from: 498, to: 508, send: 514, text: 'sim'}]} />},
        {from: 662, node: <Dashboard cfg={{kpiAt: [662, 670, 678, 686], scroll: [{at: 684, value: 0}, {at: 704, value: 810, ease: 'inOut'}], donutDrawAt: 694}} />, enter: 'swipe'},
      ]} />
      <Flash at={f(9.06)} />
      <FloatCard from={f(19.34)} to={652} y={420} x={120} width={840} glowAt={f(19.34)}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 32}}>
          <span><b>Padaria</b> <span style={{color: C.muted}}>· 23/10</span></span>
          <span style={{fontSize: 24, padding: '6px 14px', borderRadius: 999, background: '#FFF1D6', color: '#8A5A00', fontWeight: 600}}>já estava no painel</span>
        </div>
        <div style={{marginTop: 10, fontSize: 28, color: C.muted}}>Não lança de novo.</div>
      </FloatCard>
      <Beat from={758} to={858}><Guarantee at={760} /></Beat>
      <EndCard at={864} headline="Um print. Tudo lançado." sub="7 dias de garantia" hint="Link aqui embaixo" />
    </VideoShell>
  );
};
