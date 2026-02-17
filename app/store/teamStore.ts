import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useTaskStore } from './taskStore';

export type MemberStatus = 'Available' | 'Busy' | 'On Leave' | 'Offline';

export interface Member {
    id: string;
    name: string;
    role: string;
    status: MemberStatus;
    imageSeed: string;
    tasks: number;
    capacity: number;
}

interface TeamState {
    members: Member[];
    updateMemberStatus: (id: string, status: MemberStatus) => void;
    removeMember: (id: string) => void;
    addMember: (member: Omit<Member, 'id' | 'imageSeed' | 'tasks' | 'capacity'>) => void;
}

export const useTeamStore = create<TeamState>()(
    persist(
        (set) => ({
            members: [
                {
                    id: '1',
                    name: 'Alex Rivera',
                    role: 'Lead Developer',
                    status: 'Available',
                    imageSeed: '11',
                    tasks: 4,
                    capacity: 85,
                },
                {
                    id: '2',
                    name: 'Sarah Chen',
                    role: 'Senior Designer',
                    status: 'Busy',
                    imageSeed: '12',
                    tasks: 6,
                    capacity: 92,
                },
                {
                    id: '3',
                    name: 'Jordan Smith',
                    role: 'Product Manager',
                    status: 'On Leave',
                    imageSeed: '13',
                    tasks: 0,
                    capacity: 0,
                },
                {
                    id: '4',
                    name: 'Elena Rodriguez',
                    role: 'QA Engineer',
                    status: 'Busy',
                    imageSeed: '14',
                    tasks: 5,
                    capacity: 75,
                },
                {
                    id: '5',
                    name: 'Marcus Thorne',
                    role: 'Backend Developer',
                    status: 'Available',
                    imageSeed: '15',
                    tasks: 3,
                    capacity: 45,
                },
                {
                    id: '6',
                    name: 'Lisa Wang',
                    role: 'UX Researcher',
                    status: 'Available',
                    imageSeed: '16',
                    tasks: 1,
                    capacity: 20,
                },
            ],
            updateMemberStatus: (id, status) => {
                set((state) => {
                    const member = state.members.find((m) => m.id === id);
                    if (member && member.status !== status) {
                        useTaskStore.getState().addNotification(
                            `${member.name} is now ${status}`,
                            'info'
                        );
                    }
                    return {
                        members: state.members.map((m) =>
                            m.id === id ? { ...m, status } : m
                        ),
                    };
                });
            },
            removeMember: (id) => {
                set((state) => {
                    const member = state.members.find((m) => m.id === id);
                    if (member) {
                        useTaskStore.getState().addNotification(
                            `${member.name} has been removed from the team`,
                            'warning'
                        );
                    }
                    return {
                        members: state.members.filter((m) => m.id !== id),
                    };
                });
            },
            addMember: (memberData) => {
                set((state) => {
                    const newMember: Member = {
                        ...memberData,
                        id: crypto.randomUUID(),
                        imageSeed: Math.random().toString(36).substring(7),
                        tasks: 0,
                        capacity: 100,
                    };
                    useTaskStore.getState().addNotification(
                        `${newMember.name} has been added to the team`,
                        'success'
                    );
                    return {
                        members: [...state.members, newMember],
                    };
                });
            },
        }),
        {
            name: 'team-storage',
        }
    )
);
