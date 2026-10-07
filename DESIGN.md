# Design notes

Read this before changing the look of the site. It explains the choices so
that edits keep the whole thing coherent.

## The idea

An evening ceremony under the stars. Lisa sent photos of her home as a style
reference: navy velvet, gold lettering, chakra prayer flags in the full
rainbow, and the symbols of her wrist tattoo (a crescent moon with its phases,
an eye, rays of dots). The site borrows that vocabulary and nothing else. It
is about her, not her things.

The whole page is one night sky. Her portrait stands in a tall arch window,
like a high-end tarot card, with the moon's phases arcing over it, rays of
dots fanning out behind, and a slow glow of jewel light breathing around it.
Her name is set in gold foil either side of the arch. Below, the sections sit
on the same sky, separated only by a small gold crescent between dots. Colour
comes from the jewels, like candlelight through stained glass, never from
painting whole sections.

## Palette

Values live in `css/theme.css`.

| Token | Value | Use |
| --- | --- | --- |
| `--night` | `#0E1628` | The sky. The page ground everywhere. |
| `--velvet`, `--velvet-raised`, `--velvet-deep` | `#1B2B45`, `#24375A`, `#162238` | Navy velvet: cards, panels, the header glass. |
| `--gold`, `--gold-light`, `--gold-deep` | `#D9B46A`, `#F1DCA6`, `#9C7A36` | Hairlines, italic words in headings, small gold text. |
| `--foil` | gradient of the three golds | Her name, gold buttons, "Joy", "Namaste." Only there. |
| `--ivory`, `--ivory-soft` | `#F6EFE3`, 74% ivory | Headings and quotes; reading text. |
| `--ruby` to `--moonstone` | `#E2485E` `#F0873A` `#F5C64A` `#3FBF8A` `#4C8FEA` `#9A63E0` `#CDB8F5` | The seven chakras as jewels: the litany, card windows, gems, halos, glows. |
| `--blush` | `#EFA59A` | The lotus petals of the mark. |
| `--candle` | `#F6A842` | The warm glow beside her name. |

All text is ivory or gold on night or velvet, which keeps every pair above
WCAG AA. Jewel colours are only used for large words, glows and fills.

## Type

- **Bodoni Moda** for her name, headings, quotes, card and offer titles. Its
  italic carries one word in most headings, in gold ("My *story*"), and all
  of her quotes. Below about 40px it is set at a sturdier optical size
  (`"opsz" 18`) so hairlines such as hyphens stay visible.
- **Jost** for reading, navigation, buttons, labels and small details.

Headings are sentence case. Nothing is set in tracked capitals. The session
cards are numbered I to V because they are a real sequence.

## Signature elements

- **The arch.** A round-topped window with straight sides: the hero portrait
  (with a thin gold double frame), the story portrait, the drop cap, the
  session card windows, the sage niche, the kind words, the offer cards, and
  the buttons, which are small arches too.
- **The moon phases.** Seven above the hero arch (full in the middle), one per
  menu link, new to full across the session cards and the at-a-glance list,
  the dots under the kind words, the full cycle in the footer.
- **Rays of dots.** Fanning out behind the hero arch, from her tattoo.
- **The jewels.** The litany of what she believes, each word its own colour;
  the stained-glass card windows; the gems on the offers; the halos behind
  the oil bottles; the emerald-to-sapphire breath orb.
- **The reading.** The mark in a gold medallion with its four meanings laid
  around it like a tarot spread, joined by gold lines.
- **The ornament.** A crescent between dots with hairlines fading out, between
  every section.

## Motion

One orchestrated entrance on load: the glow and rays come up, the arch rises
and the photo settles, the moons appear one by one, her name slides in from
both sides, then the tagline and buttons. After that, only slow ambient
motion: the stars twinkle and drift a little on scroll, the glow breathes,
two lines of quotes drift in opposite directions (pausing on hover), smoke
rises from the palo santo, the featured quote and the kind words change every
few seconds (pausing on hover, focus, and when off screen). The breath orb and
its rings grow and shrink only when started. Only transform and opacity are
animated. With reduced motion, all of it holds still and nothing advances on
its own.

## Things to avoid when editing

- Keep the ground one night sky. Don't give sections their own background
  colours; separate them with the ornament.
- Keep gold foil for the few moments listed above, and jewels for large type,
  fills and glows. Small text stays ivory or gold.
- Don't add a third typeface, tracked capitals, or emoji.
- Keep the hero to the arch, the moons, the rays, the glow, her name and two
  buttons. No other photos of her home or things, no brick or wall textures.
- New colours go in `css/theme.css` as variables, with a note.
