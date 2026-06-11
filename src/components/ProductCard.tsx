/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Heart, Star, ShoppingBag, Eye, Check } from 'lucide-react';
import { Product } from '../types';
import { motion } from 'motion/react';

interface ProductCardProps {
  key?: string | number;
  product: Product;
  onSelectProduct: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number, color?: string, size?: string) => void;
}

export default function ProductCard({
  product,
  onSelectProduct,
  isWishlisted,
  onToggleWishlist,
  onAddToCart
}: ProductCardProps) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product.inStock) return;
    
    // Select default color & size if available
    const defaultColor = product.colors && product.colors.length > 0 ? product.colors[0] : undefined;
    const defaultSize = product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined;
    
    onAddToCart(product, 1, defaultColor, defaultSize);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(product);
  };

  return (
    <div
      onClick={() => onSelectProduct(product)}
      className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-xs transition-all duration-300 group cursor-pointer relative flex flex-col justify-between h-full select-none overflow-hidden"
      id={`product-card-${product.id}`}
    >
      {/* Upper Media Block */}
      <div className="relative aspect-square overflow-hidden bg-slate-50 border-b border-slate-100">
        <img
          src={product.images[0]}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Discount Badge */}
        {product.discountPercent && product.discountPercent > 0 && (
          <div className="absolute top-3 left-3 bg-slate-900 text-white font-mono font-semibold text-[9px] py-0.5 px-1.5 rounded-sm z-10">
            <span>-{product.discountPercent}%</span>
          </div>
        )}

        {/* Brand Banner Badge */}
        <div className="absolute top-3 right-12 bg-slate-100 text-slate-800 text-[8px] font-bold tracking-widest px-2 py-0.5 rounded-sm z-10 uppercase">
          {product.brand}
        </div>

        {/* Out of stock Overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-1 w-full h-full">
            <span className="bg-slate-950 text-white text-[9px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-sm">
              Out of Stock
            </span>
          </div>
        )}

        {/* Wishlist Toggle Button */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-3 right-3 p-1.5 rounded-md border z-20 transition-all duration-200 cursor-pointer ${
            isWishlisted
              ? 'bg-rose-50 border-rose-100 text-rose-500 hover:bg-rose-100'
              : 'bg-white/90 backdrop-blur-xs border-slate-200 text-slate-600 hover:bg-white hover:text-slate-900'
          }`}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <motion.div
            animate={{ scale: isWishlisted ? [1, 1.2, 1] : 1 }}
            transition={{ duration: 0.3 }}
          >
            <Heart size={14} className={isWishlisted ? 'fill-rose-500' : ''} />
          </motion.div>
        </button>

        {/* Quick Review hover actions panel */}
        <div className="absolute bottom-2 inset-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex justify-center gap-2 z-10">
          <div className="bg-slate-950/90 backdrop-blur-xs text-white px-2.5 py-1.5 rounded-md text-[10px] font-bold shadow-xs flex items-center gap-1">
            <Star size={10} className="fill-amber-400 text-amber-400 border-none" />
            <span>{product.rating}</span>
            <span className="text-slate-400">({product.reviewsCount})</span>
          </div>
        </div>
      </div>

      {/* Description Content Block */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="mb-3">
          <span className="text-[9px] uppercase tracking-widest font-bold text-slate-400 font-mono">
            {product.category}
          </span>
          <h3 className="font-sans text-xs sm:text-sm font-semibold text-slate-900 truncate tracking-tight group-hover:text-blue-600 transition-colors mt-0.5">
            {product.title}
          </h3>
          
          {/* Mobile Rating Display (always shown) */}
          <div className="flex sm:hidden items-center gap-1 mt-1 text-slate-500 text-xs">
            <Star size={10} className="fill-amber-400 text-amber-400" />
            <span className="font-bold text-slate-800">{product.rating}</span>
            <span>({product.reviewsCount})</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 mt-auto">
          {/* Price Stack */}
          <div className="flex flex-col">
            {product.originalPrice && product.originalPrice > product.price ? (
              <div className="flex items-center gap-1.5 font-mono">
                <span className="text-xs font-medium text-slate-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
                <span className="text-sm font-bold text-slate-900">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-sm font-bold text-slate-950 font-mono">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Quick Add To Cart */}
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`p-2 sm:px-3 sm:py-2 rounded-lg font-semibold text-[11px] flex items-center justify-center gap-1 transition-all duration-150 cursor-pointer ${
              !product.inStock
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                : isAdded
                ? 'bg-emerald-500 text-white'
                : 'bg-slate-950 text-white hover:bg-slate-800'
            }`}
            title="Add To Trends Shopping Cart"
          >
            {isAdded ? (
              <>
                <Check size={12} className="animate-bounce" />
                <span className="hidden sm:inline">Added</span>
              </>
            ) : (
              <>
                <ShoppingBag size={12} />
                <span className="hidden sm:inline">Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
