/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, HelpCircle, ChevronDown, ChevronUp, Check } from 'lucide-react';
import { INSTANT_FAQ } from '../data';
import { motion, AnimatePresence } from 'motion/react';

export default function ContactView() {
  // Accordion active FAQ state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Form submission state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    
    setIsSent(true);
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setTimeout(() => setIsSent(false), 4500);
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 select-none space-y-16">
      
      {/* Visual Header Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Contact Info Column (col:5) */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest font-mono">CONCIERGE COMMUNICATIONS</span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight font-display mt-1">
              We Would Love to Hear From You
            </h1>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              Have questions regarding our logistics, sizes, or custom bespoke parameters? Drop your details on our dashboard or contact the concierge line directly.
            </p>
          </div>

          {/* Core Info Cards */}
          <div className="space-y-4">
            {/* Phone contact */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 flex gap-4 h-fit hover:shadow-md transition-shadow">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl border border-blue-100 shrink-0">
                <Phone size={18} />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Hotline &amp; Telephone</h4>
                <p className="text-sm font-bold text-slate-900 font-mono">1-800-TRENDS (873-637)</p>
                <p className="text-[10px] text-slate-450">Mon - Fri: 8:00 AM - 8:00 PM EST</p>
              </div>
            </div>

            {/* Email contact */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 flex gap-4 h-fit hover:shadow-md transition-shadow">
              <div className="p-3 bg-rose-50 text-rose-600 rounded-xl border border-rose-100 shrink-0">
                <Mail size={18} />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Concierge Email</h4>
                <p className="text-sm font-bold text-blue-650 font-mono hover:underline cursor-pointer">concierge@trends.com</p>
                <p className="text-[10px] text-slate-455">Typical response turnaround: under 2 hours</p>
              </div>
            </div>

            {/* Flagship location */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 flex gap-4 h-fit hover:shadow-md transition-shadow">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-xl border border-amber-100 shrink-0">
                <MapPin size={18} />
              </div>
              <div className="space-y-1 col-span-3">
                <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Flagship Store Location</h4>
                <p className="text-sm font-bold text-slate-900">Trends Boutique NY</p>
                <p className="text-xs text-slate-650">745 5th Ave, Manhattan, NY 10151</p>
              </div>
            </div>
          </div>

          {/* Social connections */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-450 uppercase tracking-widest">Connect Socially</h4>
            <div className="flex gap-2">
              {['Instagram', 'Pinterest', 'Vogue', 'TikTok'].map(sc => (
                <a
                  key={sc}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-900 hover:text-white border border-slate-200 text-xs font-bold rounded-lg transition-colors capitalize text-slate-700"
                >
                  {sc}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form Column (col:7) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-[32px] border border-slate-100 shadow-sm relative">
          <h2 className="text-xl font-black text-slate-900 tracking-tight font-display mb-2">Concierge Message Box</h2>
          <p className="text-xs text-slate-400 mb-8">Send custom questions or partnership inquiries directly to our NY team.</p>

          <AnimatePresence>
            {isSent && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 bg-emerald-50 text-emerald-850 text-xs sm:text-sm px-4 py-3 rounded-2xl border border-emerald-230 flex gap-3 items-start shadow-inner"
              >
                <div className="bg-emerald-500 text-white p-1 rounded-full shrink-0">
                  <Check size={14} className="stroke-[3]" />
                </div>
                <div>
                  <p className="font-extrabold text-emerald-950">Inquiry Received!</p>
                  <p className="text-xs text-emerald-700 mt-0.5">Your communication has been securely routed. Keep an eye on your email inbox.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-450 uppercase tracking-wider mb-1.5">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-xs sm:text-sm text-slate-805 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-455 uppercase tracking-wider mb-1.5">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-xs sm:text-sm text-slate-805 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-450 uppercase tracking-wider mb-1.5">Subject Of Inquiry</label>
              <input
                type="text"
                placeholder="Product sizing, checkout issues..."
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-xs sm:text-sm text-slate-805 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-450 uppercase tracking-wider mb-1.5">Concierge Message</label>
              <textarea
                required
                rows={5}
                placeholder="Write your details or specifications here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-xs sm:text-sm text-slate-805 placeholder-slate-400 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-slate-905 hover:bg-slate-800 text-white font-black text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Transmit Message</span>
              <Send size={13} />
            </button>
          </form>
        </div>

      </section>

      {/* ACCORDION FAQ SECTION */}
      <section className="bg-slate-50 rounded-[40px] p-6 sm:p-12 border border-slate-105 hover:border-slate-200 transition-all">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight font-display">Frequently Asked Questions</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">Have instant concerns? Tap the accordions below to find answers.</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {INSTANT_FAQ.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-105 hover:border-slate-200 shadow-xs overflow-hidden transition-all duration-200"
              >
                {/* Trigger head */}
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left px-6 py-4 flex justify-between items-center gap-4 cursor-pointer"
                >
                  <span className="text-sm font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                    <HelpCircle size={15} className="text-blue-500 shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  {isOpen ? <ChevronUp size={16} className="text-slate-500 shrink-0" /> : <ChevronDown size={16} className="text-slate-505 shrink-0" />}
                </button>

                {/* Body panels */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      className="border-t border-slate-100 bg-slate-50/40"
                    >
                      <p className="px-6 py-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
