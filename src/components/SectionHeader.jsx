import React from 'react';

const SectionHeader = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center mb-16 px-4">
      {/* The Framed Title Container */}
      <div className="relative inline-block">
        {/* Left Bracket Accent */}
        <div className="absolute -left-4 top-0 bottom-0 w-2 border-l-2 border-y-2 border-[#C2A684] rounded-l-lg opacity-80"></div>
        
        <h2 className="text-2xl md:text-3xl font-bold text-[#1B362F] uppercase tracking-widest px-4 py-1">
          {title}
        </h2>

        {/* Right Bracket Accent */}
        <div className="absolute -right-4 top-0 bottom-0 w-2 border-r-2 border-y-2 border-[#C2A684] rounded-r-lg opacity-80"></div>
      </div>

      {/* Optional Subtitle */}
      {subtitle && (
        <p className="mt-4 text-gray-500 text-sm max-w-lg leading-relaxed font-medium">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;