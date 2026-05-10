import React from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero';
import SectionHeader from './components/SectionHeader.jsx';
import PlantCard from './components/PlantCard.jsx';
import ReviewCard from './components/ReviewCard.jsx';
import Footer from './components/Footer.jsx';

// Importing the data we structured earlier
import { topSellingPlants, reviews, deskDecorations } from './data.js';

const App = () => {
  return (
    <div className="bg-[#0d130d] min-h-screen selection:bg-[#a3e635] selection:text-[#0d130d]">
      <Navbar />
      
      <main>
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Trendy Plants / Desk Decorations Section */}
        <section className="py-20 px-6 max-w-7xl mx-auto space-y-32">
          <SectionHeader title="Our Trendy plants" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {deskDecorations.map((item, index) => (
              <div 
                key={index} 
                className="bg-[#1a221a] rounded-[3rem] p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 border border-white/5 relative group overflow-hidden"
              >
                {/* Visual Accent */}
                <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-[#a3e635]/5 blur-3xl rounded-full group-hover:bg-[#a3e635]/10 transition-colors"></div>
                
                <img 
                  src={item.imageUrl} 
                  alt="Decoration" 
                  className="w-48 h-48 object-contain z-10 transition-transform duration-500 group-hover:scale-110" 
                />
                
                <div className="space-y-4 z-10">
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                  <div className="flex items-center justify-between pt-4">
                    <span className="text-lg font-bold">Rs. {item.price}/-</span>
                    <div className="flex gap-2">
                      <button className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold hover:bg-white hover:text-black transition-all">
                        Explore
                      </button>
                      <button className="p-2 bg-white/5 border border-white/10 rounded-lg">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Top Selling Plants Section */}
        <section className="py-24 bg-black/10">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeader title="Our Top Selling Plants" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-28 mt-16">
              {topSellingPlants.map((plant, index) => (
                <PlantCard key={index} {...plant} />
              ))}
            </div>
          </div>
        </section>

        {/* 4. Reviews Section */}
        <section className="py-24 max-w-7xl mx-auto px-6">
          <SectionHeader title="Customer Review" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {reviews.map((review, index) => (
              <ReviewCard key={index} {...review} />
            ))}
          </div>
        </section>

        {/* 5. O2 Feature Section (Small & Best O2 Plants) */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
           <div className="text-center mb-16">
             <div className="inline-block border-x-2 border-[#a3e635] px-6">
                <h2 className="text-2xl font-bold uppercase tracking-[0.2em]">Our Best o2</h2>
             </div>
           </div>
           
           <div className="bg-[#1a221a] rounded-[3rem] p-8 md:p-16 flex flex-col md:flex-row items-center gap-16 border border-white/5">
              <div className="flex-1">
                <img 
                  src="https://www.pngarts.com/files/3/Indoor-Plant-PNG-Transparent-Image.png" 
                  alt="O2 Plant" 
                  className="w-full max-w-[450px] drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]" 
                />
              </div>
              <div className="flex-1 space-y-6">
                <h3 className="text-3xl font-bold leading-tight">We Have Small And Best O2 Plants Collection's</h3>
                <p className="text-gray-400 leading-relaxed">
                  Oxygen-producing plants, often referred to as "O2 plants," release oxygen through photosynthesis. 
                  They filter toxins like formaldehyde and benzene, making your air healthier to breathe.
                </p>
                <div className="flex items-center justify-between pt-6">
                  <button className="px-10 py-3 bg-transparent border border-white/20 rounded-full hover:bg-white hover:text-black transition-all font-bold">
                    Explore
                  </button>
                  <div className="flex items-center gap-4 font-mono text-gray-500">
                    <span className="hover:text-white cursor-pointer transition-colors">&lt;</span>
                    <span className="text-white">01/04</span>
                    <span className="hover:text-white cursor-pointer transition-colors">&gt;</span>
                  </div>
                </div>
              </div>
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default App;