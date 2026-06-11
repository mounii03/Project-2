/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Target, Sparkles, Heart, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export default function AboutView() {
  const values = [
    {
      icon: <Sparkles className="text-blue-600" size={20} />,
      title: 'Aesthetic Sophistication',
      desc: 'Our curated items are not arbitrarily sourced; we analyze global trends, microtextures, and material compounds to deliver flawless premium designs.'
    },
    {
      icon: <ShieldCheck className="text-blue-600" size={20} />,
      title: 'Structural Durability',
      desc: 'Style should never bypass durability. From Italian top-grain calfskin leather to optical sapphire-crystal watch bezels, we enforce lifetime utility standards.'
    },
    {
      icon: <Target className="text-blue-600" size={20} />,
      title: 'Logistical Precision',
      desc: 'Waiting is the enemy of shopping. We partner with express transport carriers, storing items in regional hubs to ensure immediate local dispatches.'
    },
    {
      icon: <Heart className="text-blue-600" size={20} />,
      title: 'Absoluting Customer-First',
      desc: 'Our work is complete only when you are 100% satisfied. Features like 30-day effortless returns and 24/7 hotline agents guarantee security.'
    }
  ];

  const stats = [
    { value: '14k+', label: 'Vetted Products Sold' },
    { value: '99.2%', label: 'Satisfied Customer Reviews' },
    { value: '48hr', label: 'Average Dispatch distribution' },
    { value: '12', label: 'Regional logistics Hubs' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 select-none space-y-16">
      
      {/* Editorial Hero split */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Editorial copy */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex bg-slate-100 border border-slate-200 text-slate-800 px-3 py-1 rounded-full text-[9px] font-bold tracking-wider uppercase">
            WHO WE ARE
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-slate-900 tracking-tight leading-tight">
            Curating True Design Excellence in Electronics, Fashion & Lifestyle
          </h1>
          
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            At Trends, we believe your shopping experience should be intuitive, highly secure, and inspiring. We serve as a focused design filter in a world of endless cheap mass production. By working closely with specialized craftsmen, ethical fabric mills, and advanced micro-component laboratories, we curate a cohesive catalog.
          </p>

          <p className="text-sm text-slate-500 leading-relaxed">
            Every product bearing the Trends insignia has undergone precise testing—assessing acoustic thresholds, textile tensile strength, thermal retention durations, and general visual balance. Our customer-first model ensures that you receive outstanding value without middleman markup fees.
          </p>
        </div>

        {/* Right Creative mockup image */}
        <div className="lg:col-span-6 relative">
          <div className="absolute inset-0 bg-blue-100 rounded-[24px] blur-2xl transform rotate-3 opacity-30" />
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 shadow-sm bg-white p-3">
            <img 
              src="https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&q=80&w=600" 
              alt="Quality checking on high class accessories" 
              className="w-full h-[300px] object-cover rounded-xl"
            />
          </div>
        </div>
      </section>

      {/* Numeric Milestones ROW */}
      <section className="bg-slate-900 text-white rounded-2xl p-8 md:p-12 border border-slate-800 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center shadow-xs">
        {stats.map((st, idx) => (
          <div key={idx} className="space-y-1">
            <p className="text-3xl sm:text-4xl font-bold text-white font-mono tracking-tight">{st.value}</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{st.label}</p>
          </div>
        ))}
      </section>

      {/* Brand Values Grid */}
      <section className="space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-905 tracking-tight font-display">Our Foundational Values</h2>
          <p className="text-sm text-slate-500 mt-1">Four rigorous parameters driving every curation, transport dispatch, and checkout secure key.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((v, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-3xl border border-slate-105 hover:border-slate-200 hover:shadow-lg transition-all duration-300 flex gap-5"
            >
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-slate-900 shrink-0 h-fit">
                {v.icon}
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base font-extrabold text-slate-950 tracking-tight font-display">{v.title}</h3>
                <p className="text-xs sm:text-sm text-slate-550 leading-relaxed font-sans">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
