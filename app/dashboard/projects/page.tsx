'use client';

import React, { useState } from 'react';
import NewProjectModal from '../../component/NewProjectModal';
import { useProjectStore, Project } from '../../store/projectStore';

export default function ProjectsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);

  const { projects } = useProjectStore();

  const handleCreate = () => {
    setProjectToEdit(null);
    setIsModalOpen(true);
  };

  const handleEdit = (project: Project) => {
    setProjectToEdit(project);
    setIsModalOpen(true);
  };

  const activeProjects = projects.filter(p => p.status === 'Active');
  const completedProjects = projects.filter(p => p.status === 'Completed');
  const archivedProjects = projects.filter(p => p.status === 'Archived');

  return (
    <div className="flex flex-col h-full">
      {/* Page Summary & Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">
            Projects Overview
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Manage and track your active initiatives across all departments.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            <span className="material-symbols-outlined text-lg">filter_list</span>
            Sort by
          </button>
          <button onClick={handleCreate} className="flex items-center gap-2 px-4 py-2 bg-[#1f68f9] text-white rounded-lg text-sm font-bold hover:bg-blue-600 transition-all shadow-md shadow-blue-500/20">
            <span className="material-symbols-outlined text-lg">add</span>
            New Project
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-8 border-b border-slate-200 dark:border-slate-800 mb-8 overflow-x-auto">
        <button className="pb-4 text-sm font-bold border-b-2 border-[#1f68f9] text-[#1f68f9]">
          All Projects ({projects.length})
        </button>
        <button className="pb-4 text-sm font-bold border-b-2 border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
          Active ({activeProjects.length})
        </button>
        <button className="pb-4 text-sm font-bold border-b-2 border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
          Completed ({completedProjects.length})
        </button>
        <button className="pb-4 text-sm font-bold border-b-2 border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
          Archived
        </button>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-8">

        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onEdit={() => handleEdit(project)}
          />
        ))}

        {/* Create New Card Placeholder */}
        <button onClick={handleCreate} className="bg-slate-100/50 dark:bg-[#111318]/30 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl flex flex-col items-center justify-center p-8 hover:bg-white dark:hover:bg-[#111318]/50 hover:border-[#1f68f9]/50 transition-all group min-h-[280px]">
          <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center mb-4 group-hover:bg-[#1f68f9]/10 group-hover:text-[#1f68f9] transition-all">
            <span className="material-symbols-outlined text-3xl">add</span>
          </div>
          <span className="text-sm font-bold text-slate-600 dark:text-slate-400">Create New Project</span>
        </button>

      </div>
      <NewProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} projectToEdit={projectToEdit} />
    </div>
  );
}

// --- Reusable Project Card Component ---
interface ProjectCardProps {
  project: Project;
  onEdit: () => void;
}

function ProjectCard({ project, onEdit }: ProjectCardProps) {
  return (
    <div
      onClick={onEdit}
      className="bg-white dark:bg-[#111318] p-6 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-[#1f68f9]/50 transition-all group shadow-sm cursor-pointer relative"
    >
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="material-symbols-outlined text-slate-400 hover:text-[#1f68f9]">edit</span>
      </div>

      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 rounded-lg ${project.iconBg}`}>
          <span className="material-symbols-outlined">{project.icon}</span>
        </div>
        <span className={`text-xs font-bold uppercase tracking-widest px-2 py-1 rounded ${project.statusColor}`}>
          {project.status}
        </span>
      </div>
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-[#1f68f9] transition-colors">
        {project.title}
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-6">
        {project.description}
      </p>

      <div className="space-y-4">
        {/* Progress Bar */}
        <div>
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="font-medium text-slate-600 dark:text-slate-300">Progress</span>
            <span className="font-bold text-[#1f68f9]">{project.progress}%</span>
          </div>
          <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-[#1f68f9] rounded-full" style={{ width: `${project.progress}%` }}></div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <span className="material-symbols-outlined text-lg">list_alt</span>
            <span className="text-xs font-semibold">{project.taskCount}</span>
          </div>
          <div className="flex -space-x-2">
            {project.teamMembers.map((member, i) => (
              <div
                key={i}
                className={`size-7 rounded-full border-2 border-white dark:border-[#111318] flex items-center justify-center text-[10px] font-bold ${member.role === 'Leader' ? 'bg-amber-100 text-amber-700' : 'bg-slate-200 text-slate-700'}`}
                title={member.id}
              >
                {member.role === 'Leader' ? 'L' : member.id.charAt(0).toUpperCase()}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}