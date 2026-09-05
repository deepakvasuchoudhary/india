/**
 * Leaflet.js Interactive Historical Map Controller
 * Handles map initialization, custom SVG markers, camera flyTo transitions,
 * historical territory polygon overlays, and event location highlights.
 */

class HistoricalMapController {
  constructor() {
    this.map = null;
    this.markers = {};
    this.activeMarkerId = null;
    this.currentTileLayer = null;
    this.territoryLayerGroup = null;
    this.routeLayerGroup = null;
    this.currentEraPresetKey = null;
    this.baseTileUrls = {
      sepia: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      osm: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      satellite: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
    };
  }

  init() {
    // Default initial view: Center of undivided Indian Subcontinent
    this.map = L.map("historical-map", {
      center: [22.5, 78.9],
      zoom: 5,
      minZoom: 4,
      maxZoom: 16,
      zoomControl: false,
      attributionControl: false
    });

    // Add zoom control in top right
    L.control.zoom({ position: "topright" }).addTo(this.map);

    // Initial base layer: CartoDB Voyager with antique sepia tint
    this.setBaseTile("sepia");

    // Layer groups for dynamic territories and routes
    this.territoryLayerGroup = L.layerGroup().addTo(this.map);
    this.routeLayerGroup = L.layerGroup().addTo(this.map);

    // Render all historical markers
    this.renderAllMarkers();

    // Draw initial historic routes (Vasco da Gama, Dandi March, 1857 axis)
    this.drawHistoricalRoutes();

    // Live cursor coordinates tracker on map hover
    this.map.on("mousemove", (e) => {
      const liveCoordEl = document.getElementById("hud-live-coords");
      if (liveCoordEl) {
        liveCoordEl.textContent = `${e.latlng.lat.toFixed(3)}° N, ${e.latlng.lng.toFixed(3)}° E`;
      }
    });

    // Invalidate map size after DOM layout is stable
    setTimeout(() => {
      if (this.map) {
        this.map.invalidateSize();
      }
    }, 200);

    // Listen to map clicks to deselect or log
    this.map.on("click", () => {
      // Keep active state intact or unfocus
    });
  }

  setBaseTile(styleKey) {
    if (this.currentTileLayer) {
      this.map.removeLayer(this.currentTileLayer);
    }
    const tileUrl = this.baseTileUrls[styleKey] || this.baseTileUrls.sepia;
    const subdomains = styleKey === 'satellite' ? [] : ['a', 'b', 'c', 'd'];

    this.currentTileLayer = L.tileLayer(tileUrl, {
      subdomains: subdomains,
      maxZoom: 18,
      attribution: "&copy; OpenStreetMap &copy; CARTO"
    }).addTo(this.map);

    const mapContainer = document.getElementById("historical-map");
    if (mapContainer) {
      mapContainer.classList.remove('map-sepia-theme', 'map-dark-theme');
      if (styleKey === 'sepia') {
        mapContainer.classList.add('map-sepia-theme');
      } else if (styleKey === 'dark') {
        mapContainer.classList.add('map-dark-theme');
      }
    }

    // Update active button state on UI
    document.querySelectorAll(".map-theme-btn").forEach((btn) => {
      btn.classList.remove("bg-amber-950", "text-amber-200", "border-amber-700");
      btn.classList.add("bg-stone-900", "text-stone-400", "border-stone-800");
    });
    const activeBtn = document.getElementById(`tile-btn-${styleKey}`);
    if (activeBtn) {
      activeBtn.classList.add("bg-amber-950", "text-amber-200", "border-amber-700");
      activeBtn.classList.remove("bg-stone-900", "text-stone-400", "border-stone-800");
    }

    if (this.map) {
      this.map.invalidateSize();
    }
  }

  // Create category-specific SVG icon HTML
  getMarkerIconHtml(category, isSelected = false) {
    let iconSvg = "";
    let bgColor = "#b91c1c"; // default crimson
    let glowClass = isSelected ? "marker-pulse-active" : "";

    switch (category) {
      case "battle":
        bgColor = "#dc2626"; // red
        iconSvg = `<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>`;
        break;
      case "treaty":
        bgColor = "#d97706"; // amber gold
        iconSvg = `<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>`;
        break;
      case "famine":
        bgColor = "#451a03"; // burnt charcoal brown
        iconSvg = `<svg class="w-4 h-4 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>`;
        break;
      case "rebellion":
        bgColor = "#ea580c"; // flame orange
        iconSvg = `<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343a7.975 7.975 0 010 11.314z"/></svg>`;
        break;
      case "discovery":
        bgColor = "#2563eb"; // naval blue
        iconSvg = `<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>`;
        break;
      case "politics":
        bgColor = "#7c3aed"; // imperial purple
        iconSvg = `<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>`;
        break;
      case "freedom":
        bgColor = "#d97706"; // saffron
        iconSvg = `<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>`;
        break;
      case "independence":
        bgColor = "#059669"; // emerald green
        iconSvg = `<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"/></svg>`;
        break;
      default:
        bgColor = "#475569";
        iconSvg = `<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;
    }

    return `
      <div class="custom-historical-pin ${glowClass}" style="--pin-color: ${bgColor}">
        <div class="pin-head flex items-center justify-center shadow-lg" style="background: ${bgColor}; border: 2px solid #ffffff; width: 32px; height: 32px; border-radius: 50%;">
          ${iconSvg}
        </div>
        <div class="pin-needle" style="border-top-color: ${bgColor};"></div>
      </div>
    `;
  }

  renderAllMarkers() {
    TIMELINE_EVENTS.forEach((event) => {
      const customIcon = L.divIcon({
        className: `hist-marker-div marker-${event.id}`,
        html: this.getMarkerIconHtml(event.category, false),
        iconSize: [32, 40],
        iconAnchor: [16, 40],
        popupAnchor: [0, -36]
      });

      const marker = L.marker(event.coordinates, { icon: customIcon });

      // Build Rich Popup
      const popupHtml = `
        <div class="hist-popup font-sans text-stone-800 p-1 max-w-xs">
          <div class="flex items-center justify-between border-b border-amber-200 pb-1.5 mb-2">
            <span class="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-300">
              ${event.year} • ${event.category.toUpperCase()}
            </span>
            <span class="text-[11px] text-stone-500 font-mono">${event.coordinates[0].toFixed(2)}°N, ${event.coordinates[1].toFixed(2)}°E</span>
          </div>
          <h4 class="font-serif font-bold text-base leading-snug text-stone-900 mb-1">
            ${event.title}
          </h4>
          <p class="text-xs text-stone-600 mb-2 font-serif italic flex items-center gap-1">
            <svg class="w-3.5 h-3.5 text-stone-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/></svg>
            ${event.locationName}
          </p>
          <p class="text-xs text-stone-700 line-clamp-3 leading-relaxed mb-3">
            ${event.narrative.substring(0, 160)}...
          </p>
          <button onclick="window.app.scrollToEvent('${event.id}')" class="w-full text-center bg-stone-900 hover:bg-amber-900 text-amber-100 font-medium text-xs py-1.5 px-3 rounded shadow transition-colors flex items-center justify-center gap-1.5 cursor-pointer">
            <span>Read Full Chronicle</span>
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </button>
        </div>
      `;

      marker.bindPopup(popupHtml, {
        className: "custom-leaflet-popup",
        closeButton: true,
        maxWidth: 300
      });

      marker.on("click", () => {
        if (window.soundEngine) window.soundEngine.playClick();
        this.focusEvent(event.id, false);
        window.app.scrollToEvent(event.id);
      });

      marker.addTo(this.map);
      this.markers[event.id] = marker;
    });
  }

  // Draw historical routes (Vasco da Gama maritime approach, Dandi Salt March route)
  drawHistoricalRoutes() {
    this.routeLayerGroup.clearLayers();

    // Dandi Salt March Route (Ahmedabad to Dandi, 1930)
    const dandiRouteCoords = [
      [23.0617, 72.5800], // Sabarmati Ashram
      [22.9267, 72.6322], // Aslali
      [22.6916, 72.8634], // Nadiad
      [22.5645, 72.9289], // Anand
      [22.2587, 73.0028], // Kareli / Jambusar
      [21.7051, 72.9959], // Bharuch
      [21.1702, 72.8311], // Surat
      [20.8880, 72.8020]  // Dandi Beach
    ];

    const dandiPolyline = L.polyline(dandiRouteCoords, {
      color: "#d97706",
      weight: 3.5,
      dashArray: "6, 8",
      opacity: 0.85
    }).bindTooltip("<b>Salt Satyagraha Route (1930)</b><br>Sabarmati Ashram to Dandi Beach (240 Miles)", {
      sticky: true,
      className: "hist-tooltip"
    });
    this.routeLayerGroup.addLayer(dandiPolyline);

    // 1857 Uprising Axis (Barrackpore -> Meerut -> Delhi -> Kanpur -> Lucknow -> Jhansi -> Kalpi -> Gwalior -> Jagdishpur)
    const revolt1857Axis = [
      [22.7667, 88.3667], // Barrackpore
      [28.9845, 77.7064], // Meerut
      [28.6653, 77.2307], // Delhi
      [26.4499, 80.3319], // Kanpur
      [26.8587, 80.9287], // Lucknow
      [25.4484, 78.5685], // Jhansi
      [26.1264, 79.7340], // Kalpi
      [26.2183, 78.1828], // Gwalior
      [25.5647, 84.4100]  // Jagdishpur (Arrah/Bihar)
    ];

    const revoltPolyline = L.polyline(revolt1857Axis, {
      color: "#dc2626",
      weight: 2,
      dashArray: "4, 6",
      opacity: 0.5
    }).bindTooltip("<b>1857 War of Independence Epicenter Axis</b>", {
      sticky: true,
      className: "hist-tooltip"
    });
    this.routeLayerGroup.addLayer(revoltPolyline);
  }

  // Smooth camera flight and marker activation for scrollytelling
  focusEvent(eventId, openPopup = false) {
    const event = TIMELINE_EVENTS.find((e) => e.id === eventId);
    if (!event) return;

    // Reset previous active marker
    if (this.activeMarkerId && this.markers[this.activeMarkerId]) {
      const prevEvent = TIMELINE_EVENTS.find((e) => e.id === this.activeMarkerId);
      if (prevEvent) {
        const prevIcon = L.divIcon({
          className: `hist-marker-div marker-${prevEvent.id}`,
          html: this.getMarkerIconHtml(prevEvent.category, false),
          iconSize: [32, 40],
          iconAnchor: [16, 40],
          popupAnchor: [0, -36]
        });
        this.markers[this.activeMarkerId].setIcon(prevIcon);
      }
    }

    // Set new active marker
    this.activeMarkerId = eventId;
    const marker = this.markers[eventId];

    if (marker) {
      const activeIcon = L.divIcon({
        className: `hist-marker-div marker-${event.id} active-event-marker`,
        html: this.getMarkerIconHtml(event.category, true),
        iconSize: [40, 50],
        iconAnchor: [20, 50],
        popupAnchor: [0, -45]
      });
      marker.setIcon(activeIcon);

      // Smooth camera transition
      const targetZoom = Math.max(event.zoom || 8, 7);
      this.map.flyTo(event.coordinates, targetZoom, {
        animate: true,
        duration: 1.3,
        easeLinearity: 0.25
      });

      if (openPopup) {
        setTimeout(() => {
          marker.openPopup();
        }, 1200);
      }
    }

    // Update HUD overlay on map
    this.updateMapHUD(event);
  }

  // Update on-map Heads-Up-Display with event metrics
  updateMapHUD(event) {
    const hudYear = document.getElementById("hud-year");
    const hudTitle = document.getElementById("hud-title");
    const hudLocation = document.getElementById("hud-location");
    const hudCoords = document.getElementById("hud-coords");
    const hudEraTag = document.getElementById("hud-era");

    if (hudYear) hudYear.textContent = event.year;
    if (hudTitle) hudTitle.textContent = event.title;
    if (hudLocation) hudLocation.textContent = event.locationName;
    if (hudCoords) {
      hudCoords.textContent = `${event.coordinates[0].toFixed(3)}° N, ${event.coordinates[1].toFixed(3)}° E`;
    }
    if (hudEraTag) {
      const eraObj = HISTORICAL_ERAS.find(e => e.id === event.era);
      hudEraTag.textContent = eraObj ? eraObj.shortTitle : `Era ${event.era}`;
    }
  }

  // Load and render historical territory boundary polygons
  showEraTerritories(yearKey) {
    // If the currently active territory button was clicked again, toggle it off
    if (this.currentEraPresetKey === yearKey) {
      this.resetSubcontinentView();
      return;
    }

    this.territoryLayerGroup.clearLayers();
    const preset = MAP_ERA_PRESETS[yearKey];
    if (!preset) return;

    this.currentEraPresetKey = yearKey;

    preset.territories.forEach((t) => {
      const polygon = L.polygon(t.coords, {
        color: t.color,
        fillColor: t.color,
        fillOpacity: 0.22,
        weight: 2.5,
        dashArray: "5, 5"
      });

      polygon.bindTooltip(`<b>${t.name}</b><br><span class="text-xs text-stone-600">${preset.name}</span>`, {
        sticky: true,
        className: "hist-tooltip"
      });

      this.territoryLayerGroup.addLayer(polygon);
    });

    // Fly to regional center
    if (preset.center && preset.zoom) {
      this.map.flyTo(preset.center, preset.zoom, {
        animate: true,
        duration: 1.5
      });
    }

    // Update UI active buttons
    document.querySelectorAll(".era-layer-btn").forEach((btn) => {
      if (btn.getAttribute("data-year") === String(yearKey)) {
        btn.classList.add("bg-amber-900", "text-amber-100", "border-amber-600");
        btn.classList.remove("bg-stone-900/80", "text-stone-300");
      } else {
        btn.classList.remove("bg-amber-900", "text-amber-100", "border-amber-600");
        btn.classList.add("bg-stone-900/80", "text-stone-300");
      }
    });
  }

  resetSubcontinentView() {
    this.territoryLayerGroup.clearLayers();
    this.currentEraPresetKey = null;

    document.querySelectorAll(".era-layer-btn").forEach((btn) => {
      btn.classList.remove("bg-amber-900", "text-amber-100", "border-amber-600");
      btn.classList.add("bg-stone-900/80", "text-stone-300");
    });

    this.map.flyTo([22.5, 78.9], 5, {
      animate: true,
      duration: 1.2
    });
  }
}

window.historicalMap = new HistoricalMapController();
