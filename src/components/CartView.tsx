/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShoppingBag, ArrowRight, Trash, Tag, Plus, Minus, Check, X, Shield, Lock } from 'lucide-react';
import { CartItem, Coupon } from '../types';
import { VALID_COUPONS } from '../data';
import { motion } from 'motion/react';

interface CartViewProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number, color?: string, size?: string) => void;
  onRemoveItem: (productId: string, color?: string, size?: string) => void;
  appliedCoupon: Coupon | null;
  onApplyCoupon: (coupon: Coupon | null) => void;
  setActiveTab: (tab: string) => void;
}

export default function CartView({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  appliedCoupon,
  onApplyCoupon,
  setActiveTab
}: CartViewProps) {
  const [couponText, setCouponText] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponSuccess, setCouponSuccess] = useState(false);

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  };

  const handleApplyCouponCode = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    setCouponSuccess(false);

    if (couponText.trim() === '') return;

    const subtotal = calculateSubtotal();
    const foundCoupon = VALID_COUPONS.find(c => c.code.toUpperCase() === couponText.trim().toUpperCase());

    if (!foundCoupon) {
      setCouponError('This voucher code is invalid or has expired.');
      onApplyCoupon(null);
      return;
    }

    if (foundCoupon.minSpend && subtotal < foundCoupon.minSpend) {
      setCouponError(`This voucher requires a minimum spend of $${foundCoupon.minSpend}.`);
      onApplyCoupon(null);
      return;
    }

    onApplyCoupon(foundCoupon);
    setCouponSuccess(true);
    setCouponText('');
  };

  const handleRemoveCoupon = () => {
    onApplyCoupon(null);
    setCouponSuccess(false);
  };

  const subtotal = calculateSubtotal();
  const shippingCharge = subtotal > 100 || subtotal === 0 ? 0 : 9.99;
  
  let discountVal = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percentage') {
      discountVal = (subtotal * appliedCoupon.value) / 100;
    } else {
      discountVal = appliedCoupon.value;
    }
  }

  const overallTotal = subtotal - discountVal + shippingCharge;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 select-none">
      <h1 className="text-3xl font-black font-display tracking-tight text-slate-905 mb-8 text-center sm:text-left">Your Shopping Cart</h1>

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main items grid left: (col:8) */}
          <div className="lg:col-span-8 space-y-4">
            {cartItems.map((item, idx) => (
              <div
                key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}-${idx}`}
                className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-105 shadow-xs flex flex-col sm:flex-row gap-4 items-center justify-between"
              >
                {/* Media card summary */}
                <div className="flex gap-4 items-center w-full sm:w-auto">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-2xl bg-slate-50 border border-slate-100 shrink-0"
                  />
                  <div className="space-y-1">
                    <span className="text-[9px] uppercase tracking-wider font-mono font-bold text-slate-400">{item.product.category}</span>
                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900 leading-tight">{item.product.title}</h3>
                    
                    {/* Selected specifics tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.selectedColor && (
                        <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-lg text-[10px] font-bold">
                          Tone: {item.selectedColor}
                        </span>
                      )}
                      {item.selectedSize && (
                        <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-lg text-[10px] font-bold">
                          Size: {item.selectedSize}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Pricing and active state modulators */}
                <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-10 w-full sm:w-auto mt-2 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  
                  {/* Quantity incrementor */}
                  <div className="flex items-center bg-slate-50 border border-slate-205 rounded-xl p-1 shrink-0">
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1, item.selectedColor, item.selectedSize)}
                      className="p-1.5 hover:bg-white text-slate-700 rounded-lg"
                      title="decrease item quantity"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="px-3 text-xs font-black text-slate-900 font-mono">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1, item.selectedColor, item.selectedSize)}
                      className="p-1.5 hover:bg-white text-slate-705 rounded-lg"
                      title="increase item quantity"
                    >
                      <Plus size={12} />
                    </button>
                  </div>

                  {/* Calculations */}
                  <div className="text-right min-w-[80px] font-mono">
                    <p className="text-sm font-black text-slate-900">${(item.product.price * item.quantity).toFixed(2)}</p>
                    <p className="text-[10px] text-slate-450">${item.product.price.toFixed(2)} each</p>
                  </div>

                  {/* Trash drop */}
                  <button
                    onClick={() => onRemoveItem(item.product.id, item.selectedColor, item.selectedSize)}
                    className="p-2 sm:p-2.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all cursor-pointer shrink-0"
                    title="Remove item"
                  >
                    <Trash size={15} />
                  </button>

                </div>

              </div>
            ))}
          </div>

          {/* Pricing Summary Right: (col:4) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Vouchers Panel */}
            <div className="bg-white p-6 rounded-3xl border border-slate-105 shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Apply Promo Code</h3>
              
              {!appliedCoupon ? (
                <form onSubmit={handleApplyCouponCode} className="space-y-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. WELCOME20"
                      value={couponText}
                      onChange={(e) => setCouponText(e.target.value)}
                      className="w-full bg-slate-50 text-slate-900 placeholder-slate-400 pl-4 pr-16 py-3 rounded-xl text-xs sm:text-sm border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 uppercase tracking-wider font-semibold font-mono"
                    />
                    <button
                      type="submit"
                      className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-slate-900 hover:bg-blue-600 text-white font-extrabold text-xs rounded-lg transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>

                  {couponError && (
                    <p className="text-[10px] sm:text-xs text-rose-600 font-medium">
                      ⚠️ {couponError}
                    </p>
                  )}
                </form>
              ) : (
                <div className="bg-emerald-50 border border-emerald-150 p-4 rounded-2xl flex items-start gap-2.5 justify-between">
                  <div className="flex gap-2">
                    <div className="p-1.5 bg-emerald-500 text-white rounded-lg shrink-0">
                      <Tag size={14} />
                    </div>
                    <div>
                      <span className="text-xs font-black text-emerald-950 block">{appliedCoupon.code} Active</span>
                      <span className="text-[10px] text-emerald-700 font-medium">{appliedCoupon.description}</span>
                    </div>
                  </div>
                  <button
                    onClick={handleRemoveCoupon}
                    className="p-1 text-emerald-800 hover:bg-emerald-100 rounded-lg shrink-0 cursor-pointer"
                    title="clear voucher"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}

              {couponSuccess && !couponError && (
                <p className="text-[10px] sm:text-xs text-emerald-750 font-bold flex items-center gap-1">
                  🟢 Code applied successfully! Discount values deducted in column totals.
                </p>
              )}
            </div>

            {/* Price Calculations ticket */}
            <div className="bg-white p-6 rounded-3xl border border-slate-105 shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest pb-2 border-b border-slate-100">Order Estimator Breakdown</h3>
              
              <div className="space-y-2.5 text-xs sm:text-sm text-slate-650">
                <div className="flex justify-between">
                  <span>Cart Items Subtotal</span>
                  <span className="font-mono font-bold text-slate-900">${subtotal.toFixed(2)}</span>
                </div>

                {discountVal > 0 && (
                  <div className="flex justify-between text-emerald-650 font-semibold bg-emerald-50/50 px-2 py-1.5 rounded-lg border border-emerald-100">
                    <span>Voucher Saved Discount</span>
                    <span className="font-mono font-extrabold">-${discountVal.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Logistics Transport Shipping</span>
                  {shippingCharge === 0 ? (
                    <span className="text-emerald-500 font-extrabold font-mono">FREE Express</span>
                  ) : (
                    <span className="font-mono font-bold text-slate-900">${shippingCharge.toFixed(2)}</span>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-150 flex justify-between text-slate-950 font-black text-base sm:text-lg">
                  <span>Total Due</span>
                  <span className="font-mono text-blue-650">${overallTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Secure statement */}
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1.5 text-[10px] text-slate-400 font-semibold">
                <p className="flex items-center gap-2">🛡️ PCI-DSS SSL encryption certified protect keys.</p>
                <p className="flex items-center gap-2">⚡ Multi-point delivery networks. Tracking link dispatched.</p>
              </div>

              {/* Checkout CTA direct */}
              <button
                onClick={() => setActiveTab('checkout')}
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white text-sm font-black rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer mt-4"
              >
                <span>Proceed To Secure Checkout</span>
                <ArrowRight size={16} />
              </button>
            </div>

          </div>

        </div>
      ) : (
        <div className="bg-white rounded-[40px] border border-slate-100 text-center py-20 px-4 max-w-xl mx-auto shadow-sm">
          <div className="text-slate-300 text-6xl mb-4">🛒</div>
          <h3 className="font-display text-lg sm:text-xl font-black text-slate-900">Your Trends Bag Is Currently Empty</h3>
          <p className="text-sm text-slate-400 max-w-sm mx-auto mt-2 leading-relaxed">
            Discover cutting-edge audio, tailored coats, polarized acetate Sunglasses, and ceramic soy candles in our curated shop catalog.
          </p>
          <button
            onClick={() => { setActiveTab('catalog'); }}
            className="mt-8 px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm rounded-xl transition-all cursor-pointer shadow-md"
          >
            Start Discovering Trends
          </button>
        </div>
      )}

    </div>
  );
}
