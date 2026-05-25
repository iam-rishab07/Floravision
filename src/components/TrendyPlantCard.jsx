import React, { useRef } from 'react';

const TrendyPlantCard = ({ item, onAddToCart }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10; // Max 10 degrees tilt
    const rotateY = ((x - centerX) / centerX) * 10;

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
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-white rounded-[3rem] p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 border border-editorial relative group overflow-visible transition-all duration-300 ease-out shadow-soft"
      style={{ 
        transformStyle: 'preserve-3d', 
        transition: 'transform 0.1s ease-out, box-shadow 0.1s ease-out' 
      }}
    >
      {/* Visual Accent */}
      <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-[#EAECE6]/20 blur-3xl rounded-full group-hover:bg-[#EAECE6]/50 transition-colors"></div>
      
      {/* Plant Image - Translate Z */}
      <div 
        className="w-48 h-48 z-10 transition-transform duration-500 group-hover:scale-110 flex items-center justify-center"
        style={{ transform: 'translateZ(55px)', transformStyle: 'preserve-3d' }}
      >
        <img 
          src={item.imageUrl} 
          alt={item.title} 
          className="w-full h-full object-contain drop-shadow-[0_20px_20px_rgba(27,54,47,0.15)]" 
        />
      </div>
      
      {/* Content - Translate Z */}
      <div className="space-y-4 z-10 flex-1" style={{ transform: 'translateZ(30px)' }}>
        <h3 className="text-xl font-bold text-[#1B362F]">{item.title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed font-medium">{item.description}</p>
        <div className="flex items-center justify-between pt-4">
          <span className="text-lg font-bold text-[#1B362F]">Rs. {item.price}/-</span>
          <div className="flex gap-2">
            <button className="px-6 py-2 bg-[#F2F0EB] border border-editorial rounded-full text-xs font-bold text-[#1B362F] hover:bg-[#1B362F] hover:text-white transition-all">
              Explore
            </button>
            <button 
              onClick={onAddToCart}
              className="p-2 bg-[#F2F0EB] border border-editorial rounded-lg text-[#1B362F] hover:bg-[#1B362F] hover:text-white transition-colors" 
              aria-label="Add to cart"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendyPlantCard;
