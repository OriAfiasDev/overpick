interface Hero {
  id: string;
  name: string;
  role: 'tank' | 'damage' | 'support';
  description: string;
  avatar_url: string;
  health?: number;
}
