'use client';

import React, { useState } from 'react';
import NewTaskModal from './NewTaskModal';

export default function NewTaskButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsModalOpen(true)}
        className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 bg-[#1f68f9] hover:bg-blue-600 transition-colors text-white text-sm font-bold leading-normal tracking-[0.015em] shadow-lg shadow-blue-500/20"
      >
        <span className="material-symbols-outlined mr-2 text-xl">add</span>
        <span className="truncate">New Task</span>
      </button>

      {/* The Modal itself */}
      <NewTaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}