"use client";

import React, { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography, Marker, Line } from "react-simple-maps";

// High-resolution 1:50m TopoJSON for detailed, sharp country boundaries
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";

const hubs = {
  spain:       { name: "Barcelona, Spain", flag: "🇪🇸", coords: [2.1699, 41.3879] as [number, number], status: "hq",      label: "Paprs HQ · Live Now" },
  switzerland: { name: "Switzerland",      flag: "🇨🇭", coords: [8.2275, 46.8182] as [number, number], status: "soon",    label: "Q1 2026" },
  germany:     { name: "Germany",          flag: "🇩🇪", coords: [10.4515, 51.1657] as [number, number], status: "soon",    label: "Q1 2026" },
  france:      { name: "France",           flag: "🇫🇷", coords: [2.2137, 46.2276] as [number, number], status: "soon",    label: "Q1 2026" },
  italy:       { name: "Italy",            flag: "🇮🇹", coords: [12.5674, 41.8719] as [number, number], status: "roadmap", label: "Q2 2026" },
  portugal:    { name: "Portugal",         flag: "🇵🇹", coords: [-8.2245, 39.3999] as [number, number], status: "roadmap", label: "Q2 2026" },
  netherlands: { name: "Netherlands",      flag: "🇳🇱", coords: [5.2913, 52.1326] as [number, number], status: "roadmap", label: "Q3 2026" },
  austria:     { name: "Austria",          flag: "🇦🇹", coords: [14.5501, 47.5162] as [number, number], status: "roadmap", label: "Q3 2026" },
};

const europeanCountries = [
  "Spain", "Portugal", "France", "Italy", "Switzerland", "Austria", "Germany",
  "Belgium", "Netherlands", "Luxembourg", "United Kingdom", "Ireland",
  "Denmark", "Norway", "Sweden", "Finland", "Poland", "Czechia", "Slovakia",
  "Hungary", "Romania", "Bulgaria", "Greece", "Croatia", "Slovenia", "Bosnia and Herz.",
  "Serbia", "Montenegro", "Albania", "North Macedonia", "Kosovo", "Ukraine", "Belarus",
  "Estonia", "Latvia", "Lithuania", "Moldova", "Iceland"
];

export default function CountryMap() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setMounted(true), 0);
    return () => window.clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full h-full relative select-none">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 620, center: [4, 46.5] }}
        className="w-full h-full select-none"
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const name = geo.properties.name;
              const isEurope = europeanCountries.includes(name);

              let fill = "#FFFFFF";
              let stroke = "#E2E8F0";
              let strokeWidth = 0.5;
              let opacity = 0.5;

              if (isEurope) {
                fill = "#FAFAFA";
                stroke = "#CBD5E1";
                strokeWidth = 0.6;
                opacity = 0.7;

                if (name === "Spain") {
                  fill = "#09090B";
                  stroke = "#000000";
                  strokeWidth = 1.2;
                  opacity = 0.92;
                } else if (name === "Switzerland" || name === "Germany" || name === "France") {
                  fill = "#18181B";
                  stroke = "#27272A";
                  strokeWidth = 0.8;
                  opacity = 0.42;
                } else if (name === "Italy" || name === "Portugal" || name === "Netherlands" || name === "Austria") {
                  fill = "#27272A";
                  stroke = "#52525B";
                  strokeWidth = 0.7;
                  opacity = 0.22;
                }
              }

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: { fill, stroke, strokeWidth, opacity, outline: "none" },
                    hover: { fill: isEurope ? "#000000" : fill, stroke: isEurope ? "#71717A" : stroke, strokeWidth: 0.8, opacity: isEurope ? 0.45 : opacity, outline: "none", cursor: isEurope ? "pointer" : "default" },
                    pressed: { fill, stroke, strokeWidth, opacity, outline: "none" }
                  }}
                />
              );
            })
          }
        </Geographies>

        {/* Connection lines from Barcelona HQ to European hubs */}
        {(["switzerland", "france", "germany"] as const).map((key) => (
          <Line
            key={key}
            from={hubs.spain.coords}
            to={hubs[key].coords}
            stroke="#000000"
            strokeWidth={1.5}
            strokeDasharray="4,4"
            className="animate-[dash_4s_linear_infinite]"
            opacity={0.75}
          />
        ))}
        {(["italy", "portugal", "netherlands", "austria"] as const).map((key) => (
          <Line
            key={key}
            from={hubs.spain.coords}
            to={hubs[key].coords}
            stroke="#000000"
            strokeWidth={1}
            strokeDasharray="3,5"
            opacity={0.35}
          />
        ))}

        {/* Barcelona HQ Marker */}
        <Marker coordinates={hubs.spain.coords}>
          <circle r={12} fill="none" stroke="#000000" strokeWidth={1.5} className="animate-ping opacity-35" />
          <circle r={4} fill="#000000" stroke="#FFFFFF" strokeWidth={1.8} />
          <foreignObject x={-65} y={-22} width={130} height={20}>
            <div className="flex items-center justify-center text-center px-2 py-0.5 bg-white/90 backdrop-blur-xs rounded-full shadow-xs border border-black/15 select-none pointer-events-none mx-auto w-fit">
              <span className="font-mono text-[6.5px] font-extrabold uppercase tracking-wider text-black whitespace-nowrap text-center">
                PAPRS HQ · BARCELONA
              </span>
            </div>
          </foreignObject>
        </Marker>

        {/* Expansion Hub Markers (Q1 > Q2 > Q3 Visual Hierarchy) */}
        {Object.entries(hubs).map(([key, hub]) => {
          if (key === "spain") return null;

          const isQ1 = hub.label === "Q1 2026";
          const isQ2 = hub.label === "Q2 2026";

          const width = isQ1 ? 110 : isQ2 ? 96 : 84;
          const height = isQ1 ? 18 : isQ2 ? 16 : 15;
          const xOffset = -width / 2;
          const yOffset = isQ1 ? -20 : isQ2 ? -18 : -16;

          const dotRadius = isQ1 ? 3.5 : isQ2 ? 2.8 : 2.2;
          const dotFill = isQ1 ? "#000000" : isQ2 ? "#3F3F46" : "#71717A";

          const containerStyle = isQ1
            ? "bg-white/85 border-black/20 text-black px-2 py-0.5 text-[6px] font-bold"
            : isQ2
            ? "bg-white/75 border-zinc-300 text-zinc-800 px-1.5 py-0.5 text-[5.2px] font-bold"
            : "bg-white/65 border-zinc-300 text-zinc-700 px-1.5 py-0.25 text-[4.6px] font-semibold";

          return (
            <Marker key={key} coordinates={hub.coords}>
              <circle
                r={dotRadius}
                fill={dotFill}
                fillOpacity={isQ1 ? 0.85 : isQ2 ? 0.75 : 0.6}
                stroke="#FFFFFF"
                strokeWidth={1.2}
              />
              <foreignObject x={xOffset} y={yOffset} width={width} height={height}>
                <div className={`flex items-center justify-center text-center rounded-full backdrop-blur-xs shadow-xs border select-none pointer-events-none mx-auto w-fit ${containerStyle}`}>
                  <span className="font-mono uppercase tracking-wider whitespace-nowrap text-center">
                    {hub.name.toUpperCase()} · {hub.label}
                  </span>
                </div>
              </foreignObject>
            </Marker>
          );
        })}
      </ComposableMap>

      <style jsx global>{`@keyframes dash { to { stroke-dashoffset: -20; } }`}</style>
    </div>
  );
}
