/* =============================================================================
   LISA BRUNSON — SITE CONTENT
   -----------------------------------------------------------------------------
   Everything that repeats on the page lives here: the quotes, the vision board,
   the instruments and the offerings. Edit the text, save, refresh.

   EVERYTHING IN THIS FILE IS EXAMPLE CONTENT until Lisa's real quotes, photos
   and copy arrive. Lines marked "example" are safe to delete or replace.

   Longer prose (her story, the cleansing text) is in index.html, next to a
   comment that says where each block starts.
   ========================================================================== */

window.LISA = {
  name: "Lisa Brunson",

  /* One line under her name in the hero. */
  tagline: "Sound, ceremony, and the slow work of coming home to yourself.",

  /* Contact details. Placeholders — replace with Lisa's real ones. */
  email: "hello@lisabrunson.com",
  instagram: "lisabrunson",
  location: "Sessions in person and online",

  /* ---------------------------------------------------------------------------
     QUOTES — "Quotes surrounding me at all times."
     The shortest ones are drawn around the lotus in two slow-turning rings.
     All of them take turns in the centre.
     Replace this list with the quotes Lisa sent. Keep `by` empty for a mantra
     or anything unattributed.
     ------------------------------------------------------------------------ */
  quotes: [
    { text: "What you seek is seeking you.", by: "Rumi" },
    { text: "Be still. Stillness reveals the secrets of eternity.", by: "Lao Tzu" },
    { text: "The wound is the place where the light enters you.", by: "Rumi" },
    { text: "Peace comes from within. Do not seek it without.", by: "attributed to the Buddha" },
    { text: "Nature does not hurry, yet everything is accomplished.", by: "Lao Tzu" },
    { text: "The quieter you become, the more you are able to hear.", by: "Rumi" },
    { text: "Where there is love there is life.", by: "Mahatma Gandhi" },
    { text: "Let the beauty of what you love be what you do.", by: "Rumi" },
    { text: "I am safe. I am held. I am home.", by: "a morning mantra" },
    { text: "Gratitude turns what we have into enough.", by: "" }
  ],

  /* ---------------------------------------------------------------------------
     VISION BOARD — "My vision board for the year."
     Each item is pinned to a kraft-paper board with a strip of tape.
       type "image"  a photo. Put the file in assets/vision-board/ and set
                     src: "assets/vision-board/your-photo.jpg". While src is
                     empty, a drawn placeholder (motif) stands in.
                     motifs: sunrise, mountains, bowls, garden, circle, moon, water
       type "word"   one word, set large.
       type "note"   a short line in her own hand.
       w / h         how many columns / rows the item spans (board is 6 wide)
       rot           a small tilt in degrees, like a real pinned card
     ------------------------------------------------------------------------ */
  board: [
    { type: "image", motif: "sunrise",   caption: "Mornings by the ocean",        w: 2, h: 2, rot: -2,  src: "" },
    { type: "word",  text: "Abundance",                                          w: 1, h: 1, rot: 3 },
    { type: "image", motif: "mountains", caption: "A cabin in the mountains",     w: 2, h: 1, rot: 1.5, src: "" },
    { type: "word",  text: "Peace",                                              w: 1, h: 1, rot: -2 },
    { type: "note",  text: "This is the year I say yes to myself.",              w: 2, h: 1, rot: -1 },
    { type: "image", motif: "bowls",     caption: "A studio full of bowls",       w: 2, h: 2, rot: 2,   src: "" },
    { type: "word",  text: "Health",                                             w: 1, h: 1, rot: 2 },
    { type: "image", motif: "garden",    caption: "Herbs from the garden",        w: 1, h: 1, rot: -3,  src: "" },
    { type: "image", motif: "circle",    caption: "A circle of women",            w: 1, h: 1, rot: -1.5, src: "" },
    { type: "word",  text: "Travel",                                             w: 1, h: 1, rot: -2.5 },
    { type: "image", motif: "moon",      caption: "Under a full moon",            w: 1, h: 1, rot: 2.5, src: "" },
    { type: "word",  text: "Rest",                                               w: 1, h: 1, rot: 1.5 },
    { type: "image", motif: "water",     caption: "Time near water, often",       w: 2, h: 1, rot: 1,   src: "" }
  ],

  /* ---------------------------------------------------------------------------
     INSTRUMENTS — "Some of my sound instruments."
     Tap one on the site and it plays a sound made in the browser (no audio
     files needed). To show a real photo instead of the line drawing, put the
     file in assets/instruments/ and set photo: "assets/instruments/bowl.jpg".
       art    which drawing to use: bowl, drum, rattle, chimes, flute, tingsha, ocean
       voice  which sound it makes: crystal, tibetan, drum, rattle, chimes, flute, tingsha, ocean
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
     OFFERINGS — "Work with me."
     ------------------------------------------------------------------------ */
  offerings: [
    {
      name: "Sound bath",
      length: "75 minutes",
      who: "Small groups",
      blurb: "Lie down, be covered in blankets, and let the bowls, chimes and drum do the work. You do nothing but breathe."
    },
    {
      name: "One-to-one session",
      length: "60 minutes",
      who: "Just you",
      blurb: "We talk first. Then sound, placed where it is needed. People leave lighter, and usually quieter."
    },
    {
      name: "Cleansing ceremony",
      length: "90 minutes",
      who: "Homes, studios, new beginnings",
      blurb: "Sage and palo santo, sound, and intention, for a space that needs a fresh start or a season that is ending."
    }
  ]
};
