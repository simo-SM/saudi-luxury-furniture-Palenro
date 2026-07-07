import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import g1 from "@/assets/gal-1.jpg";
import g2 from "@/assets/gal-2.jpg";
import g3 from "@/assets/gal-3.jpg";
import g4 from "@/assets/gal-4.jpg";

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  { img: g1, name: "باب جدة الخشبي", h: "tall" },
  { img: g2, name: "مجلس الحجاز", h: "short" },
  { img: g3, name: "مكتبة القصيم", h: "tall" },
  { img: g4, name: "وحدة تلفاز خشبية", h: "short" },
];

export function Gallery() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".g-item").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 80, opacity: 0, filter: "blur(18px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.2,
            delay: (i % 2) * 0.1,
            ease: "power4.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          },
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    const img = el.querySelector("img");
    if (img) gsap.to(img, { x: x * 20, y: y * 20, scale: 1.08, duration: 0.6, ease: "power3.out" });
  };
  const onLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const img = e.currentTarget.querySelector("img");
    if (img) gsap.to(img, { x: 0, y: 0, scale: 1, duration: 0.9, ease: "power3.out" });
  };

  return (
    <section ref={root} id="gallery" className="relative bg-white py-32 md:py-44">
      <div className="mx-auto max-w-[1500px] px-6 md:px-12">
        <div className="mb-20 flex items-end justify-between">
          <h2 className="text-display text-5xl md:text-7xl lg:text-[6.5rem]">المعرض.</h2>
          <div className="text-eyebrow text-[var(--muted-foreground)]">— أرشيف الاستوديو</div>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {ITEMS.map((it, i) => (
            <div
              key={it.name}
              className={`g-item relative ${i % 2 === 0 ? "md:mt-20" : ""}`}
              onMouseMove={onMove}
              onMouseLeave={onLeave}
              data-cursor="استعراض"
            >
              <div className="relative overflow-hidden rounded-[15px]">
                <img
                  src={it.img}
                  alt={it.name}
                  loading="lazy"
                  className={`w-full object-cover ${it.h === "tall" ? "aspect-[3/4]" : "aspect-square"}`}
                />
              </div>
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="tracking-tight">{it.name}</span>
                <span className="text-[var(--muted-foreground)]">0{i + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}