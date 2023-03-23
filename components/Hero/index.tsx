import React from 'react';
import styled from 'styled-components';

interface Props {
  hero: Hero;
  selected?: boolean;
  setSelectedHero?: (hero: Hero) => void;
}

export const Hero: React.FC<Props> = ({ hero, selected, setSelectedHero, ...rest }) => {
  return (
    <Container
      avatar_url={hero.avatar_url}
      selected={selected}
      onClick={() => (setSelectedHero ? setSelectedHero(hero) : null)}
      clickable={!!setSelectedHero}
      {...rest}
    >
      <span className='name'>{hero.name}</span>
    </Container>
  );
};

const Container = styled.div<{ avatar_url: string; selected?: boolean; clickable?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  border: 4px solid ${({ selected }) => (selected ? '#df5e1d' : '#ddd')};
  border-radius: 16px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  height: 180px;
  width: 180px;
  margin: 0 0.5rem;
  cursor: ${({ clickable }) => (clickable ? 'pointer' : 'default')};

  background-image: ${({
    avatar_url,
  }) => `linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0) 100%),
    url(${avatar_url})`};

  & > .name {
    font-size: 1.5rem;
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    height: 120px;
    width: 120px;
  }
`;

export default Hero;
