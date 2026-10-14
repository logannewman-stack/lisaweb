# Design option C: A string of pearls

## Concept
A modern boutique: airy, minimal and precise. A crisp 12-column grid, generous
white space and fine gold lines. Gold leads; Lisa's seven colours appear only
as small, exact pearls strung on fine gold strands, the way the pearls run
through her logo.

## Palette
- Grounds: Warm Ivory, alternating with Soft Cream. Nothing else.
- Text: Deep Plum for headings and links, Charcoal for body. Notes use
  Charcoal at 80% (`--charcoal-soft`, 6.4:1 on ivory).
- Champagne Gold carries every strand, hairline, outline and the large opening
  quote mark, plus the Shop my oils button (charcoal text, 6.4:1).
- Colour flows in the order of the lotus, as in COPY.md: blush, lavender,
  blue, teal, sage, peach, gold. Each section mark, card or row carries one
  pearl or one thin line of colour, never both, never a painted section.
- All tokens, with her names and HEX codes, are in `css/theme.css`.

## Type
- Josefin Sans 300 for headings (plum, sentence case), 400 for card titles.
- Lora italic for quotes and small accents: the counter's "of", the "to" in
  2017 to 2026, the footer tagline.
- DM Sans for body, labels and buttons.

## Signature elements
- **Strand** (`.strand` with `.pearl` children): a fine gold line with seven
  pearls. Hero foot, footer top, phone menu, About hero, quote divider.
- **Scroll guide** (home, `.guide`): from 1200px a vertical strand in the
  left margin; each pearl links to one of the seven sections and the pearl in
  view is ringed in gold and glows. Below 1200px a decorative row of seven
  pearls (`.progress`) sits on the header's bottom edge and lights up as you
  scroll.
- **Section mark** (`.mark`): a short gold line ending in one pearl above
  every section heading.
- **Capsules** (`.capsule`): portraits in tall, fully rounded capsules with a
  thin gold outline offset up and to the right.
- Strand language elsewhere: the draped necklace (home closing), two strands
  meeting at one pearl (story closing), the 2017 to 2026 line (story hero), the
  session steps, the timeline, the breathing pearl inside gold rings, the
  line-drawn oil bottles with a pearl on each label.

## Motion
- One entrance on the home hero, about 1.8s: logo, intro and buttons rise,
  the portrait unveils, its outline slides into place, then the strand draws
  and its pearls appear in turn.
- Ambient: the hero outline drifts a few pixels over 16s; the current guide
  pearl's halo breathes. Quotes cross-fade. Nothing waits for a scroll
  observer; all content is visible at rest.
- Transform and opacity only. `prefers-reduced-motion` switches every
  animation and transition off (the breathing pearl stays still and the cue
  and countdown carry the rhythm).

## When editing
- Change colours only in `css/theme.css`; pearls take their colour from the
  `.pearl--blush` to `.pearl--gold` classes.
- Never set text in a pastel or in gold on ivory or cream.
- Keep hairlines on whole pixels; a 1px line at a half-pixel offset renders
  grey instead of gold.
- Keep every [bracketed placeholder] visible until Lisa sends the words.
- The twelve quotes all live in the HTML list; the script only stacks them.
  Add or remove `<li class="quote">` items freely.
- Capsule sizes use container query units; keep `container-type` on the
  portrait's column.
- The header and footer are repeated on every page: edit all four.
