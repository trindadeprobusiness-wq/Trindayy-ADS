// Moovi motion kit — app screens. Every value shown is ILLUSTRATIVE; layouts follow the real app screenshots.
import React from 'react';
import {Img, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {CountUp, Icon, ease, keyframes, mix, progress, springIn} from '../../lib';
import type {Keyframe} from '../../lib';
import {AppPage, Bold, C, F, PageTitle, SH, SW, UICard, brl} from './base';

/* =============================================================== dashboard */
export const KPI_VALUES = {saldo: 8420.5, receitas: 6850, despesas: 4212.35, resultado: 2637.65};
export const CATS = [
  {name: 'Moradia', v: 1450, c: '#3A97E2'}, {name: 'Alimentação', v: 826.9, c: '#F0B24E'}, {name: 'Contas da casa', v: 520.15, c: '#2FB06A'},
  {name: 'Transporte', v: 498.3, c: '#A98BE8'}, {name: 'Lazer', v: 402, c: '#EE8FC0'}, {name: 'Saúde', v: 310, c: '#62C8B4'}, {name: 'Outros', v: 205, c: '#B8BEC6'},
];
const TOTAL = CATS.reduce((a, b) => a + b.v, 0);

export type DashCfg = {
  /** frame the 4 KPI cards cascade in (or already visible when undefined) */
  cascadeAt?: number;
  /** frame each KPI starts counting: saldo, receitas, despesas, resultado (undefined = already filled) */
  kpiAt?: [number, number, number, number];
  scroll?: Keyframe[];
  donutDrawAt?: number;
  tapAt?: number;
  /** frame a KPI/section gets a highlight ring: key = 'receitas'|'despesas'|'pagar' … */
  highlights?: {key: 'saldo' | 'receitas' | 'despesas' | 'resultado' | 'pagar'; from: number; to: number}[];
};

const Donut: React.FC<{cx: number; cy: number; drawAt: number; tapAt?: number}> = ({cx, cy, drawAt, tapAt}) => {
  const frame = useCurrentFrame();
  const draw = progress(frame, drawAt, 46, ease.inOut);
  const tapped = tapAt !== undefined && frame >= tapAt + 2;
  const sel = tapAt === undefined ? 0 : progress(frame, tapAt + 2, 10, ease.out);
  const r = 168;
  const Cf = 2 * Math.PI * r;
  let acc = 0;
  const center = tapped ? CATS[1] : CATS[0];
  const cp = tapped ? progress(frame, (tapAt ?? 0) + 2, 10, ease.out) : 1;
  return (
    <>
      <svg width={SW} height={480} style={{position: 'absolute', left: 0, top: cy - 240, overflow: 'visible'}}>
        {CATS.map((c, i) => {
          const len = c.v / TOTAL;
          const a0 = acc;
          acc += len;
          const vis = Math.max(0, Math.min(len - 0.006, draw - a0));
          const active = i === 1 ? sel : i === 0 ? 1 - sel : 0;
          const mid = (a0 + len / 2) * 2 * Math.PI - Math.PI / 2;
          const off = active * 16;
          const op = mix(0.38, 1, active);
          const x = cx + Math.cos(mid) * off;
          const y = 240 + Math.sin(mid) * off;
          return <circle key={c.name} cx={x} cy={y} r={r} fill="none" stroke={c.c} strokeWidth={60} strokeDasharray={`${vis * Cf} ${Cf}`}
            transform={`rotate(${-90 + a0 * 360} ${x} ${y})`} opacity={mix(1, op, progress(frame, drawAt + 50, 14))} />;
        })}
      </svg>
      <div style={{position: 'absolute', left: 0, top: cy - 60, width: SW, textAlign: 'center', fontFamily: F, opacity: progress(frame, drawAt + 28, 14) * mix(0.3, 1, cp)}}>
        <div style={{fontSize: 26, color: C.muted}}>{center.name}</div>
        <div style={{fontSize: 38, fontWeight: 700, color: C.text, marginTop: 4}}>{brl(center.v)}</div>
        <div style={{fontSize: 26, fontWeight: 600, color: center.c, marginTop: 4}}>{Math.round((center.v / TOTAL) * 100)}%</div>
      </div>
    </>
  );
};

export const Dashboard: React.FC<{cfg: DashCfg}> = ({cfg}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const scroll = cfg.scroll ? keyframes(frame, cfg.scroll) : 0;
  const kpis = [
    {label: 'Saldo', key: 'saldo', value: KPI_VALUES.saldo, tint: true, arrow: ''},
    {label: 'Receitas', key: 'receitas', value: KPI_VALUES.receitas, tint: false, arrow: '↗'},
    {label: 'Despesas', key: 'despesas', value: KPI_VALUES.despesas, tint: false, arrow: '↘'},
    {label: 'Resultado', key: 'resultado', value: KPI_VALUES.resultado, tint: false, arrow: '↗'},
  ] as const;
  const hl = (key: string) => (cfg.highlights ?? []).reduce((a, h) => (h.key === key ? Math.max(a, progress(frame, h.from, 8) * (1 - progress(frame, h.to, 8))) : a), 0);
  const tapP = cfg.tapAt === undefined ? 0 : progress(frame, cfg.tapAt - 6, 6, ease.out) * (1 - progress(frame, cfg.tapAt + 10, 14, ease.out));
  const ripple = cfg.tapAt === undefined ? 1 : progress(frame, cfg.tapAt, 20, ease.out);
  const aliMid = ((CATS[0].v + CATS[1].v / 2) / TOTAL) * 2 * Math.PI - Math.PI / 2;
  const donutCy = 810 + 300;
  return (
    <AppPage tab="inicio">
      <div style={{position: 'absolute', left: 0, top: -scroll, width: SW, height: 2300}}>
        <PageTitle title="Dashboard" />
        <div style={{position: 'absolute', left: 34, top: 108, width: 300, height: 66, borderRadius: 16, border: `2px solid ${C.line}`, background: C.card,
          display: 'flex', alignItems: 'center', gap: 16, padding: '0 22px', boxSizing: 'border-box', fontFamily: F, fontSize: 27, color: C.text}}>
          <Icon name="clock" size={26} color={C.muted} />Este Mês
        </div>
        {kpis.map((k, i) => {
          const x = i % 2 === 0 ? 24 : 404;
          const y = i < 2 ? 206 : 386;
          const e = cfg.cascadeAt === undefined ? 1 : springIn(frame, fps, cfg.cascadeAt + i * 5, 'snappy');
          const at = cfg.kpiAt?.[i];
          const filled = at === undefined || frame >= at;
          const pulse = at === undefined ? 0 : Math.max(0, 1 - Math.abs(frame - (at + 26)) / 8) * 0.035;
          const col = k.key === 'despesas' ? C.red : k.key === 'saldo' ? C.text : C.green;
          const h = hl(k.key);
          return (
            <UICard key={k.label} x={x} y={y} w={352} h={160} style={{opacity: Math.min(1, e * 1.3), transform: `translateY(${(1 - e) * 30}px) scale(${1 + pulse + h * 0.03})`,
              background: k.tint ? 'linear-gradient(135deg,#EAF6EE,#FFFFFF)' : C.card, padding: '24px 28px',
              boxShadow: h > 0 ? `0 0 0 ${4 * h}px ${C.brandBright}, 0 10px 30px -10px rgba(0,0,0,0.3)` : undefined}}>
              <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 26, color: C.muted}}><span>{k.label}</span>
                <span style={{color: k.key === 'despesas' ? C.red : C.green, fontWeight: 700}}>{k.arrow}</span></div>
              <div style={{fontSize: 40, fontWeight: 700, marginTop: 22, letterSpacing: '-0.02em', color: filled ? col : '#C9CDD3'}}>
                {!filled ? 'R$ —' : at === undefined ? brl(k.value) : <CountUp to={k.value} start={at} duration={26} decimals={2} prefix="R$ " />}
              </div>
            </UICard>
          );
        })}
        <UICard x={24} y={572} w={732} h={210} style={{padding: '26px 30px', opacity: cfg.cascadeAt === undefined ? 1 : progress(frame, cfg.cascadeAt + 20, 12),
          boxShadow: hl('pagar') > 0 ? `0 0 0 ${4 * hl('pagar')}px ${C.brandBright}` : undefined}}>
          <div style={{fontSize: 25, color: C.muted}}>Previsão para o fim do mês (31/10)</div>
          <div style={{fontSize: 38, fontWeight: 700, marginTop: 8}}>{brl(7905.4)}</div>
          <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 24, marginTop: 14, color: C.muted}}>
            <span>A receber <b style={{color: C.green}}>+{brl(450)}</b></span><span>A pagar <b style={{color: C.red}}>−{brl(965.1)}</b></span>
          </div>
        </UICard>
        <UICard x={24} y={810} w={732} h={610} />
        <div style={{position: 'absolute', left: 58, top: 846, fontFamily: F, fontWeight: 700, fontSize: 32, color: C.text}}>Gastos por Categoria</div>
        {cfg.donutDrawAt !== undefined && <Donut cx={390} cy={donutCy} drawAt={cfg.donutDrawAt} tapAt={cfg.tapAt} />}
        <div style={{position: 'absolute', left: 50, top: 1300, width: 680, display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center'}}>
          {CATS.slice(0, 5).map((c, i) => {
            const on = cfg.tapAt !== undefined && frame >= cfg.tapAt + 2 ? i === 1 : i === 0;
            return (
              <div key={c.name} style={{display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 999, fontFamily: F, fontSize: 22,
                border: `2px solid ${on ? '#9CA3AF' : C.line}`, background: on ? '#EEF0F2' : C.card, color: on ? C.text : '#A3A8B0'}}>
                <span style={{width: 12, height: 12, borderRadius: 6, background: c.c}} />{c.name}
              </div>
            );
          })}
        </div>
        {cfg.tapAt !== undefined && frame > cfg.tapAt - 8 && frame < cfg.tapAt + 30 && (
          <div style={{position: 'absolute', left: 390 + Math.cos(aliMid) * 168 - 36, top: donutCy + Math.sin(aliMid) * 168 - 36, width: 72, height: 72}}>
            <div style={{position: 'absolute', inset: 0, borderRadius: 36, background: 'rgba(22,24,29,0.28)', opacity: tapP, transform: `scale(${mix(1.3, 0.85, tapP)})`}} />
            <div style={{position: 'absolute', inset: -20 * ripple, borderRadius: '50%', border: '3px solid rgba(22,24,29,0.35)', opacity: 1 - ripple}} />
          </div>
        )}
      </div>
    </AppPage>
  );
};

/* ==================================================================== chat */
export const Avatar: React.FC = () => (
  <div style={{width: 62, height: 62, borderRadius: 31, border: `2px solid ${C.line}`, background: '#fff', display: 'flex', alignItems: 'center',
    justifyContent: 'center', flexShrink: 0}}>
    <Img src={staticFile('moovi/logo_full.png')} style={{width: 46}} />
  </div>
);
const Check2: React.FC = () => (
  <svg width={30} height={18} viewBox="0 0 30 18" style={{marginLeft: 10}}><path d="M1 9l5 5L16 3M12 12l2 2L25 3" fill="none" stroke={C.green} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" /></svg>
);
export const UserBubble: React.FC<{children: React.ReactNode}> = ({children}) => (
  <div style={{display: 'flex', justifyContent: 'flex-end'}}>
    <div style={{maxWidth: 520, background: C.userBubble, borderRadius: 30, padding: '24px 30px', fontSize: 30, color: C.text, lineHeight: 1.35,
      display: 'flex', alignItems: 'flex-end', gap: 4}}><span>{children}</span><Check2 /></div>
  </div>
);
export const BotBubble: React.FC<{children: React.ReactNode; width?: number}> = ({children, width}) => (
  <div style={{display: 'flex', gap: 22, alignItems: 'flex-start'}}>
    <Avatar />
    <div style={{maxWidth: 560, width, background: C.chat, borderRadius: 30, padding: '24px 30px', fontSize: 30, color: C.text, lineHeight: 1.38, boxSizing: 'border-box'}}>
      {children}
    </div>
  </div>
);
/** Voice message bubble with an animated waveform (plays from `at`). */
export const VoiceBubble: React.FC<{at: number; seconds?: string}> = ({at, seconds = '0:03'}) => {
  const frame = useCurrentFrame();
  const play = progress(frame, at + 4, 40, ease.linear);
  const bars = [10, 22, 34, 18, 40, 28, 14, 36, 24, 44, 20, 30, 16, 38, 26, 12, 32, 22, 18, 28];
  return (
    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
      <div style={{width: 470, background: C.userBubble, borderRadius: 30, padding: '20px 26px', display: 'flex', alignItems: 'center', gap: 16, boxSizing: 'border-box'}}>
        <div style={{width: 56, height: 56, borderRadius: 28, background: C.brand, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
          <svg width={24} height={24} viewBox="0 0 24 24"><path d="M7 4l13 8-13 8z" fill="#fff" /></svg>
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: 5, flex: 1}}>
          {bars.map((h, i) => <span key={i} style={{width: 7, height: h, borderRadius: 4, background: i / bars.length < play ? C.brand : '#B8BEC6'}} />)}
        </div>
        <span style={{fontSize: 22, color: C.muted, fontFamily: F}}>{seconds}</span>
      </div>
    </div>
  );
};
export const TypingDots: React.FC<{at: number}> = ({at}) => {
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

export type Msg = {at: number; until?: number; h: number; node: React.ReactNode};
export type Typing = {from: number; to: number; send: number; text: string};

export const Chat: React.FC<{msgs: Msg[]; typing: Typing[]}> = ({msgs, typing}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const gap = 26;
  const anchor = 1300;
  const live = msgs.map((m) => {
    const e = frame < m.at ? 0 : springIn(frame, fps, m.at, 'precise');
    const gone = m.until === undefined ? 0 : progress(frame, m.until - 3, 9, ease.inOut);
    return {...m, e: e * (1 - gone)};
  });
  let y = anchor;
  const placed = [...live].reverse().map((m) => {
    const top = y - m.h * m.e;
    y = top - gap * m.e;
    return {...m, top};
  }).reverse();
  const t = typing.find((x) => frame >= x.from - 4 && frame < x.send);
  const typed = t ? t.text.slice(0, Math.round(t.text.length * progress(frame, t.from, t.to - t.from, ease.linear))) : '';
  const caret = Math.floor(frame / 8) % 2 === 0;
  const sendPress = typing.reduce((a, x) => Math.max(a, Math.max(0, 1 - Math.abs(frame - (x.send - 2)) / 4)), 0);
  const mask = 'linear-gradient(to bottom, transparent 0px, transparent 150px, black 300px)';
  return (
    <AppPage tab="assistente">
      <div style={{position: 'absolute', left: 0, top: -210, width: SW, height: SH, fontFamily: F}}>
        <div style={{position: 'absolute', left: 0, top: 210, width: SW, height: 1312 - 210, overflow: 'hidden', WebkitMaskImage: mask, maskImage: mask}}>
          <div style={{position: 'absolute', left: 0, top: -210, width: SW, height: SH}}>
            {placed.map((m, i) => m.e > 0.001 && (
              <div key={i} style={{position: 'absolute', left: 34, right: 34, top: m.top, opacity: Math.min(1, m.e * 1.5), transform: `translateY(${(1 - m.e) * 24}px)`}}>
                {m.node}
              </div>
            ))}
          </div>
        </div>
        <div style={{position: 'absolute', left: 34, top: 1330, width: 712, height: 112, borderRadius: 40, border: `2px solid ${C.line}`, background: '#fff',
          display: 'flex', alignItems: 'center', padding: '0 14px 0 34px', boxSizing: 'border-box', gap: 22}}>
          <span style={{fontSize: 40, color: '#4B5563', fontWeight: 300}}>+</span>
          <span style={{flex: 1, fontSize: 31, color: typed ? C.text : '#9CA3AF', whiteSpace: 'nowrap', overflow: 'hidden'}}>
            {typed || 'Escreva ou mande um áudio…'}{t && caret ? <span style={{color: C.brand}}>|</span> : null}
          </span>
          <svg width={30} height={30} viewBox="0 0 24 24"><path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM5 11a7 7 0 0 0 14 0M12 18v3" fill="none" stroke="#4B5563" strokeWidth={1.8} strokeLinecap="round" /></svg>
          <div style={{width: 84, height: 84, borderRadius: 26, background: typed ? C.brand : '#8FCFA7', display: 'flex', alignItems: 'center', justifyContent: 'center',
            transform: `scale(${1 - sendPress * 0.08})`}}>
            <svg width={34} height={34} viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7" fill="none" stroke="#fff" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
        </div>
      </div>
    </AppPage>
  );
};

/* ============================================================ statement */
export const STATEMENT = [
  {d: '21/10', raw: 'PIX ENV MERCADO BOM PRECO', v: -142.8, label: 'Mercado', cat: 'Alimentação', c: '#F0B24E'},
  {d: '21/10', raw: 'COMPRA DEB POSTO AVENIDA', v: -180, label: 'Combustível', cat: 'Transporte', c: '#A98BE8'},
  {d: '22/10', raw: 'COMPRA DEB FARMACIA CENTRAL', v: -38.9, label: 'Farmácia', cat: 'Saúde', c: '#62C8B4'},
  {d: '22/10', raw: 'PIX REC J SOUZA SERVICOS', v: 450, label: 'Serviço', cat: 'Serviços', c: '#2FB06A'},
  {d: '23/10', raw: 'COMPRA CRED APP TRANSPORTE', v: -24.5, label: 'Corrida', cat: 'Transporte', c: '#A98BE8'},
  {d: '23/10', raw: 'COMPRA DEB PADARIA SOL', v: -18, label: 'Padaria', cat: 'Alimentação', c: '#F0B24E'},
];
const money = (v: number) => (v < 0 ? '−' : '+') + Math.abs(v).toFixed(2).replace('.', ',');

export const StatementImage: React.FC<{scanAt: number}> = ({scanAt}) => {
  const frame = useCurrentFrame();
  const scan = progress(frame, scanAt, 36, ease.inOut);
  const done = progress(frame, scanAt + 37, 10);
  return (
    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
      <div style={{width: 470, background: C.userBubble, borderRadius: 30, padding: 14, boxSizing: 'border-box'}}>
        <div style={{position: 'relative', background: '#fff', borderRadius: 18, padding: '22px 22px 14px', overflow: 'hidden', fontFamily: '"JetBrains Mono", monospace',
          filter: `saturate(${1 - done * 0.6})`, opacity: mix(1, 0.75, done)}}>
          <div style={{fontFamily: F, fontWeight: 700, fontSize: 24, color: C.text}}>Extrato da conta</div>
          <div style={{fontFamily: F, fontSize: 18, color: C.muted, marginBottom: 12}}>Período: 21/10 a 23/10</div>
          {STATEMENT.map((s, i) => {
            const lit = Math.max(0, Math.min(1, (scan - ((i + 0.5) / STATEMENT.length) * 0.92) * 10));
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

/** Review list: rows enter from `at`, checks tick at `checkAt`. `dupIndex` marks one row as "já lançado" (not repeated). */
export const ReviewList: React.FC<{at: number; checkAt: number; dupIndex?: number; intro?: React.ReactNode}> = ({at, checkAt, dupIndex, intro}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <BotBubble width={560}>
      {intro ?? <>Encontrei <Bold>6 lançamentos</Bold>. Confere antes de eu salvar:</>}
      <div style={{marginTop: 14, display: 'flex', flexDirection: 'column', gap: 8}}>
        {STATEMENT.map((s, i) => {
          const e = springIn(frame, fps, at + i * 2, 'precise');
          const dup = i === dupIndex;
          const chk = dup ? 0 : progress(frame, checkAt + i * 1.5, 6);
          return (
            <div key={i} style={{display: 'flex', alignItems: 'center', gap: 12, fontSize: 23, background: dup ? '#F1F2F4' : '#fff', borderRadius: 14, padding: '9px 12px',
              opacity: e * (dup ? 0.75 : 1), transform: `translateX(${(1 - e) * -24}px)`}}>
              <div style={{width: 26, height: 26, borderRadius: 7, border: `2px solid ${chk > 0 ? C.brand : '#C9CDD3'}`, background: chk > 0.5 ? C.brand : '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                <Icon name="check" size={18} color="#fff" stroke={3} draw={chk} />
              </div>
              <span style={{flex: 1, whiteSpace: 'nowrap', textDecoration: dup ? 'line-through' : undefined, color: dup ? C.muted : C.text}}>{s.label}</span>
              {dup ? <span style={{fontSize: 18, padding: '3px 10px', borderRadius: 999, background: '#FFF1D6', color: '#8A5A00', whiteSpace: 'nowrap'}}>já lançado</span>
                : <span style={{fontSize: 18, padding: '3px 10px', borderRadius: 999, background: `${s.c}2E`, color: '#2E3238', whiteSpace: 'nowrap'}}>{s.cat}</span>}
              <span style={{width: 112, textAlign: 'right', fontWeight: 600, color: dup ? C.muted : s.v < 0 ? C.red : C.green, whiteSpace: 'nowrap'}}>{money(s.v)}</span>
            </div>
          );
        })}
      </div>
    </BotBubble>
  );
};

/* ========================================================= compromissos */
export const Commitments: React.FC<{addAt: number}> = ({addAt}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const row = springIn(frame, fps, addAt, 'snappy');
  const tog = progress(frame, addAt + 22, 8, ease.standard);
  const days = Array.from({length: 35}, (_, i) => i - 3);
  return (
    <AppPage tab="compromissos">
      <PageTitle title="Compromissos" sub="Sua agenda financeira e pessoal" />
      <UICard x={24} y={170} w={732} h={560} style={{padding: '30px 34px'}}>
        <div style={{textAlign: 'center', fontSize: 30, fontWeight: 600}}>novembro 2026</div>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', rowGap: 18, marginTop: 26, textAlign: 'center', fontSize: 28}}>
          {['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'].map((d) => <span key={d} style={{color: C.muted, fontSize: 24}}>{d}</span>)}
          {days.map((d, i) => {
            const isDue = d === 10;
            return <span key={i} style={{color: d < 1 || d > 30 ? '#C9CDD3' : C.text, fontWeight: isDue && row > 0.5 ? 700 : 400}}>
              <span style={{display: 'inline-block', width: 54, height: 54, lineHeight: '54px', borderRadius: 14,
                background: isDue ? `rgba(215,38,61,${0.14 * row})` : undefined, color: isDue && row > 0.5 ? C.red : undefined}}>{d < 1 ? 26 + d + 4 : d > 30 ? d - 30 : d}</span></span>;
          })}
        </div>
      </UICard>
      <UICard x={24} y={760} w={732} h={240} style={{padding: '26px 30px', opacity: row, transform: `translateY(${(1 - row) * 40}px)`,
        boxShadow: `0 0 0 ${3 * Math.max(0, 1 - Math.abs(frame - addAt - 10) / 20)}px ${C.brandBright}`}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div>
            <div style={{fontSize: 32, fontWeight: 700}}>Conta de luz</div>
            <div style={{fontSize: 24, color: C.muted, marginTop: 6}}>Vence todo dia 10 · {brl(197.63)}</div>
          </div>
          <span style={{fontSize: 20, padding: '6px 14px', borderRadius: 999, background: '#DDEFE3', color: '#0F7A3A', fontWeight: 600}}>todo mês</span>
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 26, fontSize: 25}}>
          <span>Lembrete no WhatsApp antes de vencer</span>
          <div style={{width: 74, height: 42, borderRadius: 21, padding: 4, boxSizing: 'border-box', background: tog > 0.5 ? C.brand : C.line}}>
            <div style={{width: 34, height: 34, borderRadius: 17, background: '#fff', transform: `translateX(${tog * 32}px)`}} />
          </div>
        </div>
      </UICard>
    </AppPage>
  );
};

/* ============================================================== cartões */
export const Cards: React.FC<{at: number}> = ({at}) => {
  const frame = useCurrentFrame();
  const used = progress(frame, at + 6, 24, ease.out) * 0.32;
  return (
    <AppPage tab="menu">
      <PageTitle title="Cartões" sub="Gerencie seus cartões de crédito" />
      <UICard x={24} y={170} w={732} h={560} style={{padding: '30px 34px'}}>
        <div style={{display: 'flex', gap: 22, alignItems: 'center'}}>
          <div style={{width: 80, height: 80, borderRadius: 18, background: 'linear-gradient(135deg,#1E9B55,#0E5A2B)'}} />
          <div><div style={{fontSize: 32, fontWeight: 700}}>Cartão principal</div><div style={{fontSize: 24, color: C.muted}}>•••• 0000</div></div>
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 25, color: C.muted, marginTop: 34}}><span>Limite usado</span><span>{Math.round(used * 100)}%</span></div>
        <div style={{height: 14, borderRadius: 7, background: '#EEF0F2', marginTop: 12}}><div style={{height: '100%', width: `${used * 100}%`, background: C.brand, borderRadius: 7}} /></div>
        <div style={{marginTop: 30, border: `2px solid ${C.line}`, borderRadius: 18, padding: '18px 22px', fontSize: 25}}>
          <div style={{display: 'flex', justifyContent: 'space-between'}}><span>Fatura aberta · fecha 04/11</span><b>{brl(1280.4)}</b></div>
          <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 12, color: C.muted}}><span>Vencimento</span><span>dia 10</span></div>
        </div>
        <div style={{marginTop: 26, height: 70, borderRadius: 16, background: C.brand, color: '#fff', fontSize: 27, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Pagar fatura</div>
      </UICard>
    </AppPage>
  );
};

/* ================================================================ metas */
export const Goals: React.FC<{at: number}> = ({at}) => {
  const frame = useCurrentFrame();
  const g = (d: number) => progress(frame, at + d, 26, ease.out);
  return (
    <AppPage tab="menu">
      <PageTitle title="Metas" sub="Acompanhe seus objetivos financeiros" />
      {[{n: 'Reserva de emergência', v: 4200, t: 15000, d: 4}, {n: 'Viagem de férias', v: 1800, t: 5000, d: 10}].map((m, i) => (
        <UICard key={m.n} x={24} y={180 + i * 230} w={732} h={200} style={{padding: '28px 32px'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 30, fontWeight: 700}}><span>{m.n}</span><span>{Math.round((m.v / m.t) * 100 * g(m.d))}%</span></div>
          <div style={{height: 16, borderRadius: 8, background: '#EEF0F2', marginTop: 26}}><div style={{height: '100%', width: `${(m.v / m.t) * 100 * g(m.d)}%`, background: C.brand, borderRadius: 8}} /></div>
          <div style={{fontSize: 24, color: C.muted, marginTop: 18}}>{brl(m.v)} de {brl(m.t)}</div>
        </UICard>
      ))}
    </AppPage>
  );
};

/* ===================================================== lock screen alerts */
export type Notif = {at: number; title: string; body: React.ReactNode; tall?: boolean};
const ChatGlyph: React.FC = () => (
  <svg width={30} height={30} viewBox="0 0 24 24"><path d="M4 5h16v11H9l-5 4z" fill="#fff" /></svg>
);
export const LockScreen: React.FC<{notifs: Notif[]}> = ({notifs}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 30%, #1E5A37 0%, #0B2416 55%, #050E09 100%)', fontFamily: F}}>
      <StatusBarLight />
      <div style={{position: 'absolute', top: 150, width: SW, textAlign: 'center', color: '#fff'}}>
        <div style={{fontSize: 30, opacity: 0.85}}>domingo, 9 de novembro</div>
        <div style={{fontSize: 170, fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.05}}>9:41</div>
      </div>
      <div style={{position: 'absolute', left: 30, right: 30, top: 520, display: 'flex', flexDirection: 'column', gap: 18}}>
        {notifs.filter((n) => frame >= n.at).reverse().map((n) => {
          const e = springIn(frame, fps, n.at, 'snappy');
          return (
            <div key={n.at} style={{background: 'rgba(255,255,255,0.92)', borderRadius: 34, padding: '24px 28px', opacity: Math.min(1, e * 1.4),
              transform: `translateY(${(1 - e) * -40}px) scale(${mix(0.94, 1, e)})`, boxShadow: '0 20px 50px -20px rgba(0,0,0,0.6)'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 14, fontSize: 22, color: '#4B5563'}}>
                <div style={{width: 44, height: 44, borderRadius: 12, background: '#22A55A', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><ChatGlyph /></div>
                <span style={{flex: 1}}>Moovi · via WhatsApp</span><span>agora</span>
              </div>
              <div style={{fontSize: 29, fontWeight: 700, color: C.text, marginTop: 14}}>{n.title}</div>
              <div style={{fontSize: 26, color: '#374151', marginTop: 6, lineHeight: 1.35}}>{n.body}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
const StatusBarLight: React.FC = () => (
  <div style={{position: 'absolute', top: 0, left: 0, width: SW, height: 86, display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
    padding: '18px 52px 0', boxSizing: 'border-box', gap: 8}}>
    {[10, 14, 18, 22].map((h) => <span key={h} style={{width: 6, height: h, borderRadius: 2, background: '#fff'}} />)}
  </div>
);

/* ============================================================ home screen */
/** Generic home screen (abstract app tiles, no third-party icons); the Moovi icon is added at `addAt` and tapped at `tapAt`. */
export const HomeScreen: React.FC<{addAt: number; tapAt: number}> = ({addAt, tapAt}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const add = springIn(frame, fps, addAt, 'snappy');
  const press = Math.max(0, 1 - Math.abs(frame - tapAt) / 5);
  const tiles = ['#3A4A42', '#2E3B35', '#45524B', '#33413A', '#3D4C44', '#2B3832', '#4A5751', '#36443D', '#2F3C36', '#404E47', '#34423B'];
  return (
    <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(170deg,#173D27,#07150D)', fontFamily: F}}>
      <StatusBarLight />
      <div style={{position: 'absolute', top: 150, left: 60, right: 60, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', rowGap: 56, justifyItems: 'center'}}>
        {tiles.map((c, i) => <div key={i} style={{width: 130, height: 130, borderRadius: 32, background: c}} />)}
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, transform: `scale(${add * (1 - press * 0.08)})`, opacity: add}}>
          <div style={{width: 130, height: 130, borderRadius: 32, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 0 ${40 * add}px -6px ${C.brandBright}`}}>
            <Img src={staticFile('moovi/logo_full.png')} style={{width: 104}} />
          </div>
          <span style={{color: '#fff', fontSize: 24}}>Moovi</span>
        </div>
      </div>
    </div>
  );
};

/* ================================================================ splash */
export const Splash: React.FC<{at: number}> = ({at}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const light = progress(frame, at, 14, ease.out);
  const logo = springIn(frame, fps, at + 8, 'calm');
  return (
    <div style={{position: 'absolute', inset: 0, background: '#000'}}>
      <div style={{position: 'absolute', inset: 0, background: '#fff', opacity: light, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Img src={staticFile('moovi/logo_full.png')} style={{width: 420, opacity: logo, transform: `scale(${mix(0.86, 1, logo)})`}} />
      </div>
    </div>
  );
};
