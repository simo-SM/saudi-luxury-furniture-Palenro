import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { WHATSAPP_NUMBER_DISPLAY, getWhatsAppUrl } from "../../lib/whatsapp";

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      });

      tl.fromTo(
        ".split-word",
        { y: 120, opacity: 0, rotateZ: 8 },
        { y: 0, opacity: 1, rotateZ: 0, duration: 1.4, ease: "power4.out", stagger: 0.08 }
      )
      .fromTo(
        ".desc-fade",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" },
        "-=1.0"
      )
      .fromTo(
        ".whatsapp-btn",
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, ease: "power4.out" },
        "-=1.1"
      )
      .fromTo(
        ".glass-card",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", stagger: 0.15 },
        "-=1.2"
      )
      .fromTo(
        ".social-link",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, ease: "power3.out", stagger: 0.1 },
        "-=1.0"
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  const GLASS_STYLE: React.CSSProperties = {
    background: "rgba(255, 255, 255, 0.04)",
    backdropFilter: "blur(28px)",
    WebkitBackdropFilter: "blur(28px)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "28px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
    transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
  };

  const handleCardEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "translateY(-8px)";
    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.16)";
    e.currentTarget.style.background = "rgba(255, 255, 255, 0.07)";
  };

  const handleCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
    e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)";
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-[var(--ink)] pb-24 pt-32 text-white">
      <div ref={containerRef} className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="grid grid-cols-1 gap-20 lg:grid-cols-12 lg:gap-16">
          
          {/* ════════ LEFT COLUMN (60%) ════════ */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            <h2 className="text-display text-[15vw] leading-[1.05] lg:text-[7vw]" style={{ color: "#F9F9F9" }}>
              {["لنبدأ", "مشروعك", "القادم"].map((word, i) => (
                <span key={i} className="inline-block overflow-hidden py-2 -my-2 me-4">
                  <span className="split-word inline-block will-change-transform">{word}</span>
                </span>
              ))}
            </h2>

            <p className="desc-fade mt-10 max-w-[480px] text-lg leading-relaxed text-white/60 md:text-xl font-light tracking-wide">
              إذا كنت تبحث عن تصميم داخلي فاخر أو أثاث مخصص، تواصل معنا مباشرة عبر واتساب وسنرد عليك خلال وقت قصير. كل تفصيل عظيم يبدأ بمحادثة بسيطة.
            </p>

            <div className="whatsapp-btn relative mt-16 inline-block self-start">
              {/* Floating glow behind button */}
              <div className="absolute inset-0 scale-[1.3] rounded-full bg-[#25D366] opacity-[0.15] blur-2xl filter pointer-events-none" />
              
              <a
                href={getWhatsAppUrl("مرحباً، أرغب بالاستفسار عن أحد مشاريعكم.")}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-4 overflow-hidden px-10 transition-all duration-400 ease-out"
                style={{
                  height: "60px",
                  borderRadius: "9999px",
                  background: "linear-gradient(135deg, #25D366 0%, #1EBE5D 100%)",
                  boxShadow: "0 20px 50px rgba(37,211,102,.35)",
                  willChange: "transform, box-shadow"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px) scale(1.02)";
                  e.currentTarget.style.boxShadow = "0 35px 90px rgba(37,211,102,.45)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = "0 20px 50px rgba(37,211,102,.35)";
                }}
                onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.98)"}
                onMouseUp={(e) => e.currentTarget.style.transform = "translateY(-4px) scale(1.02)"}
              >
                {/* 3s Shimmer Sweep */}
                <style>{`
                  @keyframes contact-shimmer {
                    0% { transform: translateX(-150%) skewX(-15deg); opacity: 0; }
                    15% { opacity: 1; }
                    30% { transform: translateX(150%) skewX(-15deg); opacity: 0; }
                    100% { transform: translateX(150%) skewX(-15deg); opacity: 0; }
                  }
                `}</style>
                <div
                  className="pointer-events-none absolute inset-0 w-1/2"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                    animation: "contact-shimmer 3s infinite",
                  }}
                />

                <span className="relative z-10 text-lg font-medium text-white">
                  ابدأ المحادثة عبر واتساب
                </span>
                
                {/* WhatsApp SVG Icon */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="relative z-10 text-white mt-0.5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.662-2.062-.173-.299-.018-.462.13-.611.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.052 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* ════════ RIGHT COLUMN (40%) ════════ */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-center">
            
            {/* Card 1: WhatsApp Status */}
            <div 
              className="glass-card flex flex-col p-10 cursor-default"
              style={GLASS_STYLE}
              onMouseEnter={handleCardEnter}
              onMouseLeave={handleCardLeave}
            >
              <div className="text-eyebrow text-white/40 mb-5">واتساب</div>
              <div className="text-3xl md:text-4xl font-semibold tracking-wider text-white mb-8" dir="ltr" style={{ fontFamily: "Inter, sans-serif" }}>
                {WHATSAPP_NUMBER_DISPLAY}
              </div>
              
              <div className="flex items-center gap-3">
                {/* Pulsing Green Dot */}
                <div className="relative flex h-3 w-3 items-center justify-center">
                  <div className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-75"></div>
                  <div className="relative inline-flex h-2 w-2 rounded-full bg-[#25D366]"></div>
                </div>
                <span className="text-[15px] font-medium text-white/90">متصل الآن</span>
              </div>
              
              <p className="mt-3 text-sm font-light text-white/40">
                عادةً نرد خلال أقل من ساعة.
              </p>
            </div>

            {/* Card 2: Working Hours */}
            <div 
              className="glass-card flex flex-col p-10 cursor-default"
              style={GLASS_STYLE}
              onMouseEnter={handleCardEnter}
              onMouseLeave={handleCardLeave}
            >
              <div className="text-eyebrow text-white/40 mb-5">خدمة العملاء</div>
              
              <div className="flex justify-between items-end border-b border-white/10 pb-5 mb-5 text-white/90">
                <span className="text-lg font-medium">متاح طوال الأسبوع</span>
                <span className="text-xl font-light tracking-wider" style={{ fontFamily: "Inter, sans-serif" }}>24 / 7</span>
              </div>
              
              <p className="text-sm font-light text-white/40 leading-relaxed">
                فريقنا متواجد للرد على جميع الاستفسارات واستقبال طلباتكم عبر واتساب على مدار 24 ساعة طوال أيام الأسبوع.
              </p>
            </div>

            {/* Social Links */}
            <div className="social-link mt-8 flex gap-8 px-2 text-[11px] uppercase tracking-[0.25em] text-white">
              {["Instagram", "Pinterest", "Behance"].map((s) => (
                <a key={s} href="#" className="group relative py-2" data-cursor="زيارة">
                  {s}
                  {/* Animated Underline */}
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-500 ease-out group-hover:w-full" />
                </a>
              ))}
            </div>

          </div>
        </div>

        <footer className="relative z-[1] mt-32 flex items-center justify-between border-t border-white/10 pt-8 text-[11px] uppercase tracking-[0.25em] text-white/40">
          <div>© استوديو PALENRO 2026</div>
          <div>صُنع في السعودية</div>
        </footer>
      </div>
    </section>
  );
}