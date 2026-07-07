import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import imgOak from "@/assets/treeAnOak.jpeg";
import imgChair from "@/assets/chair.jpeg";
import imgJoinery from "@/assets/interlock.jpeg";
import imgWalnut from "@/assets/nuts.jpeg";
import imgLeather from "@/assets/skin.jpeg";
import imgWorkshop from "@/assets/workahop.jpeg";
import imgWoodKhashb from "@/assets/woodKHashb.jpeg";
import imgHarfiyaWood from "@/assets/harfiyaWood.jpeg";
import imgCnc from "@/assets/cnc.jpeg";
import imgNijaraCarpenter from "@/assets/nijara-carpenter.jpeg";
import vidDesignoute from "@/assets/designoute.mp4";
import imgTashtip from "@/assets/tashtip.jpeg";

gsap.registerPlugin(ScrollTrigger);

// High-quality premium media URLs for the interactive keywords.
// Mixed Unsplash photos and placeholder W3Schools/Coverr videos (since direct Pexels links expire).
// You can replace these with your own custom MP4s or optimized WebP images later.
const KEYWORDS = [
  { id: "naturalwood", word: "الخشب الطبيعي", type: "image", src: imgWoodKhashb },
  { id: "handcraft", word: "الحرفية", type: "image", src: imgHarfiyaWood }, 
  { id: "oak", word: "البلوط", type: "image", src: imgOak },
  { id: "walnut", word: "الجوز", type: "image", src: imgWalnut },
  { id: "details", word: "التفاصيل", type: "image", src: imgChair },
  { id: "joinery", word: "النجارة", type: "image", src: imgNijaraCarpenter },
  { id: "finishing", word: "التشطيب", type: "image", src: imgTashtip },
  { id: "interior", word: "التصميم الداخلي", type: "video", src: vidDesignoute },
  { id: "sustainability", word: "الاستدامة", type: "image", src: imgWorkshop },
  { id: "cnc", word: "CNC", type: "image", src: imgCnc },
];

const PARAGRAPH = [
  { type: "text", content: "في قلب السعودية، نحول " },
  { type: "keyword", id: "naturalwood", content: "الخشب الطبيعي" },
  { type: "text", content: " إلى تحف فنية. نعتمد على أعلى معايير " },
  { type: "keyword", id: "handcraft", content: "الحرفية" },
  { type: "text", content: " حيث يعانق خشب " },
  { type: "keyword", id: "oak", content: "البلوط" },
  { type: "text", content: " الأوروبي و " },
  { type: "keyword", id: "walnut", content: "الجوز" },
  { type: "text", content: " الأمريكي أيدي الصناع. نعتني بأدق " },
  { type: "keyword", id: "details", content: "التفاصيل" },
  { type: "text", content: " عبر دمج تقنيات " },
  { type: "keyword", id: "cnc", content: "CNC" },
  { type: "text", content: " مع أسس " },
  { type: "keyword", id: "joinery", content: "النجارة" },
  { type: "text", content: " التقليدية وبراعة " },
  { type: "keyword", id: "finishing", content: "التشطيب" },
  { type: "text", content: " اليدوي. نقدم حلول " },
  { type: "keyword", id: "interior", content: "التصميم الداخلي" },
  { type: "text", content: " الفاخرة مع التزامنا التام بمبادئ " },
  { type: "keyword", id: "sustainability", content: "الاستدامة" },
  { type: "text", content: " لتكون قطعنا إرثاً يتجاوز الزمن." },
];

export function Craft() {
  const root = useRef<HTMLElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isHoverable, setIsHoverable] = useState(true);

  // Check if device supports hover
  useEffect(() => {
    setIsHoverable(window.matchMedia("(hover: hover)").matches);
  }, []);

  // Desktop GSAP Follower Logic
  useEffect(() => {
    if (!isHoverable || !floatingRef.current) return;
    
    // Create optimized GSAP quick setters for the follower
    const xTo = gsap.quickTo(floatingRef.current, "x", { duration: 0.6, ease: "power3.out" });
    const yTo = gsap.quickTo(floatingRef.current, "y", { duration: 0.6, ease: "power3.out" });

    const moveHandler = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", moveHandler);
    return () => window.removeEventListener("mousemove", moveHandler);
  }, [isHoverable]);

  // Handle Reveal/Hide Animations for the Floating Preview
  useEffect(() => {
    if (!isHoverable || !floatingRef.current) return;
    
    if (activeId) {
      gsap.to(floatingRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.35,
        ease: "power3.out",
      });
    } else {
      gsap.to(floatingRef.current, {
        opacity: 0,
        scale: 0.9,
        y: 20,
        duration: 0.35,
        ease: "power3.out",
      });
    }
  }, [activeId, isHoverable]);

  // Fade up the whole section on scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        root.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: { trigger: root.current, start: "top 75%" },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="craft" className="relative bg-[var(--bone)] py-32 md:py-56">
      
      {/* Desktop Floating Preview Layer */}
      {isHoverable && (
        <div
          ref={floatingRef}
          className="pointer-events-none fixed left-0 top-0 z-[100] h-[340px] w-[260px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[22px] border border-white/15 bg-black/20 shadow-2xl backdrop-blur-md opacity-0 scale-90 translate-y-5"
          style={{ willChange: "transform, opacity" }}
        >
          {KEYWORDS.map((kw) => (
            <div
              key={kw.id}
              className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                activeId === kw.id ? "opacity-100" : "opacity-0"
              }`}
            >
              {kw.type === "video" ? (
                <video
                  src={kw.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover"
                />
              ) : (
                <img
                  src={kw.src}
                  alt={kw.word}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
          ))}
        </div>
      )}

      <div className="mx-auto max-w-[1500px] px-6 md:px-12">
        <div className="mb-16 text-center text-eyebrow text-[var(--muted-foreground)] uppercase tracking-widest">— الحرفية والمواد</div>
        
        <h2 
          className="text-display mx-auto max-w-[1200px] text-center text-2xl leading-[1.8] text-[#000] md:text-4xl md:leading-[1.7] lg:text-[2.75rem] lg:leading-[1.6]"
          style={{ wordSpacing: "0.1em" }}
        >
          {PARAGRAPH.map((item, i) => {
            if (item.type === "text") {
              return <span key={i} className="text-[#000]/80">{item.content}</span>;
            }
            
            const isActive = activeId === item.id;
            
            return (
              <span
                key={i}
                role="button"
                tabIndex={0}
                aria-label={`View ${item.content}`}
                onMouseEnter={() => isHoverable && setActiveId(item.id)}
                onMouseLeave={() => isHoverable && setActiveId(null)}
                onClick={() => !isHoverable && setActiveId(activeId === item.id ? null : item.id)}
                className={`relative inline-block cursor-pointer transition-all duration-300 ease-out text-[#000] mx-2 ${
                  isActive ? "font-bold scale-105" : "font-medium"
                }`}
                style={{
                  textShadow: isActive ? "0 4px 20px rgba(0,0,0,0.15)" : "none",
                }}
              >
                {item.content}
                {/* Expanding Underline */}
                <span
                  className={`absolute -bottom-1 left-0 h-[3px] w-full bg-[#000] rounded-full transition-transform duration-300 origin-center ${
                    isActive ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </span>
            );
          })}
        </h2>

        {/* Mobile Accordion Media Reveal */}
        {!isHoverable && (
          <div className="mx-auto mt-16 max-w-lg">
            <div 
              className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                activeId ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="h-[400px] w-full overflow-hidden rounded-[24px] shadow-2xl">
                {KEYWORDS.map((kw) => (
                  <div
                    key={kw.id}
                    className={`h-full w-full absolute inset-0 transition-opacity duration-500 ease-in-out ${
                      activeId === kw.id ? "opacity-100 relative z-10" : "opacity-0 absolute z-0 pointer-events-none"
                    }`}
                  >
                    {kw.type === "video" ? (
                      <video src={kw.src} autoPlay loop muted playsInline className="h-full w-full object-cover" />
                    ) : (
                      <img src={kw.src} alt={kw.word} className="h-full w-full object-cover" />
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center text-sm font-medium text-[#000]">
                {KEYWORDS.find(k => k.id === activeId)?.word}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}