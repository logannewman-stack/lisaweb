/* =============================================================================
   LISA BRUNSON — SITE CONTENT
   -----------------------------------------------------------------------------
   Everything that repeats on the page lives here. Edit the text, save, refresh.
   ALL OF THIS IS PLACEHOLDER TEXT until Lisa's own words arrive, except the
   quotes, which are the ones she sent, and the shop link, which is real.
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
     QUOTES — the ones Lisa sent, as a wall of hand-made signs, in this order.
       look  which sign it is painted on:
             "wood"     black wooden sign, tall white capitals
             "salmon"   pink painted board, hand-lettered, with a little crown
             "rainbow"  rainbow brush strokes with white lettering
             "plaque"   weathered olive metal plaque, ornate italic
             "sky"      watercolour sky with a little rainbow, blue handwriting
             "pillow"   navy velvet pillow, gold lettering
             "note"     a sticky note (best for short ones; they pair up)
     Leave `by` empty for an unattributed line.
     ------------------------------------------------------------------------ */
  quotes: [
    { text: "Inner peace begins the moment you choose not to allow another person or event to control your emotions.", by: "", look: "wood" },
    { text: "Find joy every day.", by: "", look: "note" },
    { text: "Remember to be kind.", by: "", look: "note" },
    { text: "On the darkest days, when I feel inadequate, unloved and unworthy, I remember that I am the daughter of the King, and I straighten my crown.", by: "", look: "salmon" },
    { text: "Smile, shine, and take it one day at a time.", by: "", look: "rainbow" },
    { text: "Move from doing to being.", by: "", look: "note" },
    { text: "Everything is possible.", by: "", look: "note" },
    { text: "Listen to your dreams. They're smarter than you are.", by: "", look: "note" },
    { text: "Rediscover you.", by: "", look: "note" },
    { text: "Not all storms come to disrupt your life. Some come to clear your path.", by: "", look: "sky" },
    { text: "It is never too late to be what you might have been.", by: "", look: "plaque" },
    { text: "Inhale courage. Exhale fear.", by: "", look: "pillow" }
  ],

  /* ---------------------------------------------------------------------------
     WHAT I BELIEVE — placeholder words, lettered on the seven bands of the
     painted rainbow, in order, two or three to a band.
       face: "serif", "sans" or "hand"
       big:  true for a larger word
       tint: not used by this design (each band sets its own colour)
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
     ------------------------------------------------------------------------ */
  steps: [
    { name: "Arrive", text: "Come as you are. Shoes off, phone off, tea if you want it. The diffuser is already going." },
    { name: "We talk", text: "A few minutes on what brought you here and what you need today. Nothing is too small." },
    { name: "Cleansing", text: "Sage and palo santo to clear the room, and you. A moment of quiet before the sound begins." },
    { name: "Sound", text: "Bowls, chimes and drum, placed where they are needed. You lie down, get covered in blankets, and breathe." },
    { name: "Rest", text: "Time to come back slowly. Nobody rushes you out." }
  ],

  /* ---------------------------------------------------------------------------
     THE OILS — the bottles on the shelf in "The oils I use".
     Placeholder picks and notes: replace with the oils Lisa actually uses.
       colour  the bottle's sticker label: red, orange, yellow, green, blue,
               indigo, violet, pink, sky, mint
     ------------------------------------------------------------------------ */
  oils: [
    { name: "Lavender",     note: "For sleep, and for the end of a long day.",        colour: "violet" },
    { name: "Frankincense", note: "The one I reach for first. Grounding and steady.", colour: "yellow" },
    { name: "Wild orange",  note: "Sunshine in a bottle. Diffused before every group.", colour: "orange" },
    { name: "Peppermint",   note: "A clear head and an open breath.",                 colour: "mint" },
    { name: "Eucalyptus",   note: "For the room, and for a cold.",                    colour: "sky" }
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
     SESSIONS — placeholder offerings, shown as luggage tags.
     ------------------------------------------------------------------------ */
  offerings: [
    { name: "Sound bath", length: "75 minutes", who: "Small groups", blurb: "Lie down, be covered in blankets, and let the bowls, chimes and drum do the work. You do nothing but breathe." },
    { name: "One-to-one session", length: "60 minutes", who: "Just you", blurb: "We talk first. Then sound, placed where it is needed. People leave lighter, and usually quieter." },
    { name: "Cleansing ceremony", length: "90 minutes", who: "Homes, studios, new beginnings", blurb: "Sage and palo santo, sound, and intention, for a space that needs a fresh start or a season that is ending." }
  ]
};
