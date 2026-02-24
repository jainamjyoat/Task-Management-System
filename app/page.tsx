"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from './store/authStore';

const TaskMasterLogin: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  // Redirect to auth page or dashboard
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    } else {
      router.push('/auth');
    }
  }, [isAuthenticated, router]);

  return null;
};

export default TaskMasterLogin;
