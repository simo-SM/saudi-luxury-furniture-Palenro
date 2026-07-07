import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import hero from "@/assets/hero.jpg";

gsap.registerPlugin(ScrollTrigger);

const WORDS = ["نصنع", "أثاثاً", "يتجاوز الزمن"];

export function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null);
  const img = useRef<HTMLImageElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    gsap.fromTo(
      img.current,
      { scale: 1.4 },
      { scale: 1, duration: 4, ease: "power3.out" },
    );
    gsap.fromTo(
      wordsRef.current,
      { y: 80, opacity: 0, filter: "blur(20px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.6,
        stagger: 0.15,
        ease: "power4.out",
      },
    );

    // parallax on scroll
    const st = gsap.to(img.current, {
      yPercent: 18,
      scale: 1.08,
      ease: "none",
      scrollTrigger: {
        trigger: root.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
    return () => { st.scrollTrigger?.kill(); st.kill(); };
  }, []);

  return (
    <section
      ref={root}
      id="top"
      className="relative h-screen w-full overflow-hidden bg-[var(--ink)] text-white"
    >
      <img
        ref={img}
        src={hero}
        alt="Sculptural boucle armchair in a vast architectural concrete room with diffused morning light"
        width={1920}
        height={1280}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ transformOrigin: "center" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/55" />

      {/* floating particles */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 14 }).map((_, k) => (
          <span
            key={k}
            className="absolute h-1 w-1 rounded-full bg-white/60"
            style={{
              insetInlineStart: `${(k * 73) % 100}%`,
              top: `${(k * 47) % 100}%`,
              filter: "blur(0.5px)",
              animation: `float-particle ${6 + (k % 5)}s ease-in-out ${k * 0.4}s infinite`,
            }}
          />
        ))}
      </div>

      {/* glass reflection overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 60% at 80% 10%, rgba(255,255,255,0.15) 0%, transparent 60%), radial-gradient(60% 50% at 10% 90%, rgba(255,255,255,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-20 md:px-12 lg:pb-28">
        <div className="text-eyebrow mb-8 text-white/70">
          <span className="me-3 inline-block h-px w-10 align-middle bg-white/50" />
          استوديو للأثاث الفاخر — المملكة العربية السعودية
        </div>
        <h1 className="text-display select-none text-[18vw] leading-[1.1] md:text-[12vw] lg:text-[10.5vw] text-[#F4EFE6]">
          {WORDS.map((w, wi) => (
            <span key={wi} className="block overflow-hidden py-[0.2em] -my-[0.2em]">
              <span
                ref={(el) => {
                  if (el) wordsRef.current[wi] = el;
                }}
                className="inline-block will-change-transform"
              >
                {w}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
          <p className="max-w-md text-sm leading-relaxed text-white/70">
            صناعة خشبية فاخرة تعكس تراث العمارة، نعتمد على الخشب الطبيعي لنبتكر مجالس وقطعاً فنية تتجاوز حدود الزمن.
          </p>
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/60">
            <span className="h-px w-12 bg-white/40" />
            تمرير
          </div>
        </div>
      </div>
    </section>
  );
}