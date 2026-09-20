# Design notes

Read this before changing the look of the site. It explains the choices so
that edits keep the whole thing coherent.

## The idea

A sound bath happens in the dark and you leave it into daylight. The page does
the same thing. It opens at night, with sage smoke rising and a bowl struck
every so often, and as you scroll it moves through dusk, a lotus-pink dawn, a
kraft-paper board pinned to a wall, pale sage morning mist, and finally
morning light. Cleansing is the theme Lisa gave us (sage and palo santo,
"for cleansing and peace"), and the page enacts it: dark to light, noise to
quiet.

Every section belongs to one of those grounds, and the transitions between
them are gradients rather than hard edges.

## Palette

Placeholder values, chosen to match what Lisa described (sage, palo santo, a
lotus, her instruments), until her own colours are dropped into
`css/theme.css`.

| Token | Value | Role |
| --- | --- | --- |
| `--night` | `#1C1A33` | Deep indigo. The hero. |
| `--dusk` | `#3B2A46` | Plum. Quotes and story. |
| `--lotus` | `#E6AEB4` | Dusty lotus pink. The horizon and the petals of the mark. |
| `--kraft` | `#E8DBC5` | Kraft paper. The vision board. |
| `--mist` | `#E9EEE5` | Pale sage. Instruments, cleansing, the mark. |
| `--morning` | `#F3F5EE` | Morning light. Offerings and contact. |
| `--ember` | `#E2AE63` | Palo santo ember, gold. The accent on dark grounds. |
| `--sage` | `#AEBDA6` | Sage leaf. Rings of the mark, ring text. |

Each accent has a deeper twin (`--ember-deep`, `--sage-deep`, `--lotus-deep`,
`--lotus-ink`) for use on light grounds, so contrast stays readable in both
halves of the page.

## Type

- **Cormorant Garamond** carries the personality: her name, every heading,
  the quotes, the words on the vision board. Its italic is the voice of the
  quotes and of the pull lines.
- **Nunito Sans** does the reading: body copy, navigation, buttons, form
  labels. Soft and round, so the page never feels clinical.

The scale is modular (base 18px, ratio about 1.25) and lives in
`css/theme.css`. Headings are sentence case. There are no uppercase labels,
no numbered markers and no decorative eyebrows.

## Signature shapes

Two shapes repeat so the page feels like one object:

- **The petal** (`--petal`): the portrait frame. An egg-like lotus petal.
- **The leaf** (`--leaf`): every button. Two rounded corners, two tight ones.
  On hover the leaf flips its corners.
- **Rings of sound**: the three arcs under the lotus, the ripple when an
  instrument is tapped, the gold ring when the bowl is struck in the hero,
  and the circular stage each instrument sits on.

## Motion

One orchestrated moment: the mark draws itself, then her name settles in from
wide letter-spacing, then the tagline, then the cue to begin. Everything else
is ambient or answers a touch:

- Sage smoke in the hero (a curl-noise particle field on a canvas). It drifts
  away from the pointer. A gold ring expands every 7 to 13 seconds, like a
  bowl being struck.
- The quote rings turn very slowly in opposite directions.
- Tapping an instrument sends two rings outward and plays a synthesised
  sound.
- The breath circle grows and shrinks on a 4-7-8 count, only when started.

Nothing slides or fades in on scroll. All ambient motion is switched off when
the visitor has reduced motion enabled.

## Layout

One long page. The hero and the quotes are centred (ceremonial symmetry).
Prose sections are left-aligned with a measure of about 62 characters. The
board is a free collage on a six-column grid, each card tilted a degree or
two and taped at the top. Offerings are a ruled list, not cards.

## Things to avoid when editing

- Don't add drop shadows and rounded cards to everything. The board cards are
  the only "objects"; the rest of the page is flat.
- Don't introduce a third typeface.
- Don't put light text on `--kraft`, `--mist` or `--morning`, or dark text on
  `--night` or `--dusk`. Each section carries `data-tone="dark"` or
  `data-tone="light"`, and colours follow from that.
- Keep the hero mostly empty. The smoke and the name are the whole point.
