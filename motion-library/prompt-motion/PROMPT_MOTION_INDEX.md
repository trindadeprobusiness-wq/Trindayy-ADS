# Biblioteca Prompt Motion · Índice Mestre de 240 Prompts

> Acervo consolidado de 240 prompts de alta performance para motion design, criativos de anúncios (Meta/TikTok) e vídeos de conteúdo.

## Como utilizar este acervo no projeto
1. **Defina o objetivo do vídeo**: Criativo de performance (anúncio), apresentação de produto (SaaS), demonstração mobile, ou conteúdo de autoridade (tipografia cinética).
2. **Escolha o arquétipo**: Navegue pelas categorias abaixo e selecione a fórmula que melhor resolve a narrativa.
3. **Extraia os parâmetros**: Cada prompt de elite possui `<inputs>` (o que solicitar antes de animar), `<direction>` (estética e regras), `<structure>` (grade de compassos/tempo) e `<build>` (regras de código e render).
4. **Aplique a Sonorificação Inteligente**: Siga rigorosamente o guia `SONORIZACAO_E_AUDIO_DESIGN.md` para alinhamento por pico, ducking e masterização em -14 LUFS.

---

## Prompts de Elite (Arquiteturas Completas com Inputs + Direction + Build)

### PM-002 · Shape morphing through UI states
- **Tags**: `Product UI, Charts, Music` | **Autor**: @twoclipping | **Vídeo**: [Assistir Demonstração ↗](https://prompt-motion.com/twoclipping-5cba86)
```markdown
<inputs>
Ask me for: 8 to 12 UI states I want the shape to become (e.g. button, loader, player, slider, toggle, tabs, chart, command palette, toast), pure black and white or one accent color, and a royalty-free song around 120 BPM (e.g. Mixkit, free for commercial use).
</inputs>

<direction>
Dribbble-level UI motion. One shape, never cut: every state is the same element morphing its size, radius and color while its content swaps with a short blur. A cursor drives every change with real clicks and drags. Light warm-gray canvas, black and white components, one clean UI font (Geist). Springs everywhere, a tiny overshoot at most. The camera zooms so each state fills the frame. The last frame is the first frame, so it loops.
Banned: bouncy easing, particle bursts, glows, gradients on UI chrome, mismatched icon strokes, dead time, anything that looks like a template.
</direction>

<structure>
120 BPM, 7 bars, something happens on every beat.
Button → loader → check → dynamic island → music player with a play/pause morph → scrub the progress bar → it becomes a volume slider that stretches when dragged past max → a toggle flips on the beat → the knob becomes a liquid tab indicator → the tabs open into a chart that draws itself, with a tooltip on hover → it collapses into ⌘K → type to filter → enter → toast → back to the button.
</structure>

<build>
1. One HTML file, square 1440x1440. Every style is computed from time inside seek(t): no CSS transitions, no timers, no state carried between frames.
2. Springs are closed-form step responses. A value that changes target many times is 
... [veja prompts_database.json para o prompt integral]
```

### PM-005 · Photo print app launch film
- **Tags**: `Product UI, Phone, Photos, Music` | **Autor**: @twoclipping | **Vídeo**: [Assistir Demonstração ↗](https://prompt-motion.com/twoclipping-221cab)
```markdown
<inputs>
Ask me for: a one-word brand name for the wordmark (a verb works best), 9 to 12 high-res photos, a royalty-free song around 120 BPM with a drop and a quiet breakdown (Mixkit, free for commercial use), and a free stock clip of a plain wall with moving plant shadows (Pexels).
</inputs>

<direction>
An Apple-keynote launch film, 2D only, one continuous take. Every scene is made out of the previous one: nothing fades, blurs or cuts. Objects change shape instead: text rises out of a mask line, icons pop from zero on a spring, bars draw across, pages push, and a black shape floods the whole frame and contracts into the next scene. Warm off-white canvas, black UI, iOS 26 liquid glass over the photos. Archivo (wdth 125, weight 800) for the wordmark, Geist for UI. A cursor drives every change with real clicks, drags and long-presses. The camera zooms screen-studio style so each moment fills the square, and the cursor scales with it.
Banned: crossfades, blur-ins, brightness "developing", 3D flips, particles, glows, holds longer than 1s, anything that looks like a template.
</direction>

<structure>
120 BPM, 54 beats, something happens on every beat.
Open: the wordmark squeezes into its own period like an accordion, the dot grows into a black pill, a label rises inside it. Click: six iris blades close over the label and snap open onto a photo. The circle becomes a square, shrinks, the grid unfolds from behind it like a paper map (center, plus, corners), reflows into a bento, and a click zooms into one tile, landing exactly on the drop.
Glass: a glass word pops in letter by le
... [veja prompts_database.json para o prompt integral]
```

### PM-006 · Landing page 3D scroll
- **Tags**: `Product UI, Kinetic type` | **Autor**: @twoclipping | **Vídeo**: [Assistir Demonstração ↗](https://prompt-motion.com/twoclipping-d89be5)
```markdown
<inputs>
Ask me for: my landing page link, my brand name and logo mark, a two-part closing line (a statement, then a short italic tail), and a 15 second track (optional).
</inputs>

<direction>
A 14.5 second 3D fly-over of my landing page, 1440x1152 at 60fps. The page lies flat on a bright studio floor (#f9fbfb in the middle, #f2f3f6 in the corners) with a soft wide shadow around it and 24px rounded corners. One continuous camera, never a cut: it starts low over the hero and glides backwards down the page at one steady speed while looking up it, rises straight overhead to show the whole page as one strip, dives into the hero and lands it as a card under a two-line title. Focus is razor thin in front of the subject and almost none behind it, so everything near the lens melts. Cards float a little above the page with soft shadows; photos, chips and the testimonial lift off and stand up toward the lens as the camera passes them. Four small tiles of my logo lift off beside the hero button and stay with the film until the end card. The title is Geist 500, the italic tail Instrument Serif.
Banned: cuts, crossfades, stops or surges in the glide, the camera turning or swinging sideways, zooming in and back out, glows, any text laid over the page before the end card.
</direction>

<structure>
14.5 seconds: flight 0-8.2s, rise 7.75-9.25s, overhead 9.25-9.47s, dive 9.47-9.97s, title card 9.97-14.5s.
The camera 56° off straight-down and 1360px from the point it looks at, centred on the top half of the hero, the phone or product mockup sharp, four 32px logo tiles beside the button → 0-0
... [veja prompts_database.json para o prompt integral]
```

### PM-011 · Launch video remake comparison
- **Tags**: `Product UI, Photos, Music` | **Autor**: @notdwd | **Vídeo**: [Assistir Demonstração ↗](https://prompt-motion.com/notdwd-c2037d)
```markdown
<inputs>
Ask me for: my product name, a logo (or let you draw a simple mark), my brand colours (or pull them from my logo), the one-line thing a user types into the prompt box, the page that answers it (title + 2–3 sentences with one key phrase), two feature names for the stacked cards, and a music track. If I skip any, use the defaults: product "Frame by Frame" living inside its Whop hub, a viewfinder mark (four corner brackets around a bold "FF"), prompt "Make a launch video for my app", a lesson page titled "2.1 Choose a reference", cards "Launch" and "Sound", and Mixkit's free house track "Rising Forest" slowed to 124 BPM.
</inputs>

<direction>
A 12 second square product sting, 1080x1080, frame numbers at 29.97 fps (f0–f359), master rendered at 59.94 fps. Apple-keynote feel: soft, white, bright blue, glassy. The camera never cuts on a still frame: every shot enters already moving (exponential ease-out, 12–19% of the remaining distance per frame) and leaves on an accelerating move or a blur ramp. Blur follows speed and direction on every move.
Palette: my brand colours mapped onto these roles; if I give none, use page #FDFDFB, haze #B7CFEB, ice #E6F0FA, deep blue #294376 → #769CC2 sky gradient, navy #1E2F52, accent blues #2F6BFF / #3CC8F0 / mint #4ED6A0, white. Type: Inter (400/500/600/700). No purple, violet, magenta or orange anywhere.
Story: the product header rises out of a blue haze inside a light app window → a cursor glides in, turns to face where it's going, grows on hover and clicks the logo → hard cut on the music drop to the app icon with four squares orbitin
... [veja prompts_database.json para o prompt integral]
```

### PM-016 · UGC ad generator promo
- **Tags**: `Product UI, Phone, Photos, Music` | **Autor**: @twoclipping | **Vídeo**: [Assistir Demonstração ↗](https://prompt-motion.com/twoclipping-6dd14e)
```markdown
<inputs>
Ask me for: the product name and a one-line promise, 3 to 5 UI moments to show, one accent color, 10 to 20 real vertical clips I own, and a royalty-free song with a clear drop (e.g. Mixkit, free for commercial use).
</inputs>

<direction>
High-end minimal. One idea per shot, lots of empty space, one accent color, one clean sans (Geist or Inter) with tight tracking. Masked type reveals, match cuts, one smooth camera language. Real footage only, never placeholder cards. No full stops in on-screen text.
Banned: shockwave rings, particle bursts, RGB split, camera shake, lens flares, neon glows, grid floors, flashing backgrounds, bouncy easing.
</direction>

<structure>
10 bars at 120 BPM, 2 seconds each.
Bar 1: the hook lands word by word on the beats.
Bar 2: one hook word morphs into the product UI. A cursor types and clicks.
The drop: a circle opens out of the button into a dark scene.
Then one move per bar: a wall of real clips with a scan line and 3 winners, the key output as big type, a 3D carousel of real videos with floor reflections and a motion-blurred whip onto one hero clip, the hero in a phone next to a panel that flips into results, big stats on push cuts, a 3-word ticker, a logo reveal, a fade to black.
</structure>

<build>
1. One HTML file at 1920x1080. Every style is computed from time inside 
http://
window.seek(t): no CSS animations, no timers, no state between frames.
2. Real video: extract clips to 30fps JPEG sequences with ffmpeg and swap img sources per frame. seek awaits the image decodes.
3. Analyze the song with numpy: tempo, beat grid, energy
... [veja prompts_database.json para o prompt integral]
```

### PM-028 · TechHalla kinetic type bumper
- **Tags**: `Kinetic type` | **Autor**: @techhalla | **Vídeo**: [Assistir Demonstração ↗](https://prompt-motion.com/techhalla-90b8ec)
```markdown
You are a world-class motion designer doing a 20.00s kinetic identity bumper for TechHalla — an AI creator known for stealable workflows, not vibes. This piece must feel like the best designer in the room made a street-poster that moves. Showreel stakes: if this is weak, you don’t get hired.

DURATION: exactly 20.00 seconds. LOOPABLE: frame 0 == frame last (position, opacity, cursor if any).
FORMAT: one HTML file, 1080×1080 (square, X-native). 60fps.
PALETTE (strict):
- bg # 0A0A0A
- magenta # FF2BD6
- acid green # B8FF00
- white # F5F5F5 only for primary readable type when needed
No other hues. No gradients on UI chrome. Magenta/green may misregister (print offset) by 2–4px on impact frames only.

TYPE SYSTEM (use all three; never one font for everything):
1) Display / scream: Archivo Black (or equivalent ultra-condensed black) — 1–4 words max
2) Urban grotesque: Syne ExtraBold — secondary hits, stacked lines
3) Mono / “prompt code”: IBM Plex Mono Medium — small labels, timestamps, fake prompt crumbs
Tracking: display −40 to −80; mono +20. Optical kerning. No cute script fonts.

MESSAGE (locked — do not soften, do not add filler slogans):
Beat hits in this exact order:
1. STOP SCROLLING
2. AI VIDEO ISN’T EXPENSIVE
3. BAD PROMPTING IS
4. WORKFLOWS > WISHES
5. STEAL THE PROMPT
6. @ TECHHALLA
Supporting crumbs (mono, ≤18 chars, never full sentences): JSON · H3 · SEEDANCE · 0 KEYFRAMES · MAGNIFIC · COPY/PASTE

NARRATIVE ARC (20s):
0.0–2.5s  COLD OPEN — “STOP SCROLLING” slams in from below with spring overshoot; magenta smear trail; acid green baseline ticks across like a wavef
... [veja prompts_database.json para o prompt integral]
```

### PM-029 · Orange dot motion system
- **Tags**: `Kinetic type, Shapes, Music` | **Autor**: @ultimaxbt | **Vídeo**: [Assistir Demonstração ↗](https://prompt-motion.com/ultimaxbt-bbebf5)
```markdown
<inputs>
Ask me for: a short label for the opening toggle, one hero word, a percentage for the graph, the text for the final card, one accent color, and a track with a clear beat.
</inputs>

<direction>
A 2D motion design film in 16:9. Use a warm off-white canvas, near-black backgrounds, bold typography and one vivid orange accent. The orange dot connects every scene: it starts in the UI, becomes the dot over a letter, traces a spring graph, grows into a shape and returns on the end card. A cursor makes the opening click feel real. Keep the motion sharp and controlled, with small spring overshoots and no dead time.
Banned: stock footage, gradients, glows, particle bursts, random transitions and motion that isn't connected to an element already on screen.
</direction>

<structure>
Around 15 seconds, with a visual change on every major beat.
Open: a cursor clicks the orange toggle beside "Reduce Motion". The letters bend and move into place until only "Motion" remains, with the orange dot above the "i".
Spring: the dot jumps away from the word and lands on a graph. Its path draws a spring response, overshoots the target and settles beside a "+22%" callout.
Shape: the dot shoots across a line, grows into an orange circle and fills the frame. A black rounded square rotates inside it, then stretches into a pill. The scene contracts to a single orange dot on black.
Type: words like "SPRINGS", "EASING", "KINETIC TYPE", "3D" and "SOUND" orbit the dot. The circle of type opens out into a field of tiny dots.
Reveal: the halftone field expands and flips to black, revealing the final c
... [veja prompts_database.json para o prompt integral]
```

### PM-030 · White ball UI motion loop
- **Tags**: `Product UI, Music` | **Autor**: @rossaxbt | **Vídeo**: [Assistir Demonstração ↗](https://prompt-motion.com/rossaxbt-94583b)
```markdown
<inputs>
Ask me for: a target value for the slider, three short notification messages, a reply to type, one accent color and a royalty-free track around 120 BPM. If I skip anything, use 100, "Slider - Reached 100", "Gravity - Something is falling", "Messages - What now?", "retry" and electric blue.
</inputs>

<direction>
A 10-second 2D UI motion film in 16:9. Place everything on a near-black canvas with a faint dot grid. Use charcoal controls, sharp white text, one blue accent and a white ball that moves through the entire film. A real cursor makes the opening click feel physical; the ball guides each transition that follows. Keep the UI clean and the impacts precise, with only small spring overshoots. Move the camera through one continuous layout so every interaction fills the frame.

Banned: hard cuts, stock footage, glows, particle bursts, disconnected transitions, excessive bouncing and blurry text during camera moves.
</direction>

<structure>
Around 10 seconds, with something happening on every major beat.

Toggle: the cursor clicks a blue switch. Its white ball springs free, and the camera follows it toward a horizontal slider.

Slider: the ball lands on the knob and moves it along the track. The blue fill stays attached, while a value bubble above the knob climbs to 100.

Notifications: hitting 100 sends the ball onward and brings in three dark cards: "Slider", "Gravity" and "Messages". Each arrives on its own beat. The camera follows the ball down to "What now?".

Reply: the small "Reply" pill stretches into a text field. A keyboard rises below it as part of the sa
... [veja prompts_database.json para o prompt integral]
```

### PM-040 · Frame by Frame launch video
- **Tags**: `Product UI, Music` | **Autor**: @notdwd | **Vídeo**: [Assistir Demonstração ↗](https://prompt-motion.com/notdwd-7de38a)
```markdown
<inputs>
Ask me for: my product name, a logo (or let you draw a simple mark), the one-line thing a user types into the prompt box, the page that answers it (title + 2–3 sentences with one key phrase), two feature names for the stacked cards, and a music track. If I skip any, use the defaults: product "Frame by Frame" living inside its Whop hub, a viewfinder mark (four corner brackets around a bold "FF"), prompt "Make a launch video for my app", a lesson page titled "2.1 Choose a reference", cards "Launch" and "Sound", and Mixkit's free house track "Rising Forest" slowed to 124 BPM.
</inputs>

<direction>
A 12 second square product sting, 1080x1080, frame numbers at 29.97 fps (f0–f359), master rendered at 59.94 fps. Apple-keynote feel: soft, white, bright blue, glassy. The camera never cuts on a still frame: every shot enters already moving (exponential ease-out, 12–19% of the remaining distance per frame) and leaves on an accelerating move or a blur ramp. Blur follows speed and direction on every move.
Palette: page #FDFDFB, haze #B7CFEB, ice #E6F0FA, deep blue #294376 → #769CC2 sky gradient, navy #1E2F52, accent blues #2F6BFF / #3CC8F0 / mint #4ED6A0, white. Type: Inter (400/500/600/700). No purple, violet, magenta or orange anywhere.
Story: the product header rises out of a blue haze inside a light app window → a cursor glides in, turns to face where it's going, grows on hover and clicks the logo → hard cut on the music drop to the app icon with four squares orbiting into a cross → the icon collapses into a Mac menu bar → the cursor clicks the menu-bar icon, a frosted gla
... [veja prompts_database.json para o prompt integral]
```

### PM-044 · Ora 2 image model launch film
- **Tags**: `Product UI, Photos, Music` | **Autor**: @rossaxbt | **Vídeo**: [Assistir Demonstração ↗](https://prompt-motion.com/rossaxbt-3085b7)
```markdown
<inputs>
Ask me for: my product name, a one-line pitch, my logo, 3 to 6 screenshots of the product, 40+ images of what it creates (or photos of it), my brand colors and font, an ElevenLabs API key and voice ID, plus a royalty-free track with a clear drop (the audio file and the drop timestamp). If I skip anything, use these defaults: "Ora 2", "an image model made for taste", free images from Unsplash and Pixabay, Geist, ink #111214, the voice Samara X (19STyYD15bswVz51nqLf) on eleven_v4, and Pixabay "Cascade Breathe" (129.83 BPM, drop at 75.39s).
</inputs>

<script>
Write a 9-line voiceover in this format and adapt every line to my product:
"This is [name]. A [category]... built for [value]. [Verb] in ANY style. Give it a [input] - and it just... understands. The more you use it, the BETTER it gets. Adjust its [setting]. Its [setting]. Its [setting]. Every [output] - exactly as you pictured it. [Name]. Out now."
Use emotion tags sparingly: [softly] on the quiet lines and [excited] on the [Verb] line. Don't tag the opener, and end it with a plain full stop.
</script>

<voice>
Call the ElevenLabs API directly using my key, without an MCP. Generate 4 full-script takes in one pass and let me choose. If a line doesn't sound right, regenerate just that line 4 times and splice the best version into my take.
Shorten pauses longer than 0.28s to 0.2s, then bring each phrase 85% of the way toward the median level, adjusting gain only during pauses.
For word timings, split the read at pauses of 100ms or longer, transcribe each segment separately with Whisper, and align its first word t
... [veja prompts_database.json para o prompt integral]
```

### PM-058 · Food craving launch film
- **Tags**: `Product UI, Kinetic type, Photos, Music` | **Autor**: @ultimaxbt | **Vídeo**: [Assistir Demonstração ↗](https://prompt-motion.com/ultimaxbt-2ddf1e)
```markdown
<inputs>
Ask me for: my product, the exact request a user types into it, 6 to 8 photos for the result cards, a royalty-free song around 130 BPM with a clear drop (Mixkit, free for commercial use), and my brand mark for the end card. If I skip anything, use the defaults: the food-ordering story below, food photos from Pexels (fire noodles, birria tacos, hot chicken, buffalo wings, smash burger, spicy ramen), and Mixkit "Cat Walk".
</inputs>

<direction>
A 15-second product launch film, 1920x1080 at 60fps. 2D only, one continuous take. No fades, blurs or cuts: each scene grows from the last. Text rises from a mask line, buttons expand into pages, and color floods from one object before shrinking into another. Give the camera one eased move per scene, and never zoom in and out consecutively.

Look: warm white canvas (#f5f5f2), black UI (#0e0e10), lime accent (#cdf24f), orange (#ff6a2a), and a blue send button (#2f6bff). Add an Apple Intelligence-style iridescent glow around the input: a blurred conic gradient rotating through pink, orange, lime, cyan and violet. Use real food photography on dark cards, Geist for UI and a serif for the product name on the end card.

Banned: crossfades, blur-ins, 3D, particles, camera moves that reverse direction, holds longer than 1s, anything that feels like a template.
</direction>

<structure>
130 BPM, 32 beats (14.8s). Start the song 12 beats before its drop.

Beats 0-6, ask: push slowly into the glowing composer, about 3x zoom. Type the request over three fixed lines with a natural keystroke rhythm:
"I'm really hungry, I don't know
what I 
... [veja prompts_database.json para o prompt integral]
```

### PM-105 · Morphing UI states loop
- **Tags**: `Product UI, Music` | **Autor**: @demonugc | **Vídeo**: [Assistir Demonstração ↗](https://prompt-motion.com/demonugc-4c5753)
```markdown
<inputs>
Ask me for: 8 to 12 UI states I want the shape to become (e.g. button, loader, player, slider, toggle, tabs, chart, command palette, toast), pure black and white or one accent color, and a royalty-free song around 120 BPM (e.g. Mixkit, free for commercial use).
</inputs>

<direction>
Dribbble-level UI motion. One shape, never cut: every state is the same element morphing its size, radius and color while its content swaps with a short blur. A cursor drives every change with real clicks and drags. Light warm-gray canvas, black and white components, one clean UI font (Geist). Springs everywhere, a tiny overshoot at most. The camera zooms so each state fills the frame. The last frame is the first frame, so it loops.
Banned: bouncy easing, particle bursts, glows, gradients on UI chrome, mismatched icon strokes, dead time, anything that looks like a template.
</direction>

<structure>
120 BPM, 7 bars, something happens on every beat.
Button → loader → check → dynamic island → music player with a play/pause morph → scrub the progress bar → it becomes a volume slider that stretches when dragged past max → a toggle flips on the beat → the knob becomes a liquid tab indicator → the tabs open into a chart that draws itself, with a tooltip on hover → it collapses into ⌘K → type to filter → enter → toast → back to the button.
</structure>

<build>
1. One HTML file, square 1440x1440. Every style is computed from time inside seek(t): no CSS transitions, no timers, no state carried between frames.
2. Springs are closed-form step responses. A value that changes target many times is 
... [veja prompts_database.json para o prompt integral]
```

### PM-185 · Prompt Motion site promo
- **Tags**: `Product UI, Music` | **Autor**: @antonio_kodheli | **Vídeo**: [Assistir Demonstração ↗](https://prompt-motion.com/antonio-kodheli-490109)
```markdown
<inputs>
Ask me for: the gallery URL (default www.prompt-motion.com/), one entry whose prompt
gets shown on screen, and a royalty-free track around 120 BPM with a clear drop (e.g. Mixkit).
</inputs>

<direction>
A 23-second 16:9 promo for a gallery of Claude-made motion videos, built only from the site itself:
its real header, its real grid of autoplaying previews, its real entry page and prompt.
Use the site's skin: near-white page, black pills, one UI font (Geist), and Geist Mono for prompt text.
One accent (red-orange #F0442C), used only for the highlighter, the cursor halo and the dot on the URL.
One continuous camera over a single "world" layer. Never two camera moves at once.
Every clip on screen carries its creator's @handle, exactly as the site shows it.
Banned: a "Generate" button or any feature the site doesn't have, invented numbers, paraphrased
taglines, fades on everything, glass cards, gradients, bouncy type, dead holds.
</direction>

<structure>
120 BPM, 46 beats.
b0–2: frame 0 is one real reel, full-bleed. The camera pulls back until it is just the first
  card on the site's home page. The header, then the tagline's first half, land on b1.
b2–9: hold on the live page: header plus a 3-column masonry of playing previews.
b9–13: the grid scrolls, then the camera whips into one tile until it is full-bleed.
b13–16: the music drops. Three full-res reels from the gallery, one beat each, hard cuts,
  each with a dark handle chip inside the safe area.
b16–21: the last reel shrinks back into its own tile (a match cut). A cursor with an accent halo
  hovers a tile and 
... [veja prompts_database.json para o prompt integral]
```

---

## Catálogo Geral por Categorias (240 Prompts)

### SaaS & Product UI (33 prompts)
| ID | Título | Tags Principais | Áudio/SFX | Link Demonstração |
|---|---|---|---|---|
| `PM-006` | **Landing page 3D scroll** | Product UI, Kinetic type | 🔊 Sim | [Vídeo ↗](https://prompt-motion.com/twoclipping-d89be5) |
| `PM-015` | **Distilbook product video** | Product UI | — | [Vídeo ↗](https://prompt-motion.com/ajith-io-c52e09) |
| `PM-031` | **Four seasons train window** |  | — | [Vídeo ↗](https://prompt-motion.com/itsolelehmann-e47532) |
| `PM-037` | **SuperX feature release teaser** | Product UI | — | [Vídeo ↗](https://prompt-motion.com/robj3d3-b18fad) |
| `PM-039` | **Distilbook motion showreel** | Product UI, Kinetic type, Particles | — | [Vídeo ↗](https://prompt-motion.com/itisrazak-3ad902) |
| `PM-040` | **Frame by Frame launch video** | Product UI, Music | 🔊 Sim | [Vídeo ↗](https://prompt-motion.com/notdwd-7de38a) |
| `PM-048` | **Porco Rosso sunset dogfight** |  | — | [Vídeo ↗](https://prompt-motion.com/nft-chen-5f8bb0) |
| `PM-052` | **Beat-synced bouncing 3D ball** | Music | — | [Vídeo ↗](https://prompt-motion.com/gorden-sun-041f56) |
| `PM-054` | **Jev engineering showreel** | Product UI, Kinetic type, Music | 🔊 Sim | [Vídeo ↗](https://prompt-motion.com/polydao-7a572b) |
| `PM-079` | **Pixelup Labs studio showreel** | Product UI, Photos | — | [Vídeo ↗](https://prompt-motion.com/arjunsh1607-93005d) |
| `PM-100` | **Tally product demo** | Product UI, Kinetic type | — | [Vídeo ↗](https://prompt-motion.com/visheshbaghell-3aba37) |
| `PM-101` | **Sherwood agentic hedge fund explainer** | Product UI, Kinetic type, Photos | — | [Vídeo ↗](https://prompt-motion.com/imthatcarlos-e04bfe) |
| `PM-105` | **Morphing UI states loop** | Product UI, Music | 🔊 Sim | [Vídeo ↗](https://prompt-motion.com/demonugc-4c5753) |
| `PM-106` | **Supademo launch video** | Product UI, Kinetic type, Music | 🔊 Sim | [Vídeo ↗](https://prompt-motion.com/jhylee95-e1152f) |
| `PM-107` | **Norilu product launch video** | Product UI | — | [Vídeo ↗](https://prompt-motion.com/sachaarbonel-8f14f4) |
| `PM-109` | **Five scroll-based sections** | Product UI, Photos | — | [Vídeo ↗](https://prompt-motion.com/ercankeskinx-ec2568) |
| `PM-111` | **Trezio app motion reel** | Product UI, Kinetic type | — | [Vídeo ↗](https://prompt-motion.com/agonaliu-466a8f) |
| `PM-118` | **Product intro synced to music** | Product UI, Particles, Music | 🔊 Sim | [Vídeo ↗](https://prompt-motion.com/bogdandragomir-35e024) |
| `PM-131` | **Three.js Skyraider aircraft model** | Product UI | — | [Vídeo ↗](https://prompt-motion.com/buildfastwithai-ed9447) |
| `PM-151` | **Studio website showreel** | Product UI, Photos | — | [Vídeo ↗](https://prompt-motion.com/andginja-333d32) |
| `PM-153` | **Supasito launch video** | Product UI | — | [Vídeo ↗](https://prompt-motion.com/wozu-co-242285) |
| `PM-158` | **Portfolio motion reel** | Product UI, Kinetic type, Particles | 🔊 Sim | [Vídeo ↗](https://prompt-motion.com/heyiammallik-e72d17) |
| `PM-161` | **Tengwang Pavilion moonlit river** |  | — | [Vídeo ↗](https://prompt-motion.com/demitiyageekzen-7770ad) |
| `PM-165` | **Black hole time story** |  | — | [Vídeo ↗](https://prompt-motion.com/rebutonepress-810f78) |
| `PM-167` | **DistilBook product explainer** | Product UI | — | [Vídeo ↗](https://prompt-motion.com/sudo-kiran-4f8b59) |
| `PM-168` | **SaaS product launch video** | Product UI | 🔊 Sim | [Vídeo ↗](https://prompt-motion.com/xelandre-363f00) |
| `PM-174` | **Quetzal social app reel** | Product UI, Photos | — | [Vídeo ↗](https://prompt-motion.com/miskinho-443898) |
| `PM-201` | **ocrX app launch video** | Product UI | — | [Vídeo ↗](https://prompt-motion.com/mehul4795-4a7007) |
| `PM-212` | **GenVizu product launch** | Product UI, Photos | — | [Vídeo ↗](https://prompt-motion.com/listudio-820c7b) |
| `PM-217` | **Amazon wholesale pitch video** | Product UI, Kinetic type | — | [Vídeo ↗](https://prompt-motion.com/ceowinkz-7c776b) |
| `PM-218` | **Personal skills showreel** | Product UI, Particles, Characters | — | [Vídeo ↗](https://prompt-motion.com/ibrahimwasim240-809370) |
| `PM-220` | **CloudJoi search showcase** | Product UI, Photos | — | [Vídeo ↗](https://prompt-motion.com/lester-tyy-f897f7) |
| `PM-221` | **Brieform product presentation** | Product UI | — | [Vídeo ↗](https://prompt-motion.com/majorbaguette-fb11d7) |

### Kinetic Typography & Spoken Word (50 prompts)
| ID | Título | Tags Principais | Áudio/SFX | Link Demonstração |
|---|---|---|---|---|
| `PM-001` | **Claude motion designer showreel** | Kinetic type, Shapes, Music | — | [Vídeo ↗](https://prompt-motion.com/stephanlivera-df17a2) |
| `PM-003` | **Bold kinetic type showreel** | Kinetic type, Shapes, Particles | — | [Vídeo ↗](https://prompt-motion.com/shneural-2abdfa) |
| `PM-004` | **Abstract motion design reel** | Kinetic type, Shapes, Music | — | [Vídeo ↗](https://prompt-motion.com/ajith-io-b5626e) |
| `PM-029` | **Orange dot motion system** | Kinetic type, Shapes, Music | 🔊 Sim | [Vídeo ↗](https://prompt-motion.com/ultimaxbt-bbebf5) |
| `PM-034` | **Branding agency showreel** | Kinetic type, Photos | — | [Vídeo ↗](https://prompt-motion.com/jacksonfall-54b2ac) |
| `PM-045` | **Claude motion design reel** | Kinetic type, Shapes, Particles | — | [Vídeo ↗](https://prompt-motion.com/tequilafunks-97f6c9) |
| `PM-046` | **Claude motion design showreel** | Kinetic type, Shapes, Particles | — | [Vídeo ↗](https://prompt-motion.com/sudo-kiran-49176d) |
| `PM-050` | **Overthinking motion study** | Kinetic type | — | [Vídeo ↗](https://prompt-motion.com/gizakdag-cf4ae6) |
| `PM-056` | **Claude motion design showreel** | Kinetic type, Shapes, Particles | — | [Vídeo ↗](https://prompt-motion.com/ayushunleashed-ece3e3) |
| `PM-063` | **Motion designer showreel** | Kinetic type, Particles | — | [Vídeo ↗](https://prompt-motion.com/hanifproduktif-54bdee) |
| `PM-067` | **Particle sphere motion reel** | Kinetic type, Particles | — | [Vídeo ↗](https://prompt-motion.com/blue-clarity-ef56d0) |
| `PM-068` | **Easing and morphing showreel** | Kinetic type, Shapes, Music | — | [Vídeo ↗](https://prompt-motion.com/roundtablespace-d3a1be) |
| `PM-069` | **Claude self-intro motion graphic** | Kinetic type, Shapes | — | [Vídeo ↗](https://prompt-motion.com/1littlecoder-9fef89) |
| `PM-075` | **Poster breaking its frame** | Kinetic type, Shapes, Music | — | [Vídeo ↗](https://prompt-motion.com/pankajkumar-dev-0bee87) |
| `PM-080` | **Claude motion reel** | Kinetic type, Shapes | — | [Vídeo ↗](https://prompt-motion.com/codestackr-c071bf) |
| `PM-083` | **What day is it** | Kinetic type, Music | — | [Vídeo ↗](https://prompt-motion.com/tankazunori0914-0fc886) |
| `PM-087` | **ODATANO Cardano hype edit** | Kinetic type, Particles | — | [Vídeo ↗](https://prompt-motion.com/maxalexweber-67688b) |
| `PM-089` | **Motion design showreel** | Kinetic type, Shapes | — | [Vídeo ↗](https://prompt-motion.com/samuel-spitz-974923) |
| `PM-094` | **GravityDEX anime hype edit** | Kinetic type | — | [Vídeo ↗](https://prompt-motion.com/micheleharmonic-77628e) |
| `PM-097` | **Kinetic type showreel** | Kinetic type, Shapes | — | [Vídeo ↗](https://prompt-motion.com/zheke-38deff) |
| `PM-108` | **Speech built as architecture** | Kinetic type | 🔊 Sim | [Vídeo ↗](https://prompt-motion.com/gdgtify-287ddf) |
| `PM-110` | **fal motion design showreel** | Kinetic type, Photos | — | [Vídeo ↗](https://prompt-motion.com/influencer-seo-ce8c33) |
| `PM-115` | **Motion designer portrait showreel** | Kinetic type, Shapes, Particles | — | [Vídeo ↗](https://prompt-motion.com/ndhabarde11-f155b4) |
| `PM-116` | **Kinetic type motion showreel** | Kinetic type, Particles | — | [Vídeo ↗](https://prompt-motion.com/topi-003-9ca6b5) |
| `PM-117` | **Claude motion design showreel** | Kinetic type, Shapes | — | [Vídeo ↗](https://prompt-motion.com/rendesr-86be44) |
| `PM-133` | **Anime maid dance showreel** | Kinetic type, Characters, Music | — | [Vídeo ↗](https://prompt-motion.com/topi-003-b0e12c) |
| `PM-143` | **Type, form, space showreel** | Kinetic type, Shapes | — | [Vídeo ↗](https://prompt-motion.com/web3wesley-7bb108) |
| `PM-159` | **EyezOn 100 users thank-you** | Kinetic type, Shapes, Music | — | [Vídeo ↗](https://prompt-motion.com/sudiyasa-f48ac9) |
| `PM-163` | **Kinetic type and particle showreel** | Kinetic type, Particles, Music | — | [Vídeo ↗](https://prompt-motion.com/m1n9-k7-ff9ab9) |
| `PM-173` | **Swiss-style motion showreel** | Kinetic type, Shapes | — | [Vídeo ↗](https://prompt-motion.com/levabashidze-2d713a) |
| `PM-175` | **Motion designer showreel** | Kinetic type, Shapes, Particles | — | [Vídeo ↗](https://prompt-motion.com/zaqailo-212ad3) |
| `PM-176` | **Claude motion designer showreel** | Kinetic type, Particles | — | [Vídeo ↗](https://prompt-motion.com/crazyalphaaa-bc7e75) |
| `PM-177` | **Blue editorial motion showreel** | Kinetic type, Shapes, Music | — | [Vídeo ↗](https://prompt-motion.com/fionntobin-97b7af) |
| `PM-179` | **Kinetic type showreel** | Kinetic type, Shapes, Music | — | [Vídeo ↗](https://prompt-motion.com/itsuki-dev-10942d) |
| `PM-184` | **Motion design principles reel** | Kinetic type, Shapes, Particles | — | [Vídeo ↗](https://prompt-motion.com/tolgayhickiran-e90799) |
| `PM-193` | **Motion designer showreel** | Kinetic type, Shapes, Particles | — | [Vídeo ↗](https://prompt-motion.com/vanshwtfff-db0466) |
| `PM-197` | **Claude motion design reel** | Kinetic type, Shapes, Music | — | [Vídeo ↗](https://prompt-motion.com/ghinaiya-nirmal-5d8fec) |
| `PM-198` | **Code-only motion design reel** | Kinetic type, Shapes | — | [Vídeo ↗](https://prompt-motion.com/johnsavage-ai-b091c0) |
| `PM-199` | **Geometric motion designer showreel** | Kinetic type, Shapes | — | [Vídeo ↗](https://prompt-motion.com/leonkohli-6dc01b) |
| `PM-202` | **Motion design showreel** | Kinetic type, Shapes, Particles | — | [Vídeo ↗](https://prompt-motion.com/safarkhanshuvo-ffd52d) |
| `PM-203` | **3D motion design showreel** | Kinetic type, Shapes, Music | — | [Vídeo ↗](https://prompt-motion.com/sahildesigner23-ee3155) |
| `PM-208` | **Keyframe motion design reel** | Kinetic type, Particles, Music | — | [Vídeo ↗](https://prompt-motion.com/grace-sunnyy-29bc61) |
| `PM-210` | **Photon journey from the Sun** | Kinetic type, Particles | — | [Vídeo ↗](https://prompt-motion.com/apoorvjain25-d24184) |
| `PM-214` | **Motion designer showreel** | Kinetic type, Shapes, Music | — | [Vídeo ↗](https://prompt-motion.com/aichrislee-a6cb42) |
| `PM-215` | **Handwoven textiles brand explainer** | Kinetic type, Photos | — | [Vídeo ↗](https://prompt-motion.com/amitsingha89-150378) |
| `PM-222` | **What happens in one second** | Kinetic type, Particles | — | [Vídeo ↗](https://prompt-motion.com/nolkeeg-bf062e) |
| `PM-223` | **Kinetic type self-portrait** | Kinetic type | — | [Vídeo ↗](https://prompt-motion.com/souravbhar871-61f424) |
| `PM-224` | **Chain.wtf pitch video** | Kinetic type | — | [Vídeo ↗](https://prompt-motion.com/spearwtf-3c1fd1) |
| `PM-233` | **Synced lyrics motion video** | Kinetic type, Music | 🔊 Sim | [Vídeo ↗](https://prompt-motion.com/samaote-5e2fc2) |
| `PM-234` | **Kinetic shapes showreel** | Kinetic type, Shapes, Particles | — | [Vídeo ↗](https://prompt-motion.com/shinskinakamoto-20190b) |

### UGC, Anúncios & Performance Ads (61 prompts)
| ID | Título | Tags Principais | Áudio/SFX | Link Demonstração |
|---|---|---|---|---|
| `PM-005` | **Photo print app launch film** | Product UI, Phone, Photos | 🔊 Sim | [Vídeo ↗](https://prompt-motion.com/twoclipping-221cab) |
| `PM-008` | **Enxovaly baby app promo** | Product UI, Phone | — | [Vídeo ↗](https://prompt-motion.com/gabrielbuzziv-4ff0c6) |
| `PM-009` | **Engraving-style Claude ad** | Kinetic type, Photos | — | [Vídeo ↗](https://prompt-motion.com/lexnlin-038035) |
| `PM-011` | **Launch video remake comparison** | Product UI, Photos, Music | 🔊 Sim | [Vídeo ↗](https://prompt-motion.com/notdwd-c2037d) |
| `PM-012` | **Travel visa service promo** | Product UI, Kinetic type, Photos | — | [Vídeo ↗](https://prompt-motion.com/thismacapital-dfba20) |
| `PM-016` | **UGC ad generator promo** | Product UI, Phone, Photos | 🔊 Sim | [Vídeo ↗](https://prompt-motion.com/twoclipping-6dd14e) |
| `PM-017` | **ViralGrow product promo** | Product UI, Phone, Photos | — | [Vídeo ↗](https://prompt-motion.com/samuel-yostt-891f87) |
| `PM-020` | **Dub promo video** | Product UI, Charts | — | [Vídeo ↗](https://prompt-motion.com/steventey-0d20e4) |
| `PM-022` | **Shin Majin-shiki promo** | Kinetic type | — | [Vídeo ↗](https://prompt-motion.com/majin-appsheet-2d3c1a) |
| `PM-024` | **AjustaCV Pro pricing promo** | Product UI | — | [Vídeo ↗](https://prompt-motion.com/thayto-dev-44b911) |
| `PM-027` | **Lightspark social promo video** | Kinetic type, Code | 🔊 Sim | [Vídeo ↗](https://prompt-motion.com/davidmarcus-a28a60) |
| `PM-028` | **TechHalla kinetic type bumper** | Kinetic type | 🔊 Sim | [Vídeo ↗](https://prompt-motion.com/techhalla-90b8ec) |
| `PM-030` | **White ball UI motion loop** | Product UI, Music | 🔊 Sim | [Vídeo ↗](https://prompt-motion.com/rossaxbt-94583b) |
| `PM-033` | **Voice agent landing page** | Product UI, Music | 🔊 Sim | [Vídeo ↗](https://prompt-motion.com/pankajstwt-49978ed) |
| `PM-038` | **mdfor.dev product intro video** | Product UI, Code | 🔊 Sim | [Vídeo ↗](https://prompt-motion.com/ho-ba-f3f0e9) |
| `PM-043` | **Email tool promo reel** | Product UI, Kinetic type | — | [Vídeo ↗](https://prompt-motion.com/melvynx-6cde6c) |
| `PM-044` | **Ora 2 image model launch film** | Product UI, Photos, Music | 🔊 Sim | [Vídeo ↗](https://prompt-motion.com/rossaxbt-3085b7) |
| `PM-047` | **Motion techniques showreel** | Kinetic type, Shapes, Particles | — | [Vídeo ↗](https://prompt-motion.com/lukasersil-0ed38e) |
| `PM-053` | **Distilbook promo showreel** | Particles | 🔊 Sim | [Vídeo ↗](https://prompt-motion.com/ajith-io-4c248f) |
| `PM-058` | **Food craving launch film** | Product UI, Kinetic type, Photos | 🔊 Sim | [Vídeo ↗](https://prompt-motion.com/ultimaxbt-2ddf1e) |
| `PM-070` | **NotchBrowser product teaser** | Product UI, Kinetic type | 🔊 Sim | [Vídeo ↗](https://prompt-motion.com/jake11moran-f60e35) |
| `PM-073` | **Spotify product film** | Product UI, Music | 🔊 Sim | [Vídeo ↗](https://prompt-motion.com/brainextends-e19ac3) |
| `PM-084` | **Alan agent platform promo** | Product UI, Diagrams | — | [Vídeo ↗](https://prompt-motion.com/prasad-pilla-2c0cba) |
| `PM-088` | **AI Arena product promo** | Product UI, Code | — | [Vídeo ↗](https://prompt-motion.com/ezshine-c90d73) |
| `PM-092` | **Stock analysis app promo** | Product UI, Charts | — | [Vídeo ↗](https://prompt-motion.com/aistocksavvy-3fb9f5) |
| `PM-102` | **Mascot referral program promo** | Product UI, Characters | — | [Vídeo ↗](https://prompt-motion.com/paulo-kombucha-96431c) |
| `PM-112` | **Taxtello bookkeeping app film** | Product UI, Charts | 🔊 Sim | [Vídeo ↗](https://prompt-motion.com/daniel-haida-8691d4) |
| `PM-113` | **Badge unlock screen animation** | Product UI, Phone, Particles | — | [Vídeo ↗](https://prompt-motion.com/bthreeagency-b9b8d9) |
| `PM-119` | **Website analyzer product promo** | Product UI | — | [Vídeo ↗](https://prompt-motion.com/en-ra-81c6dd) |
| `PM-121` | **Second brain service promo** | Product UI, Code | — | [Vídeo ↗](https://prompt-motion.com/theviableedge-9065be) |
| `PM-122` | **AIsa API key promo** | Product UI | — | [Vídeo ↗](https://prompt-motion.com/0xfemyn-e114d3) |
| `PM-123` | **LiteLLM promo reel** | Diagrams, Music, Code | — | [Vídeo ↗](https://prompt-motion.com/misbahsy-80eaec) |
| `PM-124` | **Chunku product promo** | Product UI, Kinetic type | — | [Vídeo ↗](https://prompt-motion.com/reyzostyle-b55864) |
| `PM-135` | **Developer portfolio site showreel** | Product UI, Music | 🔊 Sim | [Vídeo ↗](https://prompt-motion.com/wani-shola-16ca7a) |
| `PM-140` | **Bold Pilot SEO promo** | Product UI, Charts, Kinetic type | — | [Vídeo ↗](https://prompt-motion.com/utopyaszx-1b2f94) |
| `PM-141` | **SaaS launch video** | Product UI, Music | 🔊 Sim | [Vídeo ↗](https://prompt-motion.com/aschapmann-131210) |
| `PM-142` | **Step race app promo** | Product UI | — | [Vídeo ↗](https://prompt-motion.com/marklaunches-3b9492) |
| `PM-144` | **Reflex brand motion reel** | Kinetic type, Music | 🔊 Sim | [Vídeo ↗](https://prompt-motion.com/reflex-cloud-72ffe5) |
| `PM-149` | **Muse connector tracker promo** | Product UI | — | [Vídeo ↗](https://prompt-motion.com/elliot-garreffa-f334bc) |
| `PM-150` | **Fitters Bible app promo** | Product UI, Phone, Diagrams | — | [Vídeo ↗](https://prompt-motion.com/adamdesgns-478d6d) |
| `PM-152` | **PicTwin AI app ad** | Product UI, Photos | — | [Vídeo ↗](https://prompt-motion.com/l3d1c-0e35a3) |
| `PM-156` | **YouTube transcript product ad** | Product UI, Kinetic type | — | [Vídeo ↗](https://prompt-motion.com/tstfully-0aa6b4) |
| `PM-164` | **QuickDesign brand promo** | Product UI, Kinetic type, Music | — | [Vídeo ↗](https://prompt-motion.com/quickdesignio-dd93d0) |
| `PM-166` | **Claude self-promo spot** | Product UI, Phone, Kinetic type | — | [Vídeo ↗](https://prompt-motion.com/slvdev-64c45a) |
| `PM-169` | **Tented image gen product video** | Product UI, Photos | — | [Vídeo ↗](https://prompt-motion.com/justincooperman-e7bbc4) |
| `PM-172` | **Matra caption app promo** | Product UI, Phone, Photos | — | [Vídeo ↗](https://prompt-motion.com/gautam-mer1-2ae354) |
| `PM-182` | **Cycle of life animation** | Characters | — | [Vídeo ↗](https://prompt-motion.com/loicrambo-ad6830) |
| `PM-183` | **Gene Spectra promo** | Product UI | — | [Vídeo ↗](https://prompt-motion.com/madebyjmayala-b9204d) |
| `PM-185` | **Prompt Motion site promo** | Product UI, Music | 🔊 Sim | [Vídeo ↗](https://prompt-motion.com/antonio-kodheli-490109) |
| `PM-186` | **Photo retouch app promo** | Product UI, Photos | — | [Vídeo ↗](https://prompt-motion.com/oliahmed205-3e31c4) |
| `PM-189` | **Email verification tool promo** | Product UI | — | [Vídeo ↗](https://prompt-motion.com/kmasiff-cc72cb) |
| `PM-191` | **AllInvestView product promo** | Product UI, Phone, Charts | — | [Vídeo ↗](https://prompt-motion.com/rammanq-f5a90f) |
| `PM-192` | **Nohandslabs brand promo** | Kinetic type, Particles, Code | — | [Vídeo ↗](https://prompt-motion.com/robvjourney-ce3e1a) |
| `PM-196` | **Lidlezz app promo** | Product UI | — | [Vídeo ↗](https://prompt-motion.com/cansincengiz-me-cf68dd) |
| `PM-205` | **Backlink audit data promo** | Charts, Kinetic type | 🔊 Sim | [Vídeo ↗](https://prompt-motion.com/palashbagchi11-0a4b6b) |
| `PM-226` | **FigPad product promo** | Product UI | — | [Vídeo ↗](https://prompt-motion.com/ai-baymax-0ef9dd) |
| `PM-227` | **Shop chatbot mascot promo** | Characters | — | [Vídeo ↗](https://prompt-motion.com/anas0ra-e57aea) |
| `PM-230` | **Lead Notifi product ad** | Diagrams, Kinetic type, Shapes | — | [Vídeo ↗](https://prompt-motion.com/leadnotifi-e83f94) |
| `PM-235` | **Scrabble tile character story** | Characters | — | [Vídeo ↗](https://prompt-motion.com/anilraok-eff262) |
| `PM-238` | **Datagran ChatGPT ads explainer** | Product UI, Phone, Charts | — | [Vídeo ↗](https://prompt-motion.com/charlesmendez-73b6e4) |
| `PM-239` | **Festival lineup promo reel** | Kinetic type | — | [Vídeo ↗](https://prompt-motion.com/gonzalomacagno-2de1a9) |

### 3D Camera, Fly-Over & Spatial (0 prompts)
| ID | Título | Tags Principais | Áudio/SFX | Link Demonstração |
|---|---|---|---|---|

### Mobile & App Experience (9 prompts)
| ID | Título | Tags Principais | Áudio/SFX | Link Demonstração |
|---|---|---|---|---|
| `PM-074` | **Hoplite cloud handoff launch** | Product UI, Phone, Kinetic type | — | [Vídeo ↗](https://prompt-motion.com/ryan-morr-ccc796) |
| `PM-098` | **Tennis game launch video** | Product UI, Phone | — | [Vídeo ↗](https://prompt-motion.com/deifosv-04e4d3) |
| `PM-145` | **Sotto reading app explainer** | Product UI, Phone | — | [Vídeo ↗](https://prompt-motion.com/1stnoel-c20a89) |
| `PM-148` | **Dubz Up motion showreel** | Product UI, Phone, Kinetic type | — | [Vídeo ↗](https://prompt-motion.com/devius-maximus-beab45) |
| `PM-157` | **Bento.surf product video** | Product UI, Phone | — | [Vídeo ↗](https://prompt-motion.com/bizibeast-10f264) |
| `PM-178` | **Parenting app hype video** | Product UI, Phone, Kinetic type | — | [Vídeo ↗](https://prompt-motion.com/francoxavier33-d2dfd2) |
| `PM-195` | **Commotion app showreel** | Product UI, Phone, Code | — | [Vídeo ↗](https://prompt-motion.com/amol909s-27533e) |
| `PM-213` | **sweetRegret app update reel** | Product UI, Phone, Characters | — | [Vídeo ↗](https://prompt-motion.com/thilina-a-891c09) |
| `PM-229` | **Design portfolio video reel** | Product UI, Phone | — | [Vídeo ↗](https://prompt-motion.com/kikelopezdesign-7cc9e8) |

### Charts, Data & Diagrams (48 prompts)
| ID | Título | Tags Principais | Áudio/SFX | Link Demonstração |
|---|---|---|---|---|
| `PM-002` | **Shape morphing through UI states** | Product UI, Charts, Music | 🔊 Sim | [Vídeo ↗](https://prompt-motion.com/twoclipping-5cba86) |
| `PM-007` | **Motion designer showreel** | Diagrams, Kinetic type, Particles | — | [Vídeo ↗](https://prompt-motion.com/himanshutwtxs-5f4b43) |
| `PM-010` | **Negroni recipe animation** | Diagrams | — | [Vídeo ↗](https://prompt-motion.com/ror-fly-9950f1) |
| `PM-021` | **Animated business explainer** | Diagrams | — | [Vídeo ↗](https://prompt-motion.com/alex-prompter-1ea044) |
| `PM-032` | **Derivative concept explainer** | Charts, Diagrams | — | [Vídeo ↗](https://prompt-motion.com/linearuncle-5d2bae) |
| `PM-035` | **History of AI timeline** | Diagrams, Kinetic type, Particles | — | [Vídeo ↗](https://prompt-motion.com/kloss-xyz-fe0c31) |
| `PM-036` | **Claude motion reel** | Charts, Kinetic type, Particles | — | [Vídeo ↗](https://prompt-motion.com/jasonzhou1993-8595e0) |
| `PM-041` | **MotionSites one million visitors** | Product UI, Charts, Code | — | [Vídeo ↗](https://prompt-motion.com/viktoroddy-98c1d8) |
| `PM-042` | **Drone Emprit showreel** | Charts, Particles | — | [Vídeo ↗](https://prompt-motion.com/ismailfahmi-557268) |
| `PM-057` | **Motion principles showreel** | Diagrams, Kinetic type, Particles | — | [Vídeo ↗](https://prompt-motion.com/chatgptastra-0d95c7) |
| `PM-061` | **Celld job ownership explainer** | Diagrams | — | [Vídeo ↗](https://prompt-motion.com/0xnfrith-5be616) |
| `PM-062` | **Mathematics motion showreel** | Charts, Diagrams | — | [Vídeo ↗](https://prompt-motion.com/math-files-39c9d0) |
| `PM-064` | **DeFi Saver stop-motion explainer** | Charts, Diagrams | — | [Vídeo ↗](https://prompt-motion.com/nikolajankovic-ce4ff4) |
| `PM-066` | **Motion designer showreel** | Charts, Kinetic type, Shapes | — | [Vídeo ↗](https://prompt-motion.com/eyishazyer-af035b) |
| `PM-071` | **AI data centre 3D tour** | Diagrams | — | [Vídeo ↗](https://prompt-motion.com/sayan-shanky-f850d8) |
| `PM-072` | **What is Git explainer** | Diagrams, Code | — | [Vídeo ↗](https://prompt-motion.com/yunn260414-60d996) |
| `PM-076` | **DistilBook motion explainer** | Product UI, Diagrams | — | [Vídeo ↗](https://prompt-motion.com/sudo-kiran-b055de) |
| `PM-082` | **founder.page launch video** | Product UI, Charts | — | [Vídeo ↗](https://prompt-motion.com/ratheejaisal-1f4538) |
| `PM-085` | **Sahi trading terminal reveal** | Product UI, Phone, Charts | — | [Vídeo ↗](https://prompt-motion.com/dale-vaz-cc612a) |
| `PM-086` | **White Russian recipe animation** | Diagrams | — | [Vídeo ↗](https://prompt-motion.com/sarut0bisasuke-cefa43) |
| `PM-090` | **Replica symmetry breaking whiteboard** | Diagrams | — | [Vídeo ↗](https://prompt-motion.com/tak3sh8-be5012) |
| `PM-093` | **Visual guides library launch** | Product UI, Diagrams, Code | — | [Vídeo ↗](https://prompt-motion.com/techyoutbe-945b56) |
| `PM-095` | **Whiteboard skill tutorial** | Product UI, Diagrams | — | [Vídeo ↗](https://prompt-motion.com/lemomo-ai-0d9cff) |
| `PM-096` | **Moroccan political history timeline** | Charts, Kinetic type | — | [Vídeo ↗](https://prompt-motion.com/triglyceee-bd5b08) |
| `PM-099` | **Flexprice motion showreel** | Charts, Particles | — | [Vídeo ↗](https://prompt-motion.com/sudeepsd-1a3485) |
| `PM-103` | **Steam new releases news recap** | Charts | — | [Vídeo ↗](https://prompt-motion.com/gigabit-million-16b3a0) |
| `PM-104` | **DistilBook product explainer** | Product UI, Diagrams | 🔊 Sim | [Vídeo ↗](https://prompt-motion.com/sudo-kiran-6609ed) |
| `PM-114` | **Prompting mistakes video tutorial** | Diagrams | — | [Vídeo ↗](https://prompt-motion.com/henkvaness-0e06af) |
| `PM-120` | **Ondefica app motion reel** | Product UI, Phone, Charts | — | [Vídeo ↗](https://prompt-motion.com/jesscaroline7-1ff7cb) |
| `PM-125` | **AI data centre 3D film** | Diagrams | — | [Vídeo ↗](https://prompt-motion.com/mdaman010-e7226a) |
| `PM-126` | **Bold typographic motion showreel** | Charts, Kinetic type, Shapes | — | [Vídeo ↗](https://prompt-motion.com/motiondsgnr-9dcfa6) |
| `PM-127` | **Studio1 intro showreel** | Charts, Kinetic type | — | [Vídeo ↗](https://prompt-motion.com/astrodevil-3f2054) |
| `PM-129` | **Ren app launch video** | Product UI, Phone, Charts | 🔊 Sim | [Vídeo ↗](https://prompt-motion.com/macrohou-33959d) |
| `PM-134` | **Paper-style product launch film** | Charts, Diagrams, Music | 🔊 Sim | [Vídeo ↗](https://prompt-motion.com/ik-builds-b8bdcf) |
| `PM-139` | **FundMyCompute platform overview** | Product UI, Diagrams | — | [Vídeo ↗](https://prompt-motion.com/jayscambler-3f8889) |
| `PM-154` | **Indian civilisation history film** | Diagrams | 🔊 Sim | [Vídeo ↗](https://prompt-motion.com/buildfastwithai-53234e) |
| `PM-171` | **Voice agent SaaS launch** | Product UI, Charts | — | [Vídeo ↗](https://prompt-motion.com/fractadev-149adc) |
| `PM-180` | **Motion designer showreel** | Product UI, Phone, Charts | — | [Vídeo ↗](https://prompt-motion.com/kangaroohere-b10f8d) |
| `PM-188` | **Motion designer showreel** | Product UI, Charts, Kinetic type | — | [Vídeo ↗](https://prompt-motion.com/danilowm-d3720d) |
| `PM-190` | **Pixel art LLM history** | Diagrams, Characters | — | [Vídeo ↗](https://prompt-motion.com/pluginplay-3d4006) |
| `PM-194` | **Claude motion designer showreel** | Charts, Kinetic type, Shapes | — | [Vídeo ↗](https://prompt-motion.com/3xtihor-0f6911) |
| `PM-200` | **Crux motion design showreel** | Product UI, Charts, Kinetic type | — | [Vídeo ↗](https://prompt-motion.com/marouanegazouzi-6071d5) |
| `PM-209` | **First & 10 yellow line explainer** | Diagrams | — | [Vídeo ↗](https://prompt-motion.com/blueoctopusai-dd17bd) |
| `PM-216` | **Recruiter self-intro reel** | Charts, Kinetic type, Particles | — | [Vídeo ↗](https://prompt-motion.com/blushpetal795-0c85c2) |
| `PM-225` | **Motion designer showreel** | Diagrams, Kinetic type, Shapes | — | [Vídeo ↗](https://prompt-motion.com/teslachartz-c58b32) |
| `PM-231` | **Risograph studio intro** | Diagrams, Kinetic type | — | [Vídeo ↗](https://prompt-motion.com/rneayan-474bcf) |
| `PM-232` | **Oscilloscope-style studio motion graphic** | Charts, Kinetic type | — | [Vídeo ↗](https://prompt-motion.com/rneayan-ea6129) |
| `PM-237` | **Token bucket rate limiter** | Charts, Diagrams | — | [Vídeo ↗](https://prompt-motion.com/parkerrex-1a54fe) |

### Abstract, Particles & Shapes (24 prompts)
| ID | Título | Tags Principais | Áudio/SFX | Link Demonstração |
|---|---|---|---|---|
| `PM-023` | **TypingMind logo reveal** | Shapes | — | [Vídeo ↗](https://prompt-motion.com/tdinh-me-815acb) |
| `PM-025` | **Talking-head clip edit** | Photos | 🔊 Sim | [Vídeo ↗](https://prompt-motion.com/sab8a-364a5a) |
| `PM-049` | **Pelican riding a bicycle** | Characters | — | [Vídeo ↗](https://prompt-motion.com/axtonliu-0b861d) |
| `PM-051` | **Starry Night cat-spotting game** | Characters | — | [Vídeo ↗](https://prompt-motion.com/mandelduck-95fd08) |
| `PM-055` | **Distilbook motion showreel** | Shapes, Particles | — | [Vídeo ↗](https://prompt-motion.com/ajith-io-ea7f2d) |
| `PM-059` | **Psychedelic hypnotic eye showreel** | Shapes | — | [Vídeo ↗](https://prompt-motion.com/monokern-ade5b6) |
| `PM-077` | **Motion designer résumé reel** | Shapes, Particles | — | [Vídeo ↗](https://prompt-motion.com/raphaelaubryy-4b137e) |
| `PM-091` | **Full Stop figure sequence** | Shapes, Particles | — | [Vídeo ↗](https://prompt-motion.com/hbcoop-de365c) |
| `PM-128` | **Chuseok pixel night scene** | Characters | — | [Vídeo ↗](https://prompt-motion.com/hoyoyoda-3a5c08) |
| `PM-136` | **Flowdrive motion showreel** | Shapes, Particles | — | [Vídeo ↗](https://prompt-motion.com/manuelogomigo-f33ca9) |
| `PM-137` | **Pixel wizard crypto animation** | Characters | — | [Vídeo ↗](https://prompt-motion.com/0xevinho-3777d8) |
| `PM-138` | **Fiery samurai kata** | Particles, Characters | — | [Vídeo ↗](https://prompt-motion.com/chrisjdimarco-f068db) |
| `PM-146` | **Animated space cartoon episode** | Characters | — | [Vídeo ↗](https://prompt-motion.com/ryzoft-4f85bd) |
| `PM-155` | **Anime robot combining sequence** | Characters | — | [Vídeo ↗](https://prompt-motion.com/allforbigfire-86ff3c) |
| `PM-160` | **Clay-style music video** | Characters, Music | 🔊 Sim | [Vídeo ↗](https://prompt-motion.com/davidshulmanfl-371638) |
| `PM-162` | **The Last Light animated short** | Characters | — | [Vídeo ↗](https://prompt-motion.com/faroukzy-9ff23e) |
| `PM-170` | **Deliberately terrible motion showreel** | Characters | — | [Vídeo ↗](https://prompt-motion.com/henkpoley-3d3407) |
| `PM-187` | **Pixel art card battle game** | Characters | — | [Vídeo ↗](https://prompt-motion.com/aisongman-71ffac) |
| `PM-204` | **Sketchbook animals come alive** | Characters | 🔊 Sim | [Vídeo ↗](https://prompt-motion.com/abderrahmen-g-9e8ed0) |
| `PM-206` | **Shadow theatre home story** | Characters | 🔊 Sim | [Vídeo ↗](https://prompt-motion.com/x4b47x-9cc84f) |
| `PM-207` | **Collision-driven music machine** | Particles, Music | 🔊 Sim | [Vídeo ↗](https://prompt-motion.com/kamstudiolabs-447565) |
| `PM-211` | **Recipe brand 20th anniversary** | Particles | — | [Vídeo ↗](https://prompt-motion.com/deebeeeff-50fcd0) |
| `PM-236` | **Ball escaping twelve rings** | Shapes, Music | — | [Vídeo ↗](https://prompt-motion.com/kantamk-61f410) |
| `PM-240` | **Lighthouse keeper silent short** | Characters | 🔊 Sim | [Vídeo ↗](https://prompt-motion.com/kamstudiolabs-0b0824) |

### Code & Terminal UI (10 prompts)
| ID | Título | Tags Principais | Áudio/SFX | Link Demonstração |
|---|---|---|---|---|
| `PM-018` | **Recursion explained in genres** | Characters, Code | — | [Vídeo ↗](https://prompt-motion.com/emollick-8661a8) |
| `PM-060` | **Chaotic Claude POV video** | Kinetic type, Code | 🔊 Sim | [Vídeo ↗](https://prompt-motion.com/kloss-xyz-15182a) |
| `PM-065` | **Lism CSS 1.0 release video** | Product UI, Code | — | [Vídeo ↗](https://prompt-motion.com/ddryo-loos-300829) |
| `PM-081` | **Browser automation skill launch** | Product UI, Music, Code | — | [Vídeo ↗](https://prompt-motion.com/hqmank-7c61f1) |
| `PM-130` | **Personal research intro reel** | Kinetic type, Particles, Code | — | [Vídeo ↗](https://prompt-motion.com/madhav-xo-f97f20) |
| `PM-132` | **UK dubstep track with ASCII visuals** | Music, Code | 🔊 Sim | [Vídeo ↗](https://prompt-motion.com/rames-jusso-589f80) |
| `PM-147` | **Animated short about a bug** | Characters, Code | — | [Vídeo ↗](https://prompt-motion.com/kamstudiolabs-c9bb28) |
| `PM-181` | **org2html product showreel** | Product UI, Code | — | [Vídeo ↗](https://prompt-motion.com/kyonax-on-tech-aabc1d) |
| `PM-219` | **AgentHud project motion video** | Product UI, Code | — | [Vídeo ↗](https://prompt-motion.com/jazzen-chen-4542ae) |
| `PM-228` | **Database client launch video** | Product UI, Code | — | [Vídeo ↗](https://prompt-motion.com/iammxfschr-d68f90) |

### Skills & Automação (5 prompts)
| ID | Título | Tags Principais | Áudio/SFX | Link Demonstração |
|---|---|---|---|---|
| `PM-013` | **TasteSkill dashboard showcase** | Product UI, Charts | — | [Vídeo ↗](https://prompt-motion.com/lexnlin-f9b3bd8) |
| `PM-014` | **HTML app demo skill** | Product UI | — | [Vídeo ↗](https://prompt-motion.com/mengto-a7f4679) |
| `PM-019` | **Cinetic skill launch film** | Product UI, Code | — | [Vídeo ↗](https://prompt-motion.com/lexnlin-6161a6) |
| `PM-026` | **Reddit marketing tool launch video** | Product UI, Characters | — | [Vídeo ↗](https://prompt-motion.com/anthonyriera-9b1b2a) |
| `PM-078` | **Animated agent session story** | Characters | — | [Vídeo ↗](https://prompt-motion.com/jake11moran-a269c4) |
