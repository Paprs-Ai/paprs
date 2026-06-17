"use client";

import React, { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography, Marker, Line } from "react-simple-maps";

// Standard highly reliable global CDN for world map topology
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Coordinates for hubs [Longitude, Latitude]
const hubs = {
  spain: { name: "Spain", coords: [-3.7492, 40.4637] as [number, number], status: "active", label: "Available Now" },
  switzerland: { name: "Switzerland", coords: [8.2275, 46.8182] as [number, number], status: "soon", label: "Q1 2026" },
  france: { name: "France", coords: [2.2137, 46.2276] as [number, number], status: "roadmap", label: "Q3 2026" },
  germany: { name: "Germany", coords: [10.4515, 51.1657] as [number, number], status: "roadmap", label: "Q4 2026" },
  netherlands: { name: "Netherlands", coords: [5.2913, 52.1326] as [number, number], status: "roadmap", label: "Q4 2026" },
  austria: { name: "Austria", coords: [14.5501, 47.5162] as [number, number], status: "roadmap", label: "2027" }
};

// Filter list to keep Europe visible while fading other continents
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

  if (!mounted) {
    return (
      <div className="w-full max-w-3xl mx-auto aspect-[4/3] bg-white rounded-lg border border-slate-200 flex items-center justify-center">
        <span className="font-mono text-xs text-[#94A3B8] animate-pulse">Loading map telemetry...</span>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-3xl mx-auto aspect-[4/3] bg-white rounded-lg border border-slate-200 overflow-hidden shadow-2xl shadow-slate-300/40">

      {/* Map Canvas */}
      <div className="w-full h-full flex items-center justify-center">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 560,
            center: [10, 50] // Center projection over Europe (10E, 50N)
          }}
          className="w-full h-full select-none"
        >
          {/* Countries Geographies */}
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const name = geo.properties.name;
                const isEurope = europeanCountries.includes(name);
                
                // Color formatting based on region target
                let fill = "#F8FAFC"; // Fade non-Europe into background
                let stroke = "transparent";
                let opacity = 1;

                if (isEurope) {
                  fill = "#F1F5F9";
                  stroke = "#E2E8F0";
                  
                  if (name === hubs.spain.name) {
                    fill = "#16A34A";
                    opacity = 0.85;
                  } else if (name === hubs.switzerland.name) {
                    fill = "#16A34A";
                    opacity = 0.5;
                  } else if (
                    name === hubs.france.name || 
                    name === hubs.germany.name || 
                    name === hubs.netherlands.name || 
                    name === hubs.austria.name
                  ) {
                    fill = "#16A34A";
                    opacity = 0.20;
                  }
                }

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      default: { fill, stroke, strokeWidth: 0.8, opacity, outline: "none" },
                      hover: { fill: isEurope ? "#16A34A" : fill, stroke: isEurope ? "#16A34A" : stroke, strokeWidth: 0.8, opacity: isEurope ? 0.3 : opacity, outline: "none", cursor: isEurope ? "pointer" : "default" },
                      pressed: { fill, stroke, strokeWidth: 0.8, opacity, outline: "none" }
                    }}
                  />
                );
              })
            }
          </Geographies>

          {/* Tracer connection lines from Spain to other hubs */}
          <Line
            from={hubs.spain.coords}
            to={hubs.switzerland.coords}
            stroke="#16A34A"
            strokeWidth={1.5}
            strokeDasharray="4, 4"
            className="animate-[dash_4s_linear_infinite]"
          />
          <Line
            from={hubs.spain.coords}
            to={hubs.france.coords}
            stroke="#16A34A"
            strokeWidth={1.2}
            strokeDasharray="4, 4"
            opacity={0.3}
          />
          <Line
            from={hubs.spain.coords}
            to={hubs.germany.coords}
            stroke="#16A34A"
            strokeWidth={1.2}
            strokeDasharray="4, 4"
            opacity={0.3}
          />
          <Line
            from={hubs.spain.coords}
            to={hubs.netherlands.coords}
            stroke="#16A34A"
            strokeWidth={1.2}
            strokeDasharray="4, 4"
            opacity={0.3}
          />
          <Line
            from={hubs.spain.coords}
            to={hubs.austria.coords}
            stroke="#16A34A"
            strokeWidth={1.2}
            strokeDasharray="4, 4"
            opacity={0.3}
          />

          {/* Markers for country hubs */}
          {Object.entries(hubs).map(([key, hub]) => {
            const isActive = hub.status === "active";
            const isSoon = hub.status === "soon";

            return (
              <Marker key={key} coordinates={hub.coords}>
                {/* Active Hub animation ring */}
                {isActive && (
                  <circle
                    r={8}
                    fill="none"
                    stroke="#16A34A"
                    strokeWidth={1.5}
                    className="animate-ping opacity-60"
                  />
                )}
                {/* Hub dot */}
                <circle
                  r={isActive ? 4 : isSoon ? 3.5 : 3}
                  fill={isActive ? "#16A34A" : isSoon ? "#16A34A" : "#94A3B8"}
                  stroke="#FFFFFF"
                  strokeWidth={1}
                />
                {/* Country label */}
                <text
                  textAnchor="middle"
                  y={-14}
                  className="font-syne font-bold text-[7px] fill-[#0F172A] pointer-events-none"
                >
                  {hub.name}
                </text>
                <text
                  textAnchor="middle"
                  y={-6}
                  className={`font-mono text-[5px] uppercase font-bold tracking-wider pointer-events-none ${
                    isActive ? "fill-[#16A34A]" : isSoon ? "fill-[#16A34A]" : "fill-slate-400"
                  }`}
                >
                  {hub.label}
                </text>
              </Marker>
            );
          })}
        </ComposableMap>
      </div>

      <style jsx global>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -20;
          }
        }
      `}</style>
    </div>
  );
}
