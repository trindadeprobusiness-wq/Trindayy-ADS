import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {
  Camera, Card, Enter, Grain, Icon, LightPoint, MusicBed, ParticleField, Ring, SafeArea, Scene, SfxCues, ThemeProvider,
  TrackingIn, Vignette, WordReveal, applePremium, ease, keyframes, progress, scene, springIn,
} from '../../lib';
import type {Timeline} from '../../lib';
import raw from './timeline.json';

const tl = raw as unknown as Timeline;
const theme = applePremium;

/** Persistent layer: the light that becomes noise, order, and finally the product's ring. */
const LightStory: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const born = springIn(frame, fps, 8, 'heavy');
  const burst = progress(frame, 70, 34, ease.out);
  const toGrid = progress(frame, 186, 45, ease.inOut);
  const toPoint = progress(frame, 258, 38, ease.inOut);
  const ringDraw = progress(frame, 300, 34, ease.out);
  const particlesOpacity = keyframes(frame, [
    {at: 66, value: 0}, {at: 76, value: 1}, {at: 96, value: 0.5, ease: 'softOut'}, {at: 240, value: 0.55}, {at: 258, value: 1},
    {at: 296, value: 1}, {at: 304, value: 0},
  ]);
  const pointSize = frame < 110 ? 14 * born * (1 - burst) + 0.0001 : 14 * progress(frame, 282, 18, ease.out) * (1 - progress(frame, 304, 20, ease.out));
  const breathe = 1 + Math.sin(frame / 9) * 0.06;
  // The ring is a portal: it draws, then expands past the frame and dissolves before the benefits arrive.
  const ringOpen = progress(frame, 312, 40, ease.inOut);
  return (
    <AbsoluteFill>
      {pointSize > 0.01 && <LightPoint size={pointSize * breathe} glow={1.2} />}
      <ParticleField count={150} cols={15} toGrid={toGrid} toPoint={frame < 100 ? 1 - burst : toPoint} size={5} gridGap={46}
        area={{w: 1700, h: 900}} chaosDrift={30} opacity={particlesOpacity} seed="lumen" />
      {ringDraw > 0 && (
        <AbsoluteFill style={{opacity: 0.6 * (1 - ringOpen), transform: `scale(${1 + ringOpen * 1.6})`}}>
          <Ring radius={330} draw={ringDraw} stroke={1.5} />
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

const NoteCard: React.FC = () => {
  const frame = useCurrentFrame();
  const lines = ['Lançamento antecipado para novembro.', 'Onboarding precisa de menos etapas.', 'Time de dados assume as métricas.'];
  const summaryP = progress(frame, 52, 18, ease.out);
  return (
    <Card style={{width: 720, padding: 40, borderRadius: 26, background: 'rgba(22,22,26,0.82)', backdropFilter: 'blur(20px)'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: theme.colors.muted, fontSize: 18}}>
        <span>Reunião de produto</span><span style={{fontFamily: theme.fonts.mono, fontSize: 16}}>14:30</span>
      </div>
      <div style={{fontSize: 36, fontWeight: 600, letterSpacing: '-0.02em', marginTop: 14}}>Planejamento do Q4</div>
      <div style={{marginTop: 22, display: 'flex', flexDirection: 'column', gap: 12}}>
        {lines.map((l, i) => (
          <Enter key={l} at={14 + i * 7} distance={12}>
            <div style={{fontSize: 22, color: '#C7C7CC', display: 'flex', gap: 12, alignItems: 'center'}}>
              <span style={{width: 6, height: 6, borderRadius: 3, background: theme.colors.muted}} />{l}
            </div>
          </Enter>
        ))}
      </div>
      <div style={{marginTop: 30, padding: '18px 22px', borderRadius: 16, background: `${theme.colors.accent}14`, border: `1px solid ${theme.colors.accent}44`,
        opacity: summaryP, transform: `translateY(${(1 - summaryP) * 14}px)`, display: 'flex', gap: 14, alignItems: 'center'}}>
        <Icon name="sparkle" size={24} color={theme.colors.accent} draw={progress(frame, 54, 20)} />
        <div style={{fontSize: 21}}><span style={{color: theme.colors.accent, fontWeight: 600}}>Resumo</span>
          <span style={{color: theme.colors.fg}}> · 3 decisões · 2 próximos passos</span></div>
      </div>
    </Card>
  );
};

export const PremiumProduct: React.FC<{debugSafeArea?: boolean}> = ({debugSafeArea}) => {
  const birth = scene(tl, 'birth');
  const noise = scene(tl, 'noise');
  const clarity = scene(tl, 'clarity');
  const product = scene(tl, 'product');
  const lockup = scene(tl, 'lockup');
  return (
    <ThemeProvider theme={theme}>
      <AbsoluteFill style={{background: `radial-gradient(ellipse at 50% 55%, #121216 0%, ${theme.colors.bg} 70%)`}}>
        <Scene from={birth.from} duration={tl.durationInFrames}><LightStory /></Scene>

        <Scene {...noise} name="noise">
          <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
            <WordReveal text="Menos ruído." start={12} stagger={7} fontSize={168} weight={600} />
          </AbsoluteFill>
        </Scene>

        <Scene {...clarity} name="clarity">
          <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
            <WordReveal text="Mais clareza." start={6} stagger={7} fontSize={168} weight={600} highlight={['clareza.']} highlightColor={theme.colors.accent} />
          </AbsoluteFill>
        </Scene>

        <Scene {...product} name="product">
          <Camera keys={[{at: 0, scale: 0.97}, {at: product.duration, scale: 1.03, ease: 'softOut'}]}>
            <AbsoluteFill style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 120}}>
              <NoteCard />
              <div style={{display: 'flex', flexDirection: 'column', gap: 6}}>
                {['Captura.', 'Conecta.', 'Resume.'].map((w, i) => (
                  <WordReveal key={w} text={w} start={34 + i * 12} fontSize={92} weight={600} align="left"
                    color={i === 2 ? theme.colors.fg : theme.colors.muted} />
                ))}
              </div>
            </AbsoluteFill>
          </Camera>
        </Scene>

        <Scene {...lockup} name="lockup">
          <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 18}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 26}}>
              <Enter at={6} scaleFrom={0.8} distance={0}>
                <div style={{width: 64, height: 64, borderRadius: 32, border: `3px solid ${theme.colors.accent}`, boxShadow: `0 0 30px ${theme.colors.accent}88`}} />
              </Enter>
              <TrackingIn text="Lumen" start={4} duration={44} fontSize={132} weight={600} fromSpacing={0.4} toSpacing={-0.03} />
            </div>
            <WordReveal text="Pense com clareza." start={22} stagger={4} mode="blur" fontSize={52} weight={400} family={theme.fonts.serif}
              italic color={theme.colors.muted} letterSpacing="0" />
          </AbsoluteFill>
        </Scene>

        <MusicBed src={tl.audio.music!.src} volume={tl.audio.music!.volume} total={tl.durationInFrames} fadeIn={10} fadeOut={36} />
        <SfxCues cues={tl.audio.sfx} />
        <Vignette strength={0.5} />
        <Grain />
        <SafeArea show={debugSafeArea} />
      </AbsoluteFill>
    </ThemeProvider>
  );
};
