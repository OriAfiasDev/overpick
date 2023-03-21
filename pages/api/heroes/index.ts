import json from './heroes.json';
import supabase from '../../../backend/supabase';
import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuid } from 'uuid';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = await run2();
  res.status(200).json(data);
}

const run = async () => {
  //   const { data, error } = await supabase
  //     .from('heroes')
  //     .insert(json.map(({ key, ...rest }) => ({ ...rest, id: uuid() })));
  //   console.log({ data, error });
};

const run2 = async () => {
  let { data: counters, error } = await supabase
    .from('counters')
    .select(
      `match,
    hero:heroes!hero_id(name),
    counter:heroes!countered_hero_id!inner(name, role)
`
    )
    .eq('counter.role', 'tank') // find counters that are tanks
    .in('hero_id', ['833034c5-a369-44ee-992b-df96a6f8300c', 'cfaed758-9a46-41a4-9f00-2ff487676898']); // find counters for heroes with these ids

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

  return countersMap;
};
