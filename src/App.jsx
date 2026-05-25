import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import SectionHeader from './components/SectionHeader.jsx';
import PlantCard from './components/PlantCard.jsx';
import ReviewCard from './components/ReviewCard.jsx';
import Footer from './components/Footer.jsx';
import TrendyPlantCard from './components/TrendyPlantCard.jsx';
import ShopPage from './components/ShopPage.jsx';
import ProductDetailPage from './components/ProductDetailPage.jsx';
import CartPage from './components/CartPage.jsx';
import ContactPage from './components/ContactPage.jsx';

import { allPlants, topSellingPlants, deskDecorations, reviews } from './data.js';

const App = () => {
  const [page, setPage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [cart, setCart] = useState([]);
  
  // Testimonial submission state
  const [newReview, setNewReview] = useState({ name: '', comment: '', rating: 5 });
  const [submittedReview, setSubmittedReview] = useState(false);
  const [localReviews, setLocalReviews] = useState(reviews);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page, selectedProductId]);

  // Navigation controller
  const handleNavigate = (targetPage) => {
    setPage(targetPage);
    setSelectedProductId(null);
  };

  // View detail controller
  const handleViewDetails = (id) => {
    setSelectedProductId(id);
    setPage('product');
  };

  // Cart operations
  const handleAddToCart = (plant, qty = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === plant.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === plant.id ? { ...item, qty: item.qty + qty } : item
        );
      }
      return [...prevCart, { ...plant, qty }];
    });
  };

  const handleUpdateQty = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, qty: newQty } : item))
    );
  };

  const handleRemoveItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;
    setLocalReviews(prev => [
      {
        name: newReview.name,
        comment: newReview.comment,
        rating: parseFloat(newReview.rating),
        avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 50) + 10}`,
        badge: false
      },
      ...prev
    ]);
    setSubmittedReview(true);
    setNewReview({ name: '', comment: '', rating: 5 });
  };

  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);
  const selectedProduct = allPlants.find((p) => p.id === selectedProductId);

  return (
    <div className="bg-[#F9F8F6] min-h-screen selection:bg-[#C2A684] selection:text-[#1B362F] scroll-smooth relative">
      
      {/* Persistant Top Header */}
      <Navbar 
        activePage={page} 
        onNavigate={handleNavigate} 
        cartCount={cartCount} 
      />

      {/* Pages Switch Router */}
      <main className="min-h-[70vh]">
        {page === 'home' && (
          <div className="reveal-on-load space-y-32 pb-24">
            {/* 1. Hero Section */}
            <Hero 
              onNavigate={handleNavigate} 
              onViewDetails={handleViewDetails} 
            />

            {/* 2. Trendy Plants / Desk Decorations Section */}
            <section className="px-6 max-w-7xl mx-auto space-y-16">
              <SectionHeader title="Our Trendy Plants" />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {deskDecorations.map((item) => (
                  <TrendyPlantCard 
                    key={item.id} 
                    item={item} 
                    onAddToCart={() => handleAddToCart(item)} 
                  />
                ))}
              </div>
            </section>

            {/* 3. Top Selling Plants Section */}
            <section className="py-24 bg-[#F2F0EB]">
              <div className="max-w-7xl mx-auto px-6">
                <SectionHeader title="Our Top Selling Plants" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                  {topSellingPlants.map((plant) => (
                    <div 
                      key={plant.id} 
                      onClick={() => handleViewDetails(plant.id)}
                      className="cursor-pointer"
                    >
                      <PlantCard 
                        name={plant.name}
                        description={plant.description}
                        price={plant.price}
                        imageUrl={plant.imageUrl}
                        onAddToCart={(e) => {
                          e.stopPropagation();
                          handleAddToCart(plant);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 4. Customer Reviews Section */}
            <section className="max-w-7xl mx-auto px-6">
              <SectionHeader title="Customer Reviews" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 justify-items-center">
                {localReviews.slice(0, 3).map((review, index) => (
                  <ReviewCard key={index} {...review} />
                ))}
              </div>
            </section>

            {/* 5. O2 Feature Section */}
            <section className="px-6 max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-block border-x-2 border-[#C2A684] px-6">
                  <h2 className="text-2xl font-bold uppercase tracking-[0.2em] text-[#1B362F]">Our Best O2</h2>
                </div>
              </div>
              
              <div className="bg-white rounded-[3rem] p-8 md:p-16 flex flex-col md:flex-row items-center gap-16 border border-editorial shadow-soft">
                <div className="flex-1 flex justify-center">
                  <img 
                    src="/images/o2_plant.png" 
                    alt="O2 Plant" 
                    className="w-full max-w-[320px] drop-shadow-[0_20px_35px_rgba(27,54,47,0.15)] animate-float" 
                  />
                </div>
                <div className="flex-1 space-y-6">
                  <span className="text-xs uppercase tracking-widest text-[#C2A684] font-bold">Recommended bedroom plant</span>
                  <h3 className="text-3xl font-bold leading-tight text-[#1B362F]">We Have Small And Best O2 Plant Collections</h3>
                  <p className="text-gray-500 leading-relaxed text-sm font-medium">
                    Oxygen-producing plants, often referred to as "O2 plants," release oxygen through photosynthesis. 
                    They filter toxins like formaldehyde and benzene, making your air healthier to breathe.
                  </p>
                  <div className="flex items-center justify-between pt-6">
                    <button 
                      onClick={() => handleViewDetails('snake-plant')}
                      className="px-10 py-3 bg-[#1B362F] hover:bg-[#1B362F]/90 text-white rounded-xl hover:scale-105 transition-all font-bold text-xs uppercase tracking-widest"
                    >
                      View O2 Plant
                    </button>
                    <div className="flex items-center gap-4 font-mono text-gray-400 text-xs font-bold">
                      <span>&lt;</span>
                      <span className="text-[#1B362F] font-bold">01/01</span>
                      <span>&gt;</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {page === 'shop' && (
          <ShopPage 
            plants={allPlants} 
            onAddToCart={handleAddToCart} 
            onViewDetails={handleViewDetails} 
          />
        )}

        {page === 'product' && (
          <ProductDetailPage 
            plant={selectedProduct} 
            onAddToCart={handleAddToCart} 
            onBackToShop={() => handleNavigate('shop')} 
          />
        )}

        {page === 'cart' && (
          <CartPage 
            cart={cart} 
            onUpdateQty={handleUpdateQty} 
            onRemoveItem={handleRemoveItem} 
            onClearCart={handleClearCart} 
            onBackToShop={() => handleNavigate('shop')} 
          />
        )}

        {page === 'contact' && (
          <ContactPage />
        )}

        {page === 'reviews' && (
          <div className="max-w-7xl mx-auto px-6 py-12 space-y-16 reveal-on-load">
            {/* Reviews list and review submission */}
            <div className="text-center space-y-4">
              <span className="text-xs uppercase tracking-widest text-[#C2A684] font-semibold">Client Stories</span>
              <h1 className="text-4xl md:text-6xl font-bold text-[#1B362F]">Customer Testimonials</h1>
              <p className="text-gray-500 max-w-lg mx-auto text-sm leading-relaxed">
                Read experiences from plant parents who welcomed FloraVision greenery into their spaces.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              {localReviews.map((review, index) => (
                <ReviewCard key={index} {...review} />
              ))}
            </div>

            <hr className="border-editorial" />

            {/* Leave a review form */}
            <div className="max-w-xl mx-auto bg-white p-8 md:p-12 rounded-[2.5rem] border border-editorial shadow-soft space-y-6">
              <h3 className="text-2xl font-bold text-[#1B362F] text-center">Share Your Experience</h3>
              {submittedReview ? (
                <div className="text-center py-6 space-y-4">
                  <CheckCircle2Icon className="w-12 h-12 text-[#1B362F] mx-auto animate-bounce" />
                  <p className="text-sm font-semibold text-gray-500">Thank you for sharing your review! It has been posted above.</p>
                  <button 
                    onClick={() => setSubmittedReview(false)}
                    className="px-6 py-2 bg-[#F2F0EB] text-[#1B362F] font-bold text-xs uppercase tracking-widest rounded-lg"
                  >
                    Post Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-[#1B362F] uppercase tracking-wider">Your Name</label>
                    <input 
                      type="text" 
                      required 
                      value={newReview.name}
                      onChange={(e) => setNewReview(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Alice Vance" 
                      className="w-full bg-[#F9F8F6] border border-editorial rounded-lg py-3 px-3 focus:outline-none focus:border-[#C2A684]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-[#1B362F] uppercase tracking-wider">Rating</label>
                    <select
                      value={newReview.rating}
                      onChange={(e) => setNewReview(prev => ({ ...prev, rating: e.target.value }))}
                      className="w-full bg-[#F9F8F6] border border-editorial rounded-lg py-3 px-3 focus:outline-none focus:border-[#C2A684]"
                    >
                      <option value="5">5 Stars (Excellent)</option>
                      <option value="4">4 Stars (Good)</option>
                      <option value="3">3 Stars (Average)</option>
                      <option value="2">2 Stars (Poor)</option>
                      <option value="1">1 Star (Very Poor)</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-[#1B362F] uppercase tracking-wider">Your Comment</label>
                    <textarea 
                      required 
                      rows="4"
                      value={newReview.comment}
                      onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                      placeholder="Let us know how your plant is doing..." 
                      className="w-full bg-[#F9F8F6] border border-editorial rounded-lg py-3 px-3 focus:outline-none focus:border-[#C2A684] resize-none"
                    ></textarea>
                  </div>
                  <button 
                    type="submit"
                    className="w-full py-4 bg-[#1B362F] text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-md hover:bg-[#1B362F]/90 transition-colors"
                  >
                    Submit Testimonial
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Persistant Footer */}
      <Footer onNavigate={handleNavigate} />

    </div>
  );
};

// Simple inline helper SVG icon since CheckCircle2 can vary in lucide versions
const CheckCircle2Icon = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export default App;