import styled from 'styled-components';

interface Props {
  count: number;
  limit: number;
  role: Role;
}

export const HeroesListTitle: React.FC<Props> = ({ count, limit, role }) => (
  <Title>
    Pick enemy {role}&nbsp;
    <span>
      ({count} of {limit})
    </span>
  </Title>
);

const Title = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;

  & > span {
    font-size: 1.5rem;
  }
`;
