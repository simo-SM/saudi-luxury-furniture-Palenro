import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...pos };

    const xTo = gsap.quickTo(dot.current, "x", { duration: 0.15, ease: "power3.out" });
    const yTo = gsap.quickTo(dot.current, "y", { duration: 0.15, ease: "power3.out" });
    const rxTo = gsap.quickTo(ring.current, "x", { duration: 0.55, ease: "power3.out" });
    const ryTo = gsap.quickTo(ring.current, "y", { duration: 0.55, ease: "power3.out" });

    const move = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      xTo(pos.x);
      yTo(pos.y);
      rxTo(pos.x);
      ryTo(pos.y);
      ringPos.x = pos.x;
      ringPos.y = pos.y;

      const el = e.target as HTMLElement;
      const inter = el.closest("[data-cursor]") as HTMLElement | null;
      if (inter) {
        setHover(true);
        setLabel(inter.dataset.cursor || "");
      } else {
        setHover(false);
        setLabel("");
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[200] hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference md:block"
      />
      <div
        ref={ring}
        className={`pointer-events-none fixed left-0 top-0 z-[200] hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 text-[10px] font-medium uppercase tracking-[0.25em] text-white backdrop-blur-md transition-[width,height,background-color] duration-300 ease-out md:flex ${
          hover ? "h-20 w-20 bg-white/10" : "h-8 w-8 bg-transparent"
        }`}
        style={{ mixBlendMode: hover ? "normal" : "difference" }}
      >
        <span className={hover ? "opacity-100" : "opacity-0"}>{label}</span>
      </div>
    </>
  );
}