import React, { useState } from 'react';
import { useTeamStore, MemberStatus } from '../store/teamStore';

interface NewMemberModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function NewMemberModal({ isOpen, onClose }: NewMemberModalProps) {
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [status, setStatus] = useState<MemberStatus>('Available');
    const { addMember } = useTeamStore();

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addMember({ name, role, status });
        onClose();
        setName('');
        setRole('');
        setStatus('Available');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-[#1e293b] rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Add Team Member</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-[#0f1623] border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#1f68f9] outline-none transition-all"
                            placeholder="e.g. Alex Morgan"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Role
                        </label>
                        <input
                            type="text"
                            required
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-[#0f1623] border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#1f68f9] outline-none transition-all"
                            placeholder="e.g. Frontend Developer"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Initial Status
                        </label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value as MemberStatus)}
                            className="w-full bg-slate-50 dark:bg-[#0f1623] border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#1f68f9] outline-none transition-all appearance-none"
                        >
                            <option value="Available">Available</option>
                            <option value="Busy">Busy</option>
                            <option value="On Leave">On Leave</option>
                            <option value="Offline">Offline</option>
                        </select>
                    </div>

                    <div className="flex justify-end gap-3 mt-6 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-[#1f68f9] hover:bg-blue-600 text-white font-bold rounded-lg shadow-lg shadow-blue-500/20 transition-all"
                        >
                            Add Member
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
