# Design option C: A string of pearls

## Concept
A modern boutique: airy, minimal and precise. A crisp 12-column grid, generous
white space and fine gold lines that catch the light. Gold leads; Lisa's seven
colours appear only as pearls strung on gold strands, the way the pearls run
through her logo. The pearls are real pearls now, with a highlight, a rim
light, a touch of iridescence and a contact shadow, and they are the one place
the design spends its boldness. Everything else stays quiet and exact.

## Palette
- Grounds: Warm Ivory, alternating with Soft Cream. Cream also makes the panels
  behind the three ways to work together, the kind words and the training
  table. Nothing else.
- Text: Deep Plum for headings and links, Charcoal for body. Notes use
  Charcoal at 80% (`--charcoal-soft`, 6.4:1 on ivory).
- Champagne Gold carries every strand, hairline, rule, outline and the large
  opening quote mark, plus the Shop my oils button (charcoal text, 6.4:1).
  Lighter passages along a strand are the same gold at lower opacity, never
  a new colour.
- Colour flows in the order of the lotus, as in COPY.md: blush, lavender,
  blue, teal, sage, peach, gold. Each section mark, column, cell or row
  carries one pearl; no section is painted a colour.
- All tokens, with her names and HEX codes, are in `css/theme.css`. The HEX
  codes are no longer printed on the page: each colour tile keeps its code in
  a `title` attribute instead.

## Type
- Italiana for every heading, title, numeral and year (plum, sentence case,
  slightly tightened tracking). Section headings sit at 42 to 61px, page
  headings at 52 to 88px, the session numerals at up to 76px. Italiana draws
  a hairline hyphen and bar-like square brackets, so inside display text those
  two glyphs borrow Lora through `.hy` and `.ph` spans; the words themselves
  are untouched.
- Lora italic for quotes and small accents: the counter's "of", the "to" in
  2017 to 2026, the footer tagline.
- DM Sans for body (17 to 18px, 64-character measure), labels and buttons.
- Headings use `text-wrap: balance`, paragraphs `text-wrap: pretty`.

## Signature elements
- **Pearl** (`.pearl`): an inline SVG that `<use>`s the `#pearl` symbol. The
  symbol and its gradients live in the hidden sprite at the top of every page
  and are colour-independent; the hue arrives as `currentColor` from `--c`,
  which the `.pearl--blush` to `.pearl--gold` (and `.pearl--pearl`) classes
  set. Sizes run from 10px in a strand to 78px on the colour tiles and about
  200px for the breathing pearl, all from the one symbol. `--s` sets the size.
- **Strand** (`.strand`): a fine gold line with lighter passages along it,
  seven pearls spaced evenly. Under the home emblem, footer top, phone menu,
  About and Work With Me heroes, the quote divider.
- **Light sweep** (`.strand__light`): once, on load, a short gold-and-white
  light travels the home strand from left to right and each pearl glints as
  it passes, then everything rests. Off under reduced motion.
- **Lotus illustration** (`.lotus`): a fine-line lotus drawn in SVG, plum
  petals with a gold inner petal and a gold strand of seven pearls on gold
  swashes. One per page, where the eye used to fall on nothing: beneath the
  Welcome text, in the margin beside My background, beside the breathing
  exercise, and (petals only) above the Story strand, which runs through its
  base exactly as the pearls cross the logo. The petals are filled with the
  ground colour (`--lotus-fill`) so the tiers overlap cleanly.
- **Scroll guide** (home, `.guide`): from 1200px a vertical strand in the
  left margin; the pearl in view is ringed in gold with a breathing halo, and
  on hover its label runs down the margin in small capitals so it never
  covers the page. Below 1200px a row of seven pearls (`.progress`) on the
  header's bottom edge lights up as you scroll.
- **Section mark** (`.mark`): a short gold line ending in one pearl above
  every section heading.
- **Capsules** (`.capsule`): portraits in tall, fully rounded capsules with a
  gold hairline inset inside the photograph, a thin gold outline offset up
  and to the right, and a soft plum-tinted shadow. On the home page the
  portrait sits beside the Welcome text, not in the hero: the hero belongs to
  the emblem.
- **Header**: a slim bar whose bottom hairline turns gold once the page has
  scrolled (`.is-scrolled`, set by the script); the current page is marked by
  a small gold pearl beneath its link.
- **Composed sections**: the three ways to work together on a cream panel
  with a gold top rule, a pearl on the rule at the head of each column and a
  bespoke fine-line icon (singing bowl, seated figure, sage bundle); kind
  words on a cream band inside a double gold hairline frame; the five session
  steps as large numerals strung on a strand with pearl nodes; at a glance as
  a double-framed two-by-two grid with a pearl in each cell; training as a
  hairline table on a cream band with a pearl per row; the colour tiles with
  a gold top rule, a large luminous pearl that glows on hover, and the lotus
  on a soft cream square in the eighth cell.
- Strand language elsewhere: the draped necklace (home closing), two strands
  meeting at one pearl (story closing), the 2017 to 2026 line drawn as two
  draped strands (story hero), the timeline, the breathing pearl inside gold
  rings, the line-drawn oil bottles with a pearl on each label.

## Motion
- The home hero is the emblem: the full logo, large and centred on the ivory,
  with the strand of seven pearls as its underline and the intro and buttons
  beneath. One entrance, about 1.3s, then the light: the logo settles from
  0.985 scale and fades in, the strand draws beneath it and its pearls appear
  in turn, the intro rises 10px, then the buttons; from 1s the light sweeps
  the strand and rests by about 2s.
- Ambient: the Welcome portrait's outline drifts a few pixels over 16s; the current guide
  pearl's halo breathes. Quotes cross-fade and the quote stage eases its
  height to the quote on show, so a short quote is not left in a tall empty
  box. Nothing waits for a scroll observer; all content is visible at rest.
- Transform, opacity and a little light only. `prefers-reduced-motion`
  switches every animation and transition off: the hero shows complete, the
  light never appears, the quote stage resizes at once and the breathing
  pearl stays still (the cue and countdown carry the rhythm).

## UX and flow (October 2026)
The visitor journey is the same on every option; here it is strung in pearls.
- **Page order and hand-offs**: the home page runs hero, welcome, ways to work
  together, seven colours, words, kind words, oils, closing; the scroll guide
  follows that order. Each home card is one link to its offering on Work With
  Me (`#sound-bath`, `#one-to-one`, `#cleansing`); its body lifts 4px on hover
  and the visible Learn more link stays. Above the footer of Home, About Me and
  Our Story a **continue block** (`.continue`) hands over to the next page: a
  gold pearl and the eyebrow "Next", the page name as a large Italiana link
  with a gold arrow that slides on hover, and one Lora italic line beneath.
  Every section and offering id has `scroll-margin-top`, so anchors land
  below the header; smooth scrolling only when motion is allowed.
- **Header**: a 2px gold reading-progress line along the header's bottom edge
  (`.site-header__progress`, scaled by the script), over the hairline that
  turns gold on scroll. The phone menu lists Book a session and Shop my oils
  beneath the links.
- **Phone booking bar** (`.book-bar`): one plum Book a session button fixed
  to the bottom, safe-area aware, shown once the hero has scrolled past and
  hidden while the booking form or the footer is on screen (the page gets
  bottom padding while it shows). Desktop: none.
- **Back to top** (`.to-top`): a 48px round button, gold hairline, with a gold
  pearl above a swash; appears after one screen, bottom right, and sits above
  the phone bar on phones.
- **Offering details** (`.know`): a Good to know `<details>` in each offering
  (who it is for, what to bring, where) as a small-caps summary with a gold
  chevron and a hairline list; the script opens them on wide screens.
- **Good to know, the questions** (`#faq`, `.faq`): six `<details>` on gold
  hairlines, a pearl (lotus order) before each Italiana question and a plus
  that turns into a cross; `name="faq"` keeps one open at a time natively and
  the script eases the answer open and closed (instant under reduced motion).
- **Booking form**: the legend "Fields marked * are required." with gold
  asterisks; hints under labels; "Which session?" as four cards (radio inputs
  inside labels) with a pearl each, chosen state a gold hairline frame with
  an inset second hairline on ivory; the original select stays as the
  no-script fallback (hidden with scripts on, disabled so only the cards
  submit) and keeps `id="f-session"` for the `?session=` preselect. Inline
  messages under invalid fields on blur and submit (browser validity, our
  words), Sending... on the button while a fetch posts, a honeypot named
  website out of sight, the pre-launch guard unchanged, and on success the
  fields give way to the thank-you with a three-pearl strand and the "What
  happens next" steps, which also sit under the form intro. The message box
  grows with its content up to 520px.
- **Interaction**: one gold focus ring (3px, 3px offset) on everything;
  buttons lift 1px with a soft plum shadow and sink when pressed; underlines
  thicken on hover; 160 to 240ms ease-out, none under reduced motion.
  Sections and card rows rise 14px and fade in once as they enter the
  viewport (`data-reveal`, `data-reveal-stagger` for staggered children);
  anything already on screen shows at once, and nothing is hidden without
  scripts or under reduced motion.
- **Carousels**: the quotes take a swipe on touch as well as the arrows,
  counter and arrow keys; on phones the kind words become a snapping row
  with Previous and Next beneath. No auto-advance anywhere.
- **404** (`404.html`): the same header and footer, a loose strand that
  curls and ends with one dropped gold pearl, "This strand leads nowhere."
  and two buttons. Its links and assets are root-relative, since Vercel
  serves it for any missing path.

## When editing
- Change colours only in `css/theme.css`; pearls take their colour from the
  `.pearl--name` classes. A pearl is
  `<svg class="pearl pearl--blush" aria-hidden="true" focusable="false"><use href="#pearl"/></svg>`;
  the sprite with the `#pearl` symbol must stay at the top of every page.
- Inside an inline SVG a pearl is `<use href="#pearl" class="pearl--teal" x y width height>`.
- Never set text in a pastel or in gold on ivory or cream.
- Keep hairlines on whole pixels; a 1px line at a half-pixel offset renders
  grey instead of gold.
- Keep every [bracketed placeholder] visible until Lisa sends the words.
- The twelve quotes all live in the HTML list; the script only stacks them.
  Add or remove `<li class="quote">` items freely.
- Capsule sizes use container query units; keep `container-type` on the
  portrait's column.
- Rules that target `svg` inside a component must exclude `.pearl`, or the
  pearls inherit that size (see `.bottle__art svg:not(.pearl)`).
- The header and footer are repeated on every page: edit all four.
