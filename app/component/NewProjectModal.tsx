'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useProjectStore, Project, ProjectStatus, TeamMember } from '../store/projectStore';

interface ProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    projectToEdit?: Project | null;
}

const NewProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, projectToEdit }) => {
    const [mounted, setMounted] = useState(false);
    const { addProject, updateProject, deleteProject } = useProjectStore();

    // Form State
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState<ProjectStatus>('Active');
    const [dueDate, setDueDate] = useState('');

    // Team Member State
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [newMemberId, setNewMemberId] = useState('');

    // Effect to populate form when editing
    useEffect(() => {
        if (isOpen) {
            if (projectToEdit) {
                setTitle(projectToEdit.title);
                setDescription(projectToEdit.description);
                setProgress(projectToEdit.progress);
                setStatus(projectToEdit.status);
                setDueDate(projectToEdit.dueDate.split('T')[0]);
                setTeamMembers(projectToEdit.teamMembers);
            } else {
                // Reset for new project
                setTitle('');
                setDescription('');
                setProgress(0);
                setStatus('Active');
                setDueDate(new Date().toISOString().split('T')[0]);
                setTeamMembers([]);
            }
        }
    }, [isOpen, projectToEdit]);

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

    const handleAddMember = () => {
        if (!newMemberId.trim()) return;
        if (teamMembers.some(m => m.id === newMemberId)) {
            alert('Member already added');
            return;
        }
        setTeamMembers([...teamMembers, { id: newMemberId, role: 'Member' }]);
        setNewMemberId('');
    };

    const handleRemoveMember = (id: string) => {
        setTeamMembers(teamMembers.filter(m => m.id !== id));
    };

    const handleSetLeader = (id: string) => {
        setTeamMembers(teamMembers.map(m => ({
            ...m,
            role: m.id === id ? 'Leader' : 'Member' // Only one leader? Or multiple? Logic: Set selected to Leader, others remain as is. 
            // If strict single leader:
            //role: m.id === id ? 'Leader' : 'Member'
        })));
        // If allowing multiple leaders, just toggle? Let's stick to single leader for now to match 'Project Leader' request, 
        // but typically projects might have 1 leader. 
        // Let's just toggle 'Leader' role for the specific one, but usually it implies others are NOT leaders if we engage a radio logic.
        // For simplicity, let's treat it as: Click star -> become Leader. 
        // Refined logic: Set this one to Leader, set all others to Member (Single Leader)
        const updatedMembers = teamMembers.map(m => ({
            ...m,
            role: (m.id === id ? 'Leader' : 'Member') as 'Leader' | 'Member'
        }));
        setTeamMembers(updatedMembers);
    };


    const handleSubmit = () => {
        if (!title.trim()) {
            alert('Project title is required');
            return;
        }

        const projectData = {
            title,
            description,
            progress,
            status,
            dueDate: new Date(dueDate).toISOString(),
            teamMembers,
            // Default icon logic (random or fixed for now)
            icon: 'folder',
            iconBg: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
            statusColor: getStatusColor(status),
            taskCount: `${Math.floor(Math.random() * 20)} Tasks`, // Mock
        };

        if (projectToEdit) {
            updateProject(projectToEdit.id, projectData);
        } else {
            addProject(projectData);
        }

        onClose();
    };

    const getStatusColor = (s: ProjectStatus) => {
        switch (s) {
            case 'Active': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
            case 'Pending Review': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
            case 'Completed': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
            case 'Archived': return 'bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400';
            default: return 'bg-slate-100 text-slate-700';
        }
    }

    const handleDelete = () => {
        if (projectToEdit && confirm('Are you sure you want to delete this project?')) {
            deleteProject(projectToEdit.id);
            onClose();
        }
    };

    if (!mounted || !isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="absolute inset-0" onClick={onClose}></div>
            <div className="relative w-full max-w-2xl bg-white dark:bg-[#1e293b] rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                            {projectToEdit ? 'Edit Project' : 'Create New Project'}
                        </h2>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full">
                        <span className="material-symbols-outlined text-xl">close</span>
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
                    <form className="flex flex-col gap-6" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>

                        {/* Title */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Project Title *</label>
                            <input
                                className="w-full rounded-lg bg-slate-50 dark:bg-[#0f1623] border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white p-3 text-sm focus:ring-2 focus:ring-[#1f68f9]/50 outline-none"
                                placeholder="e.g. Website Redesign"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                autoFocus
                            />
                        </div>

                        {/* Description */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Description</label>
                            <textarea
                                className="w-full rounded-lg bg-slate-50 dark:bg-[#0f1623] border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white p-3 text-sm focus:ring-2 focus:ring-[#1f68f9]/50 outline-none resize-none"
                                placeholder="Project details..."
                                rows={3}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Status */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Status</label>
                                <div className="relative">
                                    <select
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value as ProjectStatus)}
                                        className="w-full appearance-none rounded-lg bg-slate-50 dark:bg-[#0f1623] border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white p-3 pr-10 text-sm focus:ring-2 focus:ring-[#1f68f9]/50 outline-none"
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Pending Review">Pending Review</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Archived">Archived</option>
                                    </select>
                                    <span className="material-symbols-outlined absolute right-3 top-3 pointer-events-none text-slate-500">expand_more</span>
                                </div>
                            </div>

                            {/* Due Date */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Due Date</label>
                                <input
                                    type="date"
                                    className="w-full rounded-lg bg-slate-50 dark:bg-[#0f1623] border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white p-3 text-sm focus:ring-2 focus:ring-[#1f68f9]/50 outline-none [color-scheme:dark]"
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Progress */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Progress ({progress}%)</label>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={progress}
                                onChange={(e) => setProgress(Number(e.target.value))}
                                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#1f68f9]"
                            />
                        </div>

                        {/* Team Members */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Team Members</label>
                            <div className="flex gap-2">
                                <input
                                    className="flex-1 rounded-lg bg-slate-50 dark:bg-[#0f1623] border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white p-3 text-sm focus:ring-2 focus:ring-[#1f68f9]/50 outline-none"
                                    placeholder="Add member by Email or ID..."
                                    value={newMemberId}
                                    onChange={(e) => setNewMemberId(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={handleAddMember}
                                    className="px-4 py-2 bg-[#1f68f9] text-white rounded-lg hover:bg-blue-600 transition-colors"
                                >
                                    Add
                                </button>
                            </div>

                            {/* Member List */}
                            <div className="flex flex-col gap-2 mt-2">
                                {teamMembers.length === 0 && <p className="text-sm text-slate-500 italic">No members added yet.</p>}
                                {teamMembers.map((member) => (
                                    <div key={member.id} className="flex items-center justify-between p-2 bg-slate-50 dark:bg-[#0f1623] border border-slate-200 dark:border-slate-700 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${member.role === 'Leader' ? 'bg-amber-100 text-amber-700 border-2 border-amber-300' : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'}`}>
                                                {member.role === 'Leader' ? 'L' : 'M'}
                                            </div>
                                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{member.id}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => handleSetLeader(member.id)}
                                                className={`p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors ${member.role === 'Leader' ? 'text-amber-500' : 'text-slate-400'}`}
                                                title="Set as Project Leader"
                                            >
                                                <span className="material-symbols-outlined text-lg">star</span>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveMember(member.id)}
                                                className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded transition-colors"
                                                title="Remove Member"
                                            >
                                                <span className="material-symbols-outlined text-lg">delete</span>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </form>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-slate-200 dark:border-slate-700 flex justify-between gap-3 bg-slate-50 dark:bg-[#1e293b] rounded-b-xl">
                    <div>
                        {projectToEdit && (
                            <button
                                type='button'
                                onClick={handleDelete}
                                className="px-4 py-2.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900/30 dark:text-red-400 dark:hover:bg-red-900/10 transition-colors flex items-center gap-2 text-sm font-medium"
                            >
                                <span className="material-symbols-outlined text-lg">delete</span>
                                Delete
                            </button>
                        )}
                    </div>
                    <div className="flex gap-3">
                        <button onClick={onClose} className="px-5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                            Cancel
                        </button>
                        <button onClick={handleSubmit} className="px-5 py-2.5 rounded-lg bg-[#1f68f9] hover:bg-blue-600 text-white font-medium text-sm shadow-lg shadow-blue-500/20 transition-colors flex items-center gap-2">
                            <span className="material-symbols-outlined text-lg">{projectToEdit ? 'save' : 'add'}</span>
                            {projectToEdit ? 'Save Changes' : 'Create Project'}
                        </button>
                    </div>
                </div>

            </div>
        </div>,
        document.body
    );
}

export default NewProjectModal;
