/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Lock, User, Sparkles, Check, ArrowRight, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { auth } from '../firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';

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
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() === '' || password.trim() === '') return;
    if (mode === 'signup' && name.trim() === '') return;

    setError('');
    setLoading(true);

    try {
      if (mode === 'signin') {
        await signInWithEmailAndPassword(auth, email.trim(), password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
        await updateProfile(userCredential.user, {
          displayName: name.trim()
        });
      }

      setAuthSuccess(true);
      setTimeout(() => {
        onLogin(email);
        setActiveTab('home');
        setAuthSuccess(false);
        setLoading(false);
        setEmail('');
        setPassword('');
        setName('');
      }, 1500);
    } catch (err: any) {
      setLoading(false);
      let msg = err.message || 'An error occurred during authentication';
      if (
        err.code === 'auth/wrong-password' ||
        err.code === 'auth/user-not-found' ||
        err.code === 'auth/invalid-credential'
      ) {
        msg = 'Invalid email address or passcode credentials.';
      } else if (err.code === 'auth/email-already-in-use') {
        msg = 'This email is already registered on our servers.';
      } else if (err.code === 'auth/weak-password') {
        msg = 'Secure password is too short. Please use at least 6 characters.';
      }
      setError(msg);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setAuthSuccess(true);
      setTimeout(() => {
        setActiveTab('home');
        setAuthSuccess(false);
        setLoading(false);
      }, 1500);
    } catch (err: any) {
      setLoading(false);
      if (err.code !== 'auth/popup-closed-by-user') {
        setError(err.message || 'Could not verify certificate tokens with Google Auth.');
      }
    }
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
            onClick={() => { setMode('signin'); setError(''); }}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all relative z-10 cursor-pointer ${
              mode === 'signin' ? 'text-slate-900 font-extrabold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Sign In Account
          </button>
          <button
            onClick={() => { setMode('signup'); setError(''); }}
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

        {/* Error State Banner */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-rose-50 text-rose-850 border border-rose-250 p-4 rounded-2xl flex gap-3 items-start text-xs sm:text-sm"
            >
              <div className="bg-rose-500 text-white p-1 rounded-full shrink-0">
                <AlertTriangle size={14} className="stroke-[3]" />
              </div>
              <div>
                <p className="font-extrabold text-rose-950">Authentication Failure</p>
                <p className="text-xs text-rose-700 mt-0.5">{error}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
            disabled={loading}
            className="w-full py-4 bg-slate-905 hover:bg-slate-800 text-white font-black text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer pt-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>
              {loading
                ? 'Processing Authorized Tokens...'
                : mode === 'signin'
                ? 'Authorize Credentials'
                : 'Create Member Account'}
            </span>
            {!loading && <ArrowRight size={13} />}
          </button>

        </form>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="flex-shrink mx-4 text-[10px] text-slate-400 font-bold uppercase tracking-wider">or sign in with</span>
          <div className="flex-grow border-t border-slate-200"></div>
        </div>

        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          type="button"
          className="w-full py-3.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.66-1-.66-2.1-.66-2.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Google Curation Single-Sign-On</span>
        </button>

      </div>

    </div>
  );
}

