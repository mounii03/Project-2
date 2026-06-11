/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, Search, Star, X, Grid, LayoutList } from 'lucide-react';
import { Product, Category } from '../types';
import ProductCard from './ProductCard';

interface CatalogViewProps {
  products: Product[];
  categoryFilter: Category | 'All';
  setCategoryFilter: (category: Category | 'All') => void;
  onSelectProduct: (product: Product) => void;
  isWishlisted: (product: Product) => boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number, color?: string, size?: string) => void;
}

export default function CatalogView({
  products,
  categoryFilter,
  setCategoryFilter,
  onSelectProduct,
  isWishlisted,
  onToggleWishlist,
  onAddToCart
}: CatalogViewProps) {
  // Filters state
  const [innerSearch, setInnerSearch] = useState('');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number>(600);
  const [minRating, setMinRating] = useState<number | null>(null);
  const [sortOption, setSortOption] = useState<string>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Derive unique brands
  const allBrands = useMemo(() => {
    const brandsSet = new Set(products.map(p => p.brand));
    return Array.from(brandsSet);
  }, [products]);

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const handleResetFilters = () => {
    setInnerSearch('');
    setCategoryFilter('All');
    setSelectedBrands([]);
    setPriceRange(600);
    setMinRating(null);
    setSortOption('featured');
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (categoryFilter !== 'All') {
      result = result.filter(p => p.category === categoryFilter);
    }

    // Live search match
    if (innerSearch.trim() !== '') {
      const q = innerSearch.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) || 
        p.brand.toLowerCase().includes(q)
      );
    }

    // Brand filter
    if (selectedBrands.length > 0) {
      result = result.filter(p => selectedBrands.includes(p.brand));
    }

    // Price Max Slider filter
    result = result.filter(p => p.price <= priceRange);

    // Rating filter
    if (minRating !== null) {
      result = result.filter(p => p.rating >= minRating);
    }

    // Sorting
    if (sortOption === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'rated') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === 'newest') {
      // Simulate by grouping isNewArrival first
      result.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
    } else {
      // Featured: isFeatured first
      result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return result;
  }, [products, categoryFilter, innerSearch, selectedBrands, priceRange, minRating, sortOption]);

  const ratingOptions = [4.5, 4.0, 3.5];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 select-none">
      
      {/* Title block */}
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-3xl font-black font-display tracking-tight text-slate-900">Trends Shopping Directory</h1>
        <p className="text-sm text-slate-500 mt-1">
          Explore {filteredProducts.length} premium results crafted for modern trends.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* SIDEBAR FILTERS (Desktop) */}
        <aside className="hidden lg:block lg:col-span-3 space-y-8 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          
          <div className="flex justify-between items-center pb-4 border-b border-slate-100">
            <span className="text-base font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
              <SlidersHorizontal size={16} className="text-blue-600" />
              <span>Filters</span>
            </span>
            <button 
              onClick={handleResetFilters}
              className="text-xs font-semibold text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
            >
              Reset All
            </button>
          </div>

          {/* Search box nested */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Keyword Search</h4>
            <div className="relative">
              <input
                type="text"
                placeholder="Product name, spec..."
                value={innerSearch}
                onChange={(e) => setInnerSearch(e.target.value)}
                className="w-full bg-slate-50 text-slate-900 pl-9 pr-3 py-2 rounded-xl text-xs border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 text-slate-400" size={13} />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Categories</h4>
            <div className="space-y-1.5">
              <button
                onClick={() => setCategoryFilter('All')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  categoryFilter === 'All'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-650 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                All Departments
              </button>
              {Object.values(Category).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    categoryFilter === cat
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-650 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Max Price</h4>
              <span className="text-xs font-black text-blue-650 font-mono">${priceRange}</span>
            </div>
            <input
              type="range"
              min="20"
              max="600"
              step="10"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-none"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold font-mono mt-1">
              <span>$20</span>
              <span>$600</span>
            </div>
          </div>

          {/* Brand Filter */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Brands</h4>
            <div className="space-y-2 max-h-44 overflow-y-auto pr-2">
              {allBrands.map((brand) => (
                <label key={brand} className="flex items-center gap-2 cursor-pointer group text-xs text-slate-650 hover:text-slate-900">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandToggle(brand)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer h-3.5 w-3.5"
                  />
                  <span className="font-medium group-hover:underline">{brand}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Rating filter */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Minimum Rating</h4>
            <div className="space-y-2">
              {ratingOptions.map((rating) => (
                <button
                  key={rating}
                  onClick={() => setMinRating(minRating === rating ? null : rating)}
                  className={`w-full flex items-center justify-between p-2 rounded-xl text-left text-xs font-semibold border transition-all ${
                    minRating === rating
                      ? 'bg-amber-50 border-amber-300 text-amber-900 shadow-sm'
                      : 'bg-white border-slate-150 text-slate-650 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-1">
                     <span className="font-bold">{rating}</span>
                     <div className="flex text-amber-500">
                       <Star size={12} className="fill-amber-400" />
                     </div>
                     <span className="text-slate-400">&amp; up</span>
                  </div>
                  {minRating === rating && <X size={12} className="text-amber-600" />}
                </button>
              ))}
            </div>
          </div>

        </aside>

        {/* PROD LISTINGS MAIN (LG:9 Cols) */}
        <main className="col-span-1 lg:col-span-9 space-y-6">
          
          {/* Controls Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-xs">
            {/* Filter tags & buttons for Mobile */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-extrabold cursor-pointer hover:bg-slate-800"
              >
                <SlidersHorizontal size={14} />
                <span>Filters &amp; Search</span>
              </button>
              
              <div className="text-xs text-slate-500 font-medium">
                Showing <span className="font-extrabold text-slate-905">{filteredProducts.length}</span> of {products.length} Items
              </div>
            </div>

            {/* Sorting trigger */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <span className="text-xs text-slate-400 font-semibold shrink-0">Sort By:</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-800 font-bold text-xs py-2 px-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="featured">Featured Picks</option>
                <option value="newest">New Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rated">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Active chips row */}
          { (categoryFilter !== 'All' || selectedBrands.length > 0 || minRating !== null || innerSearch !== '') && (
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">Active Filters:</span>
              
              {categoryFilter !== 'All' && (
                <span className="bg-blue-55 border border-blue-100 text-blue-820 text-xs px-3 py-1 rounded-full flex items-center gap-1.5 font-semibold">
                  <span>{categoryFilter}</span>
                  <X size={11} className="cursor-pointer" onClick={() => setCategoryFilter('All')} />
                </span>
              )}

              {innerSearch !== '' && (
                <span className="bg-blue-55 border border-blue-100 text-blue-820 text-xs px-3 py-1 rounded-full flex items-center gap-1.5 font-semibold">
                  <span>Search: "{innerSearch}"</span>
                  <X size={11} className="cursor-pointer" onClick={() => setInnerSearch('')} />
                </span>
              )}

              {selectedBrands.map(b => (
                <span key={b} className="bg-slate-100 border border-slate-200 text-slate-700 text-xs px-3 py-1 rounded-full flex items-center gap-1.5 font-semibold">
                  <span>{b}</span>
                  <X size={11} className="cursor-pointer" onClick={() => handleBrandToggle(b)} />
                </span>
              ))}

              {minRating !== null && (
                <span className="bg-amber-50 border border-amber-200 text-amber-800 text-xs px-3 py-1 rounded-full flex items-center gap-1.5 font-semibold">
                  <span>{minRating}+ Stars</span>
                  <X size={11} className="cursor-pointer" onClick={() => setMinRating(null)} />
                </span>
              )}

              <button 
                onClick={handleResetFilters}
                className="text-[10px] font-bold text-blue-600 hover:underline px-2"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {filteredProducts.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  onSelectProduct={onSelectProduct}
                  isWishlisted={isWishlisted(prod)}
                  onToggleWishlist={onToggleWishlist}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-100 text-center py-20 px-6 max-w-xl mx-auto shadow-xs">
              <div className="text-slate-300 mb-4 text-5xl">🔍</div>
              <h3 className="font-display text-lg font-black text-slate-900 tracking-tight">No Matching Trends Found</h3>
              <p className="text-sm text-slate-400 mt-2 max-w-sm mx-auto">
                No items in our inventory matched your search terms. Try adjusting the price threshold, clear filters, or modify keywords.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-6 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
              >
                Reset All Filter Scales
              </button>
            </div>
          )}

        </main>

      </div>

      {/* MOBILE FULL DRAWER FILTERS */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" onClick={() => setIsMobileFilterOpen(false)} />
          
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-xs bg-white h-full shadow-2xl flex flex-col overflow-y-auto p-6 space-y-6">
              
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <span className="text-base font-extrabold text-slate-950 font-display">Filter Catalog</span>
                <button onClick={() => setIsMobileFilterOpen(false)} className="text-slate-400 hover:text-slate-700">
                  <X size={20} />
                </button>
              </div>

              {/* Keyword on mobile */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Search Input</h4>
                <input
                  type="text"
                  placeholder="Keyword search..."
                  value={innerSearch}
                  onChange={(e) => setInnerSearch(e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 px-4 py-2 rounded-xl text-xs border border-slate-200"
                />
              </div>

              {/* Categories mobile */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Categories</h4>
                <div className="space-y-1">
                  <button
                    onClick={() => { setCategoryFilter('All'); }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold ${categoryFilter === 'All' ? 'bg-blue-600 text-white' : 'text-slate-650 bg-slate-50'}`}
                  >
                    All Categories
                  </button>
                  {Object.values(Category).map(cat => (
                    <button
                      key={cat}
                      onClick={() => { setCategoryFilter(cat); }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold ${categoryFilter === cat ? 'bg-blue-600 text-white' : 'text-slate-650 bg-slate-50'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price mobile */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Max Price</h4>
                  <span className="text-xs font-bold text-blue-600">${priceRange}</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="600"
                  step="10"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>

              {/* Brands mobile */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Brands</h4>
                <div className="grid grid-cols-2 gap-2 max-h-36 overflow-y-auto">
                  {allBrands.map(b => (
                    <label key={b} className="flex items-center gap-1.5 text-xs text-slate-600">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(b)}
                        onChange={() => handleBrandToggle(b)}
                        className="rounded accent-blue-600"
                      />
                      <span className="truncate">{b}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-150 flex gap-3">
                <button
                  onClick={handleResetFilters}
                  className="flex-1 py-2.5 bg-slate-105 text-slate-700 hover:bg-slate-200 border border-slate-200 font-bold text-xs rounded-xl"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl"
                >
                  Show Results
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
