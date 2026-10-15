# Option A: Classic grace

## Concept
Timeless, centred and symmetrical, like a beautifully set invitation in a calm
spa. Warm ivory and soft cream grounds with a faint paper grain, deep plum
headings, charcoal text. Lavender leads the accents, with blush and champagne
gold; the other petal colours appear only in small, deliberate places: the
lotus petals, the coloured pearls, the oil labels and the faintest traces of
the halo. The boldness is spent on two moments, the home hero and the lotus
illustration; everything else is refined and quiet.

## Palette usage
All colours are custom properties in `css/theme.css`, under Lisa's own names
and HEX codes, plus RGB-channel versions for soft washes.

- **Grounds:** Warm Ivory for the page, Soft Cream for alternate bands, the
  invitation cards and the footer. Cream carries `--grain-paper`, a very fine
  paper grain. Never a pastel ground.
- **Text:** Deep Plum for headings, links, buttons, quotes and anything set on
  a wash; Charcoal for body text. `--plum-muted` (#6A6370) is only for small
  secondary text on plain ivory or cream.
- **Lavender and blush:** the halos, the washes behind "Words I keep close",
  "What I believe" and "A minute for you", the arch-card crowns, the breathing
  orb, hover washes, the rim light on every pearl.
- **Champagne gold:** always as a material, never as text. The gold foil
  (`--gold-foil`, a gradient from #B8933F through #E9D6A0, #C9A24B and #F0E2B8)
  draws the frames, hairlines, strand lines, the shelf, the step numerals and
  the large quote marks. The Shop my oils button is foil with charcoal text
  (4.2:1 at its darkest stop).
- **Blue, teal, sage, peach:** the lotus petals, the coloured pearls, the oil
  labels, the icons' single accents and traces in the halo.

## Type
- Cormorant Garamond 500/600 for headings; italic for intros, quotes and
  accents. Large sizes are tracked slightly tighter (-0.015em).
- Jost 300/400/500 for body and interface.
- Fluid scale in `theme.css`: body `--step-0` 17 to 18px, section headings
  `--step-4` = clamp(2.6rem, 4.6vw, 3.9rem), closings `--step-5`, page titles
  `--step-6` (up to 7rem). The home intro is its own clamp (up to 2.7rem).
- Sentence case, no tracked capitals, `text-wrap: balance` on headings and
  `text-wrap: pretty` on paragraphs; the prose measure is 36rem (about 64
  characters).

## Materials
- **Pearls:** one reusable SVG symbol (`#pearl`, plus `#pearl-blush`,
  `#pearl-lavender`, `#pearl-blue`, `#pearl-teal`, `#pearl-sage`,
  `#pearl-peach`, `#pearl-gold`) with a radial highlight top-left, a rim light
  bottom-right in a palette hue and a faint contact shadow. CSS pearls (the nav
  marker, separators, the timeline nodes) use `--pearl` and `--pearl-sheen` for
  the same shading.
- **Strands:** `#strand` (the divider, pearls of three sizes, a gold foil
  line), `#strand-colours` (seven coloured pearls at its centre),
  `#strand-mini` (under every section heading), `#strand-hero` (the slim strand
  under the home intro).
- **Frames:** the invitation card (`.invite`) is a cream panel inset with a
  gold foil hairline, an inner hairline in `--gold-light` and a pearl at the
  top centre; `.invite--ivory` is the ivory version for cream bands. The arch
  frames (`.arch-frame`) and arch cards (`.arch-card`) use the same double
  hairline with a pearl at the crown. Gradient borders are drawn with a masked
  pseudo-element, so they need no extra markup.
- **Icons:** bespoke fine-line icons (`#ic-bowl`, `#ic-one`, `#ic-smudge`,
  `#ic-strands`, `#ic-pearls`, `#ic-lotus`, `#ic-seven`, `#ic-arrive`,
  `#ic-talk`, `#ic-cleanse`, `#ic-sound`, `#ic-rest`), plum lines with one gold
  accent each, 56 to 60px.
- **Bottles:** one `#bottle` symbol, plum glass with a gold foil cap and a
  pastel label set by the `--label` custom property on each `<use>`.

## Signature pieces
- **Home hero:** the full logo inside a watercolour halo (lavender, blush,
  peach, traces of blue and teal, a warm glow behind the logo, paper grain),
  the intro, a slim strand of pearls and the two buttons.
- **Welcome:** a two-column spread on the first cream band, the portrait in
  its arch beside the welcome text. The band edge never crosses the photo.
- **The lotus:** a drawn illustration in the spirit of the logo. Seven
  overlapping petals (outer ones curl outward) with four-stop watercolour
  gradients, white fibres, a gold vein, a lighter highlight edge inside a gold
  foil edge, a paper-displacement filter and grain, an inner glow at the heart,
  a soft shadow and a strand of pearls across the base. It sits at about 35rem
  on desktop with the seven names placed around it: Blush Pink above the
  centre petal, the left petals' names on the left, the right petals' names on
  the right. Hovering a name lifts its petal.
- **Shelf of oils:** five bottles on a gold foil board with a soft shadow. On
  the home page it is an illustration beside the text; on Work With Me the
  bottles carry their names and notes, and on narrow phones they become a list.
- **Framed moments (two per page):** Kind words and the closing (home), At a
  glance and the closing quote (About), What the name means and the closing
  (Our Story), A minute for you and the booking form (Work With Me).
- **Session steps:** a gold foil numeral and a fine-line icon above each step.
- **Header:** one calm row that fixes itself as a slimmer bar with a gold
  hairline once the page scrolls; the current page is marked with a pearl.
- **Footer:** cream, a foil hairline above, the full logo, a strand, three
  columns on desktop (pages, contact, shop), a hairline and the tagline in
  italic.

## Motion
- One orchestrated entrance on the home hero, about 1.2 seconds: the logo
  settles from 0.985 scale and fades in, then the intro, the strand, the
  buttons and the portrait rise ten pixels in turn.
- Ambient: the halo washes breathe over 16 to 25 seconds; the breathing orb
  glows slowly at rest.
- Small touches: buttons and cards lift slightly, links draw a plum line over
  their gold one, a colour name lifts its petal, the fixed bar slides in.
- Transform and opacity only. `prefers-reduced-motion` turns all of it off; the
  breathing countdown still works, with the circle held still.

## Behaviour (`js/site.js`)
Header condensing, the phone menu (focus kept inside, Escape and link clicks
close it), one quote at a time with Next quote, kind words with previous and
next, pearls between the vision-board words, the 4-7-8 breathing exercise, and
the booking form guard with the `?session=` preselect. Without JavaScript every
quote and kind word is listed and the nav links sit under the logo.

## Things to avoid when editing
- The header, footer and SVG sprite are repeated in all four pages: change all
  four together. The lotus illustration lives only in `index.html`.
- Never set text in a pastel or in gold. Gold foil is for frames, lines,
  pearls, the shelf, numerals and the quote marks only; text on a gold fill is
  charcoal.
- Keep the band rhythm: ivory and cream alternate, with a framed card where two
  of the same colour would otherwise meet.
- Don't give sections their own petal colour, and don't add more washes: the
  colours should flow, not stripe.
- Don't add fade-in-on-scroll effects; content must be visible at rest.
- Never stretch, recolour or crop the logo, or set it on a dark or busy ground.
  The home masthead hides its small logo until the big one has scrolled away.
- The home portrait crop lives in `.arch--hero img` (a 740 x 1028 px window of
  `lisa-hero.jpg` starting at 640, 307). Recalculate it if the photo changes.
- The timeline supports up to ten entries; add a `grid-row-start` rule for more.
- The lotus puts blush at the centre, like the logo; the list beneath keeps
  the copy's order in the markup, and only the desktop grid places the names
  around the petals.
- Decorative washes that extend past their box sit inside a section with
  `overflow: hidden`, so nothing can scroll sideways on a phone.
- To switch the booking form on, replace `your-form-id` in the form's `action`;
  the guard turns itself off.
