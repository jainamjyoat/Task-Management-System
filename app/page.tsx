'use client'

import React, { useState } from 'react';

const TaskMasterLogin: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Logging in with:', { email, password });
  };

  return (
    // Used var(--background) to match your global theme
    <div className="flex min-h-screen flex-1 bg-[var(--background)] text-[var(--foreground)] font-display">
      
      {/* Left Side: Branding (Always Dark Slate) */}
      <div className="relative hidden w-0 flex-1 lg:block bg-slate-900">
        <div className="flex h-full flex-col justify-between p-12 relative z-10">
          
          {/* Logo */}
          <div className="flex gap-3 items-center">
            <div className="bg-indigo-600 rounded-xl size-10 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
              <span className="material-symbols-outlined text-2xl">task_alt</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-white text-lg font-bold leading-tight tracking-wide">
                TaskMaster
              </h1>
            </div>
          </div>

          {/* Hero Text */}
          <div className="space-y-6 max-w-lg">
            <h2 className="text-4xl font-extrabold text-white leading-tight">
              Organize your work, <br />
              <span className="text-indigo-500">amplify your team.</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              Join thousands of teams using TaskMaster to streamline their
              workflow, track progress, and collaborate seamlessly in real-time.
            </p>
            
            {/* Social Proof */}
            <div className="flex items-center gap-4 mt-8">
              <div className="flex -space-x-3">
                {[0, 1, 2].map((i) => (
                  <img
                    key={i}
                    alt={`User ${i + 1}`}
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-900 object-cover"
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`}
                  />
                ))}
                <div className="flex items-center justify-center h-10 w-10 rounded-full ring-2 ring-slate-900 bg-slate-800 text-xs font-medium text-white">
                  +2k
                </div>
              </div>
              <p className="text-slate-400 text-sm">
                Trusted by top performing teams
              </p>
            </div>
          </div>

          {/* Footer Links */}
          <div className="flex gap-6 text-sm text-slate-500">
            <a className="hover:text-white transition-colors" href="#">
              Privacy Policy
            </a>
            <a className="hover:text-white transition-colors" href="#">
              Terms of Service
            </a>
          </div>
        </div>

        {/* Background Image & Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')",
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/90 to-slate-900/80" />
      </div>

      {/* Right Side: Login Form */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          
          {/* Mobile Logo (Visible only on small screens) */}
          <div className="lg:hidden flex gap-2 items-center mb-8">
            <div className="bg-indigo-600 rounded-lg size-8 flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-xl">
                task_alt
              </span>
            </div>
            <span className="font-bold text-lg">
              TaskMaster
            </span>
          </div>

          <div>
            <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              Welcome back! Please enter your details.
            </p>
          </div>

          <div className="mt-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  className="block text-sm font-medium leading-6"
                  htmlFor="email"
                >
                  Email address
                </label>
                <div className="mt-2 relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="material-symbols-outlined text-gray-400 text-[20px]">
                      mail
                    </span>
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="block w-full rounded-lg border-0 py-2.5 pl-10 text-[var(--foreground)] bg-transparent shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:ring-gray-700 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-medium leading-6"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="mt-2 relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="material-symbols-outlined text-gray-400 text-[20px]">
                      lock
                    </span>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-lg border-0 py-2.5 pl-10 text-[var(--foreground)] bg-transparent shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:ring-gray-700 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-lg bg-indigo-600 px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-200"
                >
                  Sign in
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Don't have an account?{' '}
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Sign up for free
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskMasterLogin;