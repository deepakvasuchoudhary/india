/**
 * CHRONICA IMPERII INDICI (1498 – 1961)
 * Cinematic Presentation & Slide Engine
 * Coordinates panoramic slide transitions, bottom timeline scrub rail,
 * map camera flyTos, audio chimes, and automated presentation tour.
 */

class PresentationEngine {
  constructor(mapController) {
    this.mapController = mapController;
    this.currentSlideIndex = 0; // Starts at Milestone 1: Vasco da Gama (1498)
    this.milestones = window.TIMELINE_EVENTS || [];
    this.eras = window.HISTORICAL_ERAS || [];

    this.isTourPlaying = false;
    this.tourTimer = null;
    this.tourIntervalMs = 12000; // 12s per slide in presentation mode
    this.elapsedSeconds = 0;
    this.timerInterval = null;

    // DOM Elements - Header
    this.headerChapTitle = document.getElementById("header-chapter-title");
    this.chapterDropdown = document.getElementById("chapter-dropdown-menu");

    // DOM Elements - Left Slide Story Card
    this.catBadge = document.getElementById("slide-cat-badge");
    this.chapTag = document.getElementById("slide-chapter-tag");
    this.slideNumBadge = document.getElementById("slide-number-badge");
    this.titleText = document.getElementById("slide-title-text");
    this.dateLocation = document.getElementById("slide-date-location");
    this.narrativeText = document.getElementById("slide-narrative-text");
    this.quoteBody = document.getElementById("slide-quote-text");
    this.quoteCite = document.getElementById("slide-quote-cite");
    this.dossierJump = document.getElementById("slide-dossier-jump");
    this.figuresChips = document.getElementById("slide-figures-chips");
    this.impactsList = document.getElementById("slide-impacts-list");
    this.storyScroll = document.querySelector(".story-scroll-area");

    // DOM Elements - Right Map Card
    this.hudCoords = document.getElementById("hud-coords-badge");
    this.hudLegend = document.getElementById("hud-era-overlay-name");

    // DOM Elements - Bottom Scrubber
    this.tourBtn = document.getElementById("btn-dock-tour");
    this.iconPlay = document.getElementById("icon-tour-play");
    this.iconPause = document.getElementById("icon-tour-pause");
    this.slideTracker = document.getElementById("scrub-slide-tracker");
    this.timerCounter = document.getElementById("scrub-timer-counter");
    this.progressFill = document.getElementById("scrub-progress-fill");
    this.pipsContainer = document.getElementById("scrub-pips-container");
    this.chapterTabs = document.getElementById("chapter-ribbon-tabs");
  }

  init() {
    this.renderChapterDropdown();
    this.renderChapterRibbon();
    this.renderTimelinePips();
    this.setupKeyboardShortcuts();

    // Activate initial slide
    this.activateSlideByIndex(this.currentSlideIndex, false);
  }

  /**
   * Render the 63 interactive clickable pips on the bottom timeline track
   */
  renderTimelinePips() {
    if (!this.pipsContainer || !this.milestones) return;

    this.pipsContainer.innerHTML = this.milestones.map((m, idx) => `
      <div class="scrub-pip ${idx === this.currentSlideIndex ? "active-pip" : ""}" 
           data-index="${idx}" 
           title="${String(idx + 1).padStart(2, "0")} · ${m.title} (${m.year})">
      </div>
    `).join("");

    this.pipsContainer.addEventListener("click", (e) => {
      const pip = e.target.closest(".scrub-pip");
      if (pip) {
        const idx = parseInt(pip.dataset.index, 10);
        this.activateSlideByIndex(idx, true);
      }
    });

    // Also support clicking directly on the scrub rail
    const scrubRail = document.getElementById("scrub-track-rail");
    if (scrubRail) {
      scrubRail.addEventListener("click", (e) => {
        if (e.target.classList.contains("scrub-pip")) return;
        const rect = scrubRail.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const pct = Math.max(0, Math.min(1, clickX / rect.width));
        const targetIdx = Math.round(pct * (this.milestones.length - 1));
        this.activateSlideByIndex(targetIdx, true);
      });
    }
  }

  /**
   * Render the 8 Chapter Tabs along the top of the scrubber
   */
  renderChapterRibbon() {
    if (!this.chapterTabs || !this.eras) return;

    this.chapterTabs.innerHTML = this.eras.map(era => `
      <button class="chapter-tab-pill ${era.id === 1 ? "active-tab" : ""}" 
              data-chapter-id="${era.id}" 
              title="${era.name} (${era.period})">
        CH ${era.id}: ${era.shortTitle}
      </button>
    `).join("");

    this.chapterTabs.addEventListener("click", (e) => {
      const tab = e.target.closest(".chapter-tab-pill");
      if (tab) {
        const chapId = parseInt(tab.dataset.chapterId, 10);
        this.jumpToChapter(chapId);
      }
    });
  }

  /**
   * Render the top header chapter dropdown menu
   */
  renderChapterDropdown() {
    if (!this.chapterDropdown || !this.eras) return;

    this.chapterDropdown.innerHTML = this.eras.map(era => `
      <div class="chapter-menu-item ${era.id === 1 ? "active-chapter" : ""}" data-chapter-id="${era.id}">
        <div>
          <strong class="chap-name">Chapter ${era.id}: ${era.name}</strong>
          <div style="font-size:11px; color:var(--text-muted);">${era.tagline}</div>
        </div>
        <span class="chap-period">${era.period}</span>
      </div>
    `).join("");

    this.chapterDropdown.addEventListener("click", (e) => {
      const item = e.target.closest(".chapter-menu-item");
      if (item) {
        const chapId = parseInt(item.dataset.chapterId, 10);
        this.jumpToChapter(chapId);
        this.chapterDropdown.classList.remove("active");
      }
    });

    const selectorBtn = document.getElementById("chapter-selector-btn");
    if (selectorBtn) {
      selectorBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.chapterDropdown.classList.toggle("active");
      });
    }

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".header-center")) {
        this.chapterDropdown.classList.remove("active");
      }
    });
  }

  jumpToChapter(chapId) {
    const firstEventIdx = this.milestones.findIndex(m => m.era === chapId);
    if (firstEventIdx !== -1) {
      this.activateSlideByIndex(firstEventIdx, true);
    }
  }

  /**
   * Activate specific milestone slide
   */
  activateSlideByIndex(index, userInitiated = true) {
    if (index < 0 || index >= this.milestones.length) return;
    this.currentSlideIndex = index;
    const ev = this.milestones[index];
    const era = this.eras.find(e => e.id === ev.era) || this.eras[0];

    // 1. Header Chapter updates
    if (this.headerChapTitle) {
      this.headerChapTitle.textContent = `Chapter 0${era.id}: ${era.shortTitle} (${era.period.split("–")[0].trim()})`;
    }

    // Update active state in chapter dropdown
    if (this.chapterDropdown) {
      this.chapterDropdown.querySelectorAll(".chapter-menu-item").forEach(item => {
        const cId = parseInt(item.dataset.chapterId, 10);
        item.classList.toggle("active-chapter", cId === era.id);
      });
    }

    // 2. Left Slide Story Card Updates
    const catIcons = {
      battle: "⚔️", treaty: "📜", famine: "🌾", rebellion: "🔥",
      discovery: "🚢", movement: "🇮🇳", decree: "🏛️", liberation: "🕊️"
    };
    const cat = ev.category || "event";
    const icon = catIcons[cat] || "📌";

    if (this.catBadge) {
      this.catBadge.innerHTML = `<span>${icon}</span> ${cat.toUpperCase()}`;
    }

    if (this.chapTag) {
      this.chapTag.textContent = `CHAPTER 0${era.id} • ${era.period}`;
    }

    if (this.slideNumBadge) {
      this.slideNumBadge.textContent = `SLIDE ${String(index + 1).padStart(2, "0")} / 63`;
    }

    if (this.titleText) {
      this.titleText.style.opacity = "0";
      setTimeout(() => {
        this.titleText.textContent = ev.title;
        this.titleText.style.opacity = "1";
      }, 120);
    }

    if (this.dateLocation) {
      this.dateLocation.innerHTML = `
        <span>📅 ${ev.date}</span>
        <span>•</span>
        <span>📍 ${ev.locationName}</span>
      `;
    }

    // Format Narrative text with subtle editorial highlights
    if (this.narrativeText) {
      let narrative = ev.narrative || "";
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

      this.narrativeText.style.opacity = "0";
      setTimeout(() => {
        this.narrativeText.innerHTML = narrative;
        this.narrativeText.style.opacity = "1";
      }, 120);
    }

    // Quote Box
    if (this.quoteBody) {
      const qText = ev.quote ? ev.quote.split("—")[0].trim().replace(/^"|"$/g, "") : "History written in the struggle for sovereign dignity.";
      const qCite = ev.quote && ev.quote.includes("—") ? "— " + ev.quote.split("—")[1].trim() : "— Historical Record";
      this.quoteBody.textContent = `"${qText}"`;
      if (this.quoteCite) this.quoteCite.textContent = qCite;
    }

    // Inline Dossier Jump Pill
    if (this.dossierJump) {
      let jumpHtml = "";
      const lowerTitle = ev.title.toLowerCase();
      if (cat === "battle" || lowerTitle.includes("battle") || lowerTitle.includes("war") || lowerTitle.includes("siege")) {
        jumpHtml = `<button class="dossier-jump-btn" onclick="window.app.openWarsModal()"><span>⚔️</span> <span>Explore Wars &amp; Battles Dossier</span></button>`;
      } else if (cat === "treaty" || lowerTitle.includes("treaty") || lowerTitle.includes("charter") || lowerTitle.includes("farman") || lowerTitle.includes("proclamation")) {
        jumpHtml = `<button class="dossier-jump-btn" onclick="window.app.openTreatiesModal()"><span>📜</span> <span>View Historic Treaties Archive</span></button>`;
      } else if (cat === "famine" || lowerTitle.includes("famine")) {
        jumpHtml = `<button class="dossier-jump-btn" onclick="window.app.openFaminesModal()"><span>🌾</span> <span>Examine Famines Register</span></button>`;
      } else if (lowerTitle.includes("drain")) {
        jumpHtml = `<button class="dossier-jump-btn" onclick="window.app.openDrainModal()"><span>💰</span> <span>Analyze $45T Economic Drain</span></button>`;
      }
      this.dossierJump.innerHTML = jumpHtml;
    }

    // Figures Chips
    if (this.figuresChips) {
      if (ev.keyFigures && ev.keyFigures.length > 0) {
        this.figuresChips.innerHTML = ev.keyFigures.map(fig => `
          <button class="persona-avatar-chip" data-name="${fig}">
            <span class="persona-chip-dot"></span>
            <span>${fig}</span>
          </button>
        `).join("");
      } else {
        this.figuresChips.innerHTML = `<span style="font-size:12px; color:var(--text-muted);">Historical actors chronicled in narrative.</span>`;
      }
    }

    // Repercussions / Consequences
    if (this.impactsList) {
      if (ev.impactStats && ev.impactStats.length > 0) {
        this.impactsList.innerHTML = ev.impactStats.map(s => `<li>${s}</li>`).join("");
      } else {
        this.impactsList.innerHTML = `<li>Major historical inflection point in India's sovereign struggle.</li>`;
      }
    }

    // Reset story scroll to top
    if (this.storyScroll && userInitiated) {
      this.storyScroll.scrollTo({ top: 0, behavior: "smooth" });
    }

    // 3. Map Viewport Updates
    if (this.mapController) {
      this.mapController.focusEvent(ev.id);
    }

    if (this.hudCoords) {
      const lat = ev.coordinates[0].toFixed(3);
      const lng = ev.coordinates[1].toFixed(3);
      this.hudCoords.textContent = `${lat}° N, ${lng}° E • ${ev.locationName.split(",")[0]}`;
    }

    if (this.hudLegend) {
      const yearNum = parseInt(ev.year, 10);
      let presetStr = "1700 Mughal Zenith";
      if (yearNum >= 1740 && yearNum < 1780) presetStr = "1765 EIC Diwani Rights";
      else if (yearNum >= 1780 && yearNum < 1830) presetStr = "1805 Wellesley Expansions";
      else if (yearNum >= 1830 && yearNum < 1920) presetStr = "1857 Eve of Revolt";
      else if (yearNum >= 1920 && yearNum < 1955) presetStr = "1947 Partition Boundaries";
      else if (yearNum >= 1955) presetStr = "1961 Liberated Goa";
      this.hudLegend.textContent = `Territory Layer: ${presetStr}`;
    }

    // 4. Bottom Scrubber Updates
    if (this.slideTracker) {
      const cur = String(index + 1).padStart(2, "0");
      this.slideTracker.textContent = `${cur} / 63`;
    }

    if (this.progressFill) {
      const pct = (index / (this.milestones.length - 1)) * 100;
      this.progressFill.style.width = `${pct}%`;
    }

    // Update active pip
    if (this.pipsContainer) {
      this.pipsContainer.querySelectorAll(".scrub-pip").forEach((pip, pIdx) => {
        pip.classList.toggle("active-pip", pIdx === index);
      });
    }

    // Update active chapter tab pill
    if (this.chapterTabs) {
      this.chapterTabs.querySelectorAll(".chapter-tab-pill").forEach(tab => {
        const tId = parseInt(tab.dataset.chapterId, 10);
        tab.classList.toggle("active-tab", tId === era.id);
      });
    }

    // 5. Auto Tour timing
    if (this.isTourPlaying) {
      this.elapsedSeconds = 0;
      this.scheduleNextTourSlide();
    } else {
      this.updateTimerText();
    }
  }

  nextSlide() {
    if (this.currentSlideIndex < this.milestones.length - 1) {
      this.activateSlideByIndex(this.currentSlideIndex + 1, true);
    } else {
      this.activateSlideByIndex(0, true);
    }
  }

  prevSlide() {
    if (this.currentSlideIndex > 0) {
      this.activateSlideByIndex(this.currentSlideIndex - 1, true);
    } else {
      this.activateSlideByIndex(this.milestones.length - 1, true);
    }
  }

  toggleAutoTour() {
    if (this.isTourPlaying) {
      this.stopAutoTour();
    } else {
      this.startAutoTour();
    }
  }

  startAutoTour() {
    this.isTourPlaying = true;
    if (this.iconPlay) this.iconPlay.classList.add("hidden");
    if (this.iconPause) this.iconPause.classList.remove("hidden");

    this.elapsedSeconds = 0;
    this.startTimerTicks();
    this.scheduleNextTourSlide();

    // Start background tanpura drone if available
    if (window.ambientAudio && !window.ambientAudio.isPlaying) {
      window.ambientAudio.start();
      const audioBtn = document.getElementById("btn-audio-toggle");
      if (audioBtn) audioBtn.classList.add("audio-playing");
    }
  }

  stopAutoTour() {
    this.isTourPlaying = false;
    if (this.iconPlay) this.iconPlay.classList.remove("hidden");
    if (this.iconPause) this.iconPause.classList.add("hidden");

    if (this.tourTimer) {
      clearTimeout(this.tourTimer);
      this.tourTimer = null;
    }
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    this.updateTimerText();
  }

  scheduleNextTourSlide() {
    if (this.tourTimer) clearTimeout(this.tourTimer);
    this.tourTimer = setTimeout(() => {
      if (!this.isTourPlaying) return;
      this.nextSlide();
    }, this.tourIntervalMs);
  }

  startTimerTicks() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      if (!this.isTourPlaying) return;
      this.elapsedSeconds++;
      this.updateTimerText();
    }, 1000);
  }

  updateTimerText() {
    if (!this.timerCounter) return;
    if (this.isTourPlaying) {
      const min = Math.floor(this.elapsedSeconds / 60);
      const sec = String(this.elapsedSeconds % 60).padStart(2, "0");
      this.timerCounter.textContent = `${min}:${sec} / 0:45`;
    } else {
      this.timerCounter.textContent = "Presentation Tour";
    }
  }

  setupKeyboardShortcuts() {
    window.addEventListener("keydown", (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        this.nextSlide();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        this.prevSlide();
      } else if (e.key === " ") {
        e.preventDefault();
        this.toggleAutoTour();
      }
    });
  }
}

if (typeof window !== "undefined") {
  window.PresentationEngine = PresentationEngine;
}
