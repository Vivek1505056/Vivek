import {
  ArrowUpRight,
  BadgeCheck,
  ChevronRight,
  Code2,
  Github,
  GraduationCap,
  Linkedin,
  Moon,
  Radar,
  Recycle,
  ShieldCheck,
  Sparkles,
  Sun,
  Trophy,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

const links = {
  github: 'https://github.com/Vivek1505056',
  linkedin: 'https://ca.linkedin.com/in/vivek-koul-716623201',
  mirrormire: 'https://www.mirrormire.ai',
  routevision: 'https://www.youtube.com/watch?v=CdYRXjqFlb4',
  popeye: 'https://youtu.be/-WnZrUeG6h8',
  recycling: 'https://www.youtube.com/watch?v=1OFQtQJqzdA',
};

const publicAsset = (path) => `${import.meta.env.BASE_URL}${path}`;

const navItems = [
  { id: 'about', nav: 'About', number: '01' },
  { id: 'work-education', nav: 'Work and Education', number: '02' },
  { id: 'projects', nav: 'Projects', number: '03' },
];

const workEducation = [
  {
    title: 'MirrorMire AI',
    subtitle: 'CMO & Founding Engineer',
    meta: 'Dec 2025 - Present',
    icon: ShieldCheck,
    href: links.mirrormire,
    accent: 'text-skyglass',
    description:
      'Developing production React interfaces, managing code through Git/GitHub, deploying on Cloudflare, and supporting the company’s public presence through LinkedIn and product video work.',
    details: ['React production website', 'Cloudflare deployment', 'Git/GitHub workflow', 'Brand and growth support'],
  },
  {
    title: 'University of Waterloo',
    subtitle: 'Bachelor of Mathematics',
    meta: 'Mathematics student',
    icon: GraduationCap,
    href: links.linkedin,
    accent: 'text-signal',
    description:
      'Studying mathematics while building software that relies on structured thinking, fast iteration, and clear communication across technical and non-technical contexts.',
    details: ['Mathematical problem solving', 'Technical communication', 'Product-minded engineering', 'Startup execution'],
  },
];

const projects = [
  {
    title: 'RouteVision',
    subtitle: 'Computer vision system for quarterback decision-making',
    meta: 'Waterloo Hackathon Winner',
    icon: Trophy,
    href: links.routevision,
    accent: 'text-pollen',
    description:
      'Detects players, tracks routes, estimates receiver openness, and converts football film into passing feedback. Awarded Best Technical Hack at a Waterloo hackathon.',
    details: ['YOLOv8 + OpenCV', 'ByteTrack tracking', 'FastAPI + React', 'Receiver openness scoring'],
  },
  {
    title: 'Popeye',
    subtitle: 'Maritime fleet intelligence platform',
    meta: 'AI Genesis 2026',
    icon: Radar,
    href: links.popeye,
    accent: 'text-signal',
    description:
      'A vessel-tracking interface for AIS playback, collision risk, silence periods, anomaly scoring, and AI-guided operator support.',
    details: ['AIS movement playback', 'Collision risk detection', 'VAE anomaly scoring', 'IBM watsonx advisory flow'],
  },
  {
    title: 'Recycling Detector',
    subtitle: 'Applied computer vision classifier',
    meta: 'Hack Canada',
    icon: Recycle,
    href: links.recycling,
    accent: 'text-emerald-300',
    description:
      'A web app scaffold for recyclable-item classification through image upload or camera capture, with a YOLOv8-ready inference path.',
    details: ['React + Tailwind', 'FastAPI backend', 'Upload and camera flow', 'YOLOv8-ready inference path'],
  },
];

const capabilities = [
  'React',
  'JavaScript',
  'Tailwind CSS',
  'FastAPI',
  'Git/GitHub',
  'Cloudflare',
  'Computer Vision',
  'Growth',
  'AI Workflows',
  'Customer Service',
];

function App() {
  const [activeId, setActiveId] = useState(navItems[0].id);
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark';

    const savedTheme = window.localStorage.getItem('portfolio-theme');
    if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;

    return 'light';
  });
  const sectionIds = useMemo(() => navItems.map((section) => section.id), []);
  const isLight = theme === 'light';

  const handleNavigate = (id) => {
    const element = document.getElementById(id);
    if (!element) return;

    setActiveId(id);
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.replaceState(null, '', `#${id}`);
  };

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  useEffect(() => {
    let animationFrame = 0;

    const updateActiveSection = () => {
      const marker = window.innerHeight * 0.34;
      let current = sectionIds[0];

      sectionIds.forEach((id) => {
        const element = document.getElementById(id);
        if (!element) return;

        if (element.getBoundingClientRect().top <= marker) {
          current = id;
        }
      });

      setActiveId(current);
    };

    const onScroll = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [sectionIds]);

  return (
    <main className={`theme-root min-h-screen text-white ${isLight ? 'theme-light' : 'theme-dark'}`}>
      <ThemeToggle theme={theme} onToggle={toggleTheme} />
      <div className="theme-glow pointer-events-none fixed inset-0 z-0" />
      <div className="pointer-events-none fixed inset-0 z-0 grid-noise opacity-[0.12]" />

      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[minmax(320px,0.72fr)_minmax(0,1fr)] lg:gap-20">
        <Sidebar activeId={activeId} onNavigate={handleNavigate} />
        <ScrollColumn />
      </div>
    </main>
  );
}

function ThemeToggle({ theme, onToggle }) {
  const isLight = theme === 'light';

  return (
    <button
      type="button"
      className={`theme-toggle ${isLight ? 'is-light' : ''}`}
      onClick={onToggle}
      aria-label={`Switch to ${isLight ? 'night' : 'day'} mode`}
      aria-pressed={isLight}
      title={`Switch to ${isLight ? 'night' : 'day'} mode`}
    >
      <span className="theme-toggle-icon">
        <Sun size={15} />
      </span>
      <span className="theme-toggle-icon">
        <Moon size={15} />
      </span>
      <span className="theme-toggle-thumb" />
    </button>
  );
}

function Sidebar({ activeId, onNavigate }) {
  return (
    <aside className="sidebar-shell">
      <div>
        <a
          href="#about"
          className="mb-8 inline-flex items-center gap-3"
          aria-label="Vivek Koul home"
          onClick={(event) => {
            event.preventDefault();
            onNavigate('about');
          }}
        >
          <span className="grid h-10 w-10 place-items-center border border-azure/50 bg-azure/10 font-display text-sm font-black text-skyglass shadow-glow">
            VK
          </span>
          <span className="text-xs font-black uppercase text-white/50">Portfolio</span>
        </a>

        <div className="identity-lockup">
          <img className="headshot" src={publicAsset('assets/vivek-headshot.png')} alt="Vivek Koul" />
          <div>
            <h1 className="font-display text-4xl font-black leading-none text-white sm:text-5xl">Vivek Koul</h1>
            <div className="mt-4 space-y-2 text-sm leading-6 text-white/70">
              <p className="font-bold text-skyglass">CMO & Founding Engineer at MirrorMire</p>
              <p>University of Waterloo Mathematics student</p>
            </div>
          </div>
        </div>

        <p className="mt-6 max-w-lg text-base leading-8 text-white/60">
          Building across cybersecurity, AI, and applied computer vision with a focus on products that make complex signals easier to use.
        </p>

        <nav className="mt-9" aria-label="Portfolio sections">
          <div className="grid gap-2">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`side-tab ${activeId === item.id ? 'is-active' : ''}`}
                onClick={(event) => {
                  event.preventDefault();
                  onNavigate(item.id);
                }}
              >
                <span>{item.number}</span>
                <span>{item.nav}</span>
              </a>
            ))}
          </div>
        </nav>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-3 lg:mt-0">
        <IconLink href={links.github} label="GitHub">
          <Github size={17} />
        </IconLink>
        <IconLink href={links.linkedin} label="LinkedIn">
          <Linkedin size={17} />
        </IconLink>
        <a className="button-secondary" href={links.mirrormire} target="_blank" rel="noreferrer">
          <ShieldCheck size={17} />
          MirrorMire
        </a>
      </div>
    </aside>
  );
}

function ScrollColumn() {
  return (
    <section className="scroll-column">
      <AboutSection />
      <WorkEducationSection />
      <ProjectsSection />
      <Contact />
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="content-section scroll-mt-8">
      <SectionLabel icon={BadgeCheck} label="About" />
      <h2 className="content-title">Building where product, growth, and technical systems meet.</h2>
      <p className="content-copy">
        I’m a Mathematics student at the University of Waterloo and a founding team member at MirrorMire, where I work across full-stack engineering, growth, and product storytelling.
      </p>
      <p className="content-copy">
        My strongest projects sit at the edge of real-world interpretation: evaluating receiver openness in football film with RouteVision, tracking maritime fleet behavior, and classifying recyclable objects through computer vision.
      </p>

      <div className="mt-8 overflow-hidden border border-white/10 bg-white/[0.035]">
        <img
          className="h-56 w-full object-cover object-center opacity-[0.85] sm:h-72"
          src={publicAsset('assets/vivek-signal-map.png')}
          alt="Abstract azure systems map representing cybersecurity, sports vision, maritime intelligence, and recycling AI."
        />
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {capabilities.map((capability) => (
          <span key={capability} className="capability-box">
            {capability}
          </span>
        ))}
      </div>
    </section>
  );
}

function WorkEducationSection() {
  return (
    <section id="work-education" className="content-section scroll-mt-8">
      <SectionLabel icon={GraduationCap} label="Work and Education" />
      <h2 className="content-title">Startup execution backed by mathematical training.</h2>
      <div className="mt-8 space-y-5">
        {workEducation.map((item) => (
          <InfoCard key={item.title} item={item} />
        ))}
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="content-section scroll-mt-8">
      <SectionLabel icon={Code2} label="Projects" />
      <h2 className="content-title">Applied builds across sport, sea, and sustainability.</h2>
      <div className="mt-8 space-y-5">
        {projects.map((item) => (
          <InfoCard key={item.title} item={item} isLink linkLabel="View project" />
        ))}
      </div>
    </section>
  );
}

function InfoCard({ item, isLink = false, linkLabel = 'View project' }) {
  if (isLink) {
    return (
      <a className="info-card project-link-card group" href={item.href} target="_blank" rel="noreferrer">
        <InfoCardContent item={item} showLink linkLabel={linkLabel} />
      </a>
    );
  }

  return (
    <article className="info-card group">
      <InfoCardContent item={item} />
    </article>
  );
}

function InfoCardContent({ item, showLink = false, linkLabel = 'View project' }) {
  const Icon = item.icon;

  return (
    <>
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className={`text-xs font-black uppercase ${item.accent}`}>{item.meta}</p>
          <h3 className="mt-2 font-display text-2xl font-black leading-tight text-white md:text-3xl">{item.title}</h3>
          <p className="mt-2 text-sm font-bold leading-6 text-white/50">{item.subtitle}</p>
        </div>
        <span className="grid h-11 w-11 shrink-0 place-items-center border border-white/10 bg-white/[0.04] text-white transition group-hover:border-azure/50 group-hover:text-skyglass">
          <Icon size={20} />
        </span>
      </div>

      <p className="mt-6 text-sm leading-7 text-white/70">{item.description}</p>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {item.details.map((detail) => (
          <div key={detail} className="detail-box">
            <ChevronRight size={15} className="shrink-0 text-azure" />
            {detail}
          </div>
        ))}
      </div>

      {showLink && (
        <span className="inline-link mt-7">
          {linkLabel} <ArrowUpRight size={16} />
        </span>
      )}
    </>
  );
}

function Contact() {
  return (
    <section id="contact" className="pb-12">
      <div className="border border-white/10 bg-white/[0.04] p-6 shadow-line md:p-8">
        <SectionLabel icon={Sparkles} label="Next" />
        <h2 className="font-display text-3xl font-black leading-tight text-white md:text-4xl">
          Open to technical, growth, AI, and cybersecurity conversations.
        </h2>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a className="button-primary" href={links.linkedin} target="_blank" rel="noreferrer">
            <Linkedin size={18} />
            LinkedIn
          </a>
          <a className="button-secondary" href={links.github} target="_blank" rel="noreferrer">
            <Github size={18} />
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

function SectionLabel({ icon: Icon, label }) {
  return (
    <div className="section-kicker">
      <Icon size={16} />
      {label}
    </div>
  );
}

function IconLink({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="grid h-12 w-12 place-items-center border border-white/10 bg-white/[0.04] text-white/70 transition hover:border-azure/50 hover:text-skyglass"
      aria-label={label}
      title={label}
    >
      {children}
    </a>
  );
}

export default App;
