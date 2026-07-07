import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import p1 from "@/assets/project-1.jpeg";
import p2 from "@/assets/project-2.jpeg";
import p3 from "@/assets/project-3.jpeg";
import p4 from "@/assets/gal-1.jpg";
import p5 from "@/assets/gal-2.jpg";
import p6 from "@/assets/gal-3.jpg";
import p7 from "@/assets/gal-4.jpg";
import p8 from "@/assets/collection-1.jpg";
import p9 from "@/assets/collection-2.jpg";
import p10 from "@/assets/chair.jpeg";
import p11 from "@/assets/interlock.jpeg";
import p12 from "@/assets/photoChair.jpeg";
import { ProjectModal } from "./ProjectModal";

gsap.registerPlugin(ScrollTrigger, Flip);

export type Project = {
  id: string;
  img: string;
  title: string;
  place: string;
  year: string;
  description: string;
  materials: string;
  dimensions: string;
  colors: string;
  category: string;
  price: string;
  themeColor: string;
  gallery: string[];
  vibe: "luxury" | "minimal" | "editorial";
  accentColor: string;
  bgStyle: string;
  story: string;
};

const PROJECTS: Project[] = [
  {
    id: "PRJ-001",
    img: p1,
    title: "مجلس فيلا ملكي",
    place: "الرياض، السعودية",
    year: "2024",
    description: "تصميم داخلي متكامل لمجلس فخم يعكس أصالة التراث السعودي بلمسات معاصرة. تم استخدام خشب الجوز الطبيعي مع تفاصيل نحاسية متقنة لتعزيز الفخامة، في مساحة مصممة لاستقبال الضيوف بحفاوة ورقي.",
    materials: "خشب الجوز الطبيعي، نحاس مصقول، قماش مخملي فاخر",
    dimensions: "مجلس رئيسي بمساحة 80 متر مربع",
    colors: "بني دافئ، ذهبي نحاسي، بيج",
    category: "مجالس فاخرة",
    price: "حسب الطلب",
    themeColor: "#bfa38b",
    gallery: [p1, p2, p3],
    vibe: "luxury",
    accentColor: "#D4AF37",
    bgStyle: "bg-[#0B1012]",
    story: "صُمم هذا المجلس ليكون واجهة استقبال مبهرة في قلب العاصمة الرياض. اعتمدنا على الحفر اليدوي الدقيق باستخدام أحدث تقنيات CNC مع تشطيب يدوي لنبرز عروق الخشب الطبيعية ونحقق التكامل بين الفخامة والعملية.",
  },
  {
    id: "PRJ-002",
    img: p2,
    title: "مجموعة طاولات نجد",
    place: "الدرعية، السعودية",
    year: "2023",
    description: "مجموعة فاخرة من طاولات الطعام مصممة خصيصاً لتعكس روح الدرعية المعمارية. تتكون من طاولات خشبية صلبة تمزج بين البلوط الأوروبي وتفاصيل من الرخام الطبيعي.",
    materials: "خشب البلوط الصلب، رخام طبيعي، زجاج مقسى",
    dimensions: "طاولة طعام تتسع لـ 14 شخصاً",
    colors: "أسود فحمي، رمادي، خشبي داكن",
    category: "أثاث غرف الطعام",
    price: "حسب الطلب",
    themeColor: "#5c5c5c",
    gallery: [p2, p3, p1],
    vibe: "editorial",
    accentColor: "#FFFFFF",
    bgStyle: "bg-[#000000]",
    story: "استوحينا تصميم هذه المجموعة من صلابة وتاريخ منطقة نجد. تم تشكيل الخشب بأيدي حرفيين مهرة في مصنعنا لضمان تحمل الاستخدام اليومي مع الاحتفاظ بمظهر سينمائي راقٍ يليق بالمنازل السعودية الفاخرة.",
  },
  {
    id: "PRJ-003",
    img: p3,
    title: "جناح ضيافة فاخر",
    place: "جدة، السعودية",
    year: "2023",
    description: "جناح ضيافة مطل على البحر الأحمر، صُمم باستخدام أخشاب مقاومة للرطوبة وألوان هادئة تعكس زرقة البحر. يضم الجناح أثاثاً مدمجاً وحلول تخزين خفية بأسلوب الحد الأدنى.",
    materials: "خشب السنديان المعالج، قشرة خشب طبيعي، أقمشة كتان",
    dimensions: "جناح فندقي بمساحة 120 متر مربع",
    colors: "أبيض رملي، أزرق سماوي، خشبي فاتح",
    category: "أثاث فندقي",
    price: "حسب الطلب",
    themeColor: "#8b9487",
    gallery: [p3, p1, p2],
    vibe: "minimal",
    accentColor: "#A3A8A0",
    bgStyle: "bg-[#F4F4F4]",
    story: "تطلب هذا المشروع في جدة دراسة دقيقة لمقاومة العوامل الجوية الساحلية. استخدمنا أخشاباً معالجة بعناية لتقديم تجربة ضيافة استثنائية، تجمع بين الراحة المطلقة والجمال البصري المريح للأعصاب.",
  },
  {
    id: "PRJ-004",
    img: p4,
    title: "مكتب تنفيذي",
    place: "الخبر، السعودية",
    year: "2024",
    description: "مساحة مكتبية فاخرة لكبار التنفيذيين، مصممة باستخدام خشب الماهوجني لتعزيز الشعور بالهيبة والاحترافية. يشمل مكتباً واسعاً، وحدة أرفف مكتبية، وطاولة اجتماعات مدمجة.",
    materials: "خشب الماهوجني، جلد طبيعي أسود، ستانلس ستيل داكن",
    dimensions: "مكتب تنفيذي متكامل",
    colors: "بني داكن، أسود، معدني",
    category: "أثاث مكتبي",
    price: "حسب الطلب",
    themeColor: "#d4af37",
    gallery: [p4, p5, p6],
    vibe: "luxury",
    accentColor: "#d4af37",
    bgStyle: "bg-[#111111]",
    story: "صُمم هذا المكتب ليعكس السلطة والنجاح. كل زاوية فيه تروي قصة من الحرفية الدقيقة، حيث دمجنا بين الخشب الطبيعي الفاخر والتكنولوجيا الحديثة المخفية بذكاء لتلبية احتياجات العمل اليومية.",
  },
  {
    id: "PRJ-005",
    img: p5,
    title: "قاعة استقبال الملكية",
    place: "مكة المكرمة، السعودية",
    year: "2023",
    description: "تصميم وتنفيذ أثاث قاعة استقبال فخمة في أحد الفنادق المجاورة للحرم. يتميز المشروع بتكسيات جدارية خشبية معقدة ومكاتب استقبال مصممة لتتحمل الاستخدام الكثيف بلمسة من الرقي.",
    materials: "خشب الزان، تفاصيل نحاسية إسلامية، رخام",
    dimensions: "لوبي فندقي واسع",
    colors: "ذهبي معتق، خشبي كلاسيكي، كريمي",
    category: "مشاريع تجارية",
    price: "حسب الطلب",
    themeColor: "#6c757d",
    gallery: [p5, p6, p7],
    vibe: "editorial",
    accentColor: "#FF5733",
    bgStyle: "bg-[#1C1C1C]",
    story: "كان التحدي في هذا المشروع هو تقديم تصميم إسلامي معاصر باستخدام الخشب الطبيعي. استخدمنا تقنيات CNC الدقيقة لحفر الزخارف ثم قمنا بالتشطيب اليدوي لضمان جودة استثنائية تليق بزوار العاصمة المقدسة.",
  },
  {
    id: "PRJ-006",
    img: p6,
    title: "مطبخ خشبي فاخر",
    place: "الدمام، السعودية",
    year: "2025",
    description: "مطبخ عصري يدمج بين العملية والجمال، باستخدام خزائن من الخشب المصمت المصقول بعناية. يتميز بحلول تخزين ذكية وجزيرة مركزية من الخشب والرخام تلبي احتياجات الأسرة السعودية.",
    materials: "خشب الرماد (Ash Wood)، رخام كلكتا، مقابض معدنية مخفية",
    dimensions: "مطبخ رئيسي وجزيرة وسطية",
    colors: "أبيض ثلجي، خشبي فاتح، معدني",
    category: "تصميم داخلي",
    price: "حسب الطلب",
    themeColor: "#f8f9fa",
    gallery: [p6, p7, p8],
    vibe: "minimal",
    accentColor: "#00B4D8",
    bgStyle: "bg-[#FFFFFF]",
    story: "تم تصميم هذا المطبخ ليكون قلب المنزل النابض. ركزنا على المتانة ومقاومة الحرارة والرطوبة باستخدام طبقات طلاء مخصصة، مع الحفاظ على المظهر الطبيعي الساحر لعروق خشب الرماد الفاتح.",
  },
  {
    id: "PRJ-007",
    img: p7,
    title: "غرفة نوم الرياض",
    place: "الرياض، السعودية",
    year: "2024",
    description: "جناح نوم رئيسي مصمم لتوفير أقصى درجات الراحة والهدوء. يتميز بسرير ذي خلفية خشبية ممتدة مع إضاءة مخفية، ووحدات تخزين جانبية مصممة لتتناغم مع لغة التصميم العام.",
    materials: "قشرة خشب الجوز، أقمشة بوكليه ناعمة، تفاصيل برونزية",
    dimensions: "جناح نوم رئيسي",
    colors: "بني محروق، رمادي دافئ، برونزي",
    category: "أثاث سكني",
    price: "حسب الطلب",
    themeColor: "#5c4033",
    gallery: [p7, p8, p9],
    vibe: "luxury",
    accentColor: "#D2B48C",
    bgStyle: "bg-[#2C241B]",
    story: "تعتبر غرفة النوم ملاذاً للراحة بعد يوم طويل. صممنا هذه المجموعة لتوازن بين الدفء الذي يوفره خشب الجوز ونعومة الأقمشة المستخدمة، مما يخلق بيئة مثالية للاسترخاء في نهاية اليوم.",
  },
  {
    id: "PRJ-008",
    img: p8,
    title: "كسوة جدارية خشبية",
    place: "أبها، السعودية",
    year: "2023",
    description: "مشروع تكسية خشبية جدارية لفيلا جبلية في أبها، تدمج بين التراث المعماري للمنطقة والتصميم المعاصر. الخشب المعالج يضيف الدفء البصري والعزل الحراري للمنزل.",
    materials: "خشب الأرز الطبيعي، طلاء حماية مطفي",
    dimensions: "تكسية جدارية بارتفاع 6 أمتار",
    colors: "عسلي غامق، درجات الخشب الطبيعي",
    category: "حلول معمارية",
    price: "حسب الطلب",
    themeColor: "#a39171",
    gallery: [p8, p9, p10],
    vibe: "minimal",
    accentColor: "#2F3E46",
    bgStyle: "bg-[#EAEAEA]",
    story: "لإضفاء الدفء على هذه الفيلا الجبلية، استخدمنا خشب الأرز المعروف بمتانته ورائحته العطرية المميزة. تم تركيب الألواح بنظام تعشيق متطور يسمح بتمدد الخشب طبيعياً مع تغيرات الطقس في المنطقة.",
  },
  {
    id: "PRJ-009",
    img: p9,
    title: "وحدة تلفاز مخصصة",
    place: "تبوك، السعودية",
    year: "2024",
    description: "تصميم وحدة تلفاز جدارية تمتد من الأرض إلى السقف، تضم أرففاً مفتوحة لعرض التحف ووحدات مغلقة لإخفاء الأجهزة. تصميم عصري يعزز من جمالية صالة المعيشة.",
    materials: "قشرة السنديان الأسود، زجاج معتم، ألمنيوم",
    dimensions: "وحدة جدارية متكاملة",
    colors: "أسود مطفي، رمادي، تفاصيل مضيئة",
    category: "أثاث مخصص",
    price: "حسب الطلب",
    themeColor: "#6b8e23",
    gallery: [p9, p10, p11],
    vibe: "editorial",
    accentColor: "#DAA520",
    bgStyle: "bg-[#181C1A]",
    story: "صممت هذه الوحدة لتكون نقطة الجذب الرئيسية في صالة المعيشة. عملنا على إخفاء جميع التوصيلات الكهربائية خلف ألواح خشبية قابلة للفك بسهولة، ودمجنا إضاءة LED لإبراز جمال المعروضات.",
  },
  {
    id: "PRJ-010",
    img: p10,
    title: "مجلس الحجاز",
    place: "المدينة المنورة، السعودية",
    year: "2022",
    description: "تصميم يجمع بين الروحانية والتراث الحجازي الأصيل. مجلس يضم مقاعد خشبية منخفضة بتفاصيل محفورة تعكس فنون العمارة الإسلامية، مع طاولات جانبية بتطعيمات خشبية دقيقة.",
    materials: "خشب الماغنو الطبيعي، تطعيمات صدفية، قماش قطني",
    dimensions: "مجلس بطراز تراثي",
    colors: "بني عتيق، أبيض كريمي، أزرق فيروزي",
    category: "مجالس فاخرة",
    price: "حسب الطلب",
    themeColor: "#cd7f32",
    gallery: [p10, p11, p12],
    vibe: "luxury",
    accentColor: "#800000",
    bgStyle: "bg-[#111111]",
    story: "تطلب هذا المجلس عودة إلى الجذور. قام حرفيونا بنحت كل قطعة يدوياً لتقديم تجربة أصيلة تحاكي عبق الماضي في المدينة المنورة، وتم تطعيم الطاولات بعناية فائقة لتقديم تحفة فنية لا تقدر بثمن.",
  },
  {
    id: "PRJ-011",
    img: p11,
    title: "مجموعة دواليب",
    place: "القصيم، السعودية",
    year: "2025",
    description: "حلول تخزين متكاملة لغرفة ملابس واسعة (Walk-in Closet). تصميم مبتكر يستغل كافة المساحات، ويتضمن أرففاً للأحذية، ووحدات تعليق متعددة المستويات، وجزيرة وسطية للإكسسوارات.",
    materials: "خشب الزان المطلي، زجاج شفاف بإطارات معدنية، إضاءة داخلية",
    dimensions: "غرفة ملابس مخصصة",
    colors: "رمادي فاتح جداً، زجاج عاكس، معدن ذهبي",
    category: "أثاث سكني",
    price: "حسب الطلب",
    themeColor: "#e2725b",
    gallery: [p11, p12, p1],
    vibe: "minimal",
    accentColor: "#4682B4",
    bgStyle: "bg-[#FFF5EE]",
    story: "غرفة الملابس هي المساحة الأكثر خصوصية في المنزل. ركزنا على الوظيفة والتنظيم مع إضافة لمسات فخمة كالأبواب الزجاجية المضاءة من الداخل، مما يسهل رؤية الملابس ويضيف شعوراً بالاتساع في مساحة مغلقة.",
  },
  {
    id: "PRJ-012",
    img: p12,
    title: "تجهيزات مطعم فاخر",
    place: "الطائف، السعودية",
    year: "2024",
    description: "تنفيذ الأعمال الخشبية لمطعم راقٍ في مدينة الطائف، شملت الكراسي المريحة، طاولات الطعام المتينة، والتشكيلات الجدارية التي تعكس طبيعة المنطقة الجبلية والورود الطائفية.",
    materials: "خشب البتولا، جلد صناعي عالي التحمل، تفاصيل حجرية",
    dimensions: "أثاث متكامل للمطعم",
    colors: "وردي خافت، بني خشبي، رمادي صخري",
    category: "مشاريع تجارية",
    price: "حسب الطلب",
    themeColor: "#c2b280",
    gallery: [p12, p1, p2],
    vibe: "luxury",
    accentColor: "#2F4F4F",
    bgStyle: "bg-[#1A1A1A]",
    story: "في هذا المشروع التجاري، كانت المتانة هي الأولوية القصوى بجانب المظهر الفاخر. استخدمنا أخشاباً معالجة بطبقات حماية عالية لمقاومة التآكل اليومي في بيئة المطاعم، مع دمج عناصر مستوحاة من طبيعة الطائف الساحرة.",
  }
];

export function Projects() {
  const root = useRef<HTMLElement>(null);

  const [activeProject, setActiveProject] = useState<{
    project: Project;
    flipState: Flip.FlipState;
  } | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".proj-card", {
        y: 80,
        opacity: 0,
        filter: "blur(20px)",
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.15,
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(el, {
      rotateY: x * 10,
      rotateX: -y * 10,
      duration: 0.6,
      ease: "power3.out",
      transformPerspective: 900,
    });
    const sheen = el.querySelector<HTMLElement>(".sheen");
    if (sheen) {
      sheen.style.setProperty("--mx", `${(x + 0.5) * 100}%`);
      sheen.style.setProperty("--my", `${(y + 0.5) * 100}%`);
    }
  };

  const onLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, { rotateY: 0, rotateX: 0, duration: 0.9, ease: "power3.out" });
  };

  const openModal = (project: Project, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const card = e.currentTarget.closest(".proj-card");
    const imgEl = card?.querySelector("img");
    if (imgEl) {
      // Lock scroll
      (window as any).__lenis?.stop();

      const state = Flip.getState(imgEl);
      setActiveProject({ project, flipState: state });
      setIsClosing(false);
    }
  };

  const handleClose = () => {
    setIsClosing(true);
  };

  const handleClosed = () => {
    setActiveProject(null);
    setIsClosing(false);
    // Restore scroll
    (window as any).__lenis?.start();
  };

  return (
    <section
      ref={root}
      id="projects"
      className="relative bg-[var(--dark, #0B1012)] bg-[#0B1012] py-32 text-white md:py-44"
    >
      <div className="mx-auto max-w-[1500px] px-6 md:px-12">
        <div className="mb-20 flex items-end justify-between">
          <h2 className="text-display text-5xl md:text-7xl lg:text-[7rem]">
            مشاريع
            <br />
            مختارة.
          </h2>
          <div className="text-eyebrow text-white/50">— مساحات نشكلها</div>
        </div>

        <div className="flex w-full snap-x snap-mandatory flex-row gap-10 overflow-x-auto pb-8 hide-scrollbar">
          {PROJECTS.map((p) => (
            <div
              key={p.title}
              className="proj-card group relative cursor-pointer w-[300px] shrink-0 snap-center md:w-[360px] [transform-style:preserve-3d]"
              onMouseMove={onMove}
              onMouseLeave={onLeave}
              onClick={(e) => openModal(p, e)}
              data-cursor="استعراض"
            >
              <div className="relative overflow-hidden rounded-[15px] border border-white/10 bg-white/5">
                <img
                  id={`proj-img-${p.id}`}
                  data-flip-id={`proj-img-${p.id}`}
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105 opacity-100"
                />
                <div
                  className="sheen pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(400px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.22), transparent 45%)",
                    mixBlendMode: "screen",
                  }}
                />
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
              </div>
              <div className="mt-5 flex items-end justify-between">
                <div>
                  <div className="text-eyebrow text-white/50">{p.place}</div>
                  <div className="mt-2 text-xl tracking-tight">{p.title}</div>
                </div>
                <div className="text-xs text-white/40">{p.year}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeProject !== null && (
        <ProjectModal
          project={activeProject.project}
          flipState={activeProject.flipState}
          isClosing={isClosing}
          onClose={handleClose}
          onClosed={handleClosed}
        />
      )}
    </section>
  );
}
