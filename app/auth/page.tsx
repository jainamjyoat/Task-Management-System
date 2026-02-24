'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../store/authStore';

export default function AuthPage() {
  const router = useRouter();
  const { login, signup, isLoading, error, clearError, isAuthenticated } = useAuthStore();
  const [isLogin, setIsLogin] = useState(true);
  const [localError, setLocalError] = useState<string>('');

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreedToTerms: false,
  });

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setLocalError('');
    clearError();
    setFormData({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreedToTerms: false,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocalError('');
    clearError();

    try {
      if (isLogin) {
        // Login
        await login(formData.email, formData.password);
        router.push('/dashboard');
      } else {
        // Sign Up
        if (formData.password !== formData.confirmPassword) {
          setLocalError('Passwords do not match');
          return;
        }

        if (!formData.agreedToTerms) {
          setLocalError('You must agree to the Terms and Privacy Policy');
          return;
        }

        await signup(formData.fullName, formData.email, formData.password);
        router.push('/dashboard');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Authentication failed';
      setLocalError(errorMessage);
    }
  };

  return (
    <div
      className="relative flex min-h-screen w-full flex-col overflow-x-hidden font-display text-slate-900 dark:text-slate-100"
      style={{
        backgroundColor: '#0f1623',
        backgroundImage: 'radial-gradient(at 0% 0%, rgba(31, 104, 249, 0.15) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(31, 104, 249, 0.1) 0px, transparent 50%)'
      }}
    >
      {/* Top Navigation */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200/10 px-6 py-4 lg:px-12 z-20 bg-transparent">
        <div className="flex items-center gap-3">
          <div className="size-8 text-[#1f68f9] flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl">task_alt</span>
          </div>
          <h2 className="text-white text-xl font-bold leading-tight tracking-tight">TaskMaster</h2>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-sm text-slate-400">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </span>
          <button
            onClick={toggleAuthMode}
            className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 border border-slate-700 text-white text-sm font-semibold hover:bg-slate-800 transition-colors"
          >
            {isLogin ? "Sign up" : "Log in"}
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row z-10">
        {/* Left Side: Hero Branding */}
        <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-20 lg:py-24 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-[#1f68f9]/10 text-[#1f68f9] ring-1 ring-inset ring-[#1f68f9]/20 mb-6">
              New Version 4.0 is live
            </div>
            <h1 className="text-4xl md:text-6xl font-black leading-[1.1] tracking-tight text-white mb-6 transition-all duration-500">
              {isLogin ? (
                <>Welcome back to your <span className="text-[#1f68f9]">workspace</span></>
              ) : (
                <>Join thousands of teams <span className="text-[#1f68f9]">today</span></>
              )}
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-lg mb-10 leading-relaxed">
              Experience the future of task management. Boost productivity with automated workflows, real-time collaboration, and enterprise-grade security.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 size-10 rounded-lg bg-[#1f68f9]/10 flex items-center justify-center text-[#1f68f9]">
                  <span className="material-symbols-outlined">bolt</span>
                </div>
                <div>
                  <h4 className="font-bold text-white">Fast Setup</h4>
                  <p className="text-sm text-slate-400 leading-snug">Get your team onboarded in minutes, not hours.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 size-10 rounded-lg bg-[#1f68f9]/10 flex items-center justify-center text-[#1f68f9]">
                  <span className="material-symbols-outlined">security</span>
                </div>
                <div>
                  <h4 className="font-bold text-white">Secure Data</h4>
                  <p className="text-sm text-slate-400 leading-snug">End-to-end encryption for all your sensitive projects.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Abstract Visual Decoration */}
          <div className="absolute -bottom-24 -left-24 size-96 bg-[#1f68f9]/20 rounded-full blur-[120px] opacity-30 pointer-events-none"></div>
          <div className="absolute top-1/2 right-0 size-64 bg-[#1f68f9]/30 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
        </div>

        {/* Right Side: Auth Form */}
        <div className="w-full lg:w-[540px] flex flex-col justify-center px-6 py-12 lg:px-12 bg-slate-900/40 border-l border-slate-800">
          {/* Glass Panel Container */}
          <div className="w-full max-w-md mx-auto bg-[#1b1f27]/70 backdrop-blur-md border border-white/5 p-8 rounded-2xl shadow-2xl overflow-hidden min-h-[600px] flex flex-col justify-center">
            {/* Form Wrapper with Animation */}
            <div key={isLogin ? 'login' : 'signup'} className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out fill-mode-both">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white">
                  {isLogin ? 'Sign in to TaskMaster' : 'Create your account'}
                </h2>
                <p className="text-slate-400 mt-1">
                  {isLogin ? 'Enter your details below to continue.' : 'Start your 14-day free trial today.'}
                </p>
              </div>

              {/* Error Message */}
              {(localError || error) && (
                <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                  <p className="text-sm text-red-400">
                    {localError || error}
                  </p>
                </div>
              )}

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-4">
                  {/* Name Field - Only show on Sign Up */}
                  {!isLogin && (
                    <div className="animate-in fade-in zoom-in-95 duration-300">
                      <label className="block text-sm font-medium text-slate-300 mb-1.5">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        placeholder="Alex Johnson"
                        value={formData.fullName}
                        onChange={handleChange}
                        required={!isLogin}
                        className="w-full rounded-lg border border-slate-700 bg-slate-800/50 text-white focus:ring-2 focus:ring-[#1f68f9] focus:border-[#1f68f9] px-4 py-3 placeholder:text-slate-500 transition-all outline-none"
                      />
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-slate-700 bg-slate-800/50 text-white focus:ring-2 focus:ring-[#1f68f9] focus:border-[#1f68f9] px-4 py-3 placeholder:text-slate-500 transition-all outline-none"
                    />
                  </div>
                  {isLogin ? (
                    // Login Password View
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="block text-sm font-medium text-slate-300">Password</label>
                        <Link href="#" className="text-xs text-[#1f68f9] hover:underline">Forgot password?</Link>
                      </div>
                      <input
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-slate-700 bg-slate-800/50 text-white focus:ring-2 focus:ring-[#1f68f9] focus:border-[#1f68f9] px-4 py-3 placeholder:text-slate-500 transition-all outline-none"
                      />
                    </div>
                  ) : (
                    // Sign Up Password View
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
                        <input
                          type="password"
                          name="password"
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={handleChange}
                          required={!isLogin}
                          className="w-full rounded-lg border border-slate-700 bg-slate-800/50 text-white focus:ring-2 focus:ring-[#1f68f9] focus:border-[#1f68f9] px-4 py-3 placeholder:text-slate-500 transition-all outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">Confirm</label>
                        <input
                          type="password"
                          name="confirmPassword"
                          placeholder="••••••••"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required={!isLogin}
                          className="w-full rounded-lg border border-slate-700 bg-slate-800/50 text-white focus:ring-2 focus:ring-[#1f68f9] focus:border-[#1f68f9] px-4 py-3 placeholder:text-slate-500 transition-all outline-none"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {!isLogin && (
                  <div className="flex items-center mt-4">
                    <input
                      id="terms"
                      name="agreedToTerms"
                      type="checkbox"
                      checked={formData.agreedToTerms}
                      onChange={handleChange}
                      className="h-4 w-4 rounded border-slate-700 text-[#1f68f9] focus:ring-[#1f68f9] bg-slate-800/50"
                    />
                    <label htmlFor="terms" className="ml-2 block text-xs text-slate-400">
                      I agree to the <Link href="#" className="text-[#1f68f9] hover:underline">Terms of Service</Link> and <Link href="#" className="text-[#1f68f9] hover:underline">Privacy Policy</Link>
                    </label>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center rounded-lg bg-[#1f68f9] py-3.5 mt-6 text-white font-bold hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (isLogin ? 'Signing in...' : 'Creating account...') : (isLogin ? 'Sign In' : 'Create Account')}
                </button>

                {/* Divider */}
                <div className="relative py-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-700"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-[#1b1f27] px-2 text-slate-400">Or continue with</span>
                  </div>
                </div>

                {/* Social Login */}
                <div className="grid grid-cols-2 gap-4">
                  <button type="button" className="flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-800/50 py-2.5 px-4 text-sm font-semibold text-slate-200 hover:bg-slate-800 transition-all">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"></path>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"></path>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"></path>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"></path>
                    </svg>
                    Google
                  </button>
                  <button type="button" className="flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-800/50 py-2.5 px-4 text-sm font-semibold text-slate-200 hover:bg-slate-800 transition-all">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path>
                    </svg>
                    GitHub
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Info */}
      <footer className="p-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 z-10 border-t border-slate-800">
        <p>© 2024 TaskMaster Inc. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="#" className="hover:text-white transition-colors">Security</Link>
          <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
          <Link href="#" className="hover:text-white transition-colors">Status</Link>
        </div>
      </footer>
    </div>
  );
}
