'use client';

import React, { useMemo, useState } from 'react';
import { useTaskStore, Task } from '../../store/taskStore';
import { format, isToday, isFuture, parseISO, addDays, isPast } from 'date-fns';
import NewTaskModal from '../../component/NewTaskModal';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  useDraggable,
  useDroppable,
} from '@dnd-kit/core';

export default function MyTasksPage() {
  const { tasks, moveTask, updateTask, deleteTask } = useTaskStore();
  const [activeId, setActiveId] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  // Filter Tasks
  const todayTasks = useMemo(() =>
    tasks.filter(t => t.status !== 'Done' && (isToday(parseISO(t.dueDate)) || isPast(parseISO(t.dueDate)))),
    [tasks]);

  const upcomingTasks = useMemo(() =>
    tasks.filter(t => t.status !== 'Done' && isFuture(parseISO(t.dueDate)) && !isToday(parseISO(t.dueDate)) && new Date(t.dueDate) < addDays(new Date(), 7)),
    [tasks]);

  const laterTasks = useMemo(() =>
    tasks.filter(t => t.status !== 'Done' && isFuture(parseISO(t.dueDate)) && new Date(t.dueDate) >= addDays(new Date(), 7)),
    [tasks]);


  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const taskId = active.id as string;
      const containerId = over.id as string;

      let newDate = new Date(); // Default Today

      if (containerId === 'upcoming-container') {
        newDate = addDays(new Date(), 1); // Tomorrow
      } else if (containerId === 'later-container') {
        newDate = addDays(new Date(), 8); // Next Week
      }

      updateTask(taskId, { dueDate: newDate.toISOString() });
    }

    setActiveId(null);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteTask = (taskId: string) => {
    if (confirm("Are you sure you want to delete this task?")) {
      deleteTask(taskId);
    }
  }

  const handleOpenNewTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  }

  const activeTask = tasks.find(t => t.id === activeId);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-col h-full relative">
        {/* Floating Add Button (Mobile/Convenience) */}
        <button
          onClick={handleOpenNewTask}
          className="fixed bottom-8 right-8 z-50 bg-[#1f68f9] hover:bg-blue-600 text-white p-4 rounded-full shadow-lg shadow-blue-500/30 transition-transform hover:scale-105 active:scale-95 md:hidden"
        >
          <span className="material-symbols-outlined text-2xl">add</span>
        </button>

        {/* Page Title Section */}
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-black tracking-tight mb-2 text-slate-900 dark:text-white">
              My Tasks
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Good morning. You have {todayTasks.length} tasks to complete today.
            </p>
          </div>
          <button
            onClick={handleOpenNewTask}
            className="hidden md:flex items-center gap-2 bg-[#1f68f9] hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg font-bold text-sm shadow-lg shadow-blue-500/20 transition-all active:scale-95"
          >
            <span className="material-symbols-outlined">add</span>
            New Task
          </button>
        </div>

        {/* Task Sections Container */}
        <div className="space-y-10 pb-8">

          <DroppableSection id="today-container" title="Today" count={todayTasks.length}>
            {todayTasks.map(task => (
              <DraggableTaskCard
                key={task.id}
                task={task}
                onEdit={() => handleEditTask(task)}
                onDelete={() => handleDeleteTask(task.id)}
              />
            ))}
            {todayTasks.length === 0 && <EmptyPlaceholder />}
          </DroppableSection>

          <DroppableSection id="upcoming-container" title="Upcoming" count={upcomingTasks.length}>
            {upcomingTasks.map(task => (
              <DraggableTaskCard
                key={task.id}
                task={task}
                onEdit={() => handleEditTask(task)}
                onDelete={() => handleDeleteTask(task.id)}
              />
            ))}
            {upcomingTasks.length === 0 && <EmptyPlaceholder />}
          </DroppableSection>

          <DroppableSection id="later-container" title="Later" count={laterTasks.length}>
            {laterTasks.map(task => (
              <DraggableTaskCard
                key={task.id}
                task={task}
                onEdit={() => handleEditTask(task)}
                onDelete={() => handleDeleteTask(task.id)}
              />
            ))}
            {laterTasks.length === 0 && <EmptyPlaceholder />}
          </DroppableSection>

        </div>
      </div>

      <DragOverlay>
        {activeTask ? (
          <TaskCard task={activeTask} isOverlay />
        ) : null}
      </DragOverlay>

      <NewTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        taskToEdit={editingTask}
      />

    </DndContext>
  );
}

// --- Components ---

function DroppableSection({ id, title, count, children }: { id: string, title: string, count: number, children: React.ReactNode }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <section ref={setNodeRef} className={`rounded-xl transition-colors ${isOver ? 'bg-slate-50 dark:bg-slate-800/50 ring-2 ring-[#1f68f9] ring-offset-2 dark:ring-offset-[#0f1623]' : ''}`}>
      <div className="flex items-center justify-between mb-4 px-2 pt-2">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
          <span className="bg-slate-200 dark:bg-[#272d3a] text-slate-600 dark:text-slate-400 text-xs px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
            {count}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 p-2 min-h-[100px]">
        {children}
      </div>
    </section>
  )
}

function EmptyPlaceholder() {
  return (
    <div className="flex items-center justify-center p-8 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-slate-400 text-sm">
      Drop tasks here to reschedule
    </div>
  )
}

function DraggableTaskCard({ task, onEdit, onDelete }: { task: Task, onEdit?: () => void, onDelete?: () => void }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} className={isDragging ? 'opacity-50' : ''}>
      <TaskCard task={task} onEdit={onEdit} onDelete={onDelete} />
    </div>
  )
}


function TaskCard({ task, isOverlay, onEdit, onDelete }: { task: Task, isOverlay?: boolean, onEdit?: () => void, onDelete?: () => void }) {
  const { updateTask } = useTaskStore();

  const handleToggleDone = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent drag start
    updateTask(task.id, { status: 'Done' });
  };

  const priorityColors: Record<string, string> = {
    High: 'text-red-500',
    Medium: 'text-amber-500',
    Low: 'text-slate-400',
  };

  return (
    <div
      onClick={onEdit}
      className={`group bg-white dark:bg-[#111318] border border-slate-200 dark:border-slate-800 p-4 rounded-xl flex items-center gap-4 hover:border-[#1f68f9]/50 transition-all cursor-grab active:cursor-grabbing ${isOverlay ? 'shadow-2xl scale-105 border-[#1f68f9]' : 'shadow-sm'}`}
    >
      {/* Checkbox / Button */}
      <button
        onPointerDown={(e) => e.stopPropagation()} // Prevent drag
        onClick={handleToggleDone}
        className="size-6 rounded-md border-2 border-slate-300 dark:border-slate-700 flex items-center justify-center text-[#1f68f9] hover:border-[#1f68f9] transition-colors bg-transparent shrink-0"
      >
        <span className="material-symbols-outlined text-lg opacity-0 hover:opacity-100 transition-opacity">
          check
        </span>
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-sm mb-1 text-slate-900 dark:text-white line-clamp-1">
          {task.title}
        </h4>
        <div className="flex items-center gap-3">
          {/* Tag */}
          <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            <span className="material-symbols-outlined text-[14px]">work</span>
            Task
          </span>
          {/* Priority */}
          <span className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider ${priorityColors[task.priority] || 'text-slate-500'}`}>
            <span className="material-symbols-outlined text-[14px]">stat_1</span>
            {task.priority}
          </span>
          {/* Attachments Indicator */}
          {task.attachments && task.attachments.length > 0 && (
            <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              <span className="material-symbols-outlined text-[14px]">attachment</span>
              {task.attachments.length}
            </span>
          )}
        </div>
      </div>

      {/* Time & Delete */}
      <div className="flex items-center gap-3 shrink-0">
        <p className={`text-xs font-bold uppercase tracking-tight ${isToday(parseISO(task.dueDate)) ? 'text-red-500' : 'text-slate-400'}`}>
          {isToday(parseISO(task.dueDate)) ? 'Today' : format(parseISO(task.dueDate), 'MMM d')}
        </p>

        {!isOverlay && onDelete && (
          <button
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
            className="size-8 rounded-full hover:bg-red-50 text-slate-300 hover:text-red-500 dark:hover:bg-red-900/20 transition-colors flex items-center justify-center -mr-2 opacity-0 group-hover:opacity-100"
          >
            <span className="material-symbols-outlined text-lg">delete</span>
          </button>
        )}
      </div>
    </div>
  );
}