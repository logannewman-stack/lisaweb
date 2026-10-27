# Option A: Classic grace

## Concept
Timeless, centred and symmetrical, like a beautifully set invitation in a calm
spa. Warm ivory and soft cream grounds with a faint paper grain, deep plum
headings, charcoal text. Lavender leads the accents, with blush and champagne
gold; the other petal colours appear only in small, deliberate places: the
lotus petals, the coloured pearls, the oil labels and the faintest traces of
the halo. The boldness is spent on a few moments: the emblem at the top of the home
page, the six arches on About Me, the lotus illustration and the tree of
life; everything else is refined and quiet.

## Structure (agreed October 2026)
Six pages and a 404, each ending with a continue block that hands on to the
next (Stay Connected ends with its own sections):

| Page | File | Sections (ids) |
| --- | --- | --- |
| Home | `index.html` | hero, `origin`, `strands`, `ways`, `coming`, `kind-words`, `closing`, `continue` |
| About Me | `about.html` | hero, `background`, `six-strands`, `chapters` (`strand-roots` … `strand-becoming`), `glance`, `credentials`, `closing`, `continue` |
| Our Story | `story.html` | hero, `meaning`, `journey`, `closing`, `continue` |
| Wellness Philosophy | `philosophy.html` | hero, `philosophy` (with the tree of life), `colours`, `believe`, `words`, `breathe`, `continue` |
| Explore Possibilities | `explore.html` | hero, `offerings`, `session`, `skills`, `oils`, `faq`, `continue` |
| Stay Connected | `connect.html` | hero, `book`, `events`, `coming-soon`, `announcements` |
| Page not found | `404.html` | `not-found` |

The old `work-with-me.html` is gone; `vercel.json` sends `/work-with-me.html`
and `/work-with-me` to `/explore.html`. Every Book a session goes to
`connect.html#book`, and each offering's Book button to
`connect.html?session=<key>#book`.

## Palette usage
All colours are custom properties in `css/theme.css`, under Lisa's own names
and HEX codes, plus RGB-channel versions for soft washes.

- **Grounds:** Warm Ivory for the page, Soft Cream for alternate bands, the
  invitation cards and the footer. Cream carries `--grain-paper`, a very fine
  paper grain. Never a pastel ground.
- **Text:** Deep Plum for headings, links, buttons, quotes and anything set on
  a wash; Charcoal for body text. Headings and display lines take their colour
  from one property, `--heading`; links, labels and controls from `--link`
  (always plum), so the ink preview changes only the headings. `--plum-muted` (#6A6370) is only for small
  secondary text on plain ivory or cream.
- **Lavender and blush:** the halos, the washes behind "Words I keep close",
  "What I believe" and "A minute for you", the arch-card crowns, the breathing
  orb, hover washes, the rim light on every pearl.
- **Champagne gold:** always as a material, never as text. The gold foil
  (`--gold-foil`, a gradient from #B8933F through #E9D6A0, #C9A24B and #F0E2B8)
  draws the frames, hairlines, strand lines, the shelf, the step numerals and
  the large quote marks. The Shop my oils button is foil with charcoal text
  (4.2:1 at its darkest stop).
- **Gold over pink:** `--blush-ground` (#FCEDF1, a pale blush; plum on it is
  7.6:1) carries gold linework: the Namaste closings on home and About Me,
  the Coming soon band on Stay Connected and the Coming soon card in What's
  coming. Bands get a foil hairline along each edge; cards get `.gilt`, a
  double foil frame (the inner one lighter), and `.gilt--frame` is the frame
  alone for a card on a blush band. Text on blush is plum or charcoal; gold
  is only ever lines, sparkles, pearls and the moon and sun.
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
- **Strand symbols:** `#sym-roots` (a seed putting down roots),
  `#sym-calling` (an eight-pointed star), `#sym-heart` (a heart held in a
  lotus), `#sym-growth` (a leafing branch), `#sym-discovery` (a crescent moon)
  and `#sym-becoming` (the sun rising over still water): the same fine plum
  line as the icons, each with one gold accent. Also `#ic-date`, `#ic-bud`,
  `#ic-drop`, `#ic-more` and the small `#i-turn`.
- **Celestial ornaments:** `#sparkle` (a four-pointed gold star), `#moon` (a
  gold crescent with a star) and `#sun` (a gold sun with long and short rays).
- **Bottles:** one `#bottle` symbol, plum glass with a gold foil cap and a
  pastel label set by the `--label` custom property on each `<use>`.

## Signature pieces
- **Home hero:** the emblem (`assets/brand/emblem.webp`, a stand-in until
  Lisa's celestial woman arrives: replace that one file) centred in a warm
  light inside the watercolour halo, its outer edges feathered; then the h1,
  "Welcome to" in small italic above "Strands of Grace" like an invitation;
  the intro, a slim strand and the two buttons. The hero fills the first
  screen, so the portrait waits below; a few gold sparkles sit at its edges.
- **The origin story:** a two-column spread on the first cream band, the
  portrait in its arch beside "Every strand has a story." and its second
  line. The arch shows `lisa-hero-arch.jpg`, a 740 x 1028 crop of the beach
  photo (with a 480 px copy). The band edge never crosses the photo.
- **Six strands of a life (home):** six small arches in a row hung from one
  gold thread by pearls in their colours, each with its symbol and name,
  linking to its chapter on About Me (three by two on phones, one thread per
  row).
- **The six arches (About Me, "Six arches"):** the centrepiece. A 3 x 2 grid
  of arched invitation cards (2 x 3 on tablets, 2 columns on phones), each
  row hung from a gold thread by a pearl in the strand's colour. The front:
  a wash of the colour at the crown, the symbol, the name, the colour's name
  between two hairlines and a small gold turn mark. Hover (a mouse), a tap,
  or Enter/Space turns the card on its vertical axis to the back: a deeper
  wash, the symbol small, the name with a hairline, the summary and Read the
  chapter. The crown pearl stays still as the card turns beneath it, and
  glints. It turns in 3D where supported and motion is welcome, cross-fades
  otherwise, and changes at once under reduced motion. One card is pinned at
  a time; Escape or a tap on the back turns it to rest; keyboard focus that
  arrives with Tab turns a card, so Tab runs front, Read the chapter, next
  card. Each button carries `aria-expanded` and `aria-controls` its summary.
  Without JavaScript every card shows its summary under a hairline.
- **The chapters:** six alternating spreads on a cream band, an empty 4:5
  arch photo frame (`.photo-frame`, a wash of the strand's colour and its
  symbol, faint, until a photo goes in; `.photo-frame--wide` is 3:2) with the
  bracketed caption, beside the heading, a strand, two paragraphs and Back to
  the six strands. A sparkle on a gold hairline divides them.
- **The tree of life (Philosophy):** beside "In my own words", in an arch
  frame with a gold pearl at its crown. Fine-line gold foil: eight strands
  rise from the roots, gather into the trunk and part into the limbs; the
  crown carries sheen pearls in the seven colours like blossoms, and the
  leader reaches up to a gold sparkle in a soft light, with a lavender shade
  about the roots. It is drawn inline in `philosophy.html`
  (`[data-tree-of-life]`).
- **The lotus (Philosophy):** a drawn illustration in the spirit of the logo. Seven
  overlapping petals (outer ones curl outward) with four-stop watercolour
  gradients, white fibres, a gold vein, a lighter highlight edge inside a gold
  foil edge, a paper-displacement filter and grain, an inner glow at the heart,
  a soft shadow and a strand of pearls across the base. It sits at about 35rem
  on desktop with the seven names placed around it: Blush Pink above the
  centre petal, the left petals' names on the left, the right petals' names on
  the right. Hovering a name lifts its petal.
- **Shelf of oils (Explore):** five bottles on a gold foil board with a soft
  shadow, carrying their names and notes, under the eyebrow "doTERRA
  Wellness Advocate"; on narrow phones they become a list.
- **Framed moments:** Kind words and the Namaste closing (home), At a glance
  and the Namaste closing (About Me), What the name means and the closing
  (Our Story), A minute for you (Philosophy), Skills and practices and Good
  to know (Explore), the booking form, the events, the Coming soon frame and
  the announcement (Stay Connected).
- **Credentials (About Me, at the bottom):** doTERRA Wellness Advocate first
  with the oil drop, four entries in gold-ruled rows, and the certification in
  progress with the bud and See what's coming.
- **Namaste:** the sign-off, plum italic between a gold crescent moon and a
  gold sun with fading hairlines: under the home closing, as the About Me
  closing's heading, and in the footer.
- **Session steps:** a gold foil numeral and a fine-line icon above each step.
- **Header:** one calm row (Home, About Me, Our Story, Philosophy, Explore,
  Stay Connected, Shop Oils and Book a session; type at 15px) that fixes
  itself as a slimmer bar with a gold hairline once the page scrolls; the
  current page is marked with a pearl. The row needs 1100px (the logo eases
  from 12.5rem to 11rem between 1280 and 1100); below that the Menu button
  opens the full-screen menu, which lists the six pages, Book a session and
  a gold Shop my oils. On desktop the home masthead is the row alone and the
  bar's logo waits until the emblem has scrolled away; on phones it is
  always there.
- **Footer:** cream, a foil hairline above, the full logo, a strand, three
  columns on desktop (the six pages in two columns, contact with Lisa's email
  as a link, shop), the credentials line, a hairline, the tagline in italic,
  Namaste and the small print.

## Flow and interaction (October 2026)
- **Page flow:** see Structure above. Ivory and cream still alternate, with
  the blush bands for the Namaste closings and Coming soon. Each ways card
  (ivory, on the cream band) is one link: an invisible cover (`.arch-card__cover`,
  hidden from assistive technology) takes the whole surface to the offering
  on Explore (`#sound-bath`, `#one-to-one`, `#cleansing`), while the
  visible Learn more link is the one keyboard users reach.
- **Continue block** (`.continue`, wrapper marked `data-continue`, on every
  page but Stay Connected): a foil hairline, a strand, the eyebrow "Next"
  between two gold pearls, the next page's name as a large italic link with a
  drawn underline, and one line.
- **Anchors:** every `[id]` carries `scroll-margin-top`, so targets land below
  the fixed bar; scrolling is smooth only when motion is allowed.
- **Phone booking bar** (`.book-bar`): one plum Book a session button fixed
  to the bottom with a foil hairline, safe-area padding and a blurred ivory
  ground. It shows once the hero has scrolled away and hides while the
  booking form or the footer is on screen (on Stay Connected it scrolls to
  the form); the page gains bottom padding
  while it is shown. Nothing on desktop, nothing without JavaScript.
- **Back to top** (`.to-top`): a small round ivory button with a foil ring, a
  pearl at its crown and a plum chevron, bottom right, above the phone bar
  on phones; it appears after one screen.
- **Reading progress:** a 2px foil line along the header's bottom edge whose
  width is the scroll position.
- **Offering details:** a native `<details>` "Good to know" in each offering
  card with who it is for, what to bring and where, open on desktop and
  closed on phones (JavaScript closes it; without JavaScript it stays open).
- **Good to know** (`#faq`): six questions as `<details>` in a cream
  invitation card, hairlines between them, a round plum chevron that turns,
  one open at a time, the answer's height animated when motion is allowed.
- **Session cards:** the four choices are radio inputs inside labels; the
  chosen card takes a lavender-to-blush wash, a deep gold hairline with an
  inner gold-light line and a lit gold pearl. The `<select id="f-session">`
  stays as the no-JavaScript fallback and is kept in step with the cards,
  which is also what `?session=` and the offering Book buttons set.
- **Form states:** required fields carry a gold asterisk and the legend line;
  hints sit under the labels; inline messages (a gold pearl and plum text)
  appear under a field on blur and on submit, using the browser's validity
  with the site's wording; the message box grows with its content; Send
  becomes "Sending..." and is disabled while the post is in flight; a hidden
  `website` honeypot is ignored by assistive technology. With the placeholder
  action the guard notice shows; otherwise the form posts with `fetch`, then
  hides the fields and shows the thank-you with "What happens next" (which
  also sits under the form intro), or the error line, whose "email me
  directly" is a mailto link to lisa@mystrandsofgrace.com.
- **Focus and states:** one focus ring everywhere, 2px deep gold with a
  3px offset (`--focus`). Buttons lift on hover and sink when pressed, cards
  lift, underlines grow from the left. Transitions run 160 to 240ms,
  ease-out, and none under reduced motion.
- **Reveal:** elements with `.reveal` rise 14px and fade in once when they
  enter the viewport (IntersectionObserver, threshold 0.15, unobserved after);
  children of a `[data-stagger]` parent follow 90ms apart. Anything already
  on screen at load shows at once; without JavaScript or under reduced motion
  everything is simply visible. The reveal uses the `translate` property, so
  hover transforms are untouched.
- **Carousels:** previous and next, a counter, left and right arrow keys
  while a control inside has focus, a swipe on touch, never auto-advance.
- **404:** `404.html` with the same header and footer; a strand whose line
  ends with three scattered pearls and one dropped lower (`#strand-loose`),
  the heading, one line and two buttons (Home, Explore possibilities), on a
  soft halo.
- **Celestial motifs:** a quiet layer of fine gold sparkles (`.sky`, one
  `.sky__star` each, placed with `--x`, `--y`, sized with `--s`) at the
  edges of the heroes, the closings and Coming soon; stars nearer the middle
  (`--inner`) are left out on phones so they never touch text. The moon and
  sun flank Namaste; the crescent and the sun are also two of the six strand
  symbols. They twinkle very slowly (7.5 to 11.5 seconds, never in step) and
  hold still under reduced motion.
- **Previews (`?ink`, `?tagline`):** `?ink=charcoal` turns every heading and
  display line charcoal for the rest of the visit in that tab, `?ink=plum`
  returns to plum; `?tagline=2` swaps the origin's second line to "Together,
  they share a purpose." (`?tagline=1` returns). A small script in each
  page's head sets `ink-charcoal` / `tagline-2` on `<html>` before the first
  paint and remembers the choice in sessionStorage (wrapped in try/catch).
  Without JavaScript, plum and version 1. Neither is linked from the site.

## Motion
- One orchestrated entrance on the home hero, about 1.3 seconds: the emblem
  settles from 0.985 scale and fades in, then the welcome, the intro, the
  strand and the buttons rise ten pixels in turn, and the sparkles arrive.
- The six arches turn in 0.85 seconds; the crown pearl glints as they do.
- Ambient: the halo washes breathe over 16 to 25 seconds; the breathing orb
  glows slowly at rest; the sparkles twinkle very slowly.
- Small touches: buttons and cards lift slightly, links draw a plum line over
  their gold one, a colour name lifts its petal, the fixed bar slides in.
- Transform and opacity only. `prefers-reduced-motion` turns all of it off; the
  breathing countdown still works, with the circle held still.

## Behaviour (`js/site.js`)
Header condensing, the phone menu (focus kept inside, Escape and link clicks
close it), one quote at a time with Next quote, kind words with previous and
next, pearls between the vision-board words, the 4-7-8 breathing exercise, and
the booking form guard with the `?session=` preselect, and the six arches
(section 9). The previews live in the inline head script, not in `site.js`,
so they apply before the first paint. Without JavaScript every
quote and kind word is listed and the nav links sit under the logo.

## Things to avoid when editing
- The head, header, footer, phone bar, Back to top and SVG sprite are
  repeated in all seven pages (the six pages and `404.html`): change them all
  together. The lotus illustration and the tree of life live only in
  `philosophy.html`.
- The six arches rely on their markup: six buttons with `data-strand`
  (roots, calling, heart, growth, discovery, becoming, in that order) and
  `aria-controls` pointing at a `data-strand-summary` element holding the
  summary and `<a href="#strand-…">Read the chapter</a>`; the chapters are
  `article#strand-…` inside `#chapters`, each with a `<figure>` frame.
- To put a photo in a chapter, add an `<img>` (4:5, `loading="lazy"`, with
  alt text) inside its `.photo-frame__window` and remove the faint symbol;
  for a landscape photo add `photo-frame--wide` to the frame.
- The emblem's outer edges are feathered for the cropped stand-in; if the
  real emblem needs its edges, remove the mask on `.hero__emblem img`.
- Keep `id="f-session"` on the fallback `<select>` and the `data-session`
  keys (`sound-bath`, `one-to-one`, `cleansing`) on both the options and the
  session cards; the preselect and the Book buttons depend on them.
- Keep text on the blush ground plum or charcoal; keep gold to lines and
  ornaments there too.
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
- The home portrait is a file, `lisa-hero-arch.jpg` (a 740 x 1028 px crop of
  `lisa-hero.jpg` starting at 640, 307, plus `lisa-hero-arch-480.jpg`). Crop
  again if the photo changes.
- The timeline supports up to ten entries; add a `grid-row-start` rule for more.
- The lotus puts blush at the centre, like the logo; the list beneath keeps
  the copy's order in the markup, and only the desktop grid places the names
  around the petals.
- Decorative washes that extend past their box sit inside a section with
  `overflow: hidden`, so nothing can scroll sideways on a phone.
- To switch the booking form on, replace `your-form-id` in the form's `action`;
  the guard turns itself off.
