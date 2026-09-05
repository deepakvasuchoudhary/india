/**
 * Main Application Controller for "India's Colonial Past from Start to End"
 * Orchestrates scrollytelling IntersectionObserver, filtering, searching,
 * interactive modals, guided autoplay tour, and audio integration.
 */

class AppController {
  constructor() {
    this.activeEventId = null;
    this.currentCategoryFilter = "all";
    this.currentSearchQuery = "";
    this.intersectionObserver = null;
    this.isTourPlaying = false;
    this.tourInterval = null;
    this.tourIndex = 0;
  }

  init() {
    this.renderErasNavigation();
    this.renderTimelineCards();
    this.setupIntersectionObserver();
    this.setupModals();
    this.setupEventListeners();

    // Focus on initial event without forcing scroll jump away from top view
    setTimeout(() => {
      if (TIMELINE_EVENTS.length > 0) {
        this.activeEventId = TIMELINE_EVENTS[0].id;
        const firstCard = document.getElementById(`event-card-${TIMELINE_EVENTS[0].id}`);
        if (firstCard) {
          firstCard.classList.add("active-card-glow", "border-amber-500");
        }
        if (window.historicalMap) {
          window.historicalMap.focusEvent(TIMELINE_EVENTS[0].id, false);
        }
      }
    }, 250);
  }

  // Render era navigation pills on top/side
  renderErasNavigation() {
    const eraContainer = document.getElementById("era-nav-pills");
    if (!eraContainer) return;

    eraContainer.innerHTML = HISTORICAL_ERAS.map((era) => `
      <button onclick="window.app.jumpToEra(${era.id})" class="era-pill-btn group flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-serif transition-all bg-stone-900/90 text-amber-200/90 hover:bg-amber-950 hover:text-amber-100 hover:border-amber-600 border border-stone-800 shrink-0">
        <span class="w-2 h-2 rounded-full" style="background-color: ${era.color}"></span>
        <span class="font-bold">Era ${era.id}:</span>
        <span class="text-stone-300 group-hover:text-amber-100">${era.shortTitle}</span>
        <span class="text-[10px] text-stone-500 font-mono">(${era.period.split("–")[0].trim()})</span>
      </button>
    `).join("");
  }

  // Render the comprehensive chronological narrative cards
  renderTimelineCards() {
    const container = document.getElementById("timeline-cards-container");
    if (!container) return;

    // Filter events based on active category and search query
    const filteredEvents = TIMELINE_EVENTS.filter((ev) => {
      const matchesCategory = this.currentCategoryFilter === "all" || ev.category === this.currentCategoryFilter;
      const matchesSearch = !this.currentSearchQuery ||
        ev.title.toLowerCase().includes(this.currentSearchQuery) ||
        ev.locationName.toLowerCase().includes(this.currentSearchQuery) ||
        ev.narrative.toLowerCase().includes(this.currentSearchQuery) ||
        (ev.keyFigures && ev.keyFigures.some(f => f.toLowerCase().includes(this.currentSearchQuery))) ||
        ev.year.includes(this.currentSearchQuery);

      return matchesCategory && matchesSearch;
    });

    if (filteredEvents.length === 0) {
      container.innerHTML = `
        <div class="p-8 text-center bg-stone-900/60 rounded-xl border border-stone-800 text-stone-400">
          <svg class="w-12 h-12 mx-auto mb-3 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <p class="text-lg font-serif text-amber-200">No historical events matched your criteria</p>
          <p class="text-sm mt-1">Try resetting the category filter or searching for another keyword.</p>
          <button onclick="window.app.resetFilters()" class="mt-4 px-4 py-2 bg-amber-900/60 hover:bg-amber-800 text-amber-100 rounded text-xs uppercase tracking-wider font-semibold border border-amber-700">
            Reset Filters
          </button>
        </div>
      `;
      return;
    }

    let html = "";
    let lastEra = null;

    filteredEvents.forEach((ev, idx) => {
      // If entering a new Era, render an Era Chapter Banner
      if (ev.era !== lastEra) {
        const eraObj = HISTORICAL_ERAS.find(e => e.id === ev.era);
        if (eraObj) {
          html += `
            <div id="era-anchor-${eraObj.id}" class="era-chapter-header my-10 p-6 rounded-xl border border-amber-800/40 bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 shadow-2xl relative overflow-hidden">
              <div class="absolute -right-6 -bottom-6 opacity-10 pointer-events-none text-9xl font-serif font-black text-amber-400">
                ${eraObj.id}
              </div>
              <div class="flex items-center gap-3 mb-2">
                <span class="px-2.5 py-1 rounded bg-amber-900/50 border border-amber-700/60 text-amber-300 text-xs font-bold uppercase tracking-widest">
                  CHAPTER ${eraObj.id}
                </span>
                <span class="text-xs font-mono text-stone-400">${eraObj.period}</span>
              </div>
              <h2 class="text-2xl lg:text-3xl font-serif font-bold text-amber-100 mb-2">
                ${eraObj.name}
              </h2>
              <p class="text-sm text-stone-300 leading-relaxed font-sans max-w-3xl">
                ${eraObj.description}
              </p>
            </div>
          `;
        }
        lastEra = ev.era;
      }

      // Badge style per category
      let categoryBadgeClass = "bg-stone-800 text-stone-300 border-stone-700";
      if (ev.category === "battle") categoryBadgeClass = "bg-red-950 text-red-300 border-red-800";
      if (ev.category === "treaty") categoryBadgeClass = "bg-amber-950 text-amber-300 border-amber-800";
      if (ev.category === "famine") categoryBadgeClass = "bg-stone-900 text-amber-400 border-orange-800";
      if (ev.category === "rebellion") categoryBadgeClass = "bg-orange-950 text-orange-300 border-orange-800";
      if (ev.category === "discovery") categoryBadgeClass = "bg-blue-950 text-blue-300 border-blue-800";
      if (ev.category === "politics") categoryBadgeClass = "bg-purple-950 text-purple-300 border-purple-800";
      if (ev.category === "freedom") categoryBadgeClass = "bg-amber-900/70 text-amber-200 border-amber-600";
      if (ev.category === "independence") categoryBadgeClass = "bg-emerald-950 text-emerald-300 border-emerald-800";

      // Key figures tags
      const figuresTags = ev.keyFigures ? ev.keyFigures.map(fig => `
        <span onclick="window.app.openPersonaByName('${fig}')" class="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-stone-900/90 text-stone-300 border border-stone-700/70 hover:border-amber-500 hover:text-amber-200 cursor-pointer transition-colors" title="View Biography">
          <svg class="w-3 h-3 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/></svg>
          ${fig}
        </span>
      `).join(" ") : "";

      // Impact stats pills
      const impactPills = ev.impactStats ? ev.impactStats.map(stat => `
        <div class="flex items-start gap-1.5 text-xs text-stone-300 py-0.5">
          <span class="text-amber-500 shrink-0 font-bold">▪</span>
          <span>${stat}</span>
        </div>
      `).join("") : "";

      // Card Container
      html += `
        <article id="event-card-${ev.id}" data-event-id="${ev.id}" class="timeline-event-card mb-12 p-6 lg:p-8 rounded-xl bg-stone-950/80 backdrop-blur-md border border-stone-800/80 shadow-2xl transition-all duration-300 hover:border-amber-700/60 relative">
          <!-- Card Header -->
          <div class="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800 pb-3 mb-4">
            <div class="flex items-center gap-2">
              <span class="font-serif font-black text-xl lg:text-2xl text-amber-400 tracking-wide">
                ${ev.year}
              </span>
              <span class="text-xs text-stone-400 font-mono">(${ev.date || ev.year})</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded border ${categoryBadgeClass}">
                ${ev.category}
              </span>
              <button onclick="window.app.focusMapOnly('${ev.id}')" class="flex items-center gap-1 text-xs px-2.5 py-1 rounded bg-stone-900 hover:bg-amber-900/60 text-amber-200 border border-stone-700 hover:border-amber-500 transition-colors cursor-pointer" title="Focus camera on map">
                <svg class="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/></svg>
                <span>Pin Location</span>
              </button>
            </div>
          </div>

          <!-- Event Title -->
          <h3 class="text-xl lg:text-2xl font-serif font-bold text-stone-100 mb-2 leading-tight">
            ${ev.title}
          </h3>

          <!-- Location & Exact GPS Coordinates Readout -->
          <div class="flex flex-wrap items-center justify-between gap-2 text-xs text-amber-300/90 font-serif mb-4 italic">
            <div class="flex items-center gap-1.5">
              <svg class="w-4 h-4 text-amber-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              <span>${ev.locationName}</span>
            </div>
            <span class="font-mono text-[11px] text-amber-400/90 not-italic bg-stone-900/90 px-2 py-0.5 rounded border border-stone-800 flex items-center gap-1">
              <span class="text-stone-500">GPS:</span> ${ev.coordinates[0].toFixed(3)}° N, ${ev.coordinates[1].toFixed(3)}° E
            </span>
          </div>

          <!-- Narrative Prose -->
          <div class="text-stone-300 text-sm lg:text-[15px] leading-relaxed font-sans mb-5 space-y-3">
            <p>${ev.narrative}</p>
          </div>

          <!-- Primary Source Historical Quote -->
          ${ev.quote ? `
            <blockquote class="my-4 p-4 rounded-lg bg-stone-900/90 border-l-4 border-amber-600 text-amber-100/90 font-serif italic text-xs lg:text-sm leading-relaxed shadow-inner">
              "${ev.quote}"
            </blockquote>
          ` : ""}

          <!-- Key Figures & Impact Collapsible Grid -->
          <div class="pt-4 border-t border-stone-800/80 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span class="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1.5">
                Key Historical Personae
              </span>
              <div class="flex flex-wrap gap-1.5">
                ${figuresTags || '<span class="text-xs text-stone-500">Documented in provincial annals</span>'}
              </div>
            </div>

            <div>
              <span class="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1.5">
                Imperial & Historical Consequences
              </span>
              <div class="space-y-0.5">
                ${impactPills}
              </div>
            </div>
          </div>
        </article>
      `;
    });

    container.innerHTML = html;
    this.setupIntersectionObserver();
  }

  // Setup IntersectionObserver for Scrollytelling sync
  setupIntersectionObserver() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }

    const options = {
      root: null,
      rootMargin: "-20% 0px -45% 0px",
      threshold: [0.1, 0.5]
    };

    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const eventId = entry.target.getAttribute("data-event-id");
          if (eventId && eventId !== this.activeEventId) {
            this.handleCardIntersection(eventId);
          }
        }
      });
    }, options);

    document.querySelectorAll(".timeline-event-card").forEach((card) => {
      this.intersectionObserver.observe(card);
    });
  }

  // When a card scrolls into the active reading viewport
  handleCardIntersection(eventId) {
    this.activeEventId = eventId;

    // Visual highlight on active card
    document.querySelectorAll(".timeline-event-card").forEach((c) => {
      c.classList.remove("active-card-glow", "border-amber-500");
    });
    const activeCard = document.getElementById(`event-card-${eventId}`);
    if (activeCard) {
      activeCard.classList.add("active-card-glow", "border-amber-500");
    }

    // Trigger map camera transition and marker pulse
    if (window.historicalMap) {
      window.historicalMap.focusEvent(eventId, false);
    }

    // Play subtle audio chime on major transition
    const event = TIMELINE_EVENTS.find(e => e.id === eventId);
    if (event && window.soundEngine) {
      if (event.category === "battle") {
        window.soundEngine.playDrum();
      } else {
        window.soundEngine.playClick();
      }
    }
  }

  // Scroll smoothly to a specific event card
  scrollToEvent(eventId, smooth = true) {
    const card = document.getElementById(`event-card-${eventId}`);
    if (card) {
      card.scrollIntoView({
        behavior: smooth ? "smooth" : "auto",
        block: "center"
      });
    }
    if (window.historicalMap) {
      window.historicalMap.focusEvent(eventId, true);
    }
  }

  // Focus map camera and ensure visibility
  focusMapOnly(eventId) {
    if (window.historicalMap) {
      window.historicalMap.focusEvent(eventId, true);
    }
    // On mobile / tablet screens (< 1024px), smoothly scroll map into view
    if (window.innerWidth < 1024) {
      const mapSec = document.getElementById("map-viewport-section") || document.getElementById("historical-map");
      if (mapSec) {
        mapSec.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    if (window.soundEngine) window.soundEngine.playClick();
  }

  // Scroll directly to interactive map viewport
  scrollToMap() {
    const mapSec = document.getElementById("map-viewport-section") || document.getElementById("historical-map");
    if (mapSec) {
      mapSec.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    if (window.historicalMap && this.activeEventId) {
      window.historicalMap.focusEvent(this.activeEventId, true);
    }
    if (window.soundEngine) window.soundEngine.playClick();
  }

  // Quick jump to a Chapter/Era
  jumpToEra(eraId) {
    const anchor = document.getElementById(`era-anchor-${eraId}`);
    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      const firstEventOfEra = TIMELINE_EVENTS.find(e => e.era === eraId);
      if (firstEventOfEra) {
        this.scrollToEvent(firstEventOfEra.id);
      }
    }
    if (window.soundEngine) window.soundEngine.playChime(587.33); // D5 chime
  }

  // Category Filter handler
  setFilter(category) {
    this.currentCategoryFilter = category;
    document.querySelectorAll(".filter-pill-btn").forEach((btn) => {
      if (btn.getAttribute("data-cat") === category) {
        btn.classList.add("bg-amber-600", "text-stone-950", "font-bold");
        btn.classList.remove("bg-stone-900", "text-stone-300");
      } else {
        btn.classList.remove("bg-amber-600", "text-stone-950", "font-bold");
        btn.classList.add("bg-stone-900", "text-stone-300");
      }
    });

    this.renderTimelineCards();
    if (window.soundEngine) window.soundEngine.playClick();
  }

  resetFilters() {
    this.currentCategoryFilter = "all";
    this.currentSearchQuery = "";
    const searchInput = document.getElementById("search-input");
    if (searchInput) searchInput.value = "";
    this.setFilter("all");
  }

  // Guided Tour / Autoplay Mode
  toggleTour() {
    this.isTourPlaying = !this.isTourPlaying;
    const btn = document.getElementById("tour-toggle-btn");
    const progressEl = document.getElementById("tour-progress-bar");

    if (this.isTourPlaying) {
      if (btn) {
        btn.innerHTML = `<svg class="w-4 h-4 text-amber-400 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><span>Pause Guided Tour</span>`;
        btn.classList.add("bg-amber-900", "border-amber-500");
      }
      if (progressEl) progressEl.style.width = "0%";

      // Find current index
      this.tourIndex = TIMELINE_EVENTS.findIndex(e => e.id === this.activeEventId);
      if (this.tourIndex === -1) this.tourIndex = 0;

      this.tourInterval = setInterval(() => {
        this.tourIndex = (this.tourIndex + 1) % TIMELINE_EVENTS.length;
        const nextEv = TIMELINE_EVENTS[this.tourIndex];
        this.scrollToEvent(nextEv.id, true);

        if (progressEl) {
          const pct = Math.round(((this.tourIndex + 1) / TIMELINE_EVENTS.length) * 100);
          progressEl.style.width = `${pct}%`;
        }
      }, 7000);
    } else {
      if (btn) {
        btn.innerHTML = `<svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><span>Auto-Play Tour</span>`;
        btn.classList.remove("bg-amber-900", "border-amber-500");
      }
      clearInterval(this.tourInterval);
      this.tourInterval = null;
    }
  }

  // Setup UI Modals for Wars, Treaties, Famines, Personae, Drain
  setupModals() {
    // Populate Wars & Battles Modal
    const warsContainer = document.getElementById("wars-modal-content");
    if (warsContainer) {
      warsContainer.innerHTML = MAJOR_WARS.map((war, i) => `
        <div class="p-5 rounded-lg bg-stone-900/90 border border-stone-800 hover:border-red-800/80 transition-all">
          <div class="flex items-center justify-between border-b border-stone-800 pb-2 mb-3">
            <h4 class="font-serif font-bold text-lg text-amber-200">${war.name}</h4>
            <span class="text-xs text-red-400 font-mono font-semibold px-2 py-0.5 rounded bg-red-950/60 border border-red-900">WAR #${i + 1}</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs mb-3">
            <div><span class="font-bold text-stone-400">Belligerents:</span> <span class="text-stone-200">${war.belligerents}</span></div>
            <div><span class="font-bold text-stone-400">Theater:</span> <span class="text-stone-200">${war.theater}</span></div>
            <div><span class="font-bold text-stone-400">Commanders:</span> <span class="text-stone-200">${war.commanders}</span></div>
            <div><span class="font-bold text-stone-400">Key Engagements:</span> <span class="text-stone-200">${war.keyBattles}</span></div>
          </div>
          <p class="text-xs text-stone-300 leading-relaxed font-sans mb-2">${war.significance}</p>
          <div class="p-2.5 rounded bg-stone-950 text-xs text-amber-300 border-l-2 border-red-600 font-serif">
            <span class="font-bold">Treaty / Outcome:</span> ${war.outcome}
          </div>
        </div>
      `).join("");
    }

    // Populate Treaties Archive Modal
    const treatiesContainer = document.getElementById("treaties-modal-content");
    if (treatiesContainer) {
      treatiesContainer.innerHTML = TREATIES_ARCHIVE.map((t, i) => `
        <div class="p-5 rounded-lg bg-stone-900/90 border border-stone-800 hover:border-amber-700/80 transition-all">
          <div class="flex items-center justify-between border-b border-stone-800 pb-2 mb-3">
            <h4 class="font-serif font-bold text-lg text-amber-300">${t.name}</h4>
            <span class="text-xs text-amber-400 font-mono">${t.date}</span>
          </div>
          <div class="text-xs space-y-1 mb-3 text-stone-400">
            <div><span class="font-bold text-stone-300">Signatories:</span> ${t.signatories}</div>
            <div><span class="font-bold text-stone-300">Location:</span> ${t.location}</div>
          </div>
          <div class="p-3 rounded bg-stone-950/80 border border-stone-800 mb-2">
            <span class="text-[11px] uppercase tracking-wider text-amber-500 font-bold block mb-1">Key Articles & Clauses</span>
            <p class="text-xs text-stone-200 leading-relaxed">${t.keyTerms}</p>
          </div>
          <p class="text-xs text-stone-400 italic"><span class="font-semibold text-stone-300">Geopolitical Fallout:</span> ${t.impact}</p>
        </div>
      `).join("");
    }

    // Populate Famines & Exploitation Modal
    const faminesContainer = document.getElementById("famines-modal-content");
    if (faminesContainer) {
      faminesContainer.innerHTML = FAMINES_REGISTER.map((f) => `
        <div class="p-5 rounded-lg bg-stone-900/90 border border-stone-800 hover:border-orange-800/80 transition-all">
          <div class="flex flex-wrap items-center justify-between border-b border-stone-800 pb-2 mb-3 gap-2">
            <h4 class="font-serif font-bold text-lg text-amber-200">${f.name}</h4>
            <span class="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-red-950 text-red-300 border border-red-800">
              MORTALITY: ${f.deathToll}
            </span>
          </div>
          <div class="text-xs text-stone-400 mb-2">
            <span class="font-bold text-stone-300">Regions:</span> ${f.regions} (${f.years})
          </div>
          <div class="p-3 rounded bg-stone-950/90 border border-stone-800 mb-3">
            <span class="text-[11px] font-bold text-red-400 uppercase tracking-wider block mb-1">Colonial Policy & Laissez-Faire Causes</span>
            <p class="text-xs text-stone-300 leading-relaxed font-sans">${f.colonialPolicyCause}</p>
          </div>
          <blockquote class="text-xs font-serif italic text-amber-100/80 pl-3 border-l-2 border-amber-600">
            "${f.contemporaryQuote}"
          </blockquote>
        </div>
      `).join("");
    }

    // Populate Dramatis Personae Modal
    this.renderPersonaeCards("all");

    // Populate Economic Drain Modal
    const drainContainer = document.getElementById("drain-modal-content");
    if (drainContainer) {
      drainContainer.innerHTML = `
        <div class="space-y-6">
          <div class="p-6 rounded-xl bg-gradient-to-r from-red-950/40 via-stone-900 to-red-950/40 border border-red-900/60 text-center">
            <span class="text-xs uppercase tracking-widest text-amber-400 font-bold block mb-1">Estimated Total Imperial Extraction (1765–1938)</span>
            <div class="text-4xl lg:text-5xl font-serif font-black text-amber-200 my-2">${ECONOMIC_DRAIN_DATA.totalDrainValueUSD}</div>
            <p class="text-xs text-stone-400">${ECONOMIC_DRAIN_DATA.source}</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-4 rounded-lg bg-stone-900 border border-stone-800 text-center">
              <span class="text-xs text-stone-400 uppercase block">India's Share of World GDP in 1700</span>
              <span class="text-3xl font-serif font-bold text-emerald-400 mt-1 block">${ECONOMIC_DRAIN_DATA.shareOfWorldGDP.year1700}</span>
              <span class="text-[11px] text-stone-500">Mughal Pre-Colonial Peak</span>
            </div>
            <div class="p-4 rounded-lg bg-stone-900 border border-stone-800 text-center">
              <span class="text-xs text-stone-400 uppercase block">India's Share of World GDP in 1947</span>
              <span class="text-3xl font-serif font-bold text-red-400 mt-1 block">${ECONOMIC_DRAIN_DATA.shareOfWorldGDP.year1947}</span>
              <span class="text-[11px] text-stone-500">Upon British Departure</span>
            </div>
          </div>

          <div class="space-y-3">
            <h4 class="font-serif font-bold text-base text-amber-200 border-b border-stone-800 pb-2">The Five Mechanisms of Imperial Loot</h4>
            ${ECONOMIC_DRAIN_DATA.mechanisms.map((m, i) => `
              <div class="p-4 rounded-lg bg-stone-900/80 border border-stone-800">
                <h5 class="font-serif font-bold text-sm text-amber-300 mb-1">${i + 1}. ${m.title}</h5>
                <p class="text-xs text-stone-300 leading-relaxed font-sans">${m.desc}</p>
              </div>
            `).join("")}
          </div>
        </div>
      `;
    }
  }

  // Filter Personae Cards with side filter or text query
  renderPersonaeCards(sideFilter = "all", searchQuery = "") {
    const container = document.getElementById("personae-cards-grid");
    if (!container) return;

    const filtered = DRAMATIS_PERSONAE.filter(p => {
      let matchesSide = true;
      if (sideFilter === "royalty") matchesSide = p.side.includes("Royalty");
      if (sideFilter === "british") matchesSide = p.side.includes("British");
      if (sideFilter === "freedom") matchesSide = p.side.includes("Freedom") || p.side.includes("Tribal") || p.side.includes("Reformer");

      let matchesSearch = true;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        matchesSearch = p.name.toLowerCase().includes(q) ||
                        p.role.toLowerCase().includes(q) ||
                        p.bio.toLowerCase().includes(q);
      }

      return matchesSide && matchesSearch;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="col-span-full py-12 text-center text-stone-400">
          <p class="font-serif text-lg text-amber-200">No personae found</p>
          <button onclick="window.app.renderPersonaeCards('all', '')" class="mt-3 px-3 py-1 bg-stone-800 text-stone-200 text-xs rounded border border-stone-700">
            Show All Figures
          </button>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(p => `
      <div class="p-4 rounded-lg bg-stone-900/90 border border-stone-800 hover:border-amber-600 transition-all flex flex-col justify-between shadow-lg">
        <div>
          <div class="flex items-center gap-3 mb-3">
            <img src="${p.image}" alt="${p.name}" class="w-14 h-14 rounded-full object-cover border-2 border-amber-600 shrink-0 bg-stone-800" onerror="this.src='https://placehold.co/100x100/1c1917/f59e0b?text=PORTRAIT'">
            <div>
              <h4 class="font-serif font-bold text-sm text-amber-200 leading-snug">${p.name}</h4>
              <p class="text-[11px] text-amber-400 font-serif italic">${p.role}</p>
              <span class="text-[10px] text-stone-500 font-mono">${p.period}</span>
            </div>
          </div>
          <p class="text-xs text-stone-300 leading-relaxed font-sans mb-3">${p.bio}</p>
        </div>
        <div class="pt-2 border-t border-stone-800 flex items-center justify-between">
          <span class="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-stone-950 text-stone-400 border border-stone-800">
            ${p.side}
          </span>
          <button onclick="window.app.searchAndFilter('${p.name.split(' ')[0]}')" class="text-[11px] text-amber-300 hover:text-amber-100 flex items-center gap-1 cursor-pointer">
            <span>Find Events</span>
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    `).join("");
  }

  openPersonaByName(name) {
    this.openModal("personae-modal");
    // Filter personae grid directly to this figure
    this.renderPersonaeCards("all", name);
    const searchBox = document.getElementById("persona-search-input");
    if (searchBox) searchBox.value = name;
  }

  searchAndFilter(term) {
    this.closeAllModals();
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
      searchInput.value = term;
    }
    this.currentSearchQuery = term.toLowerCase();
    this.renderTimelineCards();
  }

  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove("hidden");
      modal.classList.add("flex");
      document.body.style.overflow = "hidden";
      if (window.soundEngine) window.soundEngine.playClick();
    }
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
      document.body.style.overflow = "auto";
    }
  }

  closeAllModals() {
    document.querySelectorAll(".hist-modal").forEach(m => {
      m.classList.add("hidden");
      m.classList.remove("flex");
    });
    document.body.style.overflow = "auto";
  }

  setupEventListeners() {
    // Search input listener with debounce
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.currentSearchQuery = e.target.value.trim().toLowerCase();
        this.renderTimelineCards();
      });
    }

    // Sound toggle button
    const soundToggleBtn = document.getElementById("sound-toggle-btn");
    if (soundToggleBtn) {
      soundToggleBtn.addEventListener("click", () => {
        if (window.soundEngine) {
          const isEnabled = window.soundEngine.toggleSound();
          soundToggleBtn.innerHTML = isEnabled ? `
            <svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
            <span class="text-amber-200">Audio Ambient: ON</span>
          ` : `
            <svg class="w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15zM17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"/></svg>
            <span class="text-stone-400">Audio: Muted</span>
          `;
        }
      });
    }

    // Modal close buttons
    document.querySelectorAll(".modal-close-btn").forEach(btn => {
      btn.addEventListener("click", () => this.closeAllModals());
    });

    // Close modal when clicking on backdrop
    document.querySelectorAll(".hist-modal").forEach(m => {
      m.addEventListener("click", (e) => {
        if (e.target === m) this.closeAllModals();
      });
    });

    // Escape key closes modals
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") this.closeAllModals();
    });

    // Mobile floating map shortcut toggle on scroll
    const mobileShortcut = document.getElementById("mobile-map-shortcut");
    const mapSection = document.getElementById("map-viewport-section");
    if (mobileShortcut && mapSection) {
      window.addEventListener("scroll", () => {
        if (window.innerWidth >= 1024) {
          mobileShortcut.style.display = "none";
          return;
        }
        const rect = mapSection.getBoundingClientRect();
        // If map is scrolled well above view, display floating button
        if (rect.bottom < 80) {
          mobileShortcut.style.display = "flex";
        } else {
          mobileShortcut.style.display = "none";
        }
      }, { passive: true });
    }
  }
}

window.app = new AppController();
document.addEventListener("DOMContentLoaded", () => {
  window.historicalMap.init();
  window.app.init();
});
