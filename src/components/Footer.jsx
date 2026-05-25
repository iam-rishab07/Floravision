import React from 'react';

const Footer = ({ onNavigate }) => {
  return (
    <footer className="bg-[#F2F0EB] text-[#1B362F] pt-20 pb-10 px-6 md:px-12 border-t border-editorial">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-editorial pb-12">

        {/* Column 1: Brand & Socials */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#1B362F] rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-[#C2A684] rounded-sm transform rotate-45"></div>
            </div>
            <span className="text-2xl font-bold tracking-tight text-[#1B362F]">Botanica.</span>
          </div>

          <p className="text-gray-500 text-sm leading-relaxed max-w-xs font-medium">
            "From lush indoor greens to vibrant outdoor blooms, our plants are crafted
            to thrive and elevate your living environment."
          </p>

        </div>

        {/* Column 2: Quick Links */}
        <div className="md:pl-12">
          <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
          <ul className="space-y-4 text-sm font-semibold text-gray-500">
            <li>
              <button
                onClick={() => onNavigate('home')}
                className="hover:text-[#1B362F] transition-colors"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('shop')}
                className="hover:text-[#1B362F] transition-colors"
              >
                Shop Collection
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('contact')}
                className="hover:text-[#1B362F] transition-colors"
              >
                Contact Greenhouse
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Newsletter */}
        <div className="space-y-6">
          <h4 className="text-lg font-semibold">For Every Update</h4>
          <div className="relative flex items-center">
            <input
              type="email"
              placeholder="Enter Email"
              className="w-full bg-white border border-editorial rounded-lg py-3 px-4 text-sm focus:outline-none focus:border-[#C2A684] transition-all text-[#2D3230]"
            />
            <button className="absolute right-1 px-4 py-2 bg-[#1B362F] hover:bg-[#1B362F]/90 text-white font-bold text-xs rounded-md transition-colors uppercase">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="max-w-7xl mx-auto mt-8 flex justify-end">
        <p className="text-xs text-gray-400 font-semibold">
          Botanica © All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;