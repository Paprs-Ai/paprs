"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────

const SPIN_DPS = 28;
const CYCLE_DEGREES = 360 * 2.5;
const SPHERE_R  = 260;
const CANVAS_W  = 730;
const CANVAS_H  = 710;
const CX = CANVAS_W / 2;
const CY = CANVAS_H / 2;

// ─── Node config ──────────────────────────────────────────────────────────────

interface SpherePoint {
  id: string;
  lat: number;
  lng: number;
  kind: "dot" | "pill";
  label?: string;
  activationProgress: number;
}

const PILL_SOURCE: [string, string, number, number][] = [
  ["nie",         "NIE Certificate",                 25,   0],
  ["tie",         "TIE Card",                        -5,   0],
  ["padron",      "Empadronamiento",                -18,  22],
  ["cita",        "Cita Previa",                     40,  30],  // ← band G visible early
  ["aeat",        "AEAT Notice",                    -32,   0],
  ["clve",        "Cl@ve PIN",                       10, 112],
  ["hacienda",    "Tax Residence",                  -45,  45],
  ["ss",          "Seguridad Social",               -18, 157],
  ["rental",      "Rental Contract",                -45, 135],
  ["iva",         "IVA Trimestral",                  40, 150],  // ← band G
  ["visa",        "Visa Status",                     -5, 180],
  ["sip",         "Health Card (SIP)",              -32,  60],
  ["nomina",      "Nómina",                          10,  67],
  ["cert",        "Digital Certificate",             25, 103],
  ["sede",        "Sede Electrónica",                -5, 135],
  ["fnmt",        "FNMT Cert",                      -32, 120],
  ["m030",        "Modelo 030",                      10,  22],
  ["pasaporte",   "Pasaporte",                       50,  60],  // ← band H visible early
  ["permtrab",    "Permiso de Trabajo",             -18, 112],
  ["beca",        "Beca MEC",                        40, 330],  // ← band G
  ["sepe",        "SEPE Appointment",               -18, 202],
  ["vida",        "Vida Laboral",                    10, 157],
  ["contrato",    "Contrato de Trabajo",             -5,  45],
  ["dgt",         "DGT License",                     25, 206],
  ["subsidio",    "Subsidio Paro",                  -45, 225],
  ["registro",    "Registro Civil",                  40,  90],  // ← band G
  ["bank",        "Bank Account",                    10, 202],
  ["extran",      "Extranjería File",                -5, 225],
  ["inss",        "INSS Pensión",                   -32, 180],
  ["renta",       "Declaración de Renta",            25, 155],
  ["numss",       "Número SS",                      -18,  67],
  ["autonomo",    "Autónomo Alta",                  -45, 315],
  ["m303",        "Modelo 303",                      10, 247],
  ["arraigo",     "Arraigo Social",                  -5, 315],
  ["larga",       "Larga Duración",                  25, 258],
  ["itv",         "ITV",                            -32, 240],
  ["imv",         "Ingreso Mínimo Vital",           -18, 292],
  ["matricula",   "Matrícula Escolar",               50, 180],  // ← band H
  ["ayto",        "Ayuntamiento",                   -18, 247],
  ["m100",        "Modelo 100",                      40, 210],  // ← band G
  ["reagrup",     "Reagrupación Familiar",           10, 337],
  ["consulate",   "Consulate Docs",                  -5,  90],
  ["certempresa", "Certificado Empresa",             25,  52],
  ["antecedentes","Antecedentes Penales",            10, 292],
  ["ibi",         "IBI",                             25, 310],
  ["convenio",    "Convenio Colectivo",             -18, 337],
  ["seghogar",    "Seguro del Hogar",                -5, 270],
  ["impveh",      "Impuesto Vehículo",               40, 270],  // ← band G
  ["libro",       "Libro de Familia",               -32, 300],
  ["gestor",      "Gestor Verificado",               50, 300],  // ← band H
];

const PILL_NODES: SpherePoint[] = PILL_SOURCE.map(([id, label, lat, lng], i) => ({
  id,
  label,
  lat,
  lng,
  kind: "pill" as const,
  activationProgress: 0.03 + (i / (PILL_SOURCE.length - 1)) * 0.93,
}));

function buildDotNodes(): SpherePoint[] {
  const N = 90;
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  return Array.from({ length: N }, (_, i) => {
    const y     = 1 - (i / (N - 1)) * 2;
    const r     = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = goldenAngle * i;
    const lat   = (Math.asin(Math.max(-1, Math.min(1, y))) * 180) / Math.PI;
    const lng   = ((Math.atan2(Math.sin(theta) * r, Math.cos(theta) * r) * 180) / Math.PI + 360) % 360;
    // Dot nodes activate early so the sphere silhouette is always visible
    return { id: `dot_${i}`, kind: "dot" as const, lat, lng, activationProgress: (i / N) * 0.88 };
  });
}

const ALL_NODES: SpherePoint[] = [...PILL_NODES, ...buildDotNodes()];

// ─── Pre-computed neighbor lists (max K=11 per node) ─────────────────────────

function angularDot(a: SpherePoint, b: SpherePoint): number {
  const la = (a.lat * Math.PI) / 180, lb = (b.lat * Math.PI) / 180;
  const dl = ((b.lng - a.lng) * Math.PI) / 180;
  return Math.sin(la) * Math.sin(lb) + Math.cos(la) * Math.cos(lb) * Math.cos(dl);
}

const MAX_K = 11;
const NEIGHBORS = new Map<string, string[]>(
  ALL_NODES.map(a => [
    a.id,
    ALL_NODES
      .filter(b => b.id !== a.id)
      .map(b    => ({ id: b.id, d: angularDot(a, b) }))
      .sort((x, y) => y.d - x.d)
      .slice(0, MAX_K)
      .map(x => x.id),
  ])
);

// ─── Node types and UI Components ─────────────────────────────────────────────

interface ProjNode {
  id: string;
  kind: "dot" | "pill";
  x: number;
  y: number;
  zIndex: number;
  opacity: number;
  scale: number;
  blur: number;
  isActive: boolean;
  label?: string;
}

interface OrbitEdge {
  id: string;
  x1: number; y1: number;
  x2: number; y2: number;
  opacity: number; width: number; active: boolean;
}

const DotNode = ({ opacity, scale, blur, isActive }: { opacity: number; scale: number; blur: number; isActive: boolean }) => (
  <div
    className="pointer-events-none relative"
    style={{
      width: 8, height: 8,
      opacity,
      transform: `scale(${scale})`,
      filter: blur > 0 ? `blur(${blur}px)` : undefined,
    }}
  >
    <div style={{
      width: 8, height: 8, borderRadius: "50%",
      background: isActive
        ? "radial-gradient(circle at 35% 35%, #ffffff, #000000)"
        : "#d1d5db",
      boxShadow: isActive ? "0 0 8px rgba(0,0,0,0.5)" : undefined,
    }} />
  </div>
);

const PillNode = ({ opacity, scale, blur, isActive, label }: { opacity: number; scale: number; blur: number; isActive: boolean; label?: string }) => (
  <div
    className="pointer-events-none relative flex items-center justify-center"
    style={{
      opacity,
      transform: `scale(${scale})`,
      filter: blur > 0 ? `blur(${blur}px)` : undefined,
    }}
  >
    <div
      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[9px] font-bold uppercase tracking-wider whitespace-nowrap"
      style={isActive ? {
        background: "rgba(0,0,0,0.06)",
        border:    "1px solid #000000",
        color:     "#000000",
        boxShadow: "0 0 10px rgba(0,0,0,0.12)",
      } : {
        background: "rgba(241,245,249,0.85)",
        border:    "1px solid rgba(203,213,225,0.65)",
        color:     "#94a3b8",
      }}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isActive ? "animate-ping" : ""}`}
        style={{ backgroundColor: isActive ? "#000000" : "#cbd5e1" }}
      />
      {label}
    </div>
  </div>
);

// ─── Main component ───────────────────────────────────────────────────────────

export default function AIOrbit() {
  const [orbitState, setOrbitState] = useState<{ nodes: ProjNode[]; edges: OrbitEdge[] }>({ nodes: [], edges: [] });

  // ── Scale to fit parent column ──────────────────────────────────────────
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useLayoutEffect(() => {
    const parent = wrapRef.current?.parentElement;
    if (!parent) return;
    const update = () => setScale(Math.min(1, parent.clientWidth / CANVAS_W));
    update();
    const obs = new ResizeObserver(update);
    obs.observe(parent);
    return () => obs.disconnect();
  }, []);

  // ── Animation loop ──────────────────────────────────────────────────────
  useEffect(() => {
    let animId: number;
    let angle    = 0;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const delta = now - lastTime;
      lastTime    = now;
      angle      += (delta / 1000) * SPIN_DPS;

      const p = (angle % CYCLE_DEGREES) / CYCLE_DEGREES;
      const liveK = Math.max(2, Math.round(2 + p * (MAX_K - 2)));

      type Proj = {
        sx: number; sy: number;
        depth: number; opacity: number;
        scale: number; blur: number;
        isActive: boolean;
      };
      const proj      = new Map<string, Proj>();
      const activeIds = new Set<string>();

      for (const sn of ALL_NODES) {
        const latR = (sn.lat * Math.PI) / 180;
        const lngR = ((sn.lng + angle) * Math.PI) / 180;

        const sx = SPHERE_R * Math.cos(latR) * Math.cos(lngR);
        const sy = SPHERE_R * Math.sin(latR);
        const sz = SPHERE_R * Math.cos(latR) * Math.sin(lngR);

        const depth = (sz + SPHERE_R) / (2 * SPHERE_R);
        const depthScale = 0.52 + depth * 0.48;
        const blur       = depth < 0.22 ? (0.22 - depth) * 5 : 0;
        const isActive   = p >= sn.activationProgress;

        // ── Per-kind opacity rules ──────────────────────────────────────
        let baseOpacity: number;

        if (sn.kind === "dot") {
          if (isActive) {
            // Smooth fade-in from ghost → full over a 4% progress window
            const t    = Math.min(1, (p - sn.activationProgress) / 0.04);
            baseOpacity = 0.10 + t * 0.90;
          } else {
            // Always faintly visible so the sphere silhouette shows from the start
            baseOpacity = 0.10;
          }
        } else {
          // Pill nodes: completely hidden until activated, then smooth pop-in
          if (isActive) {
            const t    = Math.min(1, (p - sn.activationProgress) / 0.035);
            baseOpacity = t;
          } else {
            baseOpacity = 0;
          }
        }

        // Depth-based dimming (back-of-sphere fade)
        const finalOpacity = baseOpacity * (0.38 + depth * 0.62);

        proj.set(sn.id, { sx, sy, depth, opacity: finalOpacity, scale: depthScale, blur, isActive });
        if (isActive) activeIds.add(sn.id);
      }

      // ── Build nodes list ──────────────────────────────────────────────
      const PILL_W = 60; // half of ~120px pill width, centers pill on sphere point
      const PILL_H = 14; // half of ~28px pill height

      const nextNodes: ProjNode[] = ALL_NODES.map(sn => {
        const pp   = proj.get(sn.id)!;
        const zIdx = Math.round(pp.depth * 900);
        return {
          id: sn.id,
          kind: sn.kind,
          x: sn.kind === "dot" ? CX + pp.sx - 4 : CX + pp.sx - PILL_W,
          y: sn.kind === "dot" ? CY + pp.sy - 4 : CY + pp.sy - PILL_H,
          zIndex: zIdx,
          opacity:  pp.opacity,
          scale:    pp.scale,
          blur:     pp.blur,
          isActive: pp.isActive,
          label:    sn.label,
        };
      });

      // ── Build edges: only between active nodes, capped at liveK ──────
      const nextEdges: OrbitEdge[] = [];
      const seen = new Set<string>();

      for (const id of NEIGHBORS.keys()) {
        if (!activeIds.has(id)) continue; // skip inactive nodes entirely

        const pa        = proj.get(id)!;
        const neighbors = NEIGHBORS.get(id)!;
        let   drawn     = 0;

        for (const nid of neighbors) {
          if (drawn >= liveK) break;
          if (!activeIds.has(nid)) continue;

          const key = id < nid ? `${id}--${nid}` : `${nid}--${id}`;
          if (seen.has(key)) { drawn++; continue; }
          seen.add(key);

          const pb         = proj.get(nid)!;
          const avgDepth   = (pa.depth + pb.depth) / 2;
          const avgOpacity = (pa.opacity + pb.opacity) / 2;

          nextEdges.push({
            id:  key,
            x1:  CX + pa.sx, y1: CY + pa.sy,
            x2:  CX + pb.sx, y2: CY + pb.sy,
            active:  true,
            width:   Math.max(0.4, 1.1 * avgDepth),
            opacity: avgOpacity * 0.45,
          });
          drawn++;
        }
      }

      setOrbitState({ nodes: nextNodes, edges: nextEdges });
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{ width: CANVAS_W * scale, height: CANVAS_H * scale, flexShrink: 0 }}
    >
      <div
        className="ai-orbit relative"
        style={{
          background:       "transparent",
          width:            CANVAS_W,
          height:           CANVAS_H,
          transform:        `scale(${scale})`,
          transformOrigin:  "top left",
        }}
      >
        <svg
          className="pointer-events-none absolute inset-0 z-0 h-full w-full"
          viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
          aria-hidden="true"
        >
          {orbitState.edges.map(edge => (
            <line
              key={edge.id}
              x1={edge.x1} y1={edge.y1}
              x2={edge.x2} y2={edge.y2}
              stroke="#000000"
              strokeWidth={edge.width}
              strokeOpacity={edge.opacity}
            />
          ))}
        </svg>

        <div className="absolute inset-0 pointer-events-none z-10">
          {orbitState.nodes.map(node => {
            const isDot = node.kind === "dot";
            return (
              <div
                key={node.id}
                style={{
                  position: "absolute",
                  left: node.x,
                  top: node.y,
                  zIndex: node.zIndex,
                }}
              >
                {isDot ? (
                  <DotNode
                    opacity={node.opacity}
                    scale={node.scale}
                    blur={node.blur}
                    isActive={node.isActive}
                  />
                ) : (
                  <PillNode
                    opacity={node.opacity}
                    scale={node.scale}
                    blur={node.blur}
                    isActive={node.isActive}
                    label={node.label}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
