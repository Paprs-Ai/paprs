"use client";

import React, { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography, Marker, Line } from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const hubs = {
  spain:       { name: "Spain",       coords: [-3.7492, 40.4637] as [number, number], status: "active",  label: "Available Now" },
  switzerland: { name: "Switzerland", coords: [8.2275,  46.8182] as [number, number], status: "soon",    label: "Q1 2026" },
  germany:     { name: "Germany",     coords: [10.4515, 51.1657] as [number, number], status: "soon",    label: "Q1 2026" },
  france:      { name: "France",      coords: [2.2137,  46.2276] as [number, number], status: "soon",    label: "Q1 2026" },
  italy:       { name: "Italy",       coords: [12.5674, 41.8719] as [number, number], status: "roadmap", label: "Q3 2026" },
  portugal:    { name: "Portugal",    coords: [-8.2245, 39.3999] as [number, number], status: "roadmap", label: "Q3 2026" },
  netherlands: { name: "Netherlands", coords: [5.2913,  52.1326] as [number, number], status: "roadmap", label: "Q4 2026" },
  austria:     { name: "Austria",     coords: [14.5501, 47.5162] as [number, number], status: "roadmap", label: "Q4 2026" },
};

const europeanCountries = [
  "Spain", "Portugal", "France", "Italy", "Switzerland", "Austria", "Germany",
  "Belgium", "Netherlands", "Luxembourg", "United Kingdom", "Ireland",
  "Denmark", "Norway", "Sweden", "Finland", "Poland", "Czechia", "Slovakia",
  "Hungary", "Romania", "Bulgaria", "Greece", "Croatia", "Slovenia", "Bosnia and Herz.",
  "Serbia", "Montenegro", "Albania", "North Macedonia", "Kosovo", "Ukraine", "Belarus",
  "Estonia", "Latvia", "Lithuania", "Moldova", "Iceland"
];

const targetCountries = new Set(Object.values(hubs).map(h => h.name));

export default function CountryMap() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setMounted(true), 0);
    return () => window.clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full h-full">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 480, center: [8, 50] }}
        className="w-full h-full select-none"
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const name = geo.properties.name;
              const isEurope = europeanCountries.includes(name);

              let fill = "#F7F4EE";
              let stroke = "transparent";
              let opacity = 1;

              if (isEurope) {
                fill = "#EDE8DE";
                stroke = "#C4B9A8";

                if (name === "Spain") {
                  fill = "#16A34A"; opacity = 0.75;
                } else if (name === "Switzerland" || name === "Germany" || name === "France") {
                  fill = "#16A34A"; opacity = 0.35;
                } else if (name === "Italy" || name === "Portugal" || name === "Netherlands" || name === "Austria") {
                  fill = "#16A34A"; opacity = 0.12;
                }
              }

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: { fill, stroke, strokeWidth: 0.6, opacity, outline: "none" },
                    hover: { fill: isEurope ? "#16A34A" : fill, stroke: isEurope ? "#C4B9A8" : stroke, strokeWidth: 0.6, opacity: isEurope ? 0.35 : opacity, outline: "none", cursor: isEurope ? "pointer" : "default" },
                    pressed: { fill, stroke, strokeWidth: 0.6, opacity, outline: "none" }
                  }}
                />
              );
            })
          }
        </Geographies>

        {/* Connection lines from Spain */}
        {(["switzerland", "france", "germany"] as const).map(key => (
          <Line key={key} from={hubs.spain.coords} to={hubs[key].coords}
            stroke="#16A34A" strokeWidth={1.4} strokeDasharray="4,4"
            className="animate-[dash_4s_linear_infinite]" opacity={0.7} />
        ))}
        {(["italy", "portugal", "netherlands", "austria"] as const).map(key => (
          <Line key={key} from={hubs.spain.coords} to={hubs[key].coords}
            stroke="#16A34A" strokeWidth={0.8} strokeDasharray="3,5" opacity={0.25} />
        ))}

        {/* Markers */}
        {Object.entries(hubs).map(([key, hub]) => {
          const isActive = hub.status === "active";
          const isSoon = hub.status === "soon";
          const showLabel = isActive || isSoon;

          return (
            <Marker key={key} coordinates={hub.coords}>
              {isActive && (
                <circle r={12} fill="none" stroke="#16A34A" strokeWidth={1.5} className="animate-ping opacity-40" />
              )}
              <circle
                r={isActive ? 5 : isSoon ? 3.5 : 2.5}
                fill={isActive ? "#16A34A" : isSoon ? "#16A34A" : "#A8A09A"}
                fillOpacity={isActive ? 1 : isSoon ? 0.75 : 0.5}
                stroke="#F7F4EE"
                strokeWidth={1.5}
              />
              {showLabel && (
                <>
                  <text textAnchor="middle" y={-16}
                    style={{ fontFamily: "sans-serif", fontSize: "7.5px", fontWeight: 700, fill: "#1A1814" }}>
                    {hub.name}
                  </text>
                  <text textAnchor="middle" y={-7}
                    style={{ fontFamily: "monospace", fontSize: "5px", fontWeight: 700, letterSpacing: "0.06em", fill: isActive ? "#16A34A" : "#D4820A", textTransform: "uppercase" }}>
                    {hub.label}
                  </text>
                </>
              )}
            </Marker>
          );
        })}
      </ComposableMap>

      <style jsx global>{`@keyframes dash { to { stroke-dashoffset: -20; } }`}</style>
    </div>
  );
}
