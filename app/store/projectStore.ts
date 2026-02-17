import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useTaskStore } from './taskStore';

export type ProjectStatus = 'Active' | 'Pending Review' | 'Completed' | 'Archived';

export interface TeamMember {
    id: string; // email or unique ID
    role: 'Leader' | 'Member';
}

export interface Project {
    id: string;
    title: string;
    description: string;
    progress: number;
    status: ProjectStatus;
    statusColor: string;
    icon: string;
    iconBg: string;
    taskCount: string;
    teamMembers: TeamMember[];
    dueDate: string; // ISO string
    createdAt: string;
}

interface ProjectState {
    projects: Project[];
    addProject: (project: Omit<Project, 'id' | 'createdAt'>) => void;
    updateProject: (id: string, updates: Partial<Project>) => void;
    deleteProject: (id: string) => void;
}

export const useProjectStore = create<ProjectState>()(
    persist(
        (set) => ({
            projects: [
                {
                    id: '1',
                    title: 'Website Redesign',
                    description: 'Migrating the corporate site to a new headless CMS with a focus on core web vitals and SEO optimization.',
                    progress: 65,
                    status: 'Active',
                    statusColor: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
                    icon: 'language',
                    iconBg: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
                    taskCount: '14 Tasks Remaining',
                    teamMembers: [
                        { id: 'leader@example.com', role: 'Leader' },
                        { id: 'member1@example.com', role: 'Member' },
                        { id: 'member2@example.com', role: 'Member' }
                    ],
                    dueDate: new Date(Date.now() + 86400000 * 30).toISOString(),
                    createdAt: new Date().toISOString(),
                },
                {
                    id: '2',
                    title: 'Mobile App v2.0',
                    description: 'Developing the next major version of the iOS and Android application with biometric login features.',
                    progress: 32,
                    status: 'Active',
                    statusColor: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
                    icon: 'smartphone',
                    iconBg: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
                    taskCount: '28 Tasks Remaining',
                    teamMembers: [
                        { id: 'dev@example.com', role: 'Member' },
                        { id: 'leader2@example.com', role: 'Leader' }
                    ],
                    dueDate: new Date(Date.now() + 86400000 * 60).toISOString(),
                    createdAt: new Date().toISOString(),
                },
                {
                    id: '3',
                    title: 'Data Migration',
                    description: 'Internal migration of legacy customer data to the new unified PostgreSQL cloud instance.',
                    progress: 88,
                    status: 'Pending Review',
                    statusColor: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
                    icon: 'database',
                    iconBg: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
                    taskCount: '4 Tasks Remaining',
                    teamMembers: [
                        { id: 'admin@example.com', role: 'Leader' },
                        { id: 'analyst@example.com', role: 'Member' }
                    ],
                    dueDate: new Date(Date.now() + 86400000 * 7).toISOString(),
                    createdAt: new Date().toISOString(),
                },
                {
                    id: '4',
                    title: 'Q3 Brand Refresh',
                    description: 'Update all marketing collateral, presentation templates, and social media assets for the new season.',
                    progress: 100,
                    status: 'Completed',
                    statusColor: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
                    icon: 'verified',
                    iconBg: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
                    taskCount: 'All Tasks Done',
                    teamMembers: [
                        { id: 'design@example.com', role: 'Leader' }
                    ],
                    dueDate: new Date(Date.now() - 86400000 * 10).toISOString(),
                    createdAt: new Date().toISOString(),
                }
            ],
            addProject: (project) => {
                set((state) => ({
                    projects: [
                        ...state.projects,
                        {
                            ...project,
                            id: crypto.randomUUID(),
                            createdAt: new Date().toISOString(),
                        },
                    ],
                }));
                useTaskStore.getState().addNotification(`New project created: "${project.title}"`, 'success');
            },
            updateProject: (id, updates) =>
                set((state) => ({
                    projects: state.projects.map((p) =>
                        p.id === id ? { ...p, ...updates } : p
                    ),
                })),
            deleteProject: (id) =>
                set((state) => ({
                    projects: state.projects.filter((p) => p.id !== id),
                })),
        }),
        {
            name: 'project-storage',
        }
    )
);

