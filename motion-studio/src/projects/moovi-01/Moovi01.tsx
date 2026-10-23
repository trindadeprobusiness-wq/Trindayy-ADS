// MOOVI_01 — "Se o seu dinheiro aperta lá pelo dia 20…" (23,6 s de voz)
// Ideia-mestra: o problema é ver o mês tarde demais → a Moovi mostra na hora (lançar → painel → lembrete).
import React from 'react';
import {useCurrentFrame} from 'remotion';
import {CountUp, keyframes, progress, ease} from '../../lib';
import type {SfxCue} from '../../lib';
import {Bold, C, F, brl, f} from '../moovi-kit/base';
import {BotBubble, Chat, Dashboard, LockScreen, UserBubble, VoiceBubble} from '../moovi-kit/screens';
import {Beat, EndCard, FloatCard, Guarantee, Kinetic, PhoneStage, VideoShell} from '../moovi-kit/stage';
import {camPath} from '../moovi-kit/poses';

export const M01 = {id: 'Moovi01', total: 786, voice: 'moovi/voice01.mp3', bed: 'moovi/bed01.wav'};

const CHUNKS: [number, string][] = [
  [0.34, 'Se o seu dinheiro aperta'], [1.8, 'lá pelo dia 20,'], [3.38, 'você está olhando para o mês'], [4.66, 'tarde demais.'],
  [5.82, 'Na Moovi, você escreve'], [7.36, '“gastei 30 no almoço”'], [8.72, 'ou manda um áudio,'], [9.72, 'e ela anota, escolhe a categoria'],
  [11.66, 'e atualiza o seu painel na hora.'], [13.7, 'Quanto entrou, quanto saiu'], [15.04, 'e pra onde foi tudo, num relance.'],
  [17.26, 'E as contas,'], [18.06, 'ela te lembra no WhatsApp.'], [19.44, 'Se não gostar, em 7 dias'], [21.24, 'você pede o dinheiro de volta.'],
  [22.86, 'Link aqui embaixo.'],
];

export const SFX01: SfxCue[] = [
  {at: f(2.26), src: 'sfx/impact_soft.wav', volume: 0.55, why: '"dia 20" bate como alerta'},
  {at: f(4.66), src: 'sfx/tick.wav', volume: 0.45, why: '"tarde demais" — relógio'},
  {at: 166, src: 'sfx/whoosh_soft.wav', volume: 0.35, why: 'celular entra'},
  {at: 252, src: 'moovi/msg_send.wav', volume: 0.45, why: 'mensagem enviada'},
  {at: 280, src: 'moovi/msg_send.wav', volume: 0.4, why: 'áudio enviado'},
  {at: 312, src: 'moovi/msg_recv.wav', volume: 0.45, why: 'resposta do assistente'},
  {at: 362, src: 'sfx/tick.wav', volume: 0.4, why: 'painel atualiza'},
  {at: 421, src: 'moovi/counter_roll.wav', volume: 0.45, why: 'entrou/saiu contando'},
  {at: 553, src: 'moovi/msg_recv.wav', volume: 0.5, why: 'lembrete chega'},
  {at: 586, src: 'sfx/whoosh_soft.wav', volume: 0.3, why: 'entra a garantia'},
  {at: 690, src: 'sfx/shimmer.wav', volume: 0.3, why: 'assinatura'},
];

/** Hook: a balance draining as the month goes; "20" lands red. */
const DrainHook: React.FC = () => {
  const frame = useCurrentFrame();
  const bal = keyframes(frame, [{at: 6, value: 2380}, {at: f(2.6), value: 38.4, ease: 'inOut'}]);
  const day = Math.round(keyframes(frame, [{at: 6, value: 1}, {at: f(2.26), value: 20, ease: 'inOut'}]));
  const low = progress(frame, f(2.0), 10);
  return (
    <div style={{position: 'absolute', top: 520, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: F}}>
      <div style={{fontSize: 40, color: C.stageMuted, fontWeight: 600, letterSpacing: '0.18em'}}>OUTUBRO</div>
      <div style={{fontSize: 300, fontWeight: 800, lineHeight: 1, letterSpacing: '-0.05em', color: low > 0.5 ? '#FF5A6E' : '#fff', fontVariantNumeric: 'tabular-nums'}}>
        dia {day}
      </div>
      <div style={{marginTop: 30, width: 760, padding: '26px 34px', borderRadius: 30, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 32, color: C.stageMuted}}><span>Saldo na conta</span><b style={{color: low > 0.5 ? '#FF5A6E' : '#fff'}}>{brl(bal)}</b></div>
        <div style={{height: 16, borderRadius: 8, background: 'rgba(255,255,255,0.1)', marginTop: 18, overflow: 'hidden'}}>
          <div style={{height: '100%', width: `${(bal / 2380) * 100}%`, background: low > 0.5 ? '#FF5A6E' : C.brandBright, borderRadius: 8}} />
        </div>
      </div>
    </div>
  );
};

export const Moovi01: React.FC<{debugSafeArea?: boolean}> = ({debugSafeArea}) => {
  const cam = camPath([[0, 'hidden'], [150, 'chat', 'out'], [404, 'dash'], [452, 'donut'], [515, 'lock'], [580, 'full']], 20);
  const msgs = [
    {at: 252, h: 108, node: <UserBubble>gastei 30 no almoço</UserBubble>},
    {at: 280, h: 104, node: <VoiceBubble at={280} />},
    {at: 312, h: 136, node: <BotBubble>Prontinho! Anotei em <Bold>Alimentação</Bold> e atualizei seu painel.</BotBubble>},
  ];
  return (
    <VideoShell voice={M01.voice} bed={M01.bed} total={M01.total} sfx={SFX01} chunks={CHUNKS} capEnd={23.9} duck={[{from: 8, to: 690}]} debugSafeArea={debugSafeArea}>
      <Beat from={0} to={168}>
        <DrainHook />
        <Kinetic y={1180} lines={[{text: 'tarde demais.', starts: [f(4.66), f(5.0)], size: 96, color: '#fff'}]} />
      </Beat>
      <PhoneStage cam={{...cam, opacity: [{at: 148, value: 0}, {at: 152, value: 1}, {at: 576, value: 1}, {at: 590, value: 0}], blur: [{at: 576, value: 0}, {at: 590, value: 16}]}} screens={[
        {from: 0, node: <Chat msgs={msgs} typing={[{from: 211, to: 248, send: 252, text: 'gastei 30 no almoço'}]} />},
        {from: 408, node: <Dashboard cfg={{kpiAt: [408, 421, 444, 452], scroll: [{at: 452, value: 0}, {at: 472, value: 810, ease: 'inOut'}], donutDrawAt: 462}} />, enter: 'swipe'},
        {from: 518, node: <LockScreen notifs={[{at: 553, title: 'Conta de luz vence amanhã', body: <>{brl(197.63)} · toque para ver no painel</>}]} />, enter: 'fade'},
      ]} />
      <FloatCard from={345} to={404} glowAt={362}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12, fontSize: 24, color: C.muted}}><span style={{width: 14, height: 14, borderRadius: 7, background: C.amber}} />Alimentação · este mês</div>
        <div style={{fontSize: 52, fontWeight: 700, marginTop: 8, letterSpacing: '-0.02em'}}>
          <CountUp from={826.9} to={856.9} start={362} duration={16} decimals={2} prefix="R$ " />
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 14, fontSize: 26, opacity: progress(useCurrentFrame(), 362, 10, ease.out)}}>
          <span>Almoço <span style={{color: C.muted, fontSize: 22}}>· hoje</span></span><b style={{color: C.red}}>−R$ 30,00</b>
        </div>
      </FloatCard>
      <Beat from={584} to={684}><Guarantee at={586} /></Beat>
      <EndCard at={688} headline="Seu dinheiro, organizado." sub="7 dias de garantia" hint="Link aqui embaixo" />
    </VideoShell>
  );
};
