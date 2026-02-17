import React from 'react';

export default function TeamsPage() {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Team Management
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Oversee your workforce distribution and availability.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            <span className="material-symbols-outlined text-lg">filter_list</span>
            Filters
          </button>
          <button className="flex items-center gap-2 bg-[#1f68f9] text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20">
            <span className="material-symbols-outlined text-lg">person_add</span>
            Invite Member
          </button>
        </div>
      </div>

      {/* Search and Tabs */}
      <div className="mb-6 flex flex-col lg:flex-row lg:items-center gap-4 justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-6 overflow-x-auto whitespace-nowrap">
          <button className="pb-4 border-b-2 border-[#1f68f9] text-[#1f68f9] text-sm font-bold">
            All Members (24)
          </button>
          <button className="pb-4 border-b-2 border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 text-sm font-medium transition-colors">
            Available (12)
          </button>
          <button className="pb-4 border-b-2 border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 text-sm font-medium transition-colors">
            Busy (8)
          </button>
          <button className="pb-4 border-b-2 border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 text-sm font-medium transition-colors">
            Away (4)
          </button>
        </div>
        <div className="relative w-full lg:w-96">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            search
          </span>
          <input 
            className="w-full bg-white dark:bg-[#0f1623] border border-slate-200 dark:border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-[#1f68f9] focus:border-[#1f68f9] transition-all placeholder:text-slate-400" 
            placeholder="Search team members..." 
            type="text"
          />
        </div>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 pb-8">
        
        {/* Member 1 */}
        <MemberCard 
          name="Alex Rivera"
          role="Lead Developer"
          status="available"
          imageSeed="11"
          tasks={4}
          capacity={85}
        />

        {/* Member 2 */}
        <MemberCard 
          name="Sarah Chen"
          role="Senior Designer"
          status="busy"
          imageSeed="12"
          tasks={6}
          capacity={92}
        />

        {/* Member 3 */}
        <MemberCard 
          name="Jordan Smith"
          role="Product Manager"
          status="ooo"
          imageSeed="13"
          tasks={0}
          capacity={0}
          isDimmed
        />

        {/* Member 4 */}
        <MemberCard 
          name="Elena Rodriguez"
          role="QA Engineer"
          status="busy"
          imageSeed="14"
          tasks={5}
          capacity={75}
        />

        {/* Member 5 */}
        <MemberCard 
          name="Marcus Thorne"
          role="Backend Developer"
          status="available"
          imageSeed="15"
          tasks={3}
          capacity={45}
        />

        {/* Member 6 */}
        <MemberCard 
          name="Lisa Wang"
          role="UX Researcher"
          status="available"
          imageSeed="16"
          tasks={1}
          capacity={20}
        />

        {/* Invite Placeholder Card */}
        <button className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-5 flex flex-col items-center justify-center text-center hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all cursor-pointer group min-h-[280px]">
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-slate-400 group-hover:text-[#1f68f9] transition-colors">
              add
            </span>
          </div>
          <p className="font-bold text-slate-600 dark:text-slate-300">Add Team Member</p>
          <p className="text-xs text-slate-400 mt-1">Scale your team further</p>
        </button>

      </div>
    </div>
  );
}

// --- Reusable Member Card Component ---
interface MemberCardProps {
    name: string;
    role: string;
    status: 'available' | 'busy' | 'ooo';
    imageSeed: string;
    tasks: number;
    capacity: number;
    isDimmed?: boolean;
}

function MemberCard({ name, role, status, imageSeed, tasks, capacity, isDimmed }: MemberCardProps) {
    
    // Status Configuration
    const statusConfig = {
        available: { color: 'bg-green-500', badge: 'bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400', label: 'Available', barColor: 'bg-[#1f68f9]' },
        busy: { color: 'bg-amber-500', badge: 'bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400', label: 'Busy', barColor: 'bg-amber-500' },
        ooo: { color: 'bg-red-500', badge: 'bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400', label: 'Out of Office', barColor: 'bg-slate-400' }
    };

    const config = statusConfig[status];

    return (
        <div className={`bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-800/50 rounded-xl p-5 hover:shadow-xl hover:border-[#1f68f9]/30 transition-all group relative ${isDimmed ? 'opacity-75 grayscale-[0.5]' : ''}`}>
            
            <button className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                <span className="material-symbols-outlined">more_vert</span>
            </button>

            <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                    <img 
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${imageSeed}`} 
                        alt={name}
                        className="w-20 h-20 rounded-full bg-slate-100 object-cover border-4 border-slate-50 dark:border-slate-800" 
                    />
                    <span className={`absolute bottom-1 right-1 w-5 h-5 ${config.color} border-4 border-white dark:border-[#1e293b] rounded-full`} title={config.label}></span>
                </div>
                
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">{name}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">{role}</p>
                
                <div className="w-full space-y-3 pt-4 border-t border-slate-100 dark:border-slate-700/50">
                    <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-500 font-medium">WORKLOAD</span>
                        <span className={`font-bold ${status === 'ooo' ? 'text-slate-400' : 'text-[#1f68f9]'}`}>
                            {tasks} active tasks
                        </span>
                    </div>
                    
                    <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                        <div 
                            className={`h-full rounded-full ${config.barColor}`} 
                            style={{ width: `${capacity}%` }}
                        ></div>
                    </div>
                    
                    <div className="flex justify-between items-center pt-2">
                        <span className={`px-2 py-1 text-[10px] font-bold rounded uppercase ${config.badge}`}>
                            {config.label}
                        </span>
                        <span className="text-[10px] text-slate-400">{capacity}% Capacity</span>
                    </div>
                </div>
            </div>
        </div>
    );
}