/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Lock, User, Sparkles, Check, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LoginRegisterViewProps {
  onLogin: (email: string) => void;
  setActiveTab: (tab: string) => void;
}

export default function LoginRegisterView({ onLogin, setActiveTab }: LoginRegisterViewProps) {
  // Mode: 'signin' | 'signup'
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  
  // Fields state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [authSuccess, setAuthSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() === '' || password.trim() === '') return;
    if (mode === 'signup' && name.trim() === '') return;

    // Simulate database clearance
    setAuthSuccess(true);
    setTimeout(() => {
      onLogin(email);
      setActiveTab('home');
      setAuthSuccess(false);
      setEmail('');
      setPassword('');
      setName('');
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 select-none">
      
      <div className="max-w-md mx-auto bg-white rounded-[32px] border border-slate-105 shadow-xl p-6 sm:p-10 space-y-6">
        
        {/* Banner header titles */}
        <div className="text-center space-y-1.5">
          <div className="inline-flex items-center gap-1 bg-blue-50 border border-blue-101 text-blue-650 px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
            <Sparkles size={11} className="text-amber-500 animate-pulse" />
            <span>Curated Shop Account</span>
          </div>
          <h1 className="text-2xl font-black font-display tracking-tight text-slate-905">Welcome To Trends.</h1>
          <p className="text-xs text-slate-400">Unlock private member pricing, orders logs, and dispatch tracking graphs.</p>
        </div>

        {/* Sliding Tabs */}
        <div className="flex bg-slate-50 border border-slate-205 rounded-xl p-1 relative">
          <button
            onClick={() => setMode('signin')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all relative z-10 cursor-pointer ${
              mode === 'signin' ? 'text-slate-900 font-extrabold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Sign In Account
          </button>
          <button
            onClick={() => setMode('signup')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all relative z-10 cursor-pointer ${
              mode === 'signup' ? 'text-slate-900 font-extrabold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Create New Account
          </button>

          {/* Background sliding highlight */}
          <motion.div
            layoutId="authTabSlider"
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className="absolute top-1 bottom-1 bg-white rounded-lg border border-slate-200/50 shadow-sm"
            style={{
              left: mode === 'signin' ? '4px' : 'calc(50% + 4px)',
              right: mode === 'signin' ? 'calc(50% + 4px)' : '4px'
            }}
          />
        </div>

        {/* Confirmation State banner */}
        <AnimatePresence>
          {authSuccess && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-emerald-50 text-emerald-850 border border-emerald-200 p-4 rounded-2xl flex gap-3.5 items-start text-xs sm:text-sm"
            >
              <div className="bg-emerald-500 text-white p-1 rounded-full shrink-0">
                <Check size={14} className="stroke-[3]" />
              </div>
              <div>
                <p className="font-extrabold text-emerald-950">
                  {mode === 'signin' ? 'Account Authorized!' : 'Account Created!'}
                </p>
                <p className="text-xs text-emerald-700 mt-0.5">Redirecting you to main trends dashboard...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input fields */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-bold text-slate-450 uppercase mb-1.5 tracking-wider">Your Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Carter"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 pl-10 pr-4 py-3 rounded-xl text-xs sm:text-sm text-slate-805 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <User className="absolute left-3.5 top-3.5 text-slate-400" size={14} />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-450 uppercase mb-1.5 tracking-wider">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 pl-10 pr-4 py-3 rounded-xl text-xs sm:text-sm text-slate-805 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <Mail className="absolute left-3.5 top-3.5 text-slate-400" size={14} />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-bold text-slate-450 uppercase tracking-wider">Secure Password</label>
              {mode === 'signin' && (
                <a href="#" onClick={(e) => e.preventDefault()} className="text-[10px] font-semibold text-blue-600 hover:underline">
                  Forgot Password?
                </a>
              )}
            </div>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 pl-10 pr-4 py-3 rounded-xl text-xs sm:text-sm text-slate-805 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <Lock className="absolute left-3.5 top-3.5 text-slate-400" size={14} />
            </div>
          </div>

          {/* Secure disclaimer */}
          <div className="text-[10px] text-slate-400 font-semibold leading-relaxed pt-1.5">
             🛡️ Secured by industrial TLS keys. Trends never transmits raw credentials.
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-slate-905 hover:bg-slate-800 text-white font-black text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer pt-2"
          >
            <span>{mode === 'signin' ? 'Authorize Credentials' : 'Create Member Account'}</span>
            <ArrowRight size={13} />
          </button>

        </form>

      </div>

    </div>
  );
}
