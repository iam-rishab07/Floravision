import React, { useState } from 'react';
import PlantCard from './PlantCard';

const ShopPage = ({ plants, onAddToCart, onViewDetails }) => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState(800);
  const [sortBy, setSortBy] = useState('default');

  const categories = ['All', 'Indoor', 'Succulents', 'Desk Decor'];

  // Filtering Logic
  const filteredPlants = plants.filter((plant) => {
    const matchesSearch = plant.name.toLowerCase().includes(search.toLowerCase()) || 
                          plant.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || plant.category === activeCategory;
    const matchesPrice = parseInt(plant.price) <= maxPrice;
    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Sorting Logic
  const sortedPlants = [...filteredPlants].sort((a, b) => {
    if (sortBy === 'price-asc') return parseInt(a.price) - parseInt(b.price);
    if (sortBy === 'price-desc') return parseInt(b.price) - parseInt(a.price);
    if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12 reveal-on-load">
      {/* Editorial Title */}
      <div className="text-center space-y-4">
        <span className="text-xs uppercase tracking-widest text-[#C2A684] font-semibold">Our Collection</span>
        <h1 className="text-4xl md:text-6xl font-bold text-[#1B362F]">Shop Curated Botanicals</h1>
        <p className="text-gray-500 max-w-lg mx-auto text-sm leading-relaxed">
          Carefully selected plants grown to thrive inside your home. Filter by category, price, or species to find your match.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Filters Sidebar */}
        <div className="space-y-8 bg-white p-8 rounded-3xl border border-editorial shadow-soft h-fit">
          
          {/* Search */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#1B362F] font-bold">Search Species</h4>
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#F9F8F6] border border-editorial rounded-xl py-3 px-4 text-xs focus:outline-none focus:border-[#C2A684] transition-colors text-[#2D3230]"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#1B362F] font-bold">Categories</h4>
            <div className="flex flex-col gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-left py-2 px-4 rounded-xl text-xs font-semibold transition-all ${
                    activeCategory === cat
                      ? 'bg-[#1B362F] text-white'
                      : 'hover:bg-[#F2F0EB] text-[#2D3230]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Max Price Filter */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="text-xs uppercase tracking-widest text-[#1B362F] font-bold">Max Price</h4>
              <span className="text-xs font-bold text-[#1B362F]">Rs. {maxPrice}/-</span>
            </div>
            <input
              type="range"
              min="200"
              max="800"
              step="50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseInt(e.target.value))}
              className="w-full accent-[#1B362F] bg-gray-200 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-400">
              <span>Rs. 200</span>
              <span>Rs. 800</span>
            </div>
          </div>

          {/* Sort By */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#1B362F] font-bold">Sort By</h4>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-[#F9F8F6] border border-editorial rounded-xl py-3 px-3 text-xs focus:outline-none focus:border-[#C2A684] transition-colors text-[#2D3230]"
            >
              <option value="default">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
            </select>
          </div>
        </div>

        {/* Shop Grid */}
        <div className="lg:col-span-3">
          {sortedPlants.length === 0 ? (
            <div className="text-center py-20 bg-white border border-editorial rounded-3xl shadow-soft">
              <p className="text-gray-400 text-sm">No plants match your filters. Try checking other options.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {sortedPlants.map((plant) => (
                <div 
                  key={plant.id} 
                  onClick={() => onViewDetails(plant.id)}
                  className="cursor-pointer"
                >
                  <PlantCard
                    name={plant.name}
                    description={plant.description}
                    price={plant.price}
                    imageUrl={plant.imageUrl}
                    onAddToCart={(e) => {
                      e.stopPropagation(); // Stop navigation click
                      onAddToCart(plant);
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ShopPage;
