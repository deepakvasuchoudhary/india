/**
 * INDIA: CHRONICA IMPERII INDICI
 * Application Controller & Event Orchestrator
 * Wires the Minimalist Editorial UI: Dock timeline, Media HUD controls,
 * Global search, Tanpura drone soundscape, and Deep-Dive Dossier Modals.
 */

class Application {
  constructor() {
    this.audioEngine = null;
    this.mapController = null;
    this.scroller = null;
    this.currentPersonaFilter = "all";
    this.currentWarFilter = "all";
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

    // 2. Scroller & Timeline Engine
    if (window.ScrollytellingEngine) {
      this.scroller = new ScrollytellingEngine(this.mapController);
      this.scroller.init();
      window.scroller = this.scroller;
    }

    // 3. Setup UI Controls
    this.setupEventListeners();
    this.setupSearch();
    this.renderWarsModal();
    this.renderTreatiesModal();
    this.renderFaminesModal();
    this.renderPersonaeModal();
    this.renderDrainModal();
  }

  setupEventListeners() {
    // Left Dock Tour Button
    const tourBtn = document.getElementById("btn-dock-tour");
    if (tourBtn && this.scroller) {
      tourBtn.addEventListener("click", () => {
        this.scroller.toggleAutoTour();
      });
    }

    // Prev / Next Stage Chevrons
    const prevBtn = document.getElementById("btn-stage-prev");
    if (prevBtn && this.scroller) {
      prevBtn.addEventListener("click", () => {
        this.scroller.prevMilestone();
      });
    }

    const nextBtn = document.getElementById("btn-stage-next");
    if (nextBtn && this.scroller) {
      nextBtn.addEventListener("click", () => {
        this.scroller.nextMilestone();
      });
    }

    // Figure Chips Click in Deep-Dive
    const figuresContainer = document.getElementById("editorial-figures-chips");
    if (figuresContainer) {
      figuresContainer.addEventListener("click", (e) => {
        const chip = e.target.closest(".site-chip-btn");
        if (chip) {
          const figName = chip.dataset.figureName;
          this.openPersonaeModal(figName);
        }
      });
    }

    // Map HUD Toggles
    const btnBoundaries = document.getElementById("btn-toggle-boundaries");
    if (btnBoundaries && this.mapController) {
      btnBoundaries.addEventListener("click", () => {
        const active = this.mapController.toggleBoundaries();
        btnBoundaries.classList.toggle("active", active);
      });
    }

    const btnSites = document.getElementById("btn-toggle-sites");
    if (btnSites && this.mapController) {
      btnSites.addEventListener("click", () => {
        const active = this.mapController.toggleSites();
        btnSites.classList.toggle("active", active);
      });
    }

    const btnRoutes = document.getElementById("btn-toggle-routes");
    if (btnRoutes && this.mapController) {
      btnRoutes.addEventListener("click", () => {
        const active = this.mapController.toggleRoutes();
        btnRoutes.classList.toggle("active", active);
      });
    }

    const btnTheme = document.getElementById("btn-toggle-theme");
    if (btnTheme && this.mapController) {
      const themes = ["voyager", "dark", "light"];
      let themeIndex = 0;
      btnTheme.addEventListener("click", () => {
        themeIndex = (themeIndex + 1) % themes.length;
        const newTheme = themes[themeIndex];
        this.mapController.setTheme(newTheme);
        btnTheme.textContent = newTheme.charAt(0).toUpperCase() + newTheme.slice(1);
      });
    }

    // Tanpura Drone Audio Button
    const audioBtn = document.getElementById("btn-audio-toggle");
    if (audioBtn && this.audioEngine) {
      audioBtn.addEventListener("click", () => {
        if (this.audioEngine.isPlaying) {
          this.audioEngine.stop();
          audioBtn.classList.remove("audio-active");
        } else {
          this.audioEngine.start();
          audioBtn.classList.add("audio-active");
        }
      });
    }

    // Modal Opening Buttons
    const bindModalBtn = (btnId, modalId) => {
      const btn = document.getElementById(btnId);
      const modal = document.getElementById(modalId);
      if (btn && modal) {
        btn.addEventListener("click", () => {
          this.openModal(modalId);
        });
      }
    };

    bindModalBtn("btn-open-wars-modal", "wars-modal");
    bindModalBtn("btn-open-treaties-modal", "treaties-modal");
    bindModalBtn("btn-open-famines-modal", "famines-modal");
    bindModalBtn("btn-open-personae-modal", "personae-modal");
    bindModalBtn("btn-open-drain-modal", "drain-modal");

    // Modal Closing (Close button, backdrop click, Escape key)
    document.querySelectorAll(".modal-backdrop").forEach(modal => {
      const closeBtn = modal.querySelector(".modal-close-btn");
      if (closeBtn) {
        closeBtn.addEventListener("click", () => {
          modal.classList.remove("open");
        });
      }
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.classList.remove("open");
        }
      });
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        document.querySelectorAll(".modal-backdrop.open").forEach(m => m.classList.remove("open"));
      }
    });
  }

  openModal(modalId) {
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
   * 1. Render Major Wars & Battles Dossier Modal
   */
  renderWarsModal(filter = "all", query = "") {
    const container = document.getElementById("wars-cards-grid");
    if (!container || !window.MAJOR_WARS) return;

    this.currentWarFilter = filter;
    const q = query.toLowerCase();

    const filtered = window.MAJOR_WARS.filter(w => {
      const matchCat = filter === "all" || (w.period && w.period.toLowerCase().includes(filter));
      const matchQuery = !q || w.name.toLowerCase().includes(q) ||
        (w.keyBattles && w.keyBattles.some(b => b.toLowerCase().includes(q))) ||
        (w.commanders && w.commanders.some(c => c.toLowerCase().includes(q)));
      return matchCat && matchQuery;
    });

    container.innerHTML = filtered.map(w => `
      <div class="dossier-card">
        <span class="card-badge" style="background:#fee2e2; color:#b91c1c;">WAR &bull; ${w.period}</span>
        <h4 class="card-title">${w.name}</h4>
        <div class="card-period"><strong>Belligerents:</strong> ${w.belligerents.join(" vs ")}</div>
        <div class="card-desc"><strong>Key Engagements:</strong> ${w.keyBattles.join(", ")}</div>
        <div class="card-desc"><strong>Commanders:</strong> ${w.commanders.join(", ")}</div>
        <div class="card-footer">
          <strong>Outcome:</strong> ${w.outcome}
        </div>
      </div>
    `).join("");
  }

  /**
   * 2. Render Historic Treaties Archive Modal
   */
  renderTreatiesModal(query = "") {
    const container = document.getElementById("treaties-cards-grid");
    if (!container || !window.TREATIES_ARCHIVE) return;

    const q = query.toLowerCase();
    const filtered = window.TREATIES_ARCHIVE.filter(t => {
      return !q || t.name.toLowerCase().includes(q) ||
        t.signatories.toLowerCase().includes(q) ||
        t.context.toLowerCase().includes(q) ||
        t.year.includes(q);
    });

    container.innerHTML = filtered.map(t => `
      <div class="dossier-card">
        <span class="card-badge" style="background:#fef3c7; color:#b45309;">TREATY &bull; ${t.year}</span>
        <h4 class="card-title">${t.name}</h4>
        <div class="card-period"><strong>Signatories:</strong> ${t.signatories}</div>
        <div class="card-desc">${t.context}</div>
        <div class="card-desc"><strong>Key Terms:</strong>
          <ul style="margin:4px 0 0 16px; padding:0; list-style:disc;">
            ${t.clauses.map(c => `<li style="font-size:11px; margin-bottom:2px;">${c}</li>`).join("")}
          </ul>
        </div>
        <div class="card-footer">
          <strong>Imperial Aftermath:</strong> ${t.aftermath}
        </div>
      </div>
    `).join("");
  }

  /**
   * 3. Render Great Famines Register Modal
   */
  renderFaminesModal(query = "") {
    const container = document.getElementById("famines-cards-grid");
    if (!container || !window.FAMINES_REGISTER) return;

    const q = query.toLowerCase();
    const filtered = window.FAMINES_REGISTER.filter(f => {
      return !q || f.name.toLowerCase().includes(q) ||
        f.regions.toLowerCase().includes(q) ||
        f.viceroy.toLowerCase().includes(q) ||
        f.year.includes(q);
    });

    container.innerHTML = filtered.map(f => `
      <div class="dossier-card">
        <span class="card-badge" style="background:#ffedd5; color:#c2410c;">${f.casualties} LIVES LOST</span>
        <h4 class="card-title">${f.name} (${f.year})</h4>
        <div class="card-period"><strong>Regions:</strong> ${f.regions}</div>
        <div class="card-desc"><strong>Administration / Viceroy:</strong> ${f.viceroy}</div>
        <div class="card-desc">${f.analysis}</div>
        <div class="card-footer" style="color:#b91c1c;">
          <strong>Export Policy:</strong> ${f.exports}
        </div>
      </div>
    `).join("");
  }

  /**
   * 4. Render Dramatis Personae Modal
   */
  renderPersonaeModal(filter = "all", query = "") {
    const container = document.getElementById("personae-cards-grid");
    if (!container || !window.DRAMATIS_PERSONAE) return;

    this.currentPersonaFilter = filter;
    const q = query.toLowerCase();

    const filtered = window.DRAMATIS_PERSONAE.filter(p => {
      const matchCat = filter === "all" || p.category === filter;
      const matchQuery = !q || p.name.toLowerCase().includes(q) ||
        p.role.toLowerCase().includes(q) ||
        p.era.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });

    const categoryBadges = {
      royalty: { bg: "#fef3c7", color: "#b45309", label: "INDIAN ROYALTY 👑" },
      freedom: { bg: "#dcfce7", color: "#15803d", label: "FREEDOM FIGHTER 🇮🇳" },
      british: { bg: "#fee2e2", color: "#b91c1c", label: "BRITISH RAJ 🏛️" }
    };

    container.innerHTML = filtered.map(p => {
      const badgeInfo = categoryBadges[p.category] || { bg: "#f4f4f6", color: "#52525b", label: "PERSONA" };
      return `
        <div class="dossier-card">
          <span class="card-badge" style="background:${badgeInfo.bg}; color:${badgeInfo.color};">${badgeInfo.label}</span>
          <h4 class="card-title">${p.name}</h4>
          <div class="card-period">${p.role} &bull; ${p.lifespan}</div>
          <div class="card-desc">${p.bio}</div>
          ${p.quote ? `<blockquote style="font-style:italic; font-size:11px; color:#52525b; border-left:2px solid #d4d4d8; padding-left:8px; margin:4px 0;">"${p.quote}"</blockquote>` : ""}
          <div class="card-footer">
            <strong>Historical Legacy:</strong> ${p.legacy}
          </div>
        </div>
      `;
    }).join("");
  }

  /**
   * 5. Render $45 Trillion Drain of Wealth Modal
   */
  renderDrainModal() {
    const container = document.getElementById("drain-modal-body");
    if (!container || !window.ECONOMIC_DRAIN_DATA) return;

    const d = window.ECONOMIC_DRAIN_DATA;
    container.innerHTML = `
      <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:16px; padding:20px; margin-bottom:20px;">
        <h4 style="font-size:18px; font-weight:700; color:#166534; margin-bottom:6px;">${d.totalAmount} Extracted (1765 – 1938)</h4>
        <p style="font-size:13px; color:#14532d; line-height:1.6;">
          ${d.summary}
        </p>
      </div>

      <h5 class="deep-dive-subheading" style="margin-bottom:12px;">5 Structural Extraction Mechanisms</h5>
      <div style="display:flex; flex-direction:column; gap:12px;">
        ${d.mechanisms.map((m, idx) => `
          <div class="dossier-card" style="padding:14px 18px;">
            <div style="font-weight:700; font-size:14px; color:var(--text-dark); margin-bottom:4px;">
              ${idx + 1}. ${m.title}
            </div>
            <div style="font-size:12px; color:var(--text-body); line-height:1.6;">
              ${m.desc}
            </div>
          </div>
        `).join("")}
      </div>

      <div style="margin-top:20px; padding:16px; background:#fafafc; border-radius:12px; font-size:12px; color:var(--text-muted); line-height:1.6;">
        <strong>Research Reference:</strong> Prof. Utsa Patnaik (Columbia University Press) calculated this drain by tracking 173 years of detailed trade and exchange data, compounding at a modest 5% interest rate from 1765 to 1938. India contributed a net export surplus to Britain for centuries that financed Britain's industrial revolution and imperial warfare worldwide.
      </div>
    `;
  }

  /**
   * Setup Global Search across all 63 events, 43 figures, 16 wars, 13 treaties, 10 famines
   */
  setupSearch() {
    const input = document.getElementById("global-search-input");
    const dropdown = document.getElementById("search-results-dropdown");
    if (!input || !dropdown) return;

    const index = [];

    // Add Timeline Events
    if (window.TIMELINE_EVENTS) {
      window.TIMELINE_EVENTS.forEach((ev, idx) => {
        index.push({
          type: "event",
          title: ev.title,
          meta: `Milestone ${idx + 1} · ${ev.year} · ${ev.locationName.split(",")[0]}`,
          milestoneIndex: idx,
          eventId: ev.id
        });
      });
    }

    // Add Personae
    if (window.DRAMATIS_PERSONAE) {
      window.DRAMATIS_PERSONAE.forEach(p => {
        index.push({
          type: "persona",
          title: p.name,
          meta: `Persona · ${p.role} (${p.lifespan})`,
          personaName: p.name
        });
      });
    }

    // Add Wars
    if (window.MAJOR_WARS) {
      window.MAJOR_WARS.forEach(w => {
        index.push({
          type: "war",
          title: w.name,
          meta: `War · ${w.period} · ${w.outcome.slice(0, 45)}...`,
          warName: w.name
        });
      });
    }

    // Add Treaties
    if (window.TREATIES_ARCHIVE) {
      window.TREATIES_ARCHIVE.forEach(t => {
        index.push({
          type: "treaty",
          title: t.name,
          meta: `Treaty · ${t.year} · ${t.signatories}`,
          treatyName: t.name
        });
      });
    }

    // Add Famines
    if (window.FAMINES_REGISTER) {
      window.FAMINES_REGISTER.forEach(f => {
        index.push({
          type: "famine",
          title: f.name,
          meta: `Famine · ${f.year} · ${f.casualties}`,
          famineName: f.name
        });
      });
    }

    input.addEventListener("input", () => {
      const query = input.value.trim().toLowerCase();
      if (!query) {
        dropdown.classList.remove("active");
        dropdown.innerHTML = "";
        return;
      }

      const matches = index.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.meta.toLowerCase().includes(query)
      ).slice(0, 8);

      if (matches.length === 0) {
        dropdown.innerHTML = `<div style="padding:12px 16px; font-size:13px; color:#8e8e93;">No matching historical records found.</div>`;
      } else {
        dropdown.innerHTML = matches.map((m, i) => `
          <div class="search-result-item" data-type="${m.type}" data-index="${i}" data-milestone-index="${m.milestoneIndex !== undefined ? m.milestoneIndex : ""}" data-name="${m.personaName || m.warName || m.treatyName || m.famineName || ""}">
            <span class="result-title">${m.title}</span>
            <span class="result-meta">${m.meta}</span>
          </div>
        `).join("");
      }

      dropdown.classList.add("active");
    });

    dropdown.addEventListener("click", (e) => {
      const item = e.target.closest(".search-result-item");
      if (!item) return;

      const type = item.dataset.type;
      const milestoneIdxStr = item.dataset.milestoneIndex;
      const targetName = item.dataset.name;

      if (type === "event" && milestoneIdxStr !== "" && this.scroller) {
        const idx = parseInt(milestoneIdxStr, 10);
        this.scroller.activateMilestoneByIndex(idx, true);
      } else if (type === "persona") {
        this.openPersonaeModal(targetName);
      } else if (type === "war") {
        this.openWarsModal();
      } else if (type === "treaty") {
        this.openTreatiesModal();
      } else if (type === "famine") {
        this.openFaminesModal();
      }

      dropdown.classList.remove("active");
      input.value = "";
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".nav-search-wrapper")) {
        dropdown.classList.remove("active");
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.app = new Application();
  window.app.init();
});
