import supabase from '@/backend/supabase';
import { HeroesList } from '@/components/HeroesList';
import { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';

interface Props {
  heroes: any[];
}

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
  const [selectedHeroes, setSelectedHeroes] = useState<SelectedHeroes>(initialSelectedHeroes);
  const [bestCounters, setBestCounters] = useState<{ [name: string]: number }>({});

  const isAllSelected = useMemo(
    () => Object.values(selectedHeroes).every((role) => role.heroes.length === role.limit),
    [selectedHeroes]
  );

  const onSubmit = async () => {
    if (!isAllSelected) return;

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
          <HeroesList
            role={role}
            limit={selectedHeroes[role].limit}
            selectedHeroes={selectedHeroes[role].heroes}
            setSelectedHero={(hero: Hero) => onSelectedHero(hero, role as Role)}
            heroes={heroes.filter((hero) => hero.role === role)}
          />
        </div>
      ))}
      <SubmitButton onClick={onSubmit} disabled={!isAllSelected}>
        Generate Pick
      </SubmitButton>
    </div>
  );
};

export default Team;

const SubmitButton = styled.span<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #df5e1d;
  margin: 20px;
  color: #fff;
  font-size: 24px;
  height: 70px;
  padding: 20px;
  border: none;
  cursor: pointer;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 0.87)};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: opacity 0.2s ease-in-out;

  &:hover {
    ${({ disabled }) => !disabled && 'opacity: 1'};
  }
`;

export async function getStaticProps() {
  let { data: heroes, error } = await supabase.from('heroes').select('*');

  return {
    props: {
      heroes,
    },
  };
}
