import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Navbar } from '../components/Navbar';
import { BentoCard } from '../components/BentoCard';
import { Rocket, Target, Heart, Shield, Users, Clock } from 'lucide-react';
import gsap from 'gsap';

export const About = () => {
  const { t } = useTranslation();

  useEffect(() => {
    gsap.fromTo(
      '.about-animate',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power3.out' }
    );
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white selection:bg-accent/30 selection:text-accent font-sans">
      <Helmet>
        <title>About Us | Kiloux Studio</title>
        <meta name="description" content="Learn about Kiloux Studio's history, mission, and values." />
      </Helmet>

      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="text-center mb-16 about-animate">
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tighter">
            About <span className="text-accent">Kiloux Studio</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            We are Indonesia's Leading IT & Design Agency. Crafting digital realities through immersive experiences, high-performance software, and interactive web solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* History Section */}
          <BentoCard className="md:col-span-12 lg:col-span-8 bg-gradient-to-br from-white/5 to-white/0 about-animate">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center text-accent">
                <Clock size={24} />
              </div>
              <h2 className="text-3xl font-display font-bold">Our History</h2>
            </div>
            <div className="space-y-4 text-slate-300 leading-relaxed text-lg">
              <p>
                Founded with a passion for blending cutting-edge technology with unparalleled aesthetics, Kiloux Studio began as a small collective of visionary developers and designers.
              </p>
              <p>
                Over the years, we have grown into Indonesia's premier digital agency, delivering complex robust software systems and stunning modern 3D web assets for clients worldwide. Our journey is defined by continuous innovation, adapting to new frameworks, and always pushing the boundaries of what is possible on the web.
              </p>
            </div>
          </BentoCard>

          {/* Mission Section */}
          <BentoCard className="md:col-span-12 lg:col-span-4 bg-gradient-to-bl from-accent/10 to-transparent border-accent/20 about-animate">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-[#0f172a]">
                <Target size={24} />
              </div>
              <h2 className="text-3xl font-display font-bold">Our Mission</h2>
            </div>
            <p className="text-slate-300 leading-relaxed text-lg">
              To empower businesses by constructing immersive and performant digital experiences. We strive to bridge the gap between imagination and technology, transforming bold ideas into interactive, scalable, and impactful solutions.
            </p>
          </BentoCard>

          <div className="md:col-span-12 mt-8 mb-4 about-animate">
            <h2 className="text-3xl font-display font-bold text-center">Our Core Values</h2>
          </div>

          {/* Value 1 */}
          <BentoCard className="md:col-span-6 lg:col-span-4 about-animate">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400 mb-4">
              <Rocket size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Innovation First</h3>
            <p className="text-slate-400">
              We never settle for the standard. Embracing new tools and creative workflows ensures we always deliver state-of-the-art experiences.
            </p>
          </BentoCard>

          {/* Value 2 */}
          <BentoCard className="md:col-span-6 lg:col-span-4 about-animate">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center text-purple-400 mb-4">
              <Shield size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Integrity & Quality</h3>
            <p className="text-slate-400">
              Reliability is our hallmark. We build clean, maintainable, and secure architectures that stand the test of time.
            </p>
          </BentoCard>

          {/* Value 3 */}
          <BentoCard className="md:col-span-12 lg:col-span-4 about-animate">
            <div className="w-12 h-12 bg-rose-500/20 rounded-xl flex items-center justify-center text-rose-400 mb-4">
              <Heart size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Client Centricity</h3>
            <p className="text-slate-400">
              Your success is our success. We partner closely with our clients, treating every project as a unique masterpiece.
            </p>
          </BentoCard>
        </div>
      </main>
    </div>
  );
};
