import styled from 'styled-components';
import Hero from '../Hero';
import { HeroesListTitle } from './HeroesList.Title';

interface Props {
  heroes: Hero[];
  selectedHeroes: Hero[];
  setSelectedHero: (hero: Hero) => void;
  limit: number;
  role: Role;
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
  overflow-x: scroll;
  width: 100vw;
`;

const HorizontalList = styled.div`
  display: flex;
  width: max-content;
  height: 180px;
  padding: 0;
  margin: 0;
  overflow-x: scroll;
  margin: 10px 0 30px 0;

  @media (max-width: 768px) {
    height: 120px;
  }
`;
