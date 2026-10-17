/**
 * INDIA: CHRONICA IMPERII INDICI (1498 – 1961)
 * Leaflet Interactive Historical Map Controller
 * Coordinates smooth camera flights, glowing SVG beacons, territorial polygons,
 * and historical journey route overlays.
 */

class HistoricalMapController {
  constructor(containerId = "map") {
    this.containerId = containerId;
    this.map = null;
    this.activeEventId = null;

    // Tile layers
    this.tileLayers = {};
    this.currentTileTheme = "voyager"; // "voyager" | "dark" | "light"

    // Layer groups
    this.boundaryLayer = null;
    this.routesLayer = null;
    this.markersLayer = null;

    // Toggles
    this.showBoundaries = true;
    this.showSites = true;
    this.showRoutes = true;

    // Marker references dictionary
    this.markers = {};
  }

  init() {
    // Initial center on undivided Indian Subcontinent
    this.map = L.map(this.containerId, {
      center: [21.5, 78.5],
      zoom: 5,
      minZoom: 4,
      maxZoom: 14,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false
    });

    // Zoom control at bottom right
    L.control.zoom({ position: "bottomright" }).addTo(this.map);
    L.control.attribution({
      position: "bottomleft",
      prefix: "<span>Carto &copy; OpenStreetMap &copy; Chronica Imperii Indici</span>"
    }).addTo(this.map);

    // Tile Themes
    this.tileLayers = {
      voyager: L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
        subdomains: ["a", "b", "c", "d"],
        maxZoom: 18,
        attribution: "CartoDB Voyager"
      }),
      dark: L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        subdomains: ["a", "b", "c", "d"],
        maxZoom: 18,
        attribution: "CartoDB Dark"
      }),
      light: L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        subdomains: ["a", "b", "c", "d"],
        maxZoom: 18,
        attribution: "CartoDB Light"
      })
    };

    this.tileLayers[this.currentTileTheme].addTo(this.map);

    // Initialize layer groups
    this.boundaryLayer = L.layerGroup().addTo(this.map);
    this.routesLayer = L.layerGroup().addTo(this.map);
    this.markersLayer = L.layerGroup().addTo(this.map);

    // Render historical routes & all event markers
    this.renderHistoricalRoutes();
    this.renderAllMarkers();

    // Handle window resize
    window.addEventListener("resize", () => {
      if (this.map) this.map.invalidateSize();
    });
  }

  setTheme(themeName) {
    if (!this.tileLayers[themeName] || themeName === this.currentTileTheme) return;
    this.map.removeLayer(this.tileLayers[this.currentTileTheme]);
    this.currentTileTheme = themeName;
    this.tileLayers[this.currentTileTheme].addTo(this.map);
    this.tileLayers[this.currentTileTheme].bringToBack();
  }

  toggleBoundaries() {
    this.showBoundaries = !this.showBoundaries;
    if (this.showBoundaries) {
      if (this.activeEventId) {
        const ev = window.TIMELINE_EVENTS.find(e => e.id === this.activeEventId);
        if (ev) this.renderTerritoryOverlay(ev);
      }
    } else {
      this.boundaryLayer.clearLayers();
    }
    return this.showBoundaries;
  }

  toggleSites() {
    this.showSites = !this.showSites;
    if (this.showSites) {
      this.markersLayer.addTo(this.map);
    } else {
      this.map.removeLayer(this.markersLayer);
    }
    return this.showSites;
  }

  toggleRoutes() {
    this.showRoutes = !this.showRoutes;
    if (this.showRoutes) {
      this.renderHistoricalRoutes();
    } else {
      this.routesLayer.clearLayers();
    }
    return this.showRoutes;
  }

  /**
   * Render custom glowing SVG beacons for all 63 timeline events
   */
  renderAllMarkers() {
    this.markersLayer.clearLayers();
    this.markers = {};

    if (!window.TIMELINE_EVENTS) return;

    window.TIMELINE_EVENTS.forEach((ev, idx) => {
      const icon = this.createCustomBeaconIcon(ev.category, false);
      const marker = L.marker(ev.coordinates, { icon: icon, zIndexOffset: 100 });

      const categoryLabel = (ev.category || "event").toUpperCase();
      const popupHtml = `
        <div class="custom-map-popup">
          <div class="popup-tag" style="background: rgba(244, 63, 94, 0.12); color: #f43f5e; border: 1px solid rgba(244, 63, 94, 0.25);">
            ${categoryLabel} &bull; ${ev.year}
          </div>
          <h4 class="popup-title">${ev.title}</h4>
          <h5 class="popup-subtitle">${ev.locationName}</h5>
          <p class="popup-desc">${ev.narrative.slice(0, 150)}...</p>
        </div>
      `;

      marker.bindPopup(popupHtml, {
        className: "custom-leaflet-popup",
        maxWidth: 280
      });

      marker.on("click", () => {
        if (window.scroller) {
          window.scroller.activateMilestoneById(ev.id);
        }
      });

      this.markersLayer.addLayer(marker);
      this.markers[ev.id] = marker;
    });
  }

  /**
   * Create SVG beacon icons with distinctive symbols per category
   */
  createCustomBeaconIcon(category, isActive = false) {
    const categoryColors = {
      discovery: "#3b82f6",
      battle: "#ef4444",
      treaty: "#f59e0b",
      famine: "#b45309",
      rebellion: "#dc2626",
      decree: "#8b5cf6",
      movement: "#10b981",
      liberation: "#059669"
    };

    const color = categoryColors[category] || "#f43f5e";

    const svgs = {
      discovery: `<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="${color}" stroke-width="2"><path d="M2 20a2.4 2.4 0 0 0 2 1 2.4 2.4 0 0 0 2-1 2.4 2.4 0 0 1 2-1 2.4 2.4 0 0 1 2 1 2.4 2.4 0 0 0 2 1 2.4 2.4 0 0 0 2-1 2.4 2.4 0 0 1 2-1 2.4 2.4 0 0 1 2 1 2.4 2.4 0 0 0 2 1 2.4 2.4 0 0 0 2-1"/><path d="M4 18 3 12h18l-1 6"/><path d="M12 12V4l4 3-4 3"/></svg>`,
      battle: `<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="${color}" stroke-width="2"><line x1="14.5" y1="17.5" x2="3" y2="6"/><line x1="9.5" y1="6.5" x2="21" y2="18"/><path d="m19 3 2 2-2 2-2-2zM3 19l2 2 2-2-2-2z"/></svg>`,
      treaty: `<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="${color}" stroke-width="2"><path d="M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10l6 6v8a2 2 0 0 1-2 2z"/><line x1="14" y1="4" x2="14" y2="10"/><line x1="14" y1="10" x2="20" y2="10"/></svg>`,
      famine: `<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="${color}" stroke-width="2"><path d="M12 2v20M8 5a4 4 0 0 1 8 0M8 11a4 4 0 0 1 8 0M8 17a4 4 0 0 1 8 0"/></svg>`,
      rebellion: `<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="${color}" stroke-width="2"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`,
      decree: `<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="${color}" stroke-width="2"><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14v2H5z"/></svg>`,
      movement: `<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="${color}" stroke-width="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>`,
      liberation: `<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="${color}" stroke-width="2"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14h-2v-2h2zm0-4h-2V7h2z"/></svg>`
    };

    const iconContent = svgs[category] || svgs.battle;
    const pulseStyle = isActive ? `style="background: ${color}44; border-color: ${color};"` : `style="display:none;"`;
    const coreBorder = isActive ? `border: 2px solid ${color}; transform: scale(1.15);` : `border: 1.5px solid #d4d4d8;`;

    return L.divIcon({
      className: "custom-beacon-marker" + (isActive ? " active-beacon" : ""),
      html: `
        <div class="beacon-pulse" ${pulseStyle}></div>
        <div class="beacon-core" style="${coreBorder}">
          ${iconContent}
        </div>
      `,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
      popupAnchor: [0, -16]
    });
  }

  /**
   * Fly camera to target event and trigger active beacon styling
   */
  focusEvent(eventId) {
    if (!eventId || !window.TIMELINE_EVENTS) return;
    const ev = window.TIMELINE_EVENTS.find(e => e.id === eventId);
    if (!ev) return;

    // Reset previous active marker icon
    if (this.activeEventId && this.markers[this.activeEventId]) {
      const prevEv = window.TIMELINE_EVENTS.find(e => e.id === this.activeEventId);
      if (prevEv) {
        this.markers[this.activeEventId].setIcon(this.createCustomBeaconIcon(prevEv.category, false));
        this.markers[this.activeEventId].setZIndexOffset(100);
      }
    }

    this.activeEventId = eventId;

    // Set new active marker icon with pulsing wave
    if (this.markers[eventId]) {
      this.markers[eventId].setIcon(this.createCustomBeaconIcon(ev.category, true));
      this.markers[eventId].setZIndexOffset(999);
    }

    // Smooth camera flight
    const zoomLevel = ev.zoom || 8;
    this.map.flyTo(ev.coordinates, zoomLevel, {
      duration: 1.4,
      easeLinearity: 0.25
    });

    // Render territory polygon if enabled
    if (this.showBoundaries) {
      this.renderTerritoryOverlay(ev);
    }

    // Play subtle audio chime
    if (window.ambientAudio) {
      window.ambientAudio.playEraChime();
    }
  }

  /**
   * Render dynamic territory polygons for the era
   */
  renderTerritoryOverlay(ev) {
    this.boundaryLayer.clearLayers();
    if (!window.MAP_ERA_PRESETS) return;

    const yearNum = parseInt(ev.year, 10);
    let presetKey = null;

    if (yearNum < 1740) presetKey = 1700;
    else if (yearNum < 1780) presetKey = 1765;
    else if (yearNum < 1830) presetKey = 1805;
    else if (yearNum < 1920) presetKey = 1857;
    else if (yearNum < 1955) presetKey = 1947;
    else presetKey = 1961;

    const preset = window.MAP_ERA_PRESETS[presetKey];
    if (!preset || !preset.territories) return;

    preset.territories.forEach(terr => {
      const polygon = L.polygon(terr.coords, {
        color: terr.color || "#d97706",
        weight: 2,
        opacity: 0.7,
        fillColor: terr.color || "#d97706",
        fillOpacity: 0.12,
        dashArray: "5, 6",
        className: "era-boundary-polygon"
      });

      polygon.bindTooltip(`<strong>${terr.name}</strong><br><small>${preset.name}</small>`, {
        className: "hist-tooltip",
        sticky: true
      });

      this.boundaryLayer.addLayer(polygon);
    });
  }

  /**
   * Draw historical route overlays
   */
  renderHistoricalRoutes() {
    this.routesLayer.clearLayers();
    if (!this.showRoutes) return;

    // 1. Dandi Salt March (1930)
    const dandiCoords = [
      [23.0617, 72.5800], // Sabarmati Ashram
      [22.9267, 72.6322], // Aslali
      [22.6916, 72.8634], // Nadiad
      [22.5645, 72.9289], // Anand
      [22.2587, 73.0028], // Kareli / Jambusar
      [21.7051, 72.9959], // Bharuch
      [21.1702, 72.8311], // Surat
      [20.8880, 72.8020]  // Dandi Beach
    ];

    const dandiLine = L.polyline(dandiCoords, {
      color: "#d97706",
      weight: 3.5,
      dashArray: "6, 8",
      opacity: 0.85,
      className: "animated-route-line"
    }).bindTooltip("<strong>Salt Satyagraha (1930)</strong><br>Sabarmati Ashram to Dandi (240 Miles)", {
      className: "hist-tooltip",
      sticky: true
    });
    this.routesLayer.addLayer(dandiLine);

    // 2. 1857 War of Independence Epicenter Axis
    const revolt1857Axis = [
      [22.7667, 88.3667], // Barrackpore
      [28.9845, 77.7064], // Meerut
      [28.6653, 77.2307], // Delhi
      [26.4499, 80.3319], // Kanpur
      [26.8587, 80.9287], // Lucknow
      [25.4484, 78.5685], // Jhansi
      [26.1264, 79.7340], // Kalpi
      [26.2183, 78.1828], // Gwalior
      [25.4800, 84.4200]  // Jagdishpur (Kunwar Singh)
    ];

    const revoltLine = L.polyline(revolt1857Axis, {
      color: "#dc2626",
      weight: 3,
      dashArray: "5, 8",
      opacity: 0.8,
      className: "animated-route-line"
    }).bindTooltip("<strong>1857 War of Independence Axis</strong><br>Barrackpore &bull; Meerut &bull; Delhi &bull; Jhansi &bull; Lucknow", {
      className: "hist-tooltip",
      sticky: true
    });
    this.routesLayer.addLayer(revoltLine);

    // 3. Vasco da Gama 1498 Maritime Landing Path
    const gamaMaritimePath = [
      [14.0, 68.0],
      [12.5, 72.0],
      [11.3850, 75.7176] // Kappad, Calicut
    ];

    const gamaLine = L.polyline(gamaMaritimePath, {
      color: "#3b82f6",
      weight: 3,
      dashArray: "6, 8",
      opacity: 0.8,
      className: "animated-route-line"
    }).bindTooltip("<strong>Vasco da Gama Sea Approach (1498)</strong><br>Arabian Sea to Kappad Beach, Calicut", {
      className: "hist-tooltip",
      sticky: true
    });
    this.routesLayer.addLayer(gamaLine);
  }
}

if (typeof window !== "undefined") {
  window.HistoricalMapController = HistoricalMapController;
}
