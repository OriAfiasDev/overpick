import { getRoleIcon } from '@/assets';
import styled from 'styled-components';

interface Props {
  count: number;
  limit: number;
  role: RoleType;
}

export const HeroesListTitle: React.FC<Props> = ({ count, limit, role }) => (
  <Title>
    Pick enemy
    <span className='icon'>{getRoleIcon(role)}</span>
    <span className='count'>
      ({count} of {limit})
    </span>
  </Title>
);

export const Title = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;

  & > .icon {
    margin: 0 10px;
  }

  & > .count {
    font-size: 1.5rem;
  }
`;
