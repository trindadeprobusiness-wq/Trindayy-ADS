// C4 · "Oitenta e um centavos" (Paulo, 27,0 s; a fala não tem CTA, o botão entra no fim). R$ 0,81/dia → 365 dias → áreas → marcas + certificado → R$ 1.200 × R$ 297 → Saiba mais.
import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Scene} from '../nexools-vsl/kit';
import {AdShell, Tag, Slam, Burst, Sweep, CTA, D, fr, timing, sfx, Pop, Kin, Ico, Count, FD} from '../nexools-ads/akit';
import {Urgency, Zone, OfficialCard, CourseWall, Brands, Certificate, VagasStamp} from './ckit';
import data from './c4.json';

const {SEC, T, TS, words, total} = timing(data);
export const C4 = {id: 'NexoolsC4Centavos', total: fr(total + 1.6)};
const NAMES = ['Inteligência Artificial', 'Análise de Dados', 'Excel Avançado', 'Gestão de Projetos', 'Marketing Digital', 'Python', 'Power BI', 'Liderança', 'IA Generativa', 'SQL Essencial', 'Cloud Computing', 'UX Design'];

const Hook: React.FC = () => {
  const {to} = SEC('hook');
  const hit = T('hook', 'Oitenta');
  return (
    <Scene from={0} to={to} fadeIn={1}>
      <Zone gap={20}>
        <Slam at={Math.max(2, hit - 4)} size={290}><span style={{fontSize: 110, verticalAlign: '0.95em', color: D.blue, marginRight: 14}}>R$</span>0,81</Slam>
        <Pop at={T('hook', 'dia')}><div style={{fontFamily: FD, fontWeight: 800, fontSize: 96, color: D.ink}}>por dia.</div></Pop>
      </Zone>
      <Burst at={Math.max(2, hit - 4) + 4} y={820} />
    </Scene>
  );
};

const Frase: React.FC = () => {
  const {from, to} = SEC('frase');
  return (
    <Scene from={from} to={to}>
      <Zone gap={36}>
        <Kin text="Um ano inteiro de Coursera Plus." starts={TS('frase', 'um ano inteiro com o coursera')} size={100} hl={['Coursera', 'Plus.']} hlColor={D.blue} />
        <Pop at={T('frase', 'ano')}>
          <div style={{display: 'flex', alignItems: 'baseline', gap: 22}}>
            <div style={{fontFamily: FD, fontWeight: 800, fontSize: 220, color: D.ink, letterSpacing: '-0.05em'}}><Count at={T('frase', 'ano')} from={0} to={365} dur={50} /></div>
            <div style={{fontFamily: FD, fontWeight: 700, fontSize: 70, color: D.muted}}>dias</div>
          </div>
        </Pop>
        <Pop at={T('frase', 'Nexools')}><Tag size={46}>Aqui na Nexools</Tag></Pop>
      </Zone>
    </Scene>
  );
};

const Areas: React.FC = () => {
  const {from, to} = SEC('areas');
  const items: [string, string][] = [['Inteligência', 'Inteligência artificial'], ['dados', 'Dados'], ['Excel', 'Excel'], ['gestão', 'Gestão de projetos'], ['marketing', 'Marketing']];
  return (
    <Scene from={from} to={to} push={0.02}>
      <CourseWall from={from} to={SEC('marcas').to} names={NAMES} opacity={0.24} />
      <div style={{position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 46%, ${D.bg}F2 0%, ${D.bg}C0 50%, ${D.bg}30 85%)`}} />
      <Zone gap={22}>
        {items.map(([k, l], i) => (
          <Pop key={k} at={T('areas', k) - 4} seed={i}><Tag tone={i % 2 ? 'white' : 'blue'} size={64}>{l}</Tag></Pop>
        ))}
      </Zone>
    </Scene>
  );
};

const Marcas: React.FC = () => {
  const f = useCurrentFrame();
  const {from, to} = SEC('marcas');
  const cert = T('marcas', 'certificado');
  return (
    <Scene from={from} to={to}>
      {f < cert - 4 && (
        <Zone gap={40}>
          <Pop at={from}><div style={{fontFamily: FD, fontWeight: 800, fontSize: 84, color: D.ink, textAlign: 'center'}}>Cursos de quem é referência</div></Pop>
          <Brands ats={['Google', 'IBM', 'Meta', 'Stanford'].map((n) => T('marcas', n))} />
        </Zone>
      )}
      {f >= cert - 4 && (
        <Zone gap={30}>
          <Pop at={cert}><Certificate lineAt={T('marcas', 'nome')} /></Pop>
        </Zone>
      )}
    </Scene>
  );
};

const Preco: React.FC = () => {
  const f = useCurrentFrame();
  const {from} = SEC('preco');
  const slam = T('preco', 'duzentos');
  const ofc = T('preco', 'mil');
  const end = fr(total + 1.6);
  const ctaAt = fr(total) - 40;
  return (
    <Scene from={from} to={end}>
      {f < ctaAt && (
        <Zone gap={30}>
          <Slam at={slam} size={280}><span style={{fontSize: 106, verticalAlign: '0.95em', color: D.blue, marginRight: 12}}>R$</span>297</Slam>
          <Pop at={T('preco', 'pagos')}><Tag tone="green" size={46}><Ico n="check" size={40} color="#0E7A3D" />pagos uma vez</Tag></Pop>
          <Pop at={ofc - 20}><div style={{transform: 'scale(0.7)', marginTop: -60}}><OfficialCard countAt={ofc - 30} countDur={30} strikeAt={ofc + 16} /></div></Pop>
        </Zone>
      )}
      {f >= ctaAt && (
        <Zone gap={44}>
          <VagasStamp at={ctaAt + 4} />
          <CTA at={ctaAt} press={ctaAt + 40} sub="12 meses · R$ 297 · pagamento único" />
        </Zone>
      )}
      <Burst at={slam + 4} y={700} />
    </Scene>
  );
};

const buildSfx = () => {
  const ctaAt = fr(total) - 40;
  return [
    sfx(Math.max(2, T('hook', 'Oitenta') - 4), 'impact', 0.6, 'R$ 0,81 abre o vídeo'),
    sfx(T('frase', 'ano'), 'tick', 0.3, 'contador de 365 dias'),
    sfx(SEC('areas').from, 'whoosh', 0.3, 'entra o catálogo'),
    sfx(T('areas', 'Excel') - 4, 'pop', 0.25, 'áreas aparecem'),
    sfx(T('marcas', 'Google'), 'pop', 0.25, 'marcas aparecem'),
    sfx(T('marcas', 'certificado'), 'chime', 0.4, 'certificado no seu nome'),
    sfx(T('preco', 'duzentos') - 50, 'riser', 0.3, 'sobe antes do preço'),
    sfx(T('preco', 'duzentos'), 'impact', 0.55, 'R$ 297 bate na tela'),
    sfx(T('preco', 'mil') + 16, 'strike', 0.35, 'risca o preço oficial'),
    sfx(ctaAt + 4, 'stamp', 0.5, 'carimbo vagas limitadas'),
    sfx(ctaAt + 40, 'click', 0.5, 'botão pressionado'),
  ];
};

export const NexoolsC4: React.FC<{debugSafeArea?: boolean}> = ({debugSafeArea}) => {
  const s = React.useMemo(buildSfx, []);
  return (
    <AdShell voice="nexools-c5/voice4.mp3" bed="nexools-c5/bed4.wav" total={C4.total} sfx={s} words={words} debugSafeArea={debugSafeArea}>
      <Hook /><Frase /><Areas /><Marcas /><Preco />
      <Urgency />
      <Sweep at={SEC('areas').from - 10} /><Sweep at={SEC('preco').from - 10} />
    </AdShell>
  );
};

