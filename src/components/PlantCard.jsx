import React from 'react';
import { ShoppingBag } from 'lucide-react';

const PlantCard = ({ name, description, price, imageUrl, badge }) => {
  return (
    <div className="relative group pt-12">
      {/* 1. The Container */}
      <div className="bg-[#1a221a] rounded-[2.5rem] p-6 pt-16 border border-white/5 transition-all duration-500 hover:border-[#a3e635]/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
        
        {/* 2. Floating Image (Pops out of the top) */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-48 z-10 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-full object-contain drop-shadow-[0_20px_20px_rgba(0,0,0,0.5)]"
          />
        </div>

        {/* 3. Text Content */}
        <div className="mt-8 space-y-3">
          <h3 className="text-xl font-bold text-white tracking-tight">
            {name}
          </h3>
          <p className="text-gray-400 text-xs leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>

        {/* 4. Price and Action */}
        <div className="mt-8 flex items-center justify-between">
          <div className="text-lg font-bold text-white">
            Rs. {price}/-
          </div>
          
          <button 
            className="p-3 bg-white/5 border border-white/10 rounded-xl text-white transition-all hover:bg-[#a3e635] hover:text-black hover:border-[#a3e635] active:scale-95"
            aria-label="Add to cart"
          >
            <ShoppingBag size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* 5. Optional Top Badge (The 'R' or 'N' avatars seen in your screenshot) */}
      {badge && (
        <div className="absolute top-2 right-4 z-20 w-8 h-8 rounded-full bg-[#1db954] border-2 border-[#0d130d] flex items-center justify-center text-[10px] font-bold text-white shadow-lg">
          {badge}
        </div>
      )}
    </div>
  );
};

export default PlantCard;