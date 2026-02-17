import { create } from 'zustand';
import { persist } from 'zustand/middleware';
// uuid import removed as we use crypto.randomUUID()

export type TaskStatus = 'To Do' | 'In Progress' | 'Review' | 'Done';
export type TaskPriority = 'Low' | 'Medium' | 'High';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string; // ISO string
  createdAt: string;
  assignee?: string; // New field
  attachments?: string[]; // New field (filenames)
}

interface TaskState {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  moveTask: (id: string, newStatus: TaskStatus) => void;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [
        {
          id: '1',
          title: 'Finalize Design System Components',
          status: 'To Do',
          priority: 'High',
          dueDate: new Date().toISOString(), // Today
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          title: 'Weekly Sync with Engineering Team',
          status: 'To Do',
          priority: 'Medium',
          dueDate: new Date().toISOString(), // Today
          createdAt: new Date().toISOString(),
        },
        {
          id: '3',
          title: 'Prepare Presentation for Stakeholders',
          status: 'In Progress',
          priority: 'Low',
          dueDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
          createdAt: new Date().toISOString(),
        },
        {
          id: '4',
          title: 'Code Review for Authentication',
          status: 'Review',
          priority: 'High',
          dueDate: new Date(Date.now() - 86400000).toISOString(), // Yesterday
          createdAt: new Date().toISOString(),
        }
      ],
      addTask: (task) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              ...task,
              id: crypto.randomUUID(), // Native UUID
              createdAt: new Date().toISOString(),
            },
          ],
        })),
      updateTask: (id, updates) =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
        })),
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        })),
      moveTask: (id, newStatus) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, status: newStatus } : t
          ),
        })),
    }),
    {
      name: 'task-storage',
    }
  )
);
