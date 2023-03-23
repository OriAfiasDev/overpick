import supabase from '@/backend/supabase';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { enemyTeam, myRole } = req.body;
  const counters = await getAllCounters(enemyTeam, myRole);
  const countersMap = getCounterMap(counters);
  res.status(200).json(countersMap);
}

const getAllCounters = async (enemyTeam: string[], myRole: string): Promise<Counter[]> => {
  const { data: counters } = await supabase
    .from('counters')
    .select(
      `match,
    hero:heroes!hero_id(name),
    counter:heroes!countered_hero_id!inner(name, role)
`
    )
    .in('hero_id', enemyTeam)
    .eq('counter.role', myRole);

  return counters as Counter[];
};

const getCounterMap = (counters: Counter[]): CountersMap => {
  return counters.reduce((acc, { counter: { name }, match }) => {
    return {
      ...acc,
      [name]: (acc[name] || 0) + match,
    };
  }, {} as CountersMap);
};
