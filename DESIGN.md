# Option B: Watercolour bloom

Lisa chose this option; it is served at www.mystrandsofgrace.com.

## Concept
A watercolour journal. The site borrows the language of Lisa's logo, with its
painted petals, gold swashes and strand of pearls, and lets it run softly through
every page. The paint is real watercolour, not a blur: washes have ragged wet
edges, pigment pooled darker along the rim, granulation inside and a soft bleed
beyond the edge, and where two colours overlap a third appears. Gold is kept to
fine lines, pearls and calligraphic swashes that echo the loops in the logo, and
a quiet celestial layer (fine stars, a crescent moon, a sun). Ivory and cream do
most of the work, so the colour stays gentle, never loud.

## Structure (agreed in October 2026)
Six pages and a 404, each ending in a continue block that hands on to the next:

| Page | Sections (ids) |
| --- | --- |
| Home `index.html` | hero (the emblem above "Welcome to Strands of Grace"), `origin`, `strands`, `ways`, `coming`, `kind-words`, `closing` (Namaste), continue to About Me |
| About Me `about.html` | hero, `background`, `six-strands`, `chapters`, `glance`, `credentials`, `closing` (Namaste), continue to Our Story |
| Our Story `story.html` | hero, `meaning`, `journey`, `closing`, continue to Wellness Philosophy |
| Wellness Philosophy `philosophy.html` | hero, `philosophy` (with the tree of life), `colours`, `believe` (and "Inhale courage."), `words`, `breathe`, continue to Explore |
| Explore Possibilities `explore.html` | hero, `offerings`, `session`, `skills`, `oils`, `faq`, continue to Stay Connected |
| Stay Connected `connect.html` | hero, `book`, `events`, `coming-soon`, `announcements` (no continue block) |

Every "Book a session" goes to `connect.html#book`; an offering's Book button to
`connect.html?session=<key>#book`. `work-with-me.html` is retired and
`vercel.json` redirects it to Explore.

## Palette in use
All colours are tokens in `css/theme.css`, under her names and HEX codes.
- **Grounds:** Warm Ivory for most sections, Soft Cream for every other band,
  and `--blush-pale` (#FCEFF3, a pale tint of her Blush Pink) for the "gold over
  pink" bands. Gentle SVG waves join them, and a thin gold line follows each
  wave (`.section--cream`, `.section--blush` and the footer add both).
- **Text:** headings and display lines take their colour from one property,
  `--heading` (Deep Plum; `?ink=charcoal` switches it to Charcoal). Links and
  button labels stay Deep Plum, body text Charcoal, `--ink-soft` (#5E5566) for
  small notes. Nothing else carries text. On pale blush: plum 7.7:1, charcoal
  10.8:1, ink-soft 6.3:1.
- **Leading washes:** blush and peach, with lavender. Blue, teal and sage as
  touches inside a bloom, and in the six strands where each strand has its own
  colour.
- **Gold:** strands, swashes, pearl rims, icons, hairlines, stars, moon and sun.
  Never text.
- **Buttons:** `.btn--bloom` is a blush-to-peach fill with a gold hairline inset
  and plum text (5.1:1 at its darkest point). `.btn--quiet` is ivory with a gold
  hairline.
- Washes never sit under small body text. Large headings may cross a wash;
  every wash under a heading stays translucent enough for plum to hold 4.5:1.

## Type
- **Marcellus** (headings, quotes, names): Roman inscription letters that echo
  the logo. Sentence case, `text-wrap: balance`, colour `--heading`.
- Section headings are `--step-3`; page titles `--step-4`; the story title
  `--step-5`. The home h1 is `clamp(2.5rem, 1.6rem + 3.6vw, 4.6rem)`.
- **Nunito Sans** (body, UI): body text 17 to 18 px on a 58ch measure, bold for
  buttons, labels and the small eyebrows ("Next", "Events").
- **Pinyon Script**, only for her greeting and sign-offs: "Hello," on About, and
  "Namaste." (the home closing, the About closing, the footer). Do not add more.

## The watercolour kit
The shared SVG kit (gradients, filters, masks, symbols) sits at the top of
`<body>` on every page, byte for byte the same, as do the header, the footer and
the small script in `<head>`. Edit them on `index.html`, then copy them to the
other pages (the 404 uses root-relative links; the current page's nav links
carry `aria-current="page"`).

- **`#f-paint`**, the wash filter: `feTurbulence` + `feDisplacementMap` give the
  ragged wet edge; an eroded, blurred copy subtracted from the shape gives the
  pooled rim, darkened and saturated; two noise layers (granulation and a large
  mottle) are multiplied into the body; a blurred, faint copy underneath is the
  bleed. **`#f-stroke`** does the same for a loaded flat brush, with bristle
  streaks. **`#f-drop`** is the small version (drops, pearls, labels).
- **Wash silhouettes** `#s-wash-a`, `-b`, `-c`: lobed closed curves in a
  1000-unit box, painted with `#f-paint`, coloured through `class="c-blush"` and
  friends or `color`. Layer two or three with `class="mul"` (multiply) and new
  colours appear where they meet. Keep them close to square.
- **`.bloom`**, the wet-in-wet underlayer: layered radial gradients, blurred,
  with granulation multiplied in through a tiled noise mask (`--grain-mask`).
- **Symbols:** the six strands as fine gold lines, `#s-sym-roots` (a seed putting
  down roots), `-calling` (a star), `-heart` (a heart held in a lotus), `-growth`
  (a leafing branch), `-discovery` (a crescent moon and a star), `-becoming` (a
  rising sun); and the celestial `#s-star` (a four-point sparkle), `#s-moon`,
  `#s-sun`. Draw them with `<svg class="sym">`: stroke colour and width come
  from CSS, so they stay fine at any size.
- **Paper:** a fixed cold-pressed texture at 7% over everything.
- **Performance:** filters are shared definitions. Each page paints roughly
  twelve to twenty-one large filtered shapes plus a few small drops (home 21,
  About 18, Philosophy 14); drifting and twinkling animate only `transform` and
  `opacity`, so filtered layers rasterise once. Paint layers that spill past
  their box set `max-width: none` (the base rule caps SVGs at 100%).

## Signature elements
- **Swashes:** `#s-swash-long`, `-long-r`, `-flourish`, `-arc`, `-arc-r`,
  `-wave`: filled calligraphic shapes, thick and thin like a nib, with a
  teardrop loop. The long swash runs along the home hero and the page heroes;
  the flourish sits under section headings and chapter titles.
- **Home hero:** the emblem (`assets/brand/emblem.webp`) centred on plain ivory
  above the h1 "Welcome to Strands of Grace", the intro and two buttons. The
  emblem is sized by width and capped in height (`object-fit: contain`), so a
  replacement of any proportions fits; the stand-in's cropped sides dissolve
  through a soft horizontal mask (remove it if the real emblem needs its edges).
  Paint frames the hero from the corners, petals drift, a few stars twinkle.
  No portrait in the first screen.
- **Petal portraits:** `clip-path: url(#clip-petal)` with a gold outline, washes
  and a bloom behind, the gold arc swash around. Her beach portrait sits beside
  the origin story on Home; the close portrait in the About hero.
- **Cards** (`.card`): a painted brush stroke across the top, clipped by the
  paper's edge, a wavy gold hairline beneath. Used for the ways to work
  together, the offerings, the What's coming events card and the events.
- **Pearls** (`.pearl`, `#s-pearl`): hot highlight, blush reflection, rim light,
  gold edge, contact shadow.
- **Home six strands teaser:** six drops in the strand colours, each with its
  gold symbol, strung on a gold line that passes through them; each links to
  its chapter on About.

## The celestial layer
Moon, sun and stars, sparing and still. `.sky` holds a few `#s-star` sparkles
(`--x`, `--y`, `--s`, and `--t`/`--d` for a very slow twinkle of opacity and
scale, five to ten seconds; nothing else moves, and the twinkle stops under
reduced motion; `.sky__star--wide` ones hide on phones). They sit in the home
hero, around the crown of the tree of life, the page hero of Philosophy, the
closings and Coming soon. The crescent moon and the sun flank "Namaste.", mark
the "Coming soon" card and the certification in progress, and close the
footer's sign-off; the moon phases mark the Coming soon items (a waxing gibbous
for the certification completing in July, a crescent, a new moon with a star).

## Gold over pink
`.section--blush` (and `.card--blush`, `.creds__progress`) puts a pale blush
ground under gold linework: gold wave edges, a gold double rule inside cards,
the flourish, moon, sun and stars. Used for the two Namaste closings (Home,
About), Coming soon on Stay Connected, the "Coming soon" card on Home and the
certification note in Credentials. Text on blush stays plum or charcoal; gold is
only lines and ornaments. Two soft blooms (`.bloom--blush-a`, `-b`) give the
closings depth.

## The six strands (About Me): three templates
Level 1 is the six strands (name, colour, symbol); level 2 a short summary with
"Read the chapter"; level 3 the chapters below. Lisa is choosing between three
templates of level 1 and 2, all in this language; `?strands=tree|arches|pearls`
on the About address previews one for the visit. Only one is ever on the page:
the tree is the markup (and what shows without JavaScript), the other two wait
inert in `<template>` elements inside `#six-strands`, and `js/site.js` swaps the
chosen one in, so there is always one `#six-strands`, six `[data-strand]`
buttons and six `[data-strand-summary]` panels. Strand colours: Roots Soft
Peach, Calling Soft Lavender, Heart Blush Pink, Growth Sage Green, Discovery
Gentle Teal, Becoming Champagne Gold.

- **The tree of life (default).** A painted tree: six gold strands rise from the
  roots, braid into one trunk and fan out into the branches (the six strands of
  a life woven into one tree; filled ribbons, thick in the trunk and fine at the
  tips like a nib), with small translucent leaves, pearls at the branch tips, a
  crown of overlapping washes (lavender, sage, teal, blush, peach), a rising sun
  behind the crown, a crescent moon among the leaves and a peach wash in the
  earth. Six nodes sit where each strand belongs: Roots in the roots, Calling
  at the base of the trunk, Heart at its heart, Growth on the branches,
  Discovery among the leaves beside the moon, Becoming in the crown with the
  sun. Each node is a drop of its colour with its symbol on an ivory disc and a
  name tag; the open one grows, gains a gold ring and sends out a gold ripple.
  The summary panel (a paper card with the strand's wash in a corner, its
  colour named) sits beside the tree, below it on phones. Hover (after 120 ms,
  so passing over changes nothing), click, tap, Enter or Space open a strand;
  arrow keys move up and down the tree, Home and End jump, Escape returns to My
  Roots. Buttons expose `aria-expanded` and `aria-controls`; the panel is
  `aria-live="polite"`. The art (`svg.tree__art`, 600 x 720) is generated
  geometry: keep its copies on About and Philosophy identical.
- **Arches.** Six arched cards, 3 x 2 (2 columns on phones). The front: a gold
  rule following the arch, a pearl at its apex, a glow of the strand colour in
  the arch, the symbol on a drop of colour inside a painted bloom, the name.
  Hover, focus, tap, Enter or Space turn the card (a 3D turn where supported, a
  cross-fade otherwise, instant under reduced motion) to show the name, summary
  and Read the chapter; one card open at a time; Escape or a tap on the back
  turns it back. The focus ring sits on the arch itself.
- **Pearls.** Six large watercolour pearls (a painted circle in the strand
  colour under a pearl sheen and gold rim) hung on a draped double gold strand,
  as a tablist (all six reachable with Tab). Hover, click, tap, Enter or Space
  select; the chosen pearl lifts and glints (a gold star). The paper panel below
  shows the name, colour, summary and Read the chapter, with Previous, Next and
  "1 of 6". Arrow keys, Home and End move; Escape returns to My Roots. On phones
  the pearls hang in two strands of three.

## The chapters
`#chapters` holds six `<article id="strand-…">` spreads: a framed photo beside
the words, alternating sides. The frame is an ivory mat with a gold double rule,
a pearl at the top and a pale wash of the strand's colour inside, the strand's
symbol in the middle and the bracketed caption beneath; portrait frames (4:5)
and landscape frames (3:2) alternate. A painted wash and a soft glow of the
strand colour sit behind each frame. Drop a photo in as an `<img>` inside
`.frame` (it is placed and cropped to the window by CSS). Then the chapter
symbol, the title, the flourish, two paragraphs and "Back to the six strands".

## The tree of life (Philosophy)
`[data-tree-of-life]` beside "In my own words": the same art as the six strands,
without the nodes, with its twinkling stars; `role="img"` with a short label.

## Previews (two open decisions, and the six strands)
The small script in each page's `<head>` runs before anything paints. It reads
`?ink=charcoal|plum`, `?tagline=1|2` and `?strands=tree|arches|pearls`, keeps
the choice in `sessionStorage` (wrapped in try/catch, so a blocked storage only
loses the memory) and sets `ink-charcoal`, `tagline-2` or `strands-arches` /
`strands-pearls` on `<html>`. Headings flip through `--heading`; the story line
under "Every strand has a story." swaps between its two spans (version 1 by
default and without JavaScript). None of these is linked from the site.

## Motion
- The home hero entrance, about 1.2 s: the emblem settles from 0.97 and fades
  in, the heading rises 10px, then the intro and the buttons; the corner washes
  spread, the swash and petals fade up, the stars fade in last.
- Ambient: blooms drift (50 to 70 s), petals drift, the seven drops bob, stars
  twinkle. Selecting a strand: a gold ripple (tree), a glint (pearls), a turn
  (arches); summaries cross-fade, but only after the first frame.
- Only `transform` and `opacity` animate. Under `prefers-reduced-motion`
  everything is still and every state change is instant.

## Flow and interaction
- **Continue blocks** (`.continue`, wrapper `data-continue`): a strand with one
  pearl, "Next", the next page's name as a large link with a growing gold
  underline, one line.
- **Header:** seven links and the Book button on one line from 1088px (type stays
  15.4px; the gutter and gaps tighten); below that the phone menu, which lists
  them all with Book a session, focus trapped, Escape closes.
- **Phone booking bar**, **back to top**, **reading progress**, **scroll
  reveal**, **hover/pressed/focus** (one 2px gold ring offset 3px), the **FAQ**
  accordion, **Good to know** details, the **quotes** and **kind words**
  carousels, **session cards** and **form states**: as before. On Stay
  Connected "Book a session" scrolls to the form in place; the events' "Book
  your place" picks the sound bath card.
- **Booking form:** with the placeholder Formspree id the guard notice shows;
  with a real id it posts in the background; if sending fails, "or email me
  directly" in the error is a link to lisa@mystrandsofgrace.com.
- **Footer:** the full logo, the tagline, "Namaste." with a crescent moon, the
  links, her email (a mailto link), Instagram to come, place, Shop my oils, and
  the credentials line beside the copyright.
- **404:** the same header and footer, a loose strand with a dropped pearl,
  buttons Home and Explore possibilities. Its links are root-relative.

## Things to avoid when editing
- Pastel or gold text, or small text over the dense middle of a wash.
- Giving each section its own colour. Every bloom mixes two or three colours.
- Stretching, recolouring or cropping the logo, or placing it on a wash.
- More script type, uppercase labels or letter-spaced eyebrows.
- More than about twenty large filtered washes on a page.
- New fonts or libraries. No build step is needed or wanted.
- Images from `assets/source`. They are never deployed.
- Anything about an app, a questionnaire or a chatbot: a separate project.
