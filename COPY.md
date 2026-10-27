# Strands of Grace: website copy

Every design option uses exactly this copy. Text in [square brackets] is a
placeholder for Lisa to fill in; keep the brackets visible on the site so it is
obvious what still needs her words. Everything else is example copy written in
her voice, to be replaced or approved by her.

What is real: the business name, her name, the tagline, her portrait, her
quotes, the words from her 2026 vision board, the seven colours and their
meanings, the 2017 to 2026 span of her story, her doTERRA shop link, the six
strands of her life (My Roots, My Calling, My Heart, My Growth, My Discovery,
My Becoming), the two candidate story lines, that she is a doTERRA Wellness
Advocate, that her sound ceremony certification is in progress (July), and
her email address, lisa@mystrandsofgrace.com.
Everything else is placeholder.

Structure agreed at the October 2026 meeting: Home, About Me, The Story Behind
Strands of Grace, Wellness Philosophy, Explore Possibilities, Stay Connected.
Lisa's own copy, session details and photoshoot images arrive in November; the
site is built so photos and words can be dropped in without redesign.

---------------------------------------------------------------------------

## Site-wide

- Site name: Strands of Grace
- Founder: Lisa Brunson
- Tagline (in the logo): Your journey begins with you.
- Story line, two versions still being decided (version 1 is the default;
  add ?tagline=2 to the home page address to preview version 2):
  1. Every strand has a story. Every story has a purpose.
  2. Every strand has a story. Together, they share a purpose.
- Heading colour is still being decided: deep plum by default; add
  ?ink=charcoal to any page address to preview charcoal headings for the rest
  of the visit, ?ink=plum to go back.
- Page titles: "Strands of Grace" (home), "About Me | Strands of Grace",
  "Our Story | Strands of Grace", "Wellness Philosophy | Strands of Grace",
  "Explore Possibilities | Strands of Grace", "Stay Connected | Strands of
  Grace", "Page not found, Strands of Grace" (404)
- Meta description: Strands of Grace with Lisa Brunson: sound, ceremony and
  gentle guidance for the journey back to yourself.

### The emblem
- assets/brand/emblem.webp is the emblem shown above "Welcome to Strands of
  Grace". For now it is the lotus from the logo, standing in for the
  celestial woman emblem; replace that one file when the emblem arrives.
  Alt text: The Strands of Grace emblem

### Navigation (same on every page; mark the current page)
- Home (index.html)
- About Me (about.html)
- Our Story (story.html)
- Philosophy (philosophy.html)
- Explore (explore.html)
- Stay Connected (connect.html)
- Shop Oils (https://my.doterra.com/lisabrunson88, new tab, rel="noopener")
- Button: Book a session (connect.html#book)

### Footer (same on every page)
- The full logo
- Your journey begins with you.
- The navigation links again
- Email: lisa@mystrandsofgrace.com (a mailto: link)
- Instagram: Instagram to come
- Location: [City, State] and online
- Shop my oils (the doTERRA link)
- Credentials line: doTERRA Wellness Advocate · [Certification] · [Certification]
- Sign-off: Namaste.
- © 2026 Strands of Grace, Lisa Brunson

### Continue blocks (end of each page, above the footer; eyebrow "Next")
- Home -> About Me. Line: Meet Lisa, and the path that led her here.
- About Me -> Our Story. Line: How Strands of Grace grew, from 2017 to today.
- Our Story -> Wellness Philosophy. Line: What I believe, the seven colours, and the words I keep close.
- Wellness Philosophy -> Explore Possibilities. Line: Sound baths, one-to-one sessions and cleansing ceremonies.
- Explore Possibilities -> Stay Connected. Line: Book a session, see upcoming events, and what's coming soon.
- Stay Connected: none (the page ends with its own sections).

### Old address
- work-with-me.html is retired; vercel.json sends /work-with-me.html and
  /work-with-me to /explore.html.

---------------------------------------------------------------------------

## Home (index.html)

### Hero
- The emblem (assets/brand/emblem.webp), centred, above the heading.
- Heading (h1): Welcome to Strands of Grace
- Intro: Sound, ceremony and gentle guidance with Lisa Brunson, for the
  journey back to yourself.
- Buttons: "Book a session" (connect.html#book), "Meet Lisa" (about.html)
- No portrait in the first screen.

### The origin story (id="origin")
- Heading: Every strand has a story.
- Sub-line: Every story has a purpose. (version 2: Together, they share a purpose.)
- Every life is woven from many strands: the people we love, the seasons we
  walk through, the moments that change us. Strands of Grace is a gentle space
  to slow down, breathe and gather those strands back together, with kindness.
- [How Strands of Grace began, in two or three sentences: 2017, the moment and
  the question that started it all.]
- Whether you are looking for calm, for clarity or simply for a moment that
  belongs to you, you are welcome here.
- Link: Read the story behind Strands of Grace (story.html)
- Her portrait beside it: assets/portraits/lisa-hero.jpg, alt "Lisa Brunson
  smiling on the beach, the ocean behind her"

### Six strands (id="strands")
- Heading: Six strands of a life
- Line: My Roots, My Calling, My Heart, My Growth, My Discovery, My Becoming.
  Six strands, woven into one story.
- The six names, each with its symbol, linking to its chapter
  (about.html#strand-roots, …)
- Link: Follow the six strands (about.html#six-strands)

### Ways to work together (id="ways")
- Heading: Ways to work together
- Sound bath (Small groups, 75 minutes): Lie back, be wrapped in blankets and
  let the sound do the work.
- One-to-one session (Just you, 60 minutes): Time, sound and stillness shaped
  around you and what you need today.
- Cleansing ceremony (Homes and spaces, 90 minutes): Sage, palo santo, sound and
  intention for a space that is ready for a fresh start.
- Each card: Learn more (explore.html#sound-bath, #one-to-one, #cleansing)
- Link: Explore all possibilities (explore.html)

### What's coming (id="coming")
- Heading: What's coming
- Card 1, eyebrow "Events": Wellness days. [Next wellness day: date and place.]
  Link: See events (connect.html#events)
- Card 2, eyebrow "Coming soon": Sound ceremony certification. In progress,
  completing in July. Link: See what's coming (connect.html#coming-soon)

### Kind words (id="kind-words")
- Heading: Kind words
- Intro: What people share after a session.
- "I walked in carrying the whole week and walked out carrying nothing. I have
  never felt so held." (Client name, placeholder)
- "The sound did something my mind could not. I slept properly for the first
  time in months." (Client name, placeholder)
- "Lisa cleansed our new home, and it finally felt like ours." (Client name,
  placeholder)
  The attribution "Client name, placeholder" must stay visible until real
  testimonials replace these.

### Closing (id="closing")
- Heading: Your journey begins with you.
- When you are ready, I would love to walk a little of it with you.
- Button: Book a session (connect.html#book)
- Sign-off: Namaste.

---------------------------------------------------------------------------

## About Me (about.html)

### Hero
- Heading: Hello, I'm Lisa
- Lead: I'm Lisa Brunson, the founder of Strands of Grace.
- Portrait: assets/portraits/lisa-portrait.jpg, alt "Lisa Brunson"

### My background (id="background")
- Heading: My background
- I believe every one of us already carries what we need to heal, to grow and
  to shine. My work is simply to help you remember it.
- [A warm introduction: who you are, where you are from and what you love.]
- [Your path: the work and the experiences that led you to this calling.]
- [What it is like to work with you, and who you love to work with.]

### The six strands of my life (id="six-strands"): the three levels
Level 1 is the six strands themselves (name, colour, symbol). Level 2 is the
short summary that appears on hover or tap. Level 3 is the full chapter below,
with a life photo.
- Heading: The six strands of my life
- Intro: My life has been woven from six strands. Hover over or tap a strand
  to see what it holds, then follow it into the full chapter.
- My Roots. Colour: Soft Peach. Symbol: a seed putting down roots.
  Summary: [Where you come from: the family, the home and the people who shaped you.]
- My Calling. Colour: Soft Lavender. Symbol: a star.
  Summary: [The moment you knew this work was yours to do.]
- My Heart. Colour: Blush Pink. Symbol: a heart held in a lotus.
  Summary: [What you love most, and who you do this work for.]
- My Growth. Colour: Sage Green. Symbol: a leafing branch.
  Summary: [The seasons that stretched you, and what they taught you.]
- My Discovery. Colour: Gentle Teal. Symbol: a crescent moon.
  Summary: [What you found along the way, and how it changed you.]
- My Becoming. Colour: Champagne Gold. Symbol: a rising sun.
  Summary: [Who you are becoming now, and where Strands of Grace is headed.]
- Each summary ends with the link: Read the chapter (#strand-roots, …)

### The chapters (id="chapters"; six articles, id="strand-roots",
### "strand-calling", "strand-heart", "strand-growth", "strand-discovery",
### "strand-becoming")
For each strand, with that strand's word in place of "roots":
- Heading: My Roots
- Life photo: an empty frame with the caption [Photo: a moment from your roots]
  (frames are ready for the October photoshoot images; never use other photos)
- [Your roots in your own words: the heart of the story.]
- [What this strand gave you, and how it shows up in your work today.]
- Link: Back to the six strands (#six-strands)

### At a glance (id="glance")
- Heading: At a glance
- Based in [City, State]
- Practising since [year]
- Sessions in person and online
- Works with [who you work with]

### Credentials (id="credentials"), at the bottom of the page
- Heading: Credentials
- doTERRA Wellness Advocate
- Four entries, each with three parts: [Certification or training],
  [Organisation], [Year]
- In progress: Sound ceremony certification, completing in July.
  Link: See what's coming (connect.html#coming-soon)

### Closing (id="closing")
- Namaste.
- The light in me honours the light in you.
- Link: Read the story behind Strands of Grace (story.html)
- Button: Book a session (connect.html#book)

(What I believe and the quote "Inhale courage. Exhale fear." move to Wellness
Philosophy.)

---------------------------------------------------------------------------

## Our Story (story.html): the story behind Strands of Grace

### Hero
- Heading: The story behind Strands of Grace
- Sub-line: 2017 to 2026
- Lead: Strands of Grace grew one strand at a time. This is the story of how
  it began, how it has changed, and what it means.

### What the name means (id="meaning")
- Heading: What the name means
- The strands: The flowing strands are the threads of a life: separate,
  colourful, and always connected to one another.
- The pearls: A pearl is formed when something difficult is met with patience.
  Each one is a lesson or a moment, strung together with grace.
- The lotus: The lotus rises through muddy water and opens clean and whole, a
  reminder that growth often begins in the dark.
- The seven colours: Seven colours for seven intentions, from love and
  compassion to grace and light. (Link to philosophy.html#colours)

### The journey so far (id="journey"; a timeline, in order)
- Heading: The journey so far
- 2017. Where it began. [How Strands of Grace began: the moment, the question
  or the person that started it all.]
- [Year]. [A turning point]. [What changed, and what you learned.]
- [Year]. [A new chapter]. [What grew, and who joined you along the way.]
- [Year]. [Finding the name]. [How the name Strands of Grace came to be, and
  what it means to you.]
- 2026. Today. [Strands of Grace today: what you offer, who you serve and
  where you are headed.]

### Closing (id="closing")
- Heading: Where your story meets mine
- Your journey begins with you, and you never have to walk it alone.
- Button: Book a session (connect.html#book)

---------------------------------------------------------------------------

## Wellness Philosophy (philosophy.html)

### Hero
- Heading: Wellness philosophy
- Lead: I believe every one of us already carries what we need to heal, to
  grow and to shine. My work is simply to help you remember it.

### In my own words (id="philosophy")
- Heading: In my own words
- [Your wellness philosophy: how you see body, mind and spirit working together.]
- [What healing means to you, and what you hope people carry home after a session.]
- Beside it: the tree of life, rooted below and reaching for the light.

### Seven colours, seven intentions (id="colours")
- Intro: Each petal of the Strands of Grace lotus carries a colour, and each
  colour carries an intention.
- Blush Pink: Love, compassion and kindness (#F2B7D2)
- Soft Lavender: Spirituality, intuition and reflection (#C8B4E8)
- Serenity Blue: Peace, calm and communication (#A7C9EE)
- Gentle Teal: Balance, harmony and renewal (#87D4D1)
- Sage Green: Growth, healing and connection (#B6D7AA)
- Soft Peach: Warmth, creativity and new beginnings (#F6C6A8)
- Champagne Gold: Grace, elegance, light and beauty (#D9B96B)
  (Names and meanings in plum or charcoal text; the colour itself only as a
  shape. Hex codes are never shown as visible text.)

### What I believe (id="believe")
- Heading: What I believe
- Intro: A few words from my vision board for this year.
- Words (real, from her 2026 vision board): Faith, Breathe, Love,
  Mindfulness, Find joy every day, Remember to be kind, Everything is possible,
  Mind over matter, Rise and shine, Rediscover you
- Quote after it: Inhale courage. Exhale fear.

### Words I keep close (id="words")
- Heading: Words I keep close
- Her twelve quotes, all real, unattributed, one at a time with Previous
  quote / Next quote and the "1 of 12" counter:
  1. Not all storms come to disrupt your life. Some come to clear your path.
  2. Inner peace begins the moment you choose not to allow another person or
     event to control your emotions.
  3. On the darkest days, when I feel inadequate, unloved and unworthy, I
     remember that I am the daughter of the King, and I straighten my crown.
  4. Listen to your dreams. They're smarter than you are.
  5. Smile, shine, and take it one day at a time.
  6. Inhale courage. Exhale fear.
  7. It is never too late to be what you might have been.
  8. Find joy every day.
  9. Move from doing to being.
  10. Remember to be kind.
  11. Everything is possible.
  12. Rediscover you.

### A minute for you (id="breathe"; the breathing exercise)
- Heading: A minute for you
- Not ready to book? Take a minute just for you. Breathe in for four, hold for
  seven, and breathe out for eight.
- Button: Begin (becomes Stop while running)
- Live cue with a countdown: Breathe in, Hold, Breathe out. Three rounds.
- When it ends: That was a minute just for you. Carry it with you.

---------------------------------------------------------------------------

## Explore Possibilities (explore.html)

### Hero
- Heading: Explore possibilities
- Lead: Three gentle ways to work together. If you are not sure which is right
  for you, send me a note and we will find it together.

### Offerings (id="offerings"; articles id="sound-bath", "one-to-one",
### "cleansing"; each Book button goes to connect.html?session=sound-bath#book,
### ?session=one-to-one, ?session=cleansing)
- Sound bath. Small groups, 75 minutes. Lie back, be wrapped in blankets and
  let the bowls, chimes and drum do the work. You do nothing but breathe.
- One-to-one session. Just you, 60 minutes. We begin with a conversation. Then
  sound and stillness, shaped around you and what you need today.
- Cleansing ceremony. Homes and spaces, 90 minutes. Sage, palo santo, sound and
  intention for a home, a studio or a season that is ready for a fresh start.
  (Prices: none shown yet.) Each keeps its "Good to know" (see below).

### What a session is like (id="session"; number the steps)
1. Arrive. Come as you are. Shoes off, phone away, tea if you would like it.
2. We talk. A few quiet minutes on what brought you here and what you need
   today.
3. Cleansing. Sage and palo santo to clear the space, and a moment of
   stillness before we begin.
4. Sound. Bowls, chimes and drum, placed where they are needed. You simply
   rest and breathe.
5. Rest. Time to come back slowly. Nobody rushes you out.

### Skills and practices (id="skills")
- Heading: Skills and practices
- Lead: What I bring to every session.
- Sound healing: Singing bowls, chimes and drum, played for rest and release.
- Space clearing: Sage, palo santo and intention for homes and spaces.
- Essential oils: Guidance on choosing and using oils, as a doTERRA Wellness Advocate.
- [Another skill or practice]: [A line about it.]

### The oils I use (id="oils")
- Eyebrow: doTERRA Wellness Advocate
- Heading: The oils I use
- The essential oils I diffuse in every session are the same ones I use at
  home. I share them through doTERRA, and I am always happy to help you choose
  your first few.
- Five oils (descriptions are sensory only, never health claims): Lavender:
  Soft, floral and calming. Frankincense: Warm, grounding and steady. Wild
  Orange: Bright, sweet and uplifting. Peppermint: Cool, crisp and refreshing.
  Eucalyptus: Fresh, clean and clearing.
- Button: Shop my oils (doTERRA link, new tab). Note: Opens my doTERRA shop in
  a new tab.

### Good to know (id="faq"): as in "UX additions" below.

---------------------------------------------------------------------------

## Stay Connected (connect.html)

### Hero
- Heading: Stay connected
- Lead: Book a session, say hello, or see what's coming up. I would love to
  hear from you.

### Begin your journey (id="book")
- Heading: Begin your journey
- Tell me a little about what you are looking for, or simply say hello. I read
  every message myself and reply within a day or two.
- Form fields (keep these ids): Your name (f-name), Your email (f-email),
  Which session? (Sound bath, One-to-one session, Cleansing ceremony, Not sure
  yet), Your message (f-message). Button: Send.
- Form action: https://formspree.io/f/your-form-id (placeholder). While the
  action still contains "your-form-id", the submit must not leave the page:
  show "The booking form will be switched on before launch, so this message
  was not sent." in an aria-live region instead.
- The session choice is preselected from the address (?session=sound-bath,
  one-to-one, cleansing).
- What happens next, the contact lines (lisa@mystrandsofgrace.com as a mailto: link.
  Instagram to come. [City, State] and online.) and every form message: as in "UX
  additions" below.

### Events and wellness days (id="events")
- Heading: Events and wellness days
- Lead: Wellness days, sound baths and gatherings. New dates appear here first.
- Event 1: [Wellness day name]. [Date and time]. [Place]. [A line about the
  day.] Links: About sound baths (explore.html#sound-bath), Explore the oils
  (explore.html#oils)
- Event 2: [Sound bath evening]. [Date and time]. [Place]. [A line about the
  evening.] Link: Book your place (connect.html?session=sound-bath#book)
- More dates to come.

### Coming soon (id="coming-soon")
- Heading: Coming soon
- Lead: Certifications and services I am working towards now.
- Sound ceremony certification. In progress, completing in July.
- [Another certification in progress]. [When it completes.]
- [A future service]. [A line about it.]

### Announcements (id="announcements")
- Heading: Announcements
- [Your latest news, in a sentence or two.] [Date]

---------------------------------------------------------------------------

## UX additions (added October 2026)

### Continue blocks (superseded: see "Continue blocks" in the page structure above)

### Offerings, "Good to know"
Sound bath
- Who it is for: Anyone who needs to rest deeply. No experience needed.
- What to bring: Comfortable clothes. Blankets are provided.
- Where: [Venue or area].

One-to-one session
- Who it is for: You, when you want time shaped entirely around what you need today.
- What to bring: Just yourself. We begin with a conversation.
- Where: [Venue or area], or online.

Cleansing ceremony
- Who it is for: A home, a studio or a season that is ready for a fresh start.
- What to bring: Nothing. I bring the sage, the palo santo and the sound.
- Where: At your space, in [area]. [Travel details to come.]

### Good to know (FAQ, id="faq")
Heading: Good to know
Lead: A few things people often ask before their first session.
1. Do I need any experience?
   No. Come exactly as you are. Everything is explained as we go, and there is no right or wrong way to receive sound.
2. What should I wear?
   Something comfortable that you can rest in. You will be lying down or seated for most of a session.
3. Where do sessions happen?
   [Venue or area], and one-to-one sessions can also be held online.
4. What does it cost?
   [Prices to come.] Payment details are shared when we confirm your session.
5. What if I need to cancel?
   [Cancellation policy to come.]
6. Can I give a session as a gift?
   [Gift sessions: yes or no, and how to arrange one.]

### Booking form
- Legend line: Fields marked * are required.
- Session group label: Which session? (unchanged) with hint: Choose one. You can change your mind later.
- Message hint: A few words is plenty.
- Validation: Please add your name. / Please add an email address I can reply to. / Please add a short message.
- Sending: Sending...
- Success heading: Thank you.
- Success text: Your message is on its way, and I will reply within a day or two.
- Error: Something went wrong and your message was not sent. Please try again, or email me directly.
  ("email me directly" is a mailto: link to lisa@mystrandsofgrace.com)
- Guard (unchanged): The booking form will be switched on before launch, so this message was not sent.

### What happens next
Heading: What happens next
1. Send your note.
2. I reply within a day or two.
3. We find a time that suits you.

### Controls
- Phone bar button: Book a session
- Back to top: Back to top (aria-label)
- Carousel: Previous quote / Next quote / counter "1 of 12" (Words I keep close); Previous / Next (Kind words)

### 404 page
- Title: Page not found, Strands of Grace
- Heading: This strand leads nowhere.
- Text: The page you were looking for is not here, or it has moved. Let's take you somewhere kinder.
- Buttons: Home / Explore possibilities (explore.html)
