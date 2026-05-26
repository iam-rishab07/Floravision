import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

const API_BASE_URL = 'http://localhost:8080/api';

const AuthPage = ({ onAuthSuccess, onBackToHome }) => {
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isLoginTab) {
        // Sign In Request
        const res = await fetch(`${API_BASE_URL}/users/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Invalid credentials.');
        }

        onAuthSuccess(data); // Log user in
      } else {
        // Registration Request
        if (password.length < 12) {
          throw new Error('Password must be at least 12 characters long.');
        }

        const res = await fetch(`${API_BASE_URL}/users/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            email,
            passwordHash: password // Maps to backend Entity field name
          })
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Failed to create account.');
        }

        // On successful registration, auto-authenticate
        // To log in, invoke the login API with the newly created details
        const loginRes = await fetch(`${API_BASE_URL}/users/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        
        const loginData = await loginRes.json();
        if (!loginRes.ok) {
          throw new Error('Account created, but automatic login failed. Please sign in.');
        }

        onAuthSuccess(loginData);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-16 reveal-on-load">
      <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-editorial shadow-soft space-y-8">
        
        {/* Toggle Tabs */}
        <div className="flex border-b border-editorial pb-4 justify-center gap-8">
          <button
            onClick={() => {
              setIsLoginTab(true);
              setError(null);
            }}
            className={`text-sm uppercase tracking-widest font-bold pb-2 relative transition-all ${
              isLoginTab ? 'text-[#1B362F]' : 'text-gray-400 hover:text-[#1B362F]'
            }`}
          >
            Sign In
            {isLoginTab && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C2A684]" />}
          </button>
          
          <button
            onClick={() => {
              setIsLoginTab(false);
              setError(null);
            }}
            className={`text-sm uppercase tracking-widest font-bold pb-2 relative transition-all ${
              !isLoginTab ? 'text-[#1B362F]' : 'text-gray-400 hover:text-[#1B362F]'
            }`}
          >
            Register
            {!isLoginTab && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C2A684]" />}
          </button>
        </div>

        {/* Title */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-[#1B362F]">
            {isLoginTab ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-gray-400 text-[11px] font-semibold uppercase tracking-wider">
            {isLoginTab ? 'Access your Botanica Profile' : 'Join our botanical community'}
          </p>
        </div>

        {/* Errors Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 p-3.5 rounded-xl text-xs font-bold flex items-center gap-2">
            <AlertCircle size={14} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Forms */}
        <form onSubmit={handleFormSubmit} className="space-y-4 text-xs font-medium">
          
          {/* Name Field (Register only) */}
          {!isLoginTab && (
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-[#1B362F] uppercase tracking-wider">Full Name *</label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-gray-400"><User size={14} /></span>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alice Vance"
                  className="w-full bg-[#F9F8F6] border border-editorial rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-[#C2A684]"
                />
              </div>
            </div>
          )}

          {/* Email Field */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-[#1B362F] uppercase tracking-wider">Email Address *</label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-gray-400"><Mail size={14} /></span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alice@example.com"
                className="w-full bg-[#F9F8F6] border border-editorial rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-[#C2A684]"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-bold text-[#1B362F] uppercase tracking-wider">Password *</label>
              {!isLoginTab && password.length > 0 && (
                <span className={`text-[9px] font-bold uppercase tracking-wider ${
                  password.length >= 12 ? 'text-emerald-600' : 'text-amber-600'
                }`}>
                  {password.length}/12 chars
                </span>
              )}
            </div>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-gray-400"><Lock size={14} /></span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#F9F8F6] border border-editorial rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-[#C2A684]"
              />
            </div>
            {!isLoginTab && password.length > 0 && password.length < 12 && (
              <p className="text-[9px] text-amber-600 font-bold flex items-center gap-1 mt-1">
                <AlertCircle size={10} /> Password must be 12+ characters for security.
              </p>
            )}
          </div>

          {/* Security Notice */}
          <div className="flex items-center gap-2 text-gray-400 text-[10px] font-semibold pt-2">
            <ShieldCheck size={14} className="text-[#C2A684]" />
            <span>Secure encryption & session checks active</span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-[#1B362F] hover:bg-[#1B362F]/90 text-white rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-50 mt-4"
          >
            {loading ? 'Processing...' : isLoginTab ? 'Sign In' : 'Create Account'}
            {!loading && <ArrowRight size={12} />}
          </button>
        </form>

        <button
          onClick={onBackToHome}
          className="w-full py-2.5 text-center text-[10px] font-bold text-gray-400 hover:text-[#1B362F] uppercase tracking-wider"
        >
          Cancel and return home
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
