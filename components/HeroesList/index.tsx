import styled from 'styled-components';
import Hero from '../Hero';
import { HeroesListTitle } from './HeroesList.Title';

interface Props {
  heroes: Hero[];
  selectedHeroes: Hero[];
  setSelectedHero: (hero: Hero) => void;
  limit: number;
  role: RoleType;
}

export const HeroesList: React.FC<Props> = ({ heroes, selectedHeroes, setSelectedHero, role, limit }) => {
  return (
    <>
      <HeroesListTitle count={selectedHeroes.length} limit={limit} role={role} />
      <ScrollContainer>
        <HorizontalList>
          {heroes.map((hero) => (
            <Hero
              key={hero.id}
              hero={hero}
              selected={selectedHeroes?.map((h) => h.id).includes(hero.id)}
              setSelectedHero={setSelectedHero}
            />
          ))}
        </HorizontalList>
      </ScrollContainer>
    </>
  );
};

const ScrollContainer = styled.div`
  overflow-x: auto;
  width: 100%;
  margin: 10px 0 30px 0;
`;

const HorizontalList = styled.div`
  display: flex;
  width: max-content;
  overflow-x: auto;
`;
