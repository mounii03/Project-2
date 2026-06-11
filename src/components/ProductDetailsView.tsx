/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Star, Shield, HelpCircle, ArrowLeft, Plus, Minus, ShoppingBag, CreditCard, ChevronRight, Check } from 'lucide-react';
import { Product, Review } from '../types';
import ProductCard from './ProductCard';
import { motion } from 'motion/react';

interface ProductDetailsViewProps {
  product: Product;
  allProducts: Product[];
  onBack: () => void;
  onSelectProduct: (product: Product) => void;
  isWishlisted: (product: Product) => boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number, color?: string, size?: string) => void;
  setActiveTab: (tab: string) => void;
}

export default function ProductDetailsView({
  product,
  allProducts,
  onBack,
  onSelectProduct,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  setActiveTab
}: ProductDetailsViewProps) {
  // Gallery state
  const [activeImage, setActiveImage] = useState(product.images[0]);
  
  // Options state
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  // Review submission state
  const [reviewsList, setReviewsList] = useState<Review[]>(product.reviews);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newUserName, setNewUserName] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);

  // Sync state if product changes
  useEffect(() => {
    setActiveImage(product.images[0]);
    setSelectedColor(product.colors?.[0] || '');
    setSelectedSize(product.sizes?.[0] || '');
    setQuantity(1);
    setReviewsList(product.reviews);
  }, [product]);

  const handleQuantityChange = (type: 'inc' | 'dec') => {
    setQuantity(prev => {
      if (type === 'dec') return prev > 1 ? prev - 1 : 1;
      return prev < 10 ? prev + 1 : 10;
    });
  };

  const handleAddToCart = () => {
    if (!product.inStock) return;
    onAddToCart(product, quantity, selectedColor || undefined, selectedSize || undefined);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    if (!product.inStock) return;
    onAddToCart(product, quantity, selectedColor || undefined, selectedSize || undefined);
    setActiveTab('checkout');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() === '' || newUserName.trim() === '') return;

    const addedReview: Review = {
      id: `rev-gen-${Date.now()}`,
      userName: newUserName,
      rating: newRating,
      comment: newComment,
      date: new Date().toISOString().split('T')[0],
      avatarUrl: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120`
    };

    setReviewsList(prev => [addedReview, ...prev]);
    setNewComment('');
    setNewUserName('');
    setNewRating(5);
    setReviewSuccess(true);
    setTimeout(() => setReviewSuccess(false), 3000);
  };

  // Derive related products under the same category (excluding current)
  const relatedProducts = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 select-none">
      
      {/* Breadcrumb row */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-bold text-slate-650 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Back to products</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-400 font-bold uppercase tracking-wider">
          <span>Catalog</span>
          <ChevronRight size={12} />
          <span>{product.category}</span>
          <ChevronRight size={12} />
          <span className="text-slate-700 truncate max-w-[150px]">{product.title}</span>
        </div>
      </div>

      {/* Main product presentation columns (Image Left, Buy Options Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
        
        {/* Gallery left (col:7) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-video rounded-3xl bg-white border border-slate-100 overflow-hidden shadow-sm flex items-center justify-center">
            <img
              src={activeImage}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            {product.discountPercent && product.discountPercent > 0 && (
              <span className="absolute top-5 left-5 bg-amber-500 text-slate-950 font-black text-xs py-1 px-3.5 rounded-full shadow-md">
                -{product.discountPercent}% Off Save
              </span>
            )}
          </div>

          {/* Thumbnails list */}
          <div className="flex gap-4 overflow-x-auto py-1">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(img)}
                className={`w-20 h-16 rounded-xl border-2 shrink-0 overflow-hidden transition-all ${
                  activeImage === img ? 'border-blue-600 scale-105 shadow-sm' : 'border-slate-100 hover:border-slate-350'
                }`}
              >
                <img src={img} alt="Spec thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Configurations column (col:5) */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <span className="text-xs uppercase tracking-widest font-mono font-bold text-blue-600">
              {product.brand} • {product.category}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight leading-tight mt-1.5">
              {product.title}
            </h1>

            {/* Ratings Summary line */}
            <div className="flex items-center gap-3 mt-3">
              <div className="flex text-amber-500 items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}
                  />
                ))}
                <span className="ml-1.5 text-slate-900 font-extrabold text-sm">{product.rating}</span>
              </div>
              <span className="text-slate-300">|</span>
              <a href="#reviews" className="text-xs font-bold text-blue-650 hover:underline">
                {reviewsList.length} Verified Buyer Reviews
              </a>
            </div>
          </div>

          {/* Pricing Row */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[10px] text-slate-400 font-extrabold uppercase font-mono tracking-widest block mb-1">Trends Price</span>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-slate-950 font-mono">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-sm font-semibold text-slate-400 line-through font-mono">
                  MSRP ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            {product.inStock ? (
              <span className="text-emerald-500 text-xs font-extrabold flex items-center gap-1.5 mt-2">
                🟢 In Stock - Vetted &amp; Dispatch-Ready
              </span>
            ) : (
              <span className="text-rose-500 text-xs font-semibold flex items-center gap-1.5 mt-2">
                🔴 Temporarily Out of Stock
              </span>
            )}
          </div>

          {/* Core short Description */}
          <p className="text-sm text-slate-600 leading-relaxed">
            {product.description}
          </p>

          {/* Size or Color Configurations */}
          <div className="space-y-4">
            {/* Colors picker */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-widest mb-2">Select Color Tone: <span className="text-slate-900 font-black">{selectedColor}</span></h4>
                <div className="flex flex-wrap gap-2.5">
                  {product.colors.map(col => (
                    <button
                      key={col}
                      onClick={() => setSelectedColor(col)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                        selectedColor === col
                          ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                          : 'bg-white text-slate-750 border-slate-200 hover:border-slate-350'
                      }`}
                    >
                      {col}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes picker */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-widest mb-2">Select Size Variant: <span className="text-slate-900 font-black">{selectedSize}</span></h4>
                <div className="flex flex-wrap gap-2.5">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-11 h-11 rounded-xl text-xs font-bold border transition-all flex items-center justify-center ${
                        selectedSize === size
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                          : 'bg-white text-slate-750 border-slate-200 hover:border-slate-350'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quantity selector & Action Buttons */}
          <div className="pt-4 border-t border-slate-100 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs font-black text-slate-405 uppercase tracking-wider">Purchase Quantity</span>
              <div className="flex items-center bg-slate-50 rounded-xl p-1 border border-slate-200">
                <button
                  onClick={() => handleQuantityChange('dec')}
                  className="p-2 hover:bg-white rounded-lg transition-all text-slate-900 cursor-pointer"
                  title="decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span className="px-4 text-sm font-black text-slate-900 font-mono">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange('inc')}
                  className="p-2 hover:bg-white rounded-lg transition-all text-slate-900 cursor-pointer"
                  title="increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Main CTAs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                  !product.inStock
                    ? 'bg-slate-105 text-slate-650 cursor-not-allowed border border-slate-200'
                    : isAdded
                    ? 'bg-emerald-500 text-white shadow-lg'
                    : 'bg-slate-905 hover:bg-slate-800 text-white shadow-md hover:shadow-lg cursor-pointer'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check size={18} />
                    <span>Added To Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} />
                    <span>Add to Shopping Cart</span>
                  </>
                )}
              </button>

              <button
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="w-full py-3.5 px-6 bg-blue-650 hover:bg-blue-600 text-white font-bold text-sm rounded-2xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                <CreditCard size={18} />
                <span>Buy Now (Checkout)</span>
              </button>
            </div>
          </div>

          {/* Secure Trust indicators block */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-semibold gap-4">
            <span className="flex items-center gap-1.5">🛡️ Full Secure Checkout</span>
            <span className="flex items-center gap-1.5">🚚 Dispatch tracking link dispatched</span>
            <span className="flex items-center gap-1.5">📞 24/7 Helpline Support</span>
          </div>

        </div>

      </div>

      {/* Structured Details Tabs Block: Features, Specs */}
      <section className="mb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 pt-12 border-t border-slate-150">
        
        {/* Bullet Features Left */}
        <div className="space-y-4">
          <h2 className="text-xl font-black text-slate-900 tracking-tight font-display">Key Features & Highlights</h2>
          <ul className="space-y-3.5">
            {product.features.map((feature, idx) => (
              <li key={idx} className="flex gap-3 items-start">
                <div className="h-5 w-5 rounded-full bg-blue-50 border border-blue-105 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={11} className="stroke-[3]" />
                </div>
                <p className="text-sm text-slate-600 leading-relaxed font-sans">{feature}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Specifications Right */}
        <div className="space-y-4">
          <h2 className="text-xl font-black text-slate-900 tracking-tight font-display">Technical Specifications</h2>
          <div className="border border-slate-100 rounded-2xl overflow-hidden bg-white shadow-xs">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-slate-100">
                {Object.entries(product.specs).map(([key, val]) => (
                  <tr key={key} className="hover:bg-slate-50/50">
                    <td className="px-4 py-3 font-semibold text-slate-500 w-1/3">{key}</td>
                    <td className="px-4 py-3 text-slate-800 font-medium">{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </section>

      {/* REVIEWS LIST & SUBMISSION PANEL */}
      <section id="reviews" className="mb-16 border-t border-slate-150 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left reviews listings column: (col:7) */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight font-display">
              Customer Reviews ({reviewsList.length})
            </h2>
            
            <div className="space-y-6">
              {reviewsList.map((rev) => (
                <div key={rev.id} className="bg-white p-6 rounded-2xl border border-slate-105 shadow-xs flex gap-4">
                  <img src={rev.avatarUrl} className="w-10 h-10 rounded-full object-cover border border-slate-100 shadow-inner shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1.5">
                      <h4 className="text-sm font-bold text-slate-900">{rev.userName}</h4>
                      <span className="text-[10px] font-mono font-bold text-slate-400">{rev.date}</span>
                    </div>
                    {/* Stars row */}
                    <div className="flex text-amber-500 gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className={i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-150'} />
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-650 leading-relaxed font-sans italic">
                      "{rev.comment}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Submit Review Form: (col:5) */}
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-fit">
            <h3 className="text-lg font-black text-slate-900 tracking-tight font-display">Write a Review</h3>
            <p className="text-xs text-slate-400 mt-1 mb-5">Share your real-time styling or audio assessment experience with others.</p>
            
            {reviewSuccess && (
              <div className="mb-4 bg-emerald-50 text-emerald-800 text-xs px-4 py-2.5 rounded-xl border border-emerald-200">
                🎉 Thank you! Your verified review has been successfully indexed in details tables.
              </div>
            )}

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-xs sm:text-sm text-slate-805 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Multi-star rating picker */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Overall Rating</label>
                <div className="flex text-amber-500 gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewRating(star)}
                      className="hover:scale-110 transition-transform cursor-pointer"
                      title={`rate ${star} starts`}
                    >
                      <Star size={20} className={star <= newRating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Review Comment</label>
                <textarea
                  required
                  rows={4}
                  placeholder="What did you like or dislike?"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-xs sm:text-sm text-slate-805"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer"
              >
                Submit Review
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* RELATED CURATIONS */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-slate-150 pt-12">
          <div className="flex flex-col sm:flex-row justify-between items-end gap-1.5 mb-8 text-center sm:text-left">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-905 tracking-tight font-display">Related Curations</h2>
              <p className="text-xs sm:text-sm text-slate-405 mt-1">Other trending items in our {product.category} catalog you might appreciate.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {relatedProducts.map((prod) => (
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
      )}

    </div>
  );
}
