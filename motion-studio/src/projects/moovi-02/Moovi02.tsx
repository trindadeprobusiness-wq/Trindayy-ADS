// MOOVI_02 — "Você já pagou juros numa conta que tinha dinheiro pra pagar?" (28,9 s de voz)
// Ideia-mestra: o problema não é dinheiro, é memória → cadastra uma vez, a Moovi lembra (aviso + resumo de domingo).
import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {ease, mix, progress, springIn} from '../../lib';
import type {SfxCue} from '../../lib';
import {C, F, brl, f} from '../moovi-kit/base';
import {Commitments, Dashboard, LockScreen} from '../moovi-kit/screens';
import {Beat, EndCard, Guarantee, Kinetic, PhoneStage, StrikeWord, VideoShell} from '../moovi-kit/stage';
import {camPath} from '../moovi-kit/poses';

export const M02 = {id: 'Moovi02', total: 927, voice: 'moovi/voice02.mp3', bed: 'moovi/bed02.wav'};

// '' = no caption while the same words are on screen as big type.
const CHUNKS: [number, string][] = [
  [0, ''],
  [8.0, 'Aí vem aquela planilha'], [9.14, 'que dura duas semanas.'],
  [11.12, 'Na Moovi, você cadastra a conta uma vez'], [13.72, 'e ela já avisa no WhatsApp antes de vencer.'],
  [16.52, 'Todo domingo ainda chega um resumo:'], [18.38, 'quanto você gastou na semana'], [19.8, 'e o que está pra vencer.'],
  [21.28, 'O resto fica no seu painel, organizado.'],
  [24.08, 'Se não gostar, em 7 dias'], [25.98, 'você pede o dinheiro de volta.'],
  [27.52, 'Link aqui embaixo.'],
];

export const SFX02: SfxCue[] = [
  {at: f(1.46), src: 'sfx/impact_soft.wav', volume: 0.5, why: '"juros" — a dor'},
  {at: f(5.5), src: 'sfx/whoosh_fast.wav', volume: 0.35, why: 'risco em "faltou dinheiro"'},
  {at: f(6.38), src: 'sfx/pop_soft.wav', volume: 0.45, why: 'virada: "faltou lembrar"'},
  {at: f(10.28), src: 'sfx/impact_low.wav', volume: 0.35, why: 'planilha abandonada'},
  {at: 330, src: 'sfx/whoosh_soft.wav', volume: 0.35, why: 'celular entra'},
  {at: f(12.18) + 2, src: 'sfx/click_ui.wav', volume: 0.45, why: 'conta cadastrada'},
  {at: f(12.18) + 22, src: 'sfx/tick.wav', volume: 0.4, why: 'lembrete ligado'},
  {at: f(14.38), src: 'moovi/msg_recv.wav', volume: 0.5, why: 'aviso chega no WhatsApp'},
  {at: f(17.84), src: 'moovi/msg_recv.wav', volume: 0.45, why: 'resumo de domingo chega'},
  {at: 640, src: 'sfx/whoosh_soft.wav', volume: 0.3, why: 'painel'},
  {at: 730, src: 'sfx/whoosh_soft.wav', volume: 0.3, why: 'entra a garantia'},
  {at: 828, src: 'sfx/shimmer.wav', volume: 0.3, why: 'assinatura'},
];

const ROWS: [string, string, number][] = [
  ['01/11', 'Mercado', 182.4], ['02/11', 'Uber', 23.9], ['04/11', 'Farmácia', 46.1], ['07/11', 'Restaurante', 89], ['12/11', 'Mercado', 131.75],
];

/** "A planilha que dura duas semanas": rows fill in, then stop; the sheet greys out and tilts away. */
const AbandonedSheet: React.FC<{at: number; dieAt: number}> = ({at, dieAt}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const inn = springIn(frame, fps, at, 'snappy');
  const die = progress(frame, dieAt, 18, ease.inOut);
  const filled = ROWS.filter((_, i) => frame >= at + 8 + i * 7).length;
  const caret = filled === ROWS.length && die < 0.5 && Math.floor(frame / 9) % 2 === 0;
  return (
    <div style={{position: 'absolute', top: 470, left: 90, right: 90, fontFamily: F, opacity: inn * mix(1, 0.55, die),
      transform: `translateY(${(1 - inn) * 50 + die * 30}px) rotate(${die * -3.5}deg) scale(${mix(1, 0.94, die)})`, filter: `grayscale(${die})`}}>
      <div style={{background: '#fff', borderRadius: 30, overflow: 'hidden', boxShadow: '0 40px 90px -20px rgba(0,0,0,0.8)'}}>
        <div style={{padding: '24px 30px', background: '#E8F5EC', fontSize: 30, fontWeight: 700, color: '#0F7A3A', display: 'flex', justifyContent: 'space-between'}}>
          <span>Planilha de gastos</span><span style={{color: C.muted, fontWeight: 500}}>novembro</span>
        </div>
        {Array.from({length: 10}, (_, i) => {
          const r = ROWS[i];
          const show = i < filled;
          return (
            <div key={i} style={{display: 'grid', gridTemplateColumns: '120px 1fr 190px', padding: '0 30px', height: 66, alignItems: 'center',
              borderTop: `1px solid ${C.line}`, fontSize: 28, color: C.text}}>
              <span style={{color: C.muted}}>{show ? r[0] : ''}</span>
              <span>{show ? r[1] : i === filled && caret ? <span style={{display: 'inline-block', width: 3, height: 32, background: C.text}} /> : ''}</span>
              <span style={{textAlign: 'right', fontWeight: 600}}>{show ? brl(r[2]) : ''}</span>
            </div>
          );
        })}
      </div>
      <div style={{marginTop: 26, textAlign: 'center', fontSize: 36, fontWeight: 700, color: C.stageMuted, opacity: progress(frame, dieAt + 6, 12)}}>
        última linha: 12 de novembro
      </div>
    </div>
  );
};

export const Moovi02: React.FC<{debugSafeArea?: boolean}> = ({debugSafeArea}) => {
  const cam = camPath([[0, 'hidden'], [326, 'page', 'out'], [422, 'lock'], [636, 'dash'], [668, 'donut']], 20);
  return (
    <VideoShell voice={M02.voice} bed={M02.bed} total={M02.total} sfx={SFX02} chunks={CHUNKS} capEnd={28.9} duck={[{from: 8, to: 830}]} debugSafeArea={debugSafeArea}>
      <Beat from={0} to={140}>
        <Kinetic y={560} lines={[
          {text: 'Você já pagou', starts: [f(0.48), f(0.78), f(1.1)], size: 100},
          {text: 'juros numa conta', starts: [f(1.46), f(1.8), f(2.12)], size: 100},
          {text: 'que tinha dinheiro', starts: [f(2.38), f(2.6), f(2.96)], size: 100, highlight: ['dinheiro']},
          {text: 'pra pagar?', starts: [f(3.18), f(3.76)], size: 100},
        ]} />
      </Beat>
      <Beat from={142} to={236}>
        <StrikeWord text="Faltou dinheiro." at={f(4.84)} strikeAt={f(5.5)} y={640} size={112} />
        <Kinetic y={900} lines={[{text: 'Faltou lembrar.', starts: [f(6.38), f(6.72)], size: 128, highlight: ['lembrar.']}]} />
      </Beat>
      <Beat from={238} to={326}>
        <AbandonedSheet at={240} dieAt={f(10.28)} />
      </Beat>
      <PhoneStage cam={{...cam, opacity: [{at: 326, value: 0}, {at: 332, value: 1}, {at: 724, value: 1}, {at: 734, value: 0}], blur: [{at: 724, value: 0}, {at: 734, value: 16}]}} screens={[
        {from: 0, node: <Commitments addAt={f(12.18)} />},
        {from: 424, node: <LockScreen notifs={[
          {at: f(14.38), title: 'Conta de luz vence amanhã', body: <>{brl(197.63)} · dia 10</>},
          {at: f(17.84), title: 'Seu resumo da semana', body: <>Você gastou {brl(612.4)} · 2 contas vencem nesta semana</>, tall: true},
        ]} />, enter: 'fade'},
        {from: 640, node: <Dashboard cfg={{kpiAt: [640, 648, 656, 664], scroll: [{at: 668, value: 0}, {at: 688, value: 810, ease: 'inOut'}], donutDrawAt: 678}} />, enter: 'swipe'},
      ]} />
      <Beat from={730} to={822}><Guarantee at={732} /></Beat>
      <EndCard at={826} headline="Suas contas, sempre no radar." sub="7 dias de garantia" hint="Link aqui embaixo" />
    </VideoShell>
  );
};
