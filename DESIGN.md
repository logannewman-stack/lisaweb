# Design notes

Read this before changing the look of the site. It explains the choices so
that edits keep the whole thing coherent.

## The idea

Lisa sent photos of her home as a style reference: a whitewashed brick wall,
a navy velvet couch, a pink velvet chair, gold lettering, chakra prayer flags
strung over a clock, hand-lettered signs and a collage vision board. The site
borrows that look and nothing else. It is about her, not her things.

You arrive at a whitewashed wall with a string of seven flags across the top.
The flags are the navigation: seven flags, seven sections, root to crown.
Then the page turns to navy velvet, where the quotes she keeps around her
turn slowly around the centre. From there it walks up through the chakras,
each section tinted faintly with its flag's colour, and ends on the velvet.

## Palette

Sampled from her photos. Values live in `css/theme.css`.

| Token | Value | From |
| --- | --- | --- |
| `--wall` | `#F6F4F0` | Whitewashed brick. The page ground. |
| `--velvet` | `#1B2B45` | Navy velvet. Quotes and footer. |
| `--blush` | `#E9A296` | Pink velvet. |
| `--rose` / `--rose-ink` | `#CC897F` / `#A4574E` | A hand-lettered pink sign. Pull quotes, the petals of the mark. |
| `--gold` / `--gold-ink` / `--gold-soft` | `#C9A24B` / `#8A6A22` / `#E7D3A2` | Gold lettering. |
| `--olive` | `#6E7440` | Paisley leaves. The cleansing drawing. |
| `--root` to `--crown` | red, orange, yellow, olive, blue, indigo, lavender | The seven flags. Section tints, the flags in the navigation. |

The flag colours are strong, so they are used small: a flag, a word card, a
six percent tint behind a section, a step number. Never as a full ground.

## Type

- **Cormorant Garamond** for her name, headings, the quotes, captions and
  testimonials. Its italic is the voice of the quotes.
- **Nunito Sans** for reading: body copy, navigation, buttons, forms.
- **Caveat** only in "What I believe", for the words that would be
  hand-lettered on a real board. Nowhere else.

Headings are sentence case. The only uppercase on the site is on the cut-out
word cards, where it copies magazine lettering. The session steps are
numbered because they are a sequence.

## Signature elements

- **The flags.** A string of seven small flags in the header, a larger string
  across the hero, and a single flag hanging from a thread in front of each
  section heading.
- **The mark.** A lotus resting in the crescent moon of her tattoo, with the
  moon's phases along the crescent, the tattoo's eye beneath the flower and
  its rays of dots above.
- **The petal and the leaf.** The lotus-petal frame for her portrait; the
  leaf shape for every button.
- **Paper.** The at-a-glance card and the word cards sit on paper with a
  slight tilt, like things pinned to a wall.
- **The velvet.** One dark ground, used twice: the quotes and the footer.

## Motion

One orchestrated moment on load: the flags swing in and settle, her name
fades in from wide letter-spacing, then the tagline, the button and the
portrait frame. After that, only ambient or user-triggered motion: the flags
sway a degree and a half; gold dots drift up the velvet and glow near the
pointer; the quote rings turn in opposite directions; the breath circle grows
and shrinks on a 4-7-8 count, only when started. Nothing fades in on scroll.
All ambient motion is off under reduced motion.

## Things to avoid when editing

- Don't use a flag colour as a background for a whole section or a button.
- Don't add a fourth typeface, or use Caveat outside "What I believe".
- Don't put dark text on the velvet or light text on the wall. Sections
  carry `data-tone="light"` or `data-tone="dark"` and colours follow.
- Keep the hero to the name, the portrait and the flags.
