import { Damage } from './Damage';
import { Support } from './Support';
import { Tank } from './Tank';

const DEFAULT_ICON_SIZE = 24;
const DEFAULT_ICON_COLOR = '#fff';

export const getRoleIcon = (role: RoleType, color: string = DEFAULT_ICON_COLOR, size: number = DEFAULT_ICON_SIZE) => {
  switch (role) {
    case 'tank':
      return <Tank color={color} size={size} />;
    case 'damage':
      return <Damage color={color} size={size} />;
    case 'support':
      return <Support color={color} size={size} />;
    default:
      return null;
  }
};
