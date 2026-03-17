"use client";

import { useScroll, useTransform, motion, useSpring } from "framer-motion";
import { useRef } from "react";
import CanvasSequence from "@/components/CanvasSequence";
import Navbar from "@/components/Navbar";
import { MoveDown, Shield, Zap, Wind } from "lucide-react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Ultra-smooth spring physics for that "heavy" luxury feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 20,
    restDelta: 0.0001
  });

  // Re-balanced sections for 5 stages (500vh total)
  // Stage 1: Hero (0-0.2)
  // Stage 2: Carbon (0.2-0.4)
  // Stage 3: Power (0.4-0.6)
  // Stage 4: Aero (0.6-0.8)
  // Stage 5: Final (0.8-1.0)

  const heroOpacity = useTransform(scrollYProgress, [0, 0.15, 0.2], [1, 1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);

  const carbonOpacity = useTransform(scrollYProgress, [0.18, 0.25, 0.35, 0.42], [0, 1, 1, 0]);
  const carbonY = useTransform(scrollYProgress, [0.18, 0.25, 0.35, 0.42], [100, 0, 0, -100]);

  const powerOpacity = useTransform(scrollYProgress, [0.38, 0.45, 0.55, 0.62], [0, 1, 1, 0]);
  const powerY = useTransform(scrollYProgress, [0.38, 0.45, 0.55, 0.62], [100, 0, 0, -100]);

  const aeroOpacity = useTransform(scrollYProgress, [0.58, 0.65, 0.75, 0.82], [0, 1, 1, 0]);
  const aeroY = useTransform(scrollYProgress, [0.58, 0.65, 0.75, 0.82], [100, 0, 0, -100]);

  const finalOpacity = useTransform(scrollYProgress, [0.78, 0.85], [0, 1]);
  const finalScale = useTransform(scrollYProgress, [0.78, 0.85], [0.95, 1]);

  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    ["#050505", "#0A0A0C", "#0A0A0C", "#050505"]
  );

  return (
    <main className="relative min-h-[500vh]" ref={containerRef}>
      <Navbar />

      {/* Sticky Canvas Background */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <CanvasSequence progress={smoothProgress} bgColor={bgColor} frameCount={240} />
        
        {/* Subdued enhancements */}
        <div className="noise-overlay" />
        <div className="scanlines" />
        
        {/* Soft layered gradients to darken edges and background */}
        <div className="edge-blur" />
        <div className="layered-gradient-overlay" />
      </div>

      {/* UI Content Sections */}
      <div className="absolute top-0 left-0 w-full z-10 pointer-events-none">
        
        {/* 1. HERO INTRO (0-15%) */}
        <section className="h-screen flex flex-col items-center justify-center px-6">
          <motion.div 
            style={{ opacity: heroOpacity, scale: heroScale }}
            className="text-center"
          >
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 1.5, ease: "circOut" }}
              className="heading-xl text-white"
            >
              JESKO
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 1, duration: 1 }}
              className="text-white uppercase tracking-[0.8em] text-sm md:text-2xl font-medium mt-8"
            >
              The Absolute Engineering
            </motion.p>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="mt-32 flex flex-col items-center gap-4"
            >
              <span className="text-xs uppercase tracking-[0.4em] text-white/50">Explore Technology</span>
              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              >
                <MoveDown className="w-5 h-5 text-accent-gold" />
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* 2. ENGINEERING REVEAL (15-40%) */}
        <section className="h-screen flex items-center justify-start container mx-auto px-10 md:px-20">
          <motion.div 
            style={{ opacity: carbonOpacity, y: carbonY }}
            className="content-card"
          >
            <div className="flex items-center gap-6 mb-8 text-white">
              <Shield className="w-8 h-8" />
              <div className="h-[2px] w-12 bg-white/30" />
              <span className="text-xs font-bold uppercase tracking-widest">Structural Integrity</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[0.9] uppercase">
              CARBON <br/><span className="text-white/30">MONOCOQUE.</span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed font-light mb-10">
              A masterpiece of lightweight engineering. Our carbon fiber sandwich construction provides 
              unparalleled torsional rigidity of 65,000 Nm per degree, setting a new benchmark for hypercars.
            </p>
            <div className="grid grid-cols-2 gap-12">
              <div className="border-l border-white/10 pl-6">
                <div className="text-4xl font-black text-white italic">70KG</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mt-2">Chassis Weight</div>
              </div>
              <div className="border-l border-white/10 pl-6">
                <div className="text-4xl font-black text-white italic">E85</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mt-2">Optimized Fuel</div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 3. POWERTRAIN (40-65%) */}
        <section className="h-screen flex items-center justify-end container mx-auto px-10 md:px-20">
          <motion.div 
            style={{ opacity: powerOpacity, y: powerY }}
            className="content-card text-right border-l-0 border-r-2 border-accent-cyan"
          >
            <div className="flex items-center justify-end gap-6 mb-8 text-accent-cyan">
              <span className="text-xs font-bold uppercase tracking-widest">Propulsion System</span>
              <div className="h-[2px] w-12 bg-accent-cyan/30" />
              <Zap className="w-8 h-8" />
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[0.9] uppercase">
              FLAT-PLANE <br/><span className="text-accent-cyan">V8 ENGINE.</span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed font-light mb-10">
              The heart of the Jesko is a 5.0L twin-turbo V8. It features the world's lightest 
              V8 crankshaft, allowing it to rev higher and faster than any comparable engine.
            </p>
            <div className="grid grid-cols-2 gap-12">
              <div className="border-r border-white/10 pr-6">
                <div className="text-4xl font-black text-white italic">1600</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mt-2">Horsepower</div>
              </div>
              <div className="border-r border-white/10 pr-6">
                <div className="text-4xl font-black text-white italic">8500</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mt-2">Max RPM</div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 4. AERODYNAMICS (60-80%) */}
        <section className="h-screen flex items-center justify-start container mx-auto px-10 md:px-20">
          <motion.div 
            style={{ opacity: aeroOpacity, y: aeroY }}
            className="content-card relative"
          >
            <div className="flex items-center gap-6 mb-8 text-white/40">
              <Wind className="w-8 h-8" />
              <div className="h-[2px] w-12 bg-white/10" />
              <span className="text-xs font-bold uppercase tracking-widest">Active Aero</span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[0.9] uppercase relative z-10">
              AERO <br/><span className="text-white/20 italic">DYNAMICS.</span>
            </h2>
            
            <p className="text-white/60 text-lg leading-relaxed font-light mb-10 max-w-md">
              Every curve of the Jesko is dictated by the passage of air. Our active system 
              generates over 1,000 kg of downforce at top speeds.
            </p>
            
            <div className="grid grid-cols-2 gap-12 pt-4 border-t border-white/5">
              <div className="border-l border-white/10 pl-6">
                <div className="text-4xl font-black text-accent-gold italic shadow-glow">1.0T</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mt-2">Max Downforce</div>
              </div>
              <div className="border-l border-white/10 pl-6">
                <div className="text-4xl font-black text-white italic">0.28</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mt-2">Drag Target</div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 5. FINAL REASSEMBLY & CTA (85-100%) */}
        <section className="h-screen flex flex-col items-center justify-center px-6 pointer-events-auto">
          <motion.div 
            style={{ opacity: finalOpacity, scale: finalScale }}
            className="text-center w-full max-w-6xl"
          >
            <h2 className="text-5xl md:text-8xl font-black text-white mb-12 tracking-tighter uppercase leading-none">
              DESIGNED TO <br/>DOMINATE.
            </h2>
            <div className="flex flex-col md:flex-row items-center gap-6 justify-center mb-24">
               <button className="btn-premium border border-white/20 text-white hover:bg-white hover:text-black w-full md:w-auto font-medium">
                  Technical Specifications
               </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 border-t border-white/10 pt-16">
               <div className="text-center group">
                  <div className="text-white/30 text-[11px] uppercase tracking-[0.4em] mb-4 font-bold group-hover:text-accent-gold transition-colors">Performance</div>
                  <div className="text-white text-3xl font-black italic">0-400-0: 27.8s</div>
               </div>
               <div className="text-center group">
                  <div className="text-white/30 text-[11px] uppercase tracking-[0.4em] mb-4 font-bold group-hover:text-accent-cyan transition-colors">Technology</div>
                  <div className="text-white text-3xl font-black italic">9-Speed LST</div>
               </div>
               <div className="text-center group">
                  <div className="text-white/30 text-[11px] uppercase tracking-[0.4em] mb-4 font-bold group-hover:text-white transition-colors">Configuration</div>
                  <div className="text-white text-3xl font-black italic">Flat-Plane V8</div>
               </div>
            </div>
          </motion.div>
        </section>

      </div>

      {/* Extraneous fixed grid removed in favor of sticky blueprint grids */}
    </main>
  );
}
