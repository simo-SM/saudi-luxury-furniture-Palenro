import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import c1 from "@/assets/collection-1.jpg";
import c2 from "@/assets/collection-2.jpg";

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  { img: c1, name: "كرسي ضيافة الرياض", year: "2024", category: "مقاعد فاخرة" },
  { img: c2, name: "طاولة نجد", year: "2024", category: "أثاث طعام" },
];

export function Collection() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal-mask").forEach((el) => {
        const img = el.querySelector("img");
        gsap.fromTo(
          el,
          { clipPath: "inset(100% 0 0 0)" },
          {
            clipPath: "inset(0% 0 0 0)",
            ease: "expo.out",
            duration: 1.6,
            scrollTrigger: { trigger: el, start: "top 80%" },
          },
        );
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.25 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        }
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="collection"
      className="relative bg-[var(--bone)] py-32 md:py-44"
    >
      <div className="mx-auto max-w-[1500px] px-6 md:px-12">
        <div className="mb-20 flex items-end justify-between">
          <div>
            <div className="text-eyebrow text-[var(--muted-foreground)]">— المجموعة المختارة</div>
            <h2 className="text-display mt-6 text-5xl md:text-7xl lg:text-[7.5rem] !text-[#000]">
              إصدار<br />2024.
            </h2>
          </div>
          <a href="#projects" data-cursor="استعراض" className="hidden text-[11px] uppercase tracking-[0.25em] text-[var(--ink)]/60 md:block">
            استعراض الكل ←
          </a>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
          {ITEMS.map((it, i) => (
            <figure key={it.name} className={i % 2 ? "md:mt-32" : ""}>
              <div className="reveal-mask relative overflow-hidden rounded-[15px]">
                <img
                  src={it.img}
                  alt={it.name}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
              <figcaption className="mt-6 flex items-end justify-between">
                <div>
                  <div className="text-eyebrow text-[var(--muted-foreground)]">{it.category}</div>
                  <div className="mt-2 text-2xl tracking-tight">{it.name}</div>
                </div>
                <span className="text-xs text-[var(--muted-foreground)]">{it.year}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}