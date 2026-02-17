'use client'; // 1. Add this at the very top because we need hooks

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // 2. Import usePathname
import NewTaskButton from '../component/NewTaskButton';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); // 3. Get the current URL path

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[var(--background)] text-[var(--foreground)] font-display">
      
      {/* Sidebar */}
      <aside className="hidden lg:flex w-72 flex-col justify-between border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-[#111318] p-4 z-10">
        <div className="flex flex-col gap-4">
          
          {/* Brand */}
          <div className="flex gap-3 px-2 py-2 items-center">
            <div className="bg-center bg-no-repeat bg-cover rounded-full size-10 bg-[#1f68f9] flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <span className="material-symbols-outlined text-2xl">task_alt</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-slate-900 dark:text-white text-base font-bold leading-normal">
                TaskMaster
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">
                Pro Workspace
              </p>
            </div>
          </div>

          {/* 4. Updated Navigation - Pass 'pathname' to NavItem */}
          <nav className="flex flex-col gap-2 mt-4">
            <NavItem href="/dashboard" icon="dashboard" label="Dashboard" currentPath={pathname} />
            {/* Note: Fixed typo 'dashbord' -> 'dashboard' */}
            <NavItem href="/dashboard/tasks" icon="check_circle" label="My Tasks" currentPath={pathname} />
            <NavItem href="/dashboard/projects" icon="folder" label="Projects" currentPath={pathname} />
            <NavItem href="/dashboard/teams" icon="group" label="Teams" currentPath={pathname} />
            <NavItem href="/dashboard/settings" icon="settings" label="Settings" currentPath={pathname} />
          </nav>
        </div>

        {/* ... Rest of Sidebar (New Task Button, Profile) ... */}
        <div className="flex flex-col gap-4">
          <NewTaskButton />
          
          <div className="flex items-center gap-3 px-2 py-2 mt-2 border-t border-slate-200 dark:border-slate-800 pt-4">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" 
              alt="Profile" 
              className="rounded-full size-10 bg-slate-200 object-cover"
            />
            <div className="flex flex-col">
              <p className="text-slate-900 dark:text-white text-sm font-medium">
                Alex Morgan
              </p>
              <p className="text-slate-500 dark:text-slate-400 text-xs">
                alex@taskmaster.com
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-slate-50 dark:bg-[#0f1623]">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-[#111318] sticky top-0 z-20">
            <button className="lg:hidden text-slate-500 dark:text-white">
                <span className="material-symbols-outlined">menu</span>
            </button>
            <div className="hidden md:flex max-w-md w-full ml-4">
                <div className="flex w-full items-center rounded-lg bg-slate-100 dark:bg-[#272d3a] px-3 h-10 border border-transparent focus-within:border-[#1f68f9] transition-colors">
                <span className="material-symbols-outlined text-slate-400">search</span>
                <input 
                    className="w-full bg-transparent border-none focus:ring-0 text-sm text-slate-900 dark:text-white placeholder-slate-400 ml-2" 
                    placeholder="Search tasks, projects..."
                />
                </div>
            </div>
            <div className="flex items-center gap-4">
                <button className="relative p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#272d3a] rounded-full transition-colors">
                    <span className="material-symbols-outlined">notifications</span>
                    <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-[#111318]"></span>
                </button>
                <button className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#272d3a] rounded-full transition-colors">
                    <span className="material-symbols-outlined">help</span>
                </button>
            </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="max-w-[1200px] mx-auto flex flex-col gap-8">
                {children}
            </div>
        </div>
      </main>
    </div>
  );
}

// 5. Updated NavItem Helper Component
function NavItem({ 
  href, 
  icon, 
  label, 
  currentPath 
}: { 
  href: string; 
  icon: string; 
  label: string; 
  currentPath: string; 
}) {
  // Check if the current path matches the href exactly
  const isActive = currentPath === href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
        isActive
          ? 'bg-[#1f68f9]/10 text-[#1f68f9] dark:bg-[#272d3a] dark:text-white' // Active Styles
          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#1f242f]' // Inactive Styles
      }`}
    >
      <span 
        className="material-symbols-outlined" 
        style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
      >
        {icon}
      </span>
      <span className="text-sm font-medium leading-normal">{label}</span>
    </Link>
  );
}