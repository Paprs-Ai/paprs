"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  ReactFlow,
  useNodesState,
  Node,
  Handle,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

// ─── Constants ────────────────────────────────────────────────────────────────

const SPIN_DPS = 8;
const SPHERE_R  = 150;
const CANVAS_W  = 500;
const CANVAS_H  = 480;
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

const PILL_NODES: SpherePoint[] = [
  { id: "nie",       kind: "pill", label: "NIE Certificate",       lat:  24, lng:   0, activationProgress: 0.06 },
  { id: "tie",       kind: "pill", label: "TIE Card",              lat:  -4, lng:  26, activationProgress: 0.10 },
  { id: "padron",    kind: "pill", label: "Empadronamiento",       lat: -28, lng:  52, activationProgress: 0.14 },
  { id: "cita",      kind: "pill", label: "Cita Previa",           lat:  42, lng:  78, activationProgress: 0.18 },
  { id: "cert",      kind: "pill", label: "Digital Certificate",   lat:  50, lng: 104, activationProgress: 0.22 },
  { id: "clve",      kind: "pill", label: "Cl@ve PIN",             lat:  14, lng: 130, activationProgress: 0.26 },
  { id: "ss",        kind: "pill", label: "Seguridad Social",      lat: -10, lng: 156, activationProgress: 0.30 },
  { id: "sip",       kind: "pill", label: "Health Card",           lat: -42, lng: 182, activationProgress: 0.34 },
  { id: "vida",      kind: "pill", label: "Vida Laboral",          lat:  28, lng: 208, activationProgress: 0.38 },
  { id: "sepe",      kind: "pill", label: "SEPE Appointment",      lat: -18, lng: 234, activationProgress: 0.42 },
  { id: "hacienda",  kind: "pill", label: "Tax Residence",         lat: -50, lng: 260, activationProgress: 0.46 },
  { id: "m030",      kind: "pill", label: "Modelo 030",            lat:   8, lng: 286, activationProgress: 0.50 },
  { id: "m303",      kind: "pill", label: "Modelo 303",            lat:  36, lng: 312, activationProgress: 0.54 },
  { id: "m100",      kind: "pill", label: "Modelo 100",            lat:  60, lng: 338, activationProgress: 0.58 },
  { id: "autonomo",  kind: "pill", label: "Autonomo Alta",         lat: -60, lng:  14, activationProgress: 0.62 },
  { id: "aeat",      kind: "pill", label: "AEAT Notice",           lat: -34, lng:  92, activationProgress: 0.66 },
  { id: "dgt",       kind: "pill", label: "DGT License",           lat:  66, lng: 166, activationProgress: 0.70 },
  { id: "bank",      kind: "pill", label: "Bank Account",          lat:  16, lng: 244, activationProgress: 0.74 },
  { id: "rental",    kind: "pill", label: "Rental Contract",       lat: -64, lng: 318, activationProgress: 0.78 },
  { id: "gestor",    kind: "pill", label: "Gestor Verified",       lat: -22, lng: 348, activationProgress: 0.82 },
  { id: "visa",      kind: "pill", label: "Visa Status",           lat: -58, lng: 198, activationProgress: 0.86 },
  { id: "extran",    kind: "pill", label: "Extranjeria File",      lat:   2, lng: 330, activationProgress: 0.90 },
  { id: "registro",  kind: "pill", label: "Registro Civil",        lat:  48, lng:  42, activationProgress: 0.94 },
  { id: "consulate", kind: "pill", label: "Consulate Docs",        lat: -12, lng: 116, activationProgress: 0.97 },
];

function buildDotNodes(): SpherePoint[] {
  const N = 48;
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  return Array.from({ length: N }, (_, i) => {
    const y   = 1 - (i / (N - 1)) * 2;
    const r   = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = goldenAngle * i;
    const lat = (Math.asin(Math.max(-1, Math.min(1, y))) * 180) / Math.PI;
    const lng = ((Math.atan2(Math.sin(theta) * r, Math.cos(theta) * r) * 180) / Math.PI + 360) % 360;
    return { id: `dot_${i}`, kind: "dot" as const, lat, lng, activationProgress: 0.04 + (i / N) * 0.92 };
  });
}

const ALL_NODES: SpherePoint[] = [...PILL_NODES, ...buildDotNodes()];

// ─── Nearest-neighbor graph (pre-computed at module load) ─────────────────────

function angularDot(a: SpherePoint, b: SpherePoint): number {
  const la = (a.lat * Math.PI) / 180, lb = (b.lat * Math.PI) / 180;
  const dl = ((b.lng - a.lng) * Math.PI) / 180;
  return Math.sin(la) * Math.sin(lb) + Math.cos(la) * Math.cos(lb) * Math.cos(dl);
}

const NEIGHBORS = new Map<string, string[]>(
  ALL_NODES.map(a => [
    a.id,
    ALL_NODES
      .filter(b => b.id !== a.id)
      .map(b    => ({ id: b.id, d: angularDot(a, b) }))
      .sort((x, y) => y.d - x.d)
      .slice(0, 7)
      .map(x => x.id),
  ])
);

// ─── Node components ──────────────────────────────────────────────────────────

const hStyle = { top: "50%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0, width: 1, height: 1 } as const;

type ND = { opacity: number; scale: number; blur: number; isActive: boolean; label?: string };
type OrbitEdge = { id: string; x1: number; y1: number; x2: number; y2: number; opacity: number; width: number; active: boolean };

const DotNode = ({ data: { opacity, scale, blur, isActive } }: { data: ND }) => (
  <div
    className="pointer-events-none relative"
    style={{ width: 8, height: 8, opacity, transform: `scale(${scale})`, filter: blur > 0 ? `blur(${blur}px)` : undefined }}
  >
    <Handle type="target"  position={Position.Top}    style={hStyle} />
    <Handle type="source"  position={Position.Bottom} style={hStyle} />
    <div style={{
      width: 8, height: 8, borderRadius: "50%",
      background: isActive
        ? "radial-gradient(circle at 35% 35%, #4ade80, #15803d)"
        : "#d1d5db",
      boxShadow: isActive ? "0 0 8px rgba(22,163,74,0.55)" : undefined,
    }} />
  </div>
);

const PillNode = ({ data: { opacity, scale, blur, isActive, label } }: { data: ND }) => (
  <div
    className="pointer-events-none relative flex items-center justify-center"
    style={{ opacity, transform: `scale(${scale})`, filter: blur > 0 ? `blur(${blur}px)` : undefined }}
  >
    <Handle type="target"  position={Position.Top}    style={hStyle} />
    <Handle type="source"  position={Position.Bottom} style={hStyle} />
    <div
      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[9px] font-bold uppercase tracking-wider whitespace-nowrap"
      style={isActive ? {
        background: "rgba(22,163,74,0.09)",
        border:    "1px solid rgba(22,163,74,0.40)",
        color:     "#16A34A",
        boxShadow: "0 0 10px rgba(22,163,74,0.18)",
      } : {
        background: "rgba(241,245,249,0.80)",
        border:    "1px solid rgba(203,213,225,0.60)",
        color:     "#94a3b8",
      }}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isActive ? "animate-ping" : ""}`}
        style={{ backgroundColor: isActive ? "#16A34A" : "#cbd5e1" }}
      />
      {label}
    </div>
  </div>
);

const nodeTypes = { dot: DotNode, pill: PillNode };

// ─── Main component ───────────────────────────────────────────────────────────

export default function AIOrbit({ progress }: { progress: number }) {
  const [nodes, setNodes] = useNodesState<Node>([]);
  const [orbitEdges, setOrbitEdges] = useState<OrbitEdge[]>([]);
  const progressRef = useRef(progress);
  useEffect(() => { progressRef.current = progress; }, [progress]);

  useEffect(() => {
    let animId: number;
    let angle    = 0;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const delta = now - lastTime;
      lastTime    = now;
      angle      += (delta / 1000) * SPIN_DPS;

      const p = progressRef.current;

      // 3-D → 2-D projection for every node, always at sphere surface
      type Proj = { sx: number; sy: number; depth: number; opacity: number; scale: number; blur: number; isActive: boolean };
      const proj       = new Map<string, Proj>();
      const activeIds  = new Set<string>();

      for (const sn of ALL_NODES) {
        const latR = (sn.lat * Math.PI) / 180;
        const lngR = ((sn.lng + angle) * Math.PI) / 180;

        const sx = SPHERE_R * Math.cos(latR) * Math.cos(lngR);
        const sy = SPHERE_R * Math.sin(latR);
        const sz = SPHERE_R * Math.cos(latR) * Math.sin(lngR);

        // depth 0 = back of sphere, 1 = front
        const depth = (sz + SPHERE_R) / (2 * SPHERE_R);
        const scale = 0.52 + depth * 0.48;
        const blur  = depth < 0.22 ? (0.22 - depth) * 5 : 0;

        const isActive = p >= sn.activationProgress;

        // Ghost opacity for inactive nodes, full opacity once activated
        let opacity: number;
        if (isActive) {
          const t = Math.min(1, (p - sn.activationProgress) / 0.10);
          opacity  = 0.15 + t * 0.85;
        } else {
          opacity = 0.13; // always faintly visible so sphere shape shows immediately
        }

        // Depth affects opacity further
        const finalOpacity = opacity * (0.30 + depth * 0.70);

        proj.set(sn.id, { sx, sy, depth, opacity: finalOpacity, scale, blur, isActive });
        if (isActive) activeIds.add(sn.id);
      }

      // ── Build node list ───────────────────────────────────────────────────
      const nextNodes: Node[] = ALL_NODES.map(sn => {
        const pp   = proj.get(sn.id)!;
        const zIdx = Math.round(pp.depth * 900);
        const data: ND = { opacity: pp.opacity, scale: pp.scale, blur: pp.blur, isActive: pp.isActive, label: sn.label };
        return sn.kind === "dot"
          ? { id: sn.id, type: "dot",  position: { x: CX + pp.sx - 4,  y: CY + pp.sy - 4  }, data, style: { zIndex: zIdx } }
          : { id: sn.id, type: "pill", position: { x: CX + pp.sx - 55, y: CY + pp.sy - 14 }, data, style: { zIndex: zIdx } };
      });

      // ── Build a dense graph across the whole sphere ───────────────────────
      const nextEdges: OrbitEdge[] = [];
      const seen = new Set<string>();

      for (const id of NEIGHBORS.keys()) {
        const pa = proj.get(id)!;
        for (const nid of NEIGHBORS.get(id) ?? []) {
          const key = id < nid ? `${id}--${nid}` : `${nid}--${id}`;
          if (seen.has(key)) continue;
          seen.add(key);

          const pb        = proj.get(nid)!;
          const avgDepth  = (pa.depth  + pb.depth)  / 2;
          const avgOpacity= (pa.opacity + pb.opacity) / 2;
          const isActiveEdge = activeIds.has(id) && activeIds.has(nid);

          nextEdges.push({
            id: key,
            x1: CX + pa.sx,
            y1: CY + pa.sy,
            x2: CX + pb.sx,
            y2: CY + pb.sy,
            active: isActiveEdge,
            width: isActiveEdge ? Math.max(0.45, 1.05 * avgDepth) : Math.max(0.25, 0.65 * avgDepth),
            opacity: isActiveEdge ? avgOpacity * 0.34 : avgOpacity * 0.24,
          });
        }
      }

      setNodes(nextNodes);
      setOrbitEdges(nextEdges);
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [setNodes]);

  return (
    <div className="ai-orbit relative mx-auto h-[480px] w-[500px] max-w-full" style={{ background: "transparent" }}>
      <svg
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
        viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
        aria-hidden="true"
      >
        {orbitEdges.map(edge => (
          <line
            key={edge.id}
            x1={edge.x1}
            y1={edge.y1}
            x2={edge.x2}
            y2={edge.y2}
            stroke={edge.active ? "#16A34A" : "#94a3b8"}
            strokeWidth={edge.width}
            strokeOpacity={edge.opacity}
          />
        ))}
      </svg>
      <ReactFlow
        nodes={nodes}
        edges={[]}
        nodeTypes={nodeTypes}
        panOnScroll={false}
        panOnDrag={false}
        zoomOnScroll={false}
        zoomOnDoubleClick={false}
        zoomOnPinch={false}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        proOptions={{ hideAttribution: true }}
        style={{ background: "transparent", position: "absolute", inset: 0, zIndex: 1 }}
      />
    </div>
  );
}
