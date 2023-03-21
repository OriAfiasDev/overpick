import supabase from '@/backend/supabase';
import { Hero } from '@/components/Hero';
import { HeroesList } from '@/components/HeroesList';
import { useCallback, useEffect, useState } from 'react';

interface Props {
  heroes: any[];
}

type Role = 'tank' | 'damage' | 'support';

type SelectedHeroes = {
  [role in Role]: { heroes: Hero[]; limit: number };
};

const initialSelectedHeroes: SelectedHeroes = {
  tank: { heroes: [], limit: 1 },
  damage: { heroes: [], limit: 2 },
  support: { heroes: [], limit: 2 },
};

const allRoles: Role[] = ['tank', 'damage', 'support'];

const Team: React.FC<Props> = ({ heroes }) => {
  const tanks = heroes.filter((hero) => hero.role === 'tank');
  const [selectedHeroes, setSelectedHeroes] = useState<SelectedHeroes>(initialSelectedHeroes);
  const [bestCounters, setBestCounters] = useState<{ [name: string]: number }>({});

  const onSubmit = async () => {
    const res = await fetch('/api/counters', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        enemyTeam: [
          ...selectedHeroes.damage.heroes.map((h) => h.name),
          ...selectedHeroes.support.heroes.map((h) => h.name),
          ...selectedHeroes.tank.heroes.map((h) => h.name),
        ],
        myPick: 'tank',
      }),
    });
    const data = await res.json();
    setBestCounters(data.countersMap);
  };

  const onSelectedHero = useCallback((hero: Hero, role: Role) => {
    setSelectedHeroes((prev) => ({
      ...prev,
      [role]: {
        ...prev[role],
        heroes: prev[role].heroes.some((h) => h.id === hero.id)
          ? [...prev[role].heroes.filter((h) => h.id !== hero.id)]
          : prev[role].limit === prev[role].heroes.length
          ? [...prev[role].heroes.slice(0, -1), hero]
          : [...prev[role].heroes, hero],
      },
    }));
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      {Object.keys(bestCounters)
        .sort((a, b) => bestCounters[b] - bestCounters[a])
        .map((name) => (
          <div key={name}>
            {name}: Score {bestCounters[name]}
          </div>
        ))}
      {allRoles.map((role) => (
        <div key={role}>
          <h1>Pick enemy {role}</h1>
          <HeroesList
            limit={selectedHeroes[role].limit}
            selectedHeroes={selectedHeroes[role].heroes}
            setSelectedHero={(hero: Hero) => onSelectedHero(hero, role as Role)}
            heroes={heroes.filter((hero) => hero.role === role)}
          />
        </div>
      ))}
      <button onClick={onSubmit}>Go go go</button>
    </div>
  );
};

export default Team;

export async function getStaticProps() {
  let { data: heroes, error } = await supabase.from('heroes').select('*');

  return {
    props: {
      heroes,
    },
  };
}
