'use client';

import React, { useState } from 'react';

export default function SettingsPage() {
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [desktopNotifs, setDesktopNotifs] = useState(false);

  return (
    <div className="flex flex-col h-full max-w-[1000px] mx-auto w-full">
      {/* Page Header */}
      <div className="flex flex-col gap-1 mb-8">
        <h1 className="text-slate-900 dark:text-white text-3xl font-bold tracking-tight">
          Settings
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-base">
          Manage your workspace preferences and account settings.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 pb-8">
        
        {/* --- Appearance Section --- */}
        {/* <section className="flex flex-col gap-4 rounded-xl p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e293b] shadow-sm">
          <div className="flex flex-col gap-1 mb-2">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Appearance</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Customize how TaskMaster looks on your device.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ThemeOption label="Light" value="light" active />
            <ThemeOption label="Dark" value="dark" />
            <ThemeOption label="System" value="system" icon="settings_brightness" />
          </div>
        </section> */}

        {/* --- Notifications Section --- */}
        <section className="flex flex-col gap-4 rounded-xl p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e293b] shadow-sm">
          <div className="flex flex-col gap-1 mb-2">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Notifications</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Choose how you want to be notified about updates.
            </p>
          </div>
          
          <div className="flex flex-col gap-6 divide-y divide-slate-100 dark:divide-slate-800">
            <NotificationToggle 
              label="Email Notifications" 
              desc="Receive daily summaries and important alerts via email."
              checked={emailNotifs}
              onChange={setEmailNotifs}
            />
            <NotificationToggle 
              label="Push Notifications" 
              desc="Get real-time updates on your mobile device."
              checked={pushNotifs}
              onChange={setPushNotifs}
            />
            <NotificationToggle 
              label="Desktop Notifications" 
              desc="Show pop-up notifications on your desktop."
              checked={desktopNotifs}
              onChange={setDesktopNotifs}
            />
          </div>
        </section>

        {/* --- Language & Region Section --- */}
        <section className="flex flex-col gap-4 rounded-xl p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e293b] shadow-sm">
          <div className="flex flex-col gap-1 mb-2">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Language & Region</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Set your preferred language and regional format.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectField label="Language" options={['English (United States)', 'Spanish (Español)', 'French (Français)', 'German (Deutsch)', 'Japanese (日本語)']} />
            <SelectField label="Time Zone" options={['(UTC-08:00) Pacific Time', '(UTC-05:00) Eastern Time', '(UTC+00:00) London', '(UTC+01:00) Paris', '(UTC+09:00) Tokyo']} />
          </div>
        </section>

        {/* --- Account Session Section --- */}
        <section className="flex flex-col gap-4 rounded-xl p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1e293b] shadow-sm">
          <div className="flex flex-col gap-1 mb-2">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Account Session</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Manage your active session and sign out.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-sm text-slate-500 dark:text-slate-400">
               You are currently logged in as <span className="text-slate-900 dark:text-white font-medium">alex@taskmaster.com</span>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors text-sm font-medium w-fit">
                <span className="material-symbols-outlined text-lg">logout</span>
                Log Out
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}

// --- Helper Components ---

function ThemeOption({ label, value, icon, active }: { label: string, value: string, icon?: string, active?: boolean }) {
    return (
        <label className="cursor-pointer group">
            <input type="radio" name="theme" value={value} className="peer sr-only" defaultChecked={active} />
            <div className="rounded-lg border-2 border-slate-200 dark:border-slate-700 p-4 hover:border-[#1f68f9] peer-checked:border-[#1f68f9] peer-checked:bg-[#1f68f9]/5 dark:peer-checked:bg-[#1f68f9]/10 transition-all">
                <div className={`mb-3 h-24 w-full rounded border overflow-hidden relative ${value === 'light' ? 'bg-slate-100 border-slate-200' : value === 'dark' ? 'bg-slate-900 border-slate-700' : 'bg-gradient-to-br from-slate-100 to-slate-900 border-slate-200 dark:border-slate-700 flex items-center justify-center'}`}>
                    {value === 'light' && (
                        <>
                            <div className="absolute top-2 left-2 right-2 h-2 w-1/4 bg-white rounded-sm shadow-sm"></div>
                            <div className="absolute top-6 left-2 right-2 bottom-2 bg-white rounded-sm shadow-sm flex flex-col gap-1 p-2">
                                <div className="w-full h-2 bg-slate-100 rounded-sm"></div>
                                <div className="w-2/3 h-2 bg-slate-100 rounded-sm"></div>
                            </div>
                        </>
                    )}
                    {value === 'dark' && (
                        <>
                            <div className="absolute top-2 left-2 right-2 h-2 w-1/4 bg-slate-800 rounded-sm"></div>
                            <div className="absolute top-6 left-2 right-2 bottom-2 bg-slate-800 rounded-sm flex flex-col gap-1 p-2">
                                <div className="w-full h-2 bg-slate-700 rounded-sm"></div>
                                <div className="w-2/3 h-2 bg-slate-700 rounded-sm"></div>
                            </div>
                        </>
                    )}
                    {value === 'system' && (
                        <span className="material-symbols-outlined text-4xl text-slate-500">{icon}</span>
                    )}
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{label}</span>
                    <span className="material-symbols-outlined text-[#1f68f9] opacity-0 peer-checked:opacity-100 transition-opacity">check_circle</span>
                </div>
            </div>
        </label>
    );
}

function NotificationToggle({ label, desc, checked, onChange }: { label: string, desc: string, checked: boolean, onChange: (v: boolean) => void }) {
    return (
        <div className="flex items-center justify-between pt-4 first:pt-0">
            <div className="flex flex-col pr-4">
                <span className="text-sm font-medium text-slate-900 dark:text-white">{label}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">{desc}</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
                <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#1f68f9]"></div>
            </label>
        </div>
    );
}

function SelectField({ label, options }: { label: string, options: string[] }) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>
            <div className="relative">
                <select className="w-full rounded-lg bg-slate-50 dark:bg-[#0f1623] border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm p-2.5 focus:ring-[#1f68f9] focus:border-[#1f68f9]">
                    {options.map((opt, i) => (
                        <option key={i}>{opt}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}