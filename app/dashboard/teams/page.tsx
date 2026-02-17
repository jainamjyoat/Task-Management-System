'use client';

import React, { useState } from 'react';
import { useTeamStore, Member, MemberStatus } from '../../store/teamStore';
import NewMemberModal from '../../component/NewMemberModal';

export default function TeamsPage() {
  const { members, updateMemberStatus, removeMember } = useTeamStore();
  const [filter, setFilter] = useState<'All' | MemberStatus>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique roles
  const roles = Array.from(new Set(members.map(m => m.role)));

  const filteredMembers = members.filter(m => {
    const matchesStatus = filter === 'All' || m.status === filter;
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'All' || m.role === roleFilter;
    return matchesStatus && matchesSearch && matchesRole;
  });

  const availableCount = members.filter(m => m.status === 'Available').length;
  const busyCount = members.filter(m => m.status === 'Busy').length;
  const oooCount = members.filter(m => m.status === 'On Leave').length;

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
          <div className="relative">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 bg-white dark:bg-[#1e293b] border ${showFilters ? 'border-[#1f68f9] ring-1 ring-[#1f68f9]' : 'border-slate-200 dark:border-slate-700'} px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors`}
            >
              <span className="material-symbols-outlined text-lg">filter_list</span>
              Filters
            </button>

            {/* Filter Dropdown */}
            {showFilters && (
              <div className="absolute top-full mt-2 left-0 w-56 bg-white dark:bg-[#1e293b] rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 p-3 z-20 animate-in fade-in zoom-in-95 duration-200">
                <div className="mb-2">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2">
                    Filter by Role
                  </label>
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-[#0f1623] border border-slate-200 dark:border-slate-700 rounded-md px-3 py-2 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-[#1f68f9]"
                  >
                    <option value="All">All Roles</option>
                    {roles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-[#1f68f9] text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20"
          >
            <span className="material-symbols-outlined text-lg">person_add</span>
            Invite Member
          </button>
        </div>
      </div>

      {/* Search and Tabs */}
      <div className="mb-6 flex flex-col lg:flex-row lg:items-center gap-4 justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-6 overflow-x-auto whitespace-nowrap">
          <button
            onClick={() => setFilter('All')}
            className={`pb-4 border-b-2 text-sm font-bold transition-colors ${filter === 'All' ? 'border-[#1f68f9] text-[#1f68f9]' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            All Members ({members.length})
          </button>
          <button
            onClick={() => setFilter('Available')}
            className={`pb-4 border-b-2 text-sm font-medium transition-colors ${filter === 'Available' ? 'border-[#1f68f9] text-[#1f68f9]' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            Available ({availableCount})
          </button>
          <button
            onClick={() => setFilter('Busy')}
            className={`pb-4 border-b-2 text-sm font-medium transition-colors ${filter === 'Busy' ? 'border-[#1f68f9] text-[#1f68f9]' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            Busy ({busyCount})
          </button>
          <button
            onClick={() => setFilter('On Leave')}
            className={`pb-4 border-b-2 text-sm font-medium transition-colors ${filter === 'On Leave' ? 'border-[#1f68f9] text-[#1f68f9]' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            On Leave ({oooCount})
          </button>
        </div>
        <div className="relative w-full lg:w-96">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            search
          </span>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-[#0f1623] border border-slate-200 dark:border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-[#1f68f9] focus:border-[#1f68f9] transition-all placeholder:text-slate-400"
            placeholder="Search by name or role..."
            type="text"
          />
        </div>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 pb-8">

        {filteredMembers.map(member => (
          <MemberCard
            key={member.id}
            member={member}
            onStatusChange={(status) => updateMemberStatus(member.id, status)}
            onRemove={() => removeMember(member.id)}
          />
        ))}

        {/* Invite Placeholder Card */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-5 flex flex-col items-center justify-center text-center hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all cursor-pointer group min-h-[280px]"
        >
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-slate-400 group-hover:text-[#1f68f9] transition-colors">
              add
            </span>
          </div>
          <p className="font-bold text-slate-600 dark:text-slate-300">Add Team Member</p>
          <p className="text-xs text-slate-400 mt-1">Scale your team further</p>
        </button>

      </div>
      <NewMemberModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

// --- Reusable Member Card Component ---
interface MemberCardProps {
  member: Member;
  onStatusChange: (status: MemberStatus) => void;
  onRemove: () => void;
}

function MemberCard({ member, onStatusChange, onRemove }: MemberCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Status Configuration
  const statusConfig = {
    'Available': { color: 'bg-green-500', badge: 'bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400', label: 'Available', barColor: 'bg-[#1f68f9]' },
    'Busy': { color: 'bg-amber-500', badge: 'bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400', label: 'Busy', barColor: 'bg-amber-500' },
    'On Leave': { color: 'bg-red-500', badge: 'bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400', label: 'On Leave', barColor: 'bg-slate-400' },
    'Offline': { color: 'bg-slate-500', badge: 'bg-slate-100 text-slate-600 dark:bg-slate-500/10 dark:text-slate-400', label: 'Offline', barColor: 'bg-slate-400' }
  };

  const config = statusConfig[member.status];
  const isDimmed = member.status === 'Offline';

  const handleStatusSelect = (status: MemberStatus) => {
    onStatusChange(status);
    setMenuOpen(false);
  };

  return (
    <div className={`bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-800/50 rounded-xl p-5 hover:shadow-xl hover:border-[#1f68f9]/30 transition-all group relative ${isDimmed ? 'opacity-75 grayscale-[0.5]' : ''}`}>

      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
        >
          <span className="material-symbols-outlined">more_vert</span>
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#0f1623] rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-3 py-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Set Status
            </div>
            {Object.keys(statusConfig).map((status) => (
              <button
                key={status}
                onClick={() => handleStatusSelect(status as MemberStatus)}
                className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${member.status === status ? 'bg-blue-50 dark:bg-blue-900/20 text-[#1f68f9]' : 'text-slate-700 dark:text-slate-300'}`}
              >
                <span className={`w-2 h-2 rounded-full ${statusConfig[status as MemberStatus].color}`}></span>
                {status}
              </button>
            ))}
            <div className="border-t border-slate-100 dark:border-slate-700/50 mt-1 pt-1">
              <button
                onClick={() => {
                  onRemove();
                  setMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm flex items-center gap-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <span className="material-symbols-outlined text-lg">delete</span>
                Remove Member
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-0" onClick={() => setMenuOpen(false)}></div>
      )}

      <div className="flex flex-col items-center text-center">
        <div className="relative mb-4">
          <img
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.imageSeed}`}
            alt={member.name}
            className="w-20 h-20 rounded-full bg-slate-100 object-cover border-4 border-slate-50 dark:border-slate-800"
          />
          <span className={`absolute bottom-1 right-1 w-5 h-5 ${config.color} border-4 border-white dark:border-[#1e293b] rounded-full`} title={config.label}></span>
        </div>

        <h3 className="font-bold text-lg text-slate-900 dark:text-white">{member.name}</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">{member.role}</p>

        <div className="w-full space-y-3 pt-4 border-t border-slate-100 dark:border-slate-700/50">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 font-medium">WORKLOAD</span>
            <span className={`font-bold ${member.status === 'On Leave' ? 'text-slate-400' : 'text-[#1f68f9]'}`}>
              {member.tasks} active tasks
            </span>
          </div>

          <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${config.barColor}`}
              style={{ width: `${member.capacity}%` }}
            ></div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <span className={`px-2 py-1 text-[10px] font-bold rounded uppercase ${config.badge}`}>
              {config.label}
            </span>
            <span className="text-[10px] text-slate-400">{member.capacity}% Capacity</span>
          </div>
        </div>
      </div>
    </div>
  );
}