import React from 'react';
import { Search, ShoppingBag, Menu } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-[#0d130d]/80 backdrop-blur-md px-6 md:px-12 py-5 flex items-center justify-between border-b border-white/5">
      
      {/* Logo Section */}
      <div className="flex items-center gap-2 group cursor-pointer">
        <div className="relative">
          {/* The green leaf/box icon with glow */}
          <div className="w-8 h-8 bg-[#a3e635] rounded-lg shadow-[0_0_15px_rgba(163,230,53,0.5)] flex items-center justify-center transition-transform group-hover:rotate-12">
            <div className="w-4 h-4 bg-[#0d130d] rounded-sm transform rotate-45"></div>
          </div>
        </div>
        <span className="text-xl font-bold tracking-tight text-white">
          FloraVision<span className="text-[#a3e635]">.</span>
        </span>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-10">
        {['Home', 'Plants Type', 'More', 'Contact'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase().replace(' ', '-')}`}
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group"
          >
            {item}
            {item === 'Plants Type' && (
              <span className="ml-1 text-[10px] opacity-50 text-white">▼</span>
            )}
            {/* Hover Underline Effect */}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#a3e635] transition-all group-hover:w-full"></span>
          </a>
        ))}
      </div>

      {/* Action Icons */}
      <div className="flex items-center gap-5 text-white">
        <button className="p-2 hover:bg-white/5 rounded-full transition-colors" aria-label="Search">
          <Search size={20} strokeWidth={2.5} />
        </button>
        
        <button className="p-2 hover:bg-white/5 rounded-full transition-colors relative" aria-label="Cart">
          <ShoppingBag size={20} strokeWidth={2.5} />
          {/* Notification dot */}
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#a3e635] rounded-full border-2 border-[#0d130d]"></span>
        </button>

        <button className="p-2 md:hidden hover:bg-white/5 rounded-full transition-colors" aria-label="Menu">
          <Menu size={24} />
        </button>
      </div>

    </nav>
  );
};

export default Navbar;