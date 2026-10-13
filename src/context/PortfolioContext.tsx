import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Project, SkillItem, Certificate } from '../types';

export interface PortfolioData {
  settings: any;
  projects: Project[];
  skills: SkillItem[];
  services: any[];
  learning: any[];
  certificates: Certificate[];
}

interface PortfolioContextType {
  settings: any;
  projects: Project[];
  skills: SkillItem[];
  services: any[];
  learning: any[];
  certificates: Certificate[];
  loading: boolean;
  refreshData: (force?: boolean) => Promise<void>;
}

const CACHE_KEY = 'marium_portfolio_bootstrap_cache';

// Early load from localStorage for 0ms instant render on repeated visits/refreshes
let initialCachedData: PortfolioData | null = null;
try {
  const stored = localStorage.getItem(CACHE_KEY);
  if (stored) {
    initialCachedData = JSON.parse(stored);
  }
} catch (e) {
  // Ignore localStorage parsing errors
}

// Early fetch kickoff as soon as JS bundle executes
let earlyFetchPromise: Promise<PortfolioData | null> | null = null;
function fetchBootstrapAPI(force = false): Promise<PortfolioData | null> {
  const url = force ? `/api/portfolio/bootstrap?t=${Date.now()}` : '/api/portfolio/bootstrap';
  return fetch(url)
    .then((r) => {
      if (!r.ok) throw new Error('Bootstrap request failed');
      return r.json();
    })
    .then((res) => {
      if (res.success && res.data) {
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify(res.data));
        } catch (e) {}
        return res.data as PortfolioData;
      }
      return null;
    })
    .catch((err) => {
      console.warn('Portfolio bootstrap note:', err);
      return null;
    });
}

// Kick off immediately on module evaluation
if (typeof window !== 'undefined') {
  earlyFetchPromise = fetchBootstrapAPI(false);
}

const PortfolioContext = createContext<PortfolioContextType>({
  settings: initialCachedData?.settings || null,
  projects: initialCachedData?.projects || [],
  skills: initialCachedData?.skills || [],
  services: initialCachedData?.services || [],
  learning: initialCachedData?.learning || [],
  certificates: initialCachedData?.certificates || [],
  loading: !initialCachedData,
  refreshData: async () => {},
});

export const PortfolioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData | null>(initialCachedData);
  const [loading, setLoading] = useState<boolean>(!initialCachedData);

  const refreshData = useCallback(async (force = false) => {
    try {
      const result = await fetchBootstrapAPI(force);
      if (result) {
        setData(result);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    // If early fetch already started, await it
    if (earlyFetchPromise) {
      earlyFetchPromise.then((result) => {
        if (!isMounted) return;
        if (result) {
          setData(result);
        }
        setLoading(false);
        earlyFetchPromise = null;
      });
    } else {
      refreshData();
    }

    return () => {
      isMounted = false;
    };
  }, [refreshData]);

  const value: PortfolioContextType = {
    settings: data?.settings || null,
    projects: data?.projects || [],
    skills: data?.skills || [],
    services: data?.services || [],
    learning: data?.learning || [],
    certificates: data?.certificates || [],
    loading,
    refreshData,
  };

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
};

export const usePortfolioData = () => useContext(PortfolioContext);

// Global helper to invalidate cache when Admin saves content
export const invalidatePortfolioCache = () => {
  try {
    localStorage.removeItem(CACHE_KEY);
  } catch (e) {}
  earlyFetchPromise = fetchBootstrapAPI(true);
};
