import React from 'react';
import { Star } from 'lucide-react';

const ReviewCard = ({ name, rating, comment, avatar, badge }) => {
  return (
    <div className="relative group w-full max-w-[350px]">
      {/* 1. The Glassmorphism Card */}
      <div className="bg-[#1a221a]/80 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/5 h-full flex flex-col justify-between transition-all duration-300 hover:bg-[#1a221a] hover:border-white/10">
        
        <div className="space-y-4">
          {/* 2. User Info Header */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#a3e635]/30">
              <img 
                src={avatar} 
                alt={name} 
                className="w-full h-full object-cover" 
              />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">{name}</h4>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={10} 
                    fill={i < Math.floor(rating) ? "#a3e635" : "transparent"} 
                    className={i < Math.floor(rating) ? "text-[#a3e635]" : "text-gray-600"}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* 3. The Comment */}
          <p className="text-gray-400 text-xs leading-relaxed italic">
            "{comment}"
          </p>
        </div>
      </div>

      {/* 4. Floating Avatar Badge (The overlapping circles seen in UI) */}
      {badge && (
        <div className="absolute -top-4 -right-4 z-20 flex items-center bg-[#2a332a] p-1.5 rounded-full border border-white/10 shadow-xl">
          <div className="flex -space-x-2">
            <div className="w-6 h-6 rounded-full border border-[#0d130d] bg-blue-500 flex items-center justify-center text-[8px] text-white font-bold">i</div>
            <div className="w-6 h-6 rounded-full border border-[#0d130d] bg-gray-700 flex items-center justify-center text-[8px] text-white">2</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;