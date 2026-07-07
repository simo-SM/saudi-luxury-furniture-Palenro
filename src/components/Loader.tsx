import { useEffect, useRef } from "react";
import gsap from "gsap";
import logoSrc from "../assets/logoPalenro.svg";

/* ─────────────────────────────────────────────────────────────
   PALENRO — Cinematic Luxury Loading Screen
   Phases: VOID → GLASS → LOGO → TEXT → PROGRESS → COLLAPSE
───────────────────────────────────────────────────────────── */

const LETTERS = ["P", "A", "L", "E", "N", "R", "O"];

/* Floating particle config */
const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  x: 8 + Math.random() * 84,
  y: 8 + Math.random() * 84,
  size: 1 + Math.random() * 2.5,
  delay: Math.random() * 4,
  dur: 3 + Math.random() * 4,
}));

export function Loader({ onDone }: { onDone: () => void }) {
  /* Root */
  const rootRef       = useRef<HTMLDivElement>(null);

  /* Phase 2 — glass orb */
  const glassRef      = useRef<HTMLDivElement>(null);

  /* Phase 3 — letters */
  const letterRefs    = useRef<(HTMLSpanElement | null)[]>([]);

  /* Phase 4 — subtitle */
  const subtitleRef   = useRef<HTMLDivElement>(null);

  /* Phase 5 — liquid bar */
  const barTrackRef   = useRef<HTMLDivElement>(null);
  const barFillRef    = useRef<HTMLDivElement>(null);
  const barShineRef   = useRef<HTMLDivElement>(null);

  /* Phase 6 — collapse overlay (morphs into nav shape) */
  const collapseRef   = useRef<HTMLDivElement>(null);

  /* Exit mask */
  const maskRef       = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const letters = letterRefs.current;

    /* ── Initial hidden states ── */
    gsap.set(glassRef.current,    { opacity: 0, scale: 0.7, filter: "blur(30px)" });
    gsap.set(letters,             { opacity: 0, y: 18, filter: "blur(12px)" });
    gsap.set(subtitleRef.current, { opacity: 0, y: 10, filter: "blur(8px)", letterSpacing: "0.45em" });
    gsap.set(barTrackRef.current, { opacity: 0, scaleX: 0, transformOrigin: "center" });
    gsap.set(barFillRef.current,  { scaleX: 0, transformOrigin: "left center" });
    gsap.set(barShineRef.current, { x: "-100%", opacity: 0 });
    gsap.set(collapseRef.current, { opacity: 0 });
    gsap.set(maskRef.current,     { clipPath: "inset(0 0 0% 0)" });

    /* ════════════════════════════════════
       MASTER TIMELINE
    ════════════════════════════════════ */
    const tl = gsap.timeline({
      onComplete: () => onDone(),
    });

    /* ── PHASE 1 — VOID (0.55 s black) ── */
    tl.to({}, { duration: 0.55 });

    /* ── PHASE 2 — GLASS EMERGENCE ── */
    tl.to(glassRef.current, {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      duration: 1.6,
      ease: "expo.out",
    });

    /* ── PHASE 3 — PALENRO letter stagger ── */
    tl.to(letters, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.07,
    }, "-=0.7");

    /* ── PHASE 4 — SUBTITLE ── */
    tl.to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      letterSpacing: "0.30em",
      duration: 1.0,
      ease: "power2.out",
    }, "-=0.2");

    /* ── PHASE 5 — LIQUID PROGRESS BAR ── */
    tl.to(barTrackRef.current, {
      opacity: 1,
      scaleX: 1,
      duration: 0.55,
      ease: "expo.out",
    }, "+=0.15");

    /* Liquid fill grows across */
    tl.to(barFillRef.current, {
      scaleX: 1,
      duration: 2.2,
      ease: "power2.inOut",
    }, "-=0.1");

    /* Shine sweeps through the bar (loops 2x) */
    tl.to(barShineRef.current, {
      x: "200%",
      opacity: 1,
      duration: 1.1,
      ease: "power1.inOut",
    }, "-=2.0");
    tl.to(barShineRef.current, {
      x: "200%",
      opacity: 1,
      duration: 1.1,
      ease: "power1.inOut",
    }, "+=0.0");

    /* ── PHASE 6 — GLASS MORPHS (collapses upward toward nav position) ── */
    tl.to([glassRef.current], {
      borderRadius: "999px",
      width: "280px",
      height: "52px",
      y: "-38vh",
      duration: 1.1,
      ease: "expo.inOut",
    }, "+=0.2");

    tl.to(letters, {
      opacity: 0,
      y: -8,
      filter: "blur(6px)",
      duration: 0.4,
      ease: "power2.in",
      stagger: { each: 0.04, from: "center" },
    }, "<");

    tl.to(subtitleRef.current, {
      opacity: 0,
      y: -6,
      filter: "blur(6px)",
      duration: 0.35,
      ease: "power2.in",
    }, "<+=0.05");

    tl.to(barTrackRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
    }, "<");

    /* ── PHASE 7 — EXIT: mask wipes up revealing the hero ── */
    tl.to(maskRef.current, {
      clipPath: "inset(0 0 100% 0)",
      duration: 1.0,
      ease: "expo.inOut",
    }, "-=0.05");

    tl.set(rootRef.current, { display: "none" });

    return () => { tl.kill(); };
  }, [onDone]);

  return (
    <div
      ref={rootRef}
      className="loader-root fixed inset-0 z-[200] overflow-hidden"
      style={{ background: "#020202" }}
    >
      {/* ── Exit clip mask wrapper ── */}
      <div ref={maskRef} className="absolute inset-0">

        {/* ── Ambient dark background ── */}
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, #0f0d0a 0%, #020202 100%)",
        }} />

        {/* ── Floating dust particles ── */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {PARTICLES.map(p => (
            <div
              key={p.id}
              className="loader-particle absolute rounded-full"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                background: `rgba(${171 + Math.round(Math.random() * 30)}, ${140 + Math.round(Math.random() * 20)}, ${90 + Math.round(Math.random() * 20)}, 0.5)`,
                /* CSS vars consumed by .loader-particle keyframe */
                ["--id" as string]: p.id,
                ["--dur" as string]: `${p.dur}s`,
                ["--delay" as string]: `${p.delay}s`,
                ["--dx" as string]: `${(p.id % 2 === 0 ? 1 : -1) * (6 + (p.id % 5) * 5)}px`,
                ["--dy" as string]: `${-8 - (p.id % 6) * 5}px`,
              } as React.CSSProperties}
            />
          ))}
        </div>

        {/* ── Very soft ambient vignette glow ── */}
        <div className="pointer-events-none absolute inset-0" style={{
          background: "radial-gradient(ellipse 50% 40% at 50% 52%, rgba(171,140,91,0.06) 0%, transparent 70%)",
        }} />

        {/* ═══════════════════════════════════════
            CENTER CONTENT
        ═══════════════════════════════════════ */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">

          {/* ── PHASE 2 — Glass orb / card ── */}
          <div
            ref={glassRef}
            className="loader-glass relative flex flex-col items-center justify-center"
            style={{
              width: "340px",
              height: "300px",
              borderRadius: "28px",
              background: "linear-gradient(145deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 50%, rgba(171,140,91,0.05) 100%)",
              backdropFilter: "blur(40px) saturate(160%) brightness(1.05)",
              WebkitBackdropFilter: "blur(40px) saturate(160%) brightness(1.05)",
              border: "1px solid rgba(255,255,255,0.10)",
              boxShadow: [
                "0 1px 0 0 rgba(255,255,255,0.18) inset",
                "0 -1px 0 0 rgba(255,255,255,0.04) inset",
                "0 40px 120px -20px rgba(0,0,0,0.8)",
                "0 0 0 0.5px rgba(171,140,91,0.15)",
                "0 0 80px -20px rgba(171,140,91,0.08)",
              ].join(", "),
            }}
          >
            {/* Top specular edge */}
            <div className="pointer-events-none absolute left-6 right-6 top-0 h-px" style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35) 40%, rgba(171,140,91,0.3) 60%, transparent)",
            }} />
            {/* Inner light reflection */}
            <div className="pointer-events-none absolute inset-0 rounded-[28px] overflow-hidden">
              <div style={{
                position: "absolute",
                top: "-20%",
                left: "-10%",
                width: "60%",
                height: "60%",
                background: "radial-gradient(ellipse, rgba(255,255,255,0.05) 0%, transparent 70%)",
                borderRadius: "50%",
              }} />
            </div>
            {/* Bottom ambient */}
            <div className="pointer-events-none absolute bottom-0 left-6 right-6 h-px" style={{
              background: "linear-gradient(90deg, transparent, rgba(171,140,91,0.15) 50%, transparent)",
            }} />

            {/* SVG logo mark */}
            <div className="mb-4" style={{ width: "64px", height: "64px", opacity: 0.9 }}>
              <img
                src={logoSrc}
                alt="Palenro mark"
                style={{ width: "100%", height: "100%", objectFit: "contain", filter: "brightness(1.1)" }}
              />
            </div>

            {/* ── PHASE 3 — PALENRO letters ── */}
            <div className="flex items-center" style={{ gap: "0.12em" }}>
              {LETTERS.map((letter, i) => (
                <span
                  key={i}
                  ref={el => { letterRefs.current[i] = el; }}
                  style={{
                    display: "inline-block",
                    fontFamily: "Inter Tight, Inter, sans-serif",
                    fontSize: "26px",
                    fontWeight: 600,
                    letterSpacing: "0.28em",
                    color: "#ffffff",
                    textTransform: "uppercase",
                    willChange: "transform, opacity, filter",
                  }}
                >
                  {letter}
                </span>
              ))}
            </div>

            {/* ── PHASE 4 — Subtitle ── */}
            <div
              ref={subtitleRef}
              style={{
                marginTop: "14px",
                fontFamily: "Inter, sans-serif",
                fontSize: "9px",
                fontWeight: 400,
                letterSpacing: "0.45em",
                color: "rgba(171,140,91,0.85)",
                textTransform: "uppercase",
                willChange: "transform, opacity, filter",
              }}
            >
              CRAFTING TIMELESS FURNITURE
            </div>

            {/* ── PHASE 5 — Liquid glass progress bar ── */}
            <div
              ref={barTrackRef}
              style={{
                marginTop: "36px",
                width: "200px",
                height: "2px",
                borderRadius: "2px",
                background: "rgba(255,255,255,0.08)",
                overflow: "hidden",
                position: "relative",
                boxShadow: "0 0 0 0.5px rgba(255,255,255,0.06)",
                willChange: "transform, opacity",
              }}
            >
              {/* Fill — liquid glass */}
              <div
                ref={barFillRef}
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(90deg, rgba(171,140,91,0.4) 0%, rgba(189,154,101,0.9) 40%, rgba(255,235,180,0.95) 60%, rgba(189,154,101,0.8) 100%)",
                  borderRadius: "2px",
                  willChange: "transform",
                  boxShadow: "0 0 12px rgba(171,140,91,0.6), 0 0 30px rgba(171,140,91,0.3)",
                }}
              />
              {/* Moving shine — liquid light */}
              <div
                ref={barShineRef}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "40%",
                  height: "100%",
                  background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.8) 45%, rgba(255,255,255,0.95) 50%, rgba(255,255,255,0.8) 55%, transparent 100%)",
                  willChange: "transform",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}