import { useStats } from '@/context/useStats';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

export const BattleNet: React.FC = () => {
  const { battleNet, setBattleNet } = useStats();
  const [gamerTag, setGamerTag] = useState(battleNet.gamerTag);
  const [nickName, setNickName] = useState(battleNet.nickName);

  return (
    <Row>
      <input type='text' placeholder='NickName' value={nickName} onChange={(e) => setNickName(e.target.value)} />
      <input type='text' placeholder='GamerTag' value={gamerTag} onChange={(e) => setGamerTag(e.target.value)} />
      <button onClick={() => setBattleNet(gamerTag, nickName)}>Set BattleNet</button>
    </Row>
  );
};

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;
`;
