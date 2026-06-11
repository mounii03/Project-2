/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Tag, Copy, Check, Timer, Percent, Sparkles, ArrowRight } from 'lucide-react';
import { Product, Coupon } from '../types';
import { VALID_COUPONS } from '../data';
import { motion } from 'motion/react';

interface OffersViewProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  isWishlisted: (product: Product) => boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number, color?: string, size?: string) => void;
  setActiveTab: (tab: string) => void;
}

export default function OffersView({
  products,
  onSelectProduct,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  setActiveTab
}: OffersViewProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Filter items with discounts
  const discountedProducts = products.filter(p => p.discountPercent && p.discountPercent > 0);

  // Flash ticker countdown
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 19,
    seconds: 48
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2500);
    }).catch(() => {
      // Graceful fallback for environments blocking navigator clipboards
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2500);
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 select-none space-y-12">
      
      {/* Visual Title Header banner */}
      <section className="bg-gradient-to-tr from-rose-900 via-slate-900 to-indigo-900 text-white rounded-[32px] overflow-hidden p-8 sm:p-12 border border-rose-950/40 relative shadow-xl">
        <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-slate-950 opacity-20" />
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-rose-500/20 text-rose-300 border border-rose-500/30 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
            <Sparkles size={12} className="animate-pulse" />
            <span>Seasonal Clearance Blast</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white leading-tight">
            Summer Mid-Year Drop: Save Up to <span className="text-amber-400">30% Off</span> Store-Wide!
          </h1>
          <p className="text-sm sm:text-base text-slate-350 leading-relaxed">
            Take advantage of exclusive markdowns and stackable voucher coupons. No gimmicks, just premium electronics, fashion staples, and lifestyle vessels at zero logistics costs.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <div className="flex items-center gap-2 bg-slate-900/60 backdrop-blur-md px-4 py-2.5 rounded-xl border border-slate-750 text-xs font-mono font-bold text-amber-200">
              <span className="text-slate-400">USE STACKABLE VOUCHER VECTORS</span>
            </div>
          </div>
        </div>
      </section>

      {/* Holographic Countdown panel */}
      <section className="bg-amber-50 rounded-3xl border border-amber-200 p-6 flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-500 text-slate-950 rounded-2xl animate-pulse shadow-sm">
            <Timer size={24} />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight font-display">Flash Deal Clock Is Ticking!</h3>
            <p className="text-xs text-slate-500">Unbeatable drops reset when the timer below expires. Complete checkout processes to lock rates.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-xl sm:text-2xl font-black text-slate-950 bg-slate-900 text-white px-5 py-3 rounded-2xl border border-slate-800 shadow-inner">
          <span className="text-amber-400">{String(timeLeft.hours).padStart(2, '0')}h</span>
          <span className="text-slate-500">:</span>
          <span className="text-amber-400">{String(timeLeft.minutes).padStart(2, '0')}m</span>
          <span className="text-slate-500">:</span>
          <span className="text-amber-400 animate-pulse">{String(timeLeft.seconds).padStart(2, '0')}s</span>
        </div>
      </section>

      {/* STACKABLE COUPON CODES SECTION */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-black text-slate-902 tracking-tight font-display text-center sm:text-left">
          Available Active Promo Coupons
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VALID_COUPONS.map((coupon, idx) => {
            const isCopied = copiedCode === coupon.code;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-slate-105 p-6 flex flex-col justify-between hover:border-blue-150 hover:shadow-lg transition-all duration-305 relative overflow-hidden"
              >
                {/* Decorative border cutouts representing true tickets */}
                <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-slate-50 rounded-full border border-slate-105" />
                <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-slate-50 rounded-full border border-slate-105" />

                <div className="space-y-4 pb-6 border-b border-dashed border-slate-150">
                  <div className="flex items-center justify-between">
                    <div className="bg-blue-50 text-blue-600 p-2.5 rounded-xl border border-blue-100">
                      <Tag size={18} />
                    </div>
                    {coupon.minSpend && coupon.minSpend > 0 ? (
                      <span className="text-[10px] bg-slate-100 text-slate-505 font-black uppercase tracking-wider px-2.5 py-1 rounded-full border border-slate-150">
                        Min. Spend ${coupon.minSpend}
                      </span>
                    ) : (
                      <span className="text-[10px] bg-emerald-50 text-emerald-800 font-black uppercase tracking-wider px-2.5 py-1 rounded-full border border-emerald-150">
                        No Min. Spend
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-slate-905">{coupon.code}</h3>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">{coupon.description}</p>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between gap-4 mt-auto">
                  <span className="text-xs font-semibold text-slate-400">Copy code to keyboard:</span>
                  <button
                    onClick={() => handleCopyCode(coupon.code)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                      isCopied
                        ? 'bg-emerald-500 text-white shadow-sm'
                        : 'bg-slate-900 hover:bg-blue-600 text-white'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check size={13} />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={13} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SPECIAL MARKDOWN HIGHLIGHTS GRID */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-end gap-2 text-center sm:text-left">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-display">Special Clearance Catalog</h2>
            <p className="text-sm text-slate-500 mt-1">Directly explore all items heavily marked down on clearance sale scales.</p>
          </div>
          <button
            onClick={() => setActiveTab('catalog')}
            className="text-blue-600 hover:text-blue-500 text-sm font-bold flex items-center gap-1"
          >
            <span>See full list</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {discountedProducts.map((prod) => (
            <div
              key={prod.id}
              onClick={() => onSelectProduct(prod)}
              className="bg-white rounded-3xl border border-slate-100 hover:border-slate-205 transition-all duration-300 p-4 relative cursor-pointer group flex flex-col justify-between"
            >
              <div className="relative aspect-square rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden mb-4">
                <img src={prod.images[0]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-3 left-3 bg-rose-600 text-white font-mono font-black text-xs py-1 px-3 rounded-full shadow-md">
                  -{prod.discountPercent}% Off!
                </span>
                <span className="absolute top-3 right-3 bg-slate-950/40 backdrop-blur-md text-white text-[9px] font-sans font-bold py-0.5 px-2 rounded-md">
                  {prod.brand}
                </span>
              </div>

              <div>
                <span className="text-[9px] uppercase tracking-widest font-mono text-slate-400">{prod.category}</span>
                <h3 className="font-display font-bold text-sm tracking-tight text-slate-900 truncate mt-0.5 group-hover:text-blue-600">{prod.title}</h3>
                
                <div className="flex items-baseline gap-2 mt-2 font-mono">
                  <span className="text-rose-500 text-xs line-through font-semibold">${prod.originalPrice?.toFixed(2)}</span>
                  <span className="text-slate-950 font-black text-base">${prod.price.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart(prod, 1);
                }}
                className="w-full mt-4 py-2.5 bg-slate-900 hover:bg-blue-600 cursor-pointer text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5"
              >
                <span>Add to Cart</span>
              </button>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
