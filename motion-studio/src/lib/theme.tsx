import React, {createContext, useContext} from 'react';
import type {EaseName, SpringName} from './motion';

export type Theme = {
  name: string;
  colors: {
    bg: string;
    bg2: string;
    surface: string;
    line: string;
    fg: string;
    muted: string;
    accent: string;
    accent2: string;
    danger: string;
  };
  fonts: {display: string; text: string; serif: string; mono: string};
  motion: {
    /** 0..1 scales travel distances and blur. Minimal styles stay low. */
    intensity: number;
    spring: SpringName;
    ease: EaseName;
    /** Frames between staggered items. */
    stagger: number;
  };
  /** Film grain opacity 0..0.1 */
  grain: number;
};

const fonts = {
  display: '"Inter", system-ui, sans-serif',
  text: '"Inter", system-ui, sans-serif',
  serif: '"Instrument Serif", Georgia, serif',
  mono: '"JetBrains Mono", ui-monospace, monospace',
};

/** Style A — Apple-inspired premium: monochrome, generous space, calm springs. */
export const applePremium: Theme = {
  name: 'apple-premium',
  colors: {bg: '#050506', bg2: '#0E0E11', surface: '#16161A', line: 'rgba(255,255,255,0.08)', fg: '#F5F5F7',
    muted: '#86868B', accent: '#9FF5DC', accent2: '#FFFFFF', danger: '#FF6B5E'},
  fonts,
  motion: {intensity: 0.45, spring: 'calm', ease: 'out', stagger: 4},
  grain: 0.035,
};

/** Style B — High-retention dynamic: contrast, faster stagger, snappy springs. */
export const highRetention: Theme = {
  name: 'high-retention',
  colors: {bg: '#07070A', bg2: '#101016', surface: '#16161E', line: 'rgba(255,255,255,0.10)', fg: '#FFFFFF',
    muted: '#8A8A99', accent: '#00C896', accent2: '#33D3AA', danger: '#FF4D5E'},
  fonts,
  motion: {intensity: 1, spring: 'snappy', ease: 'out', stagger: 2},
  grain: 0.05,
};

/** Style C — SaaS product cinematic: clean UI surfaces, moderate depth. */
export const saasCinematic: Theme = {
  name: 'saas-cinematic',
  colors: {bg: '#08080C', bg2: '#101016', surface: '#16161E', line: '#242430', fg: '#F2F3F7',
    muted: '#8B8FA3', accent: '#00C896', accent2: '#6E8BFF', danger: '#FF6B6B'},
  fonts,
  motion: {intensity: 0.7, spring: 'precise', ease: 'out', stagger: 3},
  grain: 0.03,
};

/** Style D — Editorial: typography first, paper tones, serif accents. */
export const editorial: Theme = {
  name: 'editorial',
  colors: {bg: '#F2EEE6', bg2: '#E8E2D6', surface: '#FFFFFF', line: 'rgba(0,0,0,0.12)', fg: '#111111',
    muted: '#6B665C', accent: '#E2402B', accent2: '#111111', danger: '#E2402B'},
  fonts,
  motion: {intensity: 0.6, spring: 'precise', ease: 'out', stagger: 3},
  grain: 0.06,
};

/** Style E — Conceptual: metaphor-led, abstract forms, heavier springs. */
export const conceptual: Theme = {
  name: 'conceptual',
  colors: {bg: '#0B0D12', bg2: '#141824', surface: '#1B2030', line: 'rgba(255,255,255,0.09)', fg: '#EEF1F8',
    muted: '#7D869C', accent: '#FFB86B', accent2: '#7AA7FF', danger: '#FF6B6B'},
  fonts,
  motion: {intensity: 0.75, spring: 'heavy', ease: 'inOut', stagger: 4},
  grain: 0.045,
};

/** Style F — Premium performance ad: legibility and CTA first. */
export const performanceAd: Theme = {...highRetention, name: 'performance-ad', motion: {...highRetention.motion, intensity: 0.85}};

export const themes = {applePremium, highRetention, saasCinematic, editorial, conceptual, performanceAd};

const ThemeContext = createContext<Theme>(applePremium);
export const ThemeProvider: React.FC<{theme: Theme; children: React.ReactNode}> = ({theme, children}) => (
  <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
);
export const useTheme = () => useContext(ThemeContext);
