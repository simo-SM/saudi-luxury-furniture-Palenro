import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { v: 18, suffix: "+", label: "عاماً من الخبرة" },
  { v: 500, suffix: "+", label: "قطعة أثاث مخصصة" },
  { v: 120, suffix: "+", label: "فيلا فاخرة" },
  { v: 98, suffix: "%", label: "رضا العملاء" },
];

export function About() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".counter").forEach((el) => {
        const target = Number(el.dataset.v);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 2.2,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 80%" },
          onUpdate: () => {
            el.textContent = Math.round(obj.v).toString();
          },
        });
      });
      gsap.from(".about-line", {
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="about" className="relative bg-[var(--ink)] py-32 text-white md:py-48">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="text-eyebrow text-white/60">— من نحن</div>
        <h2 className="text-display mt-10 max-w-5xl text-4xl md:text-6xl lg:text-7xl">
          <span className="about-line block">استوديو مكرس للصناعة</span>
          <span className="about-line block text-white/55">المههلة والمتقنة لقطع</span>
          <span className="about-line block">صُممت لتدوم.</span>
        </h2>

        <div className="mt-24 grid grid-cols-2 gap-10 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="flex items-baseline gap-1 text-5xl tracking-tight md:text-6xl">
                <span className="counter" data-v={s.v}>0</span>
                <span>{s.suffix}</span>
              </div>
              <div className="text-eyebrow mt-3 text-white/50">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}