# Option B: Watercolour bloom

## Concept
A watercolour journal. The site borrows the language of Lisa's logo, with its
painted petals, gold swashes and strand of pearls, and lets it run softly through
every page. The compositions are asymmetric and the washes feel wet and organic.
Gold appears only as fine lines. Ivory and cream do most of the work, so the
colour stays gentle, never loud.

## Palette in use
All colours are tokens in `css/theme.css`, under her names and HEX codes.
- **Grounds:** Warm Ivory for most sections, Soft Cream for every other band.
  Gentle SVG waves join them (`.section--cream` adds them automatically).
- **Text:** Deep Plum for headings, links and button labels; Charcoal for body
  text; `--ink-soft` (#5E5566, 6.4:1 on cream) for small notes. Nothing else
  carries text.
- **Leading washes:** blush and peach, with lavender. Blue, teal and sage only
  as small touches inside a bloom, never a whole area.
- **Gold:** strands, flourishes, pearl rims, icons and hairlines. Never text.
- **Buttons:** `.btn--bloom` is a blush-to-peach fill with plum text (5.1:1 at
  its darkest point). `.btn--quiet` is ivory with a gold hairline.
- Measured on the rendered pages, the lowest contrast of any text against the
  wash behind it is 5.15:1.

## Type
- **Marcellus** (headings, quotes, names): Roman inscription letters that echo
  the logo. Always plum and sentence case.
- **Nunito Sans** (body, UI): body text 17 to 19 px, bold for buttons and labels.
- **Pinyon Script**: only three moments. "Hello," on About, "with love, Lisa"
  closing My background, and the same sign-off in the footer. Do not add more.

## Signature elements
- **Blooms** (`.bloom`): soft, feathered layered radial gradients, blurred.
  Each one sets its own colours with `--b1`..`--b4` (RGB tokens such as
  `var(--blush-rgb)`), positions (`--p1`..), sizes (`--s1`..) and strength
  (`--o1`..). They sit behind content at `z-index: -1`.
- **Painted washes** (`#s-wash-a/b/c`, `#s-wash-crown`): SVG shapes run through
  the `#f-wash` filter, which adds a pigment rim, a soft bleed and paper grain.
  Colour comes from `class="c-blush"` and similar classes. The `#m-fade-*` masks fade one side
  of a wash away, as in wet-in-wet painting.
- **Drops** (`#s-drop`): small watercolour drops for the seven colours, the
  oils and the story emblems.
- **Gold strands:** SVG paths with `url(#g-gold…)` strokes and
  `vector-effect: non-scaling-stroke`. They curve around the portraits and
  across section edges. On Our Story, `js/site.js` draws the strand through the
  pearls from their real positions and redraws it on resize. On phones, and
  with JavaScript off, a straight CSS strand is used instead.
- **Petal portraits:** `clip-path: url(#clip-petal)`, a lotus petal, with a
  thin gold outline. The image is positioned with `--img-w`, `--img-x` and
  `--img-y` to frame her face.
- **Pearls** (`.pearl`): timeline nodes, list markers and dividers between
  the vision-board words.
- **Paper grain:** a fixed SVG noise layer at 7.5% opacity (`body::after`).

The shared SVG kit (gradients, filters, masks, symbols) sits at the top of
`<body>` on every page. Keep the four copies identical.

## Motion
- One entrance on the home hero: the logo rises, the portrait blooms in, the
  wash spreads and the gold strand settles. All within about 2 seconds.
- Ambient: `.drift` blooms move very slowly (50 to 70 s cycles). The seven
  drops bob a few pixels.
- The breathing bloom scales with the breath, timed by `--phase-dur`.
- Only `transform` and `opacity` are animated. `prefers-reduced-motion`
  switches all of it off. Under reduced motion the breathing bloom stays still
  and the countdown and cue carry the rhythm.
- Nothing waits at `opacity: 0` for a scroll observer.

## Things to avoid when editing
- Pastel or gold text, or any text placed over the dense middle of a wash.
  Check contrast after moving a bloom.
- Giving each section its own colour. Every bloom mixes two or three colours.
- Stretching, recolouring or cropping the logo, or placing it on a wash.
- More script type, uppercase labels or letter-spaced eyebrows.
- New fonts or libraries. No build step is needed or wanted.
- Images from `assets/source`. They are never deployed.
- Anything about an app or a questionnaire. That is a separate project.
