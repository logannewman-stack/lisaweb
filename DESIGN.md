# Option B: Watercolour bloom

## Concept
A watercolour journal. The site borrows the language of Lisa's logo, with its
painted petals, gold swashes and strand of pearls, and lets it run softly through
every page. The paint is real watercolour, not a blur: washes have ragged wet
edges, pigment pooled darker along the rim, granulation inside and a soft bleed
beyond the edge, and where two colours overlap a third appears. Gold is kept to
fine lines, pearls and calligraphic swashes that echo the loops in the logo.
Ivory and cream do most of the work, so the colour stays gentle, never loud.

## Palette in use
All colours are tokens in `css/theme.css`, under her names and HEX codes.
- **Grounds:** Warm Ivory for most sections, Soft Cream for every other band.
  Gentle SVG waves join them, and a thin gold line follows each wave
  (`.section--cream` and the footer add both automatically).
- **Text:** Deep Plum for headings, links and button labels; Charcoal for body
  text; `--ink-soft` (#5E5566, 6.4:1 on cream) for small notes. Nothing else
  carries text.
- **Leading washes:** blush and peach, with lavender. Blue, teal and sage only
  as small touches inside a bloom, never a whole area.
- **Gold:** strands, swashes, pearl rims, icons and hairlines. Never text.
- **Buttons:** `.btn--bloom` is a blush-to-peach fill with a gold hairline inset
  and plum text (5.1:1 at its darkest point). `.btn--quiet` is ivory with a gold
  hairline.
- Washes never sit under small body text. Large headings may cross a wash;
  every wash under a heading stays translucent enough for plum to hold 4.5:1
  or better.

## Type
- **Marcellus** (headings, quotes, names): Roman inscription letters that echo
  the logo. Always plum and sentence case, `text-wrap: balance`.
- Section headings are `--step-3`, `clamp(2.4rem, 4.2vw, 3.6rem)`. Page titles
  are `--step-4`; the story title is `--step-5`.
- **Nunito Sans** (body, UI): body text 17 to 18 px (`--step-0`) on a 58ch
  measure (about 62 to 68 characters), `text-wrap: pretty`. Bold for buttons
  and labels. The home intro is larger, `clamp(1.3rem, 1.1rem + 0.9vw, 1.75rem)`.
- **Pinyon Script**: only three moments. "Hello," on About, "with love, Lisa"
  closing My background, and the same sign-off in the footer. Do not add more.

## The watercolour kit
The shared SVG kit (gradients, filters, masks, symbols) sits at the top of
`<body>` on every page. Keep the four copies identical.

- **`#f-paint`**, the wash filter: `feTurbulence` + `feDisplacementMap` give the
  ragged wet edge; an eroded, blurred copy subtracted from the shape gives the
  pooled rim, which is then darkened and saturated; two more noise layers
  (granulation and a large mottle) are multiplied into the body; a blurred,
  faint copy underneath is the bleed. **`#f-stroke`** does the same for a loaded
  flat brush, with bristle streaks. **`#f-drop`** is the small version for the
  seven colours, emblems and bottle labels.
- **Wash silhouettes** `#s-wash-a`, `#s-wash-b`, `#s-wash-c` are lobed closed
  curves in a 1000-unit box, painted with `#f-paint` and coloured through
  `class="c-blush"` and friends. Layer two or three `<use>`s with `class="mul"`
  (`mix-blend-mode: multiply`) and new colours appear where they meet. Size
  them close to square; heavy stretching smears the grain.
- **`.bloom`**, the wet-in-wet underlayer: layered CSS radial gradients, blurred,
  with pigment granulation multiplied in through a tiled noise mask
  (`--grain-mask`). Each bloom sets its own colours (`--b1`..`--b4`), positions,
  sizes and strength.
- **Paper:** a fixed cold-pressed paper texture at 7% (`body::after`,
  `--paper`), fine tooth plus a faint larger mottle.
- **Performance:** the filters are shared definitions and each page paints
  roughly ten to twenty filtered shapes, most of them small. The drifting
  animations move only `transform` and `opacity`, so filtered layers are
  rasterised once and composited.

## Signature elements
- **Swashes:** `#s-swash-long`, `-long-r`, `-flourish`, `-arc`, `-arc-r` and
  `-wave` are filled calligraphic shapes (thick and thin like a nib) with one
  teardrop loop each, after the swashes in the logo. The home hero carries the
  long swash along its bottom edge; the Welcome portrait's arc wraps the petal
  and ends in its loop (the long tail is hidden there, beside a full column of
  text); About's arc wraps her portrait and sweeps right under the heading;
  Our Story carries the wave under its title; Work With Me has the long swash
  under its title; Welcome has the flourish under its heading.
- **Home hero:** the full logo is the centrepiece, large and centred on plain
  ivory, with the intro line and the two buttons under it. The paint frames
  it from the corners (a blush and peach cluster lower left, a lavender and
  blue cluster upper right, two faint granulated blooms behind them) and
  never runs behind the lettering; the swash runs along the bottom and five
  petals drift at the edges. Her portrait is not in the hero.
- **Petal portraits:** `clip-path: url(#clip-petal)` with a thin gold outline,
  three multiplied washes and a bloom behind, and the gold swash around. The
  image is framed with `--img-w`, `--img-x` and `--img-y`. On the home page
  the portrait sits beside the Welcome text, the second moment of the page.
- **Cards** (`.card`): a painted brush stroke runs edge to edge across the top
  (two glazes in different hues), clipped by the paper's rounded edge, with a
  thin wavy gold hairline beneath it. On the home page the three cards step
  down in equal 1.75rem steps; on Work With Me their tops align. Shadows are
  plum-tinted (`--shadow-card`).
- **Kind words:** a triptych on a gold strand. Each card carries a small pearl
  on its top edge, its own corner wash, and a small attribution.
- **Oils:** bottles (`#s-bottle`, about 110px tall) with a plum cap, a gold
  collar and a label painted in the oil's colour. On the home page three stand
  on a flowing strand with pearl nodes inside a bloom; on Work With Me the five
  stand on a swaying strand (`--y` offsets follow the curve) with a pearl under
  each.
- **What I believe:** a constellation of the ten vision-board words at three
  sizes on a 12-column grid (`--c`, `--r`, `--s`, `--dy`), with six small pearls
  placed between neighbours, over a faint lavender bloom. On phones the words
  stack with pearls between them.
- **Pearls** (`.pearl`, `#s-pearl`): hot highlight, blush reflection, rim light
  along the bottom, gold edge and a contact shadow. Timeline nodes, list
  markers, the strand nodes and the current-page marker in the header.
- **Timeline:** `js/site.js` draws the 2.2px strand through the pearls from
  their real positions and redraws it on resize. On phones, and with
  JavaScript off, a straight CSS strand is used instead.
- **Hero petals:** five small translucent lotus petals (`#s-petal`) drift very
  slowly over the home hero; two of them hide on phones.
- **Header:** a slim bar, frosted with a gold hairline once scrolled; the
  current page is marked by a small pearl, hover draws a short gold stroke.
- **Footer:** a cream band with faint blooms and a corner wash, the full logo,
  the script sign-off, link and contact columns and the shop link.

## Motion
- One orchestrated entrance on the home hero, about 1.2 s in all: the logo
  settles from 0.985 scale and fades in, the intro rises 10px, then the
  buttons, while the corner washes and blooms spread in and the swash and
  petals fade up.
- Ambient: `.drift` blooms move very slowly (50 to 70 s cycles), the petals
  drift over 60 to 80 s, the seven drops bob a few pixels.
- The breathing bloom scales with the breath, timed by `--phase-dur`.
- Only `transform` and `opacity` are animated. `prefers-reduced-motion`
  switches all of it off and every element renders in its final state. Under
  reduced motion the breathing bloom stays still and the countdown and cue
  carry the rhythm.
- Nothing waits at `opacity: 0` for a scroll observer.

## Flow and interaction (the UX round)
- **Page order and hand-offs:** Home runs hero, welcome, ways to work together,
  seven colours, words I keep close, kind words, oils, closing. Every page but
  Work With Me ends in a **continue block** (`.continue`): a strand with one
  pearl, the eyebrow "Next", the next page's name as a large Marcellus link
  whose gold underline grows on hover, and one line. Home leads to About Me,
  About Me to Our Story, Our Story to Work With Me.
- **Home cards** are one link across their whole surface (`.card--link`, the
  "Learn more" link stretched with a pseudo-element) to the matching offering
  on Work With Me; they lift on hover and the focus ring wraps the card.
- **Anchors** land under the sticky header (`[id] { scroll-margin-top }`);
  smooth scrolling only when motion is allowed.
- **Phone booking bar** (`.phone-bar`, phones only): one bloom button on a
  frosted strip with a gold hairline, safe-area aware. It slides up once the
  visitor is past the hero and hides while the booking form or the footer is
  on screen; `main` gets bottom padding so nothing hides behind it.
- **Back to top** (`.to-top`): a pearl with an arrow, bottom right after one
  screen of scrolling, above the bar on phones.
- **Reading progress:** a 2px gold line along the header's bottom edge whose
  width is the scroll progress.
- **Hover, pressed and focus:** buttons lift and sink (160 to 240 ms, ease-out),
  cards lift, underlines grow, and one focus ring everywhere: 2px gold
  (`--focus`, the deeper gold) offset 3px. Nothing transitions under reduced
  motion.
- **Scroll-reveal:** `[data-reveal]` sections and `[data-reveal-children]`
  rows rise 14px and fade in once (IntersectionObserver, threshold 0.15),
  children staggered 90 ms. Anything on screen when the page opens, the hero
  and everything under reduced motion or without JavaScript are left visible.
- **Carousels:** Words I keep close has previous and next, a counter, arrow
  keys when the group is focused and swipe on touch, never auto-advancing. On
  phones Kind words becomes a snapping track with Previous and Next; on wide
  screens all three cards show and the controls hide.
- **Offering details:** each offer on Work With Me has a native
  `<details>` "Good to know" (who it is for, what to bring, where) with a
  pearl marker and a gold chevron, between gold hairlines.
- **Good to know (FAQ):** six `<details>` on a strand of gold hairlines; the
  script animates the height, one open at a time, native under reduced motion.
- **Session cards:** the booking form's "Which session?" is four radio cards.
  The chosen card gets a pearl, a gold hairline and a blush-to-peach wash;
  `#f-session` is the first radio and `?session=` or an offering's Book button
  selects the matching card and scrolls to the form. Required fields carry a
  gold asterisk and the legend line; hints sit under the labels; errors appear
  under a field in plum once it has been visited (and for every field on
  submit); the message box grows with its content; the submit button reads
  "Sending..." while a message is on its way; a hidden "website" field catches
  bots. With the placeholder action the guard notice shows; with a real action
  the page posts in the background and shows the thank-you with "What happens
  next" (also listed beside the form intro with pearl numbers).
- **404:** `404.html`, the same header and footer, a loose gold strand ending
  in a dropped pearl, two washes and a faint bloom, and two buttons home. Its
  links are root-relative because Vercel serves it at any missing address.

## Things to avoid when editing
- Pastel or gold text, or small text placed over the dense middle of a wash.
  Check contrast after moving a bloom.
- Giving each section its own colour. Every bloom mixes two or three colours.
- Stretching, recolouring or cropping the logo, or placing the logo or the
  lotus mark on a wash.
- More script type, uppercase labels or letter-spaced eyebrows.
- New fonts or libraries. No build step is needed or wanted.
- Images from `assets/source`. They are never deployed.
- Anything about an app or a questionnaire. That is a separate project.
