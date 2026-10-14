# Option A: Classic grace

## Concept
Timeless, centred and symmetrical, like a beautifully set invitation in a calm
spa. Generous margins and quiet confidence: warm ivory and soft cream grounds,
deep plum headings, charcoal text. Lavender leads the accents, with blush and
champagne gold; the other petal colours appear only in small, deliberate places.

## Palette usage
All colours are custom properties in `css/theme.css`, under Lisa's own names
and HEX codes, plus RGB-channel versions for soft washes.

- **Grounds:** Warm Ivory for the page, Soft Cream for alternate sections,
  cards, the booking card and the footer. Never a pastel ground.
- **Text:** Deep Plum for headings, links, buttons, quotes and anything set on
  a wash; Charcoal for body text. `--plum-muted` (#6A6370) is only for small
  secondary text on plain ivory or cream.
- **Lavender and blush:** the hero halo, section washes, arch-card crowns, the
  breathing circle, hover washes.
- **Champagne gold:** hairlines, frames, pearls, the shelf line, the large
  decorative quote mark, and the Shop my oils button (charcoal text on gold).
- **Blue, teal, sage, peach:** only in petals, pearls, small motifs, oil labels
  and the faintest touches of the halo.

## Type
- Cormorant Garamond 500/600 for headings; italic for intros, quotes and
  accents. Its old-style numerals give the years their classic shape.
- Jost 300/400/500 for body and interface.
- Fluid scale `--step-0` to `--step-6` in `theme.css`. Sentence case, no tracked
  capitals, `text-wrap: balance` on headings, body measure under 70 characters.

## Signature elements
- **Strand of pearls:** inline SVG symbols in the sprite at the top of each
  page: `#strand` (divider between major sections), `#strand-mini` (under every
  section heading) and `#strand-colours` (seven pearls in her colours).
- **Arches:** `.arch-frame` puts a thin gold double hairline and a crown pearl
  around both portraits; `.arch-card` gives cards an arched top, a gold border
  and an inner hairline.
- **Watercolour halo:** `.halo` holds four soft washes (lavender, blush, peach,
  a trace of blue) behind the home logo and the page heroes. A very fine paper
  grain (`--grain`) keeps the washes smooth.
- **Inline SVG drawings:** the seven-petal lotus fan (home), the four meaning
  icons (Our Story), the three offering motifs, and the five oil bottles.

## Motion
- One orchestrated entrance on the home hero: halo, logo, intro, buttons, then
  the portrait, all within about two seconds. Nothing waits for scrolling.
- Ambient: the halo washes breathe over 16 to 23 seconds; the breathing circle
  glows slowly at rest.
- Small touches: buttons and cards lift slightly, links draw a plum line over
  their gold one, petals lift when you hover a colour name, the desktop
  masthead condenses into a slim bar that slides in.
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
  four together.
- Never set text in a pastel or in gold; gold text is only the decorative quote
  mark. Keep plum for any text that sits on a wash.
- Don't give sections their own petal colour, and don't add more washes: the
  colours should flow, not stripe.
- Don't add fade-in-on-scroll effects; content must be visible at rest.
- Never stretch, recolour or crop the logo, or set it on a dark or busy ground.
  The home masthead hides its small logo until the big one has scrolled away.
- The home portrait crop lives in `.arch--hero img` (a 740 x 1028 px window of
  `lisa-hero.jpg` starting at 640, 307). Recalculate it if the photo changes.
- The timeline supports up to ten entries; add a `grid-row-start` rule for more.
- The lotus fan puts blush at the centre, like the logo; the list beneath keeps
  the copy's order, "from love and compassion to grace and light".
- To switch the booking form on, replace `your-form-id` in the form's `action`;
  the guard turns itself off.
