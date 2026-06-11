/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Search, ShoppingBag, Heart, User, Menu, X, ArrowRight, Sparkles, Tag } from 'lucide-react';
import { Product } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  wishlistCount: number;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  userEmail: string | null;
  onLogout: () => void;
}

export default function Header({
  activeTab,
  setActiveTab,
  cartCount,
  wishlistCount,
  products,
  onSelectProduct,
  userEmail,
  onLogout
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  // Close search suggestions on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchSuggestions = searchQuery.trim() === '' 
    ? [] 
    : products.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);

  const handleSuggestionClick = (product: Product) => {
    onSelectProduct(product);
    setSearchQuery('');
    setIsSearchFocused(false);
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'catalog', label: 'Shop Catalog' },
    { id: 'offers', label: 'Special Offers' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white text-slate-800 shadow-sm select-none border-b border-slate-200">
      {/* Promo banner strip */}
      <div className="bg-slate-950 text-white text-[11px] font-medium py-2 px-4 flex justify-between items-center sm:px-8">
        <div className="flex items-center gap-1.5">
          <Tag size={11} className="text-amber-400 animate-pulse shrink-0" />
          <span>Use code <span className="font-bold text-amber-300">WELCOME20</span> for 20% off curated items!</span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-[11px] text-slate-300">
          <span>⚡ Free Express Delivery over $100</span>
          <span>•</span>
          <span>🛡️ 30-Day Money-Back Warranty</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 gap-4">
          
          {/* Logo */}
          <div 
            onClick={() => { setActiveTab('home'); setIsMobileMenuOpen(false); }}
            className="flex items-center gap-2 cursor-pointer group shrink-0"
            id="header-logo"
          >
            <span className="text-[22px] font-black tracking-[0.05em] font-display text-slate-900">
              TRENDS
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-1 shrink-0">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all duration-200 cursor-pointer relative ${
                  activeTab === item.id 
                    ? 'text-slate-900 font-bold bg-slate-50' 
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50/50'
                }`}
              >
                {item.label}
                {activeTab === item.id && (
                  <motion.div
                    layoutId="activeNavHighlight"
                    className="absolute bottom-0 left-2 right-2 h-[2px] bg-blue-600 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Search bar Desktop */}
          <div ref={searchRef} className="hidden md:block relative flex-1 max-w-sm">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products, brands, trends..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchFocused(true);
                }}
                onFocus={() => setIsSearchFocused(true)}
                className="w-full bg-slate-50 text-slate-900 placeholder-slate-400 text-xs pl-10 pr-4 py-2 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 border border-slate-205 focus:bg-white transition-all duration-200"
              />
              <Search className="absolute left-3 top-2.5 text-slate-400" size={14} />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-900"
                >
                  <X size={13} />
                </button>
              )}
            </div>

            {/* Suggestions drop down */}
            <AnimatePresence>
              {isSearchFocused && searchSuggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden z-50 text-slate-800"
                >
                  <div className="px-4 py-2 border-b border-slate-100 text-[10px] font-bold text-slate-400 tracking-wider">
                    RECOMMENDED PRODUCTS
                  </div>
                  <ul>
                    {searchSuggestions.map((product) => (
                      <li
                        key={product.id}
                        onClick={() => handleSuggestionClick(product)}
                        className="px-4 py-3 hover:bg-slate-50 flex items-center gap-3 cursor-pointer transition-colors duration-150"
                      >
                        <img 
                          src={product.images[0]} 
                          alt={product.title} 
                          className="w-9 h-9 object-cover rounded-lg bg-slate-100 border border-slate-200"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-slate-800 truncate">{product.title}</p>
                          <p className="text-[11px] text-blue-600 font-mono font-bold">${product.price.toFixed(2)}</p>
                        </div>
                        <ArrowRight size={13} className="text-slate-400 group-hover:text-slate-700" />
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User controls (Desktop & Mobile) */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Wishlist */}
            <button
              onClick={() => setActiveTab('catalog')}
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl relative transition-all duration-150 cursor-pointer"
              title="View Wishlist"
              id="header-wishlist-btn"
            >
              <Heart size={20} className={wishlistCount > 0 ? 'fill-rose-500 text-rose-500' : ''} />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center border-2 border-white">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setActiveTab('cart')}
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl relative transition-all duration-150 cursor-pointer"
              title="Your Shopping Cart"
              id="header-cart-btn"
            >
              <ShoppingBag size={20} className={cartCount > 0 ? 'text-blue-600' : ''} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-blue-600 text-white text-[9px] font-black h-4 w-4 rounded-full flex items-center justify-center border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Dropdown / Account Trigger */}
            <div ref={userDropdownRef} className="relative">
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center gap-1.5 p-1.5 hover:bg-slate-100 rounded-xl transition-all duration-150 cursor-pointer text-slate-600 hover:text-slate-900"
                id="header-profile-btn"
              >
                <div className="h-8 w-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-extrabold text-xs shadow-inner">
                  {userEmail ? userEmail.charAt(0).toUpperCase() : <User size={14} />}
                </div>
                {userEmail && (
                  <span className="hidden md:inline text-xs font-semibold max-w-[100px] truncate text-slate-700">
                    {userEmail.split('@')[0]}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {showUserDropdown && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 5 }}
                    className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden z-50 text-xs text-slate-800"
                  >
                    {userEmail ? (
                      <div className="divide-y divide-slate-100">
                        <div className="px-4 py-3 bg-slate-50">
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Signed in as</p>
                          <p className="font-semibold text-slate-900 truncate text-[11px] font-mono mt-0.5">{userEmail}</p>
                        </div>
                        <div className="py-1">
                          <button
                            onClick={() => { setActiveTab('cart'); setShowUserDropdown(false); }}
                            className="w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-700 hover:text-slate-900 cursor-pointer font-medium"
                          >
                            My Orders & Invoices
                          </button>
                        </div>
                        <div className="py-1">
                          <button
                            onClick={() => { onLogout(); setShowUserDropdown(false); }}
                            className="w-full text-left px-4 py-2 hover:bg-slate-50 text-rose-500 font-semibold hover:text-rose-600 cursor-pointer"
                          >
                            Sign Out
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="py-2">
                        <p className="px-4 py-1.5 text-[10px] uppercase font-bold text-slate-400 tracking-wider">Welcome to Trends!</p>
                        <button
                          onClick={() => { setActiveTab('login'); setShowUserDropdown(false); }}
                          className="w-full text-left px-4 py-2.5 hover:bg-slate-50 text-slate-900 font-semibold flex items-center justify-between cursor-pointer"
                        >
                          <span>Sign In / Create Account</span>
                          <ArrowRight size={13} className="text-blue-650" />
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Hamburger Mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl cursor-pointer"
              id="header-mobile-menu-btn"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/40 z-40 backdrop-blur-xs mt-[104px]"
          />
        )}
      </AnimatePresence>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.25 }}
            className="lg:hidden fixed top-[104px] right-0 bottom-0 w-80 bg-white border-l border-slate-200 z-50 overflow-y-auto px-6 py-6 text-slate-800"
          >
            {/* Mobile Search */}
            <div className="mb-6">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Search Catalog</p>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search brand, category, title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 pl-10 pr-4 py-2.5 rounded-xl text-xs border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-3 text-slate-400" size={15} />
              </div>
              
              {searchSuggestions.length > 0 && (
                <div className="mt-2 bg-slate-50 border border-slate-100 rounded-xl divide-y divide-slate-100 overflow-hidden">
                  {searchSuggestions.map(product => (
                    <div
                      key={product.id}
                      onClick={() => {
                        handleSuggestionClick(product);
                        setIsMobileMenuOpen(false);
                      }}
                      className="p-3 flex items-center gap-3 cursor-pointer hover:bg-slate-100"
                    >
                      <img src={product.images[0]} className="w-8 h-8 object-cover rounded bg-white border border-slate-200" />
                      <div className="flex-1 min-w-0 text-[11px]">
                        <p className="font-semibold text-slate-800 truncate">{product.title}</p>
                        <p className="text-blue-600 font-bold font-mono">${product.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation links */}
            <div className="space-y-1 mb-8">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Sections</p>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all ${
                    activeTab === item.id
                      ? 'bg-slate-900 text-white'
                      : 'hover:bg-slate-50 text-slate-600 hover:text-slate-950'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Extra user stats */}
            <div className="border-t border-slate-100 pt-6">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Support & Care</p>
              <div className="space-y-2 text-xs text-slate-500 font-medium">
                <p className="flex items-center gap-2">📞 24/7 Hotline: 1-800-TRENDS</p>
                <p className="flex items-center gap-2">📍 Find our Flagship Store Location</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}
