import React from 'react';
import styled from 'styled-components';
import styles from './Hero.module.css';

interface Props {
  hero: Hero;
  selected?: boolean;
  setSelectedHero: (hero: Hero) => void;
}

export const Hero: React.FC<Props> = ({ hero, selected, setSelectedHero }) => {
  return (
    <Container avatar_url={hero.avatar_url} selected={selected} onClick={() => setSelectedHero(hero)}>
      {/* <img className={styles.image} src={avatar_url} alt={name} /> */}
      <span className={styles.name}>{hero.name}</span>
      {/* <p className={styles.role}>Role: {role}</p>
      <p className={styles.health}>Health: {health}</p> */}
      {/* <p className={styles.description}>{description}</p> */}
    </Container>
  );
};

const Container = styled.div<{ avatar_url: string; selected?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding: 0rem;
  border: 4px solid ${({ selected }) => (selected ? '#df5e1d' : '#ddd')};
  border-radius: 16px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  height: 180px;
  width: 180px;
  margin: 0 0.5rem;
  cursor: pointer;

  background-image: ${({
    avatar_url,
  }) => `linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0) 100%),
    url(${avatar_url})`};
`;

export default Hero;
