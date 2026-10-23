import React from 'react';
import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/500.css';
import '@fontsource/dm-sans/600.css';
import '@fontsource/dm-sans/700.css';
import {AbsoluteFill, Html5Audio, Img, cancelRender, continueRender, delayRender, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {
  CountUp, GradientField, Grain, Icon, MusicBed, SafeArea, SfxCues, ThemeProvider, Vignette, WordReveal, ease, keyframes, mix,
  progress, saasCinematic, springIn,
} from '../../lib';
import type {IconName, Theme, Timeline} from '../../lib';
import raw from './timeline.json';

const tl = raw as unknown as Timeline;

/* ------------------------------------------------------------------ fonts */
// The real Moovi app uses a geometric rounded sans; DM Sans (OFL) is the closest licensed match.
let fontsStarted = false;
const ensureDmSans = () => {
  if (fontsStarted || typeof document === 'undefined') return;
  fontsStarted = true;
  const h = delayRender('DM Sans');
  Promise.all(['400', '500', '600', '700'].map((w) => document.fonts.load(`${w} 32px "DM Sans"`, 'Aãç0R$')))
    .then((r) => {
      if (r.some((x) => x.length === 0)) throw new Error('DM Sans failed to load');
      continueRender(h);
    })
    .catch((e) => cancelRender(e));
};
ensureDmSans();

/* ---------------------------------------------------------------- tokens */
const F = '"DM Sans", system-ui, sans-serif';
const C = {
  stage: '#040A06', brand: '#15803C', brandDeep: '#116530', brandBright: '#22B35E', ui: '#F6F7F9', card: '#FFFFFF',
  line: '#E3E6EA', text: '#16181D', muted: '#6B7280', green: '#21A55A', red: '#D7263D', chat: '#E7EEE9', userBubble: '#ECEEF1',
};
const theme: Theme = {
  ...saasCinematic, name: 'moovi-stage',
  colors: {...saasCinematic.colors, bg: C.stage, accent: C.brandBright, accent2: '#0E5A2B', fg: '#F4F7F5', muted: '#9AA79F'},
  fonts: {display: F, text: F, serif: F, mono: '"JetBrains Mono", monospace'},
};

// Every value below is ILLUSTRATIVE (the user's real screenshots contain personal data).
const brl = (v: number) => 'R$ ' + v.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2});

/* -------------------------------------------------------------- captions */
const CHUNKS: [number, string][] = [
  [0.4, 'Deixa eu te mostrar'], [1.26, 'a Moovi funcionando.'], [3.14, 'Esse é o painel.'], [4.3, 'Em cima, aparecem os saldos,'],
  [6.24, 'quanto entrou, quanto saiu'], [7.9, 'e o resultado do mês.'], [9.4, 'Logo abaixo, tem o gráfico'],
  [11.08, 'de pra onde foi o dinheiro,'], [12.42, 'separado por categoria.'], [14.26, 'Você toca na fatia'], [15.42, 'e vê o valor.'],
  [16.7, 'Aqui é a comparação'], [17.76, 'com o mês passado.'], [18.94, 'Gastei mais ou menos'], [20.16, 'com o quê?'],
  [21.04, 'Agora, o assistente.'], [22.26, 'Eu escrevo:'], [23.2, '“gastei 30 no almoço”'], [24.74, 'e pronto, tá anotado'],
  [25.98, 'em alimentação.'], [27.26, 'Pergunto: quanto gastei'], [28.4, 'com delivery esse mês?'], [29.78, 'E ele responde'],
  [30.48, 'com os meus números.'], [31.76, 'E se der preguiça'], [32.8, 'de lançar um por um,'], [33.86, 'eu mando o print do extrato.'],
  [35.82, 'Ele lê tudo,'], [37.12, 'me mostra antes,'], [38.18, 'e só lança quando eu digo sim.'],
];
const CAP_END = 39.95;

const Captions: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const i = CHUNKS.findIndex(([s], k) => t >= s && t < (CHUNKS[k + 1]?.[0] ?? CAP_END));
  if (i < 0) return null;
  const start = CHUNKS[i][0] * fps;
  const p = progress(frame, start, 6, ease.out);
  const out = i === CHUNKS.length - 1 ? progress(frame, CAP_END * fps - 4, 6, ease.in) : 0;
  return (
    <div style={{position: 'absolute', top: 236, left: 0, width: '100%', display: 'flex', justifyContent: 'center', opacity: (1 - out)}}>
      <div style={{fontFamily: F, fontWeight: 700, fontSize: 54, color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.15,
        padding: '16px 30px', borderRadius: 26, background: 'rgba(4,10,6,0.72)', border: '1px solid rgba(255,255,255,0.08)',
        maxWidth: 940, textAlign: 'center', transform: `translateY(${(1 - p) * 12}px)`, opacity: mix(0.2, 1, p)}}>
        {CHUNKS[i][1]}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------ app chrome */
// Screen content is authored in the screenshot's coordinate system (780 × 1662) and scaled into the phone.
const SW = 780;
const SH = 1662;

const StatusBar: React.FC = () => (
  <div style={{position: 'absolute', top: 0, left: 0, width: SW, height: 86, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '18px 52px 0', boxSizing: 'border-box', fontFamily: F, fontWeight: 600, fontSize: 28, color: C.text}}>
    <span>9:41</span>
    <span style={{display: 'flex', gap: 8, alignItems: 'center'}}>
      {[10, 14, 18, 22].map((h) => <span key={h} style={{width: 6, height: h, borderRadius: 2, background: C.text}} />)}
      <span style={{width: 44, height: 22, borderRadius: 6, border: `2px solid ${C.text}`, marginLeft: 8, position: 'relative'}}>
        <span style={{position: 'absolute', inset: 3, right: 10, borderRadius: 3, background: C.text}} />
      </span>
    </span>
  </div>
);

const Header: React.FC = () => (
  <div style={{position: 'absolute', top: 86, left: 0, width: SW, height: 124, borderBottom: `2px solid ${C.line}`, display: 'flex',
    alignItems: 'center', padding: '0 34px', boxSizing: 'border-box', gap: 18, background: C.ui}}>
    <Img src={staticFile('moovi/logo_full.png')} style={{height: 46}} />
    <div style={{fontFamily: F, fontWeight: 700, fontSize: 34, color: C.text, flex: 1}}>Moovi</div>
    <div style={{fontFamily: F, fontWeight: 500, fontSize: 24, color: C.text, background: '#ECEEF1', borderRadius: 14, padding: '14px 20px'}}>BRL ⌄</div>
    <svg width={34} height={34} viewBox="0 0 24 24"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" fill="none" stroke={C.text} strokeWidth={1.9} strokeLinejoin="round" /></svg>
  </div>
);

type Tab = 'inicio' | 'transacoes' | 'assistente' | 'compromissos' | 'menu';
const NAV: {id: Tab; label: string; icon: IconName | 'dots'}[] = [
  {id: 'inicio', label: 'Início', icon: 'home'}, {id: 'transacoes', label: 'Transações', icon: 'doc'},
  {id: 'assistente', label: 'Assistente', icon: 'sparkle'}, {id: 'compromissos', label: 'Compromissos', icon: 'clock'}, {id: 'menu', label: 'Menu', icon: 'dots'},
];
const BottomNav: React.FC<{active: Tab}> = ({active}) => (
  <div style={{position: 'absolute', left: 0, top: 1490, width: SW, height: SH - 1490, background: '#F3F4F6', borderTop: `2px solid ${C.line}`,
    display: 'flex', justifyContent: 'space-around', paddingTop: 16, boxSizing: 'border-box'}}>
    {NAV.map((n) => {
      const on = n.id === active;
      const col = on ? C.brand : '#4B5563';
      return (
        <div key={n.id} style={{width: 146, height: 92, borderRadius: 22, background: on ? '#DDEFE3' : 'transparent', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 6, fontFamily: F, fontSize: 21, color: col}}>
          {n.icon === 'dots' ? <div style={{fontSize: 30, lineHeight: '30px', letterSpacing: 2}}>•••</div> : <Icon name={n.icon} size={34} color={col} stroke={1.7} />}
          <span style={{whiteSpace: 'nowrap'}}>{n.label}</span>
        </div>
      );
    })}
  </div>
);

const Card: React.FC<{x: number; y: number; w: number; h: number; children?: React.ReactNode; style?: React.CSSProperties}> = ({x, y, w, h, children, style}) => (
  <div style={{position: 'absolute', left: x, top: y, width: w, height: h, background: C.card, borderRadius: 26, border: `2px solid ${C.line}`,
    boxShadow: '0 6px 18px -10px rgba(0,0,0,0.18)', boxSizing: 'border-box', fontFamily: F, color: C.text, ...style}}>{children}</div>
);

/* --------------------------------------------------------------- dashboard */
const KPIS = [
  {label: 'Saldo', value: 8420.5, at: 168, tint: true, arrow: ''},
  {label: 'Receitas', value: 6850, at: 196, tint: false, arrow: '↗'},
  {label: 'Despesas', value: 4212.35, at: 222, tint: false, arrow: '↘'},
  {label: 'Resultado', value: 2637.65, at: 248, tint: false, arrow: '↗'},
];
const CATS = [
  {name: 'Moradia', v: 1450, c: '#3A97E2'}, {name: 'Alimentação', v: 826.9, c: '#F0B24E'}, {name: 'Contas da casa', v: 520.15, c: '#2FB06A'},
  {name: 'Transporte', v: 498.3, c: '#A98BE8'}, {name: 'Lazer', v: 402, c: '#EE8FC0'}, {name: 'Saúde', v: 310, c: '#62C8B4'}, {name: 'Outros', v: 205, c: '#B8BEC6'},
];
const TOTAL = CATS.reduce((a, b) => a + b.v, 0);
const COMPARE = [
  {name: 'Moradia', prev: 1450, now: 1450}, {name: 'Alimentação', prev: 984, now: 826.9}, {name: 'Transporte', prev: 540, now: 498.3},
  {name: 'Lazer', prev: 360, now: 402}, {name: 'Saúde', prev: 352, now: 310},
];
const TAP = 436;

const Donut: React.FC<{cx: number; cy: number}> = ({cx, cy}) => {
  const frame = useCurrentFrame();
  const draw = progress(frame, 312, 46, ease.inOut);
  const sel = progress(frame, TAP + 2, 10, ease.out);
  const r = 168;
  const Cf = 2 * Math.PI * r;
  const gap = 0.006;
  let acc = 0;
  const center = frame < TAP + 2 ? CATS[0] : CATS[1];
  const cp = frame < TAP + 2 ? 1 : progress(frame, TAP + 2, 10, ease.out);
  return (
    <>
      <svg width={SW} height={480} style={{position: 'absolute', left: 0, top: cy - 240, overflow: 'visible'}}>
        {CATS.map((c, i) => {
          const len = c.v / TOTAL;
          const a0 = acc;
          acc += len;
          const vis = Math.max(0, Math.min(len - gap, draw - a0));
          const isAli = i === 1;
          const isMor = i === 0;
          const active = isAli ? sel : isMor ? 1 - sel : 0;
          const mid = (a0 + len / 2) * 2 * Math.PI - Math.PI / 2;
          const off = active * 16;
          const op = mix(0.38, 1, active) * (frame < 360 ? 1 : 1);
          return (
            <circle key={c.name} cx={cx + Math.cos(mid) * off} cy={240 + Math.sin(mid) * off} r={r} fill="none" stroke={c.c} strokeWidth={60}
              strokeDasharray={`${vis * Cf} ${Cf}`} transform={`rotate(${-90 + a0 * 360} ${cx + Math.cos(mid) * off} ${240 + Math.sin(mid) * off})`}
              opacity={frame < 362 ? 1 : mix(1, op, progress(frame, 362, 14))} />
          );
        })}
      </svg>
      <div style={{position: 'absolute', left: 0, top: cy - 60, width: SW, textAlign: 'center', fontFamily: F, opacity: progress(frame, 340, 14) * mix(0.3, 1, cp)}}>
        <div style={{fontSize: 26, color: C.muted}}>{center.name}</div>
        <div style={{fontSize: 38, fontWeight: 700, color: C.text, marginTop: 4}}>{brl(center.v)}</div>
        <div style={{fontSize: 26, fontWeight: 600, color: center.c, marginTop: 4}}>{Math.round((center.v / TOTAL) * 100)}%</div>
      </div>
    </>
  );
};

const DashboardPage: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const scroll = keyframes(frame, [{at: 282, value: 0}, {at: 318, value: 810, ease: 'inOut'}, {at: 500, value: 810}, {at: 532, value: 1450, ease: 'inOut'}]);
  const tap = progress(frame, TAP - 6, 6, ease.out) * (1 - progress(frame, TAP + 10, 14, ease.out));
  const ripple = progress(frame, TAP, 20, ease.out);
  const ali = CATS[1];
  const aliMid = ((CATS[0].v + ali.v / 2) / TOTAL) * 2 * Math.PI - Math.PI / 2;
  const donutCy = 810 + 300;
  return (
    <div style={{position: 'absolute', top: 210, left: 0, width: SW, height: 1280, overflow: 'hidden', background: C.ui}}>
      <div style={{position: 'absolute', left: 0, top: -scroll, width: SW, height: 2300}}>
        <div style={{position: 'absolute', left: 34, top: 34, fontFamily: F, fontWeight: 700, fontSize: 42, color: C.text}}>Dashboard</div>
        <div style={{position: 'absolute', left: 34, top: 108, width: 300, height: 66, borderRadius: 16, border: `2px solid ${C.line}`, background: C.card,
          display: 'flex', alignItems: 'center', gap: 16, padding: '0 22px', boxSizing: 'border-box', fontFamily: F, fontSize: 27, color: C.text}}>
          <Icon name="clock" size={26} color={C.muted} />Este Mês
        </div>
        {KPIS.map((k, i) => {
          const x = i % 2 === 0 ? 24 : 404;
          const y = i < 2 ? 206 : 386;
          const e = springIn(frame, fps, 100 + i * 5, 'snappy');
          const pulse = Math.max(0, 1 - Math.abs(frame - (k.at + 26)) / 8) * 0.035;
          const col = k.label === 'Despesas' ? C.red : k.label === 'Saldo' ? C.text : C.green;
          return (
            <Card key={k.label} x={x} y={y} w={352} h={160} style={{opacity: Math.min(1, e * 1.3), transform: `translateY(${(1 - e) * 30}px) scale(${1 + pulse})`,
              background: k.tint ? 'linear-gradient(135deg,#EAF6EE,#FFFFFF)' : C.card, padding: '24px 28px'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 26, color: C.muted}}><span>{k.label}</span>
                <span style={{color: k.label === 'Despesas' ? C.red : C.green, fontWeight: 700}}>{k.arrow}</span></div>
              <div style={{fontSize: 40, fontWeight: 700, marginTop: 22, letterSpacing: '-0.02em', color: frame < k.at ? '#C9CDD3' : col}}>
                {frame < k.at ? 'R$ —' : <CountUp to={k.value} start={k.at} duration={26} decimals={2} prefix="R$ " />}
              </div>
            </Card>
          );
        })}
        <Card x={24} y={572} w={732} h={210} style={{padding: '26px 30px', opacity: progress(frame, 120, 12)}}>
          <div style={{fontSize: 25, color: C.muted}}>Previsão para o fim do mês (31/10)</div>
          <div style={{fontSize: 38, fontWeight: 700, marginTop: 8}}>{brl(7905.4)}</div>
          <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 24, marginTop: 14, color: C.muted}}>
            <span>A receber <b style={{color: C.green}}>+{brl(450)}</b></span><span>A pagar <b style={{color: C.red}}>−{brl(965.1)}</b></span>
          </div>
        </Card>
        {/* Gastos por categoria */}
        <Card x={24} y={810} w={732} h={610} />
        <div style={{position: 'absolute', left: 58, top: 846, fontFamily: F, fontWeight: 700, fontSize: 32, color: C.text}}>Gastos por Categoria</div>
        <Donut cx={390} cy={donutCy} />
        <div style={{position: 'absolute', left: 50, top: 1300, width: 680, display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center'}}>
          {CATS.slice(0, 5).map((c, i) => {
            const on = (frame < TAP + 2 ? i === 0 : i === 1);
            return (
              <div key={c.name} style={{display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 999, fontFamily: F, fontSize: 22,
                border: `2px solid ${on ? '#9CA3AF' : C.line}`, background: on ? '#EEF0F2' : C.card, color: on ? C.text : '#A3A8B0'}}>
                <span style={{width: 12, height: 12, borderRadius: 6, background: c.c}} />{c.name}
              </div>
            );
          })}
        </div>
        {/* touch indicator */}
        {frame > TAP - 8 && frame < TAP + 30 && (
          <div style={{position: 'absolute', left: 390 + Math.cos(aliMid) * 168 - 36, top: donutCy + Math.sin(aliMid) * 168 - 36, width: 72, height: 72}}>
            <div style={{position: 'absolute', inset: 0, borderRadius: 36, background: 'rgba(22,24,29,0.28)', opacity: tap, transform: `scale(${mix(1.3, 0.85, tap)})`}} />
            <div style={{position: 'absolute', inset: -20 * ripple, borderRadius: '50%', border: '3px solid rgba(22,24,29,0.35)', opacity: 1 - ripple}} />
          </div>
        )}
        {/* Comparação mensal */}
        <Card x={24} y={1450} w={732} h={640} />
        <div style={{position: 'absolute', left: 58, top: 1486, fontFamily: F, fontWeight: 700, fontSize: 32, color: C.text}}>Comparação Mensal</div>
        <div style={{position: 'absolute', left: 58, top: 1540, display: 'flex', gap: 28, fontFamily: F, fontSize: 22, color: C.muted}}>
          <span style={{display: 'flex', alignItems: 'center', gap: 8}}><span style={{width: 14, height: 14, borderRadius: 7, background: '#8A9099'}} />Mês anterior</span>
          <span style={{display: 'flex', alignItems: 'center', gap: 8}}><span style={{width: 14, height: 14, borderRadius: 7, background: C.brand}} />Este mês</span>
        </div>
        {COMPARE.map((r, i) => {
          const y = 1610 + i * 92;
          const g = progress(frame, 512 + i * 4, 22, ease.out);
          const w = (v: number) => (v / 1450) * 420 * g;
          const badge = r.name === 'Alimentação' ? springIn(frame, fps, 581, 'snappy') : 0;
          return (
            <div key={r.name} style={{position: 'absolute', left: 40, top: y, width: 700, height: 80, fontFamily: F}}>
              <div style={{position: 'absolute', left: 0, top: 22, width: 200, textAlign: 'right', fontSize: 24, color: C.text}}>{r.name}</div>
              <div style={{position: 'absolute', left: 220, top: 10, height: 24, width: w(r.prev), borderRadius: 8, background: '#8A9099'}} />
              <div style={{position: 'absolute', left: 220, top: 40, height: 24, width: w(r.now), borderRadius: 8, background: C.brand}} />
              {badge > 0 && (
                <div style={{position: 'absolute', left: 220 + w(r.now) + 14, top: 30, transform: `scale(${badge})`, transformOrigin: 'left center',
                  background: '#DDF3E5', color: '#0F7A3A', fontWeight: 700, fontSize: 22, padding: '6px 14px', borderRadius: 999}}>−16%</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------- chat */
const Bold: React.FC<{children: React.ReactNode}> = ({children}) => <b style={{fontWeight: 700}}>{children}</b>;

const Avatar: React.FC = () => (
  <div style={{width: 62, height: 62, borderRadius: 31, border: `2px solid ${C.line}`, background: '#fff', display: 'flex', alignItems: 'center',
    justifyContent: 'center', flexShrink: 0}}>
    <Img src={staticFile('moovi/logo_full.png')} style={{width: 46}} />
  </div>
);

const Check2: React.FC = () => (
  <svg width={30} height={18} viewBox="0 0 30 18" style={{marginLeft: 10}}><path d="M1 9l5 5L16 3M12 12l2 2L25 3" fill="none" stroke={C.green} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" /></svg>
);

const UserBubble: React.FC<{children: React.ReactNode}> = ({children}) => (
  <div style={{display: 'flex', justifyContent: 'flex-end'}}>
    <div style={{maxWidth: 520, background: C.userBubble, borderRadius: 30, padding: '24px 30px', fontSize: 30, color: C.text, lineHeight: 1.35,
      display: 'flex', alignItems: 'flex-end', gap: 4}}>
      <span>{children}</span><Check2 />
    </div>
  </div>
);

const BotBubble: React.FC<{children: React.ReactNode; width?: number}> = ({children, width}) => (
  <div style={{display: 'flex', gap: 22, alignItems: 'flex-start'}}>
    <Avatar />
    <div style={{maxWidth: 560, width, background: C.chat, borderRadius: 30, padding: '24px 30px', fontSize: 30, color: C.text, lineHeight: 1.38, boxSizing: 'border-box'}}>
      {children}
    </div>
  </div>
);

const STATEMENT = [
  {d: '21/10', raw: 'PIX ENV MERCADO BOM PRECO', v: -142.8, label: 'Mercado', cat: 'Alimentação', c: '#F0B24E'},
  {d: '21/10', raw: 'COMPRA DEB POSTO AVENIDA', v: -180, label: 'Combustível', cat: 'Transporte', c: '#A98BE8'},
  {d: '22/10', raw: 'COMPRA DEB FARMACIA CENTRAL', v: -38.9, label: 'Farmácia', cat: 'Saúde', c: '#62C8B4'},
  {d: '22/10', raw: 'PIX REC J SOUZA SERVICOS', v: 450, label: 'Serviço', cat: 'Serviços', c: '#2FB06A'},
  {d: '23/10', raw: 'COMPRA CRED APP TRANSPORTE', v: -24.5, label: 'Corrida', cat: 'Transporte', c: '#A98BE8'},
  {d: '23/10', raw: 'COMPRA DEB PADARIA SOL', v: -18, label: 'Padaria', cat: 'Alimentação', c: '#F0B24E'},
];

const StatementImage: React.FC = () => {
  const frame = useCurrentFrame();
  const scan = progress(frame, 1075, 36, ease.inOut);
  const done = progress(frame, 1112, 10);
  return (
    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
      <div style={{width: 470, background: C.userBubble, borderRadius: 30, padding: 14, boxSizing: 'border-box'}}>
        <div style={{position: 'relative', background: '#fff', borderRadius: 18, padding: '22px 22px 14px', overflow: 'hidden', fontFamily: '"JetBrains Mono", monospace',
          filter: `saturate(${1 - done * 0.6})`, opacity: mix(1, 0.75, done)}}>
          <div style={{fontFamily: F, fontWeight: 700, fontSize: 24, color: C.text}}>Extrato da conta</div>
          <div style={{fontFamily: F, fontSize: 18, color: C.muted, marginBottom: 12}}>Período: 21/10 a 23/10</div>
          {STATEMENT.map((s, i) => {
            const rowY = (i + 0.5) / STATEMENT.length;
            const lit = Math.max(0, Math.min(1, (scan - rowY * 0.92) * 10));
            return (
              <div key={i} style={{display: 'flex', justifyContent: 'space-between', gap: 8, fontSize: 15, padding: '9px 6px', borderTop: '1px solid #EEF0F2',
                color: '#3A3F47', background: `rgba(34,179,94,${0.14 * lit})`, borderRadius: 6}}>
                <span style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 300}}>{s.d} {s.raw}</span>
                <span style={{color: s.v < 0 ? '#3A3F47' : C.green}}>{s.v < 0 ? '-' : '+'}{Math.abs(s.v).toFixed(2).replace('.', ',')}</span>
              </div>
            );
          })}
          {scan > 0 && scan < 1 && (
            <div style={{position: 'absolute', left: 0, right: 0, top: `${scan * 100}%`, height: 4, background: C.brandBright,
              boxShadow: `0 0 18px 6px ${C.brandBright}88, 0 -40px 60px -20px ${C.brandBright}44`}} />
          )}
        </div>
      </div>
    </div>
  );
};

const ReviewList: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <BotBubble width={560}>
      Encontrei <Bold>6 lançamentos</Bold>. Confere antes de eu salvar:
      <div style={{marginTop: 14, display: 'flex', flexDirection: 'column', gap: 8}}>
        {STATEMENT.map((s, i) => {
          const e = springIn(frame, fps, 1121 + i * 3, 'precise');
          const chk = progress(frame, 1184 + i * 1.5, 6);
          return (
            <div key={i} style={{display: 'flex', alignItems: 'center', gap: 12, fontSize: 23, background: '#fff', borderRadius: 14, padding: '9px 12px',
              opacity: e, transform: `translateX(${(1 - e) * -24}px)`}}>
              <div style={{width: 26, height: 26, borderRadius: 7, border: `2px solid ${chk > 0 ? C.brand : '#C9CDD3'}`, background: chk > 0.5 ? C.brand : '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                <Icon name="check" size={18} color="#fff" stroke={3} draw={chk} />
              </div>
              <span style={{flex: 1, whiteSpace: 'nowrap'}}>{s.label}</span>
              <span style={{fontSize: 18, padding: '3px 10px', borderRadius: 999, background: `${s.c}2E`, color: '#2E3238', whiteSpace: 'nowrap'}}>{s.cat}</span>
              <span style={{width: 112, textAlign: 'right', fontWeight: 600, color: s.v < 0 ? C.red : C.green, whiteSpace: 'nowrap'}}>
                {s.v < 0 ? '−' : '+'}{Math.abs(s.v).toFixed(2).replace('.', ',')}
              </span>
            </div>
          );
        })}
      </div>
    </BotBubble>
  );
};

const TypingDots: React.FC<{at: number}> = ({at}) => {
  const frame = useCurrentFrame();
  return (
    <BotBubble>
      <div style={{display: 'flex', gap: 10, height: 40, alignItems: 'center'}}>
        {[0, 1, 2].map((i) => {
          const ph = Math.sin(((frame - at) / 10) * Math.PI * 2 - i * 0.9);
          return <span key={i} style={{width: 14, height: 14, borderRadius: 7, background: '#6B7280', opacity: 0.4 + 0.6 * Math.max(0, ph), transform: `translateY(${-Math.max(0, ph) * 6}px)`}} />;
        })}
      </div>
    </BotBubble>
  );
};

type Msg = {at: number; until?: number; h: number; node: React.ReactNode};
const MSGS: Msg[] = [
  {at: 745, h: 108, node: <UserBubble>gastei 30 no almoço</UserBubble>},
  {at: 756, h: 176, node: <BotBubble>Prontinho! Despesa de <Bold>R$ 30,00</Bold> registrada em <Bold>Alimentação</Bold>, hoje, 23/10.</BotBubble>},
  {at: 885, h: 148, node: <UserBubble>quanto gastei com delivery esse mês?</UserBubble>},
  {at: 887, until: 906, h: 92, node: <TypingDots at={887} />},
  {at: 906, h: 136, node: <BotBubble>Em outubro você gastou <Bold>R$ 186,40</Bold> com delivery.</BotBubble>},
  {at: 1018, h: 446, node: <StatementImage />},
  {at: 1117, h: 560, node: <ReviewList />},
  {at: 1180, h: 108, node: <UserBubble>sim</UserBubble>},
  {at: 1192, h: 136, node: <BotBubble>Prontinho! <Bold>6 lançamentos</Bold> registrados.</BotBubble>},
];

const TYPING: {from: number; to: number; send: number; text: string}[] = [
  {from: 690, to: 738, send: 745, text: 'gastei 30 no almoço'},
  {from: 832, to: 878, send: 885, text: 'quanto gastei com delivery esse mês?'},
  {from: 1170, to: 1176, send: 1180, text: 'sim'},
];

const ChatPage: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const gap = 26;
  const anchor = 1300;
  const live = MSGS.map((m) => {
    const e = frame < m.at ? 0 : springIn(frame, fps, m.at, 'precise');
    const gone = m.until !== undefined && frame >= m.until ? 1 : 0;
    return {...m, e: gone ? 0 : e};
  });
  let y = anchor;
  const placed = [...live].reverse().map((m) => {
    const top = y - m.h * m.e;
    y = top - gap * m.e;
    return {...m, top};
  }).reverse();
  const typing = TYPING.find((t) => frame >= t.from - 4 && frame < t.send);
  const typed = typing ? typing.text.slice(0, Math.round(typing.text.length * progress(frame, typing.from, typing.to - typing.from, ease.linear))) : '';
  const caret = Math.floor(frame / 8) % 2 === 0;
  const sendPress = TYPING.reduce((a, t) => Math.max(a, Math.max(0, 1 - Math.abs(frame - (t.send - 2)) / 4)), 0);
  const burst = progress(frame, 1194, 24, ease.out);
  return (
    <div style={{position: 'absolute', top: 210, left: 0, width: SW, height: 1280, overflow: 'hidden', background: C.ui, fontFamily: F}}>
      <div style={{position: 'absolute', left: 0, top: -210, width: SW, height: SH}}>
        {placed.map((m, i) => m.e > 0.001 && (
          <div key={i} style={{position: 'absolute', left: 34, right: 34, top: m.top, opacity: Math.min(1, m.e * 1.5), transform: `translateY(${(1 - m.e) * 24}px)`}}>
            {m.node}
          </div>
        ))}
        {burst > 0 && burst < 1 && (
          <div style={{position: 'absolute', left: 150, top: 1240}}>
            {Array.from({length: 14}).map((_, i) => {
              const a = (i / 14) * Math.PI * 2;
              const d = 30 + burst * 110;
              return <span key={i} style={{position: 'absolute', left: Math.cos(a) * d, top: Math.sin(a) * d * 0.7, width: 12, height: 12, borderRadius: 6,
                background: i % 2 ? C.brandBright : '#9BE3B7', opacity: 1 - burst}} />;
            })}
          </div>
        )}
        {/* input */}
        <div style={{position: 'absolute', left: 34, top: 1330, width: 712, height: 112, borderRadius: 40, border: `2px solid ${C.line}`, background: '#fff',
          display: 'flex', alignItems: 'center', padding: '0 14px 0 34px', boxSizing: 'border-box', gap: 22}}>
          <span style={{fontSize: 40, color: '#4B5563', fontWeight: 300}}>+</span>
          <span style={{flex: 1, fontSize: 31, color: typed ? C.text : '#9CA3AF', whiteSpace: 'nowrap', overflow: 'hidden'}}>
            {typed || 'Escreva ou mande um áudio…'}{typing && caret ? <span style={{color: C.brand}}>|</span> : null}
          </span>
          <svg width={30} height={30} viewBox="0 0 24 24"><path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM5 11a7 7 0 0 0 14 0M12 18v3" fill="none" stroke="#4B5563" strokeWidth={1.8} strokeLinecap="round" /></svg>
          <div style={{width: 84, height: 84, borderRadius: 26, background: typed ? C.brand : '#8FCFA7', display: 'flex', alignItems: 'center', justifyContent: 'center',
            transform: `scale(${1 - sendPress * 0.08})`}}>
            <svg width={34} height={34} viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7" fill="none" stroke="#fff" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------- phone faces */
const Splash: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const light = progress(frame, 18, 22, ease.out);
  const logo = springIn(frame, fps, 30, 'calm');
  const away = progress(frame, 84, 14, ease.in);
  return (
    <div style={{position: 'absolute', inset: 0, background: '#000', transform: `translateY(${-away * 100}%)`}}>
      <div style={{position: 'absolute', inset: 0, background: '#fff', opacity: light, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Img src={staticFile('moovi/logo_full.png')} style={{width: 420, opacity: logo, transform: `scale(${mix(0.86, 1, logo)})`}} />
      </div>
    </div>
  );
};

const Screen: React.FC<{children: React.ReactNode; bg?: string}> = ({children, bg = C.ui}) => (
  <div style={{position: 'absolute', left: 0, top: 0, width: SW, height: SH, transformOrigin: '0 0', transform: `scale(${690 / SW})`, background: bg, overflow: 'hidden'}}>
    {children}
  </div>
);

const Phone: React.FC = () => {
  const frame = useCurrentFrame();
  const ry = keyframes(frame, [{at: 612, value: 0}, {at: 642, value: 180, ease: 'inOut'}]);
  const glow = progress(frame, 18, 30, ease.out);
  const face: React.CSSProperties = {position: 'absolute', left: 15, top: 15, width: 690, height: 1470, borderRadius: 78, overflow: 'hidden', backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden'};
  return (
    <div style={{position: 'absolute', inset: 0, transformStyle: 'preserve-3d', transform: `rotateY(${ry}deg)`}}>
      {/* body */}
      <div style={{position: 'absolute', inset: 0, borderRadius: 92, background: 'linear-gradient(145deg,#2A2E2C,#0C0E0D 40%,#1B1E1C)',
        boxShadow: `0 0 0 2px #3A3F3C inset, 0 60px 140px -30px rgba(0,0,0,0.9), 0 0 ${120 * glow}px ${-20}px ${C.brandBright}55`}} />
      <div style={face}>
        <Screen>
          <StatusBar />
          <Header />
          <DashboardPage />
          <BottomNav active="inicio" />
        </Screen>
        <Screen bg="transparent"><Splash /></Screen>
        <div style={{position: 'absolute', top: 22, left: 245, width: 200, height: 56, borderRadius: 28, background: '#000'}} />
      </div>
      <div style={{...face, transform: 'rotateY(180deg)'}}>
        <Screen>
          <StatusBar />
          <Header />
          <ChatPage />
          <BottomNav active="assistente" />
        </Screen>
        <div style={{position: 'absolute', top: 22, left: 245, width: 200, height: 56, borderRadius: 28, background: '#000'}} />
      </div>
    </div>
  );
};

/* ------------------------------------------------------- floating widget */
const FoodWidget: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const inn = springIn(frame, fps, 700, 'snappy');
  const out = progress(frame, 812, 12, ease.in);
  const hit = 788;
  const row = springIn(frame, fps, hit, 'snappy');
  const glow = Math.max(0, 1 - Math.abs(frame - hit - 6) / 20);
  if (frame < 696 || out >= 1) return null;
  return (
    <div style={{position: 'absolute', left: 64, top: 430, width: 560, borderRadius: 30, background: '#FFFFFF', padding: '26px 30px', boxSizing: 'border-box',
      fontFamily: F, color: C.text, opacity: Math.min(1, inn * 1.3) * (1 - out), transform: `translateY(${(1 - inn) * 40 - out * 30}px) scale(${mix(0.94, 1, inn)})`,
      boxShadow: `0 40px 90px -20px rgba(0,0,0,0.75), 0 0 ${50 * glow}px ${-4}px ${C.brandBright}`}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 12, fontSize: 24, color: C.muted}}>
        <span style={{width: 14, height: 14, borderRadius: 7, background: '#F0B24E'}} />Alimentação · este mês
      </div>
      <div style={{fontSize: 52, fontWeight: 700, marginTop: 8, letterSpacing: '-0.02em'}}>
        {frame < hit ? brl(826.9) : <CountUp from={826.9} to={856.9} start={hit} duration={16} decimals={2} prefix="R$ " />}
      </div>
      <div style={{marginTop: 14, height: 14, borderRadius: 7, background: '#EEF0F2', overflow: 'hidden'}}>
        <div style={{height: '100%', width: `${mix(62, 64.3, progress(frame, hit, 16))}%`, background: '#F0B24E', borderRadius: 7}} />
      </div>
      <div style={{height: 74 * row, overflow: 'hidden', opacity: row}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 18, fontSize: 26}}>
          <span>Almoço <span style={{color: C.muted, fontSize: 22}}>· hoje</span></span><b style={{color: C.red}}>−R$ 30,00</b>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------- end card */
const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  if (frame < 1200) return null;
  const logo = springIn(frame, fps, 1206, 'calm');
  const btn = springIn(frame, fps, 1236, 'snappy');
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'column', fontFamily: F}}>
      <Img src={staticFile('moovi/logo_full_white.png')} style={{width: 470, opacity: logo, transform: `translateY(${(1 - logo) * 30}px) scale(${mix(0.9, 1, logo)})`}} />
      <div style={{marginTop: 70}}>
        <WordReveal text="Seu dinheiro, organizado." start={1218 - 1200 + 1200} stagger={3} fontSize={68} weight={700} family={F} color="#FFFFFF" />
      </div>
      <div style={{marginTop: 22, fontSize: 34, color: '#B7C4BC', opacity: progress(frame, 1228, 12)}}>7 dias de garantia ou seu dinheiro de volta</div>
      <div style={{marginTop: 54, opacity: btn, transform: `translateY(${(1 - btn) * 20}px)`, background: C.brandBright, color: '#04140A', fontWeight: 700,
        fontSize: 40, padding: '24px 56px', borderRadius: 999, boxShadow: `0 16px 50px -12px ${C.brandBright}`}}>moovi.chat</div>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------ composition */
export const MooviDemo: React.FC<{debugSafeArea?: boolean}> = ({debugSafeArea}) => {
  const frame = useCurrentFrame();
  const S = keyframes(frame, [
    {at: 0, value: 0.42}, {at: 66, value: 0.74, ease: 'inOut'}, {at: 96, value: 0.74}, {at: 128, value: 1.15, ease: 'inOut'},
    {at: 600, value: 1.15}, {at: 626, value: 0.86, ease: 'inOut'}, {at: 652, value: 1.15, ease: 'inOut'}, {at: 1196, value: 1.15}, {at: 1222, value: 0.6, ease: 'in'},
  ]);
  const ty = keyframes(frame, [
    {at: 0, value: 140}, {at: 66, value: 0, ease: 'inOut'}, {at: 96, value: 0}, {at: 128, value: 185, ease: 'inOut'}, {at: 282, value: 185},
    {at: 318, value: 291, ease: 'inOut'}, {at: 600, value: 291}, {at: 626, value: 40, ease: 'inOut'}, {at: 652, value: -132, ease: 'inOut'},
    {at: 1196, value: -132}, {at: 1222, value: 0, ease: 'in'},
  ]);
  const rx = keyframes(frame, [{at: 0, value: 54}, {at: 66, value: 0, ease: 'inOut'}]);
  const rz = keyframes(frame, [{at: 0, value: -34}, {at: 66, value: 0, ease: 'inOut'}]);
  const fade = 1 - progress(frame, 1198, 20, ease.in);
  const blur = progress(frame, 1198, 20, ease.in) * 18;
  const narration = tl.audio.narration!;
  return (
    <ThemeProvider theme={theme}>
      <AbsoluteFill style={{background: C.stage}}>
        <GradientField opacity={0.22} speed={0.6} colors={[C.brand, '#0B3D1E']} />
        <AbsoluteFill style={{perspective: 2600}}>
          <div style={{position: 'absolute', left: 540 - 360, top: 950 - 750, width: 720, height: 1500, transformStyle: 'preserve-3d', opacity: fade,
            filter: blur > 0.2 ? `blur(${blur}px)` : undefined,
            transform: `translateY(${ty}px) scale(${S}) rotateX(${rx}deg) rotateZ(${rz}deg)`}}>
            <Phone />
          </div>
        </AbsoluteFill>
        <FoodWidget />
        <EndCard />
        <Captions />
        {frame > 100 && frame < 1196 && (
          <div style={{position: 'absolute', left: 60, top: 1478, fontFamily: F, fontSize: 22, color: 'rgba(255,255,255,0.78)', background: 'rgba(4,10,6,0.6)',
            padding: '6px 14px', borderRadius: 10}}>Valores ilustrativos</div>
        )}
        <Html5Audio src={staticFile(narration.src)} volume={narration.volume} />
        <MusicBed src={tl.audio.music!.src} volume={0.5} total={tl.durationInFrames} fadeIn={8} fadeOut={24} duck={[{from: 10, to: 1196}]} duckTo={0.5} ramp={10} />
        <SfxCues cues={tl.audio.sfx} />
        <Vignette strength={0.5} />
        <Grain opacity={0.035} />
        <SafeArea show={debugSafeArea} />
      </AbsoluteFill>
    </ThemeProvider>
  );
};
