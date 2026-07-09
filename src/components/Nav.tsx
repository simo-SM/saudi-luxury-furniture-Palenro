import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LINKS = [
  { label: "المجموعة", href: "#collection" },
  { label: "المشاريع", href: "#projects" },
  { label: "الحرفة", href: "#craft" },
  { label: "المعرض", href: "#gallery" },
  { label: "من نحن", href: "#about" },
  { label: "تواصل معنا", href: "#contact" },
];

/* ─────────────────────────────────────────
   Shared glass capsule style
───────────────────────────────────────── */
const GLASS_DARK: React.CSSProperties = {
  background:
    "linear-gradient(145deg, rgba(255, 255, 255, 0.10) 0%, rgba(255, 255, 255, 0.04) 55%, rgba(255, 255, 255, 0.08) 100%)",
  backdropFilter: "blur(30px) saturate(180%)",
  WebkitBackdropFilter: "blur(30px) saturate(180%)",
  border: "1px solid rgba(255, 255, 255, 0.12)",
  boxShadow: "0 8px 30px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
};

const GLASS_LIGHT: React.CSSProperties = {
  background:
    "linear-gradient(145deg, rgba(255, 255, 255, 0.80) 0%, rgba(245, 245, 245, 0.70) 100%)",
  backdropFilter: "blur(48px) saturate(220%) brightness(0.95)",
  WebkitBackdropFilter: "blur(48px) saturate(220%) brightness(0.95)",
  border: "1px solid rgba(0, 0, 0, 0.08)",
  boxShadow: "0 12px 40px rgba(0, 0, 0, 0.12), inset 0 1px 1px rgba(255, 255, 255, 0.8)",
};

/* ─────────────────────────────────────────
   Hamburger icon (Premium 3-line)
───────────────────────────────────────── */
function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" className="overflow-visible">
      <line
        x1="1.5" y1="3.5" x2="12.5" y2="3.5"
        stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"
        style={{
          transformOrigin: "center",
          transition: "transform 0.45s cubic-bezier(0.85, 0, 0.15, 1)",
          transform: open ? "translateY(3.5px) rotate(45deg)" : "translateY(0) rotate(0)",
        }}
      />
      <line
        x1="1.5" y1="7" x2="12.5" y2="7"
        stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"
        style={{
          transition: "opacity 0.45s ease",
          opacity: open ? 0 : 1,
        }}
      />
      <line
        x1="1.5" y1="10.5" x2="12.5" y2="10.5"
        stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"
        style={{
          transformOrigin: "center",
          transition: "transform 0.45s cubic-bezier(0.85, 0, 0.15, 1)",
          transform: open ? "translateY(-3.5px) rotate(-45deg)" : "translateY(0) rotate(0)",
        }}
      />
    </svg>
  );
}

/* ═══════════════════════════════════════════
   NAV
═══════════════════════════════════════════ */
export function Nav({ ready }: { ready: boolean }) {

  /* ── Dock refs (Single Floating Nav) ── */
  const dockWrapRef   = useRef<HTMLDivElement>(null);   // outer animated wrapper
  const dockExpandRef = useRef<HTMLDivElement>(null);   // section that grows on hover
  const dockDivRef    = useRef<HTMLDivElement>(null);
  const dockLinksRef  = useRef<HTMLElement>(null);
  const dockLinkEls   = useRef<(HTMLAnchorElement | null)[]>([]);
  const dockBtnRef    = useRef<HTMLButtonElement>(null);

  /* ── Float tween refs ── */
  const dockExpandTlRef = useRef<gsap.core.Timeline | null>(null);
  const dockExpandedRef = useRef(false);   // tracks expanded state without re-render

  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileDockOpen, setMobileDockOpen] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);

  /* ── Mobile Menu Refs ── */
  const mobileMenuOverlayRef = useRef<HTMLDivElement>(null);
  const mobileMenuLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const mobileMenuFooterRef = useRef<HTMLDivElement>(null);

  /* ── Smooth Scroll Helper ── */
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const lenis = (window as any).__lenis;
    if (lenis) {
      lenis.scrollTo(href, { offset: -80 }); // slight offset for the navbar
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  /* ══════════════════════════════════════
     Mobile Menu GSAP Animations
  ══════════════════════════════════════ */
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      const tl = gsap.timeline();
      
      tl.to(mobileMenuOverlayRef.current, {
        opacity: 1,
        duration: 0.6,
        ease: "power3.inOut",
        pointerEvents: "auto",
      });

      tl.fromTo(mobileMenuLinksRef.current, 
        { y: 80, opacity: 0, filter: "blur(10px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.6, stagger: 0.08, ease: "expo.out" },
        "-=0.3"
      );

      tl.fromTo(mobileMenuFooterRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 0.45, duration: 0.6, ease: "expo.out" },
        "-=0.4"
      );

      // Page Scaling and Hero Blurring
      gsap.to("#page-content", { scale: 0.98, duration: 0.6, ease: "expo.out" });
      gsap.to("#hero-wrapper", { filter: "blur(10px)", duration: 0.6, ease: "expo.out" });

    } else {
      document.body.style.overflow = "";
      const tl = gsap.timeline();

      tl.to(mobileMenuLinksRef.current, {
        y: -40,
        opacity: 0,
        filter: "blur(10px)",
        duration: 0.4,
        stagger: { each: 0.04, from: "end" },
        ease: "power3.inOut"
      });

      tl.to(mobileMenuFooterRef.current, {
        y: 10,
        opacity: 0,
        duration: 0.4,
        ease: "power3.inOut"
      }, "<");

      tl.to(mobileMenuOverlayRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power3.inOut",
        pointerEvents: "none"
      }, "-=0.1");

      // Reset Page Scaling and Hero Blurring
      gsap.to("#page-content", { scale: 1, duration: 0.6, ease: "power3.inOut" });
      gsap.to("#hero-wrapper", { filter: "blur(0px)", duration: 0.6, ease: "power3.inOut" });
    }
  }, [menuOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) setMenuOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [menuOpen]);

  /* ══════════════════════════════════════
     Initial visible state (no loader)
  ══════════════════════════════════════ */
  useEffect(() => {
    /* Single Dock Nav — persistent at bottom */
    gsap.set(dockWrapRef.current,   { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", pointerEvents: "auto" });
    gsap.set(dockExpandRef.current, { maxWidth: 0, opacity: 0 });
    gsap.set(dockDivRef.current,    { opacity: 0, scaleY: 0 });
    gsap.set(dockLinksRef.current,  { opacity: 0 });
    gsap.set(dockLinkEls.current,   { opacity: 0, y: 10, filter: "blur(10px)" });
    gsap.set(dockBtnRef.current,    { opacity: 0, scale: 0.5 });
  }, []);

  /* ══════════════════════════════════════
     Dock hover — EXPAND
  ══════════════════════════════════════ */
  const expandDock = useCallback(() => {
    if (dockExpandedRef.current) return;
    dockExpandedRef.current = true;
    dockExpandTlRef.current?.kill();

    const tl = gsap.timeline();
    dockExpandTlRef.current = tl;

    /* 1. Capsule grows right */
    tl.to(dockExpandRef.current, {
      maxWidth: 620,
      opacity: 1,
      duration: 0.72,
      ease: "expo.inOut",
    });

    /* 2. Divider fades in */
    tl.to(dockDivRef.current, {
      opacity: 1,
      scaleY: 1,
      duration: 0.28,
      ease: "power2.out",
    }, "-=0.52");

    /* 3. Links stagger in */
    tl.set(dockLinksRef.current, { opacity: 1 }, "-=0.40");
    tl.to(dockLinkEls.current, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.42,
      ease: "power3.out",
      stagger: 0.06,
    }, "<");

    /* 4. Menu button last */
    tl.to(dockBtnRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.32,
      ease: "back.out(2.4)",
    }, "-=0.08");
  }, []);

  /* ══════════════════════════════════════
     Dock hover — COLLAPSE
  ══════════════════════════════════════ */
  const collapseDock = useCallback(() => {
    if (!dockExpandedRef.current) return;
    dockExpandedRef.current = false;
    dockExpandTlRef.current?.kill();

    const tl = gsap.timeline();
    dockExpandTlRef.current = tl;

    /* Reverse stagger links out */
    tl.to(dockBtnRef.current, { opacity: 0, scale: 0.5, duration: 0.18, ease: "power2.in" });
    tl.to(dockLinkEls.current, {
      opacity: 0,
      y: 8,
      filter: "blur(8px)",
      duration: 0.28,
      ease: "power2.in",
      stagger: { each: 0.04, from: "end" },
    }, "-=0.08");
    tl.set(dockLinksRef.current, { opacity: 0 });
    tl.to(dockDivRef.current,  { opacity: 0, scaleY: 0, duration: 0.22, ease: "power2.in" }, "-=0.18");
    tl.to(dockExpandRef.current, {
      maxWidth: 0,
      opacity: 0,
      duration: 0.52,
      ease: "expo.inOut",
    }, "-=0.18");
  }, []);

  /* ══════════════════════════════════════
     Main entrance + scroll timeline
  ══════════════════════════════════════ */
  useEffect(() => {
    if (!ready) return;

    /* ── Scroll behavior ── */
    const st = ScrollTrigger.create({
      start: 0, end: 99999,
      onUpdate: (self) => {
        const direction  = self.direction;  // 1 = down, -1 = up
        const velocity   = Math.abs(self.getVelocity());

        /* ── Dock hide on fast scroll (desktop only optional, but keep persistent on mobile) ── */
        if (window.innerWidth >= 1024) {
          const hide = direction === 1 && velocity > 700;
          if (hide) {
            gsap.to(dockWrapRef.current, {
              opacity: 0, y: 28, scale: 0.94, filter: "blur(10px)",
              pointerEvents: "none",
              duration: 0.32, ease: "power2.in", overwrite: true,
            });
          } else {
            gsap.to(dockWrapRef.current, {
              opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
              pointerEvents: "auto",
              duration: 1.0, ease: "expo.out", overwrite: true,
            });
          }
        }
      },
    });

    /* ── Dynamic background lightness detection ── */
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    const colorCache = new Map<string, boolean>();

    const checkBackgroundLightness = () => {
      if (!dockWrapRef.current || !ctx) return;
      
      const rect = dockWrapRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      
      // Temporarily disable pointer events to read what's beneath
      const prevPointerEvents = dockWrapRef.current.style.pointerEvents;
      dockWrapRef.current.style.pointerEvents = "none";
      const elements = document.elementsFromPoint(x, y);
      dockWrapRef.current.style.pointerEvents = prevPointerEvents;
      
      let foundLight = false;
      
      for (const el of elements) {
        if (el === document.documentElement || el === document.body) continue;
        
        const bg = window.getComputedStyle(el).backgroundColor;
        if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") {
          if (colorCache.has(bg)) {
            foundLight = colorCache.get(bg)!;
            break;
          }
          
          ctx.canvas.width = 1;
          ctx.canvas.height = 1;
          ctx.clearRect(0, 0, 1, 1);
          ctx.fillStyle = bg;
          ctx.fillRect(0, 0, 1, 1);
          const data = ctx.getImageData(0, 0, 1, 1).data;
          
          if (data[3] > 0) { // Solid or semi-solid
            const luminance = 0.299 * data[0] + 0.587 * data[1] + 0.114 * data[2];
            foundLight = luminance > 128;
            colorCache.set(bg, foundLight);
            break;
          }
        }
      }
      
      setIsLightMode(foundLight);
    };

    // Run heavily optimized checks during scroll and resize
    let scrollTicking = false;
    const onScroll = () => {
      if (!scrollTicking) {
        window.requestAnimationFrame(() => {
          checkBackgroundLightness();
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    
    // Initial check
    setTimeout(checkBackgroundLightness, 100);

    return () => {
      st.kill();
      dockExpandTlRef.current?.kill();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ready]);

  /* ══════════════════════════════════════
     Mobile — outside-tap collapses dock
  ══════════════════════════════════════ */
  useEffect(() => {
    if (!mobileDockOpen) return;
    const onOutside = (e: MouseEvent | TouchEvent) => {
      if (dockWrapRef.current && !dockWrapRef.current.contains(e.target as Node)) {
        collapseDock();
        setMobileDockOpen(false);
      }
    };
    document.addEventListener("mousedown", onOutside);
    document.addEventListener("touchstart", onOutside);
    return () => {
      document.removeEventListener("mousedown", onOutside);
      document.removeEventListener("touchstart", onOutside);
    };
  }, [mobileDockOpen, collapseDock]);

  /* ══════════════════════════════════════
     JSX
  ══════════════════════════════════════ */
  return (
    <>
      {/* Inline styles for adaptive links */}
      <style>{`
        .adaptive-link {
          color: var(--nav-text-muted);
          transition: color 0.4s ease;
        }
        .adaptive-link:hover {
          color: var(--nav-text);
        }
        .adaptive-link .nav-link-underline {
          background: var(--nav-text-muted);
          transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1), background 0.4s ease;
        }
        .adaptive-link:hover .nav-link-underline {
          background: var(--nav-text);
        }
      `}</style>

      {/* ════════════════════════════════════
          SINGLE FLOATING NAVIGATION (DOCK)
      ════════════════════════════════════ */}
      <div
        ref={dockWrapRef}
        className="fixed bottom-8 left-1/2 z-[999] -translate-x-1/2"
        style={{ willChange: "transform, opacity, filter" }}
        onMouseEnter={expandDock}
        onMouseLeave={collapseDock}
        onClick={() => {
          if (window.innerWidth >= 1024) return;
          if (dockExpandedRef.current) {
            collapseDock();
            setMobileDockOpen(false);
          } else {
            expandDock();
            setMobileDockOpen(true);
          }
        }}
      >
        <div
          className="nav-glass-capsule relative overflow-hidden rounded-full px-4 py-2 lg:px-6 lg:py-3 cursor-default"
          style={{
            "--nav-text": isLightMode ? "#111111" : "#FFFFFF",
            "--nav-text-muted": isLightMode ? "rgba(17, 17, 17, 0.65)" : "rgba(255, 255, 255, 0.65)",
            "--nav-btn-bg": isLightMode ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.04)",
            "--nav-btn-bg-hover": isLightMode ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)",
            "--nav-btn-border": isLightMode ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.12)",
            "--nav-btn-border-hover": isLightMode ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.15)",
            "--nav-btn-shadow": isLightMode ? "inset 0 1px 1px rgba(0,0,0,0.05)" : "inset 0 1px 1px rgba(255,255,255,0.08)",
            "--nav-divider": isLightMode ? "linear-gradient(to bottom, transparent, rgba(0,0,0,0.15), transparent)" : "linear-gradient(to bottom, transparent, rgba(255,255,255,0.28), transparent)",
            "--nav-divider-solid": isLightMode ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.12)",
            color: "var(--nav-text)",
            transition: "color 0.4s ease",
          } as React.CSSProperties}
        >
          {/* Dark Glass Layer */}
          <div className="absolute inset-0 transition-opacity duration-500 ease-in-out pointer-events-none"
               style={{ ...GLASS_DARK, opacity: isLightMode ? 0 : 1, zIndex: -1, borderRadius: 'inherit' }} />
               
          {/* Light Glass Layer */}
          <div className="absolute inset-0 transition-opacity duration-500 ease-in-out pointer-events-none"
               style={{ ...GLASS_LIGHT, opacity: isLightMode ? 1 : 0, zIndex: -1, borderRadius: 'inherit' }} />

          {/* Highlights */}
          <div className="pointer-events-none absolute inset-0 transition-opacity duration-500 ease-in-out"
            style={{ background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.18), transparent 60%)", opacity: isLightMode ? 0 : 1 }} />
          <div className="pointer-events-none absolute inset-x-4 top-0 h-px transition-opacity duration-500 ease-in-out"
            style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.40) 50%, transparent)", opacity: isLightMode ? 0 : 1 }} />

          <div className="relative flex items-center">

            {/* ════ MOBILE LOCKUP ════ */}
            <div className="flex lg:hidden items-center gap-[8px]">
              <button
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                onClick={() => setMenuOpen(p => !p)}
                className="grid h-[30px] w-[30px] shrink-0 place-items-center rounded-full transition-all duration-400"
                style={{
                  color: "var(--nav-text)",
                  background: "var(--nav-btn-bg)",
                  border: "1px solid var(--nav-btn-border)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  boxShadow: "var(--nav-btn-shadow)",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.background = "var(--nav-btn-bg-hover)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.background = "var(--nav-btn-bg)";
                }}
              >
                <HamburgerIcon open={menuOpen} />
              </button>
              <span
                className="shrink-0 select-none flex items-center"
                style={{ color: "var(--nav-text)", transition: "color 0.4s ease", fontSize: "15px", fontWeight: 600, letterSpacing: "0.32em", fontFamily: "Inter Tight, Inter, sans-serif", textTransform: "uppercase", paddingInlineEnd: "0.16em", lineHeight: 1 }}
              >
                PALENRO
              </span>
            </div>

            {/* ════ DESKTOP BASE (PALENRO) ════ */}
            <span
              className="hidden lg:block shrink-0 select-none"
              style={{ color: "var(--nav-text)", transition: "color 0.4s ease", fontSize: "11px", fontWeight: 600, letterSpacing: "0.32em", textTransform: "uppercase", fontFamily: "Inter Tight, Inter, sans-serif" }}
            >
              PALENRO
            </span>

            {/* ── Expanding section ── */}
            <div
              ref={dockExpandRef}
              className="hidden lg:flex items-center"
              style={{ overflow: "hidden", maxWidth: 0, whiteSpace: "nowrap" }}
            >
              <div
                ref={dockDivRef}
                style={{ 
                  width: "1px", height: "15px", margin: "0 20px", flexShrink: 0, transformOrigin: "center top", 
                  background: "var(--nav-divider)",
                  transition: "background 0.4s ease"
                }}
              />

              <nav
                ref={dockLinksRef as React.RefObject<HTMLElement>}
                className="flex items-center gap-[16px]"
                style={{ flexShrink: 0 }}
              >
                {LINKS.map((link, i) => (
                  <a
                    key={link.href}
                    ref={el => { dockLinkEls.current[i] = el; }}
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    data-cursor=""
                    className="nav-link adaptive-link group relative inline-block"
                    style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "0.20em", textTransform: "uppercase" }}
                  >
                    {link.label}
                    <span className="nav-link-underline" />
                  </a>
                ))}
              </nav>

              <div style={{ 
                width: "1px", height: "14px", margin: "0", marginInlineEnd: "16px", marginInlineStart: "18px", flexShrink: 0, 
                background: "var(--nav-divider-solid)",
                transition: "background 0.4s ease"
              }} />

              <button
                ref={dockBtnRef}
                data-cursor=""
                aria-label="Menu"
                className="nav-menu-btn grid h-[28px] w-[28px] shrink-0 place-items-center rounded-full transition-all duration-400 cursor-default"
                style={{ 
                  color: "var(--nav-text)",
                  background: "var(--nav-btn-bg)", 
                  border: "1px solid var(--nav-btn-border)", 
                  boxShadow: "var(--nav-btn-shadow)", 
                  flexShrink: 0 
                }}
                onMouseEnter={e => { 
                  e.currentTarget.style.background = "var(--nav-btn-bg-hover)";
                  e.currentTarget.style.borderColor = "var(--nav-btn-border-hover)";
                }}
                onMouseLeave={e => { 
                  e.currentTarget.style.background = "var(--nav-btn-bg)";
                  e.currentTarget.style.borderColor = "var(--nav-btn-border)";
                }}
              >
                <svg width="11" height="11" viewBox="0 0 12 12" fill="currentColor">
                  <line x1="1.5" y1="4"   x2="10.5" y2="4"   stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" />
                  <line x1="1.5" y1="8"   x2="10.5" y2="8"   stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════
          MOBILE FULLSCREEN MENU
      ════════════════════════════════════ */}
      <div
        ref={mobileMenuOverlayRef}
        className="fixed inset-0 z-[999] flex flex-col items-center justify-center pointer-events-none opacity-0"
        style={{
          "--nav-text": "#FFFFFF",
          "--nav-text-muted": "rgba(255, 255, 255, 0.65)",
          color: "var(--nav-text)",
          background: "rgba(2, 12, 32, 0.92)",
          backdropFilter: "blur(30px)",
          WebkitBackdropFilter: "blur(30px)",
        } as React.CSSProperties}
        onClick={(e) => {
          if (e.target === e.currentTarget) setMenuOpen(false);
        }}
      >
        <div className="moroccan-pattern absolute inset-0 opacity-[0.03] pointer-events-none" />
        
        <nav className="flex flex-col items-center gap-[36px] z-10 w-full" dir="rtl">
          {LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              ref={el => { mobileMenuLinksRef.current[i] = el; }}
              className="nav-link group relative inline-block text-center"
              style={{ color: "var(--nav-text-muted)", transition: "color 0.4s ease", fontSize: "18px", fontWeight: 500, letterSpacing: "0.20em", textTransform: "uppercase" }}
              onMouseEnter={e => e.currentTarget.style.color = "var(--nav-text)"}
              onMouseLeave={e => e.currentTarget.style.color = "var(--nav-text-muted)"}
              onClick={(e) => {
                e.preventDefault();
                setMenuOpen(false);
                setTimeout(() => {
                  const lenis = (window as any).__lenis;
                  if (lenis) {
                    lenis.scrollTo(link.href, { offset: -80 });
                  } else {
                    document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
                  }
                }, 600); // wait for menu close animation
              }}
            >
              {link.label}
              <span className="nav-link-underline" style={{ background: "var(--nav-text-muted)", transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1), background 0.4s ease" }} />
            </a>
          ))}
        </nav>

        <div ref={mobileMenuFooterRef} className="absolute bottom-12 flex flex-col items-center gap-2 z-10" style={{ color: "var(--nav-text)", opacity: 0.45 }} dir="rtl">
          <p className="text-sm tracking-wider font-medium" style={{ letterSpacing: "0.2em", fontFamily: "Inter Tight, Inter, sans-serif" }}>PALENRO</p>
          <p className="text-xs font-light">أثاث خشبي فاخر في السعودية</p>
          <p className="text-xs font-light mt-1" style={{ fontFamily: "Arial" }}>© 2026</p>
        </div>
      </div>
    </>
  );
}