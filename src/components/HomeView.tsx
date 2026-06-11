/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Star, ShoppingBag, Percent } from 'lucide-react';
import { Product, Category } from '../types';
import { CLIENT_TESTIMONIALS } from '../data';
import ProductCard from './ProductCard';
import { motion } from 'motion/react';

interface HomeViewProps {
  products: Product[];
  setActiveTab: (tab: string) => void;
  setCategoryFilter: (category: Category | 'All') => void;
  onSelectProduct: (product: Product) => void;
  isWishlisted: (product: Product) => boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number, color?: string, size?: string) => void;
}

export default function HomeView({
  products,
  setActiveTab,
  setCategoryFilter,
  onSelectProduct,
  isWishlisted,
  onToggleWishlist,
  onAddToCart
}: HomeViewProps) {
  // Live Ticking Countdown Timer for deals section
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 15
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset countdown to keep mock active indefinitely
          return { hours: 12, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Filter products for home highlights
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);
  const newArrivals = products.filter(p => p.isNewArrival).slice(0, 4);
  const flashDeals = products.filter(p => p.discountPercent && p.discountPercent > 15).slice(0, 3);

  const categories = [
    {
      id: Category.ELECTRONICS,
      title: 'Premium Electronics',
      count: '4 Products',
      bgImg: 'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?auto=format&fit=crop&q=80&w=300'
    },
    {
      id: Category.FASHION,
      title: 'Designer Fashion',
      count: '3 Products',
      bgImg: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300'
    },
    {
      id: Category.ACCESSORIES,
      title: 'Sleek Accessories',
      count: '3 Products',
      bgImg: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=300'
    },
    {
      id: Category.LIFESTYLE,
      title: 'Modern Lifestyle',
      count: '2 Products',
      bgImg: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=300'
    }
  ];

  const triggerCategory = (cat: Category) => {
    setCategoryFilter(cat);
    setActiveTab('catalog');
  };

  return (
    <div className="space-y-16 pb-16 select-none bg-slate-50/50">
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-white to-slate-100 text-slate-800 overflow-hidden rounded-b-[40px] md:rounded-b-[48px] shadow-sm py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-slate-200 to-indigo-100" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-slate-900 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-wider text-amber-300 mb-2 uppercase">
              <Sparkles size={12} className="text-amber-300" />
              <span>THE CURATED MINIMALIST PLATFORM</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-slate-900 leading-tight">
              Shop the Latest Trends in <span className="text-blue-600 block sm:inline">Electronics, Fashion & Lifestyle</span>
            </h1>
            
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Discover premium products, exclusive offers, and a seamless shopping experience. Carefully sourced items vetted for supreme quality, sustainability, and aesthetic perfection.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <button 
                onClick={() => { setCategoryFilter('All'); setActiveTab('catalog'); }}
                className="px-8 py-3.5 bg-slate-950 hover:bg-slate-800 text-white text-sm font-semibold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-sm cursor-pointer"
                id="hero-shop-now-btn"
              >
                <span>Shop Catalogue</span>
                <ArrowRight size={16} />
              </button>
              
              <button 
                onClick={() => setActiveTab('offers')}
                className="px-8 py-3.5 bg-white hover:bg-slate-50 text-slate-900 border border-slate-350 text-sm font-semibold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer"
                id="hero-view-offers-btn"
              >
                <span>View Special Offers</span>
                <Percent size={14} className="text-blue-600" />
              </button>
            </div>
          </div>

          {/* Hero Right Media Preview card */}
          <div className="lg:col-span-5 relative hidden lg:block">
            <div className="absolute inset-0 bg-blue-100 rounded-[24px] blur-3xl opacity-30 transform -rotate-6" />
            <div className="relative bg-white p-5 rounded-[24px] border border-slate-200 shadow-xl scale-98 hover:scale-100 transition-all duration-500">
              <img 
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=500" 
                alt="AeroSound Headphone" 
                className="rounded-[16px] object-cover h-60 w-full shadow-sm border border-slate-100"
              />
              <div className="mt-4 flex justify-between items-center">
                <div>
                  <span className="text-[9px] text-blue-600 font-bold uppercase tracking-wider font-mono">Trending Choice</span>
                  <h3 className="text-slate-900 text-sm font-bold truncate mt-0.5">AeroSound ANC Headphones</h3>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 line-through block font-mono">$299.99</span>
                  <span className="text-sm font-black text-slate-900 font-mono">$249.99</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Categories Bento Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center md:text-left mb-8 flex flex-col md:flex-row justify-between items-end gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Featured Categories</h2>
            <p className="text-sm text-slate-500 mt-1">Sourced with meticulous standards, styled for modern habits.</p>
          </div>
          <button 
            onClick={() => { setCategoryFilter('All'); setActiveTab('catalog'); }}
            className="text-blue-600 hover:text-blue-500 text-sm font-bold flex items-center gap-1 cursor-pointer"
          >
            <span>See entire catalogs</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => triggerCategory(cat.id)}
              className="group relative h-48 rounded-3xl overflow-hidden shadow-sm border border-slate-100 cursor-pointer"
              id={`cat-card-${cat.id}`}
            >
              <img 
                src={cat.bgImg} 
                alt={cat.title} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-4 left-5 right-5 text-white flex flex-col">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest mb-1">{cat.count}</span>
                <h3 className="text-lg font-black tracking-tight">{cat.title}</h3>
                <span className="text-xs text-slate-300 group-hover:text-white mt-1 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-1 font-semibold">
                  <span>Explore Items</span>
                  <ArrowRight size={12} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FLASH DEALS Limited countdown section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 p-8 md:p-12 rounded-2xl border border-slate-800 text-white flex flex-col xl:flex-row gap-12 items-center justify-between shadow-sm">
          
          {/* Flash Clock Left */}
          <div className="space-y-4 max-w-lg text-center xl:text-left">
            <div className="inline bg-blue-600 text-white px-3 py-1 rounded-md text-[10px] tracking-widest uppercase font-bold">
              Limited-Time Flash Deals
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight leading-tight mt-2">
              Save up to 25% + on Curated Masterpieces
            </h2>
            <p className="text-xs text-slate-400">
              These verified special price drops are strictly bound to stock volume. Grab premium items at zero mark-ups before countdown ends!
            </p>

            {/* Live Timer Visual */}
            <div className="flex gap-4 items-center justify-center xl:justify-start pt-2">
              <div className="flex flex-col items-center">
                <div className="bg-slate-950 px-4 py-3 rounded-lg border border-slate-800 min-w-[64px] text-center font-mono text-2xl font-bold text-white">
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
                <span className="text-[9px] uppercase font-bold tracking-widest text-slate-500 mt-1">Hours</span>
              </div>
              <span className="text-xl font-bold text-slate-700 animate-pulse">:</span>
              <div className="flex flex-col items-center">
                <div className="bg-slate-950 px-4 py-3 rounded-lg border border-slate-800 min-w-[64px] text-center font-mono text-2xl font-bold text-white">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
                <span className="text-[9px] uppercase font-bold tracking-widest text-slate-500 mt-1">Mins</span>
              </div>
              <span className="text-xl font-bold text-slate-700 animate-pulse">:</span>
              <div className="flex flex-col items-center">
                <div className="bg-slate-950 px-4 py-3 rounded-lg border border-slate-800 min-w-[64px] text-center font-mono text-2xl font-bold text-blue-500">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
                <span className="text-[9px] uppercase font-bold tracking-widest text-slate-500 mt-1">Secs</span>
              </div>
            </div>
          </div>

          {/* Flash items products grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full xl:max-w-2xl bg-slate-950/60 p-4 rounded-xl border border-slate-850/60">
            {flashDeals.map((prod) => (
              <div 
                key={prod.id} 
                onClick={() => onSelectProduct(prod)}
                className="bg-slate-900 rounded-lg border border-slate-800 p-3 hover:border-slate-700 transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div className="relative aspect-square overflow-hidden rounded-md mb-3">
                  <img src={prod.images[0]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <span className="absolute top-2 left-2 bg-blue-600 text-white font-mono font-semibold text-[9px] py-0.5 px-2 rounded-sm">
                    -{prod.discountPercent}%
                  </span>
                </div>
                <div>
                  <h3 className="text-white text-xs font-semibold truncate tracking-tight">{prod.title}</h3>
                  <div className="flex items-center gap-1.5 mt-1 font-mono">
                    <span className="text-slate-500 text-[10px] line-through">${prod.originalPrice?.toFixed(2)}</span>
                    <span className="text-white font-bold text-xs">${prod.price.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* BEST SELLING PRODUCTS Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-end gap-2 mb-8 text-center sm:text-left">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Best-Selling Curation</h2>
            <p className="text-sm text-slate-500 mt-1">The most purchased, highly-rated designs from the trends catalog.</p>
          </div>
          <button 
            onClick={() => { setCategoryFilter('All'); setActiveTab('catalog'); }}
            className="text-blue-500 hover:text-blue-400 text-sm font-bold flex items-center gap-1"
          >
            <span>Browse top items</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {bestSellers.map((prod) => (
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
      </section>

      {/* NEW ARRIVALS Highlight section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-end gap-2 mb-8 text-center sm:text-left">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">New Arrivals Lineup</h2>
              <p className="text-sm text-slate-500 mt-1">Freshly stocked accessories and designer coats designed for the future.</p>
            </div>
            <button 
              onClick={() => { setCategoryFilter('All'); setActiveTab('catalog'); }}
              className="text-blue-500 hover:text-blue-400 text-sm font-bold flex items-center gap-1"
            >
              <span>See new drop</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {newArrivals.map((prod) => (
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
        </div>
      </section>

      {/* TESTIMONIALS Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">What Our Customers Say</h2>
          <p className="text-sm text-slate-500 mt-1">Honest feedback detailing quality, dispatch speeds, and security.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CLIENT_TESTIMONIALS.map((test) => (
            <div
              key={test.id}
              className="bg-white p-8 rounded-3xl border border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              id={`testimonial-${test.id}`}
            >
              <div className="space-y-4">
                <div className="flex text-amber-500 gap-0.5">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-650 leading-relaxed italic">
                  "{test.comment}"
                </p>
              </div>

              <div className="flex gap-4 items-center pt-6 border-t border-slate-50 mt-6 shrink-0">
                <img
                  src={test.avatarUrl}
                  alt={test.name}
                  className="w-11 h-11 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{test.name}</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{test.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
