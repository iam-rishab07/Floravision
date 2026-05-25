import React from 'react';
import { Search, ShoppingBag, Menu } from 'lucide-react';
import { navLinks } from '../data';

const Navbar = ({ activePage, onNavigate, cartCount }) => {
  return (
    <nav className="sticky top-0 z-50 bg-[#F9F8F6]/90 backdrop-blur-md px-6 md:px-12 py-5 flex items-center justify-between border-b border-editorial">
      
      {/* Logo Section */}
      <div 
        onClick={() => onNavigate('home')}
        className="flex items-center gap-2 group cursor-pointer"
      >
        <div className="relative">
          <div className="w-8 h-8 bg-[#1B362F] rounded-lg shadow-sm flex items-center justify-center transition-transform group-hover:rotate-12 duration-300">
            <div className="w-4 h-4 bg-[#C2A684] rounded-sm transform rotate-45"></div>
          </div>
        </div>
        <span className="text-xl font-bold tracking-tight text-[#1B362F]">
          Botanica<span className="text-[#C2A684]">.</span>
        </span>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-10">
        {navLinks.map((link) => (
          <button
            key={link.name}
            onClick={() => onNavigate(link.href)}
            className={`text-xs uppercase tracking-widest font-bold transition-all relative group ${
              activePage === link.href ? 'text-[#1B362F]' : 'text-gray-400 hover:text-[#1B362F]'
            }`}
          >
            {link.name}
            {/* Animated Underline */}
            <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#C2A684] transition-all duration-300 ${
              activePage === link.href ? 'w-full' : 'w-0 group-hover:w-full'
            }`}></span>
          </button>
        ))}
      </div>

      {/* Action Icons */}
      <div className="flex items-center gap-5 text-[#1B362F]">
        <button 
          onClick={() => onNavigate('shop')}
          className="p-2 hover:bg-[#F2F0EB] rounded-xl transition-all duration-300 group" 
          aria-label="Search"
        >
          <Search size={20} className="group-hover:scale-110 transition-all text-[#1B362F]" />
        </button>
        
        <button 
          onClick={() => onNavigate('cart')}
          className="p-2 hover:bg-[#F2F0EB] rounded-xl transition-all duration-300 relative group" 
          aria-label="Cart"
        >
          <ShoppingBag size={20} className="group-hover:scale-110 transition-all text-[#1B362F]" />
          {/* Cart Quantity Badge */}
          {cartCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-[#C2A684] text-white text-[9px] font-bold rounded-full flex items-center justify-center border border-[#F9F8F6] shadow-sm animate-bounce">
              {cartCount}
            </span>
          )}
        </button>

        {/* Mobile Menu Trigger */}
        <button className="p-2 md:hidden hover:bg-[#F2F0EB] rounded-xl transition-colors" aria-label="Menu">
          <Menu size={24} />
        </button>
      </div>

    </nav>
  );
};

export default Navbar;