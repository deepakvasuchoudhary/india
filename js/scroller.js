/**
 * INDIA: CHRONICA IMPERII INDICI
 * Scrollytelling & Cinematic Tour Controller
 * Manages 63 milestones, vertical dock timeline, single-line header updates,
 * dotted paragraph narrative, deep-dive dossiers, and map camera flight.
 */

class ScrollytellingEngine {
  constructor(mapController) {
    this.mapController = mapController;
    this.currentMilestoneIndex = 0; // Starts with Milestone 01: Vasco da Gama
    this.milestones = window.TIMELINE_EVENTS || [];
    this.eras = window.HISTORICAL_ERAS || [];

    this.isAutoPlaying = false;
    this.autoPlayTimer = null;
    this.autoPlayIntervalMs = 12000; // 12 seconds per milestone
    this.tourElapsedSec = 0;
    this.tourTotalSec = 45;
    this.timerTickInterval = null;

    // UI elements
    this.dockStepsContainer = document.getElementById("dock-steps-list");
    this.progressFill = document.getElementById("dock-progress-fill");
    this.timerDisplay = document.getElementById("dock-timer-display");
    this.playIcon = document.getElementById("icon-tour-play");
    this.pauseIcon = document.getElementById("icon-tour-pause");

    this.eyebrowEl = document.getElementById("top-eyebrow-text");
    this.titleEl = document.getElementById("top-title-text");
    this.badgeTag = document.getElementById("hud-badge-tag");
    this.periodTag = document.getElementById("hud-period-tag");

    this.paragraphEl = document.getElementById("editorial-main-paragraph");
    this.citationEl = document.getElementById("editorial-citation-line");
    this.quoteBody = document.getElementById("quote-text-body");
    this.quoteAuthor = document.getElementById("quote-cite-author");
    this.dossierJumpContainer = document.getElementById("editorial-dossier-jump");
    this.figuresGrid = document.getElementById("editorial-figures-chips");
    this.impactsList = document.getElementById("editorial-impacts-list");

    // Concise labels for the left dock
    this.shortLabels = [
      "Calicut Landing", "Battle of Diu", "Conquest of Goa", "EIC Charter",
      "Jahangir's Court", "Fort St. George", "Dowry of Bombay", "Calcutta Founded",
      "Farman 1717", "Battle of Colachel", "Siege of Arcot", "Black Hole 1756",
      "Battle of Plassey", "Wandiwash 1760", "Battle of Buxar", "Treaty Allahabad",
      "Bengal Famine 1770", "Mysore War 1769", "Treaty of Salbai", "Seringapatam 1799",
      "Subsidiary System", "Battle of Assaye", "Maratha Fall 1818", "Kittur Rebellion",
      "Annexation Sindh", "Punjab Fall 1849", "Doctrine of Lapse", "Mangal Pandey",
      "Meerut Mutiny", "Siege of Cawnpore", "Rani Lakshmibai", "Siege of Lucknow",
      "Delhi Sacked 1857", "Crown Rule 1858", "Indigo Revolt", "Drain of Wealth",
      "Great Famine 1876", "INC Founded 1885", "Bengal Partition", "Surat Split 1907",
      "Jallianwala Bagh", "Chauri Chaura", "Kakori Action", "Saunders Avenged",
      "Assembly Bombing", "Purna Swaraj 1929", "Dandi Salt March", "Chittagong Raid",
      "Bhagat Singh Martyr", "Poona Pact 1932", "WWII Resignation", "Netaji's Escape",
      "Quit India 1942", "Bengal Famine 1943", "Azad Hind Fauj", "Red Fort Trials",
      "RIN Naval Mutiny", "Mountbatten Plan", "Tryst with Destiny", "Partition Tragedy",
      "Patel's 565 States", "French Enclaves", "Goa Liberation 1961"
    ];
  }

  init() {
    this.renderDockSteps();
    this.setupKeyboardShortcuts();
    this.setupWheelListener();

    if (this.dockStepsContainer) {
      this.dockStepsContainer.addEventListener("click", (e) => {
        const item = e.target.closest(".dock-step-item");
        if (item) {
          const idx = parseInt(item.dataset.index, 10);
          this.activateMilestoneByIndex(idx, true);
        }
      });
    }

    // Activate initial milestone
    this.activateMilestoneByIndex(this.currentMilestoneIndex, false);
    this.updateTimerDisplay();
  }

  /**
   * Render 5 vertical dock items centered around current milestone (exact replica)
   */
  renderDockSteps() {
    if (!this.dockStepsContainer || !this.milestones || this.milestones.length === 0) return;

    let startIdx = Math.max(0, this.currentMilestoneIndex - 1);
    if (startIdx + 5 > this.milestones.length) {
      startIdx = Math.max(0, this.milestones.length - 5);
    }
    const endIdx = Math.min(this.milestones.length, startIdx + 5);

    let html = "";
    for (let idx = startIdx; idx < endIdx; idx++) {
      const ev = this.milestones[idx];
      const numStr = String(idx + 1).padStart(2, "0");
      const label = this.shortLabels[idx] || ev.title;
      const isActive = idx === this.currentMilestoneIndex;

      html += `
        <div class="dock-step-item ${isActive ? "active-step" : ""}" 
             data-index="${idx}" 
             data-event-id="${ev.id}"
             title="${numStr} · ${ev.title} (${ev.year})">
          ${numStr} &middot; ${label}
        </div>
      `;
    }

    this.dockStepsContainer.innerHTML = html;
  }

  /**
   * Activate specific milestone by index
   */
  activateMilestoneByIndex(index, userInitiated = true) {
    if (index < 0 || index >= this.milestones.length) return;
    this.currentMilestoneIndex = index;
    const ev = this.milestones[index];
    const era = this.eras.find(e => e.id === ev.era) || this.eras[0];

    // 1. Re-render the 5-item dock window
    this.renderDockSteps();

    // 2. Update vertical line progress fill
    if (this.progressFill) {
      const activeItem = this.dockStepsContainer.querySelector(`.dock-step-item[data-index="${index}"]`);
      if (activeItem) {
        const allItems = Array.from(this.dockStepsContainer.querySelectorAll(".dock-step-item"));
        const posInDock = allItems.indexOf(activeItem);
        const fillPercent = 8 + (posInDock / Math.max(1, allItems.length - 1)) * 82;
        this.progressFill.style.height = `${fillPercent}%`;
      } else {
        const fillPercent = (index / (this.milestones.length - 1)) * 100;
        this.progressFill.style.height = `${Math.min(100, Math.max(8, fillPercent))}%`;
      }
    }

    // 3. Update top eyebrow & title (uniform height, single line)
    if (this.eyebrowEl) {
      const chapterNum = String(era.id).padStart(2, "0");
      this.eyebrowEl.innerHTML = `INDIA'S COLONIAL PAST &bull; CHAPTER ${chapterNum}: ${era.shortTitle.toUpperCase()} (${era.period})`;
    }

    if (this.titleEl) {
      this.titleEl.style.opacity = "0";
      setTimeout(() => {
        const numStr = String(index + 1).padStart(2, "0");
        const fullTitle = `${numStr} · ${ev.title} (${ev.year})`;
        this.titleEl.textContent = fullTitle;
        if (fullTitle.length > 52) {
          this.titleEl.style.fontSize = "clamp(18px, 1.9vw, 26px)";
        } else if (fullTitle.length > 40) {
          this.titleEl.style.fontSize = "clamp(20px, 2.2vw, 30px)";
        } else {
          this.titleEl.style.fontSize = "";
        }
        this.titleEl.style.opacity = "1";
      }, 150);
    }

    // 4. Update HUD tags on map card
    if (this.badgeTag) {
      const categoryIcons = {
        battle: "⚔️", treaty: "📜", famine: "🌾", rebellion: "🔥",
        discovery: "🚢", movement: "🇮🇳", decree: "🏛️", liberation: "🕊️"
      };
      const cat = ev.category || "milestone";
      const icon = categoryIcons[cat] || "📌";
      this.badgeTag.textContent = `${cat.toUpperCase()} ${icon}`;
    }

    if (this.periodTag) {
      this.periodTag.textContent = `${ev.date} · ${ev.locationName.split(",")[0]}`;
    }

    // 5. Update Editorial Reading Block below the map
    this.updateEditorialContent(ev, era, index);

    // 6. Update Leaflet Map Camera, Beacons & Overlays
    if (this.mapController) {
      this.mapController.focusEvent(ev.id);
    }

    // 7. Reset center column scroll position to top
    const centerCol = document.querySelector(".replica-center-column");
    if (centerCol && userInitiated) {
      centerCol.scrollTo({ top: 0, behavior: "smooth" });
    }

    // 8. Update timer display
    if (this.isAutoPlaying) {
      this.tourElapsedSec = 0;
      this.scheduleNextSlide();
    } else {
      this.updateTimerDisplay();
    }
  }

  activateMilestoneById(id) {
    const idx = this.milestones.findIndex(e => e.id === id);
    if (idx !== -1) {
      this.activateMilestoneByIndex(idx, true);
    }
  }

  /**
   * Update the editorial narrative text below the media card
   */
  updateEditorialContent(ev, era, index) {
    if (!this.paragraphEl) return;

    let narrative = ev.narrative || "";

    // Editorial italicization of prominent historical terms
    const italicTerms = [
      "Vasco da Gama", "Calicut", "Zamorin", "Francisco de Almeida", "Afonso de Albuquerque",
      "East India Company", "Jahangir", "Fort St. George", "Fort William", "Farrukhsiyar",
      "Colachel", "Marthanda Varma", "Dupleix", "Robert Clive", "Mir Jafar", "Siraj-ud-Daulah",
      "Plassey", "Wandiwash", "Buxar", "Treaty of Allahabad", "Diwani", "Hyder Ali", "Tipu Sultan",
      "Seringapatam", "Maratha", "Nana Fadnavis", "Treaty of Salbai", "Assaye", "Wellesley",
      "Rani Chennamma", "Kittur", "Sindh", "Dalhousie", "Doctrine of Lapse", "Mangal Pandey",
      "Barrackpore", "Meerut", "Bahadur Shah Zafar", "Nana Saheb", "Tatya Tope", "Jhansi",
      "Lakshmibai", "Begum Hazrat Mahal", "Queen Victoria", "Nil Darpan", "Dadabhai Naoroji",
      "Drain of Wealth", "Curzon", "Swadeshi", "Tilak", "Lal-Bal-Pal", "Jallianwala Bagh",
      "General Dyer", "Non-Cooperation", "Chauri Chaura", "Bhagat Singh", "Rajguru", "Sukhdev",
      "Kakori", "Saunders", "Lala Lajpat Rai", "Purna Swaraj", "Dandi", "Salt Satyagraha",
      "Surya Sen", "Pritilata Waddedar", "Poona Pact", "B.R. Ambedkar", "Mahatma Gandhi",
      "Quit India", "Subhas Chandra Bose", "Netaji", "Azad Hind Fauj", "INA", "Red Fort",
      "Mountbatten", "Radcliffe", "Tryst with Destiny", "Sardar Patel", "Pondicherry", "Operation Vijay", "Goa"
    ];

    italicTerms.forEach(term => {
      const reg = new RegExp(`\\b(${term})\\b`, "g");
      narrative = narrative.replace(reg, "<em>$1</em>");
    });

    this.paragraphEl.style.opacity = "0";
    setTimeout(() => {
      this.paragraphEl.innerHTML = narrative;
      this.paragraphEl.style.opacity = "1";
    }, 150);

    // Citation line
    if (this.citationEl) {
      const numStr = String(index + 1).padStart(2, "0");
      this.citationEl.innerHTML = `${numStr} &bull; ${ev.title} &bull; ${ev.locationName} (${ev.year})`;
    }

    // Historical Quote
    if (this.quoteBody) {
      const quoteText = ev.quote ? ev.quote.split("—")[0].trim().replace(/^"|"$/g, "") : "History written in struggle and resilience.";
      const quoteCite = ev.quote && ev.quote.includes("—") ? "— " + ev.quote.split("—")[1].trim() : "— Historical Chronicle";
      this.quoteBody.textContent = `"${quoteText}"`;
      if (this.quoteAuthor) this.quoteAuthor.textContent = quoteCite;
    }

    // Quick Dossier Jump Pill
    if (this.dossierJumpContainer) {
      let jumpHtml = "";
      const cat = ev.category || "";
      if (cat === "battle" || ev.title.toLowerCase().includes("war") || ev.title.toLowerCase().includes("battle") || ev.title.toLowerCase().includes("siege")) {
        jumpHtml = `<button class="dossier-pill-jump" onclick="window.app.openWarsModal()"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><line x1="14.5" y1="17.5" x2="3" y2="6"/><line x1="9.5" y1="6.5" x2="21" y2="18"/><path d="m19 3 2 2-2 2-2-2zM3 19l2 2 2-2-2-2z"/></svg> <span>Open Wars &amp; Battles Dossier</span></button>`;
      } else if (cat === "treaty" || ev.title.toLowerCase().includes("treaty") || ev.title.toLowerCase().includes("charter") || ev.title.toLowerCase().includes("farman") || ev.title.toLowerCase().includes("proclamation")) {
        jumpHtml = `<button class="dossier-pill-jump" onclick="window.app.openTreatiesModal()"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10l6 6v8a2 2 0 0 1-2 2z"/></svg> <span>Open Treaties Archive</span></button>`;
      } else if (cat === "famine" || ev.title.toLowerCase().includes("famine")) {
        jumpHtml = `<button class="dossier-pill-jump" onclick="window.app.openFaminesModal()"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M8 5a4 4 0 0 1 8 0M8 11a4 4 0 0 1 8 0M8 17a4 4 0 0 1 8 0"/></svg> <span>Open Famines Register</span></button>`;
      } else if (ev.title.toLowerCase().includes("drain")) {
        jumpHtml = `<button class="dossier-pill-jump" onclick="window.app.openDrainModal()"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/></svg> <span>Open $45T Economic Drain</span></button>`;
      }
      this.dossierJumpContainer.innerHTML = jumpHtml;
    }

    // Key Figures Chips
    if (this.figuresGrid) {
      if (ev.keyFigures && ev.keyFigures.length > 0) {
        this.figuresGrid.innerHTML = ev.keyFigures.map(fig => `
          <button class="site-chip-btn" data-figure-name="${fig}">
            <span class="site-chip-dot"></span>
            <span>${fig}</span>
          </button>
        `).join("");
      } else {
        this.figuresGrid.innerHTML = `<span style="font-size:12px; color:var(--text-muted);">Historical actors recorded in narrative.</span>`;
      }
    }

    // Geopolitical Consequences / Impact Stats
    if (this.impactsList) {
      if (ev.impactStats && ev.impactStats.length > 0) {
        this.impactsList.innerHTML = ev.impactStats.map(stat => `
          <li>${stat}</li>
        `).join("");
      } else {
        this.impactsList.innerHTML = `<li>Primary geopolitical inflection point of European colonial dominance.</li>`;
      }
    }
  }

  nextMilestone() {
    if (this.currentMilestoneIndex < this.milestones.length - 1) {
      this.activateMilestoneByIndex(this.currentMilestoneIndex + 1, true);
    } else {
      this.activateMilestoneByIndex(0, true);
    }
  }

  prevMilestone() {
    if (this.currentMilestoneIndex > 0) {
      this.activateMilestoneByIndex(this.currentMilestoneIndex - 1, true);
    } else {
      this.activateMilestoneByIndex(this.milestones.length - 1, true);
    }
  }

  toggleAutoTour() {
    if (this.isAutoPlaying) {
      this.stopAutoTour();
    } else {
      this.startAutoTour();
    }
  }

  startAutoTour() {
    this.isAutoPlaying = true;
    if (this.playIcon) this.playIcon.classList.add("hidden");
    if (this.pauseIcon) this.pauseIcon.classList.remove("hidden");

    this.tourElapsedSec = 0;
    this.startTimerTicks();
    this.scheduleNextSlide();

    if (window.ambientAudio && !window.ambientAudio.isPlaying) {
      window.ambientAudio.start();
      const audioBtn = document.getElementById("btn-audio-toggle");
      if (audioBtn) audioBtn.classList.add("audio-active");
    }
  }

  stopAutoTour() {
    this.isAutoPlaying = false;
    if (this.playIcon) this.playIcon.classList.remove("hidden");
    if (this.pauseIcon) this.pauseIcon.classList.add("hidden");

    if (this.autoPlayTimer) {
      clearTimeout(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
    if (this.timerTickInterval) {
      clearInterval(this.timerTickInterval);
      this.timerTickInterval = null;
    }
    this.updateTimerDisplay();
  }

  scheduleNextSlide() {
    if (this.autoPlayTimer) clearTimeout(this.autoPlayTimer);
    this.autoPlayTimer = setTimeout(() => {
      if (!this.isAutoPlaying) return;
      this.nextMilestone();
    }, this.autoPlayIntervalMs);
  }

  startTimerTicks() {
    if (this.timerTickInterval) clearInterval(this.timerTickInterval);
    this.timerTickInterval = setInterval(() => {
      if (!this.isAutoPlaying) return;
      this.tourElapsedSec++;
      this.updateTimerDisplay();
    }, 1000);
  }

  updateTimerDisplay() {
    if (!this.timerDisplay) return;
    if (this.isAutoPlaying) {
      const min = Math.floor(this.tourElapsedSec / 60);
      const sec = String(this.tourElapsedSec % 60).padStart(2, "0");
      this.timerDisplay.textContent = `${min}:${sec} / 0:45`;
    } else {
      const cur = String(this.currentMilestoneIndex + 1).padStart(2, "0");
      this.timerDisplay.textContent = `${cur} / 63`;
    }
  }

  setupKeyboardShortcuts() {
    window.addEventListener("keydown", (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        this.nextMilestone();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        this.prevMilestone();
      } else if (e.key === " ") {
        e.preventDefault();
        this.toggleAutoTour();
      }
    });
  }

  setupWheelListener() {
    const stage = document.querySelector(".replica-media-card");
    if (!stage) return;

    let wheelDebounce = false;
    stage.addEventListener("wheel", (e) => {
      e.preventDefault();
      if (wheelDebounce) return;
      wheelDebounce = true;
      setTimeout(() => { wheelDebounce = false; }, 350);

      if (e.deltaY > 20) {
        this.nextMilestone();
      } else if (e.deltaY < -20) {
        this.prevMilestone();
      }
    }, { passive: false });
  }
}

if (typeof window !== "undefined") {
  window.ScrollytellingEngine = ScrollytellingEngine;
}
