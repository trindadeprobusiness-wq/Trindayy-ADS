// A1 · Âncora de preço (Ana Alice, 40,5 s): R$ 1.200 oficial → R$ 297 aqui → o que vem junto → R$ 0,81/dia → Saiba mais (vídeo completo).
import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Scene} from '../nexools-vsl/kit';
import {AdShell, Stage, Glass, Tag, Slam, Burst, Sweep, CTA, D, GLOW, fr, timing, sfx, Pop, Kin, Strike, Count, Ico, Lock, CourseraMark, Tile, FD, FU} from './akit';
import {progress, ease, mix} from '../../lib';
import data from './a1.json';

const {SEC, T, TS, words, total} = timing(data);
export const A1 = {id: 'NexoolsAdA1', total: fr(total + 1)};
const W = D.ink;

const Ancora: React.FC = () => {
  const frame = useCurrentFrame();
  const {from, to} = SEC('ancora');
  const aqui = T('ancora', 'aqui'), slam = T('ancora', 'duzentos', 1);
  const shrink = progress(frame, aqui - 6, 24, ease.inOut);
  return (
    <Scene from={Math.min(from, 0)} to={to} push={0.03} fadeIn={1}>
      <Stage gap={30}>
        <div style={{transform: `scale(${mix(1, 0.62, shrink)}) translateY(${shrink * -60}px)`, opacity: mix(1, 0.75, shrink)}}>
          <Pop at={0}>
            <Glass style={{width: 860, padding: '44px 52px'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 20}}><CourseraMark size={62} color={D.ink} /><div style={{fontFamily: FD, fontWeight: 700, fontSize: 48, color: W}}>Coursera Plus · 12 meses</div></div>
              <div style={{fontFamily: FD, fontWeight: 700, fontSize: 170, color: W, letterSpacing: '-0.05em', marginTop: 10, whiteSpace: 'nowrap'}}>
                <span style={{fontSize: 70, color: D.muted}}>R$ </span><Strike at={aqui + 4} color={D.red} thickness={0.07}><Count at={4} from={0} to={1200} dur={T('ancora', 'mil') - 4} /></Strike>
              </div>
              <div style={{fontFamily: FU, fontSize: 34, color: D.muted}}>no site oficial</div>
            </Glass>
          </Pop>
        </div>
        <Pop at={aqui} dy={20}><Tag tone="ghost" size={44}>Aqui na Nexools</Tag></Pop>
        <Slam at={slam} size={290}><span style={{fontSize: 110, verticalAlign: '0.95em', color: D.ice, marginRight: 14}}>R$</span>297</Slam>
      </Stage>
      <Burst at={slam + 4} y={900} />
    </Scene>
  );
};

const NAMES = ['Machine Learning', 'Python', 'Análise de Dados', 'Liderança', 'Cloud Computing', 'Prompt Engineering', 'Excel Avançado', 'SQL Essencial', 'Gestão Ágil', 'Power BI', 'IA Generativa', 'UX Design'];
const Produto: React.FC = () => {
  const frame = useCurrentFrame();
  const {from, to} = SEC('produto');
  const cert = T('produto', 'certificado');
  const pan = progress(frame, from, to - from, ease.linear);
  return (
    <Scene from={from} to={to} push={0.02}>
      <div style={{position: 'absolute', inset: -260, transform: `rotate(-10deg) translate(${-pan * 300}px, ${-pan * 260}px)`, display: 'grid', gridTemplateColumns: 'repeat(5, 300px)', gap: 28, opacity: 0.32}}>
        {Array.from({length: 40}, (_, i) => <Tile key={i} title={NAMES[i % NAMES.length]} area={['Tecnologia', 'Negócios', 'Dados'][i % 3]} i={i} w={300} />)}
      </div>
      <div style={{position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 42%, ${D.bg}F2 0%, ${D.bg}C0 45%, ${D.bg}40 80%)`}} />
      {frame < cert && (
        <Stage gap={34}>
          <Pop at={T('produto', 'Coursera')} out={cert - 12}><Tag size={52}><CourseraMark size={52} color={D.ice} />Coursera Plus</Tag></Pop>
          <Pop at={T('produto', 'doze')} out={cert - 12}><div style={{fontFamily: FD, fontWeight: 700, fontSize: 150, color: W, letterSpacing: '-0.05em', textShadow: GLOW(D.blue, 30)}}>12 meses</div></Pop>
          <Pop at={T('produto', 'milhares')} out={cert - 12}><div style={{fontFamily: FD, fontWeight: 600, fontSize: 56, color: D.ice}}>+ milhares de cursos</div></Pop>
          <div style={{display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center'}}>
            {['Google', 'IBM', 'Meta', 'Stanford'].map((n, i) => <Pop key={n} at={T('produto', n)} out={cert - 12 + i * 2} seed={i}><Tag tone="white" size={44}>{n}</Tag></Pop>)}
          </div>
        </Stage>
      )}
      {frame >= cert - 2 && (
        <Stage>
          <Pop at={cert}>
            <div style={{width: 900, background: '#fff', borderRadius: 40, padding: '56px 60px', boxShadow: GLOW(D.blue, 40)}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: FU, fontSize: 26, letterSpacing: '0.14em', color: '#56607A', fontWeight: 600}}>CERTIFICADO DE CONCLUSÃO<Ico n="cert" size={60} /></div>
              <div style={{fontFamily: FD, fontWeight: 700, fontSize: 104, color: '#0B162A', letterSpacing: '-0.04em', margin: '30px 0 6px'}}>Seu nome</div>
              <div style={{height: 6, width: progress(frame, T('produto', 'nome'), 20) * 520, background: D.blueDeep, borderRadius: 3}} />
              <div style={{fontFamily: FD, fontSize: 34, color: '#56607A', fontWeight: 500, marginTop: 22}}>nos programas incluídos no Coursera Plus</div>
            </div>
          </Pop>
        </Stage>
      )}
    </Scene>
  );
};

const Conta: React.FC = () => {
  const frame = useCurrentFrame();
  const {from, to} = SEC('conta');
  const pw = T('conta', 'troca'), nm = T('conta', 'coloca'), share = T('conta', 'Não');
  const typed = (txt: string, at: number) => txt.slice(0, Math.max(0, Math.min(txt.length, Math.floor((frame - at) / 4))));
  return (
    <Scene from={from} to={to}>
      <Stage gap={34}>
        <Kin text="A conta é sua." starts={TS('conta', 'a conta e sua')} size={110} color={W} hl={['sua.']} hlColor={D.blue} />
        <Pop at={T('conta', 'Você')}>
          <Glass glow={D.blue} style={{width: 860, padding: '44px 50px'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 22}}>
              <div style={{width: 96, height: 96, borderRadius: 48, background: 'rgba(61,139,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Ico n="user" size={54} color={D.ice} /></div>
              <div style={{fontFamily: FD, fontWeight: 700, fontSize: 48, color: W}}>Sua conta</div>
              <div style={{marginLeft: 'auto'}}><Lock size={84} color={D.green} closeAt={share + 10} /></div>
            </div>
            {[['Senha', frame < pw ? '••••••' : '•'.repeat(Math.min(10, 6 + Math.floor((frame - pw) / 5)))], ['Nome', typed('Seu nome', nm) || ' ']].map(([l, v]) => (
              <div key={l} style={{marginTop: 26}}>
                <div style={{fontFamily: FU, fontSize: 28, color: D.muted, marginBottom: 8}}>{l}</div>
                <div style={{height: 88, borderRadius: 22, border: `2px solid ${D.line}`, background: '#F7F9FC', display: 'flex', alignItems: 'center', padding: '0 28px', fontFamily: FD, fontSize: 44, fontWeight: 600, color: W}}>{v}</div>
              </div>
            ))}
          </Glass>
        </Pop>
        <Pop at={share}><Tag tone="green" size={46}><Ico n="shield" size={42} color="#7DF0B0" />Não é conta compartilhada</Tag></Pop>
      </Stage>
    </Scene>
  );
};

const Pagamento: React.FC = () => {
  const {from, to} = SEC('pagamento');
  const pix = T('pagamento', 'Pix'), card = T('pagamento', 'cartão');
  return (
    <Scene from={from} to={to}>
      <Stage gap={36}>
        <Kin text="Um pagamento só, em reais." starts={TS('pagamento', 'um pagamento so em reais')} size={100} color={W} hl={['reais.']} hlColor={D.blue} />
        <div style={{display: 'flex', gap: 26}}>
          {([['Pix', pix, 'pix'], ['Cartão', card, 'card']] as const).map(([l, at, ic]) => (
            <Pop key={l} at={at}><Glass glow={D.blue} style={{width: 400, height: 170, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, fontFamily: FD, fontWeight: 700, fontSize: 56, color: W}}><Ico n={ic} size={56} color={D.ice} />{l}</Glass></Pop>
          ))}
        </div>
        <div style={{display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'center'}}>
          {([['mensalidade', 'Mensalidade'], ['renovação', 'Renovação automática']] as const).map(([k, l]) => (
            <Pop key={k} at={T('pagamento', k) - 10}><div style={{fontFamily: FD, fontWeight: 700, fontSize: 64, color: W}}><span style={{color: D.muted, fontWeight: 500, marginRight: 18}}>sem</span><Strike at={T('pagamento', k) + 8} color={D.red}>{l}</Strike></div></Pop>
          ))}
        </div>
      </Stage>
    </Scene>
  );
};

const Pessoa: React.FC = () => {
  const frame = useCurrentFrame();
  const {from, to} = SEC('pessoa');
  const typing = frame > T('pessoa', 'pessoa') + 10 && frame < T('pessoa', 'WhatsApp');
  return (
    <Scene from={from} to={to}>
      <Stage gap={34}>
        <Kin text="Gente de verdade." starts={TS('pessoa', 'pessoa de verdade')} size={110} color={W} hl={['verdade.']} hlColor={D.green} />
        <Pop at={T('pessoa', 'pessoa')}>
          <Glass style={{width: 860, overflow: 'hidden'}}>
            <div style={{height: 120, background: '#075E54', display: 'flex', alignItems: 'center', gap: 22, padding: '0 34px'}}>
              <div style={{width: 72, height: 72, borderRadius: 36, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FD, fontWeight: 800, color: D.blueDeep, fontSize: 38}}>N</div>
              <div><div style={{fontFamily: FD, fontWeight: 700, fontSize: 40, color: '#fff'}}>Atendimento Nexools</div><div style={{fontFamily: FU, fontSize: 26, color: '#CFF5DE'}}>online · via WhatsApp</div></div>
            </div>
            <div style={{padding: 34, minHeight: 230, display: 'flex', flexDirection: 'column', gap: 18}}>
              {typing && <div style={{width: 130, height: 66, borderRadius: 33, background: '#EEF1F6', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10}}>
                {[0, 1, 2].map((i) => <span key={i} style={{width: 14, height: 14, borderRadius: 7, background: W, opacity: 0.3 + 0.7 * Math.max(0, Math.sin(frame * 0.22 - i))}} />)}</div>}
              <Pop at={T('pessoa', 'WhatsApp')} dx={-30} dy={0}><div style={{maxWidth: 680, background: '#EEF1F6', borderRadius: 30, padding: '24px 32px', fontFamily: FU, fontSize: 38, color: W}}>Oi! Tô aqui pra tirar todas as suas dúvidas!</div></Pop>
            </div>
          </Glass>
        </Pop>
      </Stage>
    </Scene>
  );
};

const Dia: React.FC = () => {
  const {from, to} = SEC('dia');
  const hit = T('dia', 'centavos');
  return (
    <Scene from={from} to={to}>
      <Stage gap={20}>
        <Pop at={from}><div style={{fontFamily: FD, fontWeight: 600, fontSize: 58, color: D.muted}}>R$ 297 ÷ 365 dias =</div></Pop>
        <Slam at={T('dia', 'oitenta')} size={250}><span style={{fontSize: 100, verticalAlign: '0.95em', color: D.ice, marginRight: 12}}>R$</span>0,81</Slam>
        <Pop at={hit}><div style={{fontFamily: FD, fontWeight: 700, fontSize: 80, color: W}}>por dia</div></Pop>
      </Stage>
      <Burst at={T('dia', 'oitenta') + 4} y={820} />
    </Scene>
  );
};

const Cta: React.FC = () => {
  const {from, to} = SEC('cta');
  return (
    <Scene from={from} to={to + 90}>
      <Stage gap={40}>
        <Pop at={T('cta', 'assiste')}><Tag tone="ghost" size={36}><Ico n="play" size={34} color={D.blue} />Assista ao vídeo completo antes de decidir</Tag></Pop>
        <CTA at={from} press={T('cta', 'Saiba')} sub="12 meses · R$ 297 · pagamento único" />
      </Stage>
    </Scene>
  );
};

const buildSfx = () => [
  sfx(T('ancora', 'mil'), 'tick', 0.35, 'contador do preço oficial'),
  sfx(T('ancora', 'aqui') + 4, 'strike', 0.4, 'risca R$ 1.200'),
  sfx(T('ancora', 'duzentos', 1) - 70, 'riser', 0.35, 'tensão antes do preço'),
  sfx(T('ancora', 'duzentos', 1), 'impact', 0.6, 'R$ 297 bate na tela'),
  sfx(T('produto', 'Coursera'), 'whoosh', 0.3, 'entra o produto'),
  sfx(T('produto', 'milhares'), 'pop', 0.3, 'milhares de cursos'),
  sfx(T('produto', 'certificado'), 'chime', 0.4, 'certificado no seu nome'),
  sfx(T('conta', 'troca'), 'typing', 0.3, 'senha trocada'),
  sfx(T('conta', 'Não') + 10, 'stamp', 0.4, 'cadeado: não compartilhada'),
  sfx(T('pagamento', 'Pix'), 'click', 0.4, 'Pix'),
  sfx(T('pagamento', 'cartão'), 'click', 0.35, 'cartão'),
  sfx(T('pagamento', 'mensalidade') + 8, 'strike', 0.35, 'sem mensalidade'),
  sfx(T('pagamento', 'renovação') + 8, 'strike', 0.35, 'sem renovação'),
  sfx(T('pessoa', 'WhatsApp'), 'pop', 0.4, 'resposta da pessoa real'),
  sfx(T('dia', 'oitenta'), 'impact', 0.5, 'R$ 0,81 por dia'),
  sfx(T('cta', 'Saiba'), 'click', 0.5, 'botão pressionado'),
];

export const NexoolsAdA1: React.FC<{debugSafeArea?: boolean}> = ({debugSafeArea}) => {
  const s = React.useMemo(buildSfx, []);
  return (
    <AdShell voice="nexools-ads/voice1.mp3" bed="nexools-ads/bed1.wav" total={A1.total} sfx={s} words={words} debugSafeArea={debugSafeArea}>
      <Ancora /><Produto /><Conta /><Pagamento /><Pessoa /><Dia /><Cta />
      <Sweep at={SEC('produto').from - 10} /><Sweep at={SEC('dia').from - 10} />
    </AdShell>
  );
};
