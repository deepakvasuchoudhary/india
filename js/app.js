/**
 * CHRONICA IMPERII INDICI (1498 – 1961)
 * Application Orchestrator & Dossier Controller
 * Coordinates audio synthesis, map layers, slide engine, global search,
 * theme switching, and interactive research modals.
 */

class Application {
  constructor() {
    this.audioEngine = null;
    this.mapController = null;
    this.engine = null;
    this.currentTheme = "light";
    this.currentWarFilter = "all";
    this.currentPersonaFilter = "all";
  }

  init() {
    // 0. Audio Engine
    if (window.ambientAudio) {
      this.audioEngine = window.ambientAudio;
    }

    // 1. Map Controller
    if (window.HistoricalMapController) {
      this.mapController = new HistoricalMapController("map");
      this.mapController.init();
      window.mapController = this.mapController;
    }

    // 2. Presentation Slide Engine
    if (window.PresentationEngine) {
      this.engine = new PresentationEngine(this.mapController);
      this.engine.init();
      window.presentationEngine = this.engine;
      window.scroller = this.engine;
    }

    // 3. Setup UI Controls
    this.setupEventListeners();
    this.setupSearch();
    this.setupThemeToggle();

    // 4. Pre-render Modal Dossiers
    this.renderWarsModal();
    this.renderTreatiesModal();
    this.renderFaminesModal();
    this.renderPersonaeModal();
    this.renderDrainModal();
  }

  setupEventListeners() {
    // Scrubber Play/Pause Button
    const tourBtn = document.getElementById("btn-dock-tour");
    if (tourBtn && this.engine) {
      tourBtn.addEventListener("click", () => {
        this.engine.toggleAutoTour();
      });
    }

    // Prev / Next Step Buttons on Scrubber
    const scrubPrev = document.getElementById("btn-scrub-prev");
    if (scrubPrev && this.engine) {
      scrubPrev.addEventListener("click", () => this.engine.prevSlide());
    }

    const scrubNext = document.getElementById("btn-scrub-next");
    if (scrubNext && this.engine) {
      scrubNext.addEventListener("click", () => this.engine.nextSlide());
    }

    // Map Paging Chevrons
    const stagePrev = document.getElementById("btn-stage-prev");
    if (stagePrev && this.engine) {
      stagePrev.addEventListener("click", () => this.engine.prevSlide());
    }

    const stageNext = document.getElementById("btn-stage-next");
    if (stageNext && this.engine) {
      stageNext.addEventListener("click", () => this.engine.nextSlide());
    }

    // Map HUD Controls
    const btnBoundaries = document.getElementById("btn-toggle-boundaries");
    if (btnBoundaries && this.mapController) {
      btnBoundaries.addEventListener("click", () => {
        const active = this.mapController.toggleBoundaries();
        btnBoundaries.classList.toggle("active", active);
      });
    }

    const btnRoutes = document.getElementById("btn-toggle-routes");
    if (btnRoutes && this.mapController) {
      btnRoutes.addEventListener("click", () => {
        const active = this.mapController.toggleRoutes();
        btnRoutes.classList.toggle("active", active);
      });
    }

    const btnSites = document.getElementById("btn-toggle-sites");
    if (btnSites && this.mapController) {
      btnSites.addEventListener("click", () => {
        const active = this.mapController.toggleSites();
        btnSites.classList.toggle("active", active);
      });
    }

    const btnMapTheme = document.getElementById("btn-toggle-map-theme");
    if (btnMapTheme && this.mapController) {
      const themes = ["voyager", "dark", "light"];
      let themeIndex = 0;
      btnMapTheme.addEventListener("click", () => {
        themeIndex = (themeIndex + 1) % themes.length;
        const newTheme = themes[themeIndex];
        this.mapController.setTheme(newTheme);
        btnMapTheme.textContent = newTheme.charAt(0).toUpperCase() + newTheme.slice(1);
      });
    }

    // Figures Chips Clicks inside Story Card
    const figuresWrap = document.getElementById("slide-figures-chips");
    if (figuresWrap) {
      figuresWrap.addEventListener("click", (e) => {
        const chip = e.target.closest(".persona-avatar-chip");
        if (chip) {
          const name = chip.dataset.name;
          this.openPersonaeModal(name);
        }
      });
    }

    // Audio Tanpura Toggle
    const audioBtn = document.getElementById("btn-audio-toggle");
    if (audioBtn && this.audioEngine) {
      audioBtn.addEventListener("click", () => {
        if (this.audioEngine.isPlaying) {
          this.audioEngine.stop();
          audioBtn.classList.remove("audio-playing");
        } else {
          this.audioEngine.start();
          audioBtn.classList.add("audio-playing");
        }
      });
    }

    // Dossiers Hub Dropdown Toggle
    const hubBtn = document.getElementById("btn-dossiers-hub");
    const hubDropdown = document.getElementById("dossiers-menu-dropdown");
    if (hubBtn && hubDropdown) {
      hubBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        hubDropdown.classList.toggle("active");
      });
      document.addEventListener("click", (e) => {
        if (!e.target.closest(".dossiers-dropdown-wrapper")) {
          hubDropdown.classList.remove("active");
        }
      });
    }

    // Modal Opening Buttons
    const bindModalBtn = (btnId, modalId) => {
      const btn = document.getElementById(btnId);
      const modal = document.getElementById(modalId);
      if (btn && modal) {
        btn.addEventListener("click", () => this.openModal(modalId));
      }
    };

    bindModalBtn("btn-open-wars-modal", "wars-modal");
    bindModalBtn("btn-open-treaties-modal", "treaties-modal");
    bindModalBtn("btn-open-famines-modal", "famines-modal");
    bindModalBtn("btn-open-personae-modal", "personae-modal");
    bindModalBtn("btn-open-drain-modal", "drain-modal");

    // Modal Closing
    document.querySelectorAll(".modal-backdrop").forEach(modal => {
      const closeBtn = modal.querySelector(".modal-close-btn");
      if (closeBtn) {
        closeBtn.addEventListener("click", () => modal.classList.remove("open"));
      }
      modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.classList.remove("open");
      });
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        document.querySelectorAll(".modal-backdrop.open").forEach(m => m.classList.remove("open"));
      }
    });
  }

  setupThemeToggle() {
    const btn = document.getElementById("theme-toggle-btn");
    if (!btn) return;

    btn.addEventListener("click", () => {
      this.currentTheme = this.currentTheme === "light" ? "dark" : "light";
      document.body.setAttribute("data-theme", this.currentTheme);

      // Sync map theme
      if (this.mapController) {
        const targetMapTheme = this.currentTheme === "dark" ? "dark" : "voyager";
        this.mapController.setTheme(targetMapTheme);
        const mapThemeBtn = document.getElementById("btn-toggle-map-theme");
        if (mapThemeBtn) {
          mapThemeBtn.textContent = targetMapTheme.charAt(0).toUpperCase() + targetMapTheme.slice(1);
        }
      }

      btn.innerHTML = this.currentTheme === "dark" 
        ? `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`
        : `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
    });
  }

  openModal(modalId) {
    const hubDropdown = document.getElementById("dossiers-menu-dropdown");
    if (hubDropdown) hubDropdown.classList.remove("active");
    const modal = document.getElementById(modalId);
    if (modal) {
      document.querySelectorAll(".modal-backdrop.open").forEach(m => m.classList.remove("open"));
      modal.classList.add("open");
    }
  }

  openWarsModal() { this.openModal("wars-modal"); }
  openTreatiesModal() { this.openModal("treaties-modal"); }
  openFaminesModal() { this.openModal("famines-modal"); }
  openPersonaeModal(searchQuery = "") {
    this.openModal("personae-modal");
    if (searchQuery) {
      const input = document.getElementById("persona-modal-search");
      if (input) {
        input.value = searchQuery;
        this.renderPersonaeModal("all", searchQuery);
      }
    }
  }
  openDrainModal() { this.openModal("drain-modal"); }

  /**
   * 1. Render Wars Modal
   */
  renderWarsModal(filter = "all", query = "") {
    const container = document.getElementById("wars-cards-grid");
    if (!container || !window.MAJOR_WARS) return;

    this.currentWarFilter = filter;
    const q = query.toLowerCase();

    const filtered = window.MAJOR_WARS.filter(w => {
      const warName = w.name || "";
      const theater = w.theater || "";
      const belligerents = Array.isArray(w.belligerents) ? w.belligerents.join(" ") : (w.belligerents || "");
      const keyBattles = Array.isArray(w.keyBattles) ? w.keyBattles.join(" ") : (w.keyBattles || "");
      const commanders = Array.isArray(w.commanders) ? w.commanders.join(" ") : (w.commanders || "");

      const matchCat = filter === "all" || warName.toLowerCase().includes(filter.toLowerCase()) || theater.toLowerCase().includes(filter.toLowerCase());
      const matchQuery = !q || warName.toLowerCase().includes(q) || theater.toLowerCase().includes(q) ||
        belligerents.toLowerCase().includes(q) || keyBattles.toLowerCase().includes(q) || commanders.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });

    container.innerHTML = filtered.map(w => {
      const belligerentsText = Array.isArray(w.belligerents) ? w.belligerents.join(" vs ") : (w.belligerents || "");
      const battlesText = Array.isArray(w.keyBattles) ? w.keyBattles.join(", ") : (w.keyBattles || "");
      const commandersText = Array.isArray(w.commanders) ? w.commanders.join(", ") : (w.commanders || "");

      return `
        <div class="dossier-card">
          <span class="card-badge" style="background:var(--color-accent-subtle); color:var(--color-accent); border:1px solid rgba(255,45,85,0.25);">⚔️ WAR &bull; ${w.theater || "India"}</span>
          <h4 class="card-title">${w.name}</h4>
          <div class="card-period"><strong>Belligerents:</strong> ${belligerentsText}</div>
          <div class="card-desc"><strong>Key Battles:</strong> ${battlesText}</div>
          <div class="card-desc"><strong>Commanders:</strong> ${commandersText}</div>
          ${w.significance ? `<div class="card-desc" style="font-style:italic; font-size:11.5px; opacity:0.9;">${w.significance}</div>` : ""}
          <div class="card-footer">
            <strong>Outcome:</strong> ${w.outcome || "Decisive imperial engagement"}
          </div>
        </div>
      `;
    }).join("");
  }

  /**
   * 2. Render Treaties Modal
   */
  renderTreatiesModal(query = "") {
    const container = document.getElementById("treaties-cards-grid");
    if (!container || !window.TREATIES_ARCHIVE) return;

    const q = query.toLowerCase();
    const filtered = window.TREATIES_ARCHIVE.filter(t => {
      const name = t.name || "";
      const sigs = t.signatories || "";
      const loc = t.location || "";
      const terms = t.keyTerms || "";
      return !q || name.toLowerCase().includes(q) || sigs.toLowerCase().includes(q) || loc.toLowerCase().includes(q) || terms.toLowerCase().includes(q);
    });

    container.innerHTML = filtered.map(t => `
      <div class="dossier-card">
        <span class="card-badge" style="background:var(--color-gold-subtle); color:var(--color-gold); border:1px solid rgba(245,158,11,0.25);">📜 TREATY &bull; ${t.date || ""}</span>
        <h4 class="card-title">${t.name}</h4>
        <div class="card-period"><strong>Signatories:</strong> ${t.signatories || ""}</div>
        <div class="card-period"><strong>Location:</strong> ${t.location || ""}</div>
        <div class="card-desc"><strong>Key Terms:</strong> ${t.keyTerms || ""}</div>
        <div class="card-footer">
          <strong>Imperial Impact:</strong> ${t.impact || ""}
        </div>
      </div>
    `).join("");
  }

  /**
   * 3. Render Famines Modal
   */
  renderFaminesModal(query = "") {
    const container = document.getElementById("famines-cards-grid");
    if (!container || !window.FAMINES_REGISTER) return;

    const q = query.toLowerCase();
    const filtered = window.FAMINES_REGISTER.filter(f => {
      const name = f.name || "";
      const years = f.years || "";
      const regions = f.regions || "";
      const policy = f.colonialPolicyCause || "";
      return !q || name.toLowerCase().includes(q) || years.includes(q) || regions.toLowerCase().includes(q) || policy.toLowerCase().includes(q);
    });

    container.innerHTML = filtered.map(f => `
      <div class="dossier-card">
        <span class="card-badge" style="background:rgba(239,68,68,0.15); color:#ef4444; border:1px solid rgba(239,68,68,0.25);">🌾 ${f.deathToll || "Devastating Loss of Life"}</span>
        <h4 class="card-title">${f.name} (${f.years})</h4>
        <div class="card-period"><strong>Affected Regions:</strong> ${f.regions || ""}</div>
        <div class="card-desc"><strong>Colonial Policy Cause:</strong> ${f.colonialPolicyCause || ""}</div>
        ${f.contemporaryQuote ? `<div class="card-desc" style="font-style:italic; font-size:11.5px; border-left:2px solid #ef4444; padding-left:8px; margin:4px 0;">"${f.contemporaryQuote}"</div>` : ""}
      </div>
    `).join("");
  }

  /**
   * 4. Render Personae Modal
   */
  renderPersonaeModal(filter = "all", query = "") {
    const container = document.getElementById("personae-cards-grid");
    if (!container || !window.DRAMATIS_PERSONAE) return;

    this.currentPersonaFilter = filter;
    const q = query.toLowerCase();

    const filtered = window.DRAMATIS_PERSONAE.filter(p => {
      const side = (p.side || "").toLowerCase();
      const matchCat = filter === "all" || 
        (filter === "royalty" && (side.includes("royalty") || side.includes("ruler"))) ||
        (filter === "freedom" && (side.includes("freedom") || side.includes("rebel") || side.includes("resistance"))) ||
        (filter === "british" && (side.includes("british") || side.includes("portuguese") || side.includes("colonial") || side.includes("viceroy")));

      const matchQuery = !q || (p.name || "").toLowerCase().includes(q) ||
        (p.role || "").toLowerCase().includes(q) ||
        (p.bio || "").toLowerCase().includes(q);
      return matchCat && matchQuery;
    });

    container.innerHTML = filtered.map(p => `
      <div class="dossier-card">
        <span class="card-badge" style="background:var(--color-blue-subtle); color:var(--color-blue); border:1px solid rgba(0,113,227,0.25);">👑 ${p.side || "Historical Actor"}</span>
        <h4 class="card-title">${p.name}</h4>
        <div class="card-period">${p.role} &bull; ${p.period}</div>
        <div class="card-desc">${p.bio}</div>
      </div>
    `).join("");
  }

  /**
   * 5. Render $45 Trillion Economic Drain Modal
   */
  renderDrainModal() {
    const container = document.getElementById("drain-modal-body");
    if (!container || !window.ECONOMIC_DRAIN_DATA) return;

    const d = window.ECONOMIC_DRAIN_DATA;
    const startGDP = (d.shareOfWorldGDP && d.shareOfWorldGDP.start1700) || "27.0%";
    const endGDP = (d.shareOfWorldGDP && d.shareOfWorldGDP.end1947) || "< 3.0%";

    container.innerHTML = `
      <div style="background:rgba(16,185,129,0.08); border:1px solid rgba(16,185,129,0.25); border-radius:20px; padding:22px; margin-bottom:20px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:12px;">
          <h4 style="font-size:24px; font-weight:800; color:#10b981; margin:0; font-family:var(--font-sans);">${d.totalDrainValueUSD || "$45 Trillion"} Net Wealth Extracted</h4>
          <span style="font-size:11px; font-weight:700; padding:4px 12px; background:rgba(16,185,129,0.18); color:#10b981; border-radius:9999px;">${d.yearsCovered || "1765 – 1938"}</span>
        </div>
        <p style="font-size:13px; color:var(--text-secondary); line-height:1.65; margin-bottom:14px;">
          Groundbreaking historical economic analysis published by <strong>Columbia University Press</strong> documents how Britain drained nearly <strong>$45 Trillion</strong> from India. This unrequited imperial extraction collapsed India from generating <strong>${startGDP}</strong> of the world economy in 1700 down to <strong>${endGDP}</strong> at Independence in 1947.
        </p>
        <div style="display:flex; gap:20px; font-size:12.5px; color:var(--text-primary); font-weight:600; padding-top:10px; border-top:1px solid rgba(16,185,129,0.2);">
          <div>Global GDP Share (1700): <span style="font-weight:700; color:#10b981;">${startGDP}</span></div>
          <div>Global GDP Share (1947): <span style="font-weight:700; color:#ef4444;">${endGDP}</span></div>
        </div>
      </div>

      <h5 class="figures-section-title" style="margin-bottom:12px;">5 Structural Extraction Mechanisms</h5>
      <div style="display:flex; flex-direction:column; gap:12px;">
        ${(d.mechanisms || []).map((m, idx) => `
          <div class="dossier-card" style="padding:16px 20px;">
            <div style="font-weight:700; font-size:14px; color:var(--text-primary); margin-bottom:4px;">
              ${idx + 1}. ${m.title}
            </div>
            <div style="font-size:12.5px; color:var(--text-secondary); line-height:1.6;">
              ${m.desc}
            </div>
          </div>
        `).join("")}
      </div>

      <div style="margin-top:20px; padding:16px; background:var(--bg-card-subtle); border:var(--glass-border-subtle); border-radius:16px; font-size:12px; color:var(--text-muted); line-height:1.6;">
        <strong>Research Reference:</strong> ${d.source || "Prof. Utsa Patnaik (Columbia University Press)"}. Calculated by tracking 173 years of detailed tax, trade, and bullion exchange data, compounding at a modest 5% interest rate from 1765 to 1938.
      </div>
    `;
  }

  /**
   * Setup Global Search across all datasets
   */
  setupSearch() {
    const input = document.getElementById("global-search-input");
    const popover = document.getElementById("search-results-popover");
    if (!input || !popover) return;

    const index = [];

    if (window.TIMELINE_EVENTS) {
      window.TIMELINE_EVENTS.forEach((ev, idx) => {
        index.push({
          type: "slide",
          title: ev.title,
          meta: `Slide ${idx + 1} &bull; ${ev.year} &bull; ${ev.locationName.split(",")[0]}`,
          slideIndex: idx
        });
      });
    }

    if (window.DRAMATIS_PERSONAE) {
      window.DRAMATIS_PERSONAE.forEach(p => {
        index.push({
          type: "persona",
          title: p.name,
          meta: `Persona &bull; ${p.role} (${p.lifespan})`,
          personaName: p.name
        });
      });
    }

    if (window.MAJOR_WARS) {
      window.MAJOR_WARS.forEach(w => {
        index.push({
          type: "war",
          title: w.name,
          meta: `War &bull; ${w.period}`,
          warName: w.name
        });
      });
    }

    if (window.TREATIES_ARCHIVE) {
      window.TREATIES_ARCHIVE.forEach(t => {
        index.push({
          type: "treaty",
          title: t.name,
          meta: `Treaty &bull; ${t.year} &bull; ${t.signatories}`,
          treatyName: t.name
        });
      });
    }

    if (window.FAMINES_REGISTER) {
      window.FAMINES_REGISTER.forEach(f => {
        index.push({
          type: "famine",
          title: f.name,
          meta: `Famine &bull; ${f.year} &bull; ${f.casualties}`,
          famineName: f.name
        });
      });
    }

    input.addEventListener("input", () => {
      const q = input.value.trim().toLowerCase();
      if (!q) {
        popover.classList.remove("active");
        popover.innerHTML = "";
        return;
      }

      const matches = index.filter(item => 
        item.title.toLowerCase().includes(q) || 
        item.meta.toLowerCase().includes(q)
      ).slice(0, 8);

      if (matches.length === 0) {
        popover.innerHTML = `<div style="padding:12px 16px; font-size:13px; color:var(--text-muted);">No historical records matched.</div>`;
      } else {
        popover.innerHTML = matches.map((m, i) => `
          <div class="search-hit-item" data-type="${m.type}" data-slide-index="${m.slideIndex !== undefined ? m.slideIndex : ""}" data-name="${m.personaName || m.warName || m.treatyName || m.famineName || ""}">
            <span class="hit-title">${m.title}</span>
            <span class="hit-meta">${m.meta}</span>
          </div>
        `).join("");
      }

      popover.classList.add("active");
    });

    popover.addEventListener("click", (e) => {
      const item = e.target.closest(".search-hit-item");
      if (!item) return;

      const type = item.dataset.type;
      const slideIdxStr = item.dataset.slideIndex;
      const targetName = item.dataset.name;

      if (type === "slide" && slideIdxStr !== "" && this.engine) {
        this.engine.activateSlideByIndex(parseInt(slideIdxStr, 10), true);
      } else if (type === "persona") {
        this.openPersonaeModal(targetName);
      } else if (type === "war") {
        this.openWarsModal();
      } else if (type === "treaty") {
        this.openTreatiesModal();
      } else if (type === "famine") {
        this.openFaminesModal();
      }

      popover.classList.remove("active");
      input.value = "";
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".nav-search-box")) {
        popover.classList.remove("active");
      }
    });

    // Keyboard shortcut CMD+K or CTRL+K to focus search
    window.addEventListener("keydown", (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        input.focus();
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.app = new Application();
  window.app.init();
});
