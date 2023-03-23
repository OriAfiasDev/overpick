import { useState, useEffect, createContext, useContext, useCallback } from 'react';

type StatsContextProps = any;

const StatsContext = createContext<StatsContextProps>(null);

const StatsContextProvider: React.FC<any> = ({ children }) => {
  const [stats, setStats] = useState<StatsContextProps>(null);

  const fetchStats = useCallback(async () => {
    const res = await fetch(`https://overfast-api.tekrop.fr/players/JahNuN-21217/stats/summary`);
    const data = await res.json();
    setStats(data);
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return <StatsContext.Provider value={stats}>{children}</StatsContext.Provider>;
};

export const useStats = () => useContext(StatsContext);

export default StatsContextProvider;
