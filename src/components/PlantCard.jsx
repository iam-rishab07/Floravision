import React, { useRef } from 'react';
import { ShoppingBag } from 'lucide-react';

const PlantCard = ({ name, description, price, imageUrl, onAddToCart }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -12; // Max 12 degrees tilt
    const rotateY = ((x - centerX) / centerX) * 12;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.boxShadow = `${-rotateY * 0.8}px ${rotateX * 0.8}px 25px rgba(27, 54, 47, 0.04), 0 20px 40px rgba(27, 54, 47, 0.05)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    card.style.boxShadow = 'none';
  };

  return (
    <div 
      className="relative group pt-12"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      
      {/* 1. The Container */}
      <div 
        ref={cardRef}
        className="bg-white rounded-[2.5rem] p-6 pt-40 border border-editorial shadow-soft transition-all duration-300 ease-out overflow-visible"
        style={{ 
          transformStyle: 'preserve-3d', 
          transition: 'transform 0.1s ease-out, box-shadow 0.1s ease-out' 
        }}
      >
        
        {/* Decorative Background Glow (Appears on Hover) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-[#EAECE6]/0 group-hover:bg-[#EAECE6]/50 blur-[40px] rounded-full transition-all duration-500"></div>

        {/* 2. Floating Image - Placed in 3D Z-axis space */}
        <div 
          className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-48 z-10 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3"
          style={{ transform: 'translate3d(-50%, 0, 50px)', transformStyle: 'preserve-3d' }}
        >
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-full object-contain drop-shadow-[0_20px_20px_rgba(27,54,47,0.15)]"
          />
        </div>

        {/* 3. Text Content - Layered in Z-axis */}
        <div className="mt-8 space-y-3" style={{ transform: 'translateZ(30px)' }}>
          <h3 className="text-xl font-bold text-[#1B362F] tracking-tight">
            {name}
          </h3>
          <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 h-8 font-medium">
            {description}
          </p>
        </div>

        {/* 4. Price and Action - Layered in Z-axis */}
        <div className="mt-8 flex items-center justify-between" style={{ transform: 'translateZ(35px)' }}>
          <div className="text-lg font-bold text-[#1B362F]">
            Rs. {price}/-
          </div>
          
          <button 
            onClick={onAddToCart}
            className="p-3 bg-[#F2F0EB] border border-editorial rounded-xl text-[#1B362F] transition-all hover:bg-[#1B362F] hover:text-white active:scale-90"
            aria-label="Add to cart"
          >
            <ShoppingBag size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlantCard;