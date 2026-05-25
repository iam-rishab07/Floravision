import React, { useState, useRef } from 'react';
import { Play } from 'lucide-react';

const Hero = ({ onNavigate, onViewDetails }) => {
  const containerRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    setCoords({ x, y });
  };

  const handleMouseLeave = () => {
    setCoords({ x: 0, y: 0 });
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[90vh] flex flex-col lg:flex-row items-center px-6 md:px-16 py-12 overflow-hidden bg-[#F9F8F6] border-b border-editorial"
    >
      
      {/* 1. Left Content */}
      <div className="flex-1 z-10 space-y-8 animate-in fade-in slide-in-from-left duration-1000">
        <div className="space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#C2A684] font-semibold">Exquisite Botanicals</span>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-[#1B362F] leading-tight">
            Earth’s <br /> 
            <span className="relative">
              Exhale
              {/* Gold dot accent */}
              <span className="absolute -right-6 bottom-4 w-4 h-4 bg-[#C2A684] rounded-full shadow-[0_0_15px_rgba(194,166,132,0.4)]"></span>
            </span>
          </h1>
          <p className="max-w-md text-gray-500 text-sm md:text-base leading-relaxed font-medium">
            "Earth Exhale" symbolizes the vitality of the Earth's natural environment 
            and its essential role in sustaining life. Explore our curated selection.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={() => onNavigate('shop')}
            className="px-10 py-4 bg-[#1B362F] hover:bg-[#1B362F]/90 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all duration-300 shadow-md"
          >
            Shop Collection
          </button>
          <button 
            onClick={() => onNavigate('contact')}
            className="flex items-center gap-3 text-[#1B362F] group font-bold text-xs uppercase tracking-widest"
          >
            <div className="w-12 h-12 rounded-full border border-editorial flex items-center justify-center group-hover:bg-[#1B362F] group-hover:text-white transition-all">
              <Play size={14} fill="currentColor" className="ml-0.5" />
            </div>
            <span className="group-hover:text-[#C2A684] transition-colors">Our Greenhouse</span>
          </button>
        </div>

        {/* Floating Mini Review Card */}
        <div className="hidden md:flex items-center gap-4 bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-editorial w-fit shadow-soft">
          <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#F9F8F6] bg-gray-200 overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" />
                </div>
              ))}
          </div>
          <div>
            <p className="text-[10px] text-[#C2A684] uppercase font-black tracking-tighter">Aesthetic Plants</p>
            <p className="text-xs text-[#1B362F] font-bold">Trusted by 2k+ owners</p>
          </div>
        </div>
      </div>

      {/* 2. Right Visuals (The Layered Section with 3D Parallax) */}
      <div className="flex-1 relative w-full mt-24 lg:mt-0 flex justify-center items-center">
        
        {/* Main Background Glow (Soft Sage Circle) */}
        <div 
          className="absolute top-1/2 left-1/2 w-[300px] h-[300px] md:w-[480px] md:h-[480px] bg-[#EAECE6] rounded-full blur-[100px] transition-transform duration-300 ease-out opacity-80"
          style={{
            transform: `translate(calc(-50% + ${coords.x * -30}px), calc(-50% + ${coords.y * -30}px))`
          }}
        ></div>

        {/* The Big Center Plant - With Float Animation & Parallax */}
        <div 
          className="relative z-10 transition-transform duration-300 ease-out"
          style={{
            transform: `translate(${coords.x * 30}px, ${coords.y * 30}px) rotate(${coords.x * 4}deg)`
          }}
        >
          <img 
            src="/images/hero_main_plant.png" 
            alt="Main Plant" 
            className="w-[280px] md:w-[480px] drop-shadow-[0_30px_30px_rgba(27,54,47,0.15)] object-contain animate-float"
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;