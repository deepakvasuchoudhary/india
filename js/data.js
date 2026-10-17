/**
 * HISTORICAL DATABASE: INDIA'S COLONIAL PAST (1498 - 1961)
 * Complete chronology of European colonial expansion, resistance, wars, treaties, famines, and liberation.
 */

const HISTORICAL_ERAS = [
  {
    id: 1,
    name: "Era of Mercantile Contact & Naval Dominance",
    period: "1498 – 1744",
    shortTitle: "Arrivals & Forts",
    tagline: "Vasco da Gama to the Carnatic Wars",
    icon: "fa-ship",
    color: "#3b82f6",
    description: "The Portuguese discover the sea route to Calicut, monopolize the spice trade through the Cartaz system, and seize Goa. Soon, the Dutch VOC, English East India Company, and French Compagnie des Indes arrive, building fortified factories at Surat, Madras, Bombay, and Calcutta while seeking concessions from the Mughal emperors."
  },
  {
    id: 2,
    name: "Carnatic Wars, Plassey & The Fall of Bengal",
    period: "1744 – 1765",
    shortTitle: "Plassey & Diwani",
    tagline: "From Merchants to Sovereign Rulers",
    icon: "fa-chess-rook",
    color: "#ef4444",
    description: "Anglo-French rivalry explodes in the Carnatic Wars. In Bengal, Robert Clive conspires with Mir Jafar to defeat Siraj-ud-Daulah at Plassey (1757). The victory at Buxar (1764) forces Mughal Emperor Shah Alam II to sign the Treaty of Allahabad (1765), granting the East India Company the Diwani (revenue collecting rights) over Bengal, Bihar, and Orissa."
  },
  {
    id: 3,
    name: "Imperial Expansion & Indian Resistances",
    period: "1765 – 1849",
    shortTitle: "Wars of Annexation",
    tagline: "Mysore, Marathas & Sikhs Subjugated",
    icon: "fa-shield-halved",
    color: "#f59e0b",
    description: "The British Company systematically dismantles the great Indian powers through brute force, diplomacy, and the Subsidiary Alliance system. Despite ferocious resistance from Hyder Ali and Tipu Sultan in Mysore, Nana Fadnavis and the Marathas, and the Khalsa Army of Punjab, India is placed firmly under Company paramountcy."
  },
  {
    id: 4,
    name: "Paramountcy, Dalhousie & The Great Uprising",
    period: "1849 – 1858",
    shortTitle: "The 1857 War",
    tagline: "The First War of Independence & Crown Takeover",
    icon: "fa-fire",
    color: "#dc2626",
    description: "Lord Dalhousie's aggressive Doctrine of Lapse annexes Satara, Sambalpur, Jhansi, Nagpur, and Awadh. In May 1857, sepoys at Meerut revolt, proclaiming Bahadur Shah Zafar as Emperor. Rani Lakshmibai, Nana Saheb, Tatya Tope, and Begum Hazrat Mahal spearhead a nationwide uprising. After savage suppression, Parliament abolishes the EIC and Queen Victoria assumes direct Crown rule."
  },
  {
    id: 5,
    name: "The High Imperial Raj & Catastrophic Famines",
    period: "1858 – 1905",
    shortTitle: "High Raj & Famines",
    tagline: "Drain of Wealth & The Great Starvations",
    icon: "fa-wheat-awn-circle-exclamation",
    color: "#854d0e",
    description: "The British Raj constructs railways and telegraphs primarily to extract raw materials and deploy troops. Uncompromising laissez-faire economics and high taxation cause colossal famines (Orissa 1866, Great Famine 1876-78, 1896-1900) starving 30+ million Indians while grain is exported. Dadabhai Naoroji exposes the Drain of Wealth; in 1885, the Indian National Congress is formed."
  },
  {
    id: 6,
    name: "Swadeshi, Revolutionary Surge & Mass Movements",
    period: "1905 – 1930",
    shortTitle: "The Awakening",
    tagline: "From Bengal Partition to Salt Satyagraha",
    icon: "fa-fist-raised",
    color: "#10b981",
    description: "Curzon's 1905 Partition of Bengal triggers the Swadeshi movement. World War I drains Indian resources. The savage Jallianwala Bagh massacre (1919) shatters any illusion of British benevolence. Mahatma Gandhi launches the Non-Cooperation and Civil Disobedience movements, while young revolutionaries Bhagat Singh, Azad, and Surya Sen strike at imperial symbols."
  },
  {
    id: 7,
    name: "World War II, The Holocaust of Bengal & Azad Hind",
    period: "1930 – 1946",
    shortTitle: "WWII & Quit India",
    tagline: "Netaji, 'Do or Die' & The 1943 Bengal Famine",
    icon: "fa-bomb",
    color: "#7c3aed",
    description: "Britain unilaterally drags India into WWII. In 1942, Gandhi gives the call 'Do or Die' with Quit India. Netaji Subhas Chandra Bose raises the Indian National Army (INA) and marches on the Northeast. Meanwhile, Churchill's denial policies engineer the horrific 1943 Bengal Famine killing 3.8 million. The 1946 Royal Indian Navy Mutiny proves Britain can no longer command Indian soldiers."
  },
  {
    id: 8,
    name: "Radcliffe's Blade, Independence & Final Decolonization",
    period: "1946 – 1961",
    shortTitle: "Freedom & Unity",
    tagline: "Partition, Midnight Freedom & The Liberation of Goa",
    icon: "fa-flag-checkered",
    color: "#059669",
    description: "Cyril Radcliffe draws arbitrary borders partitioning Punjab and Bengal, unleashing horrific communal riots displacing 15 million and killing over a million. On August 15, 1947, India achieves independence. Sardar Patel integrates 565+ princely states. France cedes its enclaves by 1954, and Operation Vijay in December 1961 liberates Goa, concluding 451 years of colonial presence."
  }
];

// Complete chronology of events (with exact coordinates for Leaflet.js)
const TIMELINE_EVENTS = [
  {
    id: "vasco-da-gama-1498",
    year: "1498",
    date: "May 20, 1498",
    era: 1,
    title: "Vasco da Gama Lands at Calicut",
    category: "discovery",
    locationName: "Kappad Beach, Calicut (Kozhikode), Kerala",
    coordinates: [11.3850, 75.7176],
    zoom: 9,
    territoryState: "era1_portuguese",
    narrative: "On May 20, 1498, Portuguese explorer Vasco da Gama dropped anchor off Kappad beach near Calicut with four ships, guided across the Arabian Sea by Gujarati pilot Ahmad Ibn Majid (or Kanha). He was granted an audience with the Samoothiri (Zamorin) of Calicut, seeking spices and Christian converts. However, the modest gifts brought by the Portuguese (striped cloth, hats, strings of coral, butter, and sugar) were ridiculed by the Zamorin's court merchants, who were accustomed to fine silks and gold from Arab traders. The encounter laid bare Portugal's determination to bypass the overland Ottoman trade routes and seize naval dominion over the Indian Ocean spice trade through military force.",
    quote: "We have come to seek Christians and spices. — Vasco da Gama's crew upon arriving in Calicut",
    keyFigures: ["Vasco da Gama", "Zamorin of Calicut (Manavikrama)", "Dom Manuel I of Portugal"],
    impactStats: ["First direct European maritime route to Asia", "Initiated 451 years of foreign presence in India", "Disrupted century-old peaceful Indian Ocean trade networks"],
    details: {
      ruler: "Zamorin of Calicut",
      significance: "Broke Venetian and Mamluk monopoly on spice trade to Europe",
      weapons: "Portuguese caravels armed with naval cannon (bombards)"
    }
  },
  {
    id: "battle-of-diu-1509",
    year: "1509",
    date: "February 3, 1509",
    era: 1,
    title: "Battle of Diu: Portuguese Naval Hegemony",
    category: "battle",
    locationName: "Diu Harbor, Gujarat Coast",
    coordinates: [20.7144, 70.9874],
    zoom: 9,
    territoryState: "era1_portuguese",
    narrative: "Off the fortified island port of Diu, the Portuguese Viceroy Francisco de Almeida commanded 18 vessels against a massive allied armada composed of the Mamluk Sultanate of Cairo, the Sultanate of Gujarat (Mahmud Begada), the Zamorin of Calicut, and Ottoman Venetian naval advisers. The allied fleet vastly outnumbered the Portuguese, but Portuguese carvels were technologically superior in broadside naval gunnery. The Portuguese obliterated the allied fleet, capturing key vessels, slaughtering prisoners, and establishing undisputed Portuguese maritime supremacy across the Arabian Sea and Indian Ocean.",
    quote: "Our great guns gave them such a tempest of iron that their timber splattered upon the sea. — Portuguese naval chronicle",
    keyFigures: ["Francisco de Almeida", "Malik Ayyaz (Governor of Diu)", "Sultan Mahmud Begada", "Amir Husain Al-Kurdi"],
    impactStats: ["Total destruction of Mamluk naval presence in Indian Ocean", "Establishment of the Cartaz pass system", "Portuguese fortresses built across Diu, Daman, and Cochin"],
    details: {
      ruler: "Sultan Mahmud Begada (Gujarat)",
      significance: "Cemented European control over naval trade routes from Malacca to Ormuz",
      weapons: "Heavy naval culverins, galleons vs dhows and galleys"
    }
  },
  {
    id: "conquest-of-goa-1510",
    year: "1510",
    date: "November 25, 1510",
    era: 1,
    title: "Afonso de Albuquerque Conquers Goa",
    category: "battle",
    locationName: "Old Goa (Velha Goa), Mandovi River",
    coordinates: [15.5009, 73.9116],
    zoom: 10,
    territoryState: "era1_portuguese",
    narrative: "Governor Afonso de Albuquerque, allied with the local Hindu privateer Timoji (Timmayya), exploited the death of Yusuf Adil Shah, the founder of the Bijapur Sultanate. Marching into the city of Tiswadi (Goa) via the Mandovi river, Albuquerque stormed the fortifications. After initial resistance from Ismail Adil Shah's garrison, Albuquerque recaptured Goa on St. Catherine's Day (November 25, 1510). He ordered the merciless slaughter of the city's Muslim defenders and declared Goa the permanent capital of the Estado da Índia. Albuquerque instituted policy encouraging mixed marriages (Casados) to build a loyal colonial citizenry.",
    quote: "I burnt the city and put everyone to the sword... we estimated the number of dead at over six thousand. — Afonso de Albuquerque letter to King Manuel",
    keyFigures: ["Afonso de Albuquerque", "Ismail Adil Shah of Bijapur", "Timoji (Hindu Naval Commander)"],
    impactStats: ["Goa becomes capital of Portuguese Asian Empire for 451 years", "First sovereign territorial conquest by Europeans in India", "Establishment of the Royal Hospital and Santa Casa da Misericórdia"],
    details: {
      ruler: "Bijapur Sultanate (Adil Shahi Dynasty)",
      significance: "Creation of a fortified maritime capital controlling Arabian horse imports and spice exports",
      weapons: "European matchlocks, Portuguese steel armor, war galleys"
    }
  },
  {
    id: "eic-charter-1600",
    year: "1600",
    date: "December 31, 1600",
    era: 1,
    title: "Queen Elizabeth I Grants Charter to East India Company",
    category: "treaty",
    locationName: "London & Arabian Sea Merchant Routes",
    coordinates: [18.9220, 72.8347], // Bombay reference on Indian map
    zoom: 6,
    territoryState: "era1_eic_origins",
    narrative: "On New Year's Eve in 1600, Queen Elizabeth I granted a royal charter to 'The Governor and Company of Merchants of London Trading into the East Indies'. Backed by 218 wealthy London merchants and venture capitalists under Sir James Lancaster, the joint-stock company received a 15-year monopoly on all English trade east of the Cape of Good Hope. Unlike Portuguese crown colonies, the East India Company (EIC) operated as a profit-driven corporation with private capital, shareholder dividends, and the extraordinary delegated sovereign authority to wage war, raise armies, coin money, and annex territory.",
    quote: "A company of merchants armed with the authority of the state to venture into territories unknown. — Charter of 1600",
    keyFigures: ["Queen Elizabeth I", "Sir James Lancaster", "Thomas Smythe (First Governor)"],
    impactStats: ["Birth of the most powerful corporate monopoly in human history", "Initial capital raised: £68,373", "Precursor to corporate colonialism and private army expansion"],
    details: {
      ruler: "Tudor Dynasty (England) / Akbar the Great (Mughal Empire)",
      significance: "Established corporate-state synergy where trade transitioned into sovereign conquest",
      weapons: "Armed merchantmen (East Indiamen)"
    }
  },
  {
    id: "sir-thomas-roe-1615",
    year: "1615",
    date: "September 18, 1615 – 1619",
    era: 1,
    title: "Sir Thomas Roe at Emperor Jahangir's Court",
    category: "treaty",
    locationName: "Agra & Ajmer (Mughal Imperial Court)",
    coordinates: [27.1767, 78.0081],
    zoom: 8,
    territoryState: "era1_mughal",
    narrative: "Sir Thomas Roe arrived as the accredited ambassador of King James I of England to the Mughal court of Emperor Jahangir at Ajmer and Agra. Where earlier merchant William Hawkins had struggled, Roe lived at the Mughal court for three years, gifting European clocks, English hunting hounds, carriage paintings, and wine. Jahangir was amused by the English envoy but regarded England as a modest distant trading island. Roe succeeded in securing a royal farman granting the English EIC security, trading rights, and permission to establish permanent trading factories at Surat, Broach, and Ahmedabad.",
    quote: "I shall be glad to receive whatever rarities your King shall send me... and I have given command to all my governors to receive whatever merchants of your nation shall come. — Emperor Jahangir's Farman to King James I",
    keyFigures: ["Sir Thomas Roe", "Emperor Jahangir", "Prince Khurram (later Shah Jahan)", "Nur Jahan"],
    impactStats: ["First formal diplomatic recognition of England by the Mughal Empire", "Factory rights in Surat, Broach, and Agra secured", "English established roots in mainland Mughal India"],
    details: {
      ruler: "Emperor Nur-ud-din Muhammad Jahangir",
      significance: "Transitioned English presence from pirate-traders to officially recognized commercial agents",
      weapons: "Diplomacy, luxury gifts, miniature paintings, and velvet"
    }
  },
  {
    id: "founding-of-madras-1639",
    year: "1639",
    date: "August 22, 1639",
    era: 1,
    title: "Founding of Fort St. George (Madras)",
    category: "discovery",
    locationName: "Fort St. George, Chennai, Tamil Nadu",
    coordinates: [13.0797, 80.2871],
    zoom: 10,
    territoryState: "era1_eic_presidencies",
    narrative: "Seeking an autonomous port free from Portuguese harassment and Dutch competition on the Coromandel coast, EIC factor Francis Day negotiated a grant from Damarla Venkatadri Nayaka, the Nayaka ruler of Vandavasi and chieftain under the decaying Vijayanagara Empire (Peda Venkata Raya). Day secured a narrow strip of sand called Madraspatnam. On this swampy littoral, the British erected Fort St. George, completing the fortified inner keep on St. George's Day, 1640. The settlement rapidly bifurcated into 'White Town' inside the fortress walls and 'Black Town' (George Town) outside, setting an apartheid urban design pattern followed in all colonial presidencies.",
    quote: "A desolate spit of sand between river and surf, transformed into Britain's first permanent fortified bastion in India.",
    keyFigures: ["Francis Day", "Andrew Cogan", "Damarla Venkatadri Nayaka", "Peda Venkata Raya"],
    impactStats: ["First fortified territory held directly by English in India", "Birth of Madras Presidency", "Introduction of dual racial city planning (White Town vs Black Town)"],
    details: {
      ruler: "Vijayanagara Nayakas of Chandragiri",
      significance: "Strategic naval foothold on the Bay of Bengal for cotton textile procurement",
      weapons: "Coastal bastions, 6-pounder cannon"
    }
  },
  {
    id: "bombay-acquisition-1661",
    year: "1661",
    date: "June 23, 1661 / Leased 1668",
    era: 1,
    title: "Bombay Given as Royal Dowry & Leased to EIC",
    category: "treaty",
    locationName: "Seven Islands of Bombay (Mumbai), Maharashtra",
    coordinates: [18.9220, 72.8347],
    zoom: 10,
    territoryState: "era1_eic_presidencies",
    narrative: "Under the marriage treaty between King Charles II of England and Catherine of Braganza, daughter of King John IV of Portugal, the seven marshy islands of Bom Bahia were ceded to the English Crown as part of Catherine's royal dowry, alongside Tangier and 2 million Portuguese cruzados. Finding the distant, malaria-ridden islands expensive to administer, Charles II leased Bombay to the East India Company in 1668 for an annual rent of just £10 in gold. Under Governor Gerald Aungier (1669–1677), the islands were connected by causeways, religious tolerance was proclaimed to attract Parsi, Gujarati, and Bania merchants, and the natural deepwater harbor made Bombay the primary naval headquarters of Western India.",
    quote: "A city which, by God's assistance, is intended to be built. — Gerald Aungier, Governor of Bombay, 1673",
    keyFigures: ["King Charles II", "Catherine of Braganza", "Gerald Aungier", "Humphrey Cooke"],
    impactStats: ["Acquired for zero combat casualties", "Transformed from 7 fishing hamlets into the commercial capital of Asia", "EIC headquarters shifted from Surat to Bombay in 1687"],
    details: {
      ruler: "Kingdom of Portugal / Kingdom of England",
      significance: "Gave the British an impregnable deepwater port on the Arabian Sea",
      weapons: "Diplomatic royal marriage treaty"
    }
  },
  {
    id: "founding-of-calcutta-1690",
    year: "1690",
    date: "August 24, 1690",
    era: 1,
    title: "Founding of Calcutta & Fort William",
    category: "discovery",
    locationName: "Sutanuti, Gobindapur & Kalikata (Kolkata), Bengal",
    coordinates: [22.5851, 88.3468],
    zoom: 10,
    territoryState: "era1_eic_presidencies",
    narrative: "English trader Job Charnock anchored his boats at the village of Sutanuti on the eastern bank of the Hooghly River. Bengal Subah was the richest province of the Mughal Empire, producing 50% of its textiles and 80% of its raw silk. In 1698, the Company paid 1,200 rupees to the Sabarna Roy Choudhury zamindar family to acquire the tenancy rights of three contiguous villages: Sutanuti, Gobindapur, and Kalikata. Construction of the original Fort William commenced in 1696 to guard against local rebellions (such as Shova Singh's revolt). Calcutta emerged as the linchpin of British trade, and would become the imperial capital of the British Raj until 1911.",
    quote: "A place wonderfully convenient for trade, surrounded by swamps that provided a natural moat against sudden horse attack.",
    keyFigures: ["Job Charnock", "Sabarna Roy Choudhury", "Nawab Ibrahim Khan", "Charles Eyre"],
    impactStats: ["Foundation of the future capital of British India (1772–1911)", "Tapping the immense wealth of Bengal Subah", "Erection of Fort William"],
    details: {
      ruler: "Mughal Empire (Emperor Aurangzeb / Subahdar of Bengal)",
      significance: "Established maritime access to the fertile Gangetic trade basin",
      weapons: "Riverine gunboats, palisades, musketry"
    }
  },
  {
    id: "farrukhsiyar-farman-1717",
    year: "1717",
    date: "1717",
    era: 1,
    title: "Emperor Farrukhsiyar's Imperial Farman (Magna Carta of EIC)",
    category: "treaty",
    locationName: "Delhi & Murshidabad",
    coordinates: [28.6562, 77.2410],
    zoom: 7,
    territoryState: "era1_mughal",
    narrative: "Following the death of Emperor Aurangzeb in 1707, the Mughal throne was mired in palace coups. A British delegation led by John Surman and accompanied by Scottish surgeon William Hamilton visited Delhi. Hamilton cured Emperor Farrukhsiyar of a painful disease. In profound gratitude, Farrukhsiyar issued three imperial farmans in 1717, later termed the 'Magna Carta of the Company'. For a measly annual tribute of 3,000 rupees, the EIC was granted custom-free trade across Bengal, allowed to issue trade passes (Dastaks), authorized to coin its own currency at Bombay, and permitted to rent 38 villages around Calcutta. British factors brazenly misused dastaks for their private illegal trade, setting up direct confrontation with the Nawabs of Bengal.",
    quote: "The Company was given an empire's trade for the price of a local bribe.",
    keyFigures: ["Emperor Farrukhsiyar", "Dr. William Hamilton", "John Surman", "Murshid Quli Khan (Nawab of Bengal)"],
    impactStats: ["Customs duties eliminated for EIC in Bengal", "Rampant abuse of Dastaks (passes) devastated Bengal treasury", "Direct cause of military clashes with Siraj-ud-Daulah"],
    details: {
      ruler: "Mughal Emperor Farrukhsiyar",
      significance: "Economic weapon that starved regional treasuries while enriching private English traders",
      weapons: "Medical diplomacy and royal decree"
    }
  },
  {
    id: "battle-of-colachel-1741",
    year: "1741",
    date: "August 10, 1741",
    era: 1,
    title: "Battle of Colachel: Travancore Crushes the Dutch VOC",
    category: "battle",
    locationName: "Colachel, Kanyakumari Coast, Tamil Nadu / Travancore",
    coordinates: [8.1764, 77.2562],
    zoom: 9,
    territoryState: "era1_travancore",
    narrative: "In one of the most historic yet overlooked victories of Asian military history, King Anizham Thirunal Marthanda Varma of Travancore crushed the naval and land forces of the Dutch East India Company (Vereenigde Oostindische Compagnie - VOC). The Dutch sought to monopolize the black pepper trade and launched an invasion commanded by Admiral Eustachius De Lannoy. Marthanda Varma's Nair brigade surrounded the Dutch garrison at Colachel. A Travancore cannon shell exploded the Dutch gunpowder magazine, forcing complete Dutch surrender. De Lannoy was captured and subsequently entered Marthanda Varma's service as Senior Admiral, training the Travancore army in modern European artillery. This battle ended Dutch imperial ambitions in India forever.",
    quote: "An Asian monarch had decisively defeated a premier European naval power in pitched battle on Indian soil.",
    keyFigures: ["Maharaja Marthanda Varma", "Admiral Eustachius De Lannoy", "Ramayyan Dalawa"],
    impactStats: ["First decisive defeat of a major European colonial power by an Asian power", "Dutch VOC trade monopoly shattered", "De Lannoy modernization of Travancore armed forces"],
    details: {
      ruler: "Kingdom of Travancore (Marthanda Varma)",
      significance: "Permanently prevented Dutch colonial subjugation of southern India",
      weapons: "Travancore field artillery, Nair swordsmen, captured Dutch muskets"
    }
  },
  {
    id: "siege-of-arcot-1751",
    year: "1751",
    date: "September 23 – November 14, 1751",
    era: 2,
    title: "Siege of Arcot & The Second Carnatic War",
    category: "battle",
    locationName: "Arcot, Tamil Nadu",
    coordinates: [12.9059, 79.3324],
    zoom: 9,
    territoryState: "era2_carnatic",
    narrative: "During the Second Carnatic War, the French under Governor-General Joseph François Dupleix had installed Chanda Sahib as Nawab of the Carnatic, besieging the British candidate Muhammad Ali at Trichinopoly. A 26-year-old Company clerk-turned-captain, Robert Clive, proposed a daring diversion: storming Arcot, the capital of Carnatic. Clive with 200 European soldiers and 300 Indian sepoys seized the dilapidated fort during a thunderstorm without firing a shot. Chanda Sahib sent 10,000 troops under Raza Sahib to recapture it. For 53 days, Clive's garrison held out under extreme starvation—Indian sepoys famously survived on the water strained from boiled rice, giving the solid rice to European comrades. A relief force of Marathas under Morari Rao joined Clive, shattering the French alliance.",
    quote: "Clive's defense of Arcot was the foundation stone of British military prestige in India.",
    keyFigures: ["Robert Clive", "Joseph François Dupleix", "Chanda Sahib", "Morari Rao (Maratha General)"],
    impactStats: ["Dupleix's grand strategy thwarted and recalled to Paris in disgrace", "Rise of Robert Clive ('Clive of India')", "British supremacy established in southern India"],
    details: {
      ruler: "Nawab of Arcot / Carnatic",
      significance: "Turned the tide against French dominance in the Deccan",
      weapons: "Flintlock muskets, trench warfare, cannonades"
    }
  },
  {
    id: "black-hole-calcutta-1756",
    year: "1756",
    date: "June 20, 1756",
    era: 2,
    title: "Siraj-ud-Daulah Captures Fort William & The 'Black Hole'",
    category: "rebellion",
    locationName: "Old Fort William, Calcutta",
    coordinates: [22.5731, 88.3476],
    zoom: 10,
    territoryState: "era2_bengal",
    narrative: "Young and fiercely independent Nawab Siraj-ud-Daulah ascended the throne of Bengal in 1756. Infuriated by the EIC's illegal fortification of Calcutta, abuse of duty-free dastaks, and refusal to surrender fugitive treasury official Krishna Das, Siraj marched 50,000 troops onto Calcutta. Governor Roger Drake and military officers cowardly fled onto ships in the Hooghly, abandoning the garrison. Fort William fell on June 20. According to British survivor John Zephaniah Holwell, 146 British prisoners were locked into an 18x14 foot punishment cell, leading to 123 deaths overnight from heat exhaustion and suffocation. While modern historians (including Bipan Chandra and P.C. Gupta) argue Holwell wildly inflated numbers for imperial propaganda, the 'Black Hole' was weaponized by the British press to manufacture moral justification for retribution and total conquest.",
    quote: "A tragedy sensationalized by imperial chroniclers to justify the violent subjugation of Bengal.",
    keyFigures: ["Nawab Siraj-ud-Daulah", "John Zephaniah Holwell", "Roger Drake"],
    impactStats: ["Total fall of Calcutta to Bengal state forces", "Used as propaganda casus belli for Robert Clive's expedition", "Triggered the conspiracy of Jagat Seth and Mir Jafar"],
    details: {
      ruler: "Nawab Siraj-ud-Daulah (Nawab of Bengal, Bihar & Orissa)",
      significance: "Brought Robert Clive and Admiral Watson steaming north from Madras with an armada",
      weapons: "Bengal matchlocks, elephant cavalry, wall guns"
    }
  },
  {
    id: "battle-of-plassey-1757",
    year: "1757",
    date: "June 23, 1757",
    era: 2,
    title: "The Battle of Plassey: Betrayal & Dawn of Empire",
    category: "battle",
    locationName: "Palashi (Plassey), Nadia District, Bengal",
    coordinates: [23.7915, 88.2562],
    zoom: 10,
    territoryState: "era2_plassey",
    narrative: "Fought in a mango grove on the banks of the Bhagirathi River, Plassey was not so much a military battle as a pre-arranged coup purchased through financial bribery. Robert Clive had just 800 British soldiers, 2,200 Indian sepoys, and 8 field guns against Siraj-ud-Daulah's army of 50,000 soldiers and 53 French-crewed heavy cannon. Clive had secretly forged an agreement with Mir Jafar (the Nawab's commander-in-chief), Rai Durlabh, and the fabulously wealthy banking house of the Jagat Seths. When a monsoon downpour soaked the Nawab's gunpowder (the British kept theirs dry under tarpaulins), Mir Madan charged bravely and was killed. Mir Jafar advised Siraj to halt the battle and order his troops to withdraw. Mir Jafar's division stood completely motionless. Siraj fled on a camel, was captured in Rajmahal, and murdered. Clive placed Mir Jafar on the throne, plundering the Murshidabad treasury of £2.5 million.",
    quote: "A great prince was dependent upon me; an opulent city was at my mercy... By God, Mr. Chairman, at this moment I stand astonished at my own moderation! — Robert Clive defending himself in Parliament",
    keyFigures: ["Robert Clive", "Nawab Siraj-ud-Daulah", "Mir Jafar (Traitor)", "Jagat Seth Mahtab Rai", "Mir Madan (Loyal General)"],
    impactStats: ["Dawn of British territorial rule in India", "Plunder of Murshidabad treasury (£2.5M / £200M+ in today's value)", "Mir Jafar installed as puppet 'Clive's Jackal'", "EIC awarded zamindari of 24 Parganas"],
    details: {
      ruler: "Siraj-ud-Daulah / Mir Jafar",
      significance: "The decisive turning point: transformed the EIC from trading company to territorial conqueror",
      weapons: "British tarpaulins preserving dry powder, 6-pounder field guns vs 53 immobile siege guns"
    }
  },
  {
    id: "battle-of-wandiwash-1760",
    year: "1760",
    date: "January 22, 1760",
    era: 2,
    title: "Battle of Wandiwash: End of the French Empire in India",
    category: "battle",
    locationName: "Wandiwash (Vandavasi), Tamil Nadu",
    coordinates: [12.5020, 79.6105],
    zoom: 9,
    territoryState: "era2_carnatic",
    narrative: "During the worldwide Seven Years' War, the decisive clash between the British and French empires in India took place at Wandiwash. The British army under Lieutenant-General Sir Eyre Coote faced the French forces commanded by the hot-tempered Comte de Lally and the Marquis de Bussy. Coote outmaneuvered Lally's European regiments; a British shell detonated the French ammunition wagon, causing chaos. Bussy was taken prisoner and Lally retreated in disorder to Pondicherry. Following a grueling eight-month siege, Pondicherry surrendered in January 1761 and was razed to the ground. Under the 1763 Treaty of Paris, the French regained Pondicherry, Chandannagar, and Mahe strictly as demilitarized trading stations with no right to garrison troops, ending all French hopes of an Indian empire.",
    quote: "The sun of French power in the subcontinent sank forever beneath the ramparts of Wandiwash.",
    keyFigures: ["Sir Eyre Coote", "Comte de Lally", "Marquis de Bussy"],
    impactStats: ["French military power in India completely extinguished", "British gained unhindered hegemony along the entire Coromandel coast", "Pondicherry reduced to a commercial enclave"],
    details: {
      ruler: "Kingdom of France (Louis XV) vs British Crown/EIC",
      significance: "Left Great Britain with no European rival left standing on the subcontinent",
      weapons: "Linear volley fire, European line infantry, siege artillery"
    }
  },
  {
    id: "battle-of-buxar-1764",
    year: "1764",
    date: "October 22, 1764",
    era: 2,
    title: "The Battle of Buxar: Triple Alliance Defeated",
    category: "battle",
    locationName: "Buxar, Bihar (Ganges River Plain)",
    coordinates: [25.5647, 83.9777],
    zoom: 9,
    territoryState: "era2_buxar",
    narrative: "Unlike Plassey, the Battle of Buxar was a genuine, hard-fought, full-scale military clash. Mir Qasim, who had replaced Mir Jafar as Nawab, refused to remain a British puppet. He modernized his army at Munger with flintlocks and artillery, abolished all inland transit duties to level the field for Indian merchants, and forged a formidable Triple Alliance with Shuja-ud-Daulah (Nawab-Wazir of Awadh) and the fugitive Mughal Emperor Shah Alam II. Major Hector Munro commanded 7,072 disciplined EIC soldiers (mostly Indian sepoys). The combined Mughal-Awadh-Bengal army numbered over 40,000. When Munro's flanks resisted fierce cavalry charges, Shuja-ud-Daulah's lack of coordination and Mir Qasim's mercenary commander Walter Reinhardt (Sumru) retreating threw the alliance into chaos. Munro's victory was total.",
    quote: "Plassey gave the Company Bengal; Buxar gave them Hindustan.",
    keyFigures: ["Major Hector Munro", "Mir Qasim (Nawab of Bengal)", "Shuja-ud-Daulah (Nawab of Awadh)", "Shah Alam II (Mughal Emperor)"],
    impactStats: ["Decisive defeat of the Mughal Emperor and Awadh", "Mir Qasim died in poverty near Delhi in 1777", "Awadh reduced to a buffer state paying massive war indemnities"],
    details: {
      ruler: "Shah Alam II (Mughal Emperor), Shuja-ud-Daulah (Awadh), Mir Qasim (Bengal)",
      significance: "Confirmed British military supremacy over North India; shattered Mughal sovereign legitimacy",
      weapons: "Drilled battalion volley firing, field howitzers, grape shot"
    }
  },
  {
    id: "treaty-of-allahabad-1765",
    year: "1765",
    date: "August 12, 1765",
    era: 2,
    title: "Treaty of Allahabad: Diwani of Bengal & The Dual System",
    category: "treaty",
    locationName: "Allahabad Fort, Uttar Pradesh",
    coordinates: [25.4310, 81.8783],
    zoom: 9,
    territoryState: "era2_diwani",
    narrative: "Inside Robert Clive's silk tent pitched inside Allahabad Fort, the blind and helpless Mughal Emperor Shah Alam II signed the Treaty of Allahabad. In exchange for an annual tribute of 2.6 million rupees (£260,000) and the districts of Kora and Allahabad, the Emperor granted the East India Company the Diwani (absolute right to collect land revenues and administer civil justice) over the three richest provinces of India: Bengal, Bihar, and Orissa. Clive instituted the notorious 'Dual System of Government' (1765–1772): the Company held Diwani (revenue and military power without responsibility), while the puppet Nawab was left with Nizamat (law and order and administration without any revenue). EIC plunder intensified exponentially.",
    quote: "A sovereign prince was degraded to a pensioner, and a trading company became the lord of twenty million subjects.",
    keyFigures: ["Robert Clive", "Shah Alam II", "Shuja-ud-Daulah", "Najm-ud-Daulah (Puppet Nawab)"],
    impactStats: ["Annual Bengal revenue of over £3 million transferred to EIC coffers", "British no longer brought silver bullion to buy Indian goods; Indian revenues bought Indian goods", "Dual Government bled Bengal dry, triggering the 1770 famine"],
    details: {
      ruler: "Mughal Emperor Shah Alam II",
      significance: "Legalized corporate imperial rule under the fiction of Mughal imperial grant",
      weapons: "Imperial Farman, parchment, royal seals"
    }
  },
  {
    id: "great-bengal-famine-1770",
    year: "1770",
    date: "1769 – 1773",
    era: 3,
    title: "The Great Bengal Famine of 1770: 10 Million Dead",
    category: "famine",
    locationName: "Bengal Presidency (Bengal, Bihar, Odisha)",
    coordinates: [24.1800, 88.2700],
    zoom: 7,
    territoryState: "era3_famine1770",
    narrative: "When monsoon rains failed in late 1769, a catastrophic famine descended upon Bengal and Bihar. But this was not merely a natural disaster; it was manufactured and aggravated by the brutal fiscal policies of the East India Company. Having obtained the Diwani, Company factors hoarded grain to artificially inflate market prices, enforced the compulsory cultivation of opium and indigo in place of rice, and strictly prohibited grain storage by peasants. Even as dead bodies piled up in the streets of Calcutta and Murshidabad, the EIC did not remit a single rupee of tax; on the contrary, Warren Hastings proudly reported to the Court of Directors in London that the Company had collected 10% MORE land revenue in the famine year of 1771 than in normal years by violently squeezing surviving cultivators. One-third of Bengal's population—an estimated 10 million men, women, and children—perished.",
    quote: "It was naturally to be expected that the margin of revenue would decrease... yet, it is owing to its being violently kept up to its former standard that the collection in 1771 exceeded even that of 1768. — Warren Hastings to EIC Court of Directors, 1772",
    keyFigures: ["Warren Hastings", "John Cartier (Governor of Bengal)", "Reza Khan (Naib Diwan)"],
    impactStats: ["10 Million deaths (approx. one-third of Bengal's entire population)", "Extensive depopulation; one-third of agricultural lands turned to jungle", "EIC stock dividends raised to 12.5% in London during the famine"],
    details: {
      ruler: "East India Company Dual Administration",
      significance: "Exposed the lethal brutality of extractive corporate capitalism unrestrained by human accountability",
      weapons: "Forced taxation, grain hoarding, export of rice during mass starvation"
    }
  },
  {
    id: "first-anglo-mysore-war-1767",
    year: "1769",
    date: "1767 – April 1769",
    era: 3,
    title: "First Anglo-Mysore War & Treaty of Madras",
    category: "battle",
    locationName: "Madras (Fort St. George ramparts)",
    coordinates: [13.0797, 80.2871],
    zoom: 9,
    territoryState: "era3_mysore",
    narrative: "Hyder Ali, who had risen from a military officer to become the de facto ruler of the Kingdom of Mysore, established a formidable modern army with French technical assistance. The British, alarmed by his expansion, formed a tripartite coalition with the Nizam of Hyderabad and the Marathas. Hyder Ali outmaneuvered the coalition with brilliant diplomacy, buying off the Marathas and winning over the Nizam. In March 1769, Hyder Ali executed a lightning 130-mile cavalry march in three and a half days, appearing suddenly outside the walls of Fort St. George in Madras. Panic-stricken British councilors were forced to sign the Treaty of Madras under Hyder's terms, promising mutual defensive assistance if either were attacked.",
    quote: "Hyder Ali dictated terms under the very guns of Fort St. George.",
    keyFigures: ["Hyder Ali", "Colonel Joseph Smith", "Charles Bourchier (Governor of Madras)"],
    impactStats: ["Humiliating diplomatic and military defeat for the British", "Mutual defensive alliance signed (which British violated in 1771)", "Proved Indian rulers could master European battlefield mobility"],
    details: {
      ruler: "Kingdom of Mysore (Hyder Ali)",
      significance: "Only war where an Indian ruler dictated peace terms outside an EIC capital",
      weapons: "Mysorean rocket artillery (Bans), swift Maratha-Mysore light cavalry"
    }
  },
  {
    id: "treaty-of-salbai-1782",
    year: "1782",
    date: "May 17, 1782",
    era: 3,
    title: "Treaty of Salbai: Nana Fadnavis Checks British Ambition",
    category: "treaty",
    locationName: "Salbai, Gwalior District, Madhya Pradesh",
    coordinates: [25.8600, 78.2500],
    zoom: 8,
    territoryState: "era3_maratha",
    narrative: "Following the First Anglo-Maratha War (1775–1782), triggered by British interference in Peshwa succession by backing Raghunath Rao, the Maratha Empire under the legendary statesman Nana Fadnavis and General Mahadji Scindia inflicted crushing defeats on the British at Wadgaon (1779). Realizing they could not defeat the Marathas while simultaneously fighting Hyder Ali in Mysore, Warren Hastings sued for peace. The Treaty of Salbai guaranteed 20 years of relative peace between the British and the Marathas, confirmed Madhavrao II as Peshwa, restored territories, and recognized Mahadji Scindia as an independent sovereign ruler of northern India.",
    quote: "Nana Fadnavis, the Maratha Machiavelli, preserved the sovereignty of the Maratha confederacy for two crucial decades.",
    keyFigures: ["Nana Fadnavis", "Mahadji Scindia", "Warren Hastings", "Peshwa Madhavrao II"],
    impactStats: ["20 years of peace between British and Marathas (1782–1802)", "Recognized Marathas as paramount power of central and north India", "Allowed British to concentrate forces entirely on Tipu Sultan"],
    details: {
      ruler: "Maratha Confederacy (Peshwa / Scindia / Holkar)",
      significance: "Demonstrated the military balance of power; British forced to make concessions",
      weapons: "Maratha cavalry guerilla tactics (Ghanimi Kawa), Scindia's French-trained battalions"
    }
  },
  {
    id: "fall-of-seringapatam-1799",
    year: "1799",
    date: "May 4, 1799",
    era: 3,
    title: "Siege of Seringapatam & The Martyrdom of Tipu Sultan",
    category: "battle",
    locationName: "Srirangapatna (Seringapatam), Karnataka",
    coordinates: [12.4224, 76.6953],
    zoom: 11,
    territoryState: "era3_seringapatam",
    narrative: "Tipu Sultan, the 'Tiger of Mysore', was the most dangerous adversary the British ever faced. An enlightened ruler who planted the Tree of Liberty, corresponded with Napoleon Bonaparte, pioneered industrial metallurgy, and deployed iron-cased Mysorean war rockets that terrorized British lines, Tipu refused to sign Wellesley's Subsidiary Alliance. Lord Mornington (Wellesley) orchestrated the Fourth Anglo-Mysore War with 50,000 British and allied troops (including the Nizam). Aided by treacherous Mysorean minister Mir Sadiq (who withdrew troops under pretext of distributing pay), British artillery breached the fort walls at the Water Gate. Rather than surrender or escape, Tipu Sultan fought personally in the breach with sword and musket, suffering fatal bullet wounds. British troops plundered his priceless palace, seized his mechanical wooden tiger (Tipu's Tiger), and partitioned Mysore, handing a rump state to an infant Wodeyar prince.",
    quote: "Better to live one day as a tiger than a thousand years as a sheep. — Tipu Sultan's famous maxim",
    keyFigures: ["Tipu Sultan", "Lord Wellesley (Governor-General)", "General George Harris", "Arthur Wellesley (Duke of Wellington)", "Mir Sadiq (Traitor)"],
    impactStats: ["Complete destruction of the Kingdom of Mysore as a military threat", "British looted Tipu's royal treasury and legendary library", "British gained dominance over entire South India"],
    details: {
      ruler: "Kingdom of Mysore (Tipu Sultan)",
      significance: "Eliminated the most modern and scientifically advanced anti-colonial resistance in Asia",
      weapons: "Mysorean iron-cased war rockets (captured prototypes inspired Congreve rockets in UK)"
    }
  },
  {
    id: "subsidiary-alliance-1798",
    year: "1798",
    date: "1798 onwards",
    era: 3,
    title: "Lord Wellesley's Subsidiary Alliance System",
    category: "politics",
    locationName: "Hyderabad (First Princely Signatory)",
    coordinates: [17.3850, 78.4867],
    zoom: 8,
    territoryState: "era3_subsidiary",
    narrative: "Governor-General Lord Wellesley perfected an ingenious diplomatic stranglehold known as the Subsidiary Alliance. Under this treaty, an Indian princely ruler was compelled to disband their own standing national army and maintain a permanent British military force ('subsidiary force') within their territory, paying for its upkeep in cash or ceding territory. The ruler was required to accept a British Resident at their court, expel all other Europeans (especially French advisers), and could conduct no diplomacy or wage war without British consent. If the prince failed to pay the exorbitant maintenance subsidies, the EIC annexed parts of their territory. Nizam Ali Khan of Hyderabad was the first to sign in 1798, followed by Mysore (1799), Tanjore (1799), Awadh (1801), the Peshwa (1802), Scindia, and Bhonsle.",
    quote: "A system of disguised annexation that bled Indian states dry while leaving rulers with the illusion of a throne.",
    keyFigures: ["Lord Wellesley", "Nizam Ali Khan (Nizam of Hyderabad)", "Peshwa Baji Rao II", "Arthur Wellesley"],
    impactStats: ["Over 100 Indian kingdoms voluntarily or under duress surrendered sovereign autonomy", "Princely rulers became puppet figureheads protected from their own subjects", "British secured massive military garrisons funded entirely by Indian revenues"],
    details: {
      ruler: "Princely States of India",
      significance: "The political architecture that allowed a foreign trading company to govern hundreds of kingdoms",
      weapons: "Legal contracts, resident diplomacy, subsidized regiments"
    }
  },
  {
    id: "battle-of-assaye-1803",
    year: "1803",
    date: "September 23, 1803",
    era: 3,
    title: "Battle of Assaye: Second Anglo-Maratha War",
    category: "battle",
    locationName: "Assaye, Jalna District, Maharashtra",
    coordinates: [20.2588, 75.8850],
    zoom: 9,
    territoryState: "era3_assaye",
    narrative: "Considered by Major-General Arthur Wellesley (the future Duke of Wellington and victor of Waterloo) as 'the bloodiest battle for the numbers that I ever saw and the hardest fought', Assaye was the turning point of the Second Anglo-Maratha War. Wellesley with 9,500 British and sepoy troops confronted the combined army of Daulat Rao Scindia and Raghoji II Bhonsle of Berar, numbering 50,000 men with over 100 well-drilled French-cast artillery pieces. Wellesley boldly noticed two villages on opposite banks of the Kaitna river and correctly guessed there was an unmapped ford between them. Crossing under ferocious Maratha cannon fire, the British engaged in savage bayonet fighting against Scindia's regular infantry battalions (trained by French mercenaries). Over a third of Wellesley's force was killed or wounded, but the Marathas were forced to retreat, ceding Delhi, Agra, and vast territories under the Treaty of Surji-Anjangaon.",
    quote: "Assaye was the hardest fought battle I was ever in, not excepting Waterloo. — Arthur Wellesley, Duke of Wellington",
    keyFigures: ["Arthur Wellesley", "Daulat Rao Scindia", "Raghoji II Bhonsle", "Anthony Pohlmann"],
    impactStats: ["British captured 100+ artillery pieces and shattered Scindia's northern army", "Treaty of Surji-Anjangaon: British occupied Delhi and took blind Mughal Emperor into 'protection'", "Arthur Wellesley's military reputation established"],
    details: {
      ruler: "Maratha Empire (Scindia & Bhonsle)",
      significance: "Gave the British control over the Mughal imperial capital Delhi and the Doab",
      weapons: "Bayonet charges, 100+ Maratha brass artillery guns, grape shot"
    }
  },
  {
    id: "fall-of-marathas-1818",
    year: "1818",
    date: "1817 – June 1818",
    era: 3,
    title: "Third Anglo-Maratha War: The End of the Maratha Empire",
    category: "battle",
    locationName: "Khadki, Koregaon & Pune, Maharashtra",
    coordinates: [18.5204, 73.8567],
    zoom: 9,
    territoryState: "era3_maratha_fall",
    narrative: "Smarting under the humiliation of the Treaty of Bassein and British residency, Peshwa Baji Rao II made a desperate final bid to throw off the British yoke in late 1817, joined by Mudhoji II Bhonsle of Nagpur and Malhar Rao Holkar III. Lord Hastings mobilized the 'Grand Army' of over 110,000 troops—the largest British army ever assembled in India. The Peshwa's forces attacked the British Residency at Khadki (Kirkee) but were repulsed by Mountstuart Elphinstone. At the Battle of Koregaon (Jan 1, 1818), an 800-strong Company detachment (comprising Mahar sepoys) held off 28,000 Maratha troops. Peshwa Baji Rao II was pursued relentlessly until he surrendered in June 1818. The office of the Peshwa was permanently abolished; Baji Rao was stripped of his realm, given an annual pension of £80,000, and exiled to Bithoor near Kanpur. The British emerged as the undisputed paramount master of India.",
    quote: "The Maratha Empire, founded by Chhatrapati Shivaji Maharaj, was dissolved; the Union Jack flew above the Shanivar Wada in Pune.",
    keyFigures: ["Peshwa Baji Rao II", "Lord Hastings (Marquess of Hastings)", "Mountstuart Elphinstone", "Bapu Gokhale (Maratha General)"],
    impactStats: ["Abolition of the Peshwa title and exile to Bithoor", "Annexation of the entire Maratha heartland into Bombay Presidency", "British became the single paramount ruler from Himalayas to Cape Comorin"],
    details: {
      ruler: "Peshwa Baji Rao II (Maratha Confederacy)",
      significance: "Removed the last indigenous continental challenger to British rule in peninsular India",
      weapons: "Pindari irregulars, British multi-corps coordination"
    }
  },
  {
    id: "kittur-rebellion-1824",
    year: "1824",
    date: "October – December 1824",
    era: 3,
    title: "Kittur Rebellion: Rani Chennamma Defies the British",
    category: "rebellion",
    locationName: "Kittur Fort, Belagavi, Karnataka",
    coordinates: [15.6019, 74.7937],
    zoom: 9,
    territoryState: "era3_subsidiary",
    narrative: "Decades before Rani Lakshmibai of Jhansi, Rani Chennamma of Kittur led an armed revolt against British imperial expansion. When her husband Mallasarja and only son died, Rani Chennamma adopted Shivalingappa to succeed to the throne of the princely state of Kittur in north Karnataka. The British Collector of Dharwad, St. John Thackeray, invoked an early precursor to the Doctrine of Lapse, declaring the adoption null and void and moving to confiscate the Kittur treasury. Rani Chennamma refused to capitulate. When British forces attacked Kittur Fort in October 1824, Chennamma's forces counterattacked fiercely. Collector Thackeray was shot dead and two British officers were taken prisoner. The British returned in December with an overwhelming army from Mysore and Sholapur. Betrayed by internal traitors who contaminated the fortress gunpowder with mud and cow dung, Chennamma was captured and imprisoned at Bailhongal Fort, where she died in 1829.",
    quote: "Why should we pay tax to you? Are you our brother, father, friend or relative? Did you sow with us or reap with us? — Rani Chennamma's defiance to Collector Thackeray",
    keyFigures: ["Rani Chennamma", "Sangolli Rayanna", "St. John Thackeray (British Collector)", "Amatya Shivalingappa"],
    impactStats: ["First Indian queen to wage armed rebellion against British East India Company", "Sangolli Rayanna continued legendary guerrilla warfare until his hanging in 1831", "Inspirational symbol of indigenous resistance in South India"],
    details: {
      ruler: "Kingdom of Kittur (Rani Chennamma)",
      significance: "Earliest armed defiance against British refusal to recognize adopted heirs",
      weapons: "Cannons of Kittur, muskets, Karnataka swords"
    }
  },
  {
    id: "annexation-of-sindh-1843",
    year: "1843",
    date: "February – March 1843",
    era: 3,
    title: "Annexation of Sindh: 'A Very Useful, Humane Piece of Rascality'",
    category: "battle",
    locationName: "Miani & Hyderabad, Sindh (Modern Pakistan)",
    coordinates: [25.4300, 68.3700],
    zoom: 8,
    territoryState: "era3_sindh",
    narrative: "Following the catastrophic British humiliation in the First Anglo-Afghan War (1838–1842), where an entire British retreat column was annihilated in the Khurd Kabul pass, the EIC sought an easy military victory to restore damaged prestige and secure the Indus river navigation. Major-General Sir Charles Napier provoked the peaceful Talpur Amirs of Sindh, who had remained strictly loyal during the Afghan expedition. At the Battle of Miani (February 17, 1843), Napier with 2,800 troops routed 20,000 Baluchi warriors of the Amirs. Napier annexed the entire province of Sindh to the Bombay Presidency. In his own private diary, Napier admitted the annexation was an act of sheer unprovoked piracy: 'We have no right to seize Scinde, yet we shall do so, and a very advantageous, useful, humane piece of rascality it will be.' Punch magazine immortalized the conquest with the pun 'Peccavi' (Latin for 'I have sinned').",
    quote: "We have no right to seize Scinde, yet we shall do so, and a very advantageous, useful, humane piece of rascality it will be. — Sir Charles Napier's personal journal",
    keyFigures: ["Sir Charles Napier", "Mir Rustam Khan Talpur", "Mir Nasir Khan Talpur", "Lord Ellenborough"],
    impactStats: ["Annexation of the vast Indus delta and Sindh province", "British control of trade routes into Central Asia", "Criticized even in the British Parliament as naked corporate piracy"],
    details: {
      ruler: "Talpur Dynasty (Amirs of Sindh)",
      significance: "Demonstrated uninhibited imperial land grabs driven by wounded pride after the Afghan disaster",
      weapons: "British artillery, Enfield-minie ball precursor rifles vs Baluchi matchlocks and swords"
    }
  },
  {
    id: "anglo-sikh-wars-1849",
    year: "1849",
    date: "1845 – March 29, 1849",
    era: 3,
    title: "Fall of the Sikh Empire & Annexation of Punjab",
    category: "battle",
    locationName: "Chillianwala, Gujrat & Lahore, Punjab",
    coordinates: [31.5204, 74.3587],
    zoom: 8,
    territoryState: "era3_punjab",
    narrative: "Under Maharaja Ranjit Singh (the 'Lion of Punjab'), the Sikh Empire (Sarkar-i-Khalsa) had stood as an impregnable, secular, modernized military giant armed with European-style artillery and the fierce Khalsa army. After Ranjit Singh's death in 1839, the Lahore Durbar fell into murderous palace intrigue. In the First Anglo-Sikh War (1845–46), prime minister Lal Singh and commander-in-chief Tej Singh committed treason, sabotaging their own Khalsa troops at Sobraon. Under the Treaty of Lahore, Kashmir was severed and sold to Gulab Singh of Jammu for 7.5 million Nanakshahi rupees (Treaty of Amritsar). In 1848–49, the Second Anglo-Sikh War erupted with uprisings in Multan and Chillianwala (where the Khalsa inflicted devastating casualties on British cavalry). At the Battle of Gujrat (Feb 1849), British heavy artillery finally overwhelmed the Sikhs. On March 29, 1849, 11-year-old Maharaja Duleep Singh was stripped of his crown, exiled to England, and the legendary Koh-i-Noor diamond was surrendered to Queen Victoria.",
    quote: "Today Maharaja Ranjit Singh is truly dead! — Lament of aged Sikh soldiers surrendering their swords at Rawalpindi",
    keyFigures: ["Maharaja Ranjit Singh", "Maharaja Duleep Singh", "Rani Jindan", "Lord Dalhousie", "General Hugh Gough", "Sham Singh Attariwala"],
    impactStats: ["Annexation of the entire Sikh Empire into British India", "Surrender of the 105-carat Koh-i-Noor diamond to the British Crown", "Exile of Duleep Singh and imprisonment of Queen Regent Rani Jindan", "Strategic frontier pushed to the Khyber Pass"],
    details: {
      ruler: "Sarkar-i-Khalsa (Maharaja Duleep Singh / Rani Jindan)",
      significance: "The conquest of the final independent indigenous empire in the Indian subcontinent",
      weapons: "Sikh Fauj-i-Khas European artillery, British 18-pounder siege batteries"
    }
  },
  {
    id: "doctrine-of-lapse-1853",
    year: "1853",
    date: "1848 – 1856",
    era: 4,
    title: "Dalhousie's Doctrine of Lapse & Annexation of Awadh",
    category: "politics",
    locationName: "Jhansi, Satara, Nagpur & Lucknow",
    coordinates: [25.4484, 78.5685],
    zoom: 8,
    territoryState: "era4_lapse",
    narrative: "Lord Dalhousie, Governor-General from 1848 to 1856, instituted the predatory 'Doctrine of Lapse'. Overturning centuries-old Hindu and Islamic customary law recognizing adopted children as lawful heirs, Dalhousie decreed that any princely state under EIC paramountcy whose ruler died without a direct biological male heir would automatically 'lapse' (be annexed directly) to the British Empire. Under this pretext, Dalhousie seized Satara (1848), Jaitpur and Sambalpur (1849), Baghat (1850), Udaipur (1852), Jhansi (1853), and Nagpur (1854). When Raja Gangadhar Rao of Jhansi died leaving adopted son Damodar Rao, Dalhousie rejected the succession, outraging Rani Lakshmibai. In February 1856, Dalhousie annexed the wealthy kingdom of Awadh (Oudh) on the pretext of 'misgovernance', deposing its beloved Nawab Wajid Ali Shah and exiling him to Calcutta. Over 75,000 sepoys in the Bengal Army were recruited from Awadh; this act turned the Company's own soldiers into bitter enemies.",
    quote: "Main meri Jhansi nahi doongi! (I shall never surrender my Jhansi!) — Rani Lakshmibai to British political agent Malcolm",
    keyFigures: ["Lord Dalhousie", "Rani Lakshmibai of Jhansi", "Nawab Wajid Ali Shah of Awadh", "Nana Saheb (Adopted son of Baji Rao II)"],
    impactStats: ["Over a dozen princely states forcefully confiscated without combat", "Displaced thousands of royal retainers, talukdars, and palace staff", "Direct ideological trigger for the 1857 Great Rebellion"],
    details: {
      ruler: "Princely States of Jhansi, Awadh, Satara, Nagpur",
      significance: "Created an existential crisis of survival among every royal house across India",
      weapons: "Imperial administrative decrees, treaty annulments"
    }
  },
  {
    id: "mangal-pandey-1857",
    year: "1857",
    date: "March 29, 1857",
    era: 4,
    title: "Mangal Pandey & The Spark at Barrackpore",
    category: "rebellion",
    locationName: "Barrackpore Parade Ground, West Bengal",
    coordinates: [22.7667, 88.3667],
    zoom: 11,
    territoryState: "era4_revolt1857",
    narrative: "Tensions among the 300,000 Indian sepoys of the EIC Bengal Army reached boiling point with the introduction of the new Pattern 1853 Enfield rifle. To load the rifle, soldiers had to bite open paper cartridges heavily greased with animal tallow—specifically mixtures of beef fat (sacrilege to Hindus) and pork lard (abhorrent to Muslims). On the humid afternoon of March 29, 1857, 29-year-old sepoy Mangal Pandey of the 34th Bengal Native Infantry stepped onto the parade ground at Barrackpore, loaded his musket, and exhorted his comrades to rise against the British officers who aimed to destroy their religion. When Adjutant Lieutenant Baugh and Sergeant-Major Hewson rode forward to disarm him, Pandey fired upon them and engaged in close combat. Quartermaster Jemadar Ishwari Prasad refused orders to arrest Pandey. Pandey attempted suicide before capture, was court-martialed, and hanged on April 8, 1857. The spark had been struck.",
    quote: "Come out, brothers! The Europeans are upon us! By biting these cartridges, we will become infidels! — Mangal Pandey's battle cry at Barrackpore",
    keyFigures: ["Mangal Pandey", "Lieutenant Baugh", "Jemadar Ishwari Prasad", "General John Hearsey"],
    impactStats: ["The first armed martyr of the 1857 Uprising", "Disbandment of the 34th and 19th Bengal Native Infantry", "British began calling all Indian freedom fighters 'Pandies'"],
    details: {
      ruler: "East India Company (Bengal Army)",
      significance: "Ignited widespread underground secret communications (circulating chapatis and lotus flowers)",
      weapons: "Enfield 1853 rifled musket, talwar sword"
    }
  },
  {
    id: "meerut-outbreak-1857",
    year: "1857",
    date: "May 10 – 11, 1857",
    era: 4,
    title: "The Meerut Mutiny & The March to Delhi",
    category: "rebellion",
    locationName: "Meerut Cantonment & Red Fort, Delhi",
    coordinates: [28.9845, 77.7064],
    zoom: 9,
    territoryState: "era4_revolt1857",
    narrative: "On May 9, 1857, 85 cavalrymen of the 3rd Native Light Cavalry in Meerut who had refused to touch the greased cartridges were stripped of their uniforms, shackled in irons, and sentenced to 10 years hard labor before the entire cantonment. The next evening, Sunday May 10, as British officers attended church, Indian sepoys broke into open rebellion. They stormed the jail, liberated their comrades, executed British officers, set fire to the European cantonment, and embarked on a midnight forced march 40 miles south to Delhi. Crossing the Yamuna bridge on the morning of May 11, the sepoys stormed the Red Fort. They pleaded with the frail 82-year-old Mughal poet-emperor, Bahadur Shah Zafar II, to lead them. Reluctantly, Zafar agreed, and was proclaimed Shahenshah-e-Hindustan (Emperor of all India), transforming a military mutiny into a nationwide war of national liberation.",
    quote: "Delhi Chalo! (March to Delhi!) — The rallying cry of the Meerut sepoys",
    keyFigures: ["Bahadur Shah Zafar II", "Subedar Bakht Khan", "Colonel Carmichael-Smyth", "Zeenat Mahal"],
    impactStats: ["Liberation of Delhi from British control for over four months", "Proclamation of Bahadur Shah Zafar as sovereign leader of united India", "Spurred simultaneous revolts across Kanpur, Lucknow, Jhansi, and Bihar"],
    details: {
      ruler: "Emperor Bahadur Shah Zafar II (Restored to titular sovereignty)",
      significance: "Unified Hindu and Muslim soldiers under the imperial banner of Hindustan",
      weapons: "Flintlocks, captured ordnance, cavalry lances"
    }
  },
  {
    id: "siege-of-cawnpore-1857",
    year: "1857",
    date: "June – July 1857",
    era: 4,
    title: "Siege of Cawnpore (Kanpur) & Nana Saheb",
    category: "battle",
    locationName: "Kanpur (Cawnpore), Uttar Pradesh",
    coordinates: [26.4499, 80.3319],
    zoom: 10,
    territoryState: "era4_revolt1857",
    narrative: "In Kanpur, Dhondu Pant (popularly known as Nana Saheb), the adopted son of the deposed Peshwa Baji Rao II whose £80,000 pension had been cut off by Dalhousie, led the uprising alongside his brilliant general Tatya Tope and diplomat Azimullah Khan. Nana Saheb besieged General Hugh Wheeler's makeshift entrenchments for three weeks under blistering heat. Running out of food and ammunition, Wheeler surrendered in exchange for safe river passage to Allahabad. However, at Sati Chaura Ghat on June 27, gunfire broke out as British survivors boarded the boats, turning the evacuation into a massacre. Approximately 200 British women and children were taken prisoner and held in the Bibighar. As Henry Havelock's relief force approached, committing atrocities against Indian villages, the Bibighar prisoners were executed. The British retook Kanpur and carried out psychotic retributive vengeance under General James Neill, forcing Indian prisoners to lick bloodied floors before being hung or blown from cannons.",
    quote: "Remember Cawnpore! — The British vengeful battle cry during the suppression of 1857",
    keyFigures: ["Nana Saheb", "Tatya Tope", "Azimullah Khan", "General Hugh Wheeler", "General James Neill"],
    impactStats: ["Shattered British psychological sense of untouchability", "British retribution involved mass lynchings of entire Indian civilian villages", "Tatya Tope escaped to launch a year-long brilliant guerrilla war"],
    details: {
      ruler: "Nana Saheb (Declared Peshwa of the Restored Confederacy)",
      significance: "The bloodiest theater of the 1857 war; polarized colonial racial animosity forever",
      weapons: "Siege artillery, river ambush, matchlocks"
    }
  },
  {
    id: "rani-lakshmibai-jhansi-1858",
    year: "1858",
    date: "March – June 1858",
    era: 4,
    title: "Rani Lakshmibai of Jhansi & The Battle of Gwalior",
    category: "battle",
    locationName: "Jhansi Fort & Kotah-ki-Serai, Gwalior",
    coordinates: [26.2183, 78.1828],
    zoom: 10,
    territoryState: "era4_revolt1857",
    narrative: "When Sir Hugh Rose's Central India Field Force surrounded Jhansi in March 1858, 22-year-old Rani Lakshmibai mounted an epic defense. Women in Jhansi manned the ramparts and supplied ammunition. When British siege guns breached the southern walls, Rani Lakshmibai tied her adopted child Damodar Rao to her back, mounted her horse Badal, leapt over the fortress battlements under cover of night, and rode 100 miles to join forces with Tatya Tope and the Nawab of Banda at Kalpi. Pushed back, the Rani and Tatya executed a masterstroke: they captured the impregnable fortress of Gwalior from Scindia, who fled to the British. On June 17, 1858, at the Battle of Kotah-ki-Serai near Gwalior, clad in male warrior's armor and wielding two swords on horseback, Rani Lakshmibai fell fighting the 8th King's Royal Irish Hussars. Sir Hugh Rose paid her the ultimate imperial tribute.",
    quote: "Here lay the woman who was a rebel and a leader; she was the best and bravest military leader of the rebels. — Major-General Sir Hugh Rose",
    keyFigures: ["Rani Lakshmibai", "Tatya Tope", "Major-General Sir Hugh Rose", "Rao Saheb"],
    impactStats: ["Immortalized in Indian national consciousness as the supreme icon of freedom", "Subhadra Kumari Chauhan's poem: 'Khoob ladi mardani woh toh Jhansi wali rani thi'", "End of resistance in Central India with Tatya Tope's eventual capture and hanging in 1859"],
    details: {
      ruler: "Kingdom of Jhansi (Rani Lakshmibai)",
      significance: "The most heroic military defense of indigenous sovereignty against Victorian imperialism",
      weapons: "Maharashtrian Talwars, matchlocks, horseback swordplay"
    }
  },
  {
    id: "siege-of-lucknow-1858",
    year: "1858",
    date: "June 1857 – March 1858",
    era: 4,
    title: "Siege of Lucknow & Begum Hazrat Mahal",
    category: "battle",
    locationName: "The British Residency, Lucknow, Uttar Pradesh",
    coordinates: [26.8587, 80.9287],
    zoom: 11,
    territoryState: "era4_revolt1857",
    narrative: "Following the wrongful annexation of Awadh, the city of Lucknow erupted into the most protracted and widespread theater of the 1857 war. Begum Hazrat Mahal, the courageous first wife of exiled Nawab Wajid Ali Shah, assumed leadership of the rebellion. She crowned her 11-year-old son Birjis Qadr as Nawab and rallied the talukdars (landowners), sepoys, and citizens. For over five months, Indian forces besieged the British Residency, killing Sir Henry Lawrence with a howitzer shell. British forces under Colin Campbell mounted two relief expeditions, navigating dense urban sniping and booby-trapped palaces. When Lucknow was finally stormed in March 1858, Begum Hazrat Mahal refused all British offers of pension or amnesty, leading thousands of fighters into the Terai jungles of Nepal, where she died in exile in Kathmandu in 1879.",
    quote: "The Begum of Awadh exhibits great energy and ability... She has declared war to the knife against us. — British military dispatches, 1858",
    keyFigures: ["Begum Hazrat Mahal", "Birjis Qadr", "Maulvi Ahmadullah Shah", "Sir Henry Lawrence", "Sir Colin Campbell"],
    impactStats: ["Longest urban siege of the 1857 uprising", "Extensive destruction of Lucknow's magnificent Nawabi architectural palaces", "Begum Hazrat Mahal remained one of the few leaders who never surrendered"],
    details: {
      ruler: "Kingdom of Awadh (Begum Hazrat Mahal as Regent)",
      significance: "Demonstrated mass civil participation—peasants, talukdars, and sepoys fighting together",
      weapons: "Underground mining, urban barricades, sniper musketry"
    }
  },
  {
    id: "fall-of-delhi-1857",
    year: "1857",
    date: "September 14 – 21, 1857",
    era: 4,
    title: "Sacking of Delhi & The Exile of the Last Mughal Emperor",
    category: "battle",
    locationName: "Kashmiri Gate, Humayun's Tomb & Red Fort, Delhi",
    coordinates: [28.6653, 77.2307],
    zoom: 10,
    territoryState: "era4_revolt1857",
    narrative: "In September 1857, British, Sikh, and Gurkha regiments commanded by Brigadier-General John Nicholson blew up the Kashmiri Gate with gunpowder charges and stormed Delhi. Six days of vicious house-to-house fighting followed. Nicholson was mortally wounded, but British forces went on a barbaric rampage: thousands of innocent Delhi citizens were bayoneted, the grand bazaars were sacked, and the entire civilian population was evicted into the rains. On September 21, Emperor Bahadur Shah Zafar was captured at Humayun's Tomb. The rogue British officer Major William Hodson arrested the Emperor's sons, Mirza Mughal and Mirza Khizr Sultan, and grandson Mirza Abu Bakht. At Khooni Darwaza (Blood Gate), Hodson ordered them to strip and shot them dead at point-blank range, presenting their severed heads to the aged Emperor. Zafar was tried for treason against the EIC, convicted, and exiled to Rangoon (Burma) to live in a wretched wooden hut until his death in 1862.",
    quote: "Kitna hai bad-naseeb Zafar dafn ke liye, Do gaz zameen bhi na mili koo-e-yaar mein (How unfortunate is Zafar! For his burial, he could not even get two yards of earth in his beloved homeland). — Bahadur Shah Zafar's exile verse",
    keyFigures: ["Bahadur Shah Zafar II", "Major William Hodson", "Brigadier-General John Nicholson", "Mirza Mughal"],
    impactStats: ["Formal end of the 332-year-old Mughal Empire (1526–1858)", "Murder of the Mughal royal heirs at Khooni Darwaza", "Exile of the last Emperor to Rangoon, Burma"],
    details: {
      ruler: "Mughal Empire (Dissolved)",
      significance: "Symbolized the complete decapitation of indigenous sovereignty in Hindustan",
      weapons: "Siege cannons, breaching mines, Enfield rifle volleys"
    }
  },
  {
    id: "queen-victoria-proclamation-1858",
    year: "1858",
    date: "November 1, 1858",
    era: 4,
    title: "Queen Victoria's Proclamation: The British Raj Begins",
    category: "politics",
    locationName: "Allahabad Darbar, Uttar Pradesh",
    coordinates: [25.4358, 81.8463],
    zoom: 9,
    territoryState: "era5_crown_rule",
    narrative: "Shocked by the near-loss of its Indian possessions, the British Parliament enacted the Government of India Act 1858, abolishing the 258-year-old East India Company and transferring all Indian territories directly to the British Crown. On November 1, 1858, at a grand imperial darbar in Allahabad, Governor-General Lord Canning read out Queen Victoria's Proclamation. Canning became the first 'Viceroy and Governor-General of India'. The proclamation promised that the British Crown would annex no further Indian princely states, respect ancient rights and religions, and admit subjects to civil service examinations without racial bias. However, this ushered in the era of 'Divide and Rule'—the Indian army was restructured so that European troops guarded all heavy artillery, regiments were segregated along caste and ethnic lines, and the martial races theory was institutionalized.",
    quote: "We hold ourselves bound to the natives of our Indian territories by the same obligations of duty which bind us to all our other subjects. — Queen Victoria's Proclamation, 1858",
    keyFigures: ["Queen Victoria", "Lord Canning (First Viceroy)", "Lord Palmerston", "Lord Derby"],
    impactStats: ["Liquidation of the East India Company", "Beginning of direct Crown rule ('The British Raj', 1858–1947)", "Army reorganized: Indian-to-British soldier ratio cut from 5:1 to 2:1"],
    details: {
      ruler: "British Crown (Queen Victoria)",
      significance: "Consolidated a direct imperial autocracy administered by the Indian Civil Service ('The Steel Frame')",
      weapons: "Imperial Royal Proclamation, colonial legal codes (IPC 1860)"
    }
  },
  {
    id: "indigo-revolt-1859",
    year: "1859",
    date: "1859 – 1860",
    era: 5,
    title: "The Indigo Revolt (Nil Vidroha): Peasant Uprising in Bengal",
    category: "rebellion",
    locationName: "Nadia & Jessore, Bengal",
    coordinates: [23.4700, 88.5500],
    zoom: 8,
    territoryState: "era5_crown_rule",
    narrative: "European planters forced Bengali ryots (cultivators) through fraudulent contracts, armed thugs (lathiyals), and torture to cultivate indigo dye instead of food grains like rice. Cultivators were trapped in generational debt through the 'dadon' advance system. In autumn 1859, led by Bishnucharan Biswas and Digambar Biswas in Nadia, peasants launched the Nil Vidroha. Tens of thousands of ryots refused to take advances, took solemn oaths not to sow indigo, and armed themselves with spears, bows, and lathis to repulse planters' mercenary gangs. The revolt received unprecedented support from Bengali intelligentsia—Dinabandhu Mitra wrote the explosive play 'Nil Darpan' (The Mirror of Indigo), translated into English by Michael Madhusudan Dutt and published by Rev. James Long (who was jailed by the British for it). Shaken by the organized resistance, the British government established the Indigo Commission in 1860, which conceded that indigo cultivation was unviable and exploitative.",
    quote: "Not a chest of indigo reached England without being stained with human blood. — E.W.L. Tower, District Magistrate of Faridpur",
    keyFigures: ["Digambar Biswas", "Bishnucharan Biswas", "Dinabandhu Mitra (Playwright)", "Rev. James Long"],
    impactStats: ["Total collapse of European indigo plantations in Bengal", "First successful non-violent and armed peasant strike in colonial history", "Shifted indigo exploitation to Bihar (later leading to Gandhi's Champaran)"],
    details: {
      ruler: "Bengal Government under Crown Rule",
      significance: "United rural peasants and urban middle-class intellectuals against imperial capital",
      weapons: "Spears, lathis, boycott of European planters, investigative journalism"
    }
  },
  {
    id: "dadabhai-naoroji-drain-1867",
    year: "1867",
    date: "May 2, 1867",
    era: 5,
    title: "Dadabhai Naoroji Unmasks the 'Drain of Wealth'",
    category: "politics",
    locationName: "East India Association, London & Bombay",
    coordinates: [18.9322, 72.8333],
    zoom: 6,
    territoryState: "era5_crown_rule",
    narrative: "On May 2, 1867, before the East India Association in London, Dadabhai Naoroji ('The Grand Old Man of India') delivered a pioneering paper titled 'England's Debt to India', later expanded into his monumental book 'Poverty and Un-British Rule in India' (1901). Naoroji systematically dismantled the colonial narrative of British 'benevolence'. He proved mathematically that Britain was systematically siphoning away India's wealth through an unrequited surplus: Home Charges (pensions of British officials, dividends on railway capital guaranteed at 5% tax-free, interest on Indian national debt accrued to finance Britain's foreign wars), remittances by British civil servants, and military expenditure. Recent historical economic studies by Prof. Utsa Patnaik calculate that Britain drained a staggering $45 TRILLION from India between 1765 and 1938, reducing India's share of world GDP from 27% in 1700 to less than 3% at independence.",
    quote: "The British rule has been: An unceasing, relentless, expanding, and cruel drain of wealth, which is bleeding India to death. — Dadabhai Naoroji",
    keyFigures: ["Dadabhai Naoroji", "Romesh Chunder Dutt (Economic Historian)", "Mahadev Govind Ranade"],
    impactStats: ["Calculated total drain of wealth exceeding $45 Trillion", "Demolished the moral justification of the British Empire", "Pioneered the economic critique of modern colonialism"],
    details: {
      ruler: "British Empire (Imperial Raj)",
      significance: "Transformed Indian nationalist discourse from petitioning to economic indictment",
      weapons: "Economic statistics, parliamentary speeches, economic history books"
    }
  },
  {
    id: "great-famine-1876",
    year: "1876",
    date: "1876 – 1878",
    era: 5,
    title: "The Great Famine of 1876–78 & The Delhi Durbar",
    category: "famine",
    locationName: "Madras, Mysore, Hyderabad, Bombay & Delhi",
    coordinates: [13.0827, 80.2707],
    zoom: 7,
    territoryState: "era5_great_famine",
    narrative: "The Great Famine of 1876–1878 decimated southern India, killing an estimated 5.5 to 10.3 million people across Madras, Mysore, Hyderabad, and Bombay presidencies. The disaster was exacerbated to genocidal proportions by the dogmatic free-market fanaticism of Viceroy Lord Lytton. Believing in Malthusian population control and Adam Smith's laissez-faire doctrine, Lytton strictly forbade government intervention to lower grain prices or stop private merchants from hoarding. In fact, a record 6.4 million hundredweight of wheat was exported from starving India to the United Kingdom in 1877 alone! In the relief camps, Sir Richard Temple imposed the notorious 'Temple Wage'—a daily ration of just 16 ounces of grain (yielding 1,627 calories), which was less than the starvation rations provided at the Buchenwald concentration camp in WWII. To add obscene insult to agony, in January 1877, as 100,000 Indians starved to death each month, Lord Lytton hosted the magnificent Imperial Assemblage (Delhi Durbar) with lavish 7-course banquets for 84,000 guests to proclaim Queen Victoria 'Empress of India' (Kaisar-i-Hind).",
    quote: "There is to be no interference of any kind on the part of Government with the object of reducing the price of food. — Lord Lytton's official famine decree",
    keyFigures: ["Lord Lytton (Viceroy)", "Sir Richard Temple (Famine Commissioner)", "William Digby (Journalist)"],
    impactStats: ["5.5 to 10.3 Million Indian deaths from starvation and epidemic disease", "Record wheat exports to Britain while millions starved", "Obscene imperial expenditure on the 1877 Delhi Durbar banquet"],
    details: {
      ruler: "Viceroy Lord Lytton",
      significance: "One of the worst man-made atrocities of the Victorian era; documented in Mike Davis's 'Late Victorian Holocausts'",
      weapons: "Laissez-faire food export, penal starvation labor camps ('Temple Wage')"
    }
  },
  {
    id: "founding-of-inc-1885",
    year: "1885",
    date: "December 28 – 31, 1885",
    era: 5,
    title: "Foundation of the Indian National Congress in Bombay",
    category: "politics",
    locationName: "Gokuldas Tejpal Sanskrit College, Bombay",
    coordinates: [18.9320, 72.8280],
    zoom: 10,
    territoryState: "era5_crown_rule",
    narrative: "On December 28, 1885, 72 educated Indian delegates from across the subcontinent assembled in the hall of Gokuldas Tejpal Sanskrit College near Gowalia Tank in Bombay to establish the Indian National Congress (INC). Facilitated by retired British civil servant Allan Octavian Hume (who conceived it partly as a 'safety valve' to prevent another 1857-style violent explosion), the first session was presided over by prominent Calcutta barrister Womesh Chandra Bonnerjee. Attendees included Dadabhai Naoroji, Dinshaw Wacha, Pherozeshah Mehta, and Justice K.T. Telang. In its early 'Moderate' phase (1885–1905), the Congress adopted the method of 3 Ps—Prayer, Petition, and Protest—believing in British sense of justice and appealing for legislative councils expansion, higher civil service age limits, and reduced military spending. Though mocked by Viceroy Dufferin as representing a 'microscopic minority', the Congress evolved into the premier vehicle of mass anti-colonial struggle in world history.",
    quote: "The Indian National Congress represents only a microscopic minority of the people. — Viceroy Lord Dufferin, 1888",
    keyFigures: ["Allan Octavian Hume", "W.C. Bonnerjee", "Dadabhai Naoroji", "Pherozeshah Mehta", "Dinshaw Wacha"],
    impactStats: ["Birth of the political party that led India to independence in 1947", "First Pan-Indian platform transcending regional, caste, and religious barriers", "Transition from armed mutinies to organized democratic constitutional struggle"],
    details: {
      ruler: "Viceroy Lord Dufferin",
      significance: "Laid the institutional foundation of the Indian freedom movement",
      weapons: "Constitutional petitions, resolutions, parliamentary lobbying"
    }
  },
  {
    id: "partition-of-bengal-1905",
    year: "1905",
    date: "October 16, 1905",
    era: 6,
    title: "Lord Curzon Partitions Bengal & The Swadeshi Movement",
    category: "rebellion",
    locationName: "Calcutta & Dhaka, Bengal",
    coordinates: [22.5726, 88.3639],
    zoom: 8,
    territoryState: "era6_partition_bengal",
    narrative: "Viceroy Lord Curzon, an arrogant high imperialist, sought to shatter the burgeoning nationalist movement in Bengal by severing the province along communal religious lines. On October 16, 1905, Bengal was partitioned into Muslim-majority 'Eastern Bengal & Assam' (capital Dhaka) and Hindu-majority 'Western Bengal' (including Bihar and Orissa). Curzon's Home Secretary H.H. Risley frankly noted in secret files: 'Bengal united is a power; Bengal divided will pull in several different ways.' The partition ignited a volcanic wave of outrage known as the Swadeshi and Boycott Movement. Rabindranath Tagore composed 'Amar Shonar Bangla' (later Bangladesh's national anthem) and led massive processions where Hindus and Muslims tied Rakhis on each other's wrists as a symbol of unbreakable brotherhood. Bonfires of British Manchester cloth were lit nationwide, Indian handlooms and swadeshi banks were founded, and Bankim Chandra Chattopadhyay's hymn 'Vande Mataram' became the national battle cry. The agitation was so ferocious that King George V was forced to annul the partition at the 1911 Delhi Durbar.",
    quote: "Bengal united is a power. Bengal divided will pull in several different ways... One of our main objects is to split up and thereby weaken a solid body of opponents to our rule. — H.H. Risley, Home Secretary to Government of India, 1904",
    keyFigures: ["Lord Curzon (Viceroy)", "Rabindranath Tagore", "Surendranath Banerjee", "Bipin Chandra Pal", "Aurobindo Ghose"],
    impactStats: ["First nationwide mass economic boycott of British goods in India", "Forced the British Crown to annul the partition in 1911", "Shift of the British imperial capital from Calcutta to Delhi in 1911"],
    details: {
      ruler: "Viceroy Lord Curzon",
      significance: "Radicalized the freedom struggle, birthing the extremist wing and revolutionary secret societies",
      weapons: "Economic boycott, bonfire of British Manchester cloth, Swadeshi handlooms, patriotic songs"
    }
  },
  {
    id: "surat-split-1907",
    year: "1907",
    date: "December 1907",
    era: 6,
    title: "Surat Split: Lal-Bal-Pal & The Rise of Extremism",
    category: "politics",
    locationName: "Surat, Gujarat (Tapti Riverbank)",
    coordinates: [21.1702, 72.8311],
    zoom: 10,
    territoryState: "era6_nationalism",
    narrative: "At the 1907 annual session of Congress in Surat on the banks of the Tapti river, simmering ideological conflict between the 'Moderates' (led by Gopal Krishna Gokhale, Pherozeshah Mehta, and Rash Behari Ghosh) and the 'Extremists' (led by the iconic triumvirate Lal-Bal-Pal: Lala Lajpat Rai, Bal Gangadhar Tilak, and Bipin Chandra Pal, alongside Aurobindo Ghose) exploded. The Moderates wanted to restrict the Swadeshi and boycott movement strictly to Bengal and foreign goods, while Tilak and the Extremists demanded extending Swadeshi to the entire country, boycotting government schools, courts, and titles, and declaring 'Swaraj' (Self-Rule) as the explicit goal. As Rash Behari Ghosh took the dais, shoes, chairs, and sticks were hurled across the tent; Tilak stood with arms folded amidst the melee. The Congress split violently. Taking advantage, the British jailed Tilak for six years in the disease-ridden Mandalay fortress in Burma for writing articles defending revolutionaries, while Aurobindo Ghose was tried in the Alipore Bomb case.",
    quote: "Swaraj is my birthright, and I shall have it! — Lokmanya Bal Gangadhar Tilak",
    keyFigures: ["Bal Gangadhar Tilak", "Lala Lajpat Rai", "Bipin Chandra Pal", "Gopal Krishna Gokhale", "Aurobindo Ghose"],
    impactStats: ["Congress split into Moderates and Radicals for 9 years until Lucknow Pact (1916)", "Tilak exiled to Mandalay prison (Burma) from 1908 to 1914", "Popularization of mass political agitation over gentlemanly petitions"],
    details: {
      ruler: "British Administration (Lord Minto)",
      significance: "Marked the demise of political mendicancy and the rise of uncompromising demand for Swaraj",
      weapons: "Public mass speeches, Ganesh Utsav and Shivaji Utsav mobilization, fiery press (Kesari / Mahratta)"
    }
  },
  {
    id: "jallianwala-bagh-1919",
    year: "1919",
    date: "April 13, 1919",
    era: 6,
    title: "The Jallianwala Bagh Massacre in Amritsar",
    category: "famine", // categorized as atrocity/massacre
    locationName: "Jallianwala Bagh, Amritsar, Punjab",
    coordinates: [31.6206, 74.8801],
    zoom: 11,
    territoryState: "era6_nationalism",
    narrative: "Following World War I—in which over 1.3 million Indian soldiers fought for the British Empire—the British reciprocated not with self-rule, but with the draconian Rowlatt Act of March 1919, which authorized indefinite arrest and detention without trial ('No Dalil, No Vakil, No Appeal'). Protests erupted across Punjab. On April 13, 1919, the harvest festival of Baisakhi, 20,000 unarmed men, women, and children gathered peacefully inside Jallianwala Bagh, an enclosed six-acre walled garden with only one narrow exit. Brigadier-General Reginald Dyer marched 50 Gurkha and Baluchi riflemen through the alley, blocked the exit, and without giving any dispersal warning, ordered his troops to open fire directly into the thickest parts of the trapped crowd. For 10 agonizing minutes, soldiers fired 1,650 rounds of .303 ammunition until their ammunition was exhausted. People jumped to their deaths into the garden's deep well to escape the bullets. Officially, British records claimed 379 dead; Indian National Congress investigations proved over 1,000 to 1,500 civilians were murdered and 1,200 wounded. Dyer callously abandoned the wounded overnight without medical care, and later enacted the infamous 'Crawling Order', forcing Indians to crawl on their bellies through the street where a British missionary had been assaulted. Rabindranath Tagore renounced his British Knighthood in scorching protest.",
    quote: "I fired and continued to fire until the ammunition was exhausted... I think it quite possible that I could have dispersed them without firing, but they would have come back and laughed, and I would have made a fool of myself. — General Reginald Dyer before the Hunter Commission",
    keyFigures: ["Brigadier-General Reginald Dyer", "Michael O'Dwyer (Lt. Governor of Punjab)", "Dr. Saifuddin Kitchlew", "Dr. Satyapal", "Rabindranath Tagore"],
    impactStats: ["1,000+ innocent citizens killed, over 1,200 maimed", "Rabindranath Tagore renounced his Knighthood: 'The time has come when badges of honour make our shame glaring'", "Total destruction of Indian faith in British justice; catalyzed Non-Cooperation"],
    details: {
      ruler: "Michael O'Dwyer (Lt. Governor of Punjab) / Lord Chelmsford",
      significance: "The moral death knell of the British Empire in India; turned Mahatma Gandhi into an uncompromising opponent of the Raj",
      weapons: "Lee-Enfield .303 rifles (1,650 rounds fired into trapped crowd)"
    }
  },
  {
    id: "non-cooperation-chauri-chaura-1922",
    year: "1922",
    date: "1920 – February 12, 1922",
    era: 6,
    title: "Non-Cooperation Movement & Chauri Chaura",
    category: "rebellion",
    locationName: "Chauri Chaura, Gorakhpur, Uttar Pradesh",
    coordinates: [26.6508, 83.5900],
    zoom: 9,
    territoryState: "era6_nationalism",
    narrative: "In response to the Jallianwala Bagh butcheries and the Khilafat grievance, Mahatma Gandhi launched the Non-Cooperation Movement in 1920. He promised 'Swaraj in one year' if non-violent non-cooperation was practiced with iron discipline. Millions of Indians renounced government titles, boycotted British courts, schools, and foreign textiles; lawyers like Motilal Nehru and C.R. Das gave up lucrative practices. The movement paralyzed colonial administration. However, on February 4, 1922, at Chauri Chaura near Gorakhpur, police opened fire on a peaceful procession of peasants protesting liquor sales and food prices. Enraged by police brutality and running out of ammunition, the crowd chased 22 policemen inside the local police station and set it ablaze, burning all 22 officers alive. Heartbroken that the masses had not fully internalized Ahimsa (non-violence), Gandhi unilaterally suspended the entire nationwide Non-Cooperation Movement on February 12, despite fierce protests from young leaders like Subhas Chandra Bose and Jawaharlal Nehru.",
    quote: "I would suffer every humiliation, every torture, absolute ostracism and death itself to prevent the movement from becoming violent. — Mahatma Gandhi on calling off the movement",
    keyFigures: ["Mahatma Gandhi", "Bhagwan Ahir (Peasant leader)", "Jawaharlal Nehru", "Subhas Chandra Bose"],
    impactStats: ["First true mass movement drawing peasants, workers, students, and women across India", "Gandhi sentenced to 6 years imprisonment for sedition in 1922", "Disillusionment led young patriots to form armed revolutionary groups (HSRA)"],
    details: {
      ruler: "Viceroy Lord Reading",
      significance: "Demonstrated the unprecedented power of mass non-violent civil disobedience",
      weapons: "Boycott, strike (hartal), charkha spinning, burning of foreign cloth"
    }
  },
  {
    id: "kakori-train-action-1925",
    year: "1925",
    date: "August 9, 1925",
    era: 6,
    title: "Kakori Train Action: Ram Prasad Bismil & Ashfaqulla Khan",
    category: "rebellion",
    locationName: "Kakori Railway Station, Lucknow, Uttar Pradesh",
    coordinates: [26.8770, 80.7930],
    zoom: 11,
    territoryState: "era6_nationalism",
    narrative: "Frustrated by the sudden suspension of the Non-Cooperation movement, revolutionary youth founded the Hindustan Republican Association (HRA) in 1924, dedicated to overthrowing British rule by armed revolution and establishing a Federal Republic of the United States of India. Desperately needing funds to buy firearms, on August 9, 1925, ten young revolutionaries commanded by Ram Prasad Bismil and Ashfaqulla Khan, alongside Chandrashekhar Azad and Rajendra Lahiri, stopped the 8-Down passenger train near Kakori outside Lucknow. They broke open the railway guard's iron safe carrying British imperial government tax money and escaped with 4,600 rupees, taking immense care not to harm passengers. The British launched a ruthless dragnet. After a prolonged trial, Ram Prasad Bismil, Ashfaqulla Khan, Rajendra Lahiri, and Roshan Singh were hanged in December 1927. Ashfaqulla Khan became the first Muslim revolutionary of this era to be hanged for freedom, demonstrating the deep communal fraternity of the armed struggle.",
    quote: "Sarfaroshi ki tamanna ab hamare dil mein hai, dekhna hai zor kitna baazu-e-qaatil mein hai (The desire for revolution is in our hearts; let us see how much strength remains in the executioner's arm). — Immortal poem popularized by Ram Prasad Bismil",
    keyFigures: ["Ram Prasad Bismil", "Ashfaqulla Khan", "Chandrashekhar Azad", "Rajendra Lahiri", "Roshan Singh"],
    impactStats: ["Four legendary revolutionaries martyred by hanging in December 1927", "Reorganized by Bhagat Singh and Azad into the Hindustan Socialist Republican Association (HSRA)", "Galvanized urban youth across Punjab, UP, and Bengal"],
    details: {
      ruler: "British Raj (Lord Reading / Lord Irwin)",
      significance: "Audacious armed strike against imperial treasury logistics",
      weapons: "German Mauser broomhandle pistols, railway emergency pull"
    }
  },
  {
    id: "bhagat-singh-saunders-1928",
    year: "1928",
    date: "December 17, 1928",
    era: 6,
    title: "Assassination of Saunders: Avenging Lala Lajpat Rai",
    category: "rebellion",
    locationName: "District Police Headquarters, Lahore (Modern Pakistan)",
    coordinates: [31.5600, 74.3100],
    zoom: 10,
    territoryState: "era6_nationalism",
    narrative: "In October 1928, the all-British Simon Commission arrived in Lahore to decide India's constitutional fate without a single Indian member. Protests swept the city chanting 'Simon Go Back'. Senior nationalist leader Lala Lajpat Rai ('Sher-e-Punjab') led a peaceful demonstration at the railway station. British Senior Superintendent of Police James A. Scott ordered a brutal lathi charge; Scott personally struck the 63-year-old Lala Lajpat Rai repeatedly on his chest and head. Lajpat Rai died of his injuries on November 17, 1928, declaring: 'Every blow aimed at me will be a nail in the coffin of the British Empire.' Vowing vengeance, the HSRA plotted Scott's assassination. On December 17, 1928, outside police headquarters, Bhagat Singh and Shivaram Rajguru mistook Assistant Superintendent of Police John P. Saunders for Scott. Rajguru fired a bullet into Saunders' head, and Bhagat Singh pumped five bullets into his torso. Covered by Chandrashekhar Azad (who shot dead pursuing constable Chanan Singh), the young revolutionaries escaped safely on bicycles.",
    quote: "The murder of a leader respected by millions of people at the unworthy hands of an ordinary police official was an insult to the nation... We regret having had to kill a human being, but he was part and parcel of that heartless, vicious and tyrannical institution. — HSRA poster plastered on Lahore walls",
    keyFigures: ["Bhagat Singh", "Shivaram Rajguru", "Chandrashekhar Azad", "Sukhdev Thapar", "Lala Lajpat Rai"],
    impactStats: ["Saunders killed in broad daylight in Lahore", "Restored the wounded self-respect of the Indian nation", "Bhagat Singh cut his hair and wore a fedora to evade the nationwide colonial manhunt"],
    details: {
      ruler: "British Punjab Police Administration",
      significance: "Direct armed retaliation against imperial police brutality",
      weapons: "Colt .32 automatic pistol, Mauser pistol, bicycles"
    }
  },
  {
    id: "central-assembly-bombing-1929",
    year: "1929",
    date: "April 8, 1929",
    era: 6,
    title: "Central Legislative Assembly Bombing: 'To Make the Deaf Hear'",
    category: "rebellion",
    locationName: "Central Legislative Assembly (Old Parliament House), New Delhi",
    coordinates: [28.6172, 77.2081],
    zoom: 11,
    territoryState: "era6_nationalism",
    narrative: "To protest against two draconian, anti-labor bills—the Public Safety Bill and the Trade Disputes Bill—which aimed to crush labor unions and suppress political dissent, the HSRA decided to stage a dramatic act of political theater. On April 8, 1929, 21-year-old Bhagat Singh and Batukeshwar Dutt sat quietly in the visitors' gallery of the Central Legislative Assembly in Delhi. As the Speaker announced the passage of the bill, Bhagat Singh hurled two low-intensity chemical smoke bombs into the empty space on the floor of the house. The bombs were deliberately designed not to kill, but to create loud noise and smoke. As the chamber filled with smoke and panicked British members dove under desks, Bhagat Singh and Dutt showered hundreds of red leaflets into the hall, shouting 'Inquilab Zindabad!' (Long Live the Revolution!) and 'Samrajyavad ka Nash Ho!' (Down with Imperialism!). Instead of attempting escape, both stood calmly, discarded their weapons, and peacefully surrendered to police so they could use the courtroom as a national loudspeaker to broadcast their socialist revolutionary manifesto to the world.",
    quote: "It takes a loud voice to make the deaf hear. With these immortal words uttered by a French anarchist martyr, do we justify this action of ours. — Red leaflet thrown by Bhagat Singh and B.K. Dutt",
    keyFigures: ["Bhagat Singh", "Batukeshwar Dutt", "Vithalbhai Patel (Assembly President)", "Sir John Simon (in gallery)"],
    impactStats: ["Popularized the slogan 'Inquilab Zindabad' across all of India", "Zero fatalities; demonstrated deliberate moral restraint", "Court trial publicized socialist anti-imperialist ideology to millions of Indians"],
    details: {
      ruler: "Viceroy Lord Irwin",
      significance: "Shifted revolutionary strategy from isolated assassinations to political propaganda of the deed",
      weapons: "Low-grade smoke bombs, revolutionary pamphlets"
    }
  },
  {
    id: "purna-swaraj-declaration-1929",
    year: "1929",
    date: "December 31, 1929",
    era: 6,
    title: "Purna Swaraj Declaration: Midnight on the Banks of the Ravi",
    category: "politics",
    locationName: "Lahore (Ravi Riverbank), Punjab",
    coordinates: [31.5800, 74.3200],
    zoom: 9,
    territoryState: "era6_nationalism",
    narrative: "At midnight on New Year's Eve, December 31, 1929, on the frosty banks of the River Ravi in Lahore, the Indian National Congress under the presidency of 40-year-old Jawaharlal Nehru passed the historic 'Purna Swaraj' (Complete Independence) resolution. Abandoning the earlier compromise goal of 'Dominion Status' within the British Empire, Nehru hoisted the tricolor national flag amidst deafening roars of 'Inquilab Zindabad'. The Congress declared that British rule had ruined India economically, politically, culturally, and spiritually, and that it was a crime against man and God to submit any longer to such bondage. The Working Committee designated January 26, 1930, as 'Purna Swaraj Day' (Independence Day), celebrated annually until 1947, and later chosen as the date the Constitution of India came into effect in 1950, creating the Republic of India.",
    quote: "We believe that it is the inalienable right of the Indian people, as of any other people, to have freedom and to enjoy the fruits of their toil... We hold it to be a crime against man and God to submit any longer to a rule that has caused this fourfold ruin to our country. — Purna Swaraj Declaration, Lahore, 1929",
    keyFigures: ["Jawaharlal Nehru", "Mahatma Gandhi", "Subhas Chandra Bose", "Motilal Nehru"],
    impactStats: ["Total Independence (Purna Swaraj) established as the sole non-negotiable goal", "January 26 chosen as national pledge day (becoming Republic Day in 1950)", "Authorized Mahatma Gandhi to launch the Civil Disobedience Movement"],
    details: {
      ruler: "Viceroy Lord Irwin",
      significance: "Shattered any remaining pretense of constitutional accommodation within the British Empire",
      weapons: "Tricolor flag, public mass oaths, constitutional declaration"
    }
  },
  {
    id: "dandi-salt-march-1930",
    year: "1930",
    date: "March 12 – April 6, 1930",
    era: 6,
    title: "The Salt Satyagraha: Gandhi's Epic March to Dandi",
    category: "freedom",
    locationName: "Sabarmati Ashram (Ahmedabad) to Dandi Beach, Gujarat",
    coordinates: [20.8880, 72.8020],
    zoom: 8,
    territoryState: "era6_civil_disobedience",
    narrative: "On March 12, 1930, 61-year-old Mahatma Gandhi set out from Sabarmati Ashram in Ahmedabad with 78 chosen followers on an audacious 240-mile journey on foot to the coastal village of Dandi. His chosen target was the British Salt Tax, which placed an 8.2% tax on salt—a basic necessity of life that every peasant required, while British law banned Indians from producing or collecting their own natural salt. For 24 days, international journalists and hundreds of thousands of villagers lined the dusty roads. On the morning of April 6, after praying in the Arabian sea, Gandhi bent down and scooped up a lump of natural salt mud from the beach, holding it aloft and breaking the British imperial salt law. This simple symbolic gesture ignited nationwide Civil Disobedience: millions of Indians made salt on coastlines, women picketed liquor shops, and peasants refused land revenue. Over 60,000 to 90,000 Indians, including Gandhi and all Congress leaders, were arrested. At the Dharasana Salt Works, Sarojini Naidu and Manilal Gandhi led unarmed satyagrahis who walked forward in orderly columns to be brutally clubbed down with steel-tipped lathis by police without raising a hand to defend themselves, an atrocity reported worldwide by American journalist Webb Miller that destroyed Britain's moral standing.",
    quote: "With this handful of salt, I am shaking the foundations of the British Empire. — Mahatma Gandhi at Dandi, April 6, 1930",
    keyFigures: ["Mahatma Gandhi", "Sarojini Naidu", "Webb Miller (American Journalist)", "Abbas Tyabji"],
    impactStats: ["Over 90,000 Indians voluntarily entered British prisons", "Worldwide front-page coverage shaming British colonial violence", "Forced Viceroy Lord Irwin to negotiate as an equal in the Gandhi-Irwin Pact of 1931"],
    details: {
      ruler: "Viceroy Lord Irwin",
      significance: "The most brilliant public relations and mass mobilization campaign in modern political history",
      weapons: "Handful of sea salt, non-violent mass defiance (Satyagraha)"
    }
  },
  {
    id: "chittagong-armoury-raid-1930",
    year: "1930",
    date: "April 18, 1930",
    era: 6,
    title: "Chittagong Armoury Raid: Surya Sen's Indian Republican Army",
    category: "rebellion",
    locationName: "Chittagong (Chattogram), Bengal (Modern Bangladesh)",
    coordinates: [22.3569, 91.7832],
    zoom: 10,
    territoryState: "era6_civil_disobedience",
    narrative: "On Good Friday, April 18, 1930, a revolutionary group calling itself the Indian Republican Army (Chittagong Branch), commanded by beloved schoolteacher Surya Sen ('Masterda'), pulled off the most audacious armed insurrection of the 20th century in India. Sixty-four young revolutionaries, including teenage students and heroic young women like Pritilata Waddedar and Kalpana Datta, struck simultaneously across Chittagong. Disguised in British military uniforms, one detachment seized the Police Armoury, capturing .303 rifles and Lewis guns; another captured the Auxiliary Force armoury; while a third cut telegraph and telephone wires and severed the railway tracks, completely isolating Chittagong from the rest of the British Empire. Masterda hoisted the national flag, took the royal salute, and proclaimed a Provisional Revolutionary Government of Free India. When imperial troops counterattacked four days later at Jalalabad Hill, the revolutionaries fought an epic pitched battle, killing 64 British troops before melting into the countryside to wage guerrilla warfare for years. Surya Sen was eventually captured through betrayal, brutally tortured (his teeth knocked out and nails pulled), and hanged in January 1934.",
    quote: "Never forget the 18th of April, 1930, the day of the eastern rebellion in Chittagong... Live and die for India's freedom. — Surya Sen's final letter from the condemned cell",
    keyFigures: ["Surya Sen (Masterda)", "Pritilata Waddedar (Martyr of Pahartali Club)", "Kalpana Datta", "Ananta Singh", "Ganesh Ghosh"],
    impactStats: ["Chittagong declared an independent republic for four days", "Pritilata Waddedar led the attack on the Europeans-only Pahartali Club and consumed cyanide", "Surya Sen and Tarakeshwar Dastidar martyred by hanging in 1934"],
    details: {
      ruler: "British Bengal Police & Eastern Frontier Rifles",
      significance: "Proved that Indian youth could defeat imperial garrisons and establish liberated zones",
      weapons: "Captured Lewis machine guns, .303 rifles, potassium cyanide capsules"
    }
  },
  {
    id: "bhagat-singh-martyrdom-1931",
    year: "1931",
    date: "March 23, 1931",
    era: 6,
    title: "Martyrdom of Bhagat Singh, Rajguru & Sukhdev",
    category: "freedom",
    locationName: "Lahore Central Jail & Hussainiwala, Punjab",
    coordinates: [31.5300, 74.3400],
    zoom: 10,
    territoryState: "era6_civil_disobedience",
    narrative: "On the evening of March 23, 1931, in Lahore Central Jail, 23-year-old Bhagat Singh, Shivaram Rajguru, and Sukhdev Thapar were marched to the gallows 11 hours ahead of schedule in complete violation of prison rules, because the British feared massive riots. Reading Vladimir Lenin's writings until his final moments, Bhagat Singh smiled as the noose was fitted around his neck. The three young men kissed the hemp ropes, raised the cry 'Inquilab Zindabad!', and were hanged. Terrified of public wrath, prison authorities secretly hacked their bodies to pieces behind the prison walls, stuffed them into sacks, smuggled them out through a back gate, and burnt them with kerosene on the banks of the Sutlej river at Hussainiwala. Bhagat Singh's supreme sacrifice immortalized him as Shaheed-e-Azam (The Supreme Martyr), inspiring millions across the subcontinent and establishing socialist anti-imperialism as a cornerstone of Indian political thought.",
    quote: "They may kill me, but they cannot kill my ideas. They can crush my body, but they will not be able to crush my spirit. — Bhagat Singh",
    keyFigures: ["Bhagat Singh", "Shivaram Rajguru", "Sukhdev Thapar", "Viceroy Lord Irwin"],
    impactStats: ["March 23 observed annually as Shaheed Diwas (Martyrs' Day)", "Shattered British illusions of regaining political legitimacy in Punjab", "Bhagat Singh's popularity briefly eclipsed that of Mahatma Gandhi"],
    details: {
      ruler: "Viceroy Lord Irwin",
      significance: "The supreme moral symbol of youth sacrifice in the Indian independence struggle",
      weapons: "Revolutionary writings, hunger strikes, martyrdom"
    }
  },
  {
    id: "poona-pact-1932",
    year: "1932",
    date: "September 24, 1932",
    era: 6,
    title: "The Poona Pact: Dr. B.R. Ambedkar & Mahatma Gandhi",
    category: "treaty",
    locationName: "Yerwada Central Jail, Pune, Maharashtra",
    coordinates: [18.5560, 73.8820],
    zoom: 10,
    territoryState: "era6_civil_disobedience",
    narrative: "In August 1932, British Prime Minister Ramsay MacDonald announced the 'Communal Award', granting separate electorates to the 'Depressed Classes' (Dalits/Untouchables), continuing the colonial divide-and-rule policy. Mahatma Gandhi, imprisoned in Yerwada Jail in Pune, believed separate electorates would permanently sever Dalits from the Hindu fold and perpetuate untouchability. On September 20, Gandhi commenced a 'fast unto death'. Dr. B.R. Ambedkar, the brilliant Dalit scholar and leader, fiercely defended the political rights of the oppressed classes but faced immense pressure as Gandhi's health deteriorated rapidly. Following intense negotiations brokered by Madan Mohan Malaviya, C. Rajagopalachari, and Tej Bahadur Sapru, Ambedkar and Gandhi signed the historic Poona Pact on September 24. Under the pact, the demand for separate electorates was relinquished; in return, the number of reserved seats for the Depressed Classes in provincial legislatures was MORE THAN DOUBLED from 71 to 148, with an additional 18% reservation in the Central Legislature.",
    quote: "There is immense power in that fragile old man... I was placed in a position where I had to save Gandhi's life while fighting for my people's rights. — Dr. B.R. Ambedkar",
    keyFigures: ["Dr. B.R. Ambedkar", "Mahatma Gandhi", "Madan Mohan Malaviya", "C. Rajagopalachari"],
    impactStats: ["Reserved legislative seats for Dalits increased from 71 to 148", "Laid the constitutional framework for Affirmative Action (Reservations) in modern India", "Prevented constitutional balkanization while securing guaranteed political representation"],
    details: {
      ruler: "British Prime Minister Ramsay MacDonald / Viceroy Lord Willingdon",
      significance: "Crucial compromise that shaped the social justice provisions of the Indian Constitution",
      weapons: "Hunger strike unto death vs constitutional rights advocacy"
    }
  },
  {
    id: "wwii-forced-entry-1939",
    year: "1939",
    date: "September 3, 1939",
    era: 7,
    title: "India Dragged into WWII & Congress Ministries Resign",
    category: "politics",
    locationName: "Viceroy's House (Rashtrapati Bhavan), New Delhi",
    coordinates: [28.6143, 77.1994],
    zoom: 10,
    territoryState: "era7_wwii",
    narrative: "On September 3, 1939, Britain declared war on Nazi Germany following the invasion of Poland. Without consulting a single Indian political leader, the Central Legislative Assembly, or the elected provincial ministries governing 8 out of 11 Indian provinces under the Government of India Act 1935, Viceroy Lord Linlithgow unilaterally declared India at war alongside Britain. Outraged by this imperial arrogance—that a country fighting fascism in Europe was ruling India as a totalitarian colony—the Indian National Congress demanded an immediate declaration of Britain's war aims and a commitment to post-war independence. When Linlithgow offered only vague promises of dominion status in the distant future, all Congress provincial ministries resigned in protest in October and November 1939. This constitutional vacuum was eagerly exploited by Muhammad Ali Jinnah and the Muslim League, who celebrated December 22, 1939, as the 'Day of Deliverance'. Over 2.5 million Indian soldiers—the largest volunteer army in human history—were deployed by the British across North Africa, Italy, and Southeast Asia.",
    quote: "India cannot associate herself in a war said to be for democratic freedom when that very freedom is denied to her. — Congress Working Committee Resolution, 1939",
    keyFigures: ["Lord Linlithgow (Viceroy)", "Jawaharlal Nehru", "Muhammad Ali Jinnah", "Sardar Vallabhbhai Patel"],
    impactStats: ["Resignation of 8 democratically elected provincial Indian governments", "2.5 million Indian soldiers mobilized for Britain's war effort", "Empowered the Muslim League to advance the two-nation theory (1940 Lahore Resolution)"],
    details: {
      ruler: "Viceroy Lord Linlithgow / Winston Churchill",
      significance: "Created the final imperial confrontation leading to the Quit India uprising",
      weapons: "Executive viceregal decree, wartime defense regulations"
    }
  },
  {
    id: "great-escape-netaji-1941",
    year: "1941",
    date: "January 16 – 17, 1941",
    era: 7,
    title: "The Great Escape of Netaji Subhas Chandra Bose",
    category: "freedom",
    locationName: "38/2 Elgin Road, Calcutta to Peshawar & Berlin",
    coordinates: [22.5377, 88.3516],
    zoom: 8,
    territoryState: "era7_wwii",
    narrative: "Placed under strict house arrest by the British CID at his Elgin Road home in Calcutta, Netaji Subhas Chandra Bose planned an audacious escape to seek foreign military alliances to liberate India by force. In the dead of night on January 16, 1941, disguised as a deaf-and-dumb North Indian Muslim insurance agent named 'Mohammad Ziauddin' with a long beard and sherwani, Netaji slipped past dozens of British intelligence guards in a Wanderer car driven by his nephew Sisir Bose. Boarding the Delhi-Kalka Mail at Gomoh, he traveled to Peshawar, trekked on foot through the snow-bound tribal mountains of the North-West Frontier into Kabul (Afghanistan), secured an Italian passport under the name 'Orlando Mazzotta', and traversed the Soviet Union by train to reach Berlin. From Germany, and later via a perilous 90-day submarine voyage aboard German U-180 and Japanese I-29 across mine-infested oceans, Netaji reached Southeast Asia to take command of the Indian National Army.",
    quote: "India is calling. Blood is calling to blood. Get up, we have no time to lose! Take up your arms! We shall carve our way through the enemy's ranks, or if God wills, we shall die a martyr's death. — Netaji Subhas Chandra Bose",
    keyFigures: ["Netaji Subhas Chandra Bose", "Sisir Kumar Bose", "Bhagat Ram Talwar (Kabul guide)", "Uttam Chand Malhotra"],
    impactStats: ["Most daring geopolitical escape in anti-colonial history", "Broke free from British surveillance to mobilize an international military campaign", "Led to the formation of the Free India Center and Azad Hind Radio in Berlin"],
    details: {
      ruler: "British CID / Bengal Government",
      significance: "Transformed India's independence struggle into an armed international war of liberation",
      weapons: "Disguise, false passports, trans-continental submarine journey"
    }
  },
  {
    id: "quit-india-movement-1942",
    year: "1942",
    date: "August 8, 1942",
    era: 7,
    title: "Quit India Movement: 'Do or Die' (Karo ya Maro)",
    category: "rebellion",
    locationName: "Gowalia Tank Maidan (August Kranti Maidan), Bombay",
    coordinates: [18.9628, 72.8122],
    zoom: 11,
    territoryState: "era7_quit_india",
    narrative: "Following the collapse of the Cripps Mission (which offered delayed post-war dominion status described by Gandhi as 'a post-dated cheque on a crashing bank'), the All India Congress Committee met at Gowalia Tank Maidan in Bombay. On the night of August 8, 1942, Mahatma Gandhi delivered his most electrifying speech, declaring: 'Here is a mantra, a short one, that I give you: DO OR DIE (Karo ya Maro). We shall either free India or die in the attempt.' Within hours, before dawn on August 9, British police launched Operation Zero Hour, arresting Gandhi, Nehru, Patel, Azad, and every senior Congress leader, spiriting them away to secret prisons like the Aga Khan Palace and Ahmednagar Fort. Deprived of leadership, the movement exploded into an unprecedented, leaderless nationwide mass insurrection. Young leaders like Aruna Asaf Ali hoisted the tricolor at Gowalia Tank; Jayaprakash Narayan escaped Hazaribagh jail to lead guerrilla squads; Usha Mehta operated an underground 'Congress Radio'. Peasants uprooted railway tracks, cut telegraph poles, and burnt police stations. Parallel revolutionary governments (Prati Sarkar / Jatiya Sarkar) took control in Ballia (Chittu Pandey), Midnapore (Tamluk), and Satara (Nana Patil). Churchill's regime crushed the revolt with extreme brutality: machine-gunning crowds from RAF aircraft, burning villages, arresting over 100,000 citizens, and flogging protesters.",
    quote: "Here is a mantra, a short one, that I give you: DO OR DIE. We shall either free India or die in the attempt; we shall not live to see the perpetuation of our slavery. — Mahatma Gandhi, August 8, 1942",
    keyFigures: ["Mahatma Gandhi", "Aruna Asaf Ali ('Heroine of 1942')", "Jayaprakash Narayan", "Usha Mehta", "Nana Patil"],
    impactStats: ["Over 100,000 Indians arrested, over 1,000 shot dead by military and police", "Parallel independent governments ruled districts in UP, Bengal, and Maharashtra for months", "Demonstrated that the British could rule India only through naked military occupation"],
    details: {
      ruler: "Viceroy Lord Linlithgow / Winston Churchill",
      significance: "The definitive mass uprising that convinced the British that their days in India were numbered",
      weapons: "Underground radio, railway sabotage, parallel governments, peasant lathis"
    }
  },
  {
    id: "great-bengal-famine-1943",
    year: "1943",
    date: "1943 – 1944",
    era: 7,
    title: "The Bengal Famine of 1943: Churchill's Man-Made Holocaust",
    category: "famine",
    locationName: "Calcutta & Rural Bengal (Midnapore, Chittagong, Dhaka)",
    coordinates: [22.5726, 88.3639],
    zoom: 7,
    territoryState: "era7_bengal_famine1943",
    narrative: "Between 1943 and 1944, a catastrophic man-made famine struck Bengal, resulting in the horrifying death of an estimated 3 to 4 million Indian civilians. Following the Japanese conquest of Burma in 1942, British authorities feared a Japanese amphibious invasion of Bengal. Governor John Herbert enacted the barbaric 'Denial Policy'—British troops confiscated and burned over 66,000 country boats (the lifeline of Bengal's riverine rice trade) and forcibly seized and removed huge rice stocks from coastal districts. Simultaneously, wartime inflation caused by London printing money, rampant British corporate procurement of food for European military stockpiles, and speculation caused rice prices to skyrocket by 300-500%. Starving peasants flooded into Calcutta, dropping dead on city pavements outside grand colonial restaurants. Despite desperate pleas from Viceroy Lord Wavell and Secretary of State Leopold Amery, Prime Minister Winston Churchill repeatedly refused to divert Australian merchant ships carrying wheat to relieve Bengal, insisting that the grain be stockpiled in the Mediterranean and Europe for post-war reserves. When confronted with telegrams about mass starvation, Churchill responded with callous racism, asking why Gandhi had not died yet and stating that Indians were 'a beastly people with a beastly religion' who 'bred like rabbits'. Modern Nobel laureate Amartya Sen demonstrated that Bengal had sufficient food supply; the famine was entirely caused by British imperial wartime policy and distribution failure.",
    quote: "I hate Indians. They are a beastly people with a beastly religion... The famine was their own fault anyway, for breeding like rabbits. — Winston Churchill to Secretary of State Leopold Amery, 1943",
    keyFigures: ["Winston Churchill", "Leopold Amery (Secretary of State for India)", "Lord Wavell (Viceroy)", "Dr. Shyama Prasad Mukherjee", "Amartya Sen"],
    impactStats: ["3.0 to 3.8 Million civilian deaths from starvation, malaria, and cholera", "66,000+ fishing and transport boats destroyed under British 'Boat Denial Policy'", "Winston Churchill diverted grain relief ships away from India to European military stockpiles"],
    details: {
      ruler: "Winston Churchill (British War Cabinet)",
      significance: "One of the greatest imperial atrocities of the 20th century, thoroughly documented by Madhusree Mukerjee's 'Churchill's Secret War'",
      weapons: "Boat denial policy, rice confiscation, inflationary currency printing, refusal of food relief imports"
    }
  },
  {
    id: "azad-hind-ina-1944",
    year: "1944",
    date: "1943 – 1945",
    era: 7,
    title: "Azad Hind Fauj: Netaji, Rani of Jhansi Regiment & Imphal Campaign",
    category: "battle",
    locationName: "Singapore, Rangoon, Kohima & Imphal, Manipur",
    coordinates: [24.8170, 93.9368],
    zoom: 8,
    territoryState: "era7_ina",
    narrative: "On October 21, 1943, in Singapore, Netaji Subhas Chandra Bose proclaimed the establishment of the Provisional Government of Free India (*Arzi Hukumat-e-Azad Hind*), recognized by nine sovereign nations. Assuming supreme command of the Indian National Army (INA / *Azad Hind Fauj*), originally founded by Rash Behari Bose and Captain Mohan Singh from Indian POWs, Netaji mobilized 60,000 soldiers with the fiery battle cries 'Chalo Delhi!' (On to Delhi!) and 'Tum Mujhe Khoon Do, Main Tumhe Azadi Doonga' (Give me blood, and I shall give you freedom!). Netaji created the historic 'Rani of Jhansi Regiment' under Captain Lakshmi Sahgal—the world's first all-female combat regiment in modern military history. In March 1944, INA brigades alongside the Japanese 15th Army breached the Indo-Burma frontier into Manipur and Nagaland. On April 14, 1944, Colonel Shaukat Malik hoisted the Indian tricolor on liberated Indian soil at Moirang, Manipur. At the ferocious Battles of Kohima and Imphal (voted by Britain's National Army Museum as Britain's greatest battle), INA and Japanese troops fought through monsoon mud against superior Allied air power and tanks. Running out of food, medical supplies, and ammunition, the INA retreated into Burma, but Netaji's military challenge destroyed the colonial military structure forever.",
    quote: "Give me blood, and I will give you freedom! — Netaji Subhas Chandra Bose addressing INA troops in Burma",
    keyFigures: ["Netaji Subhas Chandra Bose", "Captain Lakshmi Sahgal", "General Mohan Singh", "Colonel Shaukat Malik", "Prem Kumar Sahgal"],
    impactStats: ["First time an organized Indian army fought to liberate India from outside borders", "First all-women combat infantry regiment in modern military history", "Liberated Moirang (Manipur) and Andaman and Nicobar Islands (renamed Shahid and Swaraj)"],
    details: {
      ruler: "Provisional Government of Azad Hind (Netaji Subhas Chandra Bose)",
      significance: "Proved that Indian soldiers' loyalty to the British Crown could be completely shattered",
      weapons: "Japanese Arisaka rifles, artillery, guerrilla jungle warfare"
    }
  },
  {
    id: "ina-red-fort-trials-1945",
    year: "1945",
    date: "November 1945 – February 1946",
    era: 7,
    title: "The INA Trials at Red Fort: The Nation Unites",
    category: "politics",
    locationName: "Red Fort, Delhi",
    coordinates: [28.6562, 77.2410],
    zoom: 11,
    territoryState: "era7_ina_trials",
    narrative: "In a catastrophic political blunder, the British military command decided to publicly court-martial captured INA officers inside the historic Red Fort in Delhi on charges of treason and waging war against the King-Emperor. In an unintentional stroke of poetic unity, the British selected three top officers to stand trial together: Colonel Prem Kumar Sahgal (a Hindu), Colonel Gurbaksh Singh Dhillon (a Sikh), and Major General Shah Nawaz Khan (a Muslim). The trials sparked an unprecedented tsunami of nationwide public fury that erased all religious and communal divides. Slogans echoed across Indian cities: 'Lal Qile se aayi aawaz: Sahgal, Dhillon, Shahnawaz!' Even the Indian National Congress, which had differed with Netaji's wartime strategy, formed an INA Defense Committee comprising premier legal giants: Jawaharlal Nehru (donning his lawyer's robes after 25 years), Bhulabhai Desai, Tej Bahadur Sapru, and Asaf Ali. Massive riots broke out in Calcutta, Bombay, and Lahore demanding their immediate release. Although the court-martial found them guilty, Commander-in-Chief Sir Claude Auchinleck was terrified of an armed mutiny in the British Indian Army and was forced to remit their sentences and release all three men.",
    quote: "Lal Qile se aayi aawaz: Sahgal, Dhillon, Shahnawaz! (A cry has come from the Red Fort: Sahgal, Dhillon, and Shahnawaz!) — Nationwide student and worker slogan",
    keyFigures: ["Shah Nawaz Khan", "Prem Kumar Sahgal", "Gurbaksh Singh Dhillon", "Bhulabhai Desai (Defense Counsel)", "Jawaharlal Nehru"],
    impactStats: ["Unprecedented communal solidarity uniting Hindus, Muslims, and Sikhs against the Crown", "Forced the British military command to revoke treason sentences", "Decisively undermined the discipline and loyalty of the British Indian Armed Forces"],
    details: {
      ruler: "General Sir Claude Auchinleck (Commander-in-Chief, India)",
      significance: "Demonstrated that the British armed forces in India were emotionally aligned with the INA",
      weapons: "Constitutional defense, mass street protests, military insubordination"
    }
  },
  {
    id: "rin-mutiny-1946",
    year: "1946",
    date: "February 18 – 23, 1946",
    era: 7,
    title: "Royal Indian Navy (RIN) Revolt: The Final Blow to Empire",
    category: "rebellion",
    locationName: "HMIS Talwar & Bombay Harbour, Mumbai",
    coordinates: [18.9220, 72.8347],
    zoom: 11,
    territoryState: "era7_rin",
    narrative: "On the morning of February 18, 1946, 1,100 naval ratings (sailors) aboard the signals training ship HMIS Talwar in Bombay harbor went on a hunger strike against unpalatable food, racial abuse by British commander Arthur Frederick King, and the INA trials. Led by 23-year-old signalman M.S. Khan and Madan Singh, the ratings tore down the Union Jack and hoisted three intertwined flags—the Congress tricolor, the Muslim League green crescent, and the Communist red flag. Within 48 hours, the revolt spread across 78 naval ships, 20 shore establishments, and 20,000 sailors across Bombay, Karachi, Calcutta, Madras, and Cochin. In Bombay, hundreds of thousands of textile mill workers went on strike in solidarity; barricades were erected, and British troops fired into crowds, killing over 300 civilians. When the British Commander-in-Chief threatened to use the Royal Navy to destroy the Indian fleet, ratings trained naval 4-inch guns on the Taj Mahal Palace Hotel and British naval headquarters. Sardar Vallabhbhai Patel and M.A. Jinnah eventually persuaded the strike committee to surrender, promising that ratings would not be victimized (a promise the British later broke). The RIN revolt was the definitive tipping point: British Prime Minister Clement Attlee realized that the armed forces—the very foundation of British colonial rule—could no longer be relied upon to shoot their fellow Indians. Days later, on March 15, 1946, Attlee announced that India would be granted independence.",
    quote: "Our uprising was not an isolated act; it was the final nail driven into the coffin of the British Empire. — B.C. Dutt, naval rating who inscribed 'Quit India' on HMIS Talwar",
    keyFigures: ["M.S. Khan (President of Naval Central Strike Committee)", "Madan Singh", "B.C. Dutt", "Sardar Vallabhbhai Patel", "Clement Attlee"],
    impactStats: ["78 naval ships and 20,000 sailors openly mutinied against British officers", "Royal Air Force (RAF) squadrons and army units in Jabalpur also revolted in sympathy", "Forced British PM Clement Attlee to dispatch the Cabinet Mission to negotiate transfer of power"],
    details: {
      ruler: "Vice-Admiral John Godfrey (Flag Officer Commanding Royal Indian Navy)",
      significance: "The decisive military insurrection that convinced London that holding India was impossible",
      weapons: "Naval 4-inch guns, ship signaling networks, general citywide strikes"
    }
  },
  {
    id: "mountbatten-plan-partition-1947",
    year: "1947",
    date: "June 3 – August 1947",
    era: 8,
    title: "The Mountbatten Plan & Radcliffe's Bloody Boundary Line",
    category: "treaty",
    locationName: "New Delhi, Punjab & Bengal Borderlands",
    coordinates: [31.1048, 74.3142], // Punjab boundary marker
    zoom: 7,
    territoryState: "era8_partition",
    narrative: "In March 1947, Lord Louis Mountbatten arrived as the 34th and final Viceroy of India, tasked with managing Britain's hasty exit. Confronted by escalating communal violence following the Muslim League's 'Direct Action Day' (August 1946) and the failure of the Cabinet Mission Plan, Mountbatten devised the 'June 3 Plan' (Mountbatten Plan), proposing the immediate partition of British India into two dominions: India and Pakistan. In an irresponsible rush, Mountbatten advanced the British withdrawal date by ten months, from June 1948 to August 15, 1947. Sir Cyril Radcliffe, a London barrister who had never visited India or the East, was appointed Chairman of the Boundary Commissions. Given just five weeks in scorching summer heat with outdated maps and census figures, Radcliffe drew arbitrary lines across Punjab and Bengal, cleaving communities, farms, rivers, and families in two. Callously, Mountbatten suppressed the publication of the boundary award until August 17—two days AFTER independence had been celebrated—so that the British would bear no responsibility for the apocalyptic bloodbath that ensued.",
    quote: "Shut up in a lonely mansion, with police night and day... he had never been to India, and he had only five weeks to carve up a subcontinent. — W.H. Auden's poem 'Partition'",
    keyFigures: ["Lord Louis Mountbatten", "Sir Cyril Radcliffe", "Jawaharlal Nehru", "Muhammad Ali Jinnah", "Sardar Vallabhbhai Patel"],
    impactStats: ["Subcontinent carved into the Dominion of India and the Dominion of Pakistan", "Radcliffe line severed Punjab and Bengal with devastating disregard for human geography", "Mountbatten withheld the border announcement until after August 15 to avoid British liability"],
    details: {
      ruler: "Viceroy Lord Mountbatten / British Parliament (Indian Independence Act 1947)",
      significance: "Created the unresolved geopolitical border conflicts (including Kashmir) that persist to this day",
      weapons: "Boundary commission red pen, administrative fiat"
    }
  },
  {
    id: "independence-midnight-1947",
    year: "1947",
    date: "August 14 – 15, 1947",
    era: 8,
    title: "Midnight's Tryst with Destiny: Birth of Free India",
    category: "independence",
    locationName: "Constituent Assembly (Central Hall, Parliament), New Delhi",
    coordinates: [28.6172, 77.2081],
    zoom: 10,
    territoryState: "era8_independence",
    narrative: "At the stroke of midnight on August 14–15, 1947, as the world slept, India awoke to life and freedom. In the illuminated Central Hall of the Constituent Assembly in New Delhi, Jawaharlal Nehru delivered one of the most magnificent speeches in human history: 'Long years ago we made a tryst with destiny, and now the time comes when we shall redeem our pledge...' The sacred Chola sengol (golden sceptre) was presented to Nehru by priests from Tamil Nadu, symbolizing the transfer of sovereign power. The British Union Jack was lowered, and the Indian tricolor was hoisted atop the Red Fort amidst thunderous cheers. However, 1,000 miles to the east in riot-torn Calcutta, 77-year-old Mahatma Gandhi shunned all celebrations, fasting and praying in an abandoned Muslim mansion in Beliaghata to stem the tide of communal madness.",
    quote: "Long years ago we made a tryst with destiny, and now the time comes when we shall redeem our pledge, not wholly or in full measure, but very substantially. At the stroke of the midnight hour, when the world sleeps, India will awake to life and freedom. — Jawaharlal Nehru, August 14, 1947",
    keyFigures: ["Jawaharlal Nehru", "Dr. Rajendra Prasad", "Dr. B.R. Ambedkar", "Mahatma Gandhi", "Sarojini Naidu"],
    impactStats: ["Formal end of nearly 200 years of British imperial rule in India", "Birth of the world's largest secular democracy", "Constitution drafting commenced under Dr. B.R. Ambedkar"],
    details: {
      ruler: "Independent Dominion of India (Prime Minister Jawaharlal Nehru)",
      significance: "The triumphant culmination of centuries of anti-colonial resistance and sacrifice",
      weapons: "Constitution of India, democratic elections, sovereign tricolor flag"
    }
  },
  {
    id: "human-cost-of-partition-1947",
    year: "1947",
    date: "August – December 1947",
    era: 8,
    title: "The Human Cost of Partition: 15 Million Displaced, 1 Million Dead",
    category: "famine", // Catastrophic human tragedy
    locationName: "Amritsar, Lahore, Rawalpindi & Bengal Borderlands",
    coordinates: [31.6340, 74.8723],
    zoom: 8,
    territoryState: "era8_partition_tragedy",
    narrative: "As the Radcliffe Line was revealed, panic and madness engulfed the divided provinces of Punjab and Bengal. In what became the largest forced human migration in recorded history, over 15 million Hindus, Sikhs, and Muslims were uprooted from their ancestral homes. Long foot columns of refugees ('kafilas') stretching for 20 miles crossed paths on dusty roads, attacked by armed militias. Refugee trains ('ghost trains') arrived in Lahore and Amritsar soaked in blood, filled with corpses. Between 1 to 2 million men, women, and children were slaughtered in communal carnage, and an estimated 100,000 women were abducted and assaulted. The British colonial authorities, who had maintained 100,000 troops in India, ordered their regiments confined to barracks, refusing to intervene as the subcontinent burned. Mahatma Gandhi walked through the blood-soaked villages of Noakhali and fasted in Delhi until communal leaders laid down their arms, extracting peace at the cost of his own life (assassinated on January 30, 1948).",
    quote: "This is not that dawn we yearned for... This is a stained, pockmarked dawn. — Faiz Ahmad Faiz, 'Subh-e-Azadi'",
    keyFigures: ["Mahatma Gandhi", "Sardar Vallabhbhai Patel", "Lord Mountbatten", "Refugees of Punjab and Bengal"],
    impactStats: ["15 Million refugees uprooted in the largest mass migration in human history", "1.0 to 2.0 Million civilians murdered in communal violence", "100,000+ women abducted and assaulted"],
    details: {
      ruler: "Governments of India and Pakistan / British Military Non-Intervention",
      significance: "The colossal human catastrophe that accompanied the midnight transfer of power",
      weapons: "Swords, spears, refugee train massacres, burning of ancestral villages"
    }
  },
  {
    id: "integration-of-princely-states-1948",
    year: "1948",
    date: "1947 – 1949",
    era: 8,
    title: "Sardar Patel & Integration of 565 Princely States",
    category: "politics",
    locationName: "Hyderabad, Junagadh, Kashmir & New Delhi",
    coordinates: [17.3850, 78.4867],
    zoom: 7,
    territoryState: "era8_integration",
    narrative: "Under the Indian Independence Act, the British Crown unilaterally lapsed its suzerainty over 565+ princely states, leaving them technically free to join India, join Pakistan, or declare independent kingdom status. Winston Churchill hoped this would balkanize India into dozens of warring petty kingdoms. Sardar Vallabhbhai Patel ('The Iron Man of India'), as Minister of States, aided by civil servant V.P. Menon, undertook the monumental task of uniting the nation. Using a masterly blend of patriotism, privy purse pensions, and stern diplomacy ('the carrot and the stick'), Patel convinced 562 states to sign the Instrument of Accession before August 15. The remaining recalcitrant states were resolved decisively: Junagadh's Nawab fled to Pakistan following a popular uprising and plebiscite; Maharaja Hari Singh of Jammu & Kashmir signed the Instrument of Accession on October 26, 1947, following an invasion by Pakistani tribal raiders; and in September 1948, when the Nizam of Hyderabad unleashed his brutal Razakar militia under Kasim Razvi, Patel launched 'Operation Polo' (the Police Action), liberating Hyderabad in 108 hours and integrating it fully into the Indian Union.",
    quote: "We are at a momentous juncture. If we do not act with vision and speed, India will be balkanized into hundreds of fragments. — Sardar Vallabhbhai Patel",
    keyFigures: ["Sardar Vallabhbhai Patel", "V.P. Menon", "Mir Osman Ali Khan (Nizam of Hyderabad)", "Maharaja Hari Singh of Kashmir"],
    impactStats: ["565+ Princely states integrated into a unified Republic of India", "Prevented the balkanization of the subcontinent", "Operation Polo ended the rule of the world's richest royal monarch (Nizam of Hyderabad)"],
    details: {
      ruler: "Government of India (Deputy Prime Minister Sardar Patel)",
      significance: "Achieved the territorial integration of India without catastrophic civil fragmentation",
      weapons: "Instrument of Accession diplomacy, Indian Armed Forces (Operation Polo)"
    }
  },
  {
    id: "french-enclaves-transfer-1954",
    year: "1954",
    date: "November 1, 1954",
    era: 8,
    title: "Transfer of French Enclaves: Pondicherry Joins India",
    category: "treaty",
    locationName: "Puducherry (Pondicherry), Tamil Nadu Coast",
    coordinates: [11.9416, 79.8083],
    zoom: 10,
    territoryState: "era8_french_transfer",
    narrative: "While the British departed in 1947, France still clung to five colonial enclaves on Indian soil: Pondicherry, Karaikal, Mahe, Yanam, and Chandannagar (Bengal). Following peaceful nationalist demonstrations, labor strikes, and referendums organized by local freedom fighters like V. Subbiah, Chandannagar voted overwhelmingly to join India in 1949 and was transferred in 1950. Recognizing the inevitable and embroiled in the First Indochina War, French Prime Minister Pierre Mendès France signed an accord with Prime Minister Jawaharlal Nehru. On November 1, 1954, de facto administrative control of Pondicherry, Karaikal, Mahe, and Yanam was handed over to the Republic of India, ending nearly 300 years of French colonial presence peacefully and with mutual dignity.",
    quote: "France departs from India not in defeat, but in friendship with an ancient nation.",
    keyFigures: ["Jawaharlal Nehru", "Pierre Mendès France", "V. Subbiah (Pondicherry Freedom Fighter)"],
    impactStats: ["De facto transfer of 4 French enclaves to India on November 1, 1954", "De jure treaty ratified by French National Assembly in 1962", "Peaceful diplomatic resolution of colonial remnants"],
    details: {
      ruler: "Republic of France / Republic of India",
      significance: "Showcased diplomatic decolonization in stark contrast to Portuguese obstinacy",
      weapons: "Democratic referendum, bilateral diplomatic accord"
    }
  },
  {
    id: "operation-vijay-goa-1961",
    year: "1961",
    date: "December 18 – 19, 1961",
    era: 8,
    title: "Operation Vijay: Liberation of Goa & The End of Colonialism",
    category: "independence",
    locationName: "Panaji, Mormugao & Diu, Goa",
    coordinates: [15.4989, 73.8278],
    zoom: 10,
    territoryState: "era8_goa_liberated",
    narrative: "Even as Britain and France departed, Portugal's fascist dictator António de Oliveira Salazar adamantly refused to negotiate the handover of Portuguese India (Goa, Daman, and Diu), claiming they were not colonies but 'overseas provinces of Portugal' that had been Portuguese for 451 years (longer than the Mughal or British presence). When Goan freedom fighters led by Dr. Ram Manohar Lohia, Purushottam Kakodkar, and the Azad Gomantak Dal held peaceful satyagrahas, Portuguese police tortured and shot unarmed demonstrators. After 14 years of fruitless diplomatic patience, and following Portuguese firing on Indian merchant ships off Anjidiv Island, Prime Minister Jawaharlal Nehru and Defense Minister V.K. Krishna Menon ordered the Indian Armed Forces to launch 'Operation Vijay'. In the early hours of December 18, 1961, 30,000 Indian troops commanded by Major General K.P. Candeth, supported by Indian Air Force Canberras and naval destroyers (INS Rajput and INS Betwa), advanced into Goa from three sides. After brief resistance in which the Portuguese frigate NRP Afonso de Albuquerque was disabled at Mormugao, Portuguese Governor-General Manuel António Vassalo e Silva defied Salazar's scorched-earth orders to fight to the last man and signed the instrument of surrender on the evening of December 19. Exactly 451 years after Afonso de Albuquerque conquered Goa in 1510, foreign colonial rule on the Indian subcontinent was terminated forever.",
    quote: "The last remaining pocket of foreign colonialism on Indian soil has been cleansed. India is wholly free. — Prime Minister Jawaharlal Nehru, December 19, 1961",
    keyFigures: ["Jawaharlal Nehru", "V.K. Krishna Menon", "Major General K.P. Candeth", "Governor-General Vassalo e Silva", "Dr. Ram Manohar Lohia"],
    impactStats: ["Liberation of Goa, Daman, and Diu in under 36 hours", "451 years of Portuguese colonial rule permanently extinguished (1510–1961)", "The complete, absolute, and final decolonization of the Indian subcontinent"],
    details: {
      ruler: "Estado Português da Índia (Salazar Regime) / Republic of India",
      significance: "The closing chapter: the very place where European colonialism began in 1498 became where it finally ended in 1961",
      weapons: "Indian Army 17th Infantry Division, INS Betwa naval gunnery, IAF Canberra airstrikes"
    }
  }
];

// Major Wars & Battles Register (for Wars Dossier modal)
const MAJOR_WARS = [
  {
    name: "First Carnatic War (1746 – 1748)",
    theater: "Coromandel Coast, Tamil Nadu",
    belligerents: "French East India Company vs British East India Company & Nawab of Arcot",
    keyBattles: "Battle of Madras (1746), Battle of San Thome (Adyar River)",
    commanders: "Joseph François Dupleix, La Bourdonnais vs Governor Morse, Anwar-ud-Din",
    significance: "At San Thome, a tiny disciplined French force of 230 Europeans and 700 sepoys routed 10,000 cavalry of the Nawab of Arcot. It revealed the dramatic tactical superiority of European-drilled musket infantry over traditional feudal Indian cavalry, inspiring both French and British to recruit and train Indian sepoys on a mass scale.",
    outcome: "Treaty of Aix-la-Chapelle restored Madras to British in exchange for Louisbourg in Canada."
  },
  {
    name: "Second Carnatic War (1749 – 1754)",
    theater: "Deccan & Carnatic (Hyderabad, Arcot, Trichinopoly)",
    belligerents: "British EIC (backing Nasir Jung & Muhammad Ali) vs French EIC (backing Muzaffar Jung & Chanda Sahib)",
    keyBattles: "Battle of Ambur (1749), Siege of Arcot (1751), Battle of Arni",
    commanders: "Robert Clive, Stringer Lawrence vs Dupleix, Chanda Sahib, Bussy",
    significance: "Robert Clive's heroic 53-day defense of Arcot established British military prestige in South India. Dupleix's grand imperial gamble failed, and he was recalled to France in ruin.",
    outcome: "Treaty of Pondicherry (1754): Muhammad Ali recognized as Nawab of Carnatic under British sway."
  },
  {
    name: "Battle of Plassey (June 23, 1757)",
    theater: "Palashi, Nadia District, Bengal",
    belligerents: "British East India Company (3,000 troops) vs Nawab of Bengal & French gunners (50,000 troops)",
    keyBattles: "Plassey Mango Grove assault",
    commanders: "Robert Clive vs Siraj-ud-Daulah, Mir Jafar (treason), Mir Madan",
    significance: "The foundation battle of the British Empire in Asia. Purchased by bribing Mir Jafar and the Jagat Seths, the victory transferred the vast economic wealth of Bengal into British hands.",
    outcome: "Mir Jafar installed as puppet Nawab; EIC received £2.5M in silver plunder and zamindari of 24 Parganas."
  },
  {
    name: "Third Carnatic War (1758 – 1763)",
    theater: "Coromandel Coast & Northern Circars",
    belligerents: "British East India Company vs French East India Company",
    keyBattles: "Battle of Wandiwash (1760), Siege of Pondicherry (1761)",
    commanders: "Sir Eyre Coote vs Comte de Lally, Marquis de Bussy",
    significance: "Eyre Coote's crushing victory at Wandiwash permanently eliminated France as a military contender in India.",
    outcome: "Treaty of Paris (1763): French factories restored strictly as unfortified commercial markets."
  },
  {
    name: "Battle of Buxar (October 22, 1764)",
    theater: "Buxar, Bihar (Ganges River)",
    belligerents: "British East India Company (7,072 troops) vs Triple Alliance: Mir Qasim (Bengal), Shuja-ud-Daulah (Awadh), Shah Alam II (Mughal Emperor) (40,000 troops)",
    keyBattles: "Pitched battle at Buxar plain",
    commanders: "Major Hector Munro vs Mir Qasim, Shuja-ud-Daulah, Emperor Shah Alam II",
    significance: "A genuine, full-scale military victory. Defeated the legitimate sovereign Mughal Emperor and the Nawab-Wazir of Awadh, opening the whole of northern India to British dominance.",
    outcome: "Treaty of Allahabad (1765): Diwani of Bengal, Bihar, and Orissa granted to EIC."
  },
  {
    name: "First Anglo-Mysore War (1767 – 1769)",
    theater: "Mysore, Carnatic, Madras",
    belligerents: "Kingdom of Mysore vs British EIC, Nizam of Hyderabad, Marathas",
    keyBattles: "Battle of Changama, Battle of Tiruvannamalai, Raid on Madras",
    commanders: "Hyder Ali, Tipu Sultan vs Colonel Joseph Smith",
    significance: "Hyder Ali's masterclass in cavalry maneuver. Outmaneuvered British armies and rode straight to the gates of Madras, forcing British councilors to sign peace terms dictated by Mysore.",
    outcome: "Treaty of Madras (1769): Mutual restitution of conquests and defensive military alliance."
  },
  {
    name: "First Anglo-Maratha War (1775 – 1782)",
    theater: "Western Ghats, Gujarat, Central India",
    belligerents: "Maratha Confederacy vs British East India Company & Raghunath Rao",
    keyBattles: "Battle of Wadgaon (1779), Siege of Gwalior (1780)",
    commanders: "Nana Fadnavis, Mahadji Scindia, Tukoji Holkar vs General Goddard, Colonel Camac",
    significance: "The Marathas trapped the British army in the Sahyadri mountains at Wadgaon, forcing a humiliating surrender. Proved the resilience of the Maratha Confederacy under Nana Fadnavis.",
    outcome: "Treaty of Salbai (1782): British forced to restore territories; 20 years of peace followed."
  },
  {
    name: "Second Anglo-Mysore War (1780 – 1784)",
    theater: "Carnatic, Malabar, Tanjore",
    belligerents: "Kingdom of Mysore vs British East India Company",
    keyBattles: "Battle of Pollilur (1780), Battle of Porto Novo (1781), Siege of Mangalore",
    commanders: "Hyder Ali, Tipu Sultan vs Sir Eyre Coote, Colonel William Baillie",
    significance: "At Pollilur, Hyder Ali and Tipu Sultan completely wiped out Colonel Baillie's army of 3,800 men using devastating Mysorean rocket barrages. Hyder Ali died of cancer during the war in 1782; Tipu continued the fight successfully.",
    outcome: "Treaty of Mangalore (1784): Mutual restitution of territories and prisoners on equal terms."
  },
  {
    name: "Third Anglo-Mysore War (1790 – 1792)",
    theater: "Mysore, Dindigul, Seringapatam",
    belligerents: "British EIC, Maratha Confederacy, Nizam of Hyderabad vs Kingdom of Mysore",
    keyBattles: "Siege of Bangalore (1791), First Siege of Seringapatam (1792)",
    commanders: "Lord Cornwallis, General Medows vs Tipu Sultan",
    significance: "Cornwallis personally took command with an overwhelming coalition. Tipu fought tenaciously but was surrounded in his island fortress capital.",
    outcome: "Treaty of Seringapatam (1792): Tipu forced to surrender half his kingdom, pay £3.3M indemnity, and surrender his two young sons as hostages."
  },
  {
    name: "Fourth Anglo-Mysore War (1799)",
    theater: "Srirangapatna (Seringapatam), Karnataka",
    belligerents: "British EIC & Nizam of Hyderabad vs Kingdom of Mysore",
    keyBattles: "Battle of Malavalli, Siege of Seringapatam (April–May 1799)",
    commanders: "General George Harris, Arthur Wellesley vs Tipu Sultan",
    significance: "Tipu was betrayed by his prime minister Mir Sadiq. Refusing to surrender, Tipu died defending the Water Gate with musket and sword. British soldiers plundered his palace.",
    outcome: "Mysore partitioned; a minor Wodeyar prince restored under a crushing Subsidiary Alliance."
  },
  {
    name: "Second Anglo-Maratha War (1803 – 1805)",
    theater: "Deccan, Central India, Delhi, Rajasthan",
    belligerents: "British EIC vs Scindia of Gwalior, Bhonsle of Nagpur, Holkar of Indore",
    keyBattles: "Battle of Assaye (1803), Battle of Delhi (1803), Battle of Laswari (1803), Siege of Bharatpur",
    commanders: "Arthur Wellesley, General Gerard Lake vs Daulat Rao Scindia, Yashwantrao Holkar",
    significance: "Arthur Wellesley won his hardest battle at Assaye. General Lake captured Delhi and took the blind Mughal Emperor Shah Alam II into British 'custody'.",
    outcome: "Treaties of Deogaon and Surji-Anjangaon: Marathas ceded Delhi, Agra, Bundelkhand, and maritime coasts."
  },
  {
    name: "Third Anglo-Maratha War (1817 – 1818)",
    theater: "Maharashtra, Central India, Malwa",
    belligerents: "British EIC (Grand Army of 110,000) vs Peshwa Baji Rao II, Holkar, Bhonsle",
    keyBattles: "Battle of Khadki (1817), Battle of Koregaon (1818), Battle of Mahidpur",
    commanders: "Lord Hastings, Mountstuart Elphinstone vs Peshwa Baji Rao II, Bapu Gokhale",
    significance: "The complete dissolution of the Maratha Empire. The Peshwaship was abolished, and Baji Rao II was exiled to Bithoor.",
    outcome: "Peshwa's realm absorbed into Bombay Presidency; British became the undisputed master of India."
  },
  {
    name: "First Anglo-Sikh War (1845 – 1846)",
    theater: "Sutlej River, Punjab",
    belligerents: "British EIC vs Sikh Empire (Sarkar-i-Khalsa)",
    keyBattles: "Battle of Mudki, Battle of Ferozeshah, Battle of Aliwal, Battle of Sobraon",
    commanders: "Sir Hugh Gough, Sir Henry Hardinge vs Lal Singh (traitor), Tej Singh (traitor), Sham Singh Attariwala",
    significance: "The Khalsa soldiers fought with desperate valor, but their own Prime Minister Lal Singh and Commander Tej Singh secretly passed troop positions to the British and destroyed the bridge of boats at Sobraon, trapping thousands of Sikh soldiers in the river under British artillery fire.",
    outcome: "Treaty of Lahore (1846): Sikh territory south of Sutlej annexed; Kashmir severed and sold to Gulab Singh (Treaty of Amritsar)."
  },
  {
    name: "Second Anglo-Sikh War (1848 – 1849)",
    theater: "Punjab (Multan, Chillianwala, Gujrat)",
    belligerents: "British EIC vs Sikh Khalsa Army & Afghan allies",
    keyBattles: "Siege of Multan, Battle of Chillianwala (1849), Battle of Gujrat (1849)",
    commanders: "General Hugh Gough, Lord Dalhousie vs Sher Singh Attariwala, Dewan Mulraj",
    significance: "At Chillianwala, the Sikhs inflicted a catastrophic tactical defeat on Gough, capturing British regimental colors and killing 2,800 British soldiers. At Gujrat ('the Battle of the Guns'), overwhelming British artillery bombardment defeated the Sikhs.",
    outcome: "March 29, 1849: Annexation of Punjab; 11-year-old Duleep Singh deposed; Koh-i-Noor diamond seized."
  },
  {
    name: "The Great War of Independence / Uprising (1857 – 1858)",
    theater: "Delhi, Awadh, Rohilkhand, Bundelkhand, Bihar, Central India",
    belligerents: "Indian Sepoys, Royal Houses (Mughal, Peshwa, Jhansi, Awadh) & Peasants vs British East India Company & Loyal Regiments (Sikh, Gurkha, Pathan)",
    keyBattles: "Siege of Delhi, Siege of Cawnpore, Siege of Lucknow, Siege of Jhansi, Battle of Gwalior",
    commanders: "Bahadur Shah Zafar, Rani Lakshmibai, Nana Saheb, Tatya Tope, Begum Hazrat Mahal, Kunwar Singh vs Colin Campbell, Hugh Rose, John Nicholson, James Neill",
    significance: "The greatest armed anti-colonial rebellion of the 19th century in the world. Shook the British Empire to its foundations and directly caused the liquidation of the East India Company.",
    outcome: "Government of India Act 1858: East India Company abolished; direct British Crown rule begins."
  },
  {
    name: "Operation Vijay (December 18 – 19, 1961)",
    theater: "Goa, Daman, Diu, Arabian Sea",
    belligerents: "Republic of India (Armed Forces) vs Estado Português da Índia (Portuguese Armed Forces)",
    keyBattles: "Naval Action off Mormugao (NRP Afonso de Albuquerque disabled), Liberation of Panaji, Assault on Diu",
    commanders: "Major General K.P. Candeth, Air Vice Marshal Pinto vs Governor-General Manuel António Vassalo e Silva",
    significance: "A swift 36-hour tri-service military campaign that liberated Goa, Daman, and Diu, ending 451 years of Portuguese colonial occupation and terminating the final vestige of foreign colonialism in India.",
    outcome: "Unconditional surrender of Portuguese forces; complete territorial integration of Goa into India."
  }
];

// Treaties Archive (for Treaties modal)
const TREATIES_ARCHIVE = [
  {
    name: "Treaty of Bassein (1534)",
    date: "December 23, 1534",
    signatories: "Sultan Bahadur Shah of Gujarat & Nuno da Cunha (Governor of Portuguese India)",
    location: "Bassein (Vasai), Maharashtra",
    keyTerms: "Sultan Bahadur Shah, desperate for Portuguese naval support against Mughal Emperor Humayun, ceded the fortified city of Bassein, its islands, and the seven islands of Bombay to the Portuguese Crown in perpetuity.",
    impact: "Established Portuguese dominance over the northern Konkan coast and gave them the port that would later become Bombay."
  },
  {
    name: "Charter of 1600 (East India Company)",
    date: "December 31, 1600",
    signatories: "Queen Elizabeth I & 218 London Merchants (Sir Thomas Smythe)",
    location: "London, England",
    keyTerms: "Granted an exclusive 15-year commercial monopoly on all English maritime trade east of the Cape of Good Hope, with full authority to wage war, raise private armies, erect fortifications, and mint coins.",
    impact: "Created the corporate imperial monster that would conquer the Indian subcontinent."
  },
  {
    name: "Royal Farman of Emperor Farrukhsiyar (1717)",
    date: "1717",
    signatories: "Mughal Emperor Farrukhsiyar & John Surman (EIC Delegation)",
    location: "Red Fort, Delhi",
    keyTerms: "Exempted the EIC from all customs duties in Bengal for an annual token payment of 3,000 rupees; granted the right to issue trade passes (Dastaks) and coin currency at Bombay.",
    impact: "Termed the 'Magna Carta of the Company'; rampant British abuse of duty-free dastaks led directly to war with Siraj-ud-Daulah."
  },
  {
    name: "Treaty of Allahabad (1765)",
    date: "August 12, 1765",
    signatories: "Robert Clive & Mughal Emperor Shah Alam II / Shuja-ud-Daulah (Awadh)",
    location: "Allahabad Fort, Uttar Pradesh",
    keyTerms: "Shah Alam II granted the EIC the Diwani (revenue collecting rights) over Bengal, Bihar, and Orissa for an annual tribute of 2.6M rupees. Awadh was reduced to a buffer state paying a 5M rupee war indemnity.",
    impact: "Legalized British territorial rule; initiated the ruinous 'Dual System of Government' that drained Bengal of silver and triggered the 1770 famine."
  },
  {
    name: "Treaty of Madras (1769)",
    date: "April 3, 1769",
    signatories: "Hyder Ali of Mysore & Governor Charles Bourchier (Madras Presidency)",
    location: "Madras (Fort St. George)",
    keyTerms: "Mutual restitution of all conquests and an explicit mutual defensive alliance—if either party was attacked by a third power, the other was bound to provide military assistance.",
    impact: "A humiliating diplomatic surrender for the British; when the Marathas attacked Mysore in 1771, the British broke the treaty, permanently embittering Hyder Ali and Tipu Sultan."
  },
  {
    name: "Treaty of Salbai (1782)",
    date: "May 17, 1782",
    signatories: "Warren Hastings / David Anderson & Mahadji Scindia / Nana Fadnavis",
    location: "Salbai, Gwalior",
    keyTerms: "British restored all conquered territories except Salsette to the Marathas; Madhavrao II recognized as Peshwa; British guaranteed not to support Raghunath Rao; Marathas agreed to expel French allies.",
    impact: "Checked British expansion for 20 years, recognizing the Maratha Confederacy as the paramount power of central and north India."
  },
  {
    name: "Treaty of Seringapatam (1792)",
    date: "March 18, 1792",
    signatories: "Tipu Sultan & Lord Cornwallis / Nizam of Hyderabad / Marathas",
    location: "Srirangapatna, Karnataka",
    keyTerms: "Tipu Sultan forced to surrender half of his kingdom (shared among British, Nizam, and Marathas), pay an indemnity of 33 million rupees (£3.3M), and surrender his two young sons (Abdul Khaliq and Muiz-ud-din) as hostages.",
    impact: "Clipped the wings of the 'Tiger of Mysore', setting up his final defeat in 1799."
  },
  {
    name: "Treaty of Bassein (1802)",
    date: "December 31, 1802",
    signatories: "Peshwa Baji Rao II & Lord Wellesley (Governor-General)",
    location: "Bassein (Vasai), Maharashtra",
    keyTerms: "Peshwa Baji Rao II, having fled Pune after being defeated by Yashwantrao Holkar, signed away Maratha independence by accepting a Subsidiary Alliance: stationed 6,000 British troops in Pune and ceded territories yielding 2.6M rupees.",
    impact: "Viewed as national treason by Scindia and Bhonsle, sparking the Second Anglo-Maratha War."
  },
  {
    name: "Treaty of Lahore & Treaty of Amritsar (1846)",
    date: "March 9 & March 16, 1846",
    signatories: "Lord Hardinge / British EIC & Lahore Durbar / Raja Gulab Singh of Jammu",
    location: "Lahore & Amritsar, Punjab",
    keyTerms: "Sikh Empire ceded Jalandhar Doab and paid 10M rupee indemnity. Because Lahore could not pay the cash, the British severed the entire state of Jammu & Kashmir and sold it to Dogra Raja Gulab Singh for 7.5 million Nanakshahi rupees.",
    impact: "Created the princely state of Jammu & Kashmir under Dogra rule; fatally compromised Sikh sovereignty."
  },
  {
    name: "Queen Victoria's Proclamation (1858)",
    date: "November 1, 1858",
    signatories: "Queen Victoria & Viceroy Lord Canning",
    location: "Allahabad Imperial Darbar",
    keyTerms: "Liquidated the East India Company; assumed direct British Crown rule; guaranteed no further annexation of princely states; promised religious neutrality and equal opportunity in civil services.",
    impact: "Commenced 'The British Raj' (1858–1947); institutionalized indirect rule over 565 princely states and racial divide-and-rule in the army."
  },
  {
    name: "Gandhi-Irwin Pact (1931)",
    date: "March 5, 1931",
    signatories: "Mahatma Gandhi & Viceroy Lord Irwin",
    location: "Viceroy's House, New Delhi",
    keyTerms: "Congress agreed to suspend the Civil Disobedience Movement and participate in the Second Round Table Conference in London. British agreed to release non-violent political prisoners, return confiscated lands, and permit coastal villagers to make salt for domestic use.",
    impact: "First time the British Viceroy was compelled to negotiate with an Indian leader as an equal; Gandhi failed to secure clemency for Bhagat Singh, causing youth anguish."
  },
  {
    name: "Poona Pact (1932)",
    date: "September 24, 1932",
    signatories: "Dr. B.R. Ambedkar & Mahatma Gandhi (signed by Madan Mohan Malaviya)",
    location: "Yerwada Central Jail, Pune",
    keyTerms: "Relinquished the British Communal Award's separate electorates for Dalits in favor of joint electorates with guaranteed reserved seats in provincial legislatures increased from 71 to 148.",
    impact: "Preserved socio-political unity while establishing the legal foundation for constitutional reservations and affirmative action for Scheduled Castes."
  },
  {
    name: "Mountbatten Plan & Indian Independence Act (1947)",
    date: "June 3 / July 18, 1947",
    signatories: "Lord Louis Mountbatten & British Parliament (Attlee Government)",
    location: "New Delhi & London",
    keyTerms: "Partitioned British India into two independent dominions (India and Pakistan) effective August 15, 1947; terminated British paramountcy over 565 princely states; appointed Cyril Radcliffe to demarcate boundaries.",
    impact: "Delivered freedom accompanied by catastrophic partition, mass migration of 15 million, and over 1 million deaths."
  }
];

// Famines Register (for Famines & Exploitation modal)
const FAMINES_REGISTER = [
  {
    name: "The Great Bengal Famine of 1770",
    years: "1769 – 1773",
    regions: "Bengal, Bihar, Odisha",
    deathToll: "10,000,000 (10 Million — 1/3rd of population)",
    colonialPolicyCause: "The East India Company, having just acquired the Diwani, forcibly increased land taxes by 10% during drought, compelled farmers to sow indigo and opium instead of food crops, prohibited domestic grain stockpiling, and monopolized grain trade to sell at inflated rates.",
    contemporaryQuote: "Warren Hastings admitted in 1772 that revenue collection was 'violently kept up to its former standard' despite the death of one-third of the inhabitants."
  },
  {
    name: "The Chalisa Famine (1783 – 1784)",
    years: "1783 – 1784",
    regions: "Delhi, Western UP, Punjab, Rajasthan, Kashmir",
    deathToll: "11,000,000 (11 Million)",
    colonialPolicyCause: "Severe El Niño drought compounded by heavy EIC grain procurements and extortionate land revenues in Awadh and surrounding buffer territories.",
    contemporaryQuote: "Whole villages were abandoned; depopulated countryside allowed tigers and wild beasts to prowl inside town boundaries."
  },
  {
    name: "Doji Bara / Skull Famine (1791 – 1792)",
    years: "1791 – 1792",
    regions: "Maharashtra, Hyderabad, Northern Karnataka, Gujarat",
    deathToll: "11,000,000 (11 Million)",
    colonialPolicyCause: "Unburied skeletons littered roads ('Skull Famine'). British EIC forces fighting the Third Anglo-Mysore War diverted and requisitioned grain supplies for military operations, causing hyper-inflation.",
    contemporaryQuote: "Skeletons were piled by roadsides unburied, for none remained alive to dig their graves."
  },
  {
    name: "Agra Famine of 1837 – 1838",
    years: "1837 – 1838",
    regions: "North-Western Provinces (UP), Agra, Delhi, Rajasthan",
    deathToll: "800,000 – 1,000,000",
    colonialPolicyCause: "Company's aggressive tax revenue extraction under the Mahalwari system left cultivators with zero grain reserves during harvest failure. Company spend barely £100,000 on relief while extracting £18M in taxes.",
    contemporaryQuote: "Corpses choked the Jamuna river, poisoning the drinking water for downstream cantonments."
  },
  {
    name: "The Orissa Famine of 1866",
    years: "1866 – 1867",
    regions: "Orissa, Coastal Bengal, Northern Madras",
    deathToll: "1,000,000 – 1,500,000 (1/3rd of Orissa's population)",
    colonialPolicyCause: "Crown government under Sir Cecil Beadon refused to import grain or halt exports, slavishly adhering to laissez-faire economic dogma. Even as 1 million starved, 200 million pounds of rice were exported from Orissa to Britain.",
    contemporaryQuote: "Board of Revenue declared: 'Even if the people are dying, market prices must not be interfered with.'"
  },
  {
    name: "Rajputana Famine of 1869",
    years: "1868 – 1870",
    regions: "Rajasthan, Gujarat, Western UP",
    deathToll: "1,500,000",
    colonialPolicyCause: "Absence of railway distribution networks combined with colonial transit duties on food grains and eviction of starving pastoralists.",
    contemporaryQuote: "Emaciated wanderers died under roadside trees while grain passed on camel caravans to British military centers."
  },
  {
    name: "The Great Famine of 1876 – 1878",
    years: "1876 – 1878",
    regions: "Madras, Mysore, Hyderabad, Bombay, United Provinces",
    deathToll: "5,500,000 – 10,300,000",
    colonialPolicyCause: "Viceroy Lord Lytton's fanatical adherence to Adam Smith's free market. Lytton prohibited any government price intervention or grain bans. A record 6.4 million cwt of wheat was exported to the UK in 1877 while Lytton held the opulent Delhi Durbar banquet. Relief camp workers were given the 'Temple wage' (1,627 calories/day—less than Nazi concentration camps).",
    contemporaryQuote: "Mike Davis in 'Late Victorian Holocausts': Millions were murdered not by lack of food, but by the dogmatic ideology of Victorian imperial capitalism."
  },
  {
    name: "Indian Famine of 1896 – 1897",
    years: "1896 – 1897",
    regions: "Central Provinces, UP, Punjab, Bihar, Bombay",
    deathToll: "4,500,000 – 5,000,000",
    colonialPolicyCause: "Viceroy Lord Elgin II continued massive wheat exports to London despite consecutive crop failures. Concurrently, bubonic plague broke out in Bombay, met with brutal British military cordon-and-search tactics.",
    contemporaryQuote: "W.T. Stead wrote: 'The British Empire sits gorged with wealth, while 5 million of its subjects perish of starvation in their mud huts.'"
  },
  {
    name: "Indian Famine of 1899 – 1900 (Chhapania Akal)",
    years: "1899 – 1900",
    regions: "Central Provinces, Berar, Bombay, Rajputana, Punjab",
    deathToll: "1,000,000 – 4,500,000",
    colonialPolicyCause: "Viceroy Lord Curzon imposed punitive labor tests for famine relief, slashing food allowances and arguing that generous relief would make Indians 'lazy'. Exports of grain continued unabated.",
    contemporaryQuote: "Lord Curzon: 'Any government which in times of famine undertook to provide for all the people would incur financial ruin.'"
  },
  {
    name: "The Bengal Famine of 1943",
    years: "1943 – 1944",
    regions: "Bengal, Bihar, Odisha, Assam",
    deathToll: "3,000,000 – 3,800,000",
    colonialPolicyCause: "Winston Churchill's British War Cabinet enacted the 'Boat Denial Policy' (destroying 66,000 river transport boats) and 'Rice Denial Policy', while printing billions of rupees to fund British military procurement. Churchill rejected urgent pleas from Viceroy Wavell, Canada, and the USA to send food ships, diverting Australian wheat to European stockpiles.",
    contemporaryQuote: "Winston Churchill: 'I hate Indians. They are a beastly people with a beastly religion... The famine was their own fault anyway, for breeding like rabbits.'"
  }
];

// Dramatis Personae (Kings, Queens, Freedom Fighters, British Officials)
const DRAMATIS_PERSONAE = [
  // Indian Royalty & Rulers
  {
    name: "Zamorin of Calicut (Manavikrama)",
    role: "Ruler of Calicut (Kozhikode)",
    period: "15th – 16th Century",
    side: "Indian Royalty",
    bio: "The hereditary Hindu monarch of the Kingdom of Calicut on the Malabar Coast. When Vasco da Gama arrived in 1498 with cheap trade trinkets, the Zamorin insisted on commercial dignity and refused to grant Portugal a trade monopoly at the expense of established Arab and Indian merchants. This led to decades of naval warfare with the Portuguese.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Vasco_da_Gama_before_the_Zamorin_of_Calicut.jpg/640px-Vasco_da_Gama_before_the_Zamorin_of_Calicut.jpg"
  },
  {
    name: "Nawab Siraj-ud-Daulah",
    role: "Last Independent Nawab of Bengal, Bihar & Orissa",
    period: "1733 – 1757",
    side: "Indian Royalty",
    bio: "Became Nawab of Bengal at age 23 in 1756. Fiercely opposed British illegal fortifications of Fort William and misuse of duty-free trade dastaks. Captured Calcutta in 1756. Betrayed at the Battle of Plassey (1757) by his commander Mir Jafar and the Jagat Seths, he was captured and executed in Murshidabad.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Nawab_Siraj_ud-Daulah.jpg/440px-Nawab_Siraj_ud-Daulah.jpg"
  },
  {
    name: "Mir Qasim",
    role: "Nawab of Bengal",
    period: "Reign: 1760 – 1763 (Died 1777)",
    side: "Indian Royalty",
    bio: "Unlike his father-in-law Mir Jafar, Mir Qasim refused to be an EIC puppet. He shifted his capital from Murshidabad to Munger (Bihar) to escape British surveillance, established modern arms and flintlock foundries, and abolished all inland transit customs duties to give Indian traders an equal footing. Formed the Triple Alliance at Buxar (1764).",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Mir_Qasim.jpg/440px-Mir_Qasim.jpg"
  },
  {
    name: "Hyder Ali",
    role: "Sultan of Mysore",
    period: "1721 – 1782",
    side: "Indian Royalty",
    bio: "Self-made military genius who rose from a simple soldier to become the de facto Sultan of Mysore. Modernized the Mysorean army with French artillery and pioneered iron-cased war rockets. Dictated the Treaty of Madras at the gates of Fort St. George in 1769, inflicting the only unconditional peace terms ever forced on the EIC.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Hyder_Ali_Khan_Bahadur%2C_Nawab_of_Mysore.jpg/440px-Hyder_Ali_Khan_Bahadur%2C_Nawab_of_Mysore.jpg"
  },
  {
    name: "Tipu Sultan ('The Tiger of Mysore')",
    role: "Sultan of the Kingdom of Mysore",
    period: "1750 – 1799",
    side: "Indian Royalty",
    bio: "One of the most scientifically advanced and formidable anti-colonial monarchs in world history. Masterminded the Mysorean rocket corps, established modern state silk factories and naval shipyards, corresponded with Napoleon Bonaparte, and planted the Tree of Liberty. Died sword in hand defending the Water Gate of Seringapatam on May 4, 1799.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Tipu_Sultan.jpg/440px-Tipu_Sultan.jpg"
  },
  {
    name: "Nana Fadnavis",
    role: "Peshwa Prime Minister & Maratha Statesman",
    period: "1742 – 1800",
    side: "Indian Royalty",
    bio: "Called the 'Maratha Machiavelli' by Europeans. As the supreme minister of the Maratha Confederacy in Pune, his masterly diplomatic coalitions held the British East India Company at bay for over two decades, winning the First Anglo-Maratha War and signing the favorable Treaty of Salbai (1782). With his death in 1800, European observers noted 'all the wisdom of the Marathas departed.'",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Nana_Fadnavis.jpg/440px-Nana_Fadnavis.jpg"
  },
  {
    name: "Maharaja Ranjit Singh ('Sher-e-Punjab')",
    role: "Founder & Emperor of the Sikh Empire",
    period: "1780 – 1839",
    side: "Indian Royalty",
    bio: "United the warring Sikh misls to establish the sovereign Sikh Empire (Sarkar-i-Khalsa). Modernized the Khalsa army with French, Italian, and American generals (Fauj-i-Khas), creating the most disciplined artillery and infantry force in Asia. Built a golden canopy over Sri Harmandir Sahib (Golden Temple). Kept the British south of the Sutlej River throughout his lifetime.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Maharaja_Ranjit_Singh_in_darbar.jpg/440px-Maharaja_Ranjit_Singh_in_darbar.jpg"
  },
  {
    name: "Rani Lakshmibai of Jhansi",
    role: "Queen of the Princely State of Jhansi",
    period: "1828 – 1858",
    side: "Indian Royalty / 1857 Leader",
    bio: "The supreme icon of Indian female bravery. When Lord Dalhousie annexed Jhansi under the Doctrine of Lapse, she defied British forces with the cry 'Main meri Jhansi nahi doongi!' Defended Jhansi fort heroically, escaped with her adopted son on horseback, and captured Gwalior. Martyred in combat at Kotah-ki-Serai on June 17, 1858, aged just 29.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Rani_of_jhansi.jpg/440px-Rani_of_jhansi.jpg"
  },
  {
    name: "Begum Hazrat Mahal",
    role: "Regent Queen of Awadh",
    period: "1820 – 1879",
    side: "Indian Royalty / 1857 Leader",
    bio: "First wife of the exiled Nawab Wajid Ali Shah. Took command of the 1857 rebellion in Lucknow, crowning her minor son Birjis Qadr. United Hindu and Muslim talukdars, sepoys, and peasants, leading the protracted 5-month siege of the British Residency. Refused British pensions and amnesties, choosing to die in exile in Nepal.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Begum_Hazrat_Mahal.jpg/440px-Begum_Hazrat_Mahal.jpg"
  },
  {
    name: "Veer Kunwar Singh",
    role: "King of Jagdishpur, Bihar",
    period: "1777 – 1858",
    side: "Indian Royalty / 1857 Leader",
    bio: "At the grand age of 80, Maharaja Kunwar Singh led the 1857 armed insurrection in Bihar. A master of guerrilla warfare, when a British bullet shattered his left wrist while crossing the Ganges, he famously drew his sword, severed his own poisoned arm, and offered it to Mother Ganga. Defeated British forces under Captain Le Grand before dying undefeated.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Kunwar_Singh_of_Jagdishpur.jpg/440px-Kunwar_Singh_of_Jagdishpur.jpg"
  },
  {
    name: "Bahadur Shah Zafar II",
    role: "Last Mughal Emperor of India",
    period: "1775 – 1862",
    side: "Indian Royalty / 1857 Leader",
    bio: "An accomplished Sufi poet, calligrapher, and the titular Emperor of Delhi. Proclaimed 'Shahenshah-e-Hindustan' by the mutineering sepoys on May 11, 1857. After the fall of Delhi, his sons were murdered by Major Hodson at Khooni Darwaza. Tried by the British, stripped of his crown, and exiled to Rangoon, Burma, where he died in 1862.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Bahadur_Shah_II_in_1858.jpg/440px-Bahadur_Shah_II_in_1858.jpg"
  },

  // British Viceroys, Generals & Governors
  {
    name: "Robert Clive ('Clive of India')",
    role: "Major-General & First Governor of Bengal",
    period: "1725 – 1774",
    side: "British Official",
    bio: "Began as an impoverished 18-year-old EIC clerk in Madras. Masterminded the defense of Arcot (1751), the conspiracy of Plassey (1757), and the Treaty of Allahabad (1765). Amassed an astronomical private fortune of £400,000 through corruption and plunder. Returned to Britain to face parliamentary censure; committed suicide by penknife in 1774.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Robert_Clive%2C_1st_Baron_Clive_by_Nathaniel_Dance%2C_circa_1773.jpg/440px-Robert_Clive%2C_1st_Baron_Clive_by_Nathaniel_Dance%2C_circa_1773.jpg"
  },
  {
    name: "Warren Hastings",
    role: "First Governor-General of Bengal",
    period: "1732 – 1818",
    side: "British Official",
    bio: "Abolished the Dual System of government and centralized revenue administration in Calcutta. Defended revenue extraction during the catastrophic 1770 Bengal Famine. Fought the First Anglo-Maratha and Second Anglo-Mysore Wars. Impeached in the British Parliament by Edmund Burke in a famous 7-year trial for high crimes and tyranny.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Warren_Hastings_by_Joshua_Reynolds.jpg/440px-Warren_Hastings_by_Joshua_Reynolds.jpg"
  },
  {
    name: "Lord Cornwallis",
    role: "Governor-General of India",
    period: "1738 – 1805",
    side: "British Official",
    bio: "Having surrendered to George Washington at Yorktown in the American Revolutionary War, Cornwallis was sent to India to reform administration. Introduced the Permanent Settlement (Zamindari System) in Bengal (1793) and the Cornwallis Code, segregating administration and banning Indians from high-ranking civil and military posts.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Charles_Cornwallis%2C_1st_Marquess_Cornwallis_by_John_Singleton_Copley.jpg/440px-Charles_Cornwallis%2C_1st_Marquess_Cornwallis_by_John_Singleton_Copley.jpg"
  },
  {
    name: "Lord Dalhousie",
    role: "Governor-General of India",
    period: "1812 – 1860",
    side: "British Official",
    bio: "Ruthless imperial modernizer. Devised the 'Doctrine of Lapse', forcefully annexing Satara, Jhansi, Sambalpur, Nagpur, and Awadh. Introduced India's first passenger railway (1853), electric telegraph lines, uniform postal stamps, and public works department, primarily designed to facilitate troop mobilization and raw material extraction.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/James_Broun-Ramsay%2C_1st_Marquess_of_Dalhousie.jpg/440px-James_Broun-Ramsay%2C_1st_Marquess_of_Dalhousie.jpg"
  },
  {
    name: "Lord Curzon",
    role: "Viceroy of India",
    period: "1859 – 1925",
    side: "British Official",
    bio: "Arrogant high imperialist who believed the British Empire was ordained by Providence. Partitioned Bengal in 1905 to divide Hindu and Muslim nationalists, sparking the nationwide Swadeshi movement. Known for his remark: 'As long as we rule India, we are the greatest power in the world. If we lose it, we shall drop straight away to a third-rate power.'",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Lord_Curzon_1900s.jpg/440px-Lord_Curzon_1900s.jpg"
  },
  {
    name: "Brigadier-General Reginald Dyer",
    role: "Commander of Amritsar Garrison",
    period: "1864 – 1927",
    side: "British Official",
    bio: "The 'Butcher of Amritsar'. On April 13, 1919, ordered 50 riflemen to fire 1,650 rounds into an unarmed trapped assembly of 20,000 men, women, and children at Jallianwala Bagh, murdering over 1,000. Enacted the crawling order. Though censured by the Hunter Commission, was feted as a hero by the British House of Lords and British conservatives who gifted him a jeweled sword and £26,000.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Reginald_Dyer.jpg/440px-Reginald_Dyer.jpg"
  },
  {
    name: "Winston Churchill",
    role: "British Prime Minister",
    period: "1874 – 1965",
    side: "British Official",
    bio: "Vehement opponent of Indian self-rule throughout his political career. Called Gandhi a 'half-naked seditious fakir'. During the 1943 Bengal Famine, Churchill's War Cabinet refused to divert grain ships, causing 3.8 million Indian deaths while stockpiling food for Europe. Expressed deep racist disdain for Indians, declaring them 'a beastly people with a beastly religion.'",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Sir_Winston_Churchill_-_1943.jpg/440px-Sir_Winston_Churchill_-_1943.jpg"
  },
  {
    name: "Lord Louis Mountbatten",
    role: "Last Viceroy & First Governor-General of Dominion of India",
    period: "1900 – 1979",
    side: "British Official",
    bio: "Great-grandson of Queen Victoria. Arrived in March 1947 to expedite Britain's exit. Advanced the independence date by 10 months to August 15, 1947, and deliberately suppressed the Radcliffe boundary maps until two days after independence to escape British liability for the catastrophic partition carnage of 1 million dead.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Lord_Mountbatten_1947.jpg/440px-Lord_Mountbatten_1947.jpg"
  },

  // Freedom Fighters, Nationalists & Revolutionaries
  {
    name: "Dadabhai Naoroji ('The Grand Old Man of India')",
    role: "Pioneer Nationalist, Economist & MP in British House of Commons",
    period: "1825 – 1917",
    side: "Freedom Fighter",
    bio: "First Indian elected to the British Parliament (Finsbury Central, 1892). Formulated the definitive 'Drain of Wealth' theory in 'Poverty and Un-British Rule in India', proving Britain was siphoning away India's resources. Thrice President of Congress, he officially placed the demand for 'Swaraj' (Self-Rule) at the Calcutta Congress in 1906.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Dadabhai_Naoroji.jpg/440px-Dadabhai_Naoroji.jpg"
  },
  {
    name: "Lokmanya Bal Gangadhar Tilak",
    role: "Leader of Extremist Wing ('Father of the Indian Unrest')",
    period: "1856 – 1920",
    side: "Freedom Fighter",
    bio: "Transformed the freedom struggle from elite petitions to mass popular agitation. Popularized public festivals (Ganesh Utsav and Shivaji Utsav) to organize the masses and founded newspapers Kesari and Mahratta. Gave the immortal roar: 'Swaraj is my birthright, and I shall have it!' Sentenced to 6 years hard labor in Mandalay Prison, Burma (1908–1914).",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Bal_G_Tilak.jpg/440px-Bal_G_Tilak.jpg"
  },
  {
    name: "Mahatma Mohandas Karamchand Gandhi",
    role: "Father of the Nation ('Bapu')",
    period: "1869 – 1948",
    side: "Freedom Fighter",
    bio: "Pioneered the philosophy and practice of Satyagraha (truth-force) and Ahimsa (non-violent resistance). Led three epoch-defining mass movements: Non-Cooperation (1920–22), Civil Disobedience and Dandi Salt March (1930), and Quit India (1942) with the mantra 'Do or Die'. Transformed the independence struggle into the largest peaceful mass movement in human history. Assassinated on Jan 30, 1948.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Mahatma-Gandhi%2C_studio%2C_1931.jpg/440px-Mahatma-Gandhi%2C_studio%2C_1931.jpg"
  },
  {
    name: "Netaji Subhas Chandra Bose",
    role: "Supreme Commander of the Indian National Army (Azad Hind Fauj)",
    period: "1897 – 1945",
    side: "Freedom Fighter",
    bio: "Resigned from top rank in the Indian Civil Service (ICS) to fight for complete independence. Thrice elected Congress President (Tripuri & Haripura). Executed 'The Great Escape' from house arrest in 1941, formed the Provisional Government of Free India (*Arzi Hukumat-e-Azad Hind*) in Singapore, established the Rani of Jhansi women's combat regiment, and marched on British India under the battle cry 'Chalo Delhi!'.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Subhas_Chandra_Bose_CBE.jpg/440px-Subhas_Chandra_Bose_CBE.jpg"
  },
  {
    name: "Bhagat Singh (Shaheed-e-Azam)",
    role: "Socialist Revolutionary Leader (HSRA)",
    period: "1907 – 1931",
    side: "Freedom Fighter",
    bio: "Profound intellectual and revolutionary. Founded Naujawan Bharat Sabha; avenged Lala Lajpat Rai's death by shooting Saunders in Lahore (1928); bombed Central Legislative Assembly (1929) with Batukeshwar Dutt 'to make the deaf hear'. Undertook a historic 116-day hunger strike in jail for political prisoners' rights. Martyred on March 23, 1931, aged just 23.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Bhagat_Singh_1929.jpg/440px-Bhagat_Singh_1929.jpg"
  },
  {
    name: "Sardar Vallabhbhai Patel ('Iron Man of India')",
    role: "First Deputy Prime Minister & Home Minister of India",
    period: "1875 – 1950",
    side: "Freedom Fighter",
    bio: "Hero of Kheda and Bardoli peasant satyagrahas ('Sardar'). As Minister of States in independent India, he accomplished the near-impossible integration of 565+ princely states within 18 months through masterful diplomacy and resolute action (Operation Polo in Hyderabad), unifying the Indian subcontinent into a single modern republic.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Sardar_patel_%28cropped%29.jpg/440px-Sardar_patel_%28cropped%29.jpg"
  },
  {
    name: "Dr. Bhimrao Ramji Ambedkar (Babasaheb)",
    role: "Chief Architect of the Indian Constitution & Social Reformer",
    period: "1891 – 1956",
    side: "Freedom Fighter / Reformer",
    bio: "World-renowned jurist, economist, and crusader for human rights and annihilation of caste. Founded Bahishkrit Hitakarini Sabha, led Mahad Satyagraha for water rights (1927), signed the Poona Pact (1932), served as Independent India's first Law Minister, and chaired the Drafting Committee of the Constitution of India.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Dr._Bhimrao_Ambedkar.jpg/440px-Dr._Bhimrao_Ambedkar.jpg"
  },
  {
    name: "Pandit Jawaharlal Nehru",
    role: "First Prime Minister of Independent India",
    period: "1889 – 1964",
    side: "Freedom Fighter",
    bio: "Pioneered the 'Purna Swaraj' (Complete Independence) resolution in Lahore (1929). Spent over 9 years in British prisons, writing 'Discovery of India' and 'Glimpses of World History'. Delivered the legendary 'Tryst with Destiny' speech at midnight on August 14, 1947, and served as independent India's foundational architect for 17 years.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Jawaharlal_Nehru_1947.jpg/440px-Jawaharlal_Nehru_1947.jpg"
  },
  {
    name: "Sarojini Naidu ('Nightingale of India')",
    role: "Poet, Freedom Fighter & First Indian Woman Congress President",
    period: "1879 – 1949",
    side: "Freedom Fighter",
    bio: "Brilliant orator and poet. First Indian woman to preside over the Indian National Congress (Kanpur 1925). Led the heroic non-violent raid on Dharasana Salt Works after Gandhi's arrest in 1930. Became the first woman Governor of an Indian state (United Provinces) after independence.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Sarojini_Naidu_1912.jpg/440px-Sarojini_Naidu_1912.jpg"
  },
  {
    name: "Chandrashekhar Azad",
    role: "Commander-in-Chief of HSRA",
    period: "1906 – 1931",
    side: "Freedom Fighter",
    bio: "Reorganized the revolutionary movement after Kakori into the HSRA. Mentored Bhagat Singh, Rajguru, and Sukhdev. Took a solemn vow never to be captured alive by the British. On February 27, 1931, surrounded by police at Alfred Park in Allahabad, he fought off dozens of armed officers with his Colt pistol until holding his final bullet to his own temple, dying a free man ('Azad').",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Chandra_Shekhar_Azad.jpg/440px-Chandra_Shekhar_Azad.jpg"
  }
,
  {
    name: "Maharaja Marthanda Varma",
    role: "King of Travancore",
    period: "1706 – 1758",
    side: "Indian Royalty",
    bio: "The visionary King of Travancore who inflicted a historic defeat on the Dutch VOC at the Battle of Colachel (1741). He transformed Travancore into a modern centralized state, dedicated his kingdom to Lord Padmanabha (Padmanabhadasa), and completely ended Dutch political aspirations in India.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Marthanda_Varma.jpg/440px-Marthanda_Varma.jpg"
  },
  {
    name: "Rani Chennamma of Kittur",
    role: "Queen of Kittur (Karnataka)",
    period: "1778 – 1829",
    side: "Indian Royalty",
    bio: "One of the earliest Indian female monarchs to lead an armed revolt against the British East India Company. In 1824, she rejected British interference in her adopted son's succession, defeated British Collector Thackeray's forces, and defended Kittur Fort with fierce courage before being captured and martyred.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Kittur_Chennamma.jpg/440px-Kittur_Chennamma.jpg"
  },
  {
    name: "Tatya Tope (Ramachandra Pandurang)",
    role: "General of 1857 Uprising & Guerrilla Master",
    period: "1814 – 1859",
    side: "Indian Royalty / 1857 Leader",
    bio: "The military brain behind Nana Saheb and close ally of Rani Lakshmibai. Outmaneuvered British armies across Central India for nearly two years using lightning guerrilla tactics with barefoot troops. Captured Gwalior fort with Rani Lakshmibai. Betrayed by Raja Man Singh of Narwar and hanged by the British on April 18, 1859.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Tatya_Tope.jpg/440px-Tatya_Tope.jpg"
  },
  {
    name: "Nana Saheb (Dhondu Pant)",
    role: "Adopted Son of Peshwa Baji Rao II",
    period: "1824 – 1859 (disappeared)",
    side: "Indian Royalty / 1857 Leader",
    bio: "When Lord Dalhousie terminated his father's £80,000 annual pension, Nana Saheb sent Azimullah Khan to London to appeal, to no avail. In May 1857, he seized Kanpur, declared himself Peshwa of the restored Maratha Confederacy, and led the ferocious siege of Cawnpore. Evaded British capture and disappeared into the Nepal Terai.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Nana_Sahib.jpg/440px-Nana_Sahib.jpg"
  },
  {
    name: "Birsa Munda ('Dharti Aaba')",
    role: "Tribal Leader & Folk Hero of Chota Nagpur",
    period: "1875 – 1900",
    side: "Freedom Fighter / Tribal Resistance",
    bio: "Spearheaded the fiery tribal millenarian movement called 'Ulgulan' (The Great Tumult) in the late 19th century across Jharkhand and Bihar against British colonial land grab laws and the oppressive Dikus (British-backed landlords). Captured by the British and died in Ranchi Jail at age 25. His rebellion forced the British to enact the Chhota Nagpur Tenancy Act 1908.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Birsa_Munda.jpg/440px-Birsa_Munda.jpg"
  },
  {
    name: "Alluri Sitarama Raju",
    role: "Leader of the Rampa Rebellion (Andhra Pradesh)",
    period: "1897 – 1924",
    side: "Freedom Fighter / Tribal Resistance",
    bio: "Revered as 'Manyam Veerudu' (Hero of the Jungles). Led the Rampa Rebellion of 1922–1924 in the Eastern Ghats against the Madras Forest Act 1882, which barred Adivasis from traditional podu (shifting) cultivation. Staged audacious guerrilla raids on British police stations to seize arms. Captured and executed by firing squad tied to a tree on May 7, 1924.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Alluri_Sitarama_Raju_Stamp.jpg/440px-Alluri_Sitarama_Raju_Stamp.jpg"
  },
  {
    name: "Maulana Abul Kalam Azad",
    role: "Scholar, Senior Congress Leader & First Education Minister",
    period: "1888 – 1958",
    side: "Freedom Fighter",
    bio: "Profound Islamic theologian and staunch advocate of composite Indian nationalism. Youngest President of the Indian National Congress in 1923 (aged 35) and Congress President throughout the crucial WWII years (1940–1946). Vehemently opposed the Partition of India and Jinnah's two-nation theory. Established the IITs, UGC, and Sahitya Akademi as Education Minister.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Maulana_Azad.jpg/440px-Maulana_Azad.jpg"
  },
  {
    name: "Aruna Asaf Ali ('Grand Old Lady of Independence')",
    role: "Heroine of the 1942 Quit India Movement",
    period: "1909 – 1996",
    side: "Freedom Fighter",
    bio: "When all senior Congress leaders were arrested on the morning of August 9, 1942, 33-year-old Aruna Asaf Ali boldly walked into Gowalia Tank Maidan amidst tear gas and police cordons, unfurled the Indian tricolor, and launched the public phase of the Quit India movement. Evaded British arrest for four years operating an underground network.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Aruna_Asaf_Ali_1940s.jpg/440px-Aruna_Asaf_Ali_1940s.jpg"
  },
  {
    name: "Captain Lakshmi Sahgal",
    role: "Commander of the Rani of Jhansi Regiment (INA)",
    period: "1914 – 2012",
    side: "Freedom Fighter",
    bio: "Medical doctor who joined Netaji Subhas Chandra Bose in Singapore to command the 1,500-strong all-female combat infantry 'Rani of Jhansi Regiment'. Fought on the Burma front against British forces. Later nominated as candidate for the President of India in 2002.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Lakshmi_Sahgal_1943.jpg/440px-Lakshmi_Sahgal_1943.jpg"
  },
  {
    name: "Khan Abdul Ghaffar Khan ('Frontier Gandhi')",
    role: "Pashtun Peace Crusader & Founder of Khudai Khidmatgar",
    period: "1890 – 1988",
    side: "Freedom Fighter",
    bio: "Founded the 100,000-strong non-violent Pashtun movement 'Khudai Khidmatgar' (Servants of God / Red Shirts) in the North-West Frontier Province. Pioneered total non-violence among proud martial Pashtuns. Opposed Partition with all his soul, lamenting to Congress: 'You have thrown us to the wolves.' Spent decades in Pakistani prisons after 1947.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Khan_Abdul_Ghaffar_Khan_in_1940s.jpg/440px-Khan_Abdul_Ghaffar_Khan_in_1940s.jpg"
  },
  {
    name: "Pritilata Waddedar",
    role: "Revolutionary Martyr of Chittagong",
    period: "1911 – 1932",
    side: "Freedom Fighter",
    bio: "Heroic student and lieutenant of Surya Sen in Chittagong. On September 23, 1932, dressed in male Punjabi dress, she led 15 revolutionaries in an armed assault on the racist Pahartali European Club, which bore the infamous sign: 'Dogs and Indians not allowed.' After successfully attacking the club, wounded by a bullet, she swallowed potassium cyanide to avoid capture, dying at age 21.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Pritilata_Waddedar.jpg/440px-Pritilata_Waddedar.jpg"
  },
  {
    name: "V.O. Chidambaram Pillai ('Kappalottiya Thamizhan')",
    role: "Pioneer Swadeshi Industrialist & Freedom Fighter",
    period: "1872 – 1936",
    side: "Freedom Fighter",
    bio: "Pioneered indigenous maritime independence by establishing the Swadeshi Steam Navigation Company in 1906 in Tuticorin (Tamil Nadu) to break the monopoly of the British India Steam Navigation Company. Arrested for sedition, he was subjected to brutal hard labor in Coimbatore prison, forced to pull a heavy oil press (chekku) like an ox.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/V._O._Chidambaram_Pillai.jpg/440px-V._O._Chidambaram_Pillai.jpg"
  },
  {
    name: "Lord William Bentinck",
    role: "Governor-General of India",
    period: "1774 – 1839",
    side: "British Official",
    bio: "Governor-General from 1828 to 1835. Best known for enacting Regulation XVII in 1829 declaring the practice of Sati (widow burning) illegal and punishable as culpable homicide, in close collaboration with Raja Ram Mohan Roy. Also suppressed the Thuggee cult through William Sleeman and endorsed Macaulay's English Education Minute in 1835.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Lord_William_Bentinck.jpg/440px-Lord_William_Bentinck.jpg"
  },
  {
    name: "Lord Irwin (Lord Halifax)",
    role: "Viceroy of India",
    period: "1881 – 1959",
    side: "British Official",
    bio: "Viceroy from 1926 to 1931. Faced the Simon Commission protests, the martyrdom of Lala Lajpat Rai, the Lahore assembly bombing, and Gandhi's Dandi Salt March. Refused to commute the death sentence of Bhagat Singh, Sukhdev, and Rajguru. Negotiated the Gandhi-Irwin Pact of March 1931.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Lord_Irwin_Viceroy.jpg/440px-Lord_Irwin_Viceroy.jpg"
  }
];

// Economic Drain Infographic Data
const ECONOMIC_DRAIN_DATA = {
  totalDrainValueUSD: "$45 Trillion",
  source: "Study by Prof. Utsa Patnaik (Columbia University Press, 2018)",
  yearsCovered: "1765 – 1938",
  shareOfWorldGDP: {
    year1700: "27.0%",
    year1947: "Less than 3.0%"
  },
  mechanisms: [
    {
      title: "The Diwani Revenue Triangulation (1765 onwards)",
      desc: "Prior to 1765, the British EIC had to bring gold and silver bullion from London to buy Indian fine cottons and silks. After acquiring the Diwani of Bengal, the British collected taxes in silver from Indian peasants, and used THAT VERY TAX MONEY to purchase Indian goods for export, getting all Indian merchandise entirely for FREE."
    },
    {
      title: "Destruction of Indian Handloom & De-industrialization",
      desc: "In 1700, India produced roughly 25% of all global textiles. Britain placed punitive import tariffs (up to 70-80%) on Indian handloom fabrics entering Britain, while flooding India with duty-free Manchester machine-made cloth, reducing millions of skilled Indian artisans to impoverished agricultural laborers."
    },
    {
      title: "Council Bills Currency Manipulation",
      desc: "International buyers who wished to purchase Indian raw cotton, jute, tea, or opium could not pay Indian producers in gold or silver; they were forced to buy 'Council Bills' issued only by the Secretary of State in London. London pocketed the gold and sterling, while Indian exporters received paper rupees printed out of India's own budget."
    },
    {
      title: "The 5% Guaranteed Return Railway Scam",
      desc: "British private investors building Indian railways were guaranteed a 5% tax-free annual return funded entirely by Indian taxpayers, regardless of railway profit or efficiency. As a result, Indian railways cost 9 times more per mile to construct than in the United States."
    },
    {
      title: "Imperial Military Expenditures",
      desc: "Indian taxpayers were forced to pay for every British imperial conquest from Abyssinia (Ethiopia) and Sudan to Egypt, Burma, and China (Opium Wars), including all pensions for British officers living in retirement in England."
    }
  ]
};

// Historical Map Preset Polygons & Geo Data for Era Layer Switches
const MAP_ERA_PRESETS = {
  1700: {
    name: "Pre-Colonial Subcontinent (c. 1700)",
    description: "Mughal Empire at its zenith under Aurangzeb; Portuguese coastal outposts in Goa, Daman, Diu; nascent English factories in Surat, Madras, Bombay, Calcutta.",
    center: [22.0, 78.0],
    zoom: 5,
    territories: [
      {
        name: "Mughal Empire",
        color: "#15803d",
        coords: [
          [34.0, 71.0], [32.0, 75.0], [28.0, 77.0], [25.0, 85.0], [23.0, 88.0],
          [20.0, 85.0], [16.0, 80.0], [14.0, 75.0], [18.0, 73.0], [24.0, 69.0],
          [30.0, 68.0], [34.0, 71.0]
        ]
      }
    ]
  },
  1765: {
    name: "After Buxar & Diwani (1765)",
    description: "East India Company obtains sovereign revenue rights (Diwani) over Bengal, Bihar, and Orissa. Northern Circars ceded to British. Maratha Confederacy dominates central and western India.",
    center: [23.0, 82.0],
    zoom: 5,
    territories: [
      {
        name: "EIC Bengal Diwani & Northern Circars",
        color: "#dc2626",
        coords: [
          [26.5, 83.5], [27.0, 88.5], [25.0, 92.0], [22.0, 91.0], [21.5, 87.0],
          [19.0, 85.0], [16.0, 81.0], [17.5, 82.5], [20.5, 85.5], [23.5, 84.5],
          [26.5, 83.5]
        ]
      },
      {
        name: "Maratha Confederacy",
        color: "#f59e0b",
        coords: [
          [28.0, 76.0], [26.0, 80.0], [22.0, 82.0], [18.0, 80.0], [15.0, 74.0],
          [19.0, 73.0], [24.0, 72.0], [28.0, 76.0]
        ]
      }
    ]
  },
  1805: {
    name: "Wellesley's Expansions (1805)",
    description: "Mysore partitioned after Tipu's fall; Carnatic, Tanjore, and Awadh Doab annexed; Scindia defeated at Assaye; British take Delhi and the Mughal Emperor.",
    center: [21.0, 79.0],
    zoom: 5,
    territories: [
      {
        name: "British Direct Control (1805)",
        color: "#dc2626",
        coords: [
          [28.7, 77.2], [27.0, 81.0], [25.5, 85.0], [22.5, 88.5], [19.0, 85.0],
          [13.0, 80.3], [10.0, 79.5], [11.5, 76.0], [13.0, 77.5], [16.0, 80.5],
          [21.0, 87.0], [28.7, 77.2]
        ]
      }
    ]
  },
  1857: {
    name: "Eve of the 1857 Rebellion (1857)",
    description: "Punjab, Sindh, Awadh, Satara, Nagpur, Jhansi annexed. British rule extends over nearly three-fifths of the subcontinent directly, with remaining areas in subsidiary alliances.",
    center: [22.5, 78.5],
    zoom: 5,
    territories: [
      {
        name: "British Presidencies & Annexed Provinces (1857)",
        color: "#b91c1c",
        coords: [
          [34.0, 71.5], [32.0, 76.0], [28.5, 77.2], [27.0, 82.0], [26.0, 92.0],
          [22.5, 88.5], [19.0, 85.0], [13.0, 80.3], [8.5, 77.5], [15.0, 74.0],
          [19.0, 72.8], [24.5, 68.0], [29.0, 71.0], [34.0, 71.5]
        ]
      }
    ]
  },
  1947: {
    name: "The Partition of India (August 1947)",
    description: "The Radcliffe Line partitions the subcontinent into India and Pakistan (West Pakistan & East Pakistan). 565 Princely States face accession.",
    center: [23.5, 79.0],
    zoom: 5,
    territories: [
      {
        name: "Dominion of India",
        color: "#059669",
        coords: [
          [32.5, 75.0], [30.0, 77.0], [28.5, 80.0], [27.0, 88.0], [28.0, 96.0],
          [24.0, 94.0], [22.0, 89.0], [16.0, 82.0], [8.2, 77.5], [15.0, 73.8],
          [21.0, 72.5], [24.0, 69.0], [27.5, 71.5], [31.5, 74.5], [32.5, 75.0]
        ]
      },
      {
        name: "Pakistan (West & East)",
        color: "#1e3a8a",
        coords: [
          [35.0, 72.0], [31.5, 74.5], [27.5, 71.5], [24.0, 68.0], [25.0, 62.0],
          [30.0, 66.0], [35.0, 72.0]
        ]
      }
    ]
  },
  1961: {
    name: "Final Liberation of Goa (December 1961)",
    description: "Operation Vijay liberates Goa, Daman, and Diu, terminating 451 years of Portuguese presence. The final vestige of foreign colonialism on Indian soil is expunged.",
    center: [15.5, 74.0],
    zoom: 8,
    territories: [
      {
        name: "Liberated Goa",
        color: "#10b981",
        coords: [
          [15.8, 73.7], [15.8, 74.2], [15.0, 74.3], [14.9, 74.0], [15.8, 73.7]
        ]
      }
    ]
  }
};

// Global window attachments
if (typeof window !== "undefined") {
  window.HISTORICAL_ERAS = HISTORICAL_ERAS;
  window.TIMELINE_EVENTS = TIMELINE_EVENTS;
  window.MAJOR_WARS = MAJOR_WARS;
  window.TREATIES_ARCHIVE = TREATIES_ARCHIVE;
  window.FAMINES_REGISTER = FAMINES_REGISTER;
  window.DRAMATIS_PERSONAE = DRAMATIS_PERSONAE;
  window.ECONOMIC_DRAIN_DATA = ECONOMIC_DRAIN_DATA;
  window.MAP_ERA_PRESETS = MAP_ERA_PRESETS;
}
