import React from 'react';

/**
 * MedicalBackground
 *
 * A fixed, full-screen decorative layer that renders animated medical icons
 * behind all page content. The icons are:
 *   - pointer-events: none   → never blocks clicks
 *   - z-index: 0             → always below page content (z-10+)
 *   - user-select: none      → not selectable
 *
 * Each entry in ICONS defines:
 *   icon     — Material Symbols name
 *   size     — font-size in px
 *   pos      — CSS position object (top/bottom/left/right as %)
 *   rot      — initial static rotation (wrapper div)
 *   anim     — CSS animation shorthand applied to the icon itself
 *   opacity  — 0–1 (keep subtle: 0.07–0.14 for best taste)
 *   fill     — whether to use FILL=1 (solid icon) or FILL=0 (outlined)
 */

const ICONS = [
  // ── Large hero icons — corners and edges ──────────────────────────────────
  {
    icon: 'local_hospital',
    size: 160,
    pos: { top: '3%', left: '1%' },
    rot: '-14deg',
    anim: 'medFloat 8s ease-in-out infinite',
    opacity: 0.10,
    fill: true,
  },
  {
    icon: 'ambulance',
    size: 130,
    pos: { top: '8%', right: '2%' },
    rot: '9deg',
    anim: 'medDrift 10s ease-in-out infinite 1.5s',
    opacity: 0.09,
    fill: true,
  },
  {
    icon: 'medical_services',
    size: 120,
    pos: { bottom: '5%', right: '3%' },
    rot: '12deg',
    anim: 'medFloat 9s ease-in-out infinite 0.8s',
    opacity: 0.10,
    fill: true,
  },
  {
    icon: 'health_and_safety',
    size: 140,
    pos: { bottom: '8%', left: '1%' },
    rot: '-8deg',
    anim: 'medSway 14s ease-in-out infinite 2s',
    opacity: 0.09,
    fill: true,
  },

  // ── Mid-screen — spread evenly ─────────────────────────────────────────────
  {
    icon: 'stethoscope',
    size: 100,
    pos: { top: '40%', left: '0.5%' },
    rot: '25deg',
    anim: 'medSway 12s ease-in-out infinite 0.4s',
    opacity: 0.10,
    fill: false,
  },
  {
    icon: 'vaccines',
    size: 90,
    pos: { top: '35%', right: '1%' },
    rot: '-20deg',
    anim: 'medFloat 7s ease-in-out infinite 3s',
    opacity: 0.10,
    fill: false,
  },
  {
    icon: 'medication',
    size: 95,
    pos: { top: '60%', right: '2%' },
    rot: '10deg',
    anim: 'medDrift 11s ease-in-out infinite 1.2s',
    opacity: 0.09,
    fill: true,
  },
  {
    icon: 'healing',
    size: 85,
    pos: { top: '55%', left: '2%' },
    rot: '-16deg',
    anim: 'medDrift 9s ease-in-out infinite 2.8s',
    opacity: 0.09,
    fill: false,
  },

  // ── Small scattered accents ───────────────────────────────────────────────
  {
    icon: 'favorite',
    size: 70,
    pos: { top: '22%', left: '5%' },
    rot: '8deg',
    anim: 'medPulse 4s ease-in-out infinite 0.5s',
    opacity: 0.12,
    fill: true,
  },
  {
    icon: 'emergency',
    size: 75,
    pos: { top: '20%', right: '5%' },
    rot: '-10deg',
    anim: 'medPulse 5s ease-in-out infinite 1.8s',
    opacity: 0.11,
    fill: true,
  },
  {
    icon: 'add_circle',
    size: 60,
    pos: { bottom: '30%', left: '4%' },
    rot: '0deg',
    anim: 'medSpin 20s linear infinite',
    opacity: 0.10,
    fill: false,
  },
  {
    icon: 'add_circle',
    size: 50,
    pos: { top: '50%', right: '4%' },
    rot: '0deg',
    anim: 'medSpin 25s linear infinite reverse',
    opacity: 0.08,
    fill: false,
  },
  {
    icon: 'local_hospital',
    size: 55,
    pos: { bottom: '22%', right: '8%' },
    rot: '18deg',
    anim: 'medFloat 11s ease-in-out infinite 3.5s',
    opacity: 0.08,
    fill: false,
  },
  {
    icon: 'favorite',
    size: 48,
    pos: { bottom: '40%', left: '8%' },
    rot: '-22deg',
    anim: 'medPulse 3.5s ease-in-out infinite 2.2s',
    opacity: 0.11,
    fill: true,
  },
];

export default function MedicalBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        userSelect: 'none',
        overflow: 'hidden',
      }}
    >
      {ICONS.map((item, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            ...item.pos,
            transform: `rotate(${item.rot})`,
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{
              fontSize: `${item.size}px`,
              opacity: item.opacity,
              color: '#1c1b1b',
              animation: item.anim,
              display: 'block',
              lineHeight: 1,
              fontVariationSettings: `'FILL' ${item.fill ? 1 : 0}, 'wght' 300, 'GRAD' 0, 'opsz' 48`,
            }}
          >
            {item.icon}
          </span>
        </div>
      ))}
    </div>
  );
}
