'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface HelpModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
    const [mounted, setMounted] = useState(false);
    const [activeTab, setActiveTab] = useState<'about' | 'navigation' | 'faq'>('about');

    useEffect(() => {
        setMounted(true);
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!mounted || !isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">

            {/* Click outside to close */}
            <div className="absolute inset-0" onClick={onClose}></div>

            {/* Modal Content */}
            <div className="relative w-full max-w-2xl bg-white dark:bg-[#1e293b] rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0f1623] rounded-t-xl">
                    <div className="flex items-center gap-3">
                        <div className="bg-center bg-no-repeat bg-cover rounded-full size-10 bg-[#1f68f9] flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                            <span className="material-symbols-outlined text-2xl">help</span>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                                Help & Documentation
                            </h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                everything you need to know about TaskMaster.
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full"
                    >
                        <span className="material-symbols-outlined text-xl">close</span>
                    </button>
                </div>

                <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
                    {/* Sidebar Tabs */}
                    <div className="w-full md:w-48 border-r border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0f1623] p-4 flex flex-col gap-2 overflow-y-auto">
                        <button
                            onClick={() => setActiveTab('about')}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'about' ? 'bg-[#1f68f9]/10 text-[#1f68f9]' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                        >
                            <span className="material-symbols-outlined text-lg">info</span>
                            About
                        </button>
                        <button
                            onClick={() => setActiveTab('navigation')}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'navigation' ? 'bg-[#1f68f9]/10 text-[#1f68f9]' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                        >
                            <span className="material-symbols-outlined text-lg">map</span>
                            Navigation
                        </button>
                        <button
                            onClick={() => setActiveTab('faq')}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'faq' ? 'bg-[#1f68f9]/10 text-[#1f68f9]' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                        >
                            <span className="material-symbols-outlined text-lg">quiz</span>
                            FAQ
                        </button>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar bg-white dark:bg-[#1e293b]">
                        {activeTab === 'about' && (
                            <div className="space-y-6 animate-in fade-in duration-300">
                                <section>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Welcome to TaskMaster Pro</h3>
                                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                                        TaskMaster Pro is your ultimate workspace for managing personal tasks and team projects.
                                        Designed for speed and simplicity, it helps you stay organized and boost your productivity.
                                    </p>
                                </section>

                                <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0f1623]">
                                        <span className="material-symbols-outlined text-[#1f68f9] mb-2">check_circle</span>
                                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">Review Tasks</h4>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                            Track your daily progress and complete pending items effortlessly.
                                        </p>
                                    </div>
                                    <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0f1623]">
                                        <span className="material-symbols-outlined text-purple-500 mb-2">bar_chart</span>
                                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">Productivity Graph</h4>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                            Visualize your performance over the last 7 days with dynamic charts.
                                        </p>
                                    </div>
                                </section>
                            </div>
                        )}

                        {activeTab === 'navigation' && (
                            <div className="space-y-6 animate-in fade-in duration-300">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Navigating the Workspace</h3>

                                <div className="space-y-4">
                                    <div className="flex gap-4">
                                        <div className="size-10 rounded-lg bg-slate-100 dark:bg-[#0f1623] flex items-center justify-center shrink-0">
                                            <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">dashboard</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 dark:text-white text-sm">Dashboard</h4>
                                            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                                                Your central hub. View high-level stats, upcoming deadlines, and your productivity graph.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="size-10 rounded-lg bg-slate-100 dark:bg-[#0f1623] flex items-center justify-center shrink-0">
                                            <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">check_circle</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 dark:text-white text-sm">My Tasks</h4>
                                            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                                                The core task manager. Use <strong>Drag & Drop</strong> to organize tasks between Today, Upcoming, and Later.
                                                Click any task to Edit or Delete it.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="size-10 rounded-lg bg-slate-100 dark:bg-[#0f1623] flex items-center justify-center shrink-0">
                                            <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">notifications</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 dark:text-white text-sm">Notifications</h4>
                                            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                                                Stay updated with real-time alerts. Click the bell icon to see recent activity.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'faq' && (
                            <div className="space-y-6 animate-in fade-in duration-300">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Frequently Asked Questions</h3>

                                <div className="space-y-4">
                                    <details className="group p-4 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer">
                                        <summary className="flex justify-between items-center font-bold text-slate-900 dark:text-white text-sm list-none">
                                            How do I create a new task?
                                            <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                                        </summary>
                                        <p className="text-slate-600 dark:text-slate-300 text-sm mt-3 leading-relaxed">
                                            Click the blue <strong>"New Task"</strong> button in the sidebar or the top right corner of the dashboard. Fill in the details and click "Create Task".
                                        </p>
                                    </details>

                                    <details className="group p-4 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer">
                                        <summary className="flex justify-between items-center font-bold text-slate-900 dark:text-white text-sm list-none">
                                            Can I attach files to tasks?
                                            <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                                        </summary>
                                        <p className="text-slate-600 dark:text-slate-300 text-sm mt-3 leading-relaxed">
                                            Yes! When creating or editing a task, scroll down to the <strong>Attachments</strong> section and click the upload area to add mock files.
                                        </p>
                                    </details>

                                    <details className="group p-4 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer">
                                        <summary className="flex justify-between items-center font-bold text-slate-900 dark:text-white text-sm list-none">
                                            How does the Productivity Graph work?
                                            <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                                        </summary>
                                        <p className="text-slate-600 dark:text-slate-300 text-sm mt-3 leading-relaxed">
                                            The graph updates automatically whenever you mark a task as "Done". It tracks your completed tasks over the last 7 days.
                                        </p>
                                    </details>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 md:p-6 border-t border-slate-200 dark:border-slate-700 flex justify-end bg-slate-50 dark:bg-[#1e293b] rounded-b-xl">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-lg bg-[#1f68f9] hover:bg-blue-600 text-white font-medium text-sm shadow-lg shadow-blue-500/20 transition-colors"
                    >
                        Got it, thanks!
                    </button>
                </div>

            </div>
        </div>,
        document.body
    );
};

export default HelpModal;
