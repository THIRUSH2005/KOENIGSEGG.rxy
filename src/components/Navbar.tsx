"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Overview", href: "#" },
    { name: "Engineering", href: "#" },
    { name: "Aerodynamics", href: "#" },
    { name: "Specs", href: "#" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, x: "-50%" }}
      animate={{ y: 0, x: "-50%" }}
      className={`fixed top-12 left-1/2 z-50 transition-all duration-500 w-full max-w-4xl px-6`}
    >
      <div className={`flex items-center justify-between transition-all duration-500 glass rounded-full py-4 px-12 border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.6)] bg-black/50 backdrop-blur-2xl`}>
        {/* Authentic Branding */}
        <div className="flex items-center gap-5 group cursor-pointer">
          <div className="w-12 h-14 relative transition-transform duration-500 group-hover:scale-105">
             <svg viewBox="0 0 100 120" className="w-full h-full fill-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                {/* Shield Outline */}
                <path d="M50 0C50 0 100 20 100 40C100 80 50 120 50 120C50 120 0 80 0 40C0 20 50 0 50 0Z" className="opacity-20" />
                <path d="M50 5C50 5 95 23 95 40C95 75 50 110 50 110C50 110 5 75 5 40C5 23 50 5 50 5Z" fill="none" stroke="white" strokeWidth="2" />
                {/* Lozenge Pattern (Simplified) */}
                <path d="M50 15L65 30L50 45L35 30Z" fill="white" />
                <path d="M50 35L65 50L50 65L35 50Z" fill="white" />
                <path d="M50 55L65 70L50 85L35 70Z" fill="white" />
                <path d="M50 75L60 85L50 95L40 85Z" fill="white" />
                {/* Side details */}
                <path d="M20 40L35 55L20 70L5 55Z" className="opacity-40" />
                <path d="M80 40L65 55L80 70L95 55Z" className="opacity-40" />
             </svg>
          </div>
          <span className="text-white font-black text-4xl italic tracking-[-0.04em] transition-all duration-300 group-hover:text-accent-gold" style={{ fontFamily: 'var(--font-geist-sans)' }}>
            Koenigsegg
          </span>
        </div>

        {/* Cinematic Gold Links */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="nav-link text-white/50 hover:text-accent-gold transition-all duration-300 relative group font-black tracking-[0.3em] text-[12px] uppercase"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent-gold transition-all duration-500 group-hover:w-full shadow-[0_0_15px_rgba(212,175,55,1)]" />
            </a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
