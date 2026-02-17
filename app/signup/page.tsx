"use client"
import React, { useState } from 'react';
import Link from 'next/link';

const TaskMasterSignup: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreedToTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sign Up Data:', formData);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--background)] p-4 font-display text-[var(--foreground)]">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-2xl dark:border-slate-800 dark:bg-[#1a202c]">
        
        {/* Header */}
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#1f68f9] text-white shadow-lg shadow-blue-500/20">
            <span className="material-symbols-outlined text-3xl">task_alt</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Create an Account
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Join TaskMaster to organize your work.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {/* Full Name */}
          <div>
            <label
              className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
              htmlFor="fullName"
            >
              Full Name
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <span className="material-symbols-outlined text-xl">person</span>
              </span>
              <input
                className="block w-full rounded-lg border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-3 text-sm text-slate-900 placeholder-slate-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#1f68f9] dark:border-slate-700 dark:bg-[#272d3a] dark:text-white"
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Alex Morgan"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
              htmlFor="email"
            >
              Email Address
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <span className="material-symbols-outlined text-xl">mail</span>
              </span>
              <input
                className="block w-full rounded-lg border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-3 text-sm text-slate-900 placeholder-slate-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#1f68f9] dark:border-slate-700 dark:bg-[#272d3a] dark:text-white"
                id="email"
                name="email"
                type="email"
                placeholder="alex@taskmaster.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <span className="material-symbols-outlined text-xl">lock</span>
              </span>
              <input
                className="block w-full rounded-lg border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-3 text-sm text-slate-900 placeholder-slate-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#1f68f9] dark:border-slate-700 dark:bg-[#272d3a] dark:text-white"
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label
              className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <span className="material-symbols-outlined text-xl">
                  lock_reset
                </span>
              </span>
              <input
                className="block w-full rounded-lg border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-3 text-sm text-slate-900 placeholder-slate-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#1f68f9] dark:border-slate-700 dark:bg-[#272d3a] dark:text-white"
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Terms Checkbox */}
          <div className="mt-2 flex items-start">
            <div className="flex h-5 items-center">
              <input
                className="h-4 w-4 rounded border-slate-300 bg-slate-50 text-[#1f68f9] focus:ring-[#1f68f9] dark:border-slate-600 dark:bg-[#272d3a]"
                id="terms"
                name="agreedToTerms"
                type="checkbox"
                checked={formData.agreedToTerms}
                onChange={handleChange}
                required
              />
            </div>
            <div className="ml-3 text-sm">
              <label
                className="font-medium text-slate-700 dark:text-slate-300"
                htmlFor="terms"
              >
                I agree to the{' '}
                <a className="text-[#1f68f9] hover:text-blue-500" href="#">
                  Terms
                </a>{' '}
                and{' '}
                <a className="text-[#1f68f9] hover:text-blue-500" href="#">
                  Privacy Policy
                </a>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 flex w-full justify-center rounded-lg border border-transparent bg-[#1f68f9] px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-[#1f68f9] focus:ring-offset-2"
          >
            Create Account
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Already have an account?{' '}
            <Link
              href="/"
              className="font-semibold text-[#1f68f9] transition-colors hover:text-blue-500"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaskMasterSignup;
