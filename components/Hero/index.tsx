import { useStats } from '@/context/useStats';
import React, { useMemo } from 'react';
import styled from 'styled-components';

interface Props {
  hero: Hero;
  selected?: boolean;
  setSelectedHero?: (hero: Hero) => void;
}

export const Hero: React.FC<Props> = ({ hero, selected, setSelectedHero, ...rest }) => {
  const { stats } = useStats();

  const statsString = useMemo(() => {
    if (!stats?.heroes[hero.name.toLowerCase()]) return 'no data';

    const { winrate, time_played, kda, games_played } = stats?.heroes[hero.name.toLowerCase()];

    return `${winrate}% win rate.
    ${(time_played / 60 / 60).toFixed(1)} hours played.
    ${kda} KDA ratio.
    ${games_played} games played.`;
  }, [stats]);

  return (
    <Container
      avatar_url={hero.avatar_url}
      selected={selected}
      onClick={() => (setSelectedHero ? setSelectedHero(hero) : null)}
      clickable={!!setSelectedHero}
      {...rest}
    >
      <span className='stats'>{statsString}</span>
      <span className='name'>{hero.name}</span>
    </Container>
  );
};

const Container = styled.div<{ avatar_url: string; selected?: boolean; clickable?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border: 4px solid ${({ selected }) => (selected ? 'var(--primary-ow)' : 'var(--secondary-ow)')};
  border-radius: 16px;
  height: 180px;
  width: 180px;
  margin: 0 0.25rem;
  cursor: ${({ clickable }) => (clickable ? 'pointer' : 'default')};
  background: ${({ avatar_url }) => `linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0) 100%),
    url(${avatar_url})`};
  transform: scale(0.95);
  transition: transform 0.25s ease-in-out;

  & > .name {
    font-size: 1.5rem;
    margin-bottom: 0;
    color: #fff;
  }

  & > .stats {
    opacity: 0;
    color: white;
    transition: opacity 0.25s ease-in-out;
    white-space: pre-line;
    font-size: 1.25rem;
    display: block;
    width: 100%;
  }

  &:hover {
    transform: scale(1);
    background: ${({ avatar_url }) =>
      `linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.5) 100%),url(${avatar_url})`};

    & > .stats {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    height: 120px;
    width: 120px;

    & > .stats {
      font-size: 1rem;
    }
  }
`;

export default Hero;
