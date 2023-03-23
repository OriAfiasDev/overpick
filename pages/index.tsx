import supabase from '@/backend/supabase';
import { HeroesList } from '@/components/HeroesList';
import RolePicker from '@/components/RolePicker';
import { SubmitButton } from '@/components/SubmitButton';
import { TopCounters } from '@/components/TopCounters';
import { useCallback, useMemo, useState } from 'react';

interface Props {
  heroes: any[];
}

type SelectedHero = { heroes: Hero[]; limit: number };

type SelectedHeroes = {
  [role in RoleType]: SelectedHero;
};

const initialSelectedHeroes: SelectedHeroes = {
  tank: { heroes: [], limit: 1 },
  damage: { heroes: [], limit: 2 },
  support: { heroes: [], limit: 2 },
};

const allRoles: RoleType[] = ['tank', 'damage', 'support'];

const Team: React.FC<Props> = ({ heroes }) => {
  const [selectedHeroes, setSelectedHeroes] = useState<SelectedHeroes>(initialSelectedHeroes);
  const [myRole, setMyRole] = useState<RoleType | null>(null);
  const [topCounters, setTopCounters] = useState<CountersMap>(null!);

  const isAllSelected = useMemo(
    () => Object.values(selectedHeroes).every((role) => role.heroes.length === role.limit),
    [selectedHeroes]
  );

  const onSubmit = useCallback(async () => {
    if (!isAllSelected || !myRole) return;

    const enemyTeam = Object.values(selectedHeroes).reduce(
      (acc: string[], role: SelectedHero) => [...acc, ...role.heroes.map((h) => h.id)],
      []
    );

    const res = await fetch('/api/counters', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ enemyTeam, myRole }),
    });

    const data = await res.json();
    setTopCounters(data);
  }, [selectedHeroes, isAllSelected, myRole]);

  const onSelectedHero = useCallback((hero: Hero, role: RoleType) => {
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
    <div>
      {allRoles.map((role) => (
        <HeroesList
          key={role}
          role={role}
          limit={selectedHeroes[role].limit}
          selectedHeroes={selectedHeroes[role].heroes}
          setSelectedHero={(hero: Hero) => onSelectedHero(hero, role as RoleType)}
          heroes={heroes.filter((hero) => hero.role === role)}
        />
      ))}
      <RolePicker selectedRole={myRole} setSelectedRole={setMyRole} />
      <SubmitButton onClick={onSubmit} disabled={!isAllSelected || !myRole}>
        generate pick
      </SubmitButton>
      <TopCounters topCounters={topCounters} />
    </div>
  );
};

export async function getStaticProps() {
  let { data: heroes } = await supabase.from('heroes').select('*');

  return {
    props: {
      heroes,
    },
  };
}

export default Team;
