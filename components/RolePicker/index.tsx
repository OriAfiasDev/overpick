import { getRoleIcon } from '@/assets';
import styled from 'styled-components';
import { Title } from '../HeroesList/HeroesList.Title';
import { SubmitButton } from '../SubmitButton';

interface Props {
  selectedRole: RoleType | null;
  setSelectedRole: (role: RoleType) => void;
}

const allRoles: RoleType[] = ['tank', 'damage', 'support'];

const RolePicker: React.FC<Props> = ({ selectedRole, setSelectedRole }) => (
  <>
    <Title>My Role</Title>
    <Row>
      {allRoles.map((role) => (
        <RoleButton key={role} selected={selectedRole === role} onClick={() => setSelectedRole(role)}>
          {getRoleIcon(role)}
        </RoleButton>
      ))}
    </Row>
  </>
);

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RoleButton = styled(SubmitButton)<{ selected?: boolean }>`
  background-color: transparent;
  opacity: 1;
  border-radius: 50%;
  height: auto;
  ${({ selected }) =>
    selected &&
    `
    background-color: var(--primary-ow);
    border: 1px solid var(--primary-ow);
  `}
`;

export default RolePicker;
