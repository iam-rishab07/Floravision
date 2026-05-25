import React, { useState, useRef } from 'react';
import { ShoppingBag, ArrowLeft, Heart, Sun, Droplet, ShieldAlert, Ruler } from 'lucide-react';

const ProductDetailPage = ({ plant, onAddToCart, onBackToShop }) => {
  const [quantity, setQuantity] = useState(1);
  const cardRef = useRef(null);

  if (!plant) return null;

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  const increaseQty = () => setQuantity(prev => prev + 1);
  const decreaseQty = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-12 reveal-on-load">
      
      {/* Navigation Breadcrumb */}
      <button 
        onClick={onBackToShop}
        className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-[#1B362F] transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Shop
      </button>

      {/* Main Info Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* Left Column: 3D Parallax Image Viewer */}
        <div 
          className="flex justify-center items-center bg-white border border-editorial shadow-soft rounded-[3rem] p-12 relative group overflow-visible aspect-square"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          ref={cardRef}
          style={{ transformStyle: 'preserve-3d', transition: 'transform 0.1s ease-out' }}
        >
          {/* Subtle backdrop circle */}
          <div className="absolute w-[70%] h-[70%] bg-[#F2F0EB] rounded-full blur-2xl z-0 opacity-70"></div>
          
          <img 
            src={plant.imageUrl} 
            alt={plant.name} 
            className="w-[85%] h-[85%] object-contain drop-shadow-[0_30px_30px_rgba(27,54,47,0.2)] animate-float z-10"
            style={{ transform: 'translateZ(60px)' }}
          />

          <button className="absolute top-6 right-6 p-4 bg-[#F9F8F6] border border-editorial hover:bg-white rounded-full hover:text-red-500 transition-colors shadow-sm">
            <Heart size={16} />
          </button>
        </div>

        {/* Right Column: Checkout and Editorial Metadata */}
        <div className="space-y-8">
          
          {/* Header Metadata */}
          <div className="space-y-4">
            <span className="px-3 py-1 bg-[#EAECE6] text-[#1B362F] text-[10px] uppercase font-bold tracking-widest rounded-full">
              {plant.category} Category
            </span>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-[#1B362F]">
              {plant.name}
            </h1>
            <div className="text-2xl font-bold text-[#1B362F]">
              Rs. {plant.price}/-
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              {plant.description}
            </p>
          </div>

          <hr className="border-editorial" />

          {/* Quick Specifications care log */}
          <div className="grid grid-cols-2 gap-4">
            
            <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-editorial shadow-soft">
              <div className="p-3 bg-[#EAECE6] rounded-xl text-[#1B362F]">
                <Sun size={18} />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Sunlight</p>
                <p className="text-xs font-bold text-[#2D3230]">{plant.sunlight}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-editorial shadow-soft">
              <div className="p-3 bg-[#EAECE6] rounded-xl text-[#1B362F]">
                <Droplet size={18} />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Watering</p>
                <p className="text-xs font-bold text-[#2D3230]">{plant.water}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-editorial shadow-soft">
              <div className="p-3 bg-[#EAECE6] rounded-xl text-[#1B362F]">
                <Ruler size={18} />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Dimensions</p>
                <p className="text-xs font-bold text-[#2D3230]">{plant.size}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-editorial shadow-soft">
              <div className="p-3 bg-[#EAECE6] rounded-xl text-[#1B362F]">
                <ShieldAlert size={18} />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Pet Safe</p>
                <p className="text-xs font-bold text-[#2D3230]">{plant.petFriendly ? "Safe for Pets" : "Toxic (Keep Away)"}</p>
              </div>
            </div>

          </div>

          <hr className="border-editorial" />

          {/* Cart Quantity and Add to Cart Button */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            
            {/* Quantity Selector */}
            <div className="flex items-center bg-[#F2F0EB] rounded-xl border border-editorial px-2 py-1 w-fit">
              <button 
                onClick={decreaseQty}
                className="w-10 h-10 flex items-center justify-center text-sm font-bold text-gray-500 hover:text-[#1B362F]"
              >
                -
              </button>
              <span className="w-12 text-center text-sm font-bold text-[#1B362F]">
                {quantity}
              </span>
              <button 
                onClick={increaseQty}
                className="w-10 h-10 flex items-center justify-center text-sm font-bold text-gray-500 hover:text-[#1B362F]"
              >
                +
              </button>
            </div>

            {/* Add to Cart Trigger */}
            <button
              onClick={() => onAddToCart(plant, quantity)}
              className="flex-1 w-full sm:w-auto px-8 py-4 bg-[#1B362F] hover:bg-[#1B362F]/90 text-white rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-colors shadow-md"
            >
              <ShoppingBag size={16} />
              Add to Basket
            </button>

          </div>

        </div>
      </div>

      {/* Origin/About Section */}
      <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-editorial shadow-soft space-y-6">
        <h3 className="text-2xl font-bold text-[#1B362F]">Botanical History & Character</h3>
        <p className="text-gray-500 text-sm leading-relaxed">
          {plant.about}
        </p>
      </div>

    </div>
  );
};

export default ProductDetailPage;
