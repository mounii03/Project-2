/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Category, Product, CartItem, Coupon, UserProfile } from './types';
import { INITIAL_PRODUCTS } from './data';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import CatalogView from './components/CatalogView';
import ProductDetailsView from './components/ProductDetailsView';
import OffersView from './components/OffersView';
import AboutView from './components/AboutView';
import ContactView from './components/ContactView';
import CartView from './components/CartView';
import CheckoutView from './components/CheckoutView';
import LoginRegisterView from './components/LoginRegisterView';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Filter scales bridged between tabs
  const [categoryFilter, setCategoryFilter] = useState<Category | 'All'>('All');

  // Customer/User Profile simulation
  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: 'user-007',
    email: 'mounikamadisa05@gmail.com', // Pre-populate for visual charm & conversion focus
    name: 'Mounika Madisa',
    isAuthenticated: true,
    wishlist: []
  });

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Sync scroll on transitions
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab, selectedProduct]);

  // Wishlist controls
  const handleToggleWishlist = (product: Product) => {
    setUserProfile((prev) => {
      const isAlreadyWishlisted = prev.wishlist.includes(product.id);
      const updatedWishlist = isAlreadyWishlisted
        ? prev.wishlist.filter((id) => id !== product.id)
        : [...prev.wishlist, product.id];
      return { ...prev, wishlist: updatedWishlist };
    });
  };

  const isWishlisted = (product: Product) => {
    return userProfile.wishlist.includes(product.id);
  };

  // Cart operations
  const handleAddToCart = (
    product: Product,
    quantity: number,
    color?: string,
    size?: string
  ) => {
    setCartItems((prevItems) => {
      // Look for duplicate item with identical styling configurations
      const duplicateIdx = prevItems.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === color &&
          item.selectedSize === size
      );

      if (duplicateIdx > -1) {
        const updated = [...prevItems];
        updated[duplicateIdx].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevItems,
          {
            product,
            quantity,
            selectedColor: color,
            selectedSize: size
          }
        ];
      }
    });
  };

  const handleUpdateQuantity = (
    productId: string,
    quantity: number,
    color?: string,
    size?: string
  ) => {
    if (quantity <= 0) {
      handleRemoveItem(productId, color, size);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId &&
        item.selectedColor === color &&
        item.selectedSize === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const handleRemoveItem = (
    productId: string,
    color?: string,
    size?: string
  ) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedColor === color &&
            item.selectedSize === size
          )
      )
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleApplyCoupon = (coupon: Coupon | null) => {
    setAppliedCoupon(coupon);
  };

  // Auth Operations
  const handleLogin = (email: string) => {
    setUserProfile({
      id: `usr-${Date.now()}`,
      email,
      name: email.split('@')[0],
      isAuthenticated: true,
      wishlist: []
    });
  };

  const handleLogout = () => {
    setUserProfile({
      id: '',
      email: '',
      name: '',
      isAuthenticated: false,
      wishlist: []
    });
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setActiveTab('details');
  };

  // Compute total layout items in cart
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = userProfile.wishlist.length;

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      {/* Sticky Top Header navigation bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        products={INITIAL_PRODUCTS}
        onSelectProduct={handleSelectProduct}
        userEmail={userProfile.isAuthenticated ? userProfile.email : null}
        onLogout={handleLogout}
      />

      {/* Main viewport block */}
      <main className="flex-1 animate-[fadeIn_0.3s_ease-out]">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.22 }}
            >
              <HomeView
                products={INITIAL_PRODUCTS}
                setActiveTab={setActiveTab}
                setCategoryFilter={setCategoryFilter}
                onSelectProduct={handleSelectProduct}
                isWishlisted={isWishlisted}
                onToggleWishlist={handleToggleWishlist}
                onAddToCart={handleAddToCart}
              />
            </motion.div>
          )}

          {activeTab === 'catalog' && (
            <motion.div
              key="catalog"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.22 }}
            >
              <CatalogView
                products={INITIAL_PRODUCTS}
                categoryFilter={categoryFilter}
                setCategoryFilter={setCategoryFilter}
                onSelectProduct={handleSelectProduct}
                isWishlisted={isWishlisted}
                onToggleWishlist={handleToggleWishlist}
                onAddToCart={handleAddToCart}
              />
            </motion.div>
          )}

          {activeTab === 'details' && selectedProduct && (
            <motion.div
              key="details"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <ProductDetailsView
                product={selectedProduct}
                allProducts={INITIAL_PRODUCTS}
                onBack={() => {
                  setActiveTab('catalog');
                }}
                onSelectProduct={handleSelectProduct}
                isWishlisted={isWishlisted}
                onToggleWishlist={handleToggleWishlist}
                onAddToCart={handleAddToCart}
                setActiveTab={setActiveTab}
              />
            </motion.div>
          )}

          {activeTab === 'offers' && (
            <motion.div
              key="offers"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.22 }}
            >
              <OffersView
                products={INITIAL_PRODUCTS}
                onSelectProduct={handleSelectProduct}
                isWishlisted={isWishlisted}
                onToggleWishlist={handleToggleWishlist}
                onAddToCart={handleAddToCart}
                setActiveTab={setActiveTab}
              />
            </motion.div>
          )}

          {activeTab === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.22 }}
            >
              <AboutView />
            </motion.div>
          )}

          {activeTab === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.22 }}
            >
              <ContactView />
            </motion.div>
          )}

          {activeTab === 'cart' && (
            <motion.div
              key="cart"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.22 }}
            >
              <CartView
                cartItems={cartItems}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                appliedCoupon={appliedCoupon}
                onApplyCoupon={handleApplyCoupon}
                setActiveTab={setActiveTab}
              />
            </motion.div>
          )}

          {activeTab === 'checkout' && (
            <motion.div
              key="checkout"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.22 }}
            >
              <CheckoutView
                cartItems={cartItems}
                appliedCoupon={appliedCoupon}
                onClearCart={handleClearCart}
                setActiveTab={setActiveTab}
              />
            </motion.div>
          )}

          {activeTab === 'login' && (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.22 }}
            >
              <LoginRegisterView onLogin={handleLogin} setActiveTab={setActiveTab} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Styled Brand Footer directories */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
