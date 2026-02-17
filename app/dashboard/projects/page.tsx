import React from 'react';

export default function ProjectsPage() {
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
          <button className="flex items-center gap-2 px-4 py-2 bg-[#1f68f9] text-white rounded-lg text-sm font-bold hover:bg-blue-600 transition-all shadow-md shadow-blue-500/20">
            <span className="material-symbols-outlined text-lg">add</span>
            New Project
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-8 border-b border-slate-200 dark:border-slate-800 mb-8 overflow-x-auto">
        <button className="pb-4 text-sm font-bold border-b-2 border-[#1f68f9] text-[#1f68f9]">
          All Projects (12)
        </button>
        <button className="pb-4 text-sm font-bold border-b-2 border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
          Active (8)
        </button>
        <button className="pb-4 text-sm font-bold border-b-2 border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
          Completed (4)
        </button>
        <button className="pb-4 text-sm font-bold border-b-2 border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
          Archived
        </button>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-8">
        
        {/* Project Card 1 */}
        <ProjectCard 
          title="Website Redesign"
          description="Migrating the corporate site to a new headless CMS with a focus on core web vitals and SEO optimization."
          progress={65}
          status="Active"
          statusColor="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
          icon="language"
          iconBg="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
          taskCount="14 Tasks Remaining"
          teamMembers={[0, 1, 2]}
        />

        {/* Project Card 2 */}
        <ProjectCard 
          title="Mobile App v2.0"
          description="Developing the next major version of the iOS and Android application with biometric login features."
          progress={32}
          status="Active"
          statusColor="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
          icon="smartphone"
          iconBg="bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
          taskCount="28 Tasks Remaining"
          teamMembers={[3, 4]}
          extraMembers={1}
        />

        {/* Project Card 3 */}
        <ProjectCard 
          title="Data Migration"
          description="Internal migration of legacy customer data to the new unified PostgreSQL cloud instance."
          progress={88}
          status="Pending Review"
          statusColor="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
          icon="database"
          iconBg="bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
          taskCount="4 Tasks Remaining"
          teamMembers={[5, 6]}
        />

        {/* Card 4 (Complete) */}
        <div className="bg-white dark:bg-[#111318] p-6 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-green-500/50 transition-all group shadow-sm opacity-90 cursor-pointer">
            <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400">
                    <span className="material-symbols-outlined">verified</span>
                </div>
                <span className="text-xs font-bold uppercase tracking-widest px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded">Completed</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Q3 Brand Refresh</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-6">Update all marketing collateral, presentation templates, and social media assets for the new season.</p>
            <div className="space-y-4">
                <div className="flex items-center justify-between text-sm mb-1">
                    <span className="font-medium text-slate-600 dark:text-slate-300">Progress</span>
                    <span className="font-bold text-green-500">100%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{width: '100%'}}></div>
                </div>
                <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                        <span className="material-symbols-outlined text-lg">check_circle</span>
                        <span className="text-xs font-semibold">All Tasks Done</span>
                    </div>
                    <div className="flex -space-x-2">
                        <img alt="Team member" className="size-7 rounded-full border-2 border-white dark:border-[#111318] bg-slate-200" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=7`} />
                    </div>
                </div>
            </div>
        </div>

        {/* Create New Card Placeholder */}
        <button className="bg-slate-100/50 dark:bg-[#111318]/30 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl flex flex-col items-center justify-center p-8 hover:bg-white dark:hover:bg-[#111318]/50 hover:border-[#1f68f9]/50 transition-all group min-h-[280px]">
          <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center mb-4 group-hover:bg-[#1f68f9]/10 group-hover:text-[#1f68f9] transition-all">
            <span className="material-symbols-outlined text-3xl">add</span>
          </div>
          <span className="text-sm font-bold text-slate-600 dark:text-slate-400">Create New Project</span>
        </button>

      </div>
    </div>
  );
}

// --- Reusable Project Card Component ---
interface ProjectCardProps {
    title: string;
    description: string;
    progress: number;
    status: string;
    statusColor: string;
    icon: string;
    iconBg: string;
    taskCount: string;
    teamMembers: number[];
    extraMembers?: number;
}

function ProjectCard({ 
    title, description, progress, status, statusColor, icon, iconBg, taskCount, teamMembers, extraMembers 
}: ProjectCardProps) {
    return (
        <div className="bg-white dark:bg-[#111318] p-6 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-[#1f68f9]/50 transition-all group shadow-sm cursor-pointer">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-lg ${iconBg}`}>
                    <span className="material-symbols-outlined">{icon}</span>
                </div>
                <span className={`text-xs font-bold uppercase tracking-widest px-2 py-1 rounded ${statusColor}`}>
                    {status}
                </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-[#1f68f9] transition-colors">
                {title}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-6">
                {description}
            </p>
            
            <div className="space-y-4">
                {/* Progress Bar */}
                <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                        <span className="font-medium text-slate-600 dark:text-slate-300">Progress</span>
                        <span className="font-bold text-[#1f68f9]">{progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-[#1f68f9] rounded-full" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>

                {/* Footer Info */}
                <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                        <span className="material-symbols-outlined text-lg">list_alt</span>
                        <span className="text-xs font-semibold">{taskCount}</span>
                    </div>
                    <div className="flex -space-x-2">
                        {teamMembers.map((seed, i) => (
                            <img 
                                key={i}
                                alt="Team member" 
                                className="size-7 rounded-full border-2 border-white dark:border-[#111318] bg-slate-200 object-cover" 
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`}
                            />
                        ))}
                        {extraMembers && (
                            <div className="size-7 rounded-full border-2 border-white dark:border-[#111318] bg-slate-300 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-700 dark:text-white">
                                +{extraMembers}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}