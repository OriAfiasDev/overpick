interface Hero {
  id: string;
  name: string;
  role: 'tank' | 'damage' | 'support';
  description: string;
  avatar_url: string;
  health?: number;
}

interface Role {
  id: string;
  name: string;
  description: string;
  avatar_url: string;
}

interface Counter {
  hero: { name: string };
  counter: Hero;
  match: number;
}

type CountersMap = { [name: string]: { hero: Hero; match: number } };
