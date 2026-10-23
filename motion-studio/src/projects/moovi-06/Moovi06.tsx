// MOOVI_06 — FAQ: "Essas são as perguntas que mais chegam sobre a Moovi." (≈48 s de voz)
// Ideia-mestra: quebra de objeções em 4 cartões de pergunta → preço, garantia, segurança, app. Ritmo calmo, informativo.
import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {springIn} from '../../lib';
import type {SfxCue} from '../../lib';
import {F, f} from '../moovi-kit/base';
import {Dashboard, HomeScreen, Splash} from '../moovi-kit/screens';
import {Beat, EndCard, Guarantee, InfoList, Kinetic, PhoneStage, Plans, Question, VideoShell} from '../moovi-kit/stage';
import {camPath} from '../moovi-kit/poses';

export const M06 = {id: 'Moovi06', total: 1506, voice: 'moovi/voice06.mp3', bed: 'moovi/bed06.wav'};

const CHUNKS: [number, string][] = [
  [0, ''],
  [4.76, 'São 3 planos.'], [5.94, 'O Básico sai por 14,90 por mês,'], [8.7, 'o Pro 19,90'], [10.5, 'e o Premium 24,90.'],
  [12.88, 'O plano é anual'], [13.9, 'e dá pra parcelar em até 2× no cartão ou pagar no Pix.'],
  [18.34, 'O assistente com IA, que entende áudio e lê extrato,'], [21.3, 'vem a partir do Pro.'],
  [22.68, ''], [23.78, 'Nos primeiros 7 dias,'], [25.3, 'você pede todo o dinheiro de volta.'],
  [28.0, ''], [29.7, 'A Moovi não guarda o número do seu cartão,'], [32.26, 'e nada do extrato é lançado sem você confirmar.'],
  [35.04, 'O login é por um código que chega no seu e-mail,'], [37.5, 'sem senha pra decorar.'],
  [38.74, ''], [39.86, 'Por enquanto, você coloca a Moovi'], [41.2, 'na tela inicial do celular'], [43.0, 'e abre como se fosse um app.'],
  [44.62, 'O app pra iPhone e Android está vindo.'], [46.92, 'O link está na bio.'],
];

export const SFX06: SfxCue[] = [
  {at: 113, src: 'sfx/pop_soft.wav', volume: 0.45, why: 'pergunta 1'},
  {at: f(6.26), src: 'sfx/tick.wav', volume: 0.35, why: 'Básico'},
  {at: f(9.0), src: 'sfx/tick.wav', volume: 0.35, why: 'Pro'},
  {at: f(10.94), src: 'sfx/tick.wav', volume: 0.35, why: 'Premium'},
  {at: f(13.58), src: 'sfx/pop_soft.wav', volume: 0.35, why: 'formas de pagamento'},
  {at: f(18.62), src: 'sfx/shimmer.wav', volume: 0.25, why: 'IA destacada no Pro'},
  {at: 680, src: 'sfx/pop_soft.wav', volume: 0.45, why: 'pergunta 2'},
  {at: f(23.78), src: 'sfx/whoosh_soft.wav', volume: 0.3, why: 'garantia'},
  {at: 840, src: 'sfx/pop_soft.wav', volume: 0.45, why: 'pergunta 3'},
  {at: f(29.7), src: 'sfx/tick.wav', volume: 0.35, why: 'item de segurança'},
  {at: f(32.26), src: 'sfx/tick.wav', volume: 0.35, why: 'item de segurança'},
  {at: f(35.04), src: 'sfx/tick.wav', volume: 0.35, why: 'item de segurança'},
  {at: 1162, src: 'sfx/pop_soft.wav', volume: 0.45, why: 'pergunta 4'},
  {at: 1170, src: 'sfx/whoosh_soft.wav', volume: 0.3, why: 'celular entra'},
  {at: f(43.26), src: 'sfx/click_ui.wav', volume: 0.45, why: 'toque no ícone'},
  {at: f(45.26), src: 'sfx/tick.wav', volume: 0.35, why: 'app em breve'},
  {at: 1412, src: 'sfx/shimmer.wav', volume: 0.3, why: 'assinatura'},
];

const Pill: React.FC<{at: number; y: number; text: string}> = ({at, y, text}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const e = springIn(frame, fps, at, 'snappy');
  return (
    <div style={{position: 'absolute', top: y, width: '100%', display: 'flex', justifyContent: 'center'}}>
      <div style={{fontFamily: F, fontWeight: 700, fontSize: 44, color: '#fff', padding: '18px 34px', borderRadius: 999, border: '2px solid rgba(255,255,255,0.3)',
        background: 'rgba(255,255,255,0.08)', opacity: e, transform: `translateY(${(1 - e) * 24}px)`}}>{text}</div>
    </div>
  );
};

export const Moovi06: React.FC<{debugSafeArea?: boolean}> = ({debugSafeArea}) => {
  const cam = camPath([[0, 'hidden'], [1164, 'low', 'out']], 22);
  return (
    <VideoShell voice={M06.voice} bed={M06.bed} total={M06.total} sfx={SFX06} chunks={CHUNKS} capEnd={48.4} duck={[{from: 8, to: 1410}]} debugSafeArea={debugSafeArea}>
      <Beat from={0} to={110}>
        <Kinetic y={600} lines={[
          {text: 'Essas são as perguntas', starts: [f(0.52), f(0.66), f(0.82), f(1.16)], size: 96},
          {text: 'que mais chegam', starts: [f(1.62), f(1.92), f(2.24)], size: 96},
          {text: 'sobre a Moovi.', starts: [f(2.58), f(2.88), f(3.08)], size: 110, highlight: ['Moovi.']},
        ]} />
      </Beat>
      <Beat from={110} to={676}>
        <Question text="Quanto custa?" at={113} />
        <Plans at={[f(6.26), f(9.0), f(10.94)]} billingAt={f(13.58)} proFeaturesAt={f(18.62)} />
      </Beat>
      <Beat from={678} to={836}>
        <Question text="E se eu não gostar?" at={680} />
        <Guarantee at={f(23.78)} />
      </Beat>
      <Beat from={838} to={1158}>
        <Question text="Meus dados ficam seguros?" at={840} size={62} />
        <InfoList y={560} items={[
          {icon: 'database', text: 'Não guarda o número do seu cartão', at: f(29.7)},
          {icon: 'check', text: 'Nada do extrato é lançado sem você confirmar', at: f(32.26)},
          {icon: 'mail', text: 'Login por código no e-mail, sem senha', at: f(35.04)},
        ]} />
      </Beat>
      <Beat from={1160} to={1352}><Question text="Tem aplicativo?" at={1162} /></Beat>
      <Beat from={1354} to={1404}><Pill at={1356} y={390} text="App iPhone e Android: em breve" /></Beat>
      <PhoneStage cam={{...cam, opacity: [{at: 1164, value: 0}, {at: 1172, value: 1}, {at: 1398, value: 1}, {at: 1408, value: 0}], blur: [{at: 1398, value: 0}, {at: 1408, value: 16}]}} screens={[
        {from: 0, node: <HomeScreen addAt={f(40.86)} tapAt={f(43.26)} />},
        {from: f(43.26) + 4, node: <Splash at={f(43.26) + 4} />, enter: 'fade'},
        {from: f(44.2), node: <Dashboard cfg={{cascadeAt: f(44.2) + 2}} />, enter: 'fade'},
      ]} />
      <EndCard at={1410} headline="Seu dinheiro, organizado." sub="Planos a partir de R$ 14,90/mês · 7 dias de garantia" hint="Link na bio" />
    </VideoShell>
  );
};
