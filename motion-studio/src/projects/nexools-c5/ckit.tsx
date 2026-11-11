// Kit dos 5 criativos "economia + vagas limitadas" (Coursera Plus R$ 297, voz Paulo, 11/2026).
// Tema claro (akit) + visuais literais: o que a voz diz aparece como objeto (bolso, conta, balança, café, calendário).
import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Glass, Tag, D, FD, FU, Ico, Lock, CourseraMark, Count, Strike, Tile} from '../nexools-ads/akit';
import {progress, ease, mix, springIn, drift} from '../../lib';
import type {SfxCue} from '../../lib';

export const RED = '#E5484D';
export const pro = (at: number, n: string, volume: number, why: string): SfxCue => ({at, src: `nexools-vsl/pro/${n}.wav`, volume, why});

/** Faixa fixa de escassez, logo abaixo do logo (fora da área de UI do Reels). */
export const Urgency: React.FC<{from?: number; label?: string}> = ({from = 10, label = 'VAGAS LIMITADAS · ATÉ 30/11'}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  if (f < from) return null;
  const e = springIn(f, fps, from, 'snappy');
  const p = (f % 70) / 70;
  return (
    <div style={{position: 'absolute', top: 246, left: 0, right: 0, display: 'flex', justifyContent: 'center', opacity: Math.min(1, e * 1.5), transform: `translateY(${(1 - Math.min(e, 1)) * -24}px)`}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 18, padding: '14px 32px', borderRadius: 999, background: '#FDECEC', border: '2px solid #F6C3C5',
        fontFamily: FD, fontWeight: 700, fontSize: 34, color: '#C9323A', letterSpacing: '0.03em', boxShadow: '0 12px 30px -16px rgba(229,72,77,0.6)'}}>
        <span style={{position: 'relative', width: 18, height: 18}}>
          <span style={{position: 'absolute', inset: 0, borderRadius: 9, background: RED}} />
          <span style={{position: 'absolute', inset: -14 * p, borderRadius: 30, border: `2px solid ${RED}`, opacity: 1 - p}} />
        </span>
        {label}
      </div>
    </div>
  );
};

/** Área útil das cenas (abaixo da faixa de escassez, acima da legenda). */
export const Zone: React.FC<{children: React.ReactNode; gap?: number}> = ({children, gap = 36}) => (
  <div style={{position: 'absolute', left: 60, right: 60, top: 340, height: 900, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap}}>{children}</div>
);

/** Cartão do preço oficial: contador até 1.200 e risco vermelho. */
export const OfficialCard: React.FC<{countAt: number; countDur: number; strikeAt?: number; scale?: number}> = ({countAt, countDur, strikeAt, scale = 1}) => (
  <Glass style={{width: 880 * scale, padding: `${40 * scale}px ${50 * scale}px`}}>
    <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
      <CourseraMark size={54 * scale} color={D.ink} />
      <div style={{fontFamily: FD, fontWeight: 700, fontSize: 44 * scale, color: D.ink}}>Coursera Plus · 12 meses</div>
    </div>
    <div style={{fontFamily: FD, fontWeight: 700, fontSize: 168 * scale, color: D.ink, letterSpacing: '-0.05em', marginTop: 6, whiteSpace: 'nowrap'}}>
      <span style={{fontSize: 66 * scale, color: D.muted}}>R$ </span>
      {strikeAt !== undefined ? <Strike at={strikeAt} color={RED} thickness={0.07}><Count at={countAt} from={0} to={1200} dur={countDur} /></Strike> : <Count at={countAt} from={0} to={1200} dur={countDur} />}
    </div>
    <div style={{fontFamily: FU, fontSize: 32 * scale, color: D.muted}}>no site oficial, por ano</div>
  </Glass>
);

/** Carteira literal: notas entram no bolso e o valor economizado sobe. */
export const Wallet: React.FC<{at: number; amountAt: number}> = ({at, amountAt}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const e = f < at ? 0 : springIn(f, fps, at, 'snappy');
  return (
    <div style={{position: 'relative', width: 760, height: 560, opacity: Math.min(1, e * 1.6), transform: `scale(${mix(0.9, 1, Math.min(e, 1))})`}}>
      {[0, 1, 2, 3, 4].map((i) => {
        const t0 = at + 8 + i * 7;
        const p = progress(f, t0, 26, ease.out);
        if (f < t0) return null;
        return (
          <div key={i} style={{position: 'absolute', left: 190 + i * 34, top: mix(-260, 150, p), width: 300, height: 150, borderRadius: 16,
            background: 'linear-gradient(135deg, #2FBF71, #12A150)', border: '3px solid #0E7A3D', transform: `rotate(${mix(-18 + i * 9, -6 + i * 3, p)}deg)`,
            boxShadow: '0 16px 30px -18px rgba(14,122,61,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FD, fontWeight: 800, fontSize: 54, color: '#E3F6EA'}}>R$</div>
        );
      })}
      <div style={{position: 'absolute', left: 80, right: 80, bottom: 0, height: 330, borderRadius: 48, background: 'linear-gradient(180deg, #1C2B4A, #0B162A)',
        boxShadow: '0 40px 80px -30px rgba(11,22,42,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{fontFamily: FD, fontWeight: 800, fontSize: 112, color: '#fff', letterSpacing: '-0.04em', whiteSpace: 'nowrap'}}>
          <span style={{color: '#7DF0B0'}}>+</span> R$ <Count at={amountAt} from={0} to={903} dur={40} />
        </div>
      </div>
    </div>
  );
};

/** Conta literal: subtração linha a linha. */
export const Calc: React.FC<{rows: {at: number; label: string; value: string; tone?: 'ink' | 'red' | 'blue'}[]; resultAt: number}> = ({rows, resultAt}) => {
  const f = useCurrentFrame();
  const r = progress(f, resultAt, 18, ease.out);
  return (
    <Glass style={{width: 900, padding: '44px 56px'}}>
      {rows.map((row, i) => {
        const p = progress(f, row.at, 14, ease.out);
        return (
          <div key={i} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '18px 0', borderBottom: `2px solid ${D.line}`,
            opacity: p, transform: `translateX(${(1 - p) * 40}px)`}}>
            <span style={{fontFamily: FU, fontSize: 40, color: D.muted}}>{row.label}</span>
            <span style={{fontFamily: FD, fontWeight: 700, fontSize: 64, color: row.tone === 'red' ? RED : row.tone === 'blue' ? D.blue : D.ink}}>{row.value}</span>
          </div>
        );
      })}
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: 26, opacity: r, transform: `scale(${mix(0.94, 1, r)})`}}>
        <span style={{fontFamily: FD, fontWeight: 700, fontSize: 44, color: D.ink}}>Você economiza</span>
        <span style={{fontFamily: FD, fontWeight: 800, fontSize: 92, color: '#12A150', letterSpacing: '-0.04em'}}>R$ 903</span>
      </div>
    </Glass>
  );
};

/** Duas barras: preço cheio × um quarto (escala por transform, sem mexer no layout). */
export const QuarterBars: React.FC<{at: number; quarterAt: number}> = ({at, quarterAt}) => {
  const f = useCurrentFrame();
  const a = progress(f, at, 30, ease.inOut), b = progress(f, quarterAt, 30, ease.inOut);
  const bar = (label: string, value: string, k: number, color: string, fill: number) => (
    <div style={{width: 900}}>
      <div style={{display: 'flex', justifyContent: 'space-between', fontFamily: FD, fontWeight: 700, fontSize: 44, color: D.ink, marginBottom: 14}}><span>{label}</span><span style={{color}}>{value}</span></div>
      <div style={{height: 70, borderRadius: 35, background: '#E6EBF3', overflow: 'hidden'}}>
        <div style={{height: '100%', width: '100%', background: color, borderRadius: 35, transform: `scaleX(${k * fill})`, transformOrigin: 'left center'}} />
      </div>
    </div>
  );
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 46}}>
      {bar('Site oficial', 'R$ 1.200', a, '#B8C2D6', 1)}
      {bar('Nexools', 'R$ 297', b, D.blue, 0.2475)}
    </div>
  );
};

/** Balança literal: R$ 1.200 pesa e derruba o prato; R$ 297 equilibra. */
export const Balance: React.FC<{at: number; lightAt: number}> = ({at, lightAt}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const e = f < at ? 0 : springIn(f, fps, at, 'snappy');
  const drop = f < at ? 0 : springIn(f, fps, at + 10, 'heavy');
  const lift = f < lightAt ? 0 : springIn(f, fps, lightAt, 'snappy');
  const ang = mix(0, -16, Math.min(drop, 1.05)) * (1 - Math.min(lift, 1.02));
  const heavy = f < lightAt;
  const L = 330;
  const dy = Math.sin((ang * Math.PI) / 180) * L;
  const pan = (side: number, child: React.ReactNode) => (
    <div style={{position: 'absolute', left: 450 + side * L - 150, top: 230 + side * dy, width: 300, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <div style={{width: 3, height: 90, background: '#9AA6BD'}} />
      <div style={{width: 300, height: 26, borderRadius: 13, background: '#C9D2E3'}} />
      <div style={{position: 'absolute', bottom: 40}}>{child}</div>
    </div>
  );
  return (
    <div style={{position: 'relative', width: 900, height: 620, opacity: Math.min(1, e * 1.5)}}>
      <div style={{position: 'absolute', left: 435, top: 230, width: 30, height: 360, borderRadius: 15, background: '#C9D2E3'}} />
      <div style={{position: 'absolute', left: 330, top: 570, width: 240, height: 34, borderRadius: 17, background: '#B8C2D6'}} />
      <div style={{position: 'absolute', left: 450 - L - 20, top: 214, width: 2 * L + 40, height: 22, borderRadius: 11, background: D.ink, transform: `rotate(${ang}deg)`}} />
      {pan(-1, heavy ? <Weight label="R$ 1.200" color={D.ink} big /> : <Weight label="R$ 297" color={D.blue} />)}
      {pan(1, <div style={{fontFamily: FD, fontWeight: 600, fontSize: 34, color: D.muted, whiteSpace: 'nowrap'}}>seu bolso</div>)}
    </div>
  );
};
const Weight: React.FC<{label: string; color: string; big?: boolean}> = ({label, color, big}) => (
  <div style={{padding: big ? '34px 30px' : '20px 26px', borderRadius: 22, background: color, color: '#fff', fontFamily: FD, fontWeight: 800, fontSize: big ? 56 : 46,
    whiteSpace: 'nowrap', boxShadow: '0 20px 40px -20px rgba(11,22,42,0.6)'}}>{label}</div>
);

/** Café × R$ 0,81. */
export const Coffee: React.FC<{at: number}> = ({at}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const e = f < at ? 0 : springIn(f, fps, at, 'snappy');
  const steam = (i: number) => (
    <div key={i} style={{position: 'absolute', left: 120 + i * 50, top: -60 - ((f * 1.2 + i * 30) % 60), width: 14, height: 60, borderRadius: 7, background: '#C9D2E3',
      opacity: 0.6 * (1 - ((f * 1.2 + i * 30) % 60) / 60)}} />
  );
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 50, opacity: Math.min(1, e * 1.6), transform: `translateY(${(1 - Math.min(e, 1)) * 40}px)`}}>
      <div style={{position: 'relative', width: 340, height: 300}}>
        {[0, 1, 2].map(steam)}
        <div style={{position: 'absolute', left: 30, top: 40, width: 250, height: 230, borderRadius: '0 0 70px 70px', background: '#FFFFFF', border: `6px solid ${D.ink}`}} />
        <div style={{position: 'absolute', left: 262, top: 90, width: 80, height: 110, borderRadius: 40, border: `6px solid ${D.ink}`}} />
        <div style={{position: 'absolute', left: 54, top: 60, width: 202, height: 40, borderRadius: 20, background: '#8A5A3B'}} />
      </div>
      <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
        <div style={{fontFamily: FU, fontSize: 38, color: D.muted}}>um cafezinho</div>
        <div style={{fontFamily: FD, fontWeight: 700, fontSize: 52, color: D.ink}}>custa mais que</div>
        <div style={{fontFamily: FD, fontWeight: 800, fontSize: 110, color: D.blue, letterSpacing: '-0.04em'}}>R$ 0,81</div>
      </div>
    </div>
  );
};

/** Calendário com a data-limite. */
export const Calendar: React.FC<{at: number; label?: string}> = ({at, label = 'termina a condição'}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const e = f < at ? 0 : springIn(f, fps, at, 'snappy');
  const shake = Math.sin(f * 0.5) * Math.max(0, 1 - (f - at - 20) / 30) * (f > at + 20 ? 4 : 0);
  return (
    <div style={{width: 520, borderRadius: 40, overflow: 'hidden', background: '#fff', boxShadow: '0 30px 80px -24px rgba(11,22,42,0.3)', opacity: Math.min(1, e * 1.6),
      transform: `rotate(${shake}deg) scale(${mix(0.85, 1, Math.min(e, 1.05))})`}}>
      <div style={{height: 120, background: RED, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FD, fontWeight: 800, fontSize: 58, color: '#fff', letterSpacing: '0.12em'}}>NOVEMBRO</div>
      <div style={{fontFamily: FD, fontWeight: 800, fontSize: 260, color: D.ink, textAlign: 'center', lineHeight: 1.05, letterSpacing: '-0.05em'}}>30</div>
      <div style={{fontFamily: FD, fontWeight: 600, fontSize: 38, color: RED, textAlign: 'center', paddingBottom: 30}}>{label}</div>
    </div>
  );
};

/** Conta compartilhada (riscada) × conta no seu nome (cadeado fecha). */
export const SharedVsOwn: React.FC<{at: number; ownAt: number}> = ({at, ownAt}) => {
  const f = useCurrentFrame();
  const x = progress(f, at + 18, 14, ease.out);
  const card = (children: React.ReactNode, tone: string, shown: number) => (
    <div style={{width: 420, height: 440, borderRadius: 40, background: '#fff', border: `3px solid ${tone}`, boxShadow: '0 30px 70px -30px rgba(11,22,42,0.35)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 26, position: 'relative', opacity: shown, transform: `translateY(${(1 - shown) * 40}px)`}}>{children}</div>
  );
  const av = (c: string, i: number) => <div key={i} style={{width: 92, height: 92, borderRadius: 46, background: c, border: '5px solid #fff', marginLeft: i ? -26 : 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Ico n="user" size={50} color="#fff" /></div>;
  return (
    <div style={{display: 'flex', gap: 40}}>
      {card(<>
        <div style={{display: 'flex'}}>{['#9AA6BD', '#7D89A1', '#B8C2D6'].map(av)}</div>
        <div style={{fontFamily: FD, fontWeight: 700, fontSize: 42, color: D.muted, textAlign: 'center'}}>Conta<br />compartilhada</div>
        <svg width={260} height={260} style={{position: 'absolute', opacity: x}} viewBox="0 0 100 100"><path d="M15 15 85 85M85 15 15 85" stroke={RED} strokeWidth={8 * x} strokeLinecap="round" /></svg>
      </>, '#F6C3C5', progress(f, at, 16, ease.out))}
      {card(<>
        <div style={{width: 120, height: 120, borderRadius: 60, background: D.blue, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Ico n="user" size={64} color="#fff" /></div>
        <div style={{fontFamily: FD, fontWeight: 700, fontSize: 42, color: D.ink, textAlign: 'center'}}>Conta no<br />seu nome</div>
        <Lock size={70} color="#12A150" closeAt={ownAt + 14} />
      </>, '#B5E4C6', progress(f, ownAt, 16, ease.out))}
    </div>
  );
};

/** Prints reais de clientes (WhatsApp, telefones já ocultos). */
export const RealPrints: React.FC<{at: number}> = ({at}) => {
  const f = useCurrentFrame();
  const items = [{src: 'nexools-c5/depo1.png', h: 850, r: -4, x: -235, y: 40}, {src: 'nexools-c5/depo2.png', h: 624, r: 3, x: 225, y: 30}, {src: 'nexools-c5/depo3.png', h: 463, r: -1, x: 20, y: 380}];
  const w = 430;
  return (
    <div style={{position: 'relative', width: 960, height: 760, marginTop: 10}}>
      {items.map((it, i) => {
        const p = progress(f, at + i * 10, 22, ease.out);
        if (f < at + i * 10) return null;
        return (
          <div key={i} style={{position: 'absolute', left: 480 - w / 2 + it.x, top: it.y + (1 - p) * 60, width: w, borderRadius: 24, overflow: 'hidden', opacity: p,
            transform: `rotate(${it.r + drift(f, i, 0.4) * 0.6}deg) scale(${mix(0.9, 1, p)})`, boxShadow: '0 30px 70px -26px rgba(11,22,42,0.55)'}}>
            <Img src={staticFile(it.src)} style={{width: w, height: (w * it.h) / 795, display: 'block'}} />
          </div>
        );
      })}
    </div>
  );
};

/** Parede de cursos em diagonal (fundo das cenas de catálogo). */
export const CourseWall: React.FC<{from: number; to: number; opacity?: number; names: string[]}> = ({from, to, opacity = 0.3, names}) => {
  const f = useCurrentFrame();
  const pan = progress(f, from, Math.max(1, to - from), ease.linear);
  return (
    <div style={{position: 'absolute', inset: -260, transform: `rotate(-10deg) translate(${-pan * 260}px, ${-pan * 220}px)`, display: 'grid', gridTemplateColumns: 'repeat(5, 300px)', gap: 28, opacity}}>
      {Array.from({length: 40}, (_, i) => <Tile key={i} title={names[i % names.length]} area={['Tecnologia', 'Negócios', 'Dados'][i % 3]} i={i} w={300} />)}
    </div>
  );
};

/** Certificado com o nome do aluno. */
export const Certificate: React.FC<{lineAt: number}> = ({lineAt}) => {
  const f = useCurrentFrame();
  return (
    <div style={{width: 880, background: '#fff', borderRadius: 40, padding: '50px 56px', border: `2px solid ${D.line}`, boxShadow: '0 30px 80px -24px rgba(11,22,42,0.28)'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: FU, fontSize: 26, letterSpacing: '0.14em', color: D.muted, fontWeight: 600}}>CERTIFICADO DE CONCLUSÃO<Ico n="cert" size={58} /></div>
      <div style={{fontFamily: FD, fontWeight: 700, fontSize: 100, color: D.ink, letterSpacing: '-0.04em', margin: '26px 0 6px'}}>Seu nome</div>
      <div style={{height: 6, width: 520, background: D.blueDeep, borderRadius: 3, transform: `scaleX(${progress(f, lineAt, 20, ease.out)})`, transformOrigin: 'left'}} />
      <div style={{fontFamily: FD, fontSize: 32, color: D.muted, fontWeight: 500, marginTop: 20}}>nos programas incluídos no Coursera Plus</div>
    </div>
  );
};

/** WhatsApp com pessoa real respondendo. */
export const Chat: React.FC<{at: number; replyAt: number; reply?: string}> = ({at, replyAt, reply = 'Oi! Tô aqui pra tirar todas as suas dúvidas!'}) => {
  const f = useCurrentFrame();
  const typing = f > at + 10 && f < replyAt;
  return (
    <Glass style={{width: 880, overflow: 'hidden'}}>
      <div style={{height: 120, background: '#075E54', display: 'flex', alignItems: 'center', gap: 22, padding: '0 34px'}}>
        <div style={{width: 72, height: 72, borderRadius: 36, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FD, fontWeight: 800, color: D.blueDeep, fontSize: 38}}>N</div>
        <div><div style={{fontFamily: FD, fontWeight: 700, fontSize: 40, color: '#fff'}}>Atendimento Nexools</div><div style={{fontFamily: FU, fontSize: 26, color: '#CFF5DE'}}>online · via WhatsApp</div></div>
      </div>
      <div style={{padding: 34, minHeight: 200, display: 'flex', flexDirection: 'column', gap: 18, background: '#F7F4EF'}}>
        {typing && <div style={{width: 130, height: 66, borderRadius: 33, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10}}>
          {[0, 1, 2].map((i) => <span key={i} style={{width: 14, height: 14, borderRadius: 7, background: D.ink, opacity: 0.3 + 0.7 * Math.max(0, Math.sin(f * 0.22 - i))}} />)}</div>}
        {f >= replyAt && <div style={{maxWidth: 680, background: '#fff', borderRadius: 30, padding: '24px 32px', fontFamily: FU, fontSize: 38, color: D.ink,
          opacity: progress(f, replyAt, 10), transform: `translateX(${(1 - progress(f, replyAt, 14, ease.out)) * -30}px)`}}>{reply}</div>}
      </div>
    </Glass>
  );
};

/** Carimbo "VAGAS LIMITADAS" (fecha o vídeo). */
export const VagasStamp: React.FC<{at: number}> = ({at}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  if (f < at) return <div style={{height: 120}} />;
  const e = springIn(f, fps, at, 'snappy');
  return (
    <div style={{transform: `rotate(-4deg) scale(${mix(1.8, 1, Math.min(e, 1.03))})`, opacity: Math.min(1, e * 2), padding: '20px 40px', border: `6px solid ${RED}`, borderRadius: 20,
      fontFamily: FD, fontWeight: 800, fontSize: 64, color: RED, letterSpacing: '0.06em', background: 'rgba(253,236,236,0.85)', whiteSpace: 'nowrap'}}>VAGAS LIMITADAS</div>
  );
};

/** Linha de marcas em texto (sem logos de terceiros). */
export const Brands: React.FC<{ats: number[]; names?: string[]}> = ({ats, names = ['Google', 'IBM', 'Meta', 'Stanford']}) => (
  <div style={{display: 'flex', gap: 18, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 940}}>
    {names.map((n, i) => {
      const At: React.FC = () => {
        const f = useCurrentFrame();
        const p = progress(f, ats[i], 14, ease.out);
        return <div style={{opacity: p, transform: `translateY(${(1 - p) * 30}px) scale(${mix(0.85, 1, p)})`}}><Tag tone="white" size={52}>{n}</Tag></div>;
      };
      return <At key={n} />;
    })}
  </div>
);

export {AbsoluteFill};
