# Design notes: Option 3, good vibes, hand-made

Read this before changing the look. It explains the choices so that edits
keep the whole thing coherent.

## The idea

Everything looks made by hand and pinned up, like the hand-lettered signs,
the rainbow brush-stroke sign and the vision board in the photos Lisa sent.
But it sits on a strict grid, so it reads as designed, never messy. The
colour comes from big painted things on a bright white page. It is about
her, not her home: the only photos are her portraits.

You arrive on "Hi, I'm Lisa Brunson", her name in heavy navy letters over a
painted rainbow, beside her portrait as a polaroid with washi tape and
stickers. Then her quotes as a wall of signs, her story on a journal page,
the words she believes in across a giant rainbow, a session as a winding
path, sage and a minute of breath on a sunny painted block, the oils on a
shelf, kind words on hot pink, her logo annotated by hand, the offerings as
luggage tags, a postcard to say hello, and the navy footer.

## Palette

Values live in `css/theme.css`, each with a note on which text colour is
safe on it.

| Token | Value | Use |
| --- | --- | --- |
| `--paper` | `#FFFDFA` | The page. Keep it white, not cream. |
| `--ink` / `--ink-soft` | `#1B2B45` / `#4A5670` | Her navy velvet: all text, the footer band. |
| `--red` to `--violet` | `#E23B4A` `#F37A2A` `#F7C531` `#3DAA5C` `#2F8FE0` `#4B3BA8` `#A574E0` | The rainbow from her flags and sign: the hero, the values, the stickers. |
| `--pink` | `#F07EA0` | Hot pink: the kind words block, stickers. |
| `--salmon` | `#EE8F84` | The pink crown sign. |
| `--note` / `--sky` / `--mint` | `#FFE16B` / `#8FD0EE` / `#7FD6A8` | Sticky notes. |
| `--kraft` | `#D9B98C` | Tape, the oil shelf. |
| `--gold` | `#C9A24B` | Gold lettering on the velvet pillow. |
| `--pen` | `#D02F62` | Handwritten notes on white. |

Every text colour is checked against the ground it sits on: navy on orange,
yellow, green, pink, sky and kraft; white on red and indigo; red, blue and
violet carry large text only. The white lettering on the rainbow sign has a
navy keyline.

## Type

- **Fraunces**, 800 to 900, with SOFT 100 and WONK 1 for a warm 70s feel:
  her name and the headings.
- **Figtree** for everything you read.
- **Kalam** for handwriting only: the greeting, captions, notes, the logo
  annotations, "Namaste."
- **Bebas Neue** only on the black wooden sign.

Headings are sentence case. No tracked capitals.

## Signature elements

- **The painted rainbow.** Seven rough brush strokes stacked like her sign:
  under her name, as the giant "What I believe" rainbow with words lettered
  on each band, on the quote wall, in the menu and in the footer.
- **Paper objects.** Polaroids with washi tape, sticky notes with pushpins,
  the journal page, the index card, luggage tags, the postcard. They all cast
  one shadow, `--shadow-paper`.
- **Stickers.** A hand-drawn sun, moon, lotus, butterfly and sparkles with a
  die-cut white edge (the `#sticker` filter in `index.html`).
- **The wall of signs.** Each quote on its own kind of sign (`look` in
  `js/content.js`), laid out as a tidy masonry.
- **Painted blocks.** Sunny yellow behind "Sage and palo santo", hot pink
  behind the kind words, navy below the footer edge, all with brushed edges.
- **Hand-drawn lines.** The rainbow scribble under the current menu link,
  the dashed path between the session steps, the arrows to the parts of the
  logo.

## Motion

One entrance on load: the greeting and name rise, the rainbow paints in from
the left band by band, the polaroid drops into place, the tapes stick and the
stickers pop on. After that only gentle ambient motion: the stickers float
and the smoke drifts. The breath circle grows and shrinks when the visitor
starts it. Nothing waits for scrolling, and only transform and opacity
animate. Reduced motion switches all of it off except the breath exercise.

## Things to avoid when editing

- Don't tilt blocks of text. Tilts belong to objects (polaroids, notes,
  signs, the shop sticker), stay at 2 degrees or less on the quote wall, and
  two or three per screen at most.
- Don't put white text on yellow, orange, green or the light colours; follow
  the notes in `css/theme.css`.
- Keep Kalam for handwriting and Bebas Neue for the wooden sign. No fourth
  typeface.
- Keep paint as paint: big brushed shapes on a white page, not a coloured
  background behind everything.
- No photos of her home or her things; only her portraits.
