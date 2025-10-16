export const OpenStreetMapBundle = () => {
  // Check if Leaflet CSS is already loaded
  if (!document.querySelector(`link[href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"]`)) {
    const cssLeaflet = document.createElement("link");
    cssLeaflet.rel = "stylesheet";
    cssLeaflet.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    cssLeaflet.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
    document.head.appendChild(cssLeaflet);
  }

  // Check if Leaflet JS is already loaded
  if (!document.querySelector(`script[src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"]`)) {
    const jsLeaflet = document.createElement("script");
    jsLeaflet.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    jsLeaflet.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=";
    jsLeaflet.async = true;
    document.body.appendChild(jsLeaflet);
  }

  // Check if Geosearch CSS is already loaded
  if (!document.querySelector(`link[href="https://unpkg.com/leaflet-geosearch@3.0.0/dist/geosearch.css"]`)) {
    const cssGeosearch = document.createElement("link");
    cssGeosearch.rel = "stylesheet";
    cssGeosearch.href = "https://unpkg.com/leaflet-geosearch@3.0.0/dist/geosearch.css";
    document.head.appendChild(cssGeosearch);
  }

  // Check if Geosearch JS is already loaded
  if (!document.querySelector(`script[src="https://unpkg.com/leaflet-geosearch@latest/dist/bundle.min.js"]`)) {
    const jsGeosearch = document.createElement("script");
    jsGeosearch.src = "https://unpkg.com/leaflet-geosearch@latest/dist/bundle.min.js";
    jsGeosearch.async = true;
    document.body.appendChild(jsGeosearch);
  }
}