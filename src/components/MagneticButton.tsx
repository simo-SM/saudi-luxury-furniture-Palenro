import { useRef, type ReactNode } from "react";
import gsap from "gsap";

export function MagneticButton({
  children,
  className = "",
  onClick,
  strength = 0.35,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const inner = useRef<HTMLSpanElement>(null);

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = ref.current!;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    gsap.to(el, { x: x * strength, y: y * strength, duration: 0.6, ease: "power3.out" });
    gsap.to(inner.current, { x: x * strength * 0.4, y: y * strength * 0.4, duration: 0.6, ease: "power3.out" });
  };
  const onLeave = () => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.4)" });
    gsap.to(inner.current, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.4)" });
  };

  return (
    <button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      className={className}
      data-cursor=""
    >
      <span ref={inner} className="inline-block">
        {children}
      </span>
    </button>
  );
}