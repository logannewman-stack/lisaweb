/* =============================================================================
   LISA BRUNSON — SITE CONTENT
   -----------------------------------------------------------------------------
   Everything that repeats on the page lives here. Edit the text, save, refresh.

   REAL: the quotes, the vision board, the photos of her space, the tattoo.
   STILL EXAMPLE: her story (index.html), the offerings, the contact details,
   the instruments (no photos yet) and the captions marked "example".
   ========================================================================== */

window.LISA = {
  name: "Lisa Brunson",
  tagline: "Sound, ceremony, and the slow work of coming home to yourself.",

  /* Placeholders. Replace with Lisa's real details. */
  email: "hello@lisabrunson.com",
  instagram: "lisabrunson",
  location: "Sessions in person and online",

  /* ---------------------------------------------------------------------------
     QUOTES — the words on her walls, her pillows and her vision board.
     The shortest turn around the lotus in two rings; all take turns in the
     centre. Ones with a photo also appear in the "On my walls" gallery.
     ------------------------------------------------------------------------ */
  quotes: [
    { text: "Not all storms come to disrupt your life. Some come to clear your path.", by: "", photo: "assets/photos/quote-storms-800.jpg", alt: "A watercolour painting of a rainbow, sun, trees and flowers with the words Not all storms come to disrupt your life, some come to clear your path", tall: true },
    { text: "Inner peace begins the moment you choose not to allow another person or event to control your emotions.", by: "", photo: "assets/photos/quote-inner-peace-800.jpg", alt: "A weathered metal sign with a lotus flower and the words Inner peace begins the moment you choose not to allow another person or event to control your emotions", tall: true },
    { text: "On the darkest days, when I feel inadequate, unloved and unworthy, I remember that I am the daughter of the King, and I straighten my crown.", by: "", photo: "assets/photos/quote-crown-800.jpg", alt: "A pink hand-lettered sign with a silver crown", tall: true },
    { text: "Listen to your dreams. They're smarter than you are.", by: "", photo: "assets/photos/sign-dreams-800.jpg", alt: "A black wooden sign reading Listen to your dreams, they're smarter than you are", tall: false },
    { text: "Smile, shine, and take it one day at a time.", by: "", photo: "assets/photos/rainbow-smile-800.jpg", alt: "Rainbow brush strokes with the words Smile, shine and take it one day at a time, a butterfly and a smiley face", tall: true },
    { text: "Inhale courage. Exhale fear.", by: "a pillow on the couch" },
    { text: "It is never too late to be what you might have been.", by: "from the vision board" },
    { text: "Find joy every day.", by: "from the vision board" },
    { text: "Move from doing to being.", by: "from the vision board" },
    { text: "Remember to be kind.", by: "from the vision board" },
    { text: "Everything is possible.", by: "from the vision board" },
    { text: "Rediscover you.", by: "the top of the vision board" }
  ],

  /* ---------------------------------------------------------------------------
     VISION BOARD — the words on her real board, "Rediscover you, 2026".
     The board photo is assets/photos/vision-board-2026.jpg.
       face: "serif", "sans" or "hand" (the board mixes cut-out lettering)
       tint: a flag colour for a few of the cards, or empty for paper
     ------------------------------------------------------------------------ */
  board: {
    photo: "assets/photos/vision-board-2026.jpg",
    alt: "Lisa's 2026 vision board: a collage of cut-out words and pictures around the words Rediscover you, 2026, focused and in control",
    caption: "The board on my wall this year.",
    words: [
      { text: "Rediscover you", face: "serif", big: true, tint: "" },
      { text: "2026", face: "serif", big: true, tint: "gold" },
      { text: "Faith", face: "hand", big: true, tint: "" },
      { text: "Find joy every day", face: "sans", tint: "" },
      { text: "It is never too late to be what you might have been", face: "hand", wide: true, tint: "" },
      { text: "Breathe", face: "serif", big: true, tint: "throat" },
      { text: "A healthier happy", face: "sans", tint: "" },
      { text: "Laid-back living", face: "serif", tint: "" },
      { text: "Explore Lake Martin", face: "hand", tint: "" },
      { text: "Focused and in control", face: "sans", tint: "" },
      { text: "Love", face: "serif", big: true, tint: "rose" },
      { text: "Experiences", face: "sans", tint: "" },
      { text: "Garden", face: "serif", tint: "heart" },
      { text: "Travel", face: "sans", tint: "root" },
      { text: "Mind over matter", face: "serif", tint: "" },
      { text: "Remember to be kind", face: "hand", tint: "" },
      { text: "Everything is possible", face: "sans", tint: "crown" },
      { text: "Rise and shine", face: "hand", tint: "solar" },
      { text: "Mindfulness", face: "serif", tint: "" },
      { text: "No bad vibes", face: "sans", tint: "" }
    ]
  },

  /* ---------------------------------------------------------------------------
     HER SPACE — "Come in." Photos of the room where sessions happen.
     Captions are example copy: replace with her own words.
       shape: "wide", "tall", "square"; frame: "petal" for a lotus-petal frame
     ------------------------------------------------------------------------ */
  space: [
    { photo: "assets/photos/couch.jpg", alt: "A navy velvet couch piled with pillows: a rainbow, an evil eye print, a sun and moon, and one that reads Inhale courage, exhale fear", caption: "The navy couch, where every session starts. Usually with tea.", shape: "wide" },
    { photo: "assets/photos/paisley-800.jpg", alt: "A chair covered in bright paisley fabric in magenta, olive and gold", caption: "The paisley chair. Every colour I love, in one piece of fabric.", shape: "tall" },
    { photo: "assets/photos/iridescent-jar-800.jpg", alt: "An iridescent blue glass jar on a slice of wood", caption: "An iridescent jar on a slice of wood, catching the afternoon light.", shape: "square", frame: "petal" },
    { photo: "assets/photos/chakra-flags.jpg", alt: "Seven chakra prayer flags in red, orange, yellow, green, blue, indigo and violet hung above a large wall clock", caption: "Seven flags over the clock, one for each chakra. They are the colours of this site.", shape: "wide" },
    { photo: "assets/photos/rainbow-smile-800.jpg", alt: "Rainbow brush strokes with the words Smile, shine and take it one day at a time", caption: "A reminder I pass every day.", shape: "square" }
  ],

  /* ---------------------------------------------------------------------------
     THE TATTOO — the wrist tattoo whose symbols are drawn into the mark.
     ------------------------------------------------------------------------ */
  tattoo: {
    photo: "assets/photos/tattoo-crop.jpg",
    alt: "Lisa's wrist tattoo: a monogram inside a crescent moon with moon phases, an eye, and rays of dots"
  },

  /* ---------------------------------------------------------------------------
     INSTRUMENTS — example set until her photos arrive.
     Tap one on the site and it plays a sound made in the browser.
       art    bowl, drum, rattle, chimes, flute, tingsha, ocean
       voice  crystal, tibetan, drum, rattle, chimes, flute, tingsha, ocean
       photo  "assets/instruments/your-photo.jpg" to show a photo instead
     ------------------------------------------------------------------------ */
  instruments: [
    { name: "Crystal singing bowl", note: "Clear quartz, tuned near 528 Hz. The first sound in every session.", art: "bowl",    voice: "crystal", photo: "" },
    { name: "Tibetan singing bowl", note: "Hand-hammered brass. Deep, grounding, slow to fade.",               art: "bowl",    voice: "tibetan", photo: "" },
    { name: "Frame drum",           note: "The heartbeat of the room.",                                       art: "drum",    voice: "drum",    photo: "" },
    { name: "Rattle",               note: "Gourd and seed, for clearing a space and calling in.",              art: "rattle",  voice: "rattle",  photo: "" },
    { name: "Koshi chimes",         note: "Tuned to the element of water.",                                   art: "chimes",  voice: "chimes",  photo: "" },
    { name: "Cedar flute",          note: "In the key of A minor, the key of the heart.",                     art: "flute",   voice: "flute",   photo: "" },
    { name: "Tingsha",              note: "Two small cymbals, to open and to close.",                         art: "tingsha", voice: "tingsha", photo: "" },
    { name: "Ocean drum",           note: "Beads over skin. The sound of the tide going out.",                art: "ocean",   voice: "ocean",   photo: "" }
  ],

  /* ---------------------------------------------------------------------------
     SESSIONS — example offerings.
     ------------------------------------------------------------------------ */
  offerings: [
    { name: "Sound bath", length: "75 minutes", who: "Small groups", blurb: "Lie down, be covered in blankets, and let the bowls, chimes and drum do the work. You do nothing but breathe." },
    { name: "One-to-one session", length: "60 minutes", who: "Just you", blurb: "We talk first, in the pink chair. Then sound, placed where it is needed. People leave lighter, and usually quieter." },
    { name: "Cleansing ceremony", length: "90 minutes", who: "Homes, studios, new beginnings", blurb: "Sage and palo santo, sound, and intention, for a space that needs a fresh start or a season that is ending." }
  ]
};
