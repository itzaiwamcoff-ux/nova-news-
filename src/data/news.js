// Nova News - Sample Article Data
// Each article has realistic content for demonstration

export const CATEGORIES = [
  { id: 'all', label: 'All', icon: 'sparkles' },
  { id: 'game', label: 'Game', icon: 'device-gamepad-2' },
  { id: 'tech', label: 'Tech', icon: 'microchip' },
  { id: 'science', label: 'Science', icon: 'rocket' },
  { id: 'business', label: 'Business', icon: 'chart-bar' },
  { id: 'entertainment', label: 'Entertainment', icon: 'movie' },
  { id: 'sports', label: 'Sports', icon: 'ball-football' },
]

export const articles = [
  {
    id: 1,
    title: 'The Next Generation of Gaming Consoles Is Almost Here',
    excerpt: 'Major hardware announcements from all three console manufacturers suggest we are entering a new era of gaming performance and immersive experiences.',
    content: `The gaming industry stands at the precipice of its most significant hardware transition in nearly a decade. Sources close to all three major console manufacturers confirm that next-generation hardware is further along than previously disclosed.

Sony's upcoming PlayStation iteration is rumored to feature a custom AMD chipset capable of real-time ray tracing at 4K 120fps, with a dedicated AI upscaling unit that rivals NVIDIA's DLSS technology. The console is said to include 2TB of SSD storage, virtually eliminating load times.

Microsoft is taking a different approach with its next Xbox, focusing on cloud integration and backward compatibility. The console will reportedly function as a local hub for Xbox Cloud Gaming, allowing seamless switching between local and streaming gameplay. The hardware specifications include a novel cooling system that promises silent operation even under maximum load.

Nintendo continues to chart its own course. The successor to the Switch is expected to launch with a significant technological leap while maintaining the hybrid portable-home console form factor. Developers who have seen early kits describe the device as "surprisingly powerful for its size" with DLSS-like upscaling capabilities.

All three consoles are expected to launch within a twelve-month window beginning late next year, setting up the most competitive console landscape in gaming history.`,
    image: 'https://picsum.photos/seed/gaming-console/800/500.webp',
    category: 'game',
    author: 'Alex Chen',
    date: '2026-06-15',
    readTime: '5 min',
    featured: true,
  },
  {
    id: 2,
    title: 'Breakthrough in Quantum Computing Achieves Stable Qubit Operation',
    excerpt: 'Researchers have demonstrated a quantum processor that maintains coherence for over an hour at room temperature, a milestone that could accelerate practical quantum computing.',
    content: `In a paper published today in Nature Physics, researchers from the Quantum Computing Institute have demonstrated a silicon-based quantum processor that maintains qubit coherence for 72 minutes at room temperature — a thousand-fold improvement over previous records.

The breakthrough centers on a new qubit design that uses electron spins in silicon nanoparticles. Unlike superconducting qubits that require cooling near absolute zero, these qubits operate stably at room temperature while maintaining the quantum coherence necessary for error-corrected computation.

"This changes the timeline for practical quantum computing," said Dr. Sarah Okonkwo, lead author of the study. "We have been building toward fault-tolerant quantum computers with millions of physical qubits, but the cooling requirements have been a fundamental barrier. Room-temperature operation removes that barrier completely."

The team demonstrated the processor running Shor's algorithm to factor a 21-bit number — a small demonstration, but one that the researchers say scales linearly with additional qubits. They project that a 1000-qubit processor could be demonstrated within three years.

Industry analysts have already called the development "the most significant quantum computing advance in a decade." Major tech companies, including IBM and Google, have announced plans to license the technology for their quantum computing initiatives.`,
    image: 'https://picsum.photos/seed/quantum-lab/800/500.webp',
    category: 'science',
    author: 'Dr. Rachel Park',
    date: '2026-06-16',
    readTime: '4 min',
    featured: true,
  },
  {
    id: 3,
    title: 'Electric Vehicle Battery Technology Takes a Leap Forward',
    excerpt: 'New solid-state battery technology promises 500-mile range and five-minute charging times, with production expected to begin within eighteen months.',
    content: `Solid-state battery technology has long been considered the holy grail of electric vehicle power storage. Today, battery manufacturer QuantumVolt announced that it has solved the remaining manufacturing challenges and will begin mass production of solid-state batteries within eighteen months.

The new batteries use a ceramic electrolyte instead of the liquid electrolyte found in current lithium-ion batteries. This eliminates the fire risk associated with liquid electrolytes while enabling significantly higher energy density. QuantumVolt's batteries achieve 500 Wh/kg, compared to approximately 250 Wh/kg for the best current lithium-ion batteries.

In practical terms, this means an electric vehicle with a 500-mile range that can be charged to 80% capacity in under five minutes. The batteries also exhibit minimal degradation, with testing showing 90% capacity retention after 10,000 charge cycles.

"This is not a laboratory curiosity," said QuantumVolt CEO Maria Torres. "We have secured manufacturing partnerships with three major automotive manufacturers and will begin shipping production cells in Q1 of 2028."

The announcement sent shares of QuantumVolt up 35% in after-hours trading, while lithium mining stocks fell sharply on concerns about reduced demand for lithium.`,
    image: 'https://picsum.photos/seed/ev-battery/800/500.webp',
    category: 'tech',
    author: 'James Liu',
    date: '2026-06-16',
    readTime: '4 min',
    featured: true,
  },
  {
    id: 4,
    title: 'Studio Behind Acclaimed RPG Announces Spiritual Successor',
    excerpt: 'The award-winning development team has unveiled their next project, a sprawling open-world fantasy that pushes the boundaries of narrative gaming.',
    content: `In a surprise announcement at the Summer Game Festival, the studio behind the critically acclaimed "Chronicles of Elyria" series revealed their next project: "Aethelgard," a open-world fantasy RPG built on an entirely new game engine.

Creative director Elena Vasquez described the project as "the game we have always wanted to make." Aethelgard features a dynamic world that evolves based on player choices, with a narrative system that uses advanced AI to generate unique quest lines for each playthrough.

The game world spans five distinct kingdoms, each with its own culture, politics, and ecology. Players will be able to fly between continents on the backs of massive creatures, engage in naval combat, and influence the balance of power through trade, diplomacy, or conquest.

"We are building systems that react to player agency in ways that feel meaningful and surprising," Vasquez said. "If you help one kingdom conquer another, that kingdom's culture will spread, its language will become dominant, and refugees from the conquered land will remember."

Aethelgard is expected to launch in late 2027 for PC and next-generation consoles.`,
    image: 'https://picsum.photos/seed/rpg-game/800/500.webp',
    category: 'game',
    author: 'Maya Wright',
    date: '2026-06-14',
    readTime: '3 min',
    featured: false,
  },
  {
    id: 5,
    title: 'AI-Powered Personal Assistant Platform Reaches One Billion Users',
    excerpt: 'The milestone marks the fastest adoption of any consumer technology platform in history, raising new questions about the future of human-computer interaction.',
    content: `Sentient AI, the personal assistant platform that launched just eighteen months ago, has reached one billion active users — making it the fastest-growing consumer technology platform in history. For context, it took Facebook eight years and TikTok five years to reach the same milestone.

The platform's exponential growth has been driven by its ability to perform complex tasks through natural conversation. Unlike earlier AI assistants that could only handle simple commands, Sentient can book travel, manage finances, write code, create art, and even have nuanced philosophical discussions.

"We are witnessing a fundamental shift in how humans interact with technology," said Dr. Marcus Webb, a professor of human-computer interaction at Stanford. "The traditional graphical user interface — icons, menus, windows — is being supplemented and in some cases replaced by conversational interfaces."

The milestone has not been without controversy. Critics point to concerns about data privacy, the environmental impact of the massive computing infrastructure required, and the potential for job displacement. Sentient AI has announced a $100 million fund to support research into ethical AI development.

The company's CEO, Amara Osei, stated: "Our goal has always been to augment human potential, not replace it. We are committed to building responsibly and transparently."`,
    image: 'https://picsum.photos/seed/ai-platform/800/500.webp',
    category: 'tech',
    author: 'Sam Rivera',
    date: '2026-06-13',
    readTime: '5 min',
    featured: false,
  },
  {
    id: 6,
    title: 'Underdogs Triumph: Esports Team Wins Championship After Miraculous Run',
    excerpt: 'Ranked last going into the tournament, Team Vortex has completed one of the greatest Cinderella stories in competitive gaming history.',
    content: `In what is being called the greatest upset in esports history, Team Vortex has won the Global Championship Series after entering the tournament as the 32nd and last-ranked seed. Their improbable run included victories over the top three ranked teams in the world.

The grand finals against two-time defending champions Team Apex went the full seven matches, with Vortex securing the championship on a dramatic last-second play that will be replayed for years to come. The winning moment — a perfectly executed flank in the final seconds of overtime — sent the live audience of 40,000 into a frenzy.

"Nobody believed in us except the people in this room," said Vortex captain "Raven" Kim, fighting back tears during the trophy ceremony. "We worked harder than anyone knows. We studied every opponent, we fixed every weakness, and we never stopped believing."

The victory comes with a $4 million prize pool, but more importantly, it changes the competitive landscape. Several top players from established teams have already announced they will enter free agency, hoping to join Vortex for the next season.

The viewership numbers broke all previous records, with 3.2 million concurrent viewers across streaming platforms — more than many traditional sporting events.`,
    image: 'https://picsum.photos/seed/esports/800/500.webp',
    category: 'sports',
    author: 'Derek Nakamura',
    date: '2026-06-12',
    readTime: '4 min',
    featured: false,
  },
  {
    id: 7,
    title: 'Streaming Wars Heat Up as Two Major Services Announce Merger',
    excerpt: 'The combined platform would control over 40% of the streaming market, reshaping the entertainment landscape and potentially raising prices for consumers.',
    content: `In a blockbuster deal that reshapes the entertainment industry, streaming giants StreamVault and CineFlux have announced a $72 billion merger that will create the largest streaming platform in the world.

The combined entity, to be called VaultFlux, will control approximately 40% of the global streaming market, with over 350 million subscribers. The library will include thousands of films and television series, including several of the most-watched original series of the past decade.

"This merger is about creating a sustainable streaming business," said StreamVault CEO Jennifer Holloway. "The landscape has become fragmented. Consumers are tired of subscribing to six different services. We can offer more content at a better price point."

However, the merger faces significant regulatory hurdles. Antitrust regulators in both the United States and European Union have signaled deep concerns about market concentration. Consumer advocacy groups have warned that the merger could lead to higher prices and less choice.

Industry analyst Marcus Webb noted: "The streaming industry was bound to consolidate. There are too many services chasing too few subscribers. This is likely the first of several major mergers we will see over the next two years."`,
    image: 'https://picsum.photos/seed/streaming/800/500.webp',
    category: 'entertainment',
    author: 'Olivia Hart',
    date: '2026-06-11',
    readTime: '4 min',
    featured: false,
  },
  {
    id: 8,
    title: 'Mars Colony Reports First Successful Crop Harvest',
    excerpt: 'The fully automated hydroponic facility has produced the first food grown entirely on Martian soil, a critical milestone for long-term habitation.',
    content: `The International Mars Colony has achieved a historic milestone: the first successful harvest of crops grown entirely in Martian conditions. The harvest includes wheat, tomatoes, and a protein-rich algae that will supplement the colony's food supply.

The hydroponic facility, which operates fully autonomously, uses Martian regolith processed into nutrient-rich growth medium. Water is extracted from subsurface ice deposits and recycled with near-100% efficiency. LED lighting optimized for plant growth operates on solar power collected by the colony's extensive panel array.

"This is bigger than just having fresh food," said Dr. Helena Bergstrom, the colony's lead agricultural scientist. "This proves that we can sustain ourselves independently from Earth. Every kilogram of food we grow here is a kilogram we do not have to launch from Earth at enormous cost."

The colony now produces approximately 30% of its own food, with plans to expand to 70% within two years. The surplus will be stored as an emergency reserve.

The success has implications beyond Mars. The agricultural technologies developed for the colony are being adapted for use in arid regions on Earth, where water scarcity and poor soil quality limit traditional farming.

NASA has already announced plans to expand the colony's agricultural capacity, with additional modules scheduled for delivery on the next cargo mission.`,
    image: 'https://picsum.photos/seed/mars-farm/800/500.webp',
    category: 'science',
    author: 'Dr. Rachel Park',
    date: '2026-06-10',
    readTime: '5 min',
    featured: false,
  },
  {
    id: 9,
    title: 'Revolutionary AR Headset Redefines Remote Collaboration',
    excerpt: 'A new augmented reality headset promises to make remote work feel as natural as being in the same room, with photorealistic avatar rendering.',
    content: `Tech startup SpatialWorks has unveiled the Aura headset, a mixed reality device that the company claims will transform remote collaboration. Unlike existing VR headsets that isolate users in a virtual environment, Aura blends digital content seamlessly with the user's physical space.

The headset's breakthrough is its avatar system. Using a combination of outward-facing cameras and machine learning, Aura creates a photorealistic full-body avatar of the user that appears naturally in other users' spaces. The avatars maintain accurate eye contact, gesture naturally, and occupy real physical space.

"This is the missing piece for remote work," said SpatialWorks CEO David Kim. "The problem with video calls is that you lose spatial awareness — who is looking at whom, body language, the sense of shared space. Aura restores all of that."

Early reviewers have been impressed. "I forgot I was wearing a headset," wrote one technology journalist. "The person I was talking to appeared to be sitting across from me in my own office. When they pointed at something, I naturally looked where they were pointing."

The Aura headset is priced at $1,499 and is available for preorder now, with shipping expected in Q3. The company has already secured partnerships with major enterprise software companies to integrate Aura with existing collaboration tools.`,
    image: 'https://picsum.photos/seed/ar-headset/800/500.webp',
    category: 'tech',
    author: 'Sam Rivera',
    date: '2026-06-09',
    readTime: '4 min',
    featured: false,
  },
  {
    id: 10,
    title: 'Global Cybersecurity Alliance Forms to Combat Rising Threats',
    excerpt: 'Forty nations have signed an unprecedented agreement to share threat intelligence and coordinate responses to major cyberattacks in real time.',
    content: `In response to a 300% increase in state-sponsored cyberattacks over the past year, representatives from forty nations have signed the Global Cybersecurity Accord, establishing a framework for real-time threat intelligence sharing and coordinated defense.

The accord creates a central clearinghouse for threat data, with member nations committing to share information about cyberattacks within minutes of detection. An automated system will analyze the data and deploy defensive measures across all member networks automatically.

"This is the cybersecurity equivalent of NATO's Article 5," said White House Cybersecurity Director Amanda Foster. "An attack on one is an attack on all. We are finally treating cybersecurity as the collective security challenge that it is."

The accord also establishes graduated response protocols. Minor attacks trigger defensive measures and intelligence sharing. Major attacks affecting critical infrastructure can trigger coordinated offensive responses, including the disruption of attacker infrastructure.

Privacy advocates have raised concerns about the scope of intelligence sharing and the potential for surveillance. The accord includes provisions for oversight, with an independent panel of judges and technical experts authorized to audit the system and investigate abuses.

The first test of the accord came within 48 hours of signing, when a coordinated ransomware attack targeting hospitals in three member countries was detected, shared, and neutralized within hours.`,
    image: 'https://picsum.photos/seed/cybersecurity/800/500.webp',
    category: 'business',
    author: 'James Liu',
    date: '2026-06-08',
    readTime: '5 min',
    featured: false,
  },
  {
    id: 11,
    title: 'Indie Game Surprises Critics with Groundbreaking Narrative Design',
    excerpt: 'A two-person development team has created what critics are calling the most innovative storytelling experience in years.',
    content: `"Echoes of Us," a narrative adventure game developed by a two-person team over four years, has taken the gaming world by storm. The game currently holds a 97 Metacritic score, making it one of the highest-rated games of all time.

The game tells the story of two characters across parallel timelines who can communicate through environmental echoes left in the world. Players solve puzzles by observing how actions in one timeline affect the other, gradually unraveling a deeply emotional narrative about connection, loss, and love.

"The narrative design is unlike anything I have experienced," wrote IGN's reviewer. "The gameplay mechanics are inseparable from the story — they are the story. Every puzzle you solve reveals something about the characters and their relationship."

Developers Kai Nakamura and Sofia Rossi built the game in their spare room, supporting themselves with freelance work. "We believed in this vision even when it seemed impossible," Nakamura said. "We wanted to create something that used the unique strengths of video games as a storytelling medium."

The game has sold over two million copies in its first week and has already been nominated for multiple Game of the Year awards. A film adaptation is reportedly in early development.`,
    image: 'https://picsum.photos/seed/indie-game/800/500.webp',
    category: 'game',
    author: 'Maya Wright',
    date: '2026-06-07',
    readTime: '3 min',
    featured: false,
  },
  {
    id: 12,
    title: 'World Athletics Approves Biomechanical Enhancement Category',
    excerpt: 'A new "augmented" division will allow athletes using approved biomechanical aids to compete, marking a historic shift in the definition of human sport.',
    content: `World Athletics has announced the creation of a new competition category for athletes using biomechanical enhancements, a decision that fundamentally redefines the boundaries of human sport.

The "Augmented" division will run alongside traditional competitions, allowing athletes with approved prosthetic and exoskeletal technologies to compete against each other. The category will have its own world records and championship events.

The decision follows years of controversy as amputee sprinters using advanced blade prosthetics began recording times competitive with able-bodied athletes. In 2024, double-amputee sprinter James Okonkwo clocked 9.51 seconds in the 100 meters — half a second faster than the current able-bodied world record.

"This is not about creating a separate category," said World Athletics President Helena Berg. "This is about recognizing that human athletic achievement is evolving. These athletes train just as hard, sacrifice just as much. They deserve a stage."

The announcement has divided the sporting community. Supporters praise the move as inclusive and forward-thinking. Critics argue that it opens the door to "technological doping" and fundamentally alters the nature of sport.

The first Augmented World Championships will be held in 2028, with events including track and field, swimming, and weightlifting. Eligibility standards and approved technologies will be determined by a new commission of scientists, athletes, and ethicists.`,
    image: 'https://picsum.photos/seed/augmented-sport/800/500.webp',
    category: 'sports',
    author: 'Derek Nakamura',
    date: '2026-06-06',
    readTime: '5 min',
    featured: false,
  },
]

export const defaultComments = {
  1: [
    { id: 'c1', author: 'TechGamer42', text: 'The competition between console manufacturers right now is incredible. I have been a PlayStation fan for years but the Xbox cloud integration is really tempting.', date: '2026-06-15T14:30:00Z' },
    { id: 'c2', author: 'RetroFanatic', text: 'As long as Nintendo keeps doing their own thing, I am happy. The Switch proved that innovation beats raw power.', date: '2026-06-15T16:45:00Z' },
  ],
  2: [
    { id: 'c3', author: 'QuantumNerd', text: 'Room temperature quantum computing has been the holy grail for years. If this is real, it changes everything.', date: '2026-06-16T09:15:00Z' },
    { id: 'c4', author: 'PhysicsFirst', text: 'Need to see this replicated in other labs before getting too excited, but promising nonetheless.', date: '2026-06-16T11:20:00Z' },
  ],
  3: [
    { id: 'c5', author: 'EVDaily', text: '500 mile range with 5 minute charging is exactly what we need for mass EV adoption. Game changer.', date: '2026-06-16T15:00:00Z' },
  ],
}

export function getArticle(id) {
  return articles.find(a => a.id === parseInt(id))
}

export function getArticlesByCategory(category) {
  if (category === 'all' || !category) return articles
  return articles.filter(a => a.category === category)
}

export function getFeaturedArticles() {
  return articles.filter(a => a.featured)
}
