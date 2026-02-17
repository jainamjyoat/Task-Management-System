"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { useTaskStore, Task } from '../store/taskStore';
import { format, isToday, isFuture, parseISO } from 'date-fns';
import NewTaskModal from '../component/NewTaskModal';

export default function DashboardPage() {
  const { tasks } = useTaskStore();

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Calculate Stats
  const dueToday = tasks.filter(t => isToday(parseISO(t.dueDate)) && t.status !== 'Done').length;
  const pendingTasks = tasks.filter(t => t.status !== 'Done').length;
  const completedWeek = tasks.filter(t => t.status === 'Done').length; // Simplified for now

  // Get Upcoming Deadlines (Not Done, Future Date)
  const upcomingTasks = tasks
    .filter(t => t.status !== 'Done' && (isFuture(parseISO(t.dueDate)) || isToday(parseISO(t.dueDate))))
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 3);

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  return (
    <>
      {/* Greeting */}
      <div className="flex flex-wrap justify-between items-end gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-black tracking-tight">
            Good morning, Alex
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-base">
            You have <span className="text-[#1f68f9] font-semibold">{dueToday} tasks</span> due today. Let's get things done.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 bg-white dark:bg-[#111318] px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800">
          <span className="material-symbols-outlined text-[#1f68f9]">calendar_today</span>
          <span>{format(new Date(), 'MMM d, yyyy')}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Due Today" value={dueToday.toString()} icon="warning" color="orange" />
        <StatCard title="Pending Tasks" value={pendingTasks.toString()} icon="pending_actions" color="blue" />
        <StatCard title="Completed (All Time)" value={completedWeek.toString()} icon="task_alt" color="green" />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bar Chart: Productivity */}
        <div className="lg:col-span-2 rounded-xl p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111318] shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-slate-900 dark:text-white text-lg font-bold">My Productivity</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Task completion over the last 7 days</p>
            </div>
            <button className="text-slate-400 hover:text-[#1f68f9] transition-colors">
              <span className="material-symbols-outlined">more_horiz</span>
            </button>
          </div>
          {/* Custom CSS Bar Chart */}
          <div className="flex-1 flex items-end justify-between gap-2 md:gap-6 min-h-[200px] px-2 pb-2">
            {[40, 70, 50, 85, 60, 20, 10].map((height, i) => (
              <div key={i} className="flex flex-col items-center gap-2 w-full group cursor-pointer">
                <div className="w-full max-w-[40px] bg-[#1f68f9]/20 rounded-t-sm h-full relative overflow-hidden group-hover:bg-[#1f68f9]/30 transition-all">
                  <div
                    className="absolute bottom-0 w-full bg-[#1f68f9] rounded-t-sm transition-all duration-500 ease-out"
                    style={{ height: `${height}%` }}
                  ></div>
                </div>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Donut Chart: Task Status */}
        <div className="rounded-xl p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111318] shadow-sm flex flex-col">
          <h3 className="text-slate-900 dark:text-white text-lg font-bold mb-6">Task Status</h3>
          <div className="flex flex-col items-center justify-center flex-1">
            {/* CSS Conic Gradient Donut */}
            <div
              className="relative size-48 rounded-full"
              style={{
                background: `conic-gradient(
                  #1f68f9 0% 40%, 
                  #60a5fa 40% 70%, 
                  #fbbf24 70% 80%, 
                  #10b981 80% 100%
                )`,
              }}
            >
              {/* Inner Circle for Donut Effect */}
              <div className="absolute inset-0 m-auto size-32 bg-white dark:bg-[#111318] rounded-full flex items-center justify-center flex-col">
                <span className="text-3xl font-bold text-slate-900 dark:text-white">{pendingTasks}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Active Tasks</span>
              </div>
            </div>

            {/* Legend */}
            <div className="mt-6 grid grid-cols-2 gap-3 w-full">
              <LegendItem color="bg-[#1f68f9]" label="To Do (40%)" />
              <LegendItem color="bg-blue-400" label="In Progress (30%)" />
              <LegendItem color="bg-amber-400" label="Review (10%)" />
              <LegendItem color="bg-emerald-500" label="Done (20%)" />
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Deadlines & Recent Activity Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Deadlines */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-slate-900 dark:text-white text-lg font-bold">Upcoming Deadlines</h3>
            <Link className="text-[#1f68f9] text-sm font-semibold hover:underline" href="/dashboard/tasks">
              View All
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            {upcomingTasks.length > 0 ? (
              upcomingTasks.map((task) => (
                <div key={task.id} onClick={() => handleEditTask(task)}>
                  <TaskItem
                    title={task.title}
                    team={task.description || "General"}
                    priority={task.priority}
                    priorityColor={task.priority === 'High' ? 'red' : task.priority === 'Medium' ? 'amber' : 'blue'}
                    time={format(parseISO(task.dueDate), 'MMM d, h:mm a')}
                    icon="event"
                    iconBg="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
                  />
                </div>
              ))
            ) : (
              <p className="text-slate-500 text-sm italic">No upcoming deadlines.</p>
            )}
          </div>
        </div>

        {/* Mini Project Summary / Extra Widget */}
        <div className="rounded-xl p-6 border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-[#1f68f9] to-blue-700 text-white shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined">auto_awesome</span>
              <span className="font-medium text-blue-100">Pro Tip</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Clean up your workspace</h3>
            <p className="text-blue-100 text-sm mb-6">
              You can drag and drop tasks to organize them, or click on them to edit details.
            </p>
          </div>
          <Link
            href="/dashboard/tasks"
            className="w-full py-3 bg-white text-[#1f68f9] font-bold rounded-lg text-sm hover:bg-blue-50 transition-colors flex items-center justify-center"
          >
            Review Tasks
          </Link>
        </div>
      </div>

      <NewTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        taskToEdit={editingTask}
      />
    </>
  );
}

// --- Helper Components for Dashboard ---

function StatCard({ title, value, icon, color }: { title: string; value: string; icon: string; color: string }) {
  // Map colors safely
  const colorClasses: Record<string, string> = {
    orange: 'bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400',
    blue: 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400',
    green: 'bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400'
  };

  return (
    <div className="flex flex-col gap-3 rounded-xl p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111318] shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{title}</p>
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
          <span className="material-symbols-outlined text-xl">{icon}</span>
        </div>
      </div>
      <p className="text-slate-900 dark:text-white text-3xl font-bold">{value}</p>
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`size-3 rounded-full ${color}`}></div>
      <span className="text-xs font-medium text-slate-600 dark:text-slate-300">{label}</span>
    </div>
  );
}

function TaskItem({ title, team, priority, priorityColor, time, icon, iconBg }: any) {
  const priorityColors: Record<string, string> = {
    red: 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400 border-red-200',
    amber: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 border-amber-200',
    blue: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 border-blue-200',
  };

  return (
    <div className="group flex flex-wrap md:flex-nowrap items-center justify-between gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111318] hover:border-[#1f68f9]/50 dark:hover:border-[#1f68f9]/50 transition-colors cursor-pointer">
      <div className="flex items-center gap-4">
        <div className={`size-10 rounded-full flex items-center justify-center ${iconBg}`}>
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        <div>
          <h4 className="text-slate-900 dark:text-white font-semibold text-sm">{title}</h4>
          <p className="text-slate-500 dark:text-slate-400 text-xs">{team}</p>
        </div>
      </div>
      <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border dark:border-transparent ${priorityColors[priorityColor] || 'bg-slate-100 text-slate-700'}`}>
          {priority}
        </span>
        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
          <span className="material-symbols-outlined text-base">event</span>
          <span>{time}</span>
        </div>
      </div>
    </div>
  )
}