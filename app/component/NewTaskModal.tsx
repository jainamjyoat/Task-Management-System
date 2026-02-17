'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface NewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewTaskModal: React.FC<NewTaskModalProps> = ({ isOpen, onClose }) => {
  const [mounted, setMounted] = useState(false);

  // Ensure we only try to use the portal on the client-side
  useEffect(() => {
    setMounted(true);
    // Optional: Lock body scroll when modal is open
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

  // This renders the modal directly into the <body> tag, 
  // ensuring it sits on top of EVERYTHING (Header, Sidebar, etc.)
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#1e293b] rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Create New Task</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Add details for a new item in your workspace.</p>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
          <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
            
            {/* Task Title */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="task-title">
                Task Title <span className="text-red-500">*</span>
              </label>
              <input 
                className="w-full rounded-lg bg-slate-50 dark:bg-[#0f1623] border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-[#1f68f9]/50 focus:border-[#1f68f9] transition-all p-3 text-sm outline-none" 
                id="task-title" 
                placeholder="e.g. Redesign Landing Page Homepage" 
                type="text" 
                autoFocus
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Description</label>
              <div className="w-full rounded-lg bg-slate-50 dark:bg-[#0f1623] border border-slate-200 dark:border-slate-700 overflow-hidden focus-within:ring-2 focus-within:ring-[#1f68f9]/50 focus-within:border-[#1f68f9] transition-all">
                <div className="flex items-center gap-1 p-2 border-b border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-[#1e293b]">
                  <button className="p-1.5 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-600 rounded transition-colors" type="button"><span className="material-symbols-outlined text-lg">format_bold</span></button>
                  <button className="p-1.5 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-600 rounded transition-colors" type="button"><span className="material-symbols-outlined text-lg">format_italic</span></button>
                  <button className="p-1.5 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-600 rounded transition-colors" type="button"><span className="material-symbols-outlined text-lg">format_list_bulleted</span></button>
                  <button className="p-1.5 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-600 rounded transition-colors" type="button"><span className="material-symbols-outlined text-lg">link</span></button>
                </div>
                <textarea 
                  className="w-full bg-transparent border-none p-3 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-0 text-sm resize-none outline-none" 
                  placeholder="Add a detailed description..." 
                  rows={5}
                ></textarea>
              </div>
            </div>

            {/* 3 Col Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Priority</label>
                <div className="relative">
                  <select className="w-full appearance-none rounded-lg bg-slate-50 dark:bg-[#0f1623] border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white p-3 pr-10 text-sm focus:ring-2 focus:ring-[#1f68f9]/50 focus:border-[#1f68f9] outline-none">
                    <option value="high">High Priority</option>
                    <option defaultValue="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-3 pointer-events-none text-slate-500">expand_more</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Status</label>
                <div className="relative">
                  <select className="w-full appearance-none rounded-lg bg-slate-50 dark:bg-[#0f1623] border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white p-3 pr-10 text-sm focus:ring-2 focus:ring-[#1f68f9]/50 focus:border-[#1f68f9] outline-none">
                    <option defaultValue="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="review">Review</option>
                    <option value="done">Done</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-3 pointer-events-none text-slate-500">expand_more</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Due Date</label>
                <input className="w-full rounded-lg bg-slate-50 dark:bg-[#0f1623] border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 p-3 text-sm focus:ring-2 focus:ring-[#1f68f9]/50 focus:border-[#1f68f9] outline-none [color-scheme:dark]" type="date"/>
              </div>
            </div>

            {/* Assignee */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Assignee</label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-3 top-3 text-slate-400">person_search</span>
                <input className="w-full pl-10 rounded-lg bg-slate-50 dark:bg-[#0f1623] border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 p-3 text-sm focus:ring-2 focus:ring-[#1f68f9]/50 focus:border-[#1f68f9] outline-none" placeholder="Search team member..." type="text"/>
              </div>
            </div>

            {/* Attachments */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Attachments</label>
              <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-8 flex flex-col items-center justify-center text-center hover:bg-slate-50 dark:hover:bg-[#0f1623] transition-colors cursor-pointer group">
                <span className="material-symbols-outlined text-3xl text-slate-400 group-hover:text-[#1f68f9] transition-colors mb-2">cloud_upload</span>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Click to upload or drag and drop</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">SVG, PNG, JPG or GIF (max. 800x400px)</p>
              </div>
            </div>

          </form>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3 bg-slate-50 dark:bg-[#1e293b] rounded-b-xl">
          <button 
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            Cancel
          </button>
          <button className="px-5 py-2.5 rounded-lg bg-[#1f68f9] hover:bg-blue-600 text-white font-medium text-sm shadow-lg shadow-blue-500/20 transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">add</span>
            Create Task
          </button>
        </div>

      </div>
    </div>,
    document.body
  );
};

export default NewTaskModal;