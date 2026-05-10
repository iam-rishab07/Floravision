import React from 'react';
import { Play, ShoppingBag } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col lg:flex-row items-center px-6 md:px-16 py-12 overflow-hidden bg-[#0d130d]">
      
      {/* 1. Left Content */}
      <div className="flex-1 z-10 space-y-8">
        <div className="space-y-2">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-white leading-tight">
            Earth’s <br /> 
            <span className="relative">
              Exhale
              {/* Green dot accent */}
              <span className="absolute -right-6 bottom-4 w-4 h-4 bg-[#a3e635] rounded-full shadow-[0_0_15px_#a3e635]"></span>
            </span>
          </h1>
          <p className="max-w-md text-gray-400 text-sm md:text-base leading-relaxed">
            "Earth Exhale" symbolizes the vitality of the Earth's natural environment 
            and its essential role in sustaining life.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <button className="px-10 py-4 bg-transparent border border-white/40 rounded-full text-white font-medium hover:bg-white hover:text-black transition-all duration-300">
            Buy Now
          </button>
          <button className="flex items-center gap-3 text-white group">
            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#a3e635] group-hover:border-[#a3e635] transition-all">
              <Play size={18} fill="currentColor" className="ml-1" />
            </div>
            <span className="text-sm font-semibold tracking-wide">Live Demo...</span>
          </button>
        </div>

        {/* Floating Mini Review Card */}
        <div className="hidden md:flex items-center gap-4 bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 w-fit">
          <div className="flex -space-x-3">
             {[1, 2, 3].map((i) => (
               <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0d130d] bg-gray-600 overflow-hidden">
                 <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" />
               </div>
             ))}
          </div>
          <div>
            <p className="text-[10px] text-gray-400 uppercase font-bold">Trendy Plants</p>
            <p className="text-xs text-white">Joined by 2k+ users</p>
          </div>
        </div>
      </div>

      {/* 2. Right Visuals (The Layered Section) */}
      <div className="flex-1 relative w-full mt-20 lg:mt-0 flex justify-center">
        
        {/* Main Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#a3e635]/10 rounded-full blur-[100px]"></div>

        {/* The Big Center Plant */}
        <div className="relative z-10 transform hover:scale-105 transition-transform duration-700">
          <img 
            src="https://png.pngtree.com/png-vector/20231221/ourmid/pngtree-topiary-boxwood-ball-plant-in-pot-png-image_11374526.png" 
            alt="Main Plant" 
            className="w-[300px] md:w-[450px] drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)]"
          />
        </div>

        {/* Overlapping Aglaonema Card (Right Side) */}
        <div className="absolute -right-4 top-0 md:right-0 md:top-10 z-20 bg-[#1a221a]/80 backdrop-blur-xl p-5 rounded-[2.5rem] border border-white/10 w-[180px] md:w-[220px] shadow-2xl">
          <img 
            src="https://www.pngarts.com/files/3/Indoor-Plant-PNG-Transparent-Image.png" 
            alt="Aglaonema" 
            className="w-full h-32 object-contain -mt-12 mb-4"
          />
          <p className="text-[10px] text-[#a3e635] font-bold uppercase tracking-widest">Indoor Plant</p>
          <h3 className="text-lg font-bold text-white mb-4">Aglaonema plant</h3>
          <button className="w-full py-2 bg-transparent border border-white/20 rounded-xl text-xs font-bold hover:bg-white hover:text-black transition-colors">
            Buy Now
          </button>
          
          {/* Pagination dots from screenshot */}
          <div className="flex justify-center gap-1 mt-4">
            <div className="w-4 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white/20 rounded-full"></div>
            <div className="w-1 h-1 bg-white/20 rounded-full"></div>
          </div>
        </div>

        {/* Floating Badge (R icon) */}
        <div className="absolute left-10 top-0 z-30 w-12 h-12 bg-[#1db954] rounded-full flex items-center justify-center font-bold text-white shadow-lg border-2 border-[#0d130d]">
          R
        </div>

      </div>
    </section>
  );
};

export default Hero;