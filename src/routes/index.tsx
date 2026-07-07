import { createFileRoute } from "@tanstack/react-router";
import { useLenis } from "@/lib/useLenis";
import { Cursor } from "@/components/Cursor";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/sections/Hero";
import { Collection } from "@/components/sections/Collection";
import { Projects } from "@/components/sections/Projects";
import { Craft } from "@/components/sections/Craft";
import { Gallery } from "@/components/sections/Gallery";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PALENRO — نصنع أثاثاً يتجاوز الزمن" },
      { name: "description", content: "تصمم PALENRO أثاثاً نحتياً يتجاوز الزمن — تجربة فاخرة في بساطة العمارة وبراعة الحرفية." },
      { property: "og:title", content: "PALENRO — نصنع أثاثاً يتجاوز الزمن" },
      { property: "og:description", content: "أثاث نحتي يتجاوز الزمن متجذر في بساطة العمارة." },
    ],
  }),
  component: Index,
});

function Index() {
  useLenis();

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[var(--bone)] text-[var(--ink)]">
      <Cursor />
      <Nav ready={true} />
      
      <div id="page-content" className="origin-top">
        <div id="hero-wrapper" className="transition-[filter] duration-500">
          <Hero ready={true} />
        </div>
        <Collection />
        <Projects />
        <Craft />
        <Gallery />
        <About />
        <Contact />
      </div>
    </main>
  );
}
