import React, { useEffect, useRef, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Spline from '@splinetool/react-spline';
import Lenis from 'lenis';
import { useTranslation } from 'react-i18next';
import { 
  ArrowUpRight, Code2, Cpu, Globe, Layers, MessageSquare, 
  Rocket, Zap, Github, Instagram, Twitter, ExternalLink, 
  CheckCircle2, MousePointer2, Mail, Sparkles, ArrowUp, ArrowRight
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { BentoCard } from './components/BentoCard';
import { LiveChat } from './components/LiveChat';
import { Admin } from './pages/Admin';
import { BlogPost } from './pages/BlogPost';
import { About } from './pages/About';
import { cn } from './lib/utils';
import { db } from './firebase';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from './lib/firestore-error';

gsap.registerPlugin(ScrollTrigger);

// Custom Cursor
const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursorRef.current, { x: e.clientX, y: e.clientY, duration: 0 });
      gsap.to(followerRef.current, { x: e.clientX, y: e.clientY, duration: 0.15, ease: "power2.out" });
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <>
      <div ref={cursorRef} className="hidden md:block fixed top-0 left-0 w-2 h-2 bg-accent rounded-full pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 mix-blend-difference" />
      <div ref={followerRef} className="hidden md:block fixed top-0 left-0 w-8 h-8 border border-accent rounded-full pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-transform duration-300" />
    </>
  );
};

// 3D Tilt Wrapper
const TiltWrapper = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const tiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = tiltRef.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      gsap.to(el, {
        rotateX,
        rotateY,
        transformPerspective: 1000,
        ease: "power2.out",
        duration: 0.5
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        rotateX: 0,
        rotateY: 0,
        ease: "power3.out",
        duration: 1
      });
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div ref={tiltRef} className={cn("transform-style-3d", className)}>
      {children}
    </div>
  );
};

// Intro Animation
const IntroScreen = ({ onComplete }: { onComplete: () => void }) => {
  const introRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ onComplete });
    tl.fromTo(textRef.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1, ease: "power3.out" })
      .to(textRef.current, { opacity: 0, scale: 1.2, duration: 0.5, ease: "power2.in", delay: 0.5 })
      .to(introRef.current, { yPercent: -100, duration: 1, ease: "power4.inOut" });
  }, [onComplete]);

  return (
    <div ref={introRef} className="fixed inset-0 z-[200] bg-[#0f172a] flex items-center justify-center">
      <div ref={textRef} className="text-5xl md:text-7xl font-display font-bold text-slate-200 tracking-tighter">
        KILOUX <span className="text-accent">STUDIO</span>
      </div>
    </div>
  );
};

// Isolated 3D Mascot Component to prevent React re-renders from overwriting GSAP styles
const Mascot3D = () => {
  const { t } = useTranslation();
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);
  const splineContainerRef = useRef<HTMLDivElement>(null);

  const handleSplineLoad = () => {
    setIsSplineLoaded(true);
    if (splineContainerRef.current) {
      gsap.fromTo(splineContainerRef.current, 
        { scale: 0.3, rotation: 15, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, duration: 1.5, ease: "elastic.out(1, 0.5)" }
      );
    }
  };

  return (
    <BentoCard className="h-full min-h-[60vh] lg:min-h-0 p-0 group relative overflow-hidden bg-gradient-to-b from-[#1e293b] to-[#0f172a] flex items-center justify-center">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
      
      {/* Loading State */}
      <div className={cn(
        "absolute inset-0 flex flex-col items-center justify-center z-20 bg-[#0f172a] transition-opacity duration-700",
        isSplineLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
      )}>
        <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-accent font-mono text-sm animate-pulse i18n-text">{t('hero.loading3d')}</p>
      </div>

      <div ref={splineContainerRef} className={cn(
        "w-full h-full absolute inset-0 z-10 flex items-center justify-center pointer-events-auto",
        !isSplineLoaded && "opacity-0"
      )}>
        <Spline 
          scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" 
          onLoad={handleSplineLoad}
        />
      </div>

      <div className="absolute bottom-6 left-6 right-6 z-30 pointer-events-none flex justify-between items-end">
        <div className="flex items-center gap-2 text-accent font-mono text-sm bg-[#0f172a]/80 px-4 py-2 rounded-full backdrop-blur-md border border-accent/20 shadow-[0_0_15px_rgba(16,185,129,0.2)] i18n-text">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
          {t('hero.interactive')}
        </div>
        
        {/* Mobile Hint */}
        <div className="md:hidden flex items-center gap-2 text-slate-300 font-mono text-xs bg-[#0f172a]/80 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10 i18n-text">
          <MousePointer2 size={12} className="animate-bounce" />
          {t('hero.drag')}
        </div>
      </div>
    </BentoCard>
  );
};

const Home = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [introDone, setIntroDone] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [team, setTeam] = useState<any[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Update document title and lang attribute when language changes
    document.title = t('title') || 'KILOUX - AI Software & Web Agency';
    document.documentElement.lang = i18n.language;
  }, [i18n.language, t]);

  useEffect(() => {
    // Fetch Posts
    const qPosts = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const unsubPosts = onSnapshot(qPosts, (snapshot) => {
      setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'posts');
    });

    // Fetch Team
    const qTeam = query(collection(db, 'teamMembers'), orderBy('order', 'asc'));
    const unsubTeam = onSnapshot(qTeam, (snapshot) => {
      setTeam(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'teamMembers');
    });

    return () => {
      unsubPosts();
      unsubTeam();
    };
  }, []);

  useEffect(() => {
    if (!introDone) return;

    // Lenis Smooth Scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenis.on('scroll', (e: any) => {
      if (window.scrollY > 500) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const ctx = gsap.context(() => {
      // Hero Animations
      const tl = gsap.timeline();
      tl.from(".hero-logo-box", { scale: 0.9, opacity: 0, duration: 1, ease: "power4.out" })
        .from(".hero-text", { y: 30, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power3.out" }, "-=0.5")
        .from(".hero-mascot", { 
          scale: 0.5, 
          rotationY: 30,
          rotationZ: -5,
          y: 50,
          opacity: 0, 
          duration: 1.5, 
          ease: "elastic.out(1, 0.6)",
          transformPerspective: 1000
        }, "-=0.8");

      // Storytelling Scroll Animations
      gsap.utils.toArray<HTMLElement>(".story-section").forEach((section) => {
        gsap.from(section, {
          y: 100,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });
      });

      // Bento Stagger Reveal
      gsap.utils.toArray<HTMLElement>(".bento-card:not(.hero-logo-box)").forEach((card) => {
        gsap.from(card, {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none none"
          }
        });
      });

      // Horizontal Scroll Portfolio
      if (portfolioRef.current) {
        const sections = gsap.utils.toArray<HTMLElement>(".portfolio-card");
        gsap.to(sections, {
          xPercent: -100 * (sections.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: ".portfolio-section",
            pin: true,
            scrub: 1,
            end: () => "+=" + portfolioRef.current?.offsetWidth
          }
        });
      }

      // Footer Animation
      gsap.from(".footer-element", {
        y: 20,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "footer",
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      });
    }, containerRef);

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, [introDone]);

  return (
    <>
      {!introDone && <IntroScreen onComplete={() => setIntroDone(true)} />}
      <CustomCursor />
      <div className="bg-noise"></div>

      <div ref={containerRef} className="relative min-h-screen bg-[#0f172a] text-slate-200 overflow-x-hidden md:cursor-none">
        <Navbar />

        {/* Hero Section */}
        <section id="home" className="pt-32 pb-12 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 min-h-[80vh] lg:min-h-[70vh]">
            {/* 01. Logo & Tagline */}
            <TiltWrapper className="lg:col-span-2 lg:row-span-2">
              <BentoCard className="h-full flex flex-col justify-center hero-logo-box bg-gradient-to-br from-[#0f172a] to-[#1e293b] relative overflow-hidden min-h-[40vh] lg:min-h-0">
                <div className="relative z-10">
                  <div className="inline-block px-3 py-1 rounded-full bg-accent/20 border border-accent/30 text-accent text-xs font-bold mb-6 hero-text i18n-text">
                    {t('hero.tagline')}
                  </div>
                  <h1 className="text-5xl lg:text-7xl font-display font-bold leading-tight mb-6 hero-text i18n-text">
                    {t('hero.title')} <span className="text-accent">{t('hero.subtitle')}</span>
                  </h1>
                  <p className="text-xl text-slate-400 max-w-md hero-text i18n-text">
                    {t('hero.desc')}
                  </p>
                  <div className="mt-8 flex gap-4 hero-text">
                    <button 
                      onClick={() => portfolioRef.current?.scrollIntoView({ behavior: 'smooth' })}
                      className="px-8 py-4 bg-accent text-[#0f172a] font-bold rounded-full hover:bg-accent/90 transition-all hover:scale-105 flex items-center gap-2 i18n-text"
                    >
                      {t('hero.cta1')} <ArrowRight size={20} />
                    </button>
                    <button 
                      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                      className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-full hover:bg-white/10 transition-all hover:scale-105 i18n-text"
                    >
                      {t('hero.cta2')}
                    </button>
                  </div>
                </div>
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-accent/10 blur-3xl rounded-full" />
              </BentoCard>
            </TiltWrapper>

            {/* 02. 3D Mascot */}
            <div className="lg:col-span-2 lg:row-span-2 hero-mascot">
              <Mascot3D />
            </div>
          </div>
        </section>

        {/* Tech Stack Marquee */}
        <div className="py-10 border-y border-white/5 bg-white/[0.02] overflow-hidden flex whitespace-nowrap relative">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0f172a] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0f172a] to-transparent z-10 pointer-events-none"></div>
          <div className="animate-marquee flex gap-16 items-center px-8">
            {["React", "Next.js", "Node.js", "TypeScript", "GSAP", "Three.js", "TailwindCSS", "AWS", "Figma", "Spline", "Vercel", "Python", "React Native"].map((tech, i) => (
              <span key={i} className="text-2xl font-display font-bold text-slate-500/50 hover:text-accent transition-colors cursor-default">
                {tech}
              </span>
            ))}
          </div>
          <div className="animate-marquee flex gap-16 items-center px-8" aria-hidden="true">
            {["React", "Next.js", "Node.js", "TypeScript", "GSAP", "Three.js", "TailwindCSS", "AWS", "Figma", "Spline", "Vercel", "Python", "React Native"].map((tech, i) => (
              <span key={i} className="text-2xl font-display font-bold text-slate-500/50 hover:text-accent transition-colors cursor-default">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Storytelling Section */}
        <section className="py-24 px-6 max-w-4xl mx-auto text-center story-section">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight i18n-text">
            {t('story.title1')}<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-500">{t('story.title2')}</span>
          </h2>
          <p className="text-xl text-slate-400 leading-relaxed i18n-text">
            {t('story.desc')}
          </p>
        </section>

        {/* Our Process Section */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16 story-section">
            <h2 className="text-5xl font-display font-bold mb-6 i18n-text">{t('process.title1')} <span className="text-accent">{t('process.title2')}</span></h2>
            <p className="text-slate-400 max-w-xl mx-auto i18n-text">{t('process.desc')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 -translate-y-1/2 z-0"></div>
            {[
              { step: "01", title: t('process.steps.1.title'), desc: t('process.steps.1.desc') },
              { step: "02", title: t('process.steps.2.title'), desc: t('process.steps.2.desc') },
              { step: "03", title: t('process.steps.3.title'), desc: t('process.steps.3.desc') },
              { step: "04", title: t('process.steps.4.title'), desc: t('process.steps.4.desc') }
            ].map((item, i) => (
              <BentoCard key={i} className="relative z-10 bg-[#1e293b] hover:-translate-y-2 transition-transform duration-300 story-section">
                <div className="w-12 h-12 rounded-full bg-accent text-[#0f172a] font-bold font-display flex items-center justify-center mb-6 text-xl">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold mb-3 i18n-text">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed i18n-text">{item.desc}</p>
              </BentoCard>
            ))}
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 px-6 max-w-7xl mx-auto">
          <div className="mb-12 story-section">
            <h2 className="text-5xl font-display font-bold mb-6 i18n-text">{t('services.title1')} <span className="text-accent">{t('services.title2')}</span></h2>
            <p className="text-slate-400 max-w-xl i18n-text">{t('services.desc')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: t('services.items.1.title'), desc: t('services.items.1.desc'), icon: <MousePointer2 className="text-accent" />, accent: "bg-accent/10" },
              { title: t('services.items.2.title'), desc: t('services.items.2.desc'), icon: <Layers className="text-blue-400" />, accent: "bg-blue-400/10" },
              { title: t('services.items.3.title'), desc: t('services.items.3.desc'), icon: <Rocket className="text-indigo-400" />, accent: "bg-indigo-400/10" },
              { title: t('services.items.4.title'), desc: t('services.items.4.desc'), icon: <Cpu className="text-emerald-400" />, accent: "bg-emerald-400/10" },
              { title: t('services.items.5.title'), desc: t('services.items.5.desc'), icon: <Globe className="text-yellow-400" />, accent: "bg-yellow-400/10" },
              { title: t('services.items.6.title'), desc: t('services.items.6.desc'), icon: <Code2 className="text-rose-400" />, accent: "bg-rose-400/10" }
            ].map((service, i) => (
              <BentoCard key={i} className="hover:border-accent/50 transition-colors group md:cursor-none">
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform", service.accent)}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 i18n-text">{service.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed i18n-text">{service.desc}</p>
              </BentoCard>
            ))}
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="portfolio-section py-20 overflow-hidden bg-[#1e293b]/20">
          <div className="max-w-7xl mx-auto px-6 mb-12 story-section">
            <h2 className="text-5xl font-display font-bold i18n-text">{t('portfolio.title1')} <span className="text-accent">{t('portfolio.title2')}</span></h2>
          </div>
          
          <div ref={portfolioRef} className="flex w-[300vw] md:w-[200vw] lg:w-[150vw] px-6 gap-6">
            {[
              { name: t('portfolio.items.1.name'), category: t('portfolio.items.1.category'), img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop" },
              { name: t('portfolio.items.2.name'), category: t('portfolio.items.2.category'), img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop" },
              { name: t('portfolio.items.3.name'), category: t('portfolio.items.3.category'), img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop" },
            ].map((project, i) => (
              <div key={i} className="portfolio-card w-screen md:w-[50vw] lg:w-[33vw] flex-shrink-0">
                <BentoCard className="h-[500px] p-0 group overflow-hidden relative md:cursor-none">
                  <img 
                    src={project.img} 
                    alt={project.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/20 to-transparent p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-accent text-sm font-mono mb-2 i18n-text">{project.category}</div>
                    <h3 className="text-3xl font-display font-bold mb-4 i18n-text">{project.name}</h3>
                    <div className="flex gap-2 mb-6">
                      <span className="px-3 py-1 rounded-full bg-white/10 text-xs backdrop-blur-md">React</span>
                      <span className="px-3 py-1 rounded-full bg-white/10 text-xs backdrop-blur-md">Node.js</span>
                      <span className="px-3 py-1 rounded-full bg-white/10 text-xs backdrop-blur-md">GSAP</span>
                    </div>
                    <button className="w-12 h-12 rounded-full bg-accent text-[#0f172a] flex items-center justify-center hover:scale-110 transition-transform md:cursor-none">
                      <ArrowUpRight />
                    </button>
                  </div>
                </BentoCard>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        {team.length > 0 && (
          <section id="team" className="py-20 px-6 max-w-7xl mx-auto">
            <div className="mb-12 story-section text-center">
              <h2 className="text-5xl font-display font-bold mb-6 i18n-text">{t('team.title1')} <span className="text-accent">{t('team.title2')}</span></h2>
              <p className="text-slate-400 max-w-xl mx-auto i18n-text">{t('team.desc')}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member) => (
                <BentoCard key={member.id} className="text-center group md:cursor-none">
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4 border-2 border-white/10 group-hover:border-accent transition-colors">
                    <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-bold text-lg">{member.name}</h3>
                  <p className="text-accent text-sm mb-3">{member.role}</p>
                  <p className="text-slate-400 text-xs">{member.bio}</p>
                </BentoCard>
              ))}
            </div>
          </section>
        )}

        {/* Blog Section */}
        {posts.length > 0 && (
          <section id="blog" className="py-20 px-6 max-w-7xl mx-auto">
            <div className="mb-12 story-section text-center">
              <h2 className="text-5xl font-display font-bold mb-6 i18n-text">{t('blog.title1')} <span className="text-accent">{t('blog.title2')}</span></h2>
              <p className="text-slate-400 max-w-xl mx-auto i18n-text">{t('blog.desc')}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <BentoCard 
                  key={post.id} 
                  className="group cursor-pointer flex flex-col hover:border-accent/50 transition-colors"
                  onClick={() => navigate(`/blog/${post.id}`)}
                >
                  <div className="text-xs text-slate-500 mb-2 font-mono i18n-text">
                    {post.createdAt ? new Date(post.createdAt.toDate()).toLocaleDateString(i18n.language === 'id' ? 'id-ID' : 'en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }) : t('blog.unknownDate')}
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors">{post.title}</h3>
                  <p className="text-slate-400 text-sm line-clamp-3 mb-4 flex-1">{post.content}</p>
                  <div className="text-accent text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all mt-auto i18n-text">
                    {t('blog.readMore')} <ArrowUpRight size={16} />
                  </div>
                </BentoCard>
              ))}
            </div>
          </section>
        )}

        {/* Pricing Section */}
        <section id="pricing" className="py-20 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16 story-section">
            <h2 className="text-5xl font-display font-bold mb-6 i18n-text">{t('pricing.title1')} <span className="text-accent">{t('pricing.title2')}</span></h2>
            <p className="text-slate-400 max-w-xl mx-auto i18n-text">{t('pricing.desc')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: t('pricing.plans.1.name'), price: t('pricing.plans.1.price'), features: [t('pricing.plans.1.f1'), t('pricing.plans.1.f2'), t('pricing.plans.1.f3'), t('pricing.plans.1.f4')], highlight: false },
              { name: t('pricing.plans.2.name'), price: t('pricing.plans.2.price'), features: [t('pricing.plans.2.f1'), t('pricing.plans.2.f2'), t('pricing.plans.2.f3'), t('pricing.plans.2.f4'), t('pricing.plans.2.f5')], highlight: true },
              { name: t('pricing.plans.3.name'), price: t('pricing.plans.3.price'), features: [t('pricing.plans.3.f1'), t('pricing.plans.3.f2'), t('pricing.plans.3.f3'), t('pricing.plans.3.f4')], highlight: false }
            ].map((plan, i) => (
              <BentoCard key={i} className={cn("flex flex-col md:cursor-none", plan.highlight ? "border-accent shadow-[0_0_30px_rgba(16,185,129,0.1)] scale-105" : "")}>
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2 i18n-text">{plan.name}</h3>
                  <div className="text-4xl font-display font-bold text-accent i18n-text">{plan.price}</div>
                </div>
                <ul className="flex-grow space-y-4 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-3 text-sm text-slate-400 i18n-text">
                      <CheckCircle2 size={16} className="text-accent" /> {f}
                    </li>
                  ))}
                </ul>
                <button className={cn(
                  "w-full py-3 rounded-xl font-bold transition-all md:cursor-none i18n-text",
                  plan.highlight ? "bg-accent text-[#0f172a] hover:scale-105" : "bg-white/10 hover:bg-white/20"
                )}>
                  {t('pricing.choose')}
                </button>
              </BentoCard>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-6 max-w-7xl mx-auto story-section">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <BentoCard className="lg:p-12 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <h2 className="text-4xl font-display font-bold mb-8 relative z-10 i18n-text">{t('contact.title1')} <span className="text-accent">{t('contact.title2')}</span></h2>
              <form className="space-y-6 relative z-10 md:cursor-none">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-slate-500 uppercase i18n-text">{t('contact.name')}</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-accent outline-none transition-colors md:cursor-none i18n-text" placeholder={t('contact.namePlaceholder')} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-slate-500 uppercase i18n-text">{t('contact.email')}</label>
                    <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-accent outline-none transition-colors md:cursor-none i18n-text" placeholder={t('contact.emailPlaceholder')} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-500 uppercase i18n-text">{t('contact.message')}</label>
                  <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-accent outline-none transition-colors md:cursor-none i18n-text" placeholder={t('contact.messagePlaceholder')} />
                </div>
                <button className="bg-accent text-[#0f172a] w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform md:cursor-none">
                  <span className="i18n-text">{t('contact.send')}</span> <Rocket size={18} />
                </button>
              </form>
            </BentoCard>

            <div className="grid grid-cols-1 gap-4">
              <BentoCard className="flex flex-col justify-center items-center text-center p-12 hover:border-accent/30 transition-colors group md:cursor-none">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Mail className="text-accent" size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-2 i18n-text">{t('contact.emailUs')}</h3>
                <a href="mailto:contact@kiloux.id" className="text-xl text-slate-400 hover:text-accent transition-colors md:cursor-none">
                  contact@kiloux.id
                </a>
              </BentoCard>

              <BentoCard className="flex flex-col justify-center items-center text-center p-12 hover:border-accent/30 transition-colors group md:cursor-none">
                <div className="w-16 h-16 bg-pink-500/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Instagram className="text-pink-500" size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-2 i18n-text">{t('contact.followUs')}</h3>
                <a href="https://instagram.com/kiloux.id" target="_blank" rel="noreferrer" className="text-xl text-slate-400 hover:text-pink-500 transition-colors md:cursor-none">
                  @kiloux.id
                </a>
              </BentoCard>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-white/5 bg-[#0f172a]">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2 footer-element">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center font-display font-bold text-[#0f172a]">K</div>
              <span className="font-display font-bold text-xl tracking-tighter">KILOUX</span>
            </div>
            <div className="text-slate-500 text-sm footer-element i18n-text">
              {t('footer.rights')}
            </div>
            <div className="flex gap-6 text-sm text-slate-400 footer-element">
              <a href="#" className="hover:text-accent md:cursor-none i18n-text">{t('footer.privacy')}</a>
              <a href="#" className="hover:text-accent md:cursor-none i18n-text">{t('footer.terms')}</a>
            </div>
          </div>
        </footer>

        {/* Back to Top Button */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={cn(
            "fixed bottom-8 right-8 z-50 w-12 h-12 bg-accent text-[#0f172a] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-110 transition-all duration-300 md:cursor-none",
            showBackToTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
          )}
        >
          <ArrowUp size={24} />
        </button>
        <LiveChat />
      </div>
    </>
  );
};

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/blog/:id" element={<BlogPost />} />
    </Routes>
  );
}
