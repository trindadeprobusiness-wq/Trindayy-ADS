// MOOVI_04 — "Se você caiu aqui e não sabe o que é a Moovi, em um minuto eu te explico." (≈37 s de voz)
// Ideia-mestra: explicador em tour — painel (tudo do dinheiro) → você fala → WhatsApp só avisa → "você fala, a Moovi organiza".
import React from 'react';
import {Img, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {mix, springIn} from '../../lib';
import type {SfxCue} from '../../lib';
import {Bold, C, F, brl, f} from '../moovi-kit/base';
import {BotBubble, Cards, Chat, Commitments, Dashboard, Goals, LockScreen, UserBubble} from '../moovi-kit/screens';
import {Beat, ChipList, EndCard, Kinetic, PhoneStage, StrikeWord, VideoShell} from '../moovi-kit/stage';
import {camPath} from '../moovi-kit/poses';

export const M04 = {id: 'Moovi04', total: 1188, voice: 'moovi/voice04.mp3', bed: 'moovi/bed04.wav'};

const CHUNKS: [number, string][] = [
  [0, ''],
  [7.6, 'Você tem um painel'], [8.6, 'no celular ou no computador,'], [10.38, 'onde fica tudo do seu dinheiro:'],
  [12.32, 'o que entrou, o que saiu,'], [14.04, 'suas contas, seus cartões,'], [15.9, 'o que tem pra pagar e as suas metas.'],
  [18.22, ''],
  [21.2, 'É só escrever ou mandar um áudio,'], [23.3, 'tipo “gastei 50 no mercado”,'], [25.4, 'que ela anota e coloca na categoria certa.'],
  [28.08, 'No WhatsApp, ela só te avisa:'], [30.06, 'conta pra vencer, compromisso'], [32.02, 'e um resumo da sua semana, todo domingo.'],
  [34.54, 'Resumindo:'], [35.44, ''],
];

export const SFX04: SfxCue[] = [
  {at: f(3.62), src: 'sfx/tick.wav', volume: 0.45, why: 'cronômetro de 1 minuto começa'},
  {at: f(5.16), src: 'sfx/whoosh_soft.wav', volume: 0.35, why: 'entra a marca'},
  {at: 224, src: 'sfx/whoosh_soft.wav', volume: 0.35, why: 'celular entra'},
  {at: f(12.62), src: 'sfx/tick.wav', volume: 0.35, why: 'entrou / saiu'},
  {at: 432, src: 'sfx/whoosh_fast.wav', volume: 0.25, why: 'contas'},
  {at: 457, src: 'sfx/whoosh_fast.wav', volume: 0.25, why: 'cartões'},
  {at: 527, src: 'sfx/whoosh_fast.wav', volume: 0.25, why: 'metas'},
  {at: f(20.14), src: 'sfx/whoosh_fast.wav', volume: 0.35, why: 'risca a planilha'},
  {at: 618, src: 'sfx/whoosh_soft.wav', volume: 0.3, why: 'celular volta'},
  {at: 748, src: 'moovi/msg_send.wav', volume: 0.45, why: 'mensagem enviada'},
  {at: 778, src: 'moovi/msg_recv.wav', volume: 0.45, why: 'anotado na categoria'},
  {at: f(30.06), src: 'moovi/msg_recv.wav', volume: 0.45, why: 'aviso de conta'},
  {at: f(31.28), src: 'moovi/msg_recv.wav', volume: 0.4, why: 'aviso de compromisso'},
  {at: f(32.28), src: 'moovi/msg_recv.wav', volume: 0.4, why: 'resumo de domingo'},
  {at: 1038, src: 'sfx/shimmer.wav', volume: 0.3, why: 'assinatura'},
];

/** "Em um minuto eu te explico": a 60-second ring starts ticking. */
const Stopwatch: React.FC<{at: number}> = ({at}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const e = springIn(frame, fps, at, 'snappy');
  const run = Math.max(0, frame - at) / (60 * fps);
  const r = 70;
  const L = 2 * Math.PI * r;
  return (
    <div style={{position: 'absolute', top: 1110, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 26, fontFamily: F,
      opacity: e, transform: `translateY(${(1 - e) * 30}px)`}}>
      <svg width={170} height={170} style={{transform: 'rotate(-90deg)'}}>
        <circle cx={85} cy={85} r={r} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth={12} />
        <circle cx={85} cy={85} r={r} fill="none" stroke={C.brandBright} strokeWidth={12} strokeLinecap="round" strokeDasharray={`${L * run} ${L}`} />
      </svg>
      <div style={{fontSize: 64, fontWeight: 800, color: '#fff', letterSpacing: '-0.03em'}}>em 1 minuto</div>
    </div>
  );
};

/** Brand reveal: "A Moovi é um assistente financeiro." */
const BrandIs: React.FC<{at: number}> = ({at}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const e = springIn(frame, fps, at, 'calm');
  return (
    <div style={{position: 'absolute', top: 560, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Img src={staticFile('moovi/logo_full_white.png')} style={{width: 520, opacity: e, transform: `scale(${mix(0.9, 1, e)})`}} />
    </div>
  );
};

export const Moovi04: React.FC<{debugSafeArea?: boolean}> = ({debugSafeArea}) => {
  const cam = camPath([[0, 'hidden'], [222, 'dash', 'out'], [430, 'page'], [540, 'hidden', 'in'], [612, 'chat', 'out'], [836, 'lockWide']], 20);
  const msgs = [
    {at: 748, h: 108, node: <UserBubble>gastei 50 no mercado</UserBubble>},
    {at: 778, h: 136, node: <BotBubble>Anotado! <Bold>{brl(50)}</Bold> em <Bold>Alimentação</Bold>.</BotBubble>},
  ];
  return (
    <VideoShell voice={M04.voice} bed={M04.bed} total={M04.total} sfx={SFX04} chunks={CHUNKS} capEnd={37.2} duck={[{from: 8, to: 1036}]} debugSafeArea={debugSafeArea}>
      <Beat from={0} to={152}>
        <Kinetic y={520} lines={[
          {text: 'Se você caiu aqui', starts: [f(0.34), f(0.64), f(0.82), f(1.36)], size: 96},
          {text: 'não sabe o que é', starts: [f(1.7), f(1.98), f(2.22), f(2.3), f(2.48)], size: 96},
          {text: 'a Moovi?', starts: [f(2.76), f(2.82)], size: 120, highlight: ['Moovi?']},
        ]} />
        <Stopwatch at={f(3.62)} />
      </Beat>
      <Beat from={152} to={228}>
        <BrandIs at={f(5.16)} />
        <Kinetic y={930} lines={[{text: 'é um assistente financeiro.', starts: [f(5.9), f(5.92), f(6.22), f(6.86)], size: 84, highlight: ['assistente', 'financeiro.']}]} />
      </Beat>
      <PhoneStage cam={{...cam, dive: {from: 222, to: 250},
        opacity: [{at: 222, value: 0}, {at: 228, value: 1}, {at: 538, value: 1}, {at: 550, value: 0}, {at: 612, value: 0}, {at: 620, value: 1}, {at: 1024, value: 1}, {at: 1036, value: 0}],
        blur: [{at: 1024, value: 0}, {at: 1036, value: 16}]}} screens={[
        {from: 0, node: <Dashboard cfg={{cascadeAt: 236, kpiAt: [246, 254, 262, 270], highlights: [{key: 'receitas', from: f(12.62), to: f(13.48)}, {key: 'despesas', from: f(13.48), to: 430}]}} />},
        {from: 432, node: <Commitments addAt={440} />, enter: 'swipe'},
        {from: 457, node: <Cards at={460} />, enter: 'swipe'},
        {from: 527, node: <Goals at={530} />, enter: 'swipe'},
        {from: 600, node: <Chat msgs={msgs} typing={[{from: 645, to: 742, send: 748, text: 'gastei 50 no mercado'}]} />, enter: 'cut'},
        {from: 838, node: <LockScreen notifs={[
          {at: f(30.06), title: 'Conta de luz vence amanhã', body: <>{brl(197.63)} · dia 10</>},
          {at: f(31.28), title: 'Compromisso amanhã', body: <>Reunião com o contador · 14h</>},
          {at: f(32.28), title: 'Seu resumo da semana', body: <>Você gastou {brl(612.4)} · 2 contas vencem nesta semana</>},
        ]} />, enter: 'fade'},
      ]} />
      <Beat from={258} to={330}>
        <ChipList x={70} y={1290} items={[{label: 'no celular', at: f(9.08), icon: 'check'}, {label: 'no computador', at: f(9.62), icon: 'check'}]} />
      </Beat>
      <Beat from={548} to={614}>
        <StrikeWord text="preencher planilha" at={f(18.5)} strikeAt={f(20.14)} y={760} size={104} />
      </Beat>
      <EndCard at={1036} headline="Você fala, a Moovi organiza." sub="7 dias de garantia" hint="Link aqui embaixo" />
    </VideoShell>
  );
};
