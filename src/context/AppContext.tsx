import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_APPS } from '@/data';
import { AppData } from '@/types';

interface AppContextType {
  apps: AppData[];
  addApp: (app: AppData) => void;
  updateApp: (app: AppData) => void;
  deleteApp: (id: string) => void;
  getApp: (id: string) => AppData | undefined;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [apps, setApps] = useState<AppData[]>(() => {
    const saved = localStorage.getItem('my-ai-apps');
    return saved ? JSON.parse(saved) : INITIAL_APPS;
  });

  useEffect(() => {
    localStorage.setItem('my-ai-apps', JSON.stringify(apps));
  }, [apps]);

  const addApp = (app: AppData) => {
    setApps((prev) => [...prev, app]);
  };

  const updateApp = (updatedApp: AppData) => {
    setApps((prev) =>
      prev.map((app) => (app.id === updatedApp.id ? updatedApp : app))
    );
  };

  const deleteApp = (id: string) => {
    setApps((prev) => prev.filter((app) => app.id !== id));
  };

  const getApp = (id: string) => {
    return apps.find((app) => app.id === id);
  };

  return (
    <AppContext.Provider value={{ apps, addApp, updateApp, deleteApp, getApp }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApps() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApps must be used within an AppProvider');
  }
  return context;
}
