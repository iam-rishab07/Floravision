import React, { useRef } from 'react';
import { Star } from 'lucide-react';

const ReviewCard = ({ name, rating, comment, avatar }) => {
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
      className="relative group w-full max-w-[350px] py-4 cursor-default"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 1. The Glassmorphism Card */}
      <div 
        ref={cardRef}
        className="bg-white p-8 rounded-[2.5rem] border border-editorial h-full flex flex-col justify-between transition-all duration-300 ease-out shadow-soft"
        style={{ 
          transformStyle: 'preserve-3d', 
          transition: 'transform 0.1s ease-out, box-shadow 0.1s ease-out' 
        }}
      >
        
        <div className="space-y-4" style={{ transform: 'translateZ(30px)' }}>
          {/* 2. User Info Header */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#C2A684]/30 group-hover:border-[#C2A684] transition-colors duration-300">
              <img 
                src={avatar} 
                alt={name} 
                className="w-full h-full object-cover" 
              />
            </div>
            <div>
              <h4 className="text-[#1B362F] font-bold text-sm">{name}</h4>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={10} 
                    fill={i < Math.floor(rating) ? "#C2A684" : "transparent"} 
                    className={i < Math.floor(rating) ? "text-[#C2A684]" : "text-gray-300"}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* 3. The Comment */}
          <p className="text-gray-500 text-xs leading-relaxed italic font-medium" style={{ transform: 'translateZ(20px)' }}>
            "{comment}"
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;