/* =============================================================================
   LISA BRUNSON — SITE CONTENT
   -----------------------------------------------------------------------------
   Everything that repeats on the page lives here. Edit the text, save, refresh.
   ALL OF THIS IS PLACEHOLDER TEXT until Lisa's own words arrive, except the
   quotes, which are the ones she sent, and the shop, which is real.

   Colours are named after jewels: ruby, carnelian, citrine, emerald,
   sapphire, amethyst, moonstone, blush, gold. The chakra names (root, sacral,
   solar, heart, throat, third, crown) work too and map to the same jewels.
   ========================================================================== */

window.LISA = {
  name: "Lisa Brunson",
  tagline: "Sound, ceremony, and the slow work of coming home to yourself.",

  /* Placeholders. Replace with Lisa's real details. */
  email: "hello@lisabrunson.com",
  instagram: "lisabrunson",
  location: "Sessions in person and online",

  /* Her doTERRA shop. Real. */
  shop: {
    url: "https://my.doterra.com/lisabrunson88",
    label: "Shop my oils",
    note: "Opens my doTERRA shop in a new tab."
  },

  /* ---------------------------------------------------------------------------
     QUOTES — the ones Lisa sent. They drift across the sky in two lines, and
     take turns in the middle, one at a time. Leave `by` empty for an
     unattributed line.
     ------------------------------------------------------------------------ */
  quotes: [
    { text: "Not all storms come to disrupt your life. Some come to clear your path.", by: "" },
    { text: "Inner peace begins the moment you choose not to allow another person or event to control your emotions.", by: "" },
    { text: "On the darkest days, when I feel inadequate, unloved and unworthy, I remember that I am the daughter of the King, and I straighten my crown.", by: "" },
    { text: "Listen to your dreams. They're smarter than you are.", by: "" },
    { text: "Smile, shine, and take it one day at a time.", by: "" },
    { text: "Inhale courage. Exhale fear.", by: "" },
    { text: "It is never too late to be what you might have been.", by: "" },
    { text: "Find joy every day.", by: "" },
    { text: "Move from doing to being.", by: "" },
    { text: "Remember to be kind.", by: "" },
    { text: "Everything is possible.", by: "" },
    { text: "Rediscover you.", by: "" }
  ],

  /* ---------------------------------------------------------------------------
     WHAT I BELIEVE — placeholder words, set as a litany in jewel colours.
       big:  true sets the word larger
       tint: a jewel or chakra name, "glitter" for gold foil, or "" to let the
             page pick the next of the seven chakra jewels
       face: kept for compatibility; in this design the words simply
             alternate roman and italic
     ------------------------------------------------------------------------ */
  values: [
    { text: "Faith", face: "hand", big: true, tint: "" },
    { text: "Breathe", face: "serif", big: true, tint: "throat" },
    { text: "Kindness", face: "sans", tint: "" },
    { text: "Rest is not a reward", face: "hand", tint: "" },
    { text: "Joy", face: "serif", big: true, tint: "glitter" },
    { text: "Courage", face: "sans", tint: "root" },
    { text: "Trust the timing", face: "serif", tint: "" },
    { text: "Gratitude", face: "hand", tint: "solar" },
    { text: "Balance", face: "sans", tint: "third" },
    { text: "Light", face: "serif", tint: "rose" },
    { text: "Community", face: "sans", tint: "heart" },
    { text: "Patience", face: "hand", tint: "" },
    { text: "Presence over perfection", face: "serif", tint: "" },
    { text: "Love", face: "serif", big: true, tint: "rose" },
    { text: "Play", face: "hand", tint: "crown" },
    { text: "Wonder", face: "sans", tint: "gold" },
    { text: "Good vibes only", face: "hand", big: true, tint: "" },
    { text: "Rise and shine", face: "sans", tint: "solar" }
  ],

  /* ---------------------------------------------------------------------------
     A SESSION — what to expect, in order. Placeholder text.
     Each step is a card, numbered I to V; the moon on it fills from new to
     full. `jewel` colours the card's window.
     ------------------------------------------------------------------------ */
  steps: [
    { name: "Arrive", jewel: "carnelian", text: "Come as you are. Shoes off, phone off, tea if you want it. The diffuser is already going." },
    { name: "We talk", jewel: "ruby", text: "A few minutes on what brought you here and what you need today. Nothing is too small." },
    { name: "Cleansing", jewel: "emerald", text: "Sage and palo santo to clear the room, and you. A moment of quiet before the sound begins." },
    { name: "Sound", jewel: "sapphire", text: "Bowls, chimes and drum, placed where they are needed. You lie down, get covered in blankets, and breathe." },
    { name: "Rest", jewel: "amethyst", text: "Time to come back slowly. Nobody rushes you out." }
  ],

  /* ---------------------------------------------------------------------------
     THE OILS — the bottles on the shelf under "The oils I use".
     Placeholder picks and notes: replace with the oils Lisa actually uses.
       colour: the label and the halo behind the bottle (a jewel name)
     ------------------------------------------------------------------------ */
  oils: [
    { name: "Lavender",     note: "For sleep, and for the end of a long day.",        colour: "amethyst" },
    { name: "Frankincense", note: "The one I reach for first. Grounding and steady.", colour: "citrine" },
    { name: "Wild orange",  note: "Sunshine in a bottle. Diffused before every group.", colour: "carnelian" },
    { name: "Peppermint",   note: "A clear head and an open breath.",                 colour: "emerald" },
    { name: "Eucalyptus",   note: "For the room, and for a cold.",                    colour: "sapphire" }
  ],

  /* ---------------------------------------------------------------------------
     KIND WORDS — placeholder testimonials. Replace with real ones.
     ------------------------------------------------------------------------ */
  testimonials: [
    { text: "I walked in carrying the whole week and walked out carrying nothing. I have never felt so held.", by: "A client, placeholder" },
    { text: "The bowls did something my mind could not. I slept properly for the first time in months.", by: "A client, placeholder" },
    { text: "Lisa cleansed our new home and it finally felt like ours.", by: "A client, placeholder" }
  ],

  /* ---------------------------------------------------------------------------
     SESSIONS — placeholder offerings. Each is an arched card; `jewel` is the
     gem at the top of its arch.
     ------------------------------------------------------------------------ */
  offerings: [
    { name: "Sound bath", jewel: "ruby", length: "75 minutes", who: "Small groups", blurb: "Lie down, be covered in blankets, and let the bowls, chimes and drum do the work. You do nothing but breathe." },
    { name: "One-to-one session", jewel: "sapphire", length: "60 minutes", who: "Just you", blurb: "We talk first. Then sound, placed where it is needed. People leave lighter, and usually quieter." },
    { name: "Cleansing ceremony", jewel: "amethyst", length: "90 minutes", who: "Homes, studios, new beginnings", blurb: "Sage and palo santo, sound, and intention, for a space that needs a fresh start or a season that is ending." }
  ]
};
