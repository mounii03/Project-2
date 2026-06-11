/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, CreditCard, Lock, Sparkles, Check, Truck, ClipboardList } from 'lucide-react';
import { CartItem, Coupon } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface CheckoutViewProps {
  cartItems: CartItem[];
  appliedCoupon: Coupon | null;
  onClearCart: () => void;
  setActiveTab: (tab: string) => void;
}

export default function CheckoutView({
  cartItems,
  appliedCoupon,
  onClearCart,
  setActiveTab
}: CheckoutViewProps) {
  // Step tracker: 1 = Shipping Form, 2 = Loading animation, 3 = Confirmation Receipt Invoice Custom view
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Address logs
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [city, setCity] = useState('');
  const [regionState, setRegionState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [phone, setPhone] = useState('');

  // Payment logs
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  // Computed totals
  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
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
  const [finalInvoiceId] = useState(() => `TRD-${Math.floor(100000 + Math.random() * 900000)}`);
  const [finalReceiptItems] = useState<CartItem[]>([...cartItems]);

  const handlePurchaseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !addressLine1 || !city || !zipCode || !cardNumber || !cvv) return;

    // Trigger secure mock payment loading
    setStep(2);

    setTimeout(() => {
      setStep(3);
      onClearCart(); // Clears main cart for state completeness after order completes!
    }, 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 select-none">
      
      {/* 1. SHIPPING & MOCK CREDIT CARDS ENTRY STEP */}
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
          >
            <div className="text-center sm:text-left">
              <h1 className="text-3xl font-black font-display tracking-tight text-slate-905">Secure Checkout point</h1>
              <p className="text-sm text-slate-500 mt-1">Complete details underneath to transmit secure checkout credentials.</p>
            </div>

            {cartItems.length > 0 ? (
              <form onSubmit={handlePurchaseSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Forms grid Left: Shipping & Payments (col:8) */}
                <div className="lg:col-span-8 space-y-6">
                  
                  {/* Shipping Address Container block */}
                  <div className="bg-white p-6 sm:p-8 rounded-[32px] border border-slate-105 shadow-sm space-y-5">
                    <h2 className="text-lg font-black text-slate-905 tracking-tight font-display flex items-center gap-2">
                      <Truck className="text-blue-600" size={18} />
                      <span>1. Logistics Shipping Destination Detail</span>
                    </h2>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-450 uppercase mb-1.5">Recipient Full Name</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Emily Watson"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-xs sm:text-sm text-slate-805"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-450 uppercase mb-1.5">Email Address</label>
                          <input
                            type="email"
                            required
                            placeholder="emily@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-xs sm:text-sm text-slate-805"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-450 uppercase mb-1.5">Telephone Connection</label>
                          <input
                            type="tel"
                            required
                            placeholder="+1 (555) 019-2834"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-xs sm:text-sm text-slate-805"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-450 uppercase mb-1.5">Street Address Line 1</label>
                        <input
                          type="text"
                          required
                          placeholder="745 5th Ave, Apartment 14B"
                          value={addressLine1}
                          onChange={(e) => setAddressLine1(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-xs sm:text-sm text-slate-805"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-450 uppercase mb-1.5">City</label>
                          <input
                            type="text"
                            required
                            placeholder="Manhattan"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-xs sm:text-sm text-slate-805"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-455 uppercase mb-1.5">State / Region</label>
                          <input
                            type="text"
                            required
                            placeholder="NY"
                            value={regionState}
                            onChange={(e) => setRegionState(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-xs sm:text-sm text-slate-805"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-450 uppercase mb-1.5">Zip / Postal Code</label>
                          <input
                            type="text"
                            required
                            placeholder="10151"
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-xs sm:text-sm text-slate-805"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Details block */}
                  <div className="bg-white p-6 sm:p-8 rounded-[32px] border border-slate-105 shadow-sm space-y-5">
                    <h2 className="text-lg font-black text-slate-905 tracking-tight font-display flex items-center gap-2">
                      <CreditCard className="text-blue-600" size={18} />
                      <span>2. Mock Secure PCI Payment Processing</span>
                    </h2>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-450 uppercase mb-1.5">Cardholder Name</label>
                        <input
                          type="text"
                          required
                          placeholder="Emily Watson"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-xs sm:text-sm text-slate-805"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-450 uppercase mb-1.5">Debit / Credit Card Number</label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            placeholder="4111 2222 3333 4444"
                            maxLength={19}
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 pl-10 pr-4 py-3 rounded-xl text-xs sm:text-sm text-slate-805 font-mono"
                          />
                          <Lock className="absolute left-3.5 top-3.5 text-slate-400" size={14} />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-450 uppercase mb-1.5">Expiration Date</label>
                          <input
                            type="text"
                            required
                            placeholder="MM/YY"
                            maxLength={5}
                            value={expiry}
                            onChange={(e) => setExpiry(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-xs sm:text-sm text-slate-805 font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-450 uppercase mb-1.5">CVV Security Code</label>
                          <input
                            type="password"
                            required
                            placeholder="***"
                            maxLength={3}
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-xs sm:text-sm text-slate-805 font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Items & Pricing Review block right: (col:4) */}
                <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-105 shadow-sm space-y-6">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest pb-2 border-b border-slate-100">Order Items Review</h3>
                  
                  {/* Line items mini scroll list */}
                  <div className="space-y-4 max-h-64 overflow-y-auto pr-2 divide-y divide-slate-50">
                    {cartItems.map((item, idx) => (
                      <div key={idx} className="flex gap-3 py-2 items-center">
                        <img src={item.product.images[0]} className="w-10 h-10 object-cover rounded-lg border border-slate-105 shrink-0" />
                        <div className="flex-1 min-w-0 text-xs">
                          <p className="font-bold text-slate-900 truncate">{item.product.title}</p>
                          <p className="text-slate-400 font-medium">Qty: {item.quantity} {item.selectedColor && `| ${item.selectedColor}`}</p>
                        </div>
                        <span className="text-xs font-bold text-slate-900 font-mono">${(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Sums breakdown */}
                  <div className="border-t border-slate-150 pt-4 space-y-2 text-xs">
                    <div className="flex justify-between text-slate-500">
                      <span>Subtotal Sum</span>
                      <span className="font-mono font-bold">${subtotal.toFixed(2)}</span>
                    </div>
                    {discountVal > 0 && (
                      <div className="flex justify-between text-emerald-600 font-semibold bg-emerald-50 px-2 py-1.5 rounded-lg border border-emerald-100">
                        <span>Voucher Discount</span>
                        <span className="font-mono font-bold">-${discountVal.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-slate-500">
                      <span>Shipping Logistics</span>
                      {shippingCharge === 0 ? <span className="font-extrabold text-emerald-600 uppercase font-mono">FREE Express</span> : <span className="font-mono font-bold">${shippingCharge.toFixed(2)}</span>}
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex justify-between text-slate-950 font-black text-sm">
                      <span>Overall Total</span>
                      <span className="font-mono text-base text-blue-600">${overallTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* SSL and Confirm checkout button */}
                  <div className="bg-slate-50 border border-slate-100 p-4 rounded-[18px] text-[10px] text-slate-450 leading-relaxed font-semibold">
                    <p className="flex items-center gap-1.5 mb-1.5">🛡️ <span className="text-slate-800 font-extrabold">SSL Certified Secure Channels</span></p>
                    <p>By executing purchase, you authorize trends to process mock transaction tokens. Return label included.</p>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-blue-650 hover:bg-blue-600 text-white font-black text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    <span>Authorize Secure Purchase</span>
                    <ArrowRight size={13} />
                  </button>
                </div>

              </form>
            ) : (
              <div className="bg-white rounded-3xl p-16 text-center border border-slate-100 max-w-md mx-auto">
                <p className="text-sm font-bold text-slate-500">No active checkout sessions. Prepare a cart first!</p>
                <button onClick={() => setActiveTab('catalog')} className="mt-4 px-6 py-2.5 bg-blue-600 text-xs font-bold text-white rounded-xl">Go To Catalog</button>
              </div>
            )}
          </motion.div>
        )}

        {/* 2. TRANSCRIBING TRANSACTION LOADING SCREEN */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-20 bg-white max-w-xl mx-auto rounded-3xl border border-slate-100 shadow-sm"
          >
            {/* Spinning load visual */}
            <div className="w-16 h-16 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mb-6" />
            <div className="text-center space-y-2">
              <h2 className="text-xl font-black text-slate-905 tracking-tight font-display">Computing Secure Transaction</h2>
              <p className="text-xs text-slate-400 max-w-xs mx-auto px-4">
                Enforcing standard SSL protocols and PCI clearance safeguards. Do not exit checkout window...
              </p>
            </div>
          </motion.div>
        )}

        {/* 3. FINAL INVOICE CONFIRMATION RECEIPT */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white max-w-2xl mx-auto rounded-[36px] border border-slate-105 shadow-2xl p-6 sm:p-10 text-center space-y-8"
          >
            {/* Success Shield icon banner */}
            <div className="flex flex-col items-center space-y-3">
              <div className="h-16 w-16 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full flex items-center justify-center shadow-md animate-bounce">
                <Check size={28} className="stroke-[3]" />
              </div>
              <span className="text-[10px] font-bold tracking-widest text-emerald-550 uppercase font-mono">ORDER AUTHORIZED SUCCESSFULLY</span>
              <h1 className="text-2xl sm:text-3xl font-black font-display text-slate-905 tracking-tight">Trends Invoice Confirmation</h1>
              <p className="text-xs sm:text-sm text-slate-450 max-w-md">
                Your payment was checked. A confirmation email with direct live logistics tracking charts has been dispatched to <span className="font-extrabold text-slate-800">{email}</span>.
              </p>
            </div>

            {/* Structured Invoice Summary Box */}
            <div className="bg-slate-50 rounded-3xl p-5 border border-slate-105 text-left grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm">
              <div className="space-y-4">
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Invoice Number</h4>
                  <p className="font-mono font-black text-slate-900 mt-0.5">{finalInvoiceId}</p>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Recipient Name</h4>
                  <p className="font-extrabold text-slate-900 mt-0.5">{fullName}</p>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Logistics Address</h4>
                  <p className="text-slate-600 mt-0.5">{addressLine1}</p>
                  <p className="text-slate-600">{city}, {regionState} {zipCode}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Timestamp Cleared</h4>
                  <p className="font-mono font-bold text-slate-900 mt-0.5">{new Date().toDateString()}</p>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Payment Token</h4>
                  <p className="font-mono text-slate-600 mt-0.5">VISA ending in **** {cardNumber.slice(-4) || '4444'}</p>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Amount Debited</h4>
                  <p className="font-mono font-black text-blue-650 text-base mt-0.5">${overallTotal.toFixed(2)}</p>
                </div>
              </div>
            </div>

            {/* Line items purchased review */}
            <div className="border-t border-slate-100 pt-6 text-left space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Purchased Products Recap:</h3>
              <div className="divide-y divide-slate-105">
                {finalReceiptItems.map((itm, index) => (
                  <div key={index} className="flex justify-between py-2 text-xs">
                    <span className="text-slate-700 font-medium truncate max-w-xs">{itm.product.title} (x{itm.quantity})</span>
                    <span className="font-mono font-bold text-slate-900">${(itm.product.price * itm.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* In-app Navigation back guidelines */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => setActiveTab('catalog')}
                className="w-full sm:w-auto px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl transition-all cursor-pointer"
              >
                Continue Discovering Trends
              </button>
              <button
                onClick={() => setActiveTab('home')}
                className="w-full sm:w-auto px-6 py-3 bg-blue-50 hover:bg-blue-105 text-blue-600 border border-blue-100 font-extrabold text-xs rounded-xl transition-all cursor-pointer"
              >
                Back To Main Home
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
