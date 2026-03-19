import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Home, Briefcase, DollarSign, Mail, Sparkles, Globe2, Users, BookOpen } from 'lucide-react';
import { cn } from '../lib/utils';
import gsap from 'gsap';
import { useTranslation } from 'react-i18next';

// Magnetic Hover Effect Component
const MagneticLink = ({ children, href, onClick, className, onMouseEnter, onMouseLeave }: any) => {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(el, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const scaleTo = gsap.quickTo(el, "scale", { duration: 0.4, ease: "power2.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      xTo(x * 0.4);
      yTo(y * 0.4);
    };

    const handleMouseEnterEvent = () => {
      scaleTo(1.1);
      gsap.to(el, { color: "#10b981", duration: 0.3 }); // accent color
      if (onMouseEnter) onMouseEnter();
    };

    const handleMouseLeaveEvent = () => {
      xTo(0);
      yTo(0);
      scaleTo(1);
      gsap.to(el, { color: "#cbd5e1", duration: 0.3 }); // slate-300 color
      if (onMouseLeave) onMouseLeave();
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseenter", handleMouseEnterEvent);
    el.addEventListener("mouseleave", handleMouseLeaveEvent);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseenter", handleMouseEnterEvent);
      el.removeEventListener("mouseleave", handleMouseLeaveEvent);
    };
  }, [onMouseEnter, onMouseLeave]);

  return (
    <a ref={ref} href={href} onClick={onClick} className={className}>
      {children}
    </a>
  );
};

export const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const logoTextRef = useRef<HTMLSpanElement>(null);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const navLinks = [
    { name: t('nav.home'), href: '#home', icon: <Home size={20} /> },
    { name: t('nav.services'), href: '#services', icon: <Sparkles size={20} /> },
    { name: t('nav.portfolio'), href: '#portfolio', icon: <Briefcase size={20} /> },
    { name: t('nav.team'), href: '#team', icon: <Users size={20} /> },
    { name: t('nav.blog'), href: '#blog', icon: <BookOpen size={20} /> },
    { name: t('nav.pricing'), href: '#pricing', icon: <DollarSign size={20} /> },
    { name: t('nav.contact'), href: '#contact', icon: <Mail size={20} /> },
  ];

  const toggleLanguage = (lang: string) => {
    if (i18n.language === lang) {
      setIsLangOpen(false);
      return;
    }

    // Premium Awwwards-style full screen sweep transition
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 z-[9999] bg-[#0f172a] pointer-events-none flex flex-col items-center justify-center overflow-hidden';
    overlay.style.transform = 'translateY(100%)';
    
    const textContainer = document.createElement('div');
    textContainer.className = 'overflow-hidden';
    
    const text = document.createElement('div');
    text.className = 'text-accent font-display font-bold text-5xl md:text-7xl tracking-tighter uppercase';
    text.innerText = lang === 'en' ? 'ENGLISH' : 'INDONESIA';
    text.style.transform = 'translateY(100%)';
    
    textContainer.appendChild(text);
    overlay.appendChild(textContainer);
    document.body.appendChild(overlay);

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.removeChild(overlay);
      }
    });

    tl.to(overlay, {
      y: '0%',
      duration: 0.8,
      ease: 'expo.inOut'
    })
    .to(text, {
      y: '0%',
      duration: 0.6,
      ease: 'expo.out'
    }, "-=0.2")
    .call(() => {
      i18n.changeLanguage(lang);
      setIsLangOpen(false);
      
      // Prepare text for reveal animation
      gsap.set('.i18n-text', { 
        opacity: 0, 
        y: 20, 
        filter: 'blur(4px)' 
      });
    })
    .to(text, {
      y: '-100%',
      duration: 0.5,
      ease: 'expo.in',
      delay: 0.3
    })
    .to(overlay, {
      y: '-100%',
      duration: 0.8,
      ease: 'expo.inOut'
    }, "-=0.1")
    .to('.i18n-text', {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.8,
      stagger: {
        amount: 0.4,
        from: "start"
      },
      ease: 'power3.out',
      clearProps: 'all'
    }, "-=0.6");
  };

  useEffect(() => {
    if (isOpen) {
      gsap.to('.menu-item', {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.5,
        ease: 'back.out(1.7)'
      });
    } else {
      gsap.to('.menu-item', {
        y: 20,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in'
      });
    }
  }, [isOpen]);

  const handleNavHoverStart = () => {
    gsap.to(headerRef.current, {
      borderColor: "rgba(16, 185, 129, 0.4)", // accent color glow
      boxShadow: "0 0 25px rgba(16, 185, 129, 0.2)",
      backgroundColor: "rgba(30, 41, 59, 0.85)", // slightly more opaque
      scale: 1.015,
      duration: 0.4,
      ease: "power2.out"
    });
    gsap.to(logoTextRef.current, {
      color: "#10b981",
      scale: 1.05,
      duration: 0.4,
      ease: "power2.out"
    });
  };

  const handleNavHoverEnd = () => {
    gsap.to(headerRef.current, {
      borderColor: "rgba(255, 255, 255, 0.1)",
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      backgroundColor: "rgba(30, 41, 59, 0.7)", // default glassmorphism bg
      scale: 1,
      duration: 0.4,
      ease: "power2.out"
    });
    gsap.to(logoTextRef.current, {
      color: "#e2e8f0", // slate-200
      scale: 1,
      duration: 0.4,
      ease: "power2.out"
    });
  };

  return (
    <>
      {/* Desktop Top Header */}
      <header className="hidden md:flex fixed top-4 inset-x-6 lg:inset-x-12 z-50 justify-center pointer-events-none">
        <div 
          ref={headerRef}
          className="flex items-center justify-between w-full max-w-7xl bg-[#1e293b]/70 backdrop-blur-md border border-white/10 px-8 py-3 rounded-2xl pointer-events-auto shadow-xl origin-center transition-colors duration-500"
        >
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer origin-left"
            onMouseEnter={handleNavHoverStart}
            onMouseLeave={handleNavHoverEnd}
          >
            <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center font-display font-bold text-[#0f172a] text-xl">K</div>
            <span ref={logoTextRef} className="font-display font-bold text-2xl tracking-tighter text-slate-200">KILOUX</span>
          </div>
          
          <nav className="flex items-center gap-8">
            {navLinks.map((link) => (
              <MagneticLink
                key={link.href}
                href={link.href}
                onMouseEnter={handleNavHoverStart}
                onMouseLeave={handleNavHoverEnd}
                className="text-sm font-medium text-slate-300 flex items-center gap-2 group relative md:cursor-none i18n-text"
              >
                <span className="relative z-10">{link.name}</span>
                <span className="absolute inset-x-0 -bottom-1 h-px bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              </MagneticLink>
            ))}
          </nav>
          
          <div className="w-32 flex justify-end relative">
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-accent transition-all duration-300"
            >
              <Globe2 size={16} />
              <span className="uppercase">{i18n.language}</span>
            </button>
            
            {/* Language Dropdown */}
            <div 
              className={cn(
                "absolute top-full mt-2 right-0 bg-[#1e293b]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex flex-col gap-1 min-w-[120px] shadow-2xl transition-all duration-300 origin-top-right",
                isLangOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
              )}
            >
            <button 
              onClick={() => toggleLanguage('en')}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium text-left transition-colors flex items-center justify-between",
                i18n.language === 'en' ? "bg-accent/20 text-accent" : "text-slate-300 hover:bg-white/5 hover:text-white"
              )}
            >
              English
              {i18n.language === 'en' && <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>}
            </button>
            <button 
              onClick={() => toggleLanguage('id')}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium text-left transition-colors flex items-center justify-between",
                i18n.language === 'id' ? "bg-accent/20 text-accent" : "text-slate-300 hover:bg-white/5 hover:text-white"
              )}
            >
              Indonesia
              {i18n.language === 'id' && <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>}
            </button>
          </div>
        </div>
        </div>
      </header>

      {/* Mobile Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-6 right-6 z-[60] w-14 h-14 bg-accent rounded-full flex items-center justify-center text-[#0f172a] shadow-lg hover:scale-110 transition-transform duration-300"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Fullscreen Overlay Menu (Mobile) */}
      <div
        ref={menuRef}
        className={cn(
          "fixed inset-0 z-50 bg-[#0f172a]/95 backdrop-blur-xl flex flex-col items-center justify-center transition-all duration-700 md:hidden",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="flex flex-col items-center gap-8">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="menu-item translate-y-5 opacity-0 flex items-center gap-4 text-4xl font-display font-bold text-slate-300 hover:text-accent transition-colors group i18n-text"
            >
              <span className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent group-hover:text-[#0f172a] transition-colors">
                {link.icon}
              </span>
              {link.name}
            </a>
          ))}
        </div>
        
        <div className="mt-12 flex items-center gap-4 menu-item opacity-0">
          <button 
            onClick={() => { toggleLanguage('en'); setIsOpen(false); }}
            className={cn(
              "px-6 py-3 rounded-full font-bold text-sm transition-colors",
              i18n.language === 'en' ? "bg-accent text-[#0f172a]" : "bg-white/10 text-slate-300 hover:bg-white/20"
            )}
          >
            EN
          </button>
          <button 
            onClick={() => { toggleLanguage('id'); setIsOpen(false); }}
            className={cn(
              "px-6 py-3 rounded-full font-bold text-sm transition-colors",
              i18n.language === 'id' ? "bg-accent text-[#0f172a]" : "bg-white/10 text-slate-300 hover:bg-white/20"
            )}
          >
            ID
          </button>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500 font-mono text-sm menu-item opacity-0">
          contact@kiloux.id • @kiloux.id
        </div>
      </div>
    </>
  );
};
