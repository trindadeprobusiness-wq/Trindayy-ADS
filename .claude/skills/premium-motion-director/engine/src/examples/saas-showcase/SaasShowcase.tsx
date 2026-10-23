import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {
  AppWindow, CTAReveal, Camera, Card, CharStagger, CountUp, Cursor, Disclosure, Enter, FlowEdge, FlowNode, GradientField, Grain,
  GridLines, Icon, LineChart, MusicBed, SafeArea, Scene, SfxCues, ThemeProvider, Toast, Toggle, Vignette, WordReveal, ease,
  progress, saasCinematic, scene, springIn,
} from '../../lib';
import type {IconName, Timeline} from '../../lib';
import raw from './timeline.json';

const tl = raw as unknown as Timeline;
const theme = saasCinematic;
const W = 1600;
const H = 900;
/** Content-area (below the 44px title bar) coordinates → camera world coordinates. */
const world = (cx: number, cy: number) => ({x: cx - W / 2, y: cy + 44 - H / 2});

// Local beat sheet of the continuous app shot (frames relative to the app scene).
const T = {kpi: 20, chart: 40, cursorIn: 96, clickNew: 140, panel: 142, nodes: 165, hoverFlow: 215, clickOn: 280, panelOut: 300, toast: 320, end: 396};

const NAV: {icon: IconName; label: string}[] = [
  {icon: 'home', label: 'Visão geral'}, {icon: 'flow', label: 'Automações'}, {icon: 'database', label: 'Integrações'},
  {icon: 'chart', label: 'Relatórios'}, {icon: 'gear', label: 'Configurações'},
];

const Sidebar: React.FC = () => (
  <div style={{width: 230, borderRight: `1px solid ${theme.colors.line}`, padding: '26px 18px', boxSizing: 'border-box'}}>
    <div style={{display: 'flex', alignItems: 'center', gap: 10, fontSize: 22, fontWeight: 700, marginBottom: 34, paddingLeft: 8}}>
      <div style={{width: 30, height: 30, borderRadius: 9, background: theme.colors.accent, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Icon name="bolt" size={18} color="#04110D" stroke={2.4} />
      </div>Fluxo
    </div>
    {NAV.map((n, i) => (
      <div key={n.label} style={{display: 'flex', gap: 12, alignItems: 'center', padding: '11px 10px', borderRadius: 10, fontSize: 16, marginBottom: 4,
        background: i === 0 ? `${theme.colors.fg}0F` : 'transparent', color: i === 0 ? theme.colors.fg : theme.colors.muted}}>
        <Icon name={n.icon} size={19} color={i === 0 ? theme.colors.fg : theme.colors.muted} />{n.label}
      </div>
    ))}
  </div>
);

const Kpi: React.FC<{x: number; at: number; label: string; children: React.ReactNode; delta?: string; flash?: number}> = ({x, at, label, children, delta, flash = 0}) => (
  <div style={{position: 'absolute', left: x, top: 110, width: 416}}>
    <Enter at={at} distance={20}>
      <Card glow={flash} style={{height: 140, boxSizing: 'border-box', padding: 24}}>
        <div style={{fontSize: 15, color: theme.colors.muted}}>{label}</div>
        <div style={{display: 'flex', alignItems: 'baseline', gap: 12, marginTop: 14}}>
          <div style={{fontSize: 46, fontWeight: 700, letterSpacing: '-0.02em'}}>{children}</div>
          {delta && <div style={{fontSize: 15, color: theme.colors.accent, fontWeight: 600}}>{delta}</div>}
        </div>
      </Card>
    </Enter>
  </div>
);

const Dashboard: React.FC = () => {
  const frame = useCurrentFrame();
  const activated = frame >= T.clickOn;
  const flash = progress(frame, T.panelOut + 10, 10) * (1 - progress(frame, T.panelOut + 40, 30));
  const rows = [
    {name: 'Boas-vindas a novos clientes', on: true}, {name: 'Cobrança recorrente', on: true}, {name: 'Relatório semanal', on: false},
  ];
  const newRow = progress(frame, T.panelOut + 8, 14, ease.out);
  return (
    <>
      <div style={{position: 'absolute', left: 266, top: 30, fontSize: 30, fontWeight: 600, letterSpacing: '-0.02em'}}>Visão geral</div>
      <div style={{position: 'absolute', left: 1340, top: 26}}>
        <ButtonPress />
      </div>
      <Kpi x={266} at={T.kpi} label="Leads processados" delta="+12%" flash={flash}>
        <CountUp from={activated ? 1284 : 0} to={activated ? 1291 : 1284} start={activated ? T.panelOut + 10 : T.kpi} duration={activated ? 30 : 50} />
      </Kpi>
      <Kpi x={706} at={T.kpi + 6} label="Horas economizadas / mês">
        <CountUp to={86} start={T.kpi + 6} duration={50} suffix=" h" />
      </Kpi>
      <Kpi x={1146} at={T.kpi + 12} label="Automações ativas" flash={flash}>
        {activated && frame >= T.panelOut + 10 ? 8 : <CountUp to={7} start={T.kpi + 12} duration={40} />}
      </Kpi>
      <div style={{position: 'absolute', left: 266, top: 274}}>
        <Enter at={T.chart - 6} distance={24}>
          <Card style={{width: 746, height: 546, boxSizing: 'border-box', padding: 28}}>
            <div style={{fontSize: 17, fontWeight: 600}}>Execuções</div>
            <div style={{fontSize: 14, color: theme.colors.muted, marginTop: 4}}>Últimos 30 dias</div>
            <div style={{marginTop: 40}}>
              <LineChart values={[12, 18, 15, 22, 28, 26, 34, 39, 37, 45, 52, 50, 61, 68]} width={690} height={370} start={T.chart} duration={55} />
            </div>
          </Card>
        </Enter>
      </div>
      <div style={{position: 'absolute', left: 1036, top: 274}}>
        <Enter at={T.chart} distance={24}>
          <Card style={{width: 526, height: 546, boxSizing: 'border-box', padding: 28}}>
            <div style={{fontSize: 17, fontWeight: 600, marginBottom: 18}}>Automações</div>
            {newRow > 0 && (
              <div style={{height: 64 * newRow, overflow: 'hidden', opacity: newRow}}>
                <Row name="Qualificação de leads" on highlight />
              </div>
            )}
            {rows.map((r) => <Row key={r.name} name={r.name} on={r.on} />)}
          </Card>
        </Enter>
      </div>
    </>
  );
};

const Row: React.FC<{name: string; on: boolean; highlight?: boolean}> = ({name, on, highlight}) => (
  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64, borderBottom: `1px solid ${theme.colors.line}`,
    fontSize: 16, color: highlight ? theme.colors.fg : '#C9CBD6'}}>
    <div style={{display: 'flex', gap: 12, alignItems: 'center'}}>
      <Icon name={highlight ? 'sparkle' : 'flow'} size={18} color={highlight ? theme.colors.accent : theme.colors.muted} />{name}
    </div>
    <div style={{fontSize: 13, fontWeight: 600, padding: '5px 10px', borderRadius: 999, color: on ? theme.colors.accent : theme.colors.muted,
      background: on ? `${theme.colors.accent}1A` : `${theme.colors.fg}0D`}}>{on ? 'Ativa' : 'Pausada'}</div>
  </div>
);

const ButtonPress: React.FC = () => {
  const frame = useCurrentFrame();
  const press = Math.max(0, 1 - Math.abs(frame - T.clickNew) / 5);
  return (
    <div style={{display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 20px', borderRadius: 12, background: theme.colors.accent,
      color: '#04110D', fontWeight: 600, fontSize: 16, transform: `scale(${1 - press * 0.05})`, width: 230, boxSizing: 'border-box', justifyContent: 'center'}}>
      <Icon name="plus" size={18} color="#04110D" stroke={2.6} />Nova automação
    </div>
  );
};

const FlowPanel: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const open = springIn(frame, fps, T.panel, 'precise');
  const close = progress(frame, T.panelOut, 12, ease.in);
  if (frame < T.panel || close >= 1) return null;
  const on = progress(frame, T.clickOn, 8, ease.standard);
  const nodes = [
    {x: 470, label: 'Novo lead', sub: 'Formulário do site', icon: 'user' as IconName},
    {x: 915, label: 'Qualificar com IA', sub: 'Pontua e classifica', icon: 'sparkle' as IconName},
    {x: 1360, label: 'Enviar ao CRM', sub: 'Cria oportunidade', icon: 'database' as IconName},
  ];
  const y = 470;
  const live = frame >= T.clickOn;
  return (
    <div style={{position: 'absolute', left: 250, top: 96, width: 1330, height: 740, opacity: open * (1 - close),
      transform: `translateY(${(1 - open) * 30 + close * 20}px) scale(${0.98 + open * 0.02})`}}>
      <Card style={{position: 'absolute', inset: 0, padding: 0, background: theme.colors.bg2, boxShadow: '0 40px 100px -20px rgba(0,0,0,0.8)'}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 30px', borderBottom: `1px solid ${theme.colors.line}`}}>
          <div>
            <div style={{fontSize: 14, color: theme.colors.muted}}>Nova automação</div>
            <div style={{fontSize: 24, fontWeight: 600, marginTop: 4}}>Qualificação de leads</div>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: 16, fontSize: 16, color: live ? theme.colors.accent : theme.colors.muted, fontWeight: 600}}>
            {live ? 'Ativa' : 'Rascunho'}<Toggle on={on} />
          </div>
        </div>
        <svg style={{position: 'absolute', inset: 0, opacity: 0.5}} width={1330} height={740}>
          <defs><pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.4" fill={theme.colors.line} /></pattern></defs>
          <rect y={100} width={1330} height={640} fill="url(#dots)" />
        </svg>
      </Card>
      {/* Panel-local coordinates: content x minus 250, y minus 96 */}
      {nodes.slice(0, -1).map((n, i) => (
        <FlowEdge key={i} from={{x: n.x - 250 + 188, y: y - 96}} to={{x: nodes[i + 1].x - 250 - 188, y: y - 96}} drawAt={T.nodes + 8 + i * 12}
          pulseAt={live ? T.clickOn + 6 + i * 18 : T.hoverFlow - 20 + i * 18} pulseDuration={20} />
      ))}
      {nodes.map((n, i) => (
        <FlowNode key={n.label} x={n.x - 250} y={y - 96} label={n.label} sub={n.sub} icon={n.icon} at={T.nodes + i * 12} width={300} scale={1.25}
          active={live ? progress(frame, T.clickOn + 6 + i * 18, 6) : 0} />
      ))}
    </div>
  );
};

const AppShot: React.FC = () => {
  const btn = world(1455, 50);
  const flow = world(915, 470);
  const tog = world(1500, 150);
  return (
    <Camera driftAmount={3} perspective={2200} keys={[
      {at: 0, scale: 0.72, y: -60, rotateX: 20},
      {at: 44, scale: 0.86, y: 0, rotateX: 0, ease: 'out'},
      {at: 100, scale: 0.88, x: 0, ease: 'softOut'},
      {at: 138, x: btn.x - 230, y: btn.y + 130, scale: 1.32, ease: 'inOut'},
      {at: 150, x: btn.x - 230, y: btn.y + 130, scale: 1.32},
      {at: 200, x: flow.x, y: flow.y - 20, scale: 1.18, ease: 'inOut'},
      {at: 242, x: flow.x, y: flow.y - 20, scale: 1.2, ease: 'softOut'},
      {at: 272, x: tog.x - 300, y: tog.y + 160, scale: 1.3, ease: 'inOut'},
      {at: 292, x: tog.x - 300, y: tog.y + 160, scale: 1.3},
      {at: 345, x: 0, y: 0, scale: 0.92, ease: 'inOut'},
      {at: T.end, x: 0, y: 0, scale: 0.95, ease: 'softOut'},
    ]}>
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
        <AppWindow width={W} height={H} title="app.fluxo.demo">
          <Sidebar />
          <div style={{position: 'absolute', inset: 0}}>
            <Dashboard />
            <FlowPanel />
            <div style={{position: 'absolute', right: 30, bottom: 30}}>
              <Toast at={T.toast} title="Automação publicada" body="Qualificação de leads está ativa" />
            </div>
            <Cursor appearAt={T.cursorIn} clicks={[T.clickNew, T.clickOn]} path={[
              {at: T.cursorIn, x: 900, y: 640}, {at: T.clickNew - 8, x: 1450, y: 52}, {at: T.clickNew + 20, x: 1420, y: 70},
              {at: T.hoverFlow, x: 925, y: 500}, {at: T.clickOn - 7, x: 1503, y: 152}, {at: T.clickOn + 40, x: 1380, y: 330},
            ]} />
          </div>
        </AppWindow>
      </AbsoluteFill>
    </Camera>
  );
};

export const SaasShowcase: React.FC<{debugSafeArea?: boolean}> = ({debugSafeArea}) => {
  const title = scene(tl, 'title');
  const app = scene(tl, 'app');
  const end = scene(tl, 'end');
  return (
    <ThemeProvider theme={theme}>
      <AbsoluteFill style={{background: theme.colors.bg, color: theme.colors.fg, fontFamily: theme.fonts.text}}>
        <GradientField opacity={0.14} speed={0.7} colors={[theme.colors.accent, theme.colors.accent2]} />
        <Scene {...title} name="title" transitionOut={{type: 'blur', frames: 12}}>
          <GridLines spacing={96} start={0} drawDuration={36} />
          <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 28}}>
            <CharStagger text="Fluxo" start={8} stagger={3} fontSize={170} weight={700} />
            <WordReveal text="Automação de operações, em um só painel." start={22} stagger={3} fontSize={44} weight={400} mode="blur"
              color={theme.colors.muted} letterSpacing="-0.01em" />
          </AbsoluteFill>
        </Scene>
        <Scene {...app} name="app">
          <AppShot />
          <Disclosure text="Demonstração · produto e dados fictícios" at={20} />
        </Scene>
        <Scene {...end} name="end">
          <GridLines spacing={96} start={0} drawDuration={30} opacity={0.6} />
          <CTAReveal start={10} headline="Menos operação. Mais decisão." sub="Fluxo — automação de operações" button="Agende uma demonstração" fontSize={96} />
        </Scene>
        <MusicBed src={tl.audio.music!.src} volume={tl.audio.music!.volume} total={tl.durationInFrames} fadeIn={10} fadeOut={30} />
        <SfxCues cues={tl.audio.sfx} />
        <Vignette strength={0.4} />
        <Grain />
        <SafeArea show={debugSafeArea} />
      </AbsoluteFill>
    </ThemeProvider>
  );
};
