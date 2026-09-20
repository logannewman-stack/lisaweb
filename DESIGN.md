# Design notes

Read this before changing the look of the site. It explains the choices so
that edits keep the whole thing coherent.

## The idea

The site is Lisa's space. She sent photos of it: a whitewashed brick wall
with a wooden Namaste sign, a navy velvet couch piled with pillows, a pink
velvet chair, chakra prayer flags strung over a big clock, hand-lettered
signs, a paisley chair, a vision board for 2026, and the tattoo on her wrist.
Everything on the page comes from those photos.

You arrive at the wall. The flags are strung across the top and they are the
navigation: seven flags, seven sections, root to crown, in the order they
hang over her clock. Then you sit on the couch: the quotes section is navy
velvet, with the words she keeps around her turning slowly around the centre
and the actual signs from her walls underneath. From there the page walks up
through the chakras, each section tinted faintly with its flag's colour, and
ends back on the velvet.

## Palette

All sampled from her photos. Values live in `css/theme.css`.

| Token | Value | From |
| --- | --- | --- |
| `--wall` | `#F6F4F0` | The whitewashed brick. The page ground. |
| `--velvet` | `#1B2B45` | The navy couch. Quotes and footer. |
| `--blush` | `#E9A296` | The pink velvet chair. |
| `--rose` / `--rose-ink` | `#CC897F` / `#A4574E` | The pink crown sign. Pull quotes, the petals of the mark. |
| `--gold` / `--gold-ink` / `--gold-soft` | `#C9A24B` / `#8A6A22` / `#E7D3A2` | The Namaste letters and the gold frame. |
| `--teal` | `#255862` | The iridescent jar. |
| `--olive` | `#6E7440` | The paisley leaves. The cleansing drawing. |
| `--root` to `--crown` | red, orange, yellow, olive, blue, indigo, lavender | The seven flags. Section tints, the flags in the navigation. |

The flag colours are strong, so they are used small: a flag, a word card on
the board, a six percent tint behind a section. Never as a full ground.

## Type

- **Cormorant Garamond** for her name, headings, the quotes and the captions.
  Its italic is the voice of the quotes.
- **Nunito Sans** for reading: body copy, navigation, buttons, forms.
- **Caveat** only on the vision board, for the words that are hand-lettered
  on the real one. Nowhere else.

The scale is modular (base 18px, ratio about 1.25). Headings are sentence
case. The only uppercase on the site is on the vision board, where it copies
the magazine cut-outs on her real board.

## Signature elements

- **The flags.** A string of seven small flags in the header, a larger string
  across the hero, and a single flag hanging from a thread in front of each
  section heading. They encode which chakra a section belongs to.
- **The mark.** A lotus resting in the crescent moon of her tattoo, with the
  moon's phases along the crescent, the tattoo's eye beneath the flower and
  its rays of dots above.
- **The petal and the leaf.** The lotus-petal frame for the story photo and
  the jar; the leaf shape for every button.
- **The velvet.** One dark ground, used twice: the quotes and the footer.

## Motion

One orchestrated moment on load: the flags swing in and settle, her name
fades in from wide letter-spacing, then the tagline, the button and the
photo. After that, only ambient or user-triggered motion:

- the flags sway a degree and a half, slowly;
- gold dots drift up the velvet and glow near the pointer;
- the quote rings turn, in opposite directions;
- a tapped instrument sends two rings outward and plays a sound;
- the breath circle grows and shrinks on a 4-7-8 count, only when started.

Nothing fades in on scroll. All ambient motion is off under reduced motion.

## Layout

One long page. The hero is two columns: her name on the left, the Namaste
sign on the right. Prose sections are left-aligned with a measure of about
62 characters. Photos sit in three kinds of frame: rounded rectangles, the
lotus petal, and the polaroid-with-tape on the vision board.

## Things to avoid when editing

- Don't use a flag colour as a background for a whole section or a button.
- Don't add a fourth typeface, or use Caveat outside the vision board.
- Don't put dark text on the velvet or light text on the wall. Sections
  carry `data-tone="light"` or `data-tone="dark"` and colours follow.
- Keep the hero to the name, the sign and the flags.
