import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_APPS } from '@/data';
import { AppData } from '@/types';
import { supabaseService } from '@/lib/supabase';

interface AppContextType {
  apps: AppData[];
  isLoading: boolean;
  addApp: (app: AppData) => Promise<void>;
  updateApp: (app: AppData) => Promise<void>;
  deleteApp: (id: string) => Promise<void>;
  getApp: (id: string) => AppData | undefined;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [apps, setApps] = useState<AppData[]>(INITIAL_APPS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadApps = async () => {
      try {
        const data = await supabaseService.fetchApps();
        if (data && data.length > 0) {
          setApps(data);
        } else if (data && data.length === 0) {
          // If database is empty, we could optionally seed it or just show empty
          setApps([]);
        }
      } catch (error) {
        console.error('Error loading apps from Supabase:', error);
        // Fallback to localStorage if Supabase fails
        const saved = localStorage.getItem('my-ai-apps');
        if (saved) setApps(JSON.parse(saved));
      } finally {
        setIsLoading(false);
      }
    };

    loadApps();
  }, []);

  const addApp = async (app: AppData) => {
    try {
      await supabaseService.addApp(app);
      setApps((prev) => [app, ...prev]);
    } catch (error) {
      console.error('Error adding app:', error);
      // Local fallback
      setApps((prev) => [app, ...prev]);
      localStorage.setItem('my-ai-apps', JSON.stringify([app, ...apps]));
      throw error; // Re-throw to inform the component
    }
  };

  const updateApp = async (updatedApp: AppData) => {
    try {
      await supabaseService.updateApp(updatedApp);
      setApps((prev) =>
        prev.map((app) => (app.id === updatedApp.id ? updatedApp : app))
      );
    } catch (error) {
      console.error('Error updating app:', error);
      setApps((prev) =>
        prev.map((app) => (app.id === updatedApp.id ? updatedApp : app))
      );
      throw error; // Re-throw
    }
  };

  const deleteApp = async (id: string) => {
    try {
      await supabaseService.deleteApp(id);
      setApps((prev) => prev.filter((app) => app.id !== id));
    } catch (error) {
      console.error('Error deleting app:', error);
      setApps((prev) => prev.filter((app) => app.id !== id));
      throw error; // Re-throw
    }
  };

  const getApp = (id: string) => {
    return apps.find((app) => app.id === id);
  };

  return (
    <AppContext.Provider value={{ apps, isLoading, addApp, updateApp, deleteApp, getApp }}>
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
