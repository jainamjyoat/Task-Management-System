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
  completedAt?: string; // ISO string
}

export interface Notification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning';
  createdAt: string;
  read: boolean;
}

interface TaskState {
  tasks: Task[];
  notifications: Notification[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  moveTask: (id: string, newStatus: TaskStatus) => void;
  addNotification: (message: string, type: 'info' | 'success' | 'warning') => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  clearNotifications: () => void;
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
      notifications: [
        {
          id: '1',
          message: 'Welcome to TaskMaster! Try creating a new task.',
          type: 'info',
          createdAt: new Date().toISOString(),
          read: false,
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
              completedAt: task.status === 'Done' ? new Date().toISOString() : undefined,
            },
          ],
          // Add notification when task is created
          notifications: [
            {
              id: crypto.randomUUID(),
              message: `New task created: "${task.title}"`,
              type: 'success',
              createdAt: new Date().toISOString(),
              read: false,
            },
            ...state.notifications,
          ],
        })),
      updateTask: (id, updates) =>
        set((state) => ({
          tasks: state.tasks.map((t) => {
            if (t.id !== id) return t;

            // Logic for completedAt
            const newStatus = updates.status;
            let completedAt = t.completedAt;

            if (newStatus === 'Done' && t.status !== 'Done') {
              completedAt = new Date().toISOString();
            } else if (newStatus && newStatus !== 'Done') {
              completedAt = undefined;
            }

            return { ...t, ...updates, completedAt };
          }),
        })),
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        })),
      moveTask: (id, newStatus) =>
        set((state) => ({
          tasks: state.tasks.map((t) => {
            if (t.id !== id) return t;

            let completedAt = t.completedAt;
            if (newStatus === 'Done' && t.status !== 'Done') {
              completedAt = new Date().toISOString();
            } else if (newStatus !== 'Done') {
              completedAt = undefined;
            }

            return { ...t, status: newStatus, completedAt };
          }),
        })),
      addNotification: (message, type) =>
        set((state) => ({
          notifications: [
            {
              id: crypto.randomUUID(),
              message,
              type,
              createdAt: new Date().toISOString(),
              read: false,
            },
            ...state.notifications,
          ],
        })),
      markNotificationRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        })),
      markAllNotificationsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
        })),
      clearNotifications: () =>
        set((state) => ({
          notifications: [],
        })),
    }),
    {
      name: 'task-storage',
    }
  )
);

