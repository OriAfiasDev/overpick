import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Hero from '../Hero';
import { Title } from '../HeroesList/HeroesList.Title';

interface Props {
  topCounters: CountersMap;
}

export const TopCounters: React.FC<Props> = ({ topCounters }) => {
  const [topHeroes, setTopHeroes] = useState<Hero[]>([]);

  useEffect(() => {
    console.log(topCounters);

    const sortedCounters = Object.keys(topCounters || [])
      .sort((a, b) => topCounters[a].match - topCounters[a].match)
      .slice(0, 3);

    setTopHeroes(sortedCounters.map((hero) => topCounters[hero].hero));
  }, [topCounters]);

  if (!topHeroes?.length) return null;

  return (
    <div>
      <Title>Top Counters</Title>
      <Row>
        <Counter hero={topHeroes[1]} size={150} />
        <Counter hero={topHeroes[0]} size={200} />
        <Counter hero={topHeroes[2]} size={150} />
      </Row>
    </div>
  );
};

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-end;
`;

const Counter = styled(Hero)<{ size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`;
