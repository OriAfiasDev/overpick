import { Damage } from '@/assets/Damage';
import { Support } from '@/assets/Support';
import { Tank } from '@/assets/Tank';
import supabase from '@/backend/supabase';
import { HeroesList } from '@/components/HeroesList';
import { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';

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
  const [myRole, setMyRole] = useState<string>('');
  const [bestCounters, setBestCounters] = useState<{ [name: string]: number }>({});

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
    setBestCounters(data);
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
    <div style={{ textAlign: 'center' }}>
      {allRoles.map((role) => (
        <div key={role}>
          <HeroesList
            role={role}
            limit={selectedHeroes[role].limit}
            selectedHeroes={selectedHeroes[role].heroes}
            setSelectedHero={(hero: Hero) => onSelectedHero(hero, role as RoleType)}
            heroes={heroes.filter((hero) => hero.role === role)}
          />
        </div>
      ))}
      <h1>My Role</h1>
      <Row>
        <RoleButton selected={myRole === 'tank'} onClick={() => setMyRole('tank')}>
          <Tank />
        </RoleButton>
        <RoleButton selected={myRole === 'damage'} onClick={() => setMyRole('damage')}>
          <Damage />
        </RoleButton>
        <RoleButton selected={myRole === 'support'} onClick={() => setMyRole('support')}>
          <Support />
        </RoleButton>
      </Row>
      <SubmitButton onClick={onSubmit} disabled={!isAllSelected || !myRole}>
        Generate Pick
      </SubmitButton>
      {Object.keys(bestCounters)
        .sort((a, b) => bestCounters[b] - bestCounters[a])
        .map((name) => (
          <div key={name}>
            {name}: Score {bestCounters[name]}
          </div>
        ))}
    </div>
  );
};

export default Team;

const SubmitButton = styled.span<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #df5e1d;
  border: 1px solid #df5e1d;
  margin: 20px;
  color: #fff;
  font-size: 24px;
  height: 70px;
  padding: 20px;
  cursor: pointer;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 0.87)};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: opacity 0.2s ease-in-out;

  &:hover {
    ${({ disabled }) => !disabled && 'opacity: 1'};
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RoleButton = styled(SubmitButton)<{ selected?: boolean }>`
  background-color: transparent;
  border-radius: 50%;
  height: auto;
  ${({ selected }) =>
    selected &&
    `
    background-color: #df5e1d;
    border: 1px solid #df5e1d;
  `}
`;

export async function getStaticProps() {
  let { data: heroes, error } = await supabase.from('heroes').select('*');

  return {
    props: {
      heroes,
    },
  };
}
