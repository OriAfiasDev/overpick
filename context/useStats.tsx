import { useState, useEffect, createContext, useContext, useCallback } from 'react';

type StatsContextProps = any;

const StatsContext = createContext<StatsContextProps>(null);

const StatsContextProvider: React.FC<any> = ({ children }) => {
  const [stats, setStats] = useState<StatsContextProps>(null);
  const [battleNet, _setBattleNet] = useState<{ gamerTag: string; nickName: string }>({ gamerTag: '', nickName: '' });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const gamerTag = window?.localStorage.getItem('gamerTag');
      const nickName = window?.localStorage.getItem('nickName');
      if (gamerTag && nickName) {
        _setBattleNet({ gamerTag, nickName });
      }
    }
  }, []);

  const setBattleNet = useCallback((gamerTag: string, nickName: string) => {
    _setBattleNet({ gamerTag, nickName });
    window?.localStorage.setItem('gamerTag', gamerTag);
    window?.localStorage.setItem('nickName', nickName);
  }, []);

  const fetchStats = useCallback(async () => {
    const { gamerTag, nickName } = battleNet;
    if (!gamerTag || !nickName) return;

    try {
      const res = await fetch(`https://overfast-api.tekrop.fr/players/${nickName}-${gamerTag}/stats/summary`);
      const data = await res.json();
      setStats(data);
    } catch {}
  }, [battleNet]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return <StatsContext.Provider value={{ stats, battleNet, setBattleNet }}>{children}</StatsContext.Provider>;
};

export const useStats = () => useContext(StatsContext);

export default StatsContextProvider;
