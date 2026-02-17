'use client';

import React, { useMemo } from 'react';
import { useTaskStore, Task } from '../../store/taskStore';
import { format, isToday, isFuture, parseISO, addDays, isPast } from 'date-fns';
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
  const { tasks, moveTask, updateTask } = useTaskStore();
  const [activeId, setActiveId] = React.useState<string | null>(null);

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

  const activeTask = tasks.find(t => t.id === activeId);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-col h-full">
        {/* Page Title Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-black tracking-tight mb-2 text-slate-900 dark:text-white">
            My Tasks
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            Good morning. You have {todayTasks.length} tasks to complete today.
          </p>
        </div>

        {/* Task Sections Container */}
        <div className="space-y-10 pb-8">

          <DroppableSection id="today-container" title="Today" count={todayTasks.length}>
            {todayTasks.map(task => (
              <DraggableTaskCard key={task.id} task={task} />
            ))}
            {todayTasks.length === 0 && <EmptyPlaceholder />}
          </DroppableSection>

          <DroppableSection id="upcoming-container" title="Upcoming" count={upcomingTasks.length}>
            {upcomingTasks.map(task => (
              <DraggableTaskCard key={task.id} task={task} />
            ))}
            {upcomingTasks.length === 0 && <EmptyPlaceholder />}
          </DroppableSection>

          <DroppableSection id="later-container" title="Later" count={laterTasks.length}>
            {laterTasks.map(task => (
              <DraggableTaskCard key={task.id} task={task} />
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

function DraggableTaskCard({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} className={isDragging ? 'opacity-50' : ''}>
      <TaskCard task={task} />
    </div>
  )
}


function TaskCard({ task, isOverlay }: { task: Task, isOverlay?: boolean }) {
  const { updateTask } = useTaskStore();

  const handleToggleDone = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent drag start when clicking checkbox
    updateTask(task.id, { status: 'Done' });
  };

  const priorityColors: Record<string, string> = {
    High: 'text-red-500',
    Medium: 'text-amber-500',
    Low: 'text-slate-400',
  };

  return (
    <div className={`group bg-white dark:bg-[#111318] border border-slate-200 dark:border-slate-800 p-4 rounded-xl flex items-center gap-4 hover:border-[#1f68f9]/50 transition-all cursor-grab active:cursor-grabbing ${isOverlay ? 'shadow-2xl scale-105 border-[#1f68f9]' : 'shadow-sm'}`}>
      {/* Checkbox / Button */}
      <button
        onPointerDown={(e) => e.stopPropagation()} // Prevent drag
        onClick={handleToggleDone}
        className="size-6 rounded-md border-2 border-slate-300 dark:border-slate-700 flex items-center justify-center text-[#1f68f9] hover:border-[#1f68f9] transition-colors bg-transparent"
      >
        <span className="material-symbols-outlined text-lg opacity-0 hover:opacity-100 transition-opacity">
          check
        </span>
      </button>

      {/* Content */}
      <div className="flex-1">
        <h4 className="font-semibold text-sm mb-1 text-slate-900 dark:text-white line-clamp-1">
          {task.title}
        </h4>
        <div className="flex items-center gap-3">
          {/* Tag (Static for now) */}
          <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            <span className="material-symbols-outlined text-[14px]">work</span>
            Task
          </span>
          {/* Priority */}
          <span className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider ${priorityColors[task.priority] || 'text-slate-500'}`}>
            <span className="material-symbols-outlined text-[14px]">stat_1</span>
            {task.priority}
          </span>
        </div>
      </div>

      {/* Time */}
      <div className="text-right shrink-0">
        <p className={`text-xs font-bold uppercase tracking-tight ${isToday(parseISO(task.dueDate)) ? 'text-red-500' : 'text-slate-400'}`}>
          {isToday(parseISO(task.dueDate)) ? 'Today' : format(parseISO(task.dueDate), 'MMM d')}
        </p>
      </div>
    </div>
  );
}