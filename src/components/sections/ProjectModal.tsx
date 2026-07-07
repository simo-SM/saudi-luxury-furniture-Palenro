import { useLayoutEffect, useRef, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { CustomEase } from "gsap/CustomEase";
import { Project } from "./Projects";
import { getWhatsAppUrl, getProjectWhatsAppUrl } from "../../lib/whatsapp";

gsap.registerPlugin(Flip, CustomEase);

export function ProjectModal({
  project,
  flipState,
  isClosing,
  onClose,
  onClosed,
}: {
  project: Project;
  flipState: Flip.FlipState;
  isClosing: boolean;
  onClose: () => void;
  onClosed: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  const [isOrdering, setIsOrdering] = useState(false);
  const orderBtnRef = useRef<HTMLButtonElement>(null);

  const handleOrder = () => {
    setIsOrdering(true);
    setTimeout(() => {
      setIsOrdering(false);
      const orderMessage = `مرحباً، أرغب في طلب هذا المنتج: ${project.title} (ID: ${project.id})`;
      window.open(getWhatsAppUrl(orderMessage), '_blank');
    }, 1500);
  };

  const handleMouseEnter = () => {
    if (orderBtnRef.current && !prefersReducedMotion && !isOrdering) {
      gsap.to(orderBtnRef.current, { scale: 1.03, boxShadow: isMinimal ? "0 8px 30px rgba(0,0,0,0.1)" : "0 8px 30px rgba(255,255,255,0.15)", duration: 0.4, ease: "power3.out" });
    }
  };

  const handleMouseLeave = () => {
    if (orderBtnRef.current && !prefersReducedMotion && !isOrdering) {
      gsap.to(orderBtnRef.current, { scale: 1, boxShadow: isMinimal ? "0 4px 20px rgba(0,0,0,0.05)" : "0 4px 20px rgba(255,255,255,0.05)", duration: 0.4, ease: "power3.out" });
    }
  };

  if (!project) {
    return createPortal(
      <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/80 text-white">
        <div className="rounded-2xl bg-black/60 p-8 text-center backdrop-blur-xl">
          <p className="text-lg">المشروع غير متوفر</p>
          <button
            onClick={onClose}
            className="mt-4 rounded-full bg-white px-6 py-2 text-sm font-medium text-black"
          >
            إغلاق
          </button>
        </div>
      </div>,
      document.body,
    );
  }

  const isMinimal = project.vibe === "minimal";
  const isEditorial = project.vibe === "editorial";

  const textColor = isMinimal ? "text-[#1A1A1A]" : "text-white";
  const mutedTextColor = isMinimal ? "text-black/50" : "text-white/50";
  const borderColor = isMinimal ? "border-black/10" : "border-white/10";

  // Vibe specific layout variables
  const titleClass = isEditorial
    ? "text-display text-6xl md:text-8xl tracking-tighter"
    : isMinimal
      ? "text-4xl md:text-5xl font-light"
      : "text-display text-5xl md:text-7xl";

  const storyClass = isEditorial
    ? "text-2xl md:text-4xl font-semibold leading-tight border-t-4 pt-8"
    : isMinimal
      ? "text-lg md:text-xl font-light leading-relaxed border-t pt-8"
      : "text-xl md:text-3xl leading-relaxed border-t pt-8";

  const paddingClass = isMinimal ? "px-8 py-24 md:px-16" : "px-6 py-20 md:px-12";

  // Entrance & Exit animations
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        return;
      }

      // 1. Apple-style hero image reveal
      if (heroImgRef.current) {
        gsap.fromTo(
          heroImgRef.current,
          {
            y: 200,
            opacity: 0,
            scale: 1.1,
            filter: "blur(16px)",
            transformOrigin: "center center",
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.6,
            ease: "expo.out",
          }
        );
      }

      // 2. Stagger reveal content
      gsap.fromTo(
        ".reveal-el",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.2,
        },
      );

      // 3. Slide up CTA (CTA buttons appear last)
      gsap.fromTo(
        ctaRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.6,
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, [flipState, prefersReducedMotion]);

  // Safety net: ensure content is never stuck invisible (uses plain DOM, not GSAP)
  useEffect(() => {
    const id = setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.querySelectorAll(".reveal-el").forEach((el) => {
          const htmlEl = el as HTMLElement;
          htmlEl.style.opacity = "1";
          htmlEl.style.transform = "none";
          htmlEl.style.filter = "none";
        });
        if (ctaRef.current) {
          ctaRef.current.style.opacity = "1";
          ctaRef.current.style.transform = "none";
        }
        if (heroImgRef.current) {
          heroImgRef.current.style.opacity = "1";
          heroImgRef.current.style.position = "";
          heroImgRef.current.style.top = "";
          heroImgRef.current.style.left = "";
          heroImgRef.current.style.width = "";
          heroImgRef.current.style.height = "";
          heroImgRef.current.style.transform = "";
        }
      }
    }, 500);
    return () => clearTimeout(id);
  }, [flipState]);

  // Handle Close Animation
  useEffect(() => {
    if (!isClosing) return;

    if (prefersReducedMotion) {
      onClosed();
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          ctx.revert();
          onClosed();
        },
      });

      tl.to(
        [ctaRef.current, ".reveal-el"],
        {
          y: 20,
          opacity: 0,
          filter: "blur(10px)",
          duration: 0.4,
          ease: "power2.in",
          stagger: -0.05,
        },
        0,
      );

      tl.to(
        heroImgRef.current,
        {
          scale: 0.9,
          opacity: 0,
          duration: 0.6,
          ease: "power3.inOut",
        },
        0.2,
      );

      tl.to(
        ".modal-backdrop",
        {
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
        },
        0.2,
      );

      tl.to(
        ".modal-panel",
        {
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
        },
        0.2,
      );

      tl.to(
        containerRef.current,
        {
          opacity: 0,
          duration: 0.1,
          ease: "power2.inOut",
        },
        0.7,
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isClosing, onClosed, prefersReducedMotion]);

  // Reset Scroll, Lock Body, & Manage Lenis
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalOverscrollBehavior = document.body.style.overscrollBehavior;
    const bodyClasses = document.body.classList;

    // Lock body scroll but allow modal scroll via CSS class
    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";
    bodyClasses.add("modal-open");

    // Stop Lenis if available
    if (typeof window !== "undefined" && typeof (window as any).__lenis?.stop === "function") {
      (window as any).__lenis.stop();
    }

    // Force scroll to top instantly
    requestAnimationFrame(() => {
      if (contentRef.current) {
        contentRef.current.scrollTo({
          top: 0,
          behavior: "auto",
        });
      }
    });

    return () => {
      // Restore body and lenis on close
      document.body.style.overflow = originalOverflow;
      document.body.style.overscrollBehavior = originalOverscrollBehavior;
      bodyClasses.remove("modal-open");
      if (typeof window !== "undefined" && typeof (window as any).__lenis?.start === "function") {
        (window as any).__lenis.start();
      }
    };
  }, []);

  // Scroll Progress
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const progress = scrollTop / (scrollHeight - clientHeight);
    if (progressRef.current) {
      progressRef.current.style.transform = `scaleX(${progress})`;
    }
  };

  const whatsappMessageUrl = getProjectWhatsAppUrl(project.title, project.id);

  const modalMarkup = (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-10 ${textColor}`}
      dir="rtl"
      onClick={onClose}
      style={{ isolation: "isolate" }}
    >
      {/* Backdrop layer — no blur to avoid compositing bugs */}
      <div
        className="modal-backdrop absolute inset-0 -z-10 bg-black/80 animate-modal-backdrop-in"
        aria-hidden="true"
      />

      <div
        className={`modal-panel relative z-10 flex h-full max-h-[calc(100vh-2rem)] w-full max-w-[1400px] flex-col overflow-hidden rounded-[2rem] border ${borderColor} ${project.bgStyle || "bg-[#0B1012]"} shadow-2xl md:max-h-[calc(100vh-5rem)]`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Progress Bar */}
        <div
          className={`absolute start-0 top-0 z-50 h-1 w-full ${isMinimal ? "bg-black/10" : "bg-white/10"}`}
        >
          <div
            ref={progressRef}
            className="h-full origin-left transition-transform duration-75"
            style={{
              transform: "scaleX(0)",
              backgroundColor: project.accentColor || "#fff",
              opacity: 1,
            }}
          />
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute start-6 top-6 z-50 flex h-12 w-12 items-center justify-center rounded-full backdrop-blur-md transition-colors border ${isMinimal ? "bg-white/40 text-black hover:bg-white/80 border-black/10" : "bg-black/40 text-white hover:bg-black/60 border-white/10"}`}
          style={{ cursor: "pointer", opacity: 1 }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M1 1L13 13M1 13L13 1"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Scrollable Content */}
        <div
          ref={contentRef}
          className="modal-content min-h-0 flex-1 overflow-y-auto overflow-x-hidden"
          data-lenis-prevent="true"
          style={{
            overscrollBehavior: "contain",
            scrollBehavior: "smooth",
            scrollPaddingTop: "40px",
            paddingTop: "env(safe-area-inset-top)",
            paddingBottom: "env(safe-area-inset-bottom)",
            touchAction: "pan-y",
            WebkitOverflowScrolling: "touch",
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
          onScroll={handleScroll}
        >
          {/* Hide Webkit Scrollbar using inline style injection for safety */}
          <style>{`.modal-content::-webkit-scrollbar { display: none; }`}</style>
          {/* Hero Image */}
          <div className="relative h-[60vh] md:h-[80vh] w-full shrink-0 overflow-hidden bg-[#111]">
            <img
              ref={heroImgRef}
              data-flip-id={`proj-img-${project.id}`}
              src={project.img}
              alt={project.title}
              className="h-full w-full object-cover"
              style={{ opacity: 1, willChange: prefersReducedMotion ? undefined : "transform, opacity, filter" }}
            />
            {/* Gradient mask based on vibe */}
            {!isMinimal && (
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />
            )}
          </div>

          {/* Details */}
          <div className={`relative z-20 mx-auto max-w-5xl ${paddingClass}`}>
            <div
              className={`reveal-el flex flex-col md:flex-row md:items-end justify-between gap-6 ${textColor}`}
              style={{ opacity: 1 }}
            >
              <div>
                <div className={`text-eyebrow mb-4 ${mutedTextColor}`}>
                  {project.category} — {project.year}
                </div>
                <h2 className={`${titleClass} ${textColor}`}>{project.title}</h2>
              </div>
              <div className="md:text-end">
                <div className={`text-eyebrow mb-1 ${mutedTextColor}`}>الموقع</div>
                <div className={`text-lg ${textColor}`}>{project.place}</div>
              </div>
            </div>

            {/* Story Section */}
            <div
              className={`reveal-el mt-16 ${storyClass} ${textColor}`}
              style={{ borderColor: project.accentColor, opacity: 1 }}
            >
              {project.story}
            </div>

            {/* Description (Optional) */}
            <div className={`reveal-el mt-8 text-lg ${mutedTextColor}`} style={{ opacity: 1 }}>
              {project.description}
            </div>

            {/* Specs Grid */}
            <div
              className={`mt-24 grid grid-cols-1 gap-12 border-t ${borderColor} pt-16 md:grid-cols-4`}
            >
              {[
                { label: "الخامات", value: project.materials },
                { label: "الأبعاد", value: project.dimensions },
                { label: "الألوان", value: project.colors },
                { label: "السعر", value: project.price },
              ].map((spec, i) => (
                <div key={i} className="reveal-el" style={{ opacity: 1 }}>
                  <div className={`text-eyebrow ${mutedTextColor}`}>{spec.label}</div>
                  <div className={`mt-3 text-lg ${textColor}`}>{spec.value}</div>
                </div>
              ))}
            </div>

            {/* Horizontal Gallery */}
            <div className="reveal-el mt-32" style={{ opacity: 1 }}>
              <div className={`mb-8 text-eyebrow ${mutedTextColor}`}>معرض الصور</div>
              <div
                className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar"
                data-lenis-prevent="true"
              >
                {project.gallery.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`${project.title} ${i}`}
                    className={`h-[400px] w-auto max-w-[80vw] shrink-0 snap-center rounded-2xl object-cover border ${borderColor}`}
                  />
                ))}
              </div>
            </div>

            {/* Spacer for CTA */}
            <div style={{ paddingBottom: "180px" }} />
          </div>
        </div>

        {/* Floating Sticky CTA Wrapper */}
        <div className="absolute bottom-0 left-0 right-0 z-50 h-40 flex flex-col items-center justify-end pointer-events-none pb-6 px-4 md:h-48 md:pb-10">
          {/* Subtle top gradient fade behind the CTA (adapts to background) */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(to top, ${isMinimal ? "#F4F4F4" : "#0B1012"} 0%, ${isMinimal ? "rgba(244,244,244,0.8)" : "rgba(11,16,18,0.8)"} 50%, transparent 100%)`,
            }}
          />

          <div
            ref={ctaRef}
            className={`pointer-events-auto relative flex w-full flex-col md:w-auto md:flex-row items-center gap-4 rounded-3xl md:rounded-full border ${borderColor} ${isMinimal ? "bg-white/80" : "bg-white/5"} px-4 py-4 backdrop-blur-xl`}
            style={{ opacity: 1 }}
          >
            <a
              href={whatsappMessageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex w-full md:w-auto items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors hover:opacity-90 ${isMinimal ? "text-white" : "text-black"}`}
              style={{ backgroundColor: project.accentColor || project.themeColor || "#fff" }}
            >
              تواصل عبر واتساب
            </a>
            <button
              ref={orderBtnRef}
              onClick={handleOrder}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              disabled={isOrdering}
              className={`relative overflow-hidden w-full md:w-auto flex items-center justify-center gap-3 rounded-full px-8 py-3 text-sm font-medium transition-colors ${isMinimal ? "bg-white/40 border border-black/10 text-black" : "bg-white/10 border border-white/20 text-white"} backdrop-blur-md group`}
              style={{
                boxShadow: isMinimal ? "0 4px 20px rgba(0,0,0,0.05)" : "0 4px 20px rgba(255,255,255,0.05)",
              }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%]" />
              
              {isOrdering ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>جاري الطلب...</span>
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-90">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                  <span>اطلب الآن</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalMarkup, document.body);
}
