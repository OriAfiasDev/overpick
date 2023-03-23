import { PropsWithChildren } from 'react';
import styled from 'styled-components';

interface Props extends PropsWithChildren {
  disabled?: boolean;
  onClick?: () => void;
}

export const SubmitButton: React.FC<Props> = (props) => <Button {...props}>{props.children}</Button>;

const Button = styled.span<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primary-ow);
  border: 1px solid var(--primary-ow);
  margin: 20px;
  color: #fff;
  font-size: 24px;
  height: 70px;
  padding: 20px;
  cursor: pointer;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 0.87)};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: opacity 0.2s ease-in-out;

  &:hover {
    ${({ disabled }) => !disabled && 'opacity: 1'};
  }
`;
