import Hero from '../Hero';
import styles from './HeroesList.module.css';

interface Props {
  heroes: Hero[];
  selectedHeroes?: Hero[];
  setSelectedHero: (hero: Hero) => void;
  limit: number;
}

export const HeroesList: React.FC<Props> = ({ heroes, selectedHeroes, setSelectedHero }) => {
  return (
    <div className={styles.heroesGrid}>
      {heroes.map((hero) => (
        <Hero
          key={hero.id}
          hero={hero}
          selected={selectedHeroes?.map((h) => h.id).includes(hero.id)}
          setSelectedHero={setSelectedHero}
        />
      ))}
    </div>
  );
};
