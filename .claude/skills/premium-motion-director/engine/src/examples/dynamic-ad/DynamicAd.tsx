import React from 'react';
import {AbsoluteFill, Html5Audio, random, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {
  BarChart, CTAReveal, Captions, Card, Enter, FlowEdge, FlowNode, GradientField, Grain, Icon, KineticLines, MusicBed, SafeArea,
  Scene, SfxCues, StrikeThrough, ThemeProvider, Vignette, WordReveal, ease, highRetention, progress, scene, springIn,
} from '../../lib';
import type {IconName, Timeline, TimedWord} from '../../lib';
import raw from './timeline.json';
import wordMap from './word-map.json';

const tl = raw as unknown as Timeline;
const theme = highRetention;
const words = wordMap.words as TimedWord[];
/** Narration-driven start frame of word `i`, relative to a scene starting at `sceneFrom`. */
const w = (i: number, sceneFrom: number) => words[i].startFrame - sceneFrom;

const Label: React.FC<{children: React.ReactNode; color?: string}> = ({children, color}) => (
  <div style={{fontFamily: theme.fonts.mono, fontSize: 26, letterSpacing: '0.18em', color: color ?? theme.colors.muted}}>{children}</div>
);

/* Scene 1 — repetition that goes nowhere */
const Hook: React.FC<{from: number}> = ({from}) => {
  const frame = useCurrentFrame();
  const loop = 26;
  const cycle = Math.floor(frame / loop);
  const fill = progress(frame % loop, 0, loop - 4, ease.inOut) * 0.82;
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 70}}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0}}>
        <WordReveal text="Você perde" wordStarts={[w(1, from) - 4, w(2, from)]} fontSize={150} weight={700} color={theme.colors.fg} />
        <WordReveal text="tempo." wordStarts={[w(3, from)]} fontSize={260} weight={800} color={theme.colors.danger} letterSpacing="-0.05em" />
      </div>
      <Enter at={w(5, from) - 6} distance={24}>
        <Card style={{width: 760, padding: 30, boxSizing: 'border-box'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 28}}>
            <div style={{display: 'flex', gap: 14, alignItems: 'center'}}><Icon name="copy" size={30} color={theme.colors.muted} />Copiando dados…</div>
            <div style={{fontFamily: theme.fonts.mono, color: theme.colors.danger, fontSize: 26}}>repetição {String(cycle + 12).padStart(2, '0')}</div>
          </div>
          <div style={{marginTop: 22, height: 14, borderRadius: 7, background: theme.colors.line, overflow: 'hidden'}}>
            <div style={{width: `${fill * 100}%`, height: '100%', background: theme.colors.muted, borderRadius: 7}} />
          </div>
        </Card>
      </Enter>
    </AbsoluteFill>
  );
};

/* Scene 2 — one slow lane vs. a fast organized stream */
const Split: React.FC<{from: number}> = ({from}) => {
  const frame = useCurrentFrame();
  const {width} = useVideoConfig();
  const slowX = 120 + frame * 1.2;
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', top: 0, left: 0, width, height: 960, background: theme.colors.bg2, overflow: 'hidden'}}>
        <div style={{position: 'absolute', left: 80, top: 260}}><Label>VOCÊ</Label></div>
        <div style={{position: 'absolute', left: slowX, top: 470}}>
          <Card style={{width: 520, padding: 30, boxSizing: 'border-box'}}>
            <div style={{display: 'flex', gap: 14, alignItems: 'center', fontSize: 32}}><Icon name="sheet" size={36} color={theme.colors.muted} />planilha_v7_final.xlsx</div>
            <div style={{marginTop: 16, height: 10, borderRadius: 5, background: theme.colors.line}}>
              <div style={{width: `${8 + frame * 0.06}%`, height: '100%', background: theme.colors.muted, borderRadius: 5}} />
            </div>
          </Card>
        </div>
      </div>
      <div style={{position: 'absolute', top: 960, left: 0, width, height: 960, overflow: 'hidden'}}>
        <KineticLines count={16} speed={55} opacity={0.35} seed="split" />
        <div style={{position: 'absolute', left: 80, top: 130}}><Label color={theme.colors.accent}>ELES</Label></div>
        {Array.from({length: 12}).map((_, i) => {
          const row = i % 3;
          const speed = 26 + row * 6;
          const x = ((random(`s${i}`) * 1600 + frame * speed) % 1700) - 420;
          const icons: IconName[] = ['sheet', 'mail', 'doc'];
          return (
            <div key={i} style={{position: 'absolute', left: x, top: 260 + row * 150}}>
              <Card glow={0.25} style={{width: 300, padding: 18, display: 'flex', gap: 14, alignItems: 'center', boxSizing: 'border-box'}}>
                <Icon name={icons[row]} size={28} color={theme.colors.accent} />
                <div style={{flex: 1, height: 8, borderRadius: 4, background: theme.colors.accent, opacity: 0.6}} />
                <Icon name="check" size={26} color={theme.colors.accent} stroke={2.6} />
              </Card>
            </div>
          );
        })}
      </div>
      <div style={{position: 'absolute', top: 959, left: 0, width, height: 2, background: theme.colors.line}} />
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
        <div style={{padding: '18px 44px', borderRadius: 24, background: 'rgba(7,7,10,0.86)', border: `1px solid ${theme.colors.line}`,
          opacity: progress(frame, w(11, from) - 4, 6)}}>
          <WordReveal text="automatizando" wordStarts={[w(11, from) - 2]} fontSize={112} weight={800} color={theme.colors.accent} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* Scene 3 — three tasks, each landing exactly on its spoken word */
const Triad: React.FC<{from: number}> = ({from}) => {
  const frame = useCurrentFrame();
  const items: {word: string; icon: IconName; at: number}[] = [
    {word: 'Planilhas', icon: 'sheet', at: w(13, from)}, {word: 'E-mails', icon: 'mail', at: w(14, from)}, {word: 'Relatórios', icon: 'doc', at: w(15, from)},
  ];
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 44}}>
      {items.map((it) => {
        const done = progress(frame, it.at + 10, 12);
        return (
          <Enter key={it.word} at={it.at - 2} distance={60} scaleFrom={0.9}>
            <Card glow={done * 0.6} style={{width: 820, padding: '34px 44px', display: 'flex', alignItems: 'center', gap: 34, boxSizing: 'border-box'}}>
              <div style={{width: 96, height: 96, borderRadius: 24, background: `${theme.colors.accent}1F`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Icon name={it.icon} size={52} color={theme.colors.accent} />
              </div>
              <div style={{flex: 1, fontSize: 76, fontWeight: 700, letterSpacing: '-0.03em'}}>{it.word}</div>
              <div style={{width: 64, height: 64, borderRadius: 32, border: `3px solid ${done > 0 ? theme.colors.accent : theme.colors.line}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${theme.colors.accent}${done > 0.5 ? '33' : '00'}`}}>
                <Icon name="check" size={36} color={theme.colors.accent} stroke={3} draw={done} />
              </div>
            </Card>
          </Enter>
        );
      })}
    </AbsoluteFill>
  );
};

/* Scene 4 — loose tasks become one system */
const Flow: React.FC<{from: number}> = ({from}) => {
  const frame = useCurrentFrame();
  const core = {x: 540, y: 1110};
  const nodes: {x: number; y: number; label: string; icon: IconName}[] = [
    {x: 280, y: 720, label: 'Planilhas', icon: 'sheet'}, {x: 720, y: 720, label: 'E-mails', icon: 'mail'}, {x: 540, y: 1430, label: 'Relatórios', icon: 'doc'},
  ];
  const coreP = springIn(frame, 30, 4, 'snappy');
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', top: 250, width: '100%', display: 'flex', justifyContent: 'center'}}>
        <WordReveal text="Tudo no automático." wordStarts={[w(16, from), w(17, from), w(18, from)]} fontSize={120} weight={800}
          highlight={['automático.']} highlightSweep maxWidth={860} />
      </div>
      {nodes.map((n, i) => (
        <FlowEdge key={`e${i}`} from={core} to={{x: n.x, y: n.y}} drawAt={8 + i * 3} pulseAt={20 + i * 5} pulseDuration={20} />
      ))}
      {nodes.map((n, i) => (
        <FlowNode key={n.label} x={n.x} y={n.y} label={n.label} icon={n.icon} at={2 + i * 3} active={progress(frame, 34 + i * 4, 6)} width={270} scale={1.45} />
      ))}
      <div style={{position: 'absolute', left: core.x - 70, top: core.y - 70, width: 140, height: 140, borderRadius: 40, background: theme.colors.accent,
        display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${coreP})`, boxShadow: `0 0 80px -10px ${theme.colors.accent}`}}>
        <Icon name="bolt" size={70} color="#04110D" stroke={2.4} />
      </div>
    </AbsoluteFill>
  );
};

/* Scene 5 — mindset pivot */
const Pivot: React.FC<{from: number}> = ({from}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const grow = springIn(frame, fps, w(24, from), 'snappy');
  const firstOut = progress(frame, w(22, from) - 6, 8, ease.in);
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
      <div style={{position: 'absolute', top: 1170, left: 190, opacity: progress(frame, w(24, from) - 8, 10)}}>
        <BarChart values={[2, 3, 3.5, 5, 6.5, 9]} width={700} height={340} start={w(24, from) - 6} stagger={2} />
      </div>
      <div style={{position: 'absolute', top: 560, width: '100%', textAlign: 'center', opacity: 1 - firstOut * 0.75,
        transform: `translateY(${-firstOut * 120}px) scale(${1 - firstOut * 0.25})`}}>
        <div style={{fontSize: 120, fontWeight: 800, letterSpacing: '-0.04em', fontFamily: theme.fonts.display,
          opacity: progress(frame, w(19, from) - 2, 6), transform: `translateY(${(1 - progress(frame, w(19, from) - 2, 8)) * 40}px)`}}>
          Pare de <StrikeThrough at={words[21].endFrame - from - 4} duration={8}>operar.</StrikeThrough>
        </div>
      </div>
      <div style={{position: 'absolute', top: 760, width: '100%', textAlign: 'center'}}>
        <WordReveal text="Comece a" wordStarts={[w(22, from), w(23, from)]} fontSize={110} weight={700} color={theme.colors.muted} />
        <div style={{fontSize: 190 * (0.7 + grow * 0.3), fontWeight: 800, letterSpacing: '-0.05em', color: theme.colors.accent, opacity: grow,
          fontFamily: theme.fonts.display, lineHeight: 1, textShadow: `0 0 60px ${theme.colors.accent}55`}}>escalar.</div>
      </div>
    </AbsoluteFill>
  );
};

export const DynamicAd: React.FC<{debugSafeArea?: boolean}> = ({debugSafeArea}) => {
  const ids = ['hook', 'split', 'triad', 'flow', 'pivot', 'cta'] as const;
  const [hook, split, triad, flow, pivot, cta] = ids.map((id) => scene(tl, id));
  const narration = tl.audio.narration;
  // Captions only where the big type does not already say the same words (avoid redundant text).
  const captionPhrases = wordMap.phrases.filter((p) => p.endFrame < triad.from);
  return (
    <ThemeProvider theme={theme}>
      <AbsoluteFill style={{background: theme.colors.bg, fontFamily: theme.fonts.text, color: theme.colors.fg}}>
        <GradientField opacity={0.16} speed={1.4} />
        <Scene {...hook} name="hook"><Hook from={hook.from} /></Scene>
        <Scene {...split} name="split"><Split from={split.from} /></Scene>
        <Scene {...triad} name="triad"><Triad from={triad.from} /></Scene>
        <Scene {...flow} name="flow"><Flow from={flow.from} /></Scene>
        <Scene {...pivot} name="pivot"><Pivot from={pivot.from} /></Scene>
        <Scene {...cta} name="cta" background={theme.colors.bg}>
          <GradientField opacity={0.35} speed={0.8} />
          <CTAReveal start={w(25, cta.from)} headline={'Automação\ncom IA'} sub="Gabriel Trindade · Produto & Automação"
            button="Fale comigo" pressAt={92} fontSize={128} buttonSize={40} subSize={38} />
        </Scene>

        <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 420}}>
          <Captions phrases={captionPhrases} words={words} fontSize={46} style={{maxWidth: 860, padding: '14px 26px', borderRadius: 18,
            background: 'rgba(0,0,0,0.55)'}} />
        </AbsoluteFill>

        {narration && <Html5Audio src={staticFile(narration.src)} volume={narration.volume} />}
        <MusicBed src={tl.audio.music!.src} volume={tl.audio.music!.volume} total={tl.durationInFrames} fadeIn={6} fadeOut={30}
          duck={narration ? wordMap.phrases.map((p) => ({from: p.startFrame, to: p.endFrame})) : []} />
        <SfxCues cues={tl.audio.sfx} />
        <Vignette strength={0.45} />
        <Grain />
        <SafeArea show={debugSafeArea} />
      </AbsoluteFill>
    </ThemeProvider>
  );
};
