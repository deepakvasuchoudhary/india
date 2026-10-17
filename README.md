# Chronica Imperii Indici: India's Colonial Past from Start to End (1498 – 1961)

An interactive, museum-grade scrollytelling web application and historical geographical chronicle charting the 451-year history of European colonial presence and Indian resistance—from Vasco da Gama's landing in Calicut in 1498 to the armed liberation of Goa in 1961.

Redesigned with the **minimalist editorial architecture** (matching Bharat: The Living Palimpsest), featuring a fixed top utility header, stationary left dock with vertical timeline scrubber, panoramic Leaflet map stage, signature dotted underline typography, and five deep-dive historical dossiers.

---

## 🌟 Key Architecture & Features

### 1. Minimalist Editorial Layout (Exact Replica of Bharat)
- **Stationary Top Header**: Fixed header keeping the navigation utility bar, brand emblem (Ashoka Chakra), global search with autocomplete, dossier openers, and single-line chapter title stationary at all times without layout shift.
- **Stationary Left Dock**: Permanently positioned 440px dock sidebar with black circular Play/Pause button for automated cinematic tours, a vertical timeline rail with dynamic progress fill, a sliding 5-item window of historical milestones, active pink/black beads, and a monospace timer.
- **Independent Center Stage Column**: The only scrollable element in the viewport (`height: calc(100vh - 146px); overflow-y: auto;`), allowing readers to explore the narrative and historical analysis while keeping the header and left dock stationary.
- **Panoramic Media Card**: 440px rounded media stage housing the interactive Leaflet map, floating HUD badges (Category & Date/Location), layer toggles (`Boundaries`, `Markers`, `Routes`, `Theme`), and floating prev/next navigation chevrons.
- **Signature Dotted Underline Typography**: Rich editorial reading section featuring paragraphs styled with dotted underlines on every line, chapter citation lines, and an expandable deep-dive analysis accordion.

### 2. 63 Chronological Milestones (8 Historical Chapters)
- **Chapter 1 (1498–1744)**: Mercantile Contact, Vasco da Gama, Battle of Diu, Conquest of Goa, EIC 1600 Royal Charter, Sir Thomas Roe, Fort St. George, Bombay dowry lease, Fort William Calcutta, Farrukhsiyar Farman, Battle of Colachel.
- **Chapter 2 (1744–1765)**: Carnatic Wars, Siege of Arcot, Siraj-ud-Daulah, Battle of Plassey (1757), Battle of Wandiwash (1760), Battle of Buxar (1764), Treaty of Allahabad & Diwani Rights.
- **Chapter 3 (1765–1849)**: 1770 Bengal Famine, Four Anglo-Mysore Wars, Tipu Sultan, Seringapatam (1799), Three Anglo-Maratha Wars, Treaty of Salbai, Battle of Assaye, Fall of Peshwaship (1818), Kittur Rebellion, Annexation of Sindh, Anglo-Sikh Wars & Fall of Punjab (1849).
- **Chapter 4 (1849–1858)**: Dalhousie's Doctrine of Lapse, Annexation of Awadh, 1857 War of Independence, Mangal Pandey, Meerut Mutiny, Bahadur Shah Zafar, Nana Saheb, Tatya Tope, Rani Lakshmibai of Jhansi, Begum Hazrat Mahal, Kunwar Singh, Queen Victoria's 1858 Proclamation.
- **Chapter 5 (1858–1905)**: Indigo Revolt, Orissa Famine 1866, Dadabhai Naoroji unmasks the Drain of Wealth, Great Famine 1876–78 & Lytton's Delhi Durbar, Indian National Congress founded (1885), Twin Famines 1896–1900, Birsa Munda's Ulgulan.
- **Chapter 6 (1905–1930)**: Partition of Bengal (1905), Swadeshi & Boycott, Surat Split 1907 (Lal-Bal-Pal), Jallianwala Bagh Massacre (1919), Non-Cooperation & Chauri Chaura, Kakori Action, Saunders shot, Central Assembly Bombing, Purna Swaraj (1929), Dandi Salt March (1930), Chittagong Armoury Raid.
- **Chapter 7 (1930–1946)**: Martyrdom of Bhagat Singh, Rajguru & Sukhdev (1931), Poona Pact (1932), WWII Resignations, Netaji's Great Escape (1941), Quit India Movement (1942), 1943 Bengal Famine (3.8M dead), Azad Hind Fauj & Rani of Jhansi regiment, Battles of Kohima & Imphal, INA Red Fort Trials, Royal Indian Navy (RIN) Mutiny 1946.
- **Chapter 8 (1946–1961)**: Mountbatten Plan & Radcliffe Demarcation Line, Midnight's Tryst with Destiny (August 15, 1947), Human tragedy of Partition, Sardar Patel integrates 565 Princely States, Transfer of French Enclaves (Pondicherry 1954), and Operation Vijay (December 18–19, 1961) liberating Portuguese Goa, concluding 451 years of colonial rule.

### 3. Specialized Explorer Dossiers (Interactive Modals)
- ⚔️ **Major Wars & Battles**: 16 wars cataloged with belligerents, key battles, commanders, casualties, and geopolitical outcomes.
- 📜 **Historic Treaties Archive**: 13 landmark treaties with signatories, locations, key clauses, and imperial consequences.
- 🌾 **The Great Famines Register**: 10 catastrophic famines analyzing death tolls, Victorian/Churchillian laissez-faire export policies, and relief failures.
- 👑 **Dramatis Personae**: 43 historical biographies of Indian royalty, British administrators, and freedom fighters with instant filtering and search.
- 💰 **$45 Trillion Economic Drain**: Detailed breakdown of Prof. Utsa Patnaik's Columbia University study and the 5 structural extraction mechanisms.

### 4. Atmospheric Sound & Interactive Controls
- **Web Audio API Tanpura Synthesizer**: Traditional Indian classical 4-string Tanpura harmonic drone (C#3 / G#3 with acoustic jivari and slow breathing LFO) and milestone transition chimes with zero external sound files.
- **Automated Tour Mode**: Spacebar / dock button triggers automated hands-free presentation advancing milestones with smooth camera flights.
- **Keyboard Navigation**: Arrow Left/Up (previous milestone), Arrow Right/Down (next milestone), Spacebar (toggle tour), Escape (close modals).
- **Global Search**: Instant autocomplete search across all 63 milestones, 43 figures, 16 wars, 13 treaties, and 10 famines.

---

## 🚀 How to Run

Simply open `index.html` in any modern browser, or launch a local development server:

```bash
# Using Python
python3 -m http.server 8088

# Or using Node
npx serve .
```

Then visit `http://localhost:8088` in your web browser.

---

## 📁 Project Architecture

```
india/
├── index.html            # Exact replica editorial layout, sticky header, left dock & modal containers
├── css/
│   └── styles.css        # Minimalist editorial design system, typography, animations & map styling
└── js/
    ├── app.js            # Main controller, modal renderers, and global search
    ├── audio.js          # Pure Web Audio API Tanpura drone synthesizer & transition chimes
    ├── data.js           # Full historical database (63 milestones, 16 wars, 13 treaties, 10 famines, 43 figures, $45T drain)
    ├── map.js            # Leaflet interactive map controller, routes, polygons & custom beacons
    └── scroller.js       # Scrollytelling engine, vertical dock timeline & automated tour
```
