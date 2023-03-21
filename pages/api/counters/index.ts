import supabase from '@/backend/supabase';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body);
  const json = await run(req.body.enemyTeam, req.body.myPick);
  res.status(200).json(json);
}

const run = async (enemyTeam: string[], myPick: string) => {
  const { data: enemyTeamIds } = await supabase.from('heroes').select('id').in('name', enemyTeam);

  let { data: counters, error } = await supabase
    .from('counters')
    .select(
      `match,
      hero:heroes!hero_id(name),
      counter:heroes!countered_hero_id!inner(name, role)
  `
    )
    .in(
      'hero_id',
      (enemyTeamIds as Hero[])?.map(({ id }) => id)
    ) // find counters for heroes with these ids
    .eq('counter.role', myPick); // find counters that are tanks

  console.log({ counters, error });

  interface Counter {
    hero: { name: string };
    counter: { name: string; role: string };
    match: number;
  }

  const countersMap = (counters as Counter[])?.reduce((acc, { counter: { name }, match }) => {
    return {
      ...acc,
      [name]: (acc[name] || 0) + match,
    };
  }, {} as { [name: string]: number });

  return { countersMap };
};
