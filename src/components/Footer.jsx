import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#0d130d] text-white pt-20 pb-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-white/5 pb-12">
        
        {/* Column 1: Brand & Socials */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#a3e635] rounded-lg shadow-[0_0_15px_rgba(163,230,53,0.4)] flex items-center justify-center">
              {/* Simple Plant Leaf Icon Placeholder */}
              <div className="w-4 h-4 bg-[#0d130d] rounded-full"></div>
            </div>
            <span className="text-2xl font-bold tracking-tight">FloraVision.</span>
          </div>
          
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            "From lush indoor greens to vibrant outdoor blooms, our plants are crafted 
            to thrive and elevate your living environment."
          </p>

          <div className="flex gap-6 text-xs font-bold tracking-widest text-gray-300">
            <a href="#" className="hover:text-[#a3e635] transition-colors">FB</a>
            <a href="#" className="hover:text-[#a3e635] transition-colors">TW</a>
            <a href="#" className="hover:text-[#a3e635] transition-colors">LI</a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="md:pl-12">
          <h4 className="text-lg font-semibold mb-6">Quick Link's</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li><a href="#" className="hover:text-white transition-colors underline underline-offset-4 decoration-white/20">Home</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Type's Of plant's</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
          </ul>
        </div>

        {/* Column 3: Newsletter */}
        <div className="space-y-6">
          <h4 className="text-lg font-semibold">For Every Update.</h4>
          <div className="relative flex items-center">
            <input 
              type="email" 
              placeholder="Enter Email" 
              className="w-full bg-transparent border border-white/20 rounded-lg py-3 px-4 text-sm focus:outline-none focus:border-[#a3e635] transition-all"
            />
            <button className="absolute right-1 px-4 py-2 bg-white text-black font-bold text-xs rounded-md hover:bg-[#a3e635] transition-colors uppercase">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="max-w-7xl mx-auto mt-8 flex justify-end">
        <p className="text-xs text-gray-500">
          FloraVision © all right reserve
        </p>
      </div>
    </footer>
  );
};

export default Footer;