/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShieldCheck, Truck, RefreshCw, Headphones, Mail, Send, Check } from 'lucide-react';
import { motion } from 'motion/react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() !== '') {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  const trustBadges = [
    {
      icon: <ShieldCheck className="text-slate-900" size={28} />,
      title: 'Secure Payments',
      desc: 'Industry standard SSL PCI data privacy shields'
    },
    {
      icon: <Truck className="text-slate-900" size={28} />,
      title: 'Fast Delivery',
      desc: 'Express distribution directly dispatched in 48 hours'
    },
    {
      icon: <RefreshCw className="text-slate-900" size={28} />,
      title: 'Easy Returns',
      desc: 'Hassle-free 30-day complete money-back warranty'
    },
    {
      icon: <Headphones className="text-slate-900" size={28} />,
      title: '24/7 Support',
      desc: 'Dedicated customer-care team ready on hotline'
    }
  ];

  return (
    <footer className="bg-slate-50 text-slate-500 border-t border-slate-200 pt-16 pb-8 select-none">
      
      {/* Trust Badges Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 bg-white p-8 rounded-2xl border border-slate-200">
          {trustBadges.map((badge, idx) => (
            <div key={idx} className="flex gap-4 items-start">
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 shadow-xs">
                {badge.icon}
              </div>
              <div>
                <h4 className="text-slate-905 text-sm font-bold tracking-tight mb-1">{badge.title}</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
        
        {/* Brand statement */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl font-black text-slate-900 font-display tracking-wider">TRENDS</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed mb-6 max-w-sm">
            Trends is a premier, customer-focused destination redefining online shopping. We bring stylish, durable, and highly reliable products across electronics, fashion, accessories, and lifestyle, backed by premium logistics and a customer-first approach.
          </p>
          <div className="flex gap-2">
            {['facebook', 'twitter', 'instagram', 'linkedin', 'youtube'].map((social) => (
              <a
                key={social}
                href="#"
                className="w-8 h-8 rounded-lg bg-white hover:bg-slate-900 hover:text-white flex items-center justify-center transition-all duration-200 border border-slate-200 font-bold text-slate-500 text-xs capitalize"
                onClick={(e) => e.preventDefault()}
              >
                {social.charAt(0)}
              </a>
            ))}
          </div>
        </div>

        {/* Directory Columns */}
        <div>
          <h4 className="text-xs font-bold text-slate-950 uppercase tracking-widest mb-5">Product Shop</h4>
          <ul className="space-y-3 text-xs">
            {['Electronics & Gadgets', 'Tailored Fashion Wear', 'AeroVue Accessories', 'Earthy & Modern Lifestyle'].map((item) => (
              <li key={item}>
                <button 
                  onClick={() => setActiveTab('catalog')} 
                  className="hover:text-blue-650 transition-colors cursor-pointer text-left font-medium text-slate-500"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold text-slate-950 uppercase tracking-widest mb-5">Useful Links</h4>
          <ul className="space-y-3 text-xs">
            {[
              { label: 'Weekly Active Offers', tab: 'offers' },
              { label: 'Our Brand Vision', tab: 'about' },
              { label: 'Customer Relations', tab: 'contact' },
              { label: 'Help & Instant FAQ', tab: 'contact' }
            ].map((link) => (
              <li key={link.label}>
                <button 
                  onClick={() => setActiveTab(link.tab)} 
                  className="hover:text-blue-655 transition-colors cursor-pointer font-medium text-slate-500"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter form with beautiful response state */}
        <div>
          <h4 className="text-xs font-bold text-slate-950 uppercase tracking-widest mb-5">Join the Newsletter</h4>
          <p className="text-[11px] text-slate-500 mb-4 leading-relaxed">
            Subscribe for curation releases, member private pricing, and claim your exclusive 20% registration coupon instantly!
          </p>
          
          {!isSubscribed ? (
            <form onSubmit={handleSubscribe} className="relative">
              <input
                type="email"
                required
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white text-slate-900 placeholder-slate-400 pl-4 pr-12 py-3 rounded-xl text-xs border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
              />
              <button
                type="submit"
                className="absolute right-1 text-white top-1 bottom-1 px-3 bg-slate-900 hover:bg-slate-800 rounded-lg transition-all flex items-center justify-center cursor-pointer font-semibold uppercase tracking-wider"
                title="Subscribe To Trends"
              >
                <Send size={12} />
              </button>
            </form>
          ) : (
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              className="bg-white p-4 rounded-xl border border-slate-200 text-slate-800 flex gap-2 items-start"
            >
              <div className="bg-emerald-100 text-emerald-800 p-1 rounded border border-emerald-200 shrink-0">
                <Check size={12} />
              </div>
              <div className="text-[11px] font-sans">
                <p className="text-slate-900 font-bold mb-0.5">Successfully Registered!</p>
                <p className="text-slate-550">Use code below:</p>
                <div className="mt-1.5 bg-slate-50 border border-slate-205 text-center text-blue-600 font-mono font-bold tracking-widest text-xs py-1 px-3 rounded flex justify-between items-center">
                  <span>TRENDS20</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

      </div>

      {/* SEO Anchors Strip and Copywrite */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px]">
        <div className="text-slate-400">
          &copy; {new Date().getFullYear()} TRENDS Inc. Curated with Clean Minimalism.
        </div>
        <div className="flex flex-wrap gap-4 text-slate-400 justify-center font-medium">
          <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-slate-600">Privacy Manifesto</a>
          <span>•</span>
          <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-slate-600">Terms of Transport</a>
          <span>•</span>
          <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-slate-600">Cookie Protocol</a>
          <span>•</span>
          <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-slate-600">SSL certified secure processing</a>
        </div>
      </div>

    </footer>
  );
}
