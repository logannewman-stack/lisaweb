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
  behind the three ways to work together, the kind words, the six strands
  panel and the credentials table. A pale blush (`--blush-wash`, Blush Pink at
  24% on ivory) is the one tinted ground, kept for "gold over pink" (below).
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
  codes are never shown: each colour tile keeps its code in a `data-hex`
  attribute, which no visitor sees.
- Headings take their colour from one token, `--heading` (Deep Plum). The
  `?ink=charcoal` preview swaps that token for Charcoal (see Previews).

## Type
- Italiana for every heading, title, numeral and year (`--heading`, sentence
  case, slightly tightened tracking). Section headings sit at 42 to 61px, page
  headings at 52 to 88px, the session numerals at up to 76px. Italiana draws
  a hairline hyphen and bar-like square brackets, so inside display text those
  two glyphs borrow Lora through `.hy` and `.ph` spans; the words themselves
  are untouched. Every new [placeholder] and hyphen in Italiana (event names,
  the coming-soon titles, the credentials and skills rows) follows the rule.
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
  seven pearls spaced evenly. Under the home welcome, footer top, phone menu,
  the About, Philosophy, Explore and Stay Connected heroes, the quote
  divider.
- **Light sweep** (`.strand__light`): once, on load, a short gold-and-white
  light travels the home strand from left to right and each pearl glints as
  it passes, then everything rests. Off under reduced motion.
- **Lotus illustration** (`.lotus`): a fine-line lotus drawn in SVG, plum
  petals with a gold inner petal and a gold strand of seven pearls on gold
  swashes. One per page, where the eye used to fall on nothing: beneath the
  origin story, in the margin beside My background, beside the breathing
  exercise, and (petals only) above the Story strand, which runs through its
  base exactly as the pearls cross the logo. The petals are filled with the
  ground colour (`--lotus-fill`) so the tiers overlap cleanly.
- **Scroll guide** (every page but the 404, `.guide`): from 1200px a vertical
  strand in the left margin with one pearl per section, the first for the
  page's opening (`#top`); the pearl in view is ringed in gold with a
  breathing halo, and on hover its label (the section's heading) runs down
  the margin in small capitals so it never covers the page. Below 1200px the
  same pearls sit in a row (`.progress`) on the header's bottom edge and light
  up as you scroll. Home and About Me have seven pearls, the others four to
  six, always in lotus order and ending on gold.
- **Section mark** (`.mark`): a short gold line ending in one pearl above
  every section heading.
- **Capsules** (`.capsule`): portraits in tall, fully rounded capsules with a
  gold hairline inset inside the photograph, a thin gold outline offset up
  and to the right, and a soft plum-tinted shadow. On the home page the
  portrait sits beside the origin story, not in the hero: the hero belongs
  to the emblem.
- **Header**: a slim bar whose bottom hairline turns gold once the page has
  scrolled (`.is-scrolled`, set by the script); the current page is marked by
  a small gold pearl beneath its link.
- **Composed sections**: the three ways to work together on a cream panel
  with a gold top rule, a pearl on the rule at the head of each column and a
  bespoke fine-line icon (singing bowl, seated figure, sage bundle); kind
  words on a cream band inside a double gold hairline frame; the five session
  steps as large numerals strung on a strand with pearl nodes; at a glance as
  a double-framed two-by-two grid with a pearl in each cell; credentials as a
  hairline table on a band with a pearl per row; the colour tiles with
  a gold top rule, a large luminous pearl that glows on hover, and the lotus
  on a soft cream square in the eighth cell.
- Strand language elsewhere: the draped necklace (home closing), two strands
  meeting at one pearl (story closing), the 2017 to 2026 line drawn as two
  draped strands (story hero), the timeline, the breathing pearl inside gold
  rings, the line-drawn oil bottles with a pearl on each label.

## The six-page framework (October 2026)
Home, About Me, Our Story (the story behind Strands of Grace), Wellness
Philosophy, Explore Possibilities and Stay Connected, plus the 404. The
navigation (Home, About Me, Our Story, Philosophy, Explore, Stay Connected,
Shop Oils and the Book a session button) fits on one line from 1100px, with
a little less air between 1100 and 1280; below 1100 it moves to the phone
menu, so the type never drops below 15px. Every Book a session goes to
`connect.html#book`; each offering's Book goes to
`connect.html?session=<key>#book`. Each page ends with a continue block
(`[data-continue]`) handing on to the next, except Stay Connected.
- **Home**: hero (the emblem above "Welcome to Strands of Grace", the strand,
  the intro and the two buttons), origin (her portrait beside the story, the
  lotus beneath it, the story line in Lora italic), strands (a light teaser:
  the six symbols, pearls and names on a straight gold strand, each linking
  to its chapter), ways, coming (two cards; Coming soon on blush), kind
  words, closing (on blush, with Namaste).
- **About Me**: hero, background, six strands, chapters, at a glance,
  credentials, closing (Namaste, on blush).
- **Our Story**: as before, with the new heading; the seven colours link to
  Philosophy.
- **Wellness Philosophy**: hero, In my own words beside the tree of life, the
  seven colours, what I believe with "Inhale courage. Exhale fear.", the
  twelve quotes, the breathing minute.
- **Explore Possibilities**: hero, the three offerings with Good to know, the
  five session steps, skills and practices (a hairline list, a pearl and an
  Italiana name per row), the oils (eyebrow "doTERRA Wellness Advocate", in
  the brand's own casing), the questions.
- **Stay Connected**: hero, the booking form with all its states, events
  (a hairline programme: a pearl, the date and place, the name and links),
  coming soon (on blush), announcements.
- `vercel.json` sends `/work-with-me.html` and `/work-with-me` to
  `/explore.html`; nothing links to the old address.

## The six strands: "Six pearls" (About Me, `#six-strands`)
Three levels. Level 1 is a necklace: six large sheen pearls in the strand
colours (Roots peach, Calling lavender, Heart blush, Growth sage, Discovery
teal, Becoming gold) hang on a gold strand that drapes in a gentle curve
(`.sp__drape`; each pearl sits on it through `--k`, how far down the drape
its column hangs). Above each pearl its fine-line symbol (a seed putting
down roots, a star, a heart held in a lotus, a leafing branch, a crescent
moon, a rising sun: `#sym-*` in the sprite, plum and gold), below it the
name in Italiana.

Level 2: the pearls behave as a tablist. A click, a tap, Enter or Space, or
simply resting the mouse on a pearl chooses it; the arrow keys, Home and End
move along the strand; Previous and Next with "1 of 6" walk it too, and wrap
like a necklace. The chosen pearl lifts, a soft halo in its own colour and a
fine gold ring appear, a small white sparkle glints on its highlight, and a
gold underline settles under its name. The panel below is a cream card on a
gold rule, and a gold clasp pearl on that rule slides to sit under the
chosen pearl. It shows a medallion (the symbol in a ring washed with the
strand colour), the colour's name, the strand's name, the bracketed summary
and Read the chapter. All six panels share one grid cell, so the card never
changes height; they cross-fade, at once under reduced motion. When the
section first arrives a light runs along the strand once. Default: My Roots.
Below 900px the necklace becomes two rows of three, each row on its own
drape. Without JavaScript the six summaries are listed in order, each with
its medallion and link. All six pearls stay in the tab order, as the markup
contract asks, and the arrow keys move between them as well. Escape has
nothing to undo here: a strand is always chosen.

Level 3, the chapters (`#chapters`): six articles strung on a vertical gold
strand with a pearl per chapter, level with its heading. From 900px the
strand runs down the centre and the chapters hang from it on alternate
sides, so it never runs parallel to the scroll guide; on phones it runs down
the left. Each chapter has its heading, the two bracketed paragraphs, Back
to the six strands, and a life-photo frame: an empty capsule (4:5 and 3:2 in
turn) washed with the strand colour, with the gold mat, the offset gold
outline of the portraits, the strand's symbol and the bracketed caption.
Drop an `<img>` into `.chapter__frame`: it fills the capsule and the symbol
steps aside.

## Celestial motifs
Sparing and still. A quiet sky of four-point gold sparkles (`.sky`,
`#sparkle`) around the home hero's emblem, in the two Namaste closings, at
the edge of Coming soon and on the 404; each twinkles very slowly on its own
beat (7.5s) and stops under reduced motion; on phones only a few remain. A
fine-line crescent moon and sun (`#moon`, `#sun`) flank every Namaste (home
closing, About Me heading, footer). The symbols carry a star (My Calling), a
crescent moon (My Discovery) and a rising sun (My Becoming). Coming soon
marks each item with a moon in phases (`.moonphase`), fuller the nearer it
is: gibbous for the July certification, then half, then crescent; the
credentials row and the home card use the gibbous moon too.

## Tree of life (Philosophy, `[data-tree-of-life]`)
Beside In my own words: a pendant. Seven fine gold strands rise from the
roots, bind together into one trunk, and fan out into a domed crown; each
strand ends in a pearl blossom in one of the seven colours, with smaller
pearls on the forks and twigs. Below the gold ground line the same strands
spread into roots. The tree sits inside a fine double gold ring with a pale
pearl glow behind the crown, and a small sun set on top of the ring like a
pendant's bail: the light it reaches for. A few sparkles twinkle round it.

## Gold over pink
A pale blush ground (`--blush-wash`) carrying gold linework, for the home
closing, the About Me closing, Coming soon (Stay Connected) and the Coming
soon card on the home page. Full-width blush sections have a double gold
hairline along the top and the bottom that fades at the ends
(`.section--blush::before`); cards on blush have a double gold hairline
frame. Text on blush is plum or charcoal only (plum 7.6:1, charcoal
10.6:1); gold is only lines, ornaments and pearls.

## Credentials and the footer
Credentials close About Me before the Namaste: "doTERRA Wellness Advocate"
as a large Italiana line with a gold pearl, the four placeholder entries in
the hairline table, then the sound ceremony certification as an "In
progress" row with its moon and See what's coming. The footer gains the
credentials line under the logo (gold middots, each kept with the word
before it) and a "Namaste." sign-off between a crescent moon and a sun in
its base row, between the tagline and the copyright. Its two columns no
longer carry visible titles: the links and the labelled contact lines speak
for themselves. Lisa's email, lisa@mystrandsofgrace.com, is a mailto link in
the footer and the Stay Connected contact lines, and the form's error
message ends with "email me directly" as a mailto link.

## Previews for the two open decisions
- `?ink=charcoal` on any address turns every heading Charcoal for the rest
  of the visit in that tab; `?ink=plum` turns them back. It sets
  `ink-charcoal` on `<html>`, which swaps `--heading`.
- `?tagline=2` shows the second story line on the home page ("Together, they
  share a purpose."); `?tagline=1` the first. It sets `tagline-2` on
  `<html>`; without it, and without JavaScript, only version 1 shows.
- Both are kept in sessionStorage (every access in try/catch). A few inline
  lines in each page's `<head>` apply the classes before the first paint;
  `js/site.js` (`applyPreviews`) carries the same logic and keeps them in
  step. Nothing on the site links to either.

## Motion
- The home hero: the emblem (`assets/brand/emblem.webp`, the stand-in's
  cropped sides dissolving into the ivory through a soft mask),
  "Welcome to Strands of Grace" beneath it, the strand of seven pearls as
  its underline, then the intro and buttons. One entrance, about 1.4s, then
  the light: the emblem settles from 0.975 scale and fades in, the heading
  rises, the strand draws and its pearls appear in turn, the intro rises
  10px, then the buttons; from 1.2s the light sweeps the strand, and the
  stars come out.
- Ambient: the origin portrait's outline drifts a few pixels over 16s; the current guide
  pearl's halo breathes. Quotes cross-fade and the quote stage eases its
  height to the quote on show, so a short quote is not left in a tall empty
  box. Nothing waits for a scroll observer; all content is visible at rest.
- Transform, opacity and a little light only. `prefers-reduced-motion`
  switches every animation and transition off: the hero shows complete, the
  light never appears, the quote stage resizes at once and the breathing
  pearl stays still (the cue and countdown carry the rhythm).

## UX and flow (October 2026)
The visitor journey is the same on every option; here it is strung in pearls.
- **Page order and hand-offs**: see "The six-page framework" above; the
  scroll guide follows each page's order. Each home card is one link to its
  offering on Explore (`#sound-bath`, `#one-to-one`, `#cleansing`); its body
  lifts 4px on hover and the visible Learn more link stays. Above the footer
  of every page but Stay Connected a **continue block** (`.continue`,
  `[data-continue]`) hands over to the next page: a
  gold pearl and the eyebrow "Next", the page name as a large Italiana link
  with a gold arrow that slides on hover, and one Lora italic line beneath.
  Every section and offering id has `scroll-margin-top`, so anchors land
  below the header; smooth scrolling only when motion is allowed.
- **Header**: a 2px gold reading-progress line along the header's bottom edge
  (`.site-header__progress`, scaled by the script), over the hairline that
  turns gold on scroll. The phone menu lists Book a session and Shop my oils
  beneath the links.
- **Phone booking bar** (`.book-bar`): one plum Book a session button fixed
  to the bottom, safe-area aware, going to `connect.html#book` (on Stay
  Connected it scrolls to `#book`), shown once the hero has scrolled past and
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
  curls and ends with one dropped gold pearl, a few sparkles, "This strand
  leads nowhere." and two buttons, Home and Explore possibilities. Its links and assets are root-relative, since Vercel
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
- The header, footer and sprite are repeated on every page: edit all seven
  (the 404 uses root-relative links). Only the current-page marks differ,
  and Stay Connected's phone bar points at `#book`.
- The sprite holds `#pearl`, `#sparkle`, `#moon`, `#sun` and the six strand
  symbols `#sym-roots` to `#sym-becoming`. Use a symbol as
  `<svg class="sym" aria-hidden="true" focusable="false"><use href="#sym-heart"/></svg>`;
  its plum and gold come from `--sym-a` and `--sym-b` if they ever need to
  change in one place.
- `.phase` belongs to the breathing exercise; the moon icons are `.moonphase`.
- The six strands section keeps its contract: buttons with `data-strand`,
  panels with `data-strand-summary` holding `a[href="#strand-<key>"]`,
  chapters `article#strand-<key>` with a `figure`.
