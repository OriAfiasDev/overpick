import { useState } from 'react';

export default function Pick() {
  const [tank, setTank] = useState<string>('');
  const [dps1, setDps1] = useState<string>('');
  const [dps2, setDps2] = useState<string>('');
  const [support1, setSupport1] = useState<string>('');
  const [support2, setSupport2] = useState<string>('');

  const [counter, setCounter] = useState<string>('');

  const onsubmit = async () => {
    const res = await fetch('/api/counters', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ enemyTeam: [tank, dps1, dps2, support1, support2], myPick: 'tank' }),
    });

    const { countersMap } = await res.json();
    const sorted: string[] = Object.keys(countersMap).sort((a, b) => countersMap[b] - countersMap[a]);
    setCounter(sorted[0]);
  };

  return (
    <div>
      <h1>Pick</h1>
      <input value={tank} onChange={(e) => setTank(e.target.value)} />
      <input value={dps1} onChange={(e) => setDps1(e.target.value)} />
      <input value={dps2} onChange={(e) => setDps2(e.target.value)} />
      <input value={support1} onChange={(e) => setSupport1(e.target.value)} />
      <input value={support2} onChange={(e) => setSupport2(e.target.value)} />

      <button onClick={onsubmit}>Submit</button>

      <h2>Counter</h2>
      <p>{counter}</p>
    </div>
  );
}
