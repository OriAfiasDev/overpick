import supabase from '@/backend/supabase';
import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuid } from 'uuid';

interface Counter {
  hero_id: string;
  countered_hero_id: string;
  match: number;
}

const counters = [
  {
    Hero: 'Ashe',
    Counter: 'Doomfist, Echo, Genji, Reaper, Roadhog, Soldier: 76, Sombra, Tracer',
  },
  {
    Hero: 'Bastion',
    Counter: 'Ana, Genji, Junkrat, Pharah, Roadhog, Sombra, Tracer, Zarya',
  },
  {
    Hero: 'Cassidy',
    Counter: 'Ana, Ashe, Bastion, Genji, Hanzo, Widowmaker',
  },
  {
    Hero: 'Echo',
    Counter: 'Ana, Ashe, Baptiste, Cassidy, D.Va, Junker Queen, Moira, Reaper, Soldier: 76, Widowmaker, Zarya',
  },
  {
    Hero: 'Genji',
    Counter: 'Brigitte, Mei, Moira, Symmetra, Winston, Zarya',
  },
  {
    Hero: 'Hanzo',
    Counter: 'D.Va, Genji, Lucio, Moira, Pharah, Sombra, Tracer, Wrecking Ball',
  },
  {
    Hero: 'Junkrat',
    Counter:
      'Ashe, D.va, Cassidy, Echo, Genji, Lucio, Pharah, Reaper, Roadhog, Soldier: 76, Sombra, Tracer, Wrecking Ball',
  },
  {
    Hero: 'Mei',
    Counter: 'Echo, Pharah, Reaper, Sombra, Tracer',
  },
  {
    Hero: 'Pharah',
    Counter: 'Ana, Ashe, Baptiste, Cassidy, D.va, Soldier: 76, Sombra, Widowmaker',
  },
  {
    Hero: 'Reaper',
    Counter: 'Ana, Ashe, Echo, Junkrat, Pharah, Ramattra, Widowmaker',
  },
  {
    Hero: 'Sojourn',
    Counter: 'D.Va, Lucio, Orisa, Reaper, Tracer, Sigma, Sombra, Zarya',
  },
  {
    Hero: 'Solider:76',
    Counter: 'Ana, Cassidy, D.va, Junkrat, Reaper, Roadhog, Widowmaker',
  },
  {
    Hero: 'Sombra',
    Counter: 'Ana, Brigitte, Junkrat, Mei, Moira, Pharah, Winston, Zarya',
  },
  {
    Hero: 'Symmetra',
    Counter: 'Echo, Junkrat, Pharah, Reaper, Sombra, Tracer, Winston',
  },
  {
    Hero: 'Torbjorn',
    Counter: 'Ana, Bastion, Junkrat, Pharah, Sombra, Widowmaker',
  },
  {
    Hero: 'Tracer',
    Counter: 'Ana, Junkrat, Pharah, Sombra, Widowmaker',
  },
  {
    Hero: 'Widowmaker',
    Counter: 'D.va, Genji, Sombra, Tracer, Winston',
  },

  {
    Hero: 'D.Va',
    Counter: 'Brigitte, Doomfist, Moira, Reaper, Roadhog, Sigma, Symmetra, Winston, Zarya',
  },
  {
    Hero: 'Doomfist',
    Counter: 'Ana, Ashe, Brigitte, Cassidy, Mei, Pharah, Roadhog',
  },
  {
    Hero: 'Junker Queen',
    Counter: 'Ana, Ashe, Baptiste, Cassidy, Pharah, Soldier: 76, Widowmaker, Zenyatta',
  },
  {
    Hero: 'Orisa',
    Counter:
      'Ana, Ashe, Baptiste, D.Va, Echo, Hanzo, Kiriko, Pharah, Reaper, Sojourn, Sombra, Soldier: 76, Widowmaker, Zenyatta',
  },
  {
    Hero: 'Ramattra',
    Counter: 'Ana, Bastion, D.Va, Kiriko, Orisa, Roadhog, Symmetra, Tracer, Zenyatta',
  },
  {
    Hero: 'Reinhardt',
    Counter: 'Ana, Brigitte, Junkrat, Mei, Pharah, Reaper, Sombra, Tracer',
  },
  {
    Hero: 'Roadhog',
    Counter: 'Ana, Genji, Echo, Junkrat, Pharah, Reaper, Sombra, Tracer, Widowmaker',
  },
  {
    Hero: 'Sigma',
    Counter: 'Genji, Lucio, Moira, Sombra, Symmetra, Tracer, Zarya',
  },
  {
    Hero: 'Winston',
    Counter: 'Ana, Brigitte, Mei, Roadhog',
  },
  {
    Hero: 'Wrecking Ball',
    Counter: 'Ana, Brigitte, Mei, Roadhog, Torbjorn',
  },
  {
    Hero: 'Zarya',
    Counter: 'Ashe, Bastion, D.Va, Echo, Pharah, Widowmaker',
  },

  {
    Hero: 'Ana',
    Counter: 'Echo, Genji, Lucio, Moira, Pharah, Sombra, Tracer',
  },
  {
    Hero: 'Baptiste',
    Counter: 'Ana, Echo, Genji, Hanzo, Lucio, Pharah, Reaper, Roadhog, Sombra, Tracer',
  },
  {
    Hero: 'Brigette',
    Counter: 'Cassidy, Bastion, D.Va, Echo, Genji, Junkrat, Moira, Pharah, Sombra, Tracer, Widowmaker',
  },
  {
    Hero: 'Kiriko',
    Counter: 'Ana, Ashe, Baptiste, Cassidy, Doomfist, Genji, Moira, Reaper, Sojourn, Tracer, Widowmaker, Wrecking Ball',
  },
  {
    Hero: 'Lucio',
    Counter: 'Ashe, Cassidy, Moira, Soldier: 76, Symmetra, Torbjorn, Winston, Zarya',
  },
  {
    Hero: 'Mercy',
    Counter: 'Ana, Ashe, Baptiste, Cassidy, Genji, Moira, Reaper, Roadhog, Soldier: 76, Winston, Wrecking Ball',
  },
  {
    Hero: 'Moira',
    Counter: 'Ana, Ashe, Echo, Genji, Pharah, Reaper, Sojourn, Sombra, Soldier: 76, Widowmaker',
  },
  {
    Hero: 'Zenyatta',
    Counter: 'D.Va, Echo, Genji, Pharah, Reaper, Sigma, Tracer, Widowmaker',
  },
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const json = await run();
  res.status(200).json(json);
}

const run = async () => {
  let { data: heroes, error } = await supabase.from('heroes').select('*');

  const json1 = counters.reduce((acc: { hero: string; counter: string[] }[], counter) => {
    return [...acc, { hero: counter.Hero, counter: counter.Counter.split(', ') }];
  }, []);

  if (heroes?.length) {
    const json = json1.reduce(
      (acc: { hero_id: string; countered_hero_id: string; match: number; id: string }[], counter) => {
        return [
          ...acc,
          ...counter.counter.map((c, i) => ({
            hero_id: heroes?.find((hero) => hero.name === counter.hero)?.id,
            countered_hero_id: heroes?.find((hero) => hero.name === c)?.id,
            match: counter.counter.length - i,
            id: uuid(),
          })),
        ];
      },
      []
    );

    console.log(json);
    // const { data } = await supabase.from('counters').insert(json);
    // return data;
  }
};
