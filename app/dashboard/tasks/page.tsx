import React from 'react';

export default function MyTasksPage() {
  return (
    <div className="flex flex-col h-full">
      {/* Page Title Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-black tracking-tight mb-2 text-slate-900 dark:text-white">
          My Tasks
        </h2>
        <p className="text-slate-500 dark:text-slate-400">
          Good morning, Alex. You have 12 tasks to complete today.
        </p>
      </div>

      {/* Task Sections Container */}
      <div className="space-y-10 pb-8">
        
        {/* --- Today Section --- */}
        <section>
          <div className="flex items-center justify-between mb-4 px-2">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Today</h3>
              <span className="bg-slate-200 dark:bg-[#272d3a] text-slate-600 dark:text-slate-400 text-xs px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                4
              </span>
            </div>
            <button className="text-[#1f68f9] text-sm font-bold hover:underline">
              Mark all done
            </button>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            {/* Task Card 1 */}
            <TaskCard 
              title="Finalize Design System Components"
              time="Today • 11:30 AM"
              tag="TaskFlow UI"
              tagIcon="work"
              priority="High Priority"
              priorityColor="text-red-500"
            />

            {/* Task Card 2 */}
            <TaskCard 
              title="Weekly Sync with Engineering Team"
              time="Today • 2:00 PM"
              tag="Internal"
              tagIcon="group"
              priority="Medium"
              priorityColor="text-amber-500"
              priorityIcon="stat_1"
            />

            {/* Task Card 3 */}
            <TaskCard 
              title="User Interview Session - Onboarding Flow"
              time="Today • 4:30 PM"
              tag="Research"
              tagIcon="person"
              priority="High"
              priorityColor="text-red-500"
              priorityIcon="priority_high"
            />
          </div>
        </section>

        {/* --- Upcoming Section --- */}
        <section>
          <div className="flex items-center gap-2 mb-4 px-2">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Upcoming</h3>
            <span className="bg-slate-200 dark:bg-[#272d3a] text-slate-600 dark:text-slate-400 text-xs px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
              2
            </span>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
             <TaskCard 
              title="Prepare Presentation for Stakeholders"
              time="Tomorrow"
              tag="Strategy"
              tagIcon="show_chart"
              priority="Low"
              priorityColor="text-slate-400"
              priorityIcon="stat_minus_1"
            />
             <TaskCard 
              title="Update Documentation for Component Library"
              time="Wednesday"
              tag="TaskFlow UI"
              tagIcon="description"
              priority="Medium"
              priorityColor="text-amber-500"
              priorityIcon="stat_1"
            />
          </div>
        </section>

        {/* --- Later Section --- */}
        <section>
          <div className="flex items-center gap-2 mb-4 px-2">
            <h3 className="text-lg font-bold text-slate-400">Later</h3>
            <span className="bg-slate-200 dark:bg-[#272d3a] text-slate-600 dark:text-slate-400 text-xs px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
              1
            </span>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            <div className="opacity-70 hover:opacity-100 transition-opacity">
              <TaskCard 
                title="Q4 Roadmapping Session"
                time="Next Month"
                tag="Executive"
                tagIcon="map"
                priority="Low"
                priorityColor="text-slate-400"
                priorityIcon="stat_minus_1"
              />
            </div>
          </div>
        </section>
        
      </div>
    </div>
  );
}

// --- Reusable Task Card Component ---
interface TaskCardProps {
    title: string;
    time: string;
    tag: string;
    tagIcon: string;
    priority: string;
    priorityColor: string;
    priorityIcon?: string;
}

function TaskCard({ title, time, tag, tagIcon, priority, priorityColor, priorityIcon = "priority_high" }: TaskCardProps) {
    return (
        <div className="group bg-white dark:bg-[#111318] border border-slate-200 dark:border-slate-800 p-4 rounded-xl flex items-center gap-4 hover:border-[#1f68f9]/50 transition-all cursor-pointer">
            {/* Checkbox / Button */}
            <button className="size-6 rounded-md border-2 border-slate-300 dark:border-slate-700 flex items-center justify-center text-[#1f68f9] hover:border-[#1f68f9] transition-colors">
                <span className="material-symbols-outlined text-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    check
                </span>
            </button>

            {/* Content */}
            <div className="flex-1">
                <h4 className="font-semibold text-sm mb-1 text-slate-900 dark:text-white">
                    {title}
                </h4>
                <div className="flex items-center gap-3">
                    {/* Tag */}
                    <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        <span className="material-symbols-outlined text-[14px]">{tagIcon}</span>
                        {tag}
                    </span>
                    {/* Priority */}
                    <span className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider ${priorityColor}`}>
                        <span className="material-symbols-outlined text-[14px]">{priorityIcon}</span>
                        {priority}
                    </span>
                </div>
            </div>

            {/* Time */}
            <div className="text-right">
                <p className={`text-xs font-bold uppercase tracking-tight ${time.includes('Today') ? 'text-red-500' : 'text-slate-400'}`}>
                    {time}
                </p>
            </div>
        </div>
    );
}