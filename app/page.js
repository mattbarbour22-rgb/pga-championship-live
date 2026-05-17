'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

const poolEntries = [
  {
    "player": "Barty",
    "picks": [
      "Scottie Scheffler",
      "Rory McIlroy",
      "Tyrrell Hatton"
    ]
  },
  {
    "player": "Enright",
    "picks": [
      "Scottie Scheffler",
      "Rory McIlroy",
      "Cameron Young"
    ]
  },
  {
    "player": "Roche SES",
    "picks": [
      "Rory McIlroy",
      "Scottie Scheffler",
      "Speith"
    ]
  },
  {
    "player": "Kitch",
    "picks": [
      "Scottie Scheffler",
      "Xander Schauffele",
      "M Fitzpatrick"
    ]
  },
  {
    "player": "Brom",
    "picks": [
      "Scottie Scheffler",
      "Rory McIlroy",
      "Tommy Fleetwood"
    ]
  },
  {
    "player": "Shaw",
    "picks": [
      "Xander Schauffele",
      "Brooks Koepka",
      "Ludvig Åberg"
    ]
  },
  {
    "player": "Brian Irish",
    "picks": [
      "Scottie Scheffler",
      "M Fitzpatrick",
      "Cameron Young"
    ]
  },
  {
    "player": "Jonesy",
    "picks": [
      "Rory McIlroy",
      "Cameron Young",
      "Adam Scott"
    ]
  },
  {
    "player": "Haycock Snr",
    "picks": [
      "Corey Conners",
      "Ludvig Åberg",
      "Reitan"
    ]
  },
  {
    "player": "Mal J",
    "picks": [
      "Bryson DeChambeau",
      "Ludvig Åberg",
      "Fowler"
    ]
  },
  {
    "player": "Doc Campbell",
    "picks": [
      "Scottie Scheffler",
      "Cameron Young",
      "Rory McIlroy"
    ]
  },
  {
    "player": "T Coleman",
    "picks": [
      "Scottie Scheffler",
      "Cameron Young",
      "Xander Schauffele"
    ]
  },
  {
    "player": "A Rose",
    "picks": [
      "Scottie Scheffler",
      "JJ Spaun",
      "Reitan"
    ]
  },
  {
    "player": "D Haycock",
    "picks": [
      "Scottie Scheffler",
      "Xander Schauffele",
      "Cameron Young"
    ]
  },
  {
    "player": "P Langley",
    "picks": [
      "Cameron Young",
      "Rory McIlroy",
      "M Fitzpatrick"
    ]
  },
  {
    "player": "T Wallace",
    "picks": [
      "Scottie Scheffler",
      "Ludvig Åberg",
      "M Fitzpatrick"
    ]
  },
  {
    "player": "K Ferg",
    "picks": [
      "Scottie Scheffler",
      "Cameron Young",
      "Tommy Fleetwood"
    ]
  },
  {
    "player": "JB",
    "picks": [
      "Scottie Scheffler",
      "Rory McIlroy",
      "Xander Schauffele"
    ]
  },
  {
    "player": "D McCarthy",
    "picks": [
      "Scottie Scheffler",
      "Bryson DeChambeau",
      "N Hojgaard"
    ]
  },
  {
    "player": "Nath Ferg",
    "picks": [
      "Cameron Young",
      "M Fitzpatrick",
      "Tommy Fleetwood"
    ]
  },
  {
    "player": "Muzza T",
    "picks": [
      "Tommy Fleetwood",
      "Ludvig Åberg",
      "Rory McIlroy"
    ]
  },
  {
    "player": "D Donnelly",
    "picks": [
      "Rory McIlroy",
      "Tommy Fleetwood",
      "Gotterup"
    ]
  },
  {
    "player": "Hancock",
    "picks": [
      "Justin Rose",
      "Tommy Fleetwood",
      "Tyrrell Hatton"
    ]
  },
  {
    "player": "B Ashford",
    "picks": [
      "Cameron Young",
      "Rory McIlroy",
      "Scottie Scheffler"
    ]
  },
  {
    "player": "Bradley C",
    "picks": [
      "Homa",
      "Bryson DeChambeau",
      "Min Woo Lee"
    ]
  },
  {
    "player": "Sloanie",
    "picks": [
      "Scottie Scheffler",
      "Cameron Young",
      "Justin Thomas"
    ]
  },
  {
    "player": "R Fowler",
    "picks": [
      "Scottie Scheffler",
      "Cameron Young",
      "Ludvig Åberg"
    ]
  },
  {
    "player": "Sparky",
    "picks": [
      "Scottie Scheffler",
      "Viktor Hovland",
      "Ludvig Åberg"
    ]
  },
  {
    "player": "Barley",
    "picks": [
      "Scottie Scheffler",
      "Patrick Reed",
      "Tommy Fleetwood"
    ]
  },
  {
    "player": "Pete Holly",
    "picks": [
      "Tommy Fleetwood",
      "Cameron Young",
      "Ludvig Åberg"
    ]
  },
  {
    "player": "Timmy S",
    "picks": [
      "Scottie Scheffler",
      "Tyrrell Hatton",
      "M Fitzpatrick"
    ]
  },
  {
    "player": "Mr Grant",
    "picks": [
      "Scottie Scheffler",
      "Rory McIlroy",
      "M Fitzpatrick"
    ]
  },
  {
    "player": "Greg B",
    "picks": [
      "Tommy Fleetwood",
      "Ludvig Åberg",
      "Rory McIlroy"
    ]
  },
  {
    "player": "JD Boy",
    "picks": [
      "Scottie Scheffler",
      "Cameron Young",
      "Ludvig Åberg"
    ]
  },
  {
    "player": "Mr Manson",
    "picks": [
      "Scottie Scheffler",
      "Cameron Young",
      "Tommy Fleetwood"
    ]
  },
  {
    "player": "G Ponting",
    "picks": [
      "Tommy Fleetwood",
      "JJ Spaun",
      "Ludvig Åberg"
    ]
  },
  {
    "player": "R McKnight",
    "picks": [
      "Scottie Scheffler",
      "Cameron Young",
      "M Fitzpatrick"
    ]
  },
  {
    "player": "Chalkey",
    "picks": [
      "Tommy Fleetwood",
      "JJ Spaun",
      "Cameron Young"
    ]
  },
  {
    "player": "Budgie",
    "picks": [
      "Scottie Scheffler",
      "Tommy Fleetwood",
      "M Fitzpatrick"
    ]
  },
  {
    "player": "Lamming",
    "picks": [
      "Scottie Scheffler",
      "Rory McIlroy",
      "Ludvig Åberg"
    ]
  },
  {
    "player": "A Bull",
    "picks": [
      "Scottie Scheffler",
      "Cameron Young",
      "Brooks Koepka"
    ]
  },
  {
    "player": "Lynda R",
    "picks": [
      "Scottie Scheffler",
      "Rory McIlroy",
      "Tommy Fleetwood"
    ]
  },
  {
    "player": "Cam P",
    "picks": [
      "Scottie Scheffler",
      "Cameron Young",
      "A Fitzpatrick"
    ]
  },
  {
    "player": "Wazza SB",
    "picks": [
      "Scottie Scheffler",
      "Rory McIlroy",
      "Cameron Young"
    ]
  },
  {
    "player": "Mac The Knife",
    "picks": [
      "McCarty",
      "Rory McIlroy",
      "Cameron Young"
    ]
  },
  {
    "player": "Crusader",
    "picks": [
      "Scottie Scheffler",
      "Rory McIlroy",
      "Cameron Young"
    ]
  },
  {
    "player": "Maccas",
    "picks": [
      "Patrick Cantlay",
      "Burns",
      "Henley"
    ]
  },
  {
    "player": "Matt B",
    "picks": [
      "Scottie Scheffler",
      "Tyrrell Hatton",
      "Jon Rahm"
    ]
  },
  {
    "player": "The Wrangler",
    "picks": [
      "Bryson DeChambeau",
      "Tommy Fleetwood",
      "Rory McIlroy"
    ]
  },
  {
    "player": "AD",
    "picks": [
      "Xander Schauffele",
      "Cameron Young",
      "Min Woo Lee"
    ]
  },
  {
    "player": "J Turner",
    "picks": [
      "Cameron Young",
      "Xander Schauffele",
      "M Fitzpatrick"
    ]
  },
  {
    "player": "M Sanders",
    "picks": [
      "Scottie Scheffler",
      "Cameron Young",
      "Tommy Fleetwood"
    ]
  },
  {
    "player": "Nick Fitz",
    "picks": [
      "Scottie Scheffler",
      "Woodland",
      "Ludvig Åberg"
    ]
  },
  {
    "player": "M Little",
    "picks": [
      "Scottie Scheffler",
      "Rory McIlroy",
      "M Fitzpatrick"
    ]
  },
  {
    "player": "T Rowe",
    "picks": [
      "Justin Thomas",
      "Tommy Fleetwood",
      "Ludvig Åberg"
    ]
  },
  {
    "player": "J Tilley",
    "picks": [
      "Scottie Scheffler",
      "Rory McIlroy",
      "Xander Schauffele"
    ]
  },
  {
    "player": "Arnie Palmer",
    "picks": [
      "Scottie Scheffler",
      "Cameron Young",
      "M Fitzpatrick"
    ]
  },
  {
    "player": "K. Sanders",
    "picks": [
      "Scottie Scheffler",
      "Cameron Young",
      "Rory McIlroy"
    ]
  },
  {
    "player": "L Adams",
    "picks": [
      "Cameron Young",
      "Jon Rahm",
      "N Hojgaard"
    ]
  },
  {
    "player": "K McGinness",
    "picks": [
      "Rory McIlroy",
      "Xander Schauffele",
      "Bryson DeChambeau"
    ]
  },
  {
    "player": "Baylis",
    "picks": [
      "Scottie Scheffler",
      "Cameron Young",
      "M Fitzpatrick"
    ]
  },
  {
    "player": "D Tucker",
    "picks": [
      "Bryson DeChambeau",
      "Rory McIlroy",
      "Tommy Fleetwood"
    ]
  },
  {
    "player": "Kev Martin",
    "picks": [
      "Ludvig Åberg",
      "Brooks Koepka",
      "Tommy Fleetwood"
    ]
  },
  {
    "player": "P Mac",
    "picks": [
      "Scottie Scheffler",
      "Cameron Young",
      "Gotterup"
    ]
  },
  {
    "player": "J Barbour",
    "picks": [
      "Scottie Scheffler",
      "Burns",
      "Cameron Young"
    ]
  },
  {
    "player": "P Lund",
    "picks": [
      "Scottie Scheffler",
      "M Fitzpatrick",
      "A Fitzpatrick"
    ]
  },
  {
    "player": "Trump H",
    "picks": [
      "Scottie Scheffler",
      "Cameron Young",
      "Griffin"
    ]
  },
  {
    "player": "John Edge",
    "picks": [
      "Scottie Scheffler",
      "Cameron Young",
      "M Fitzpatrick"
    ]
  },
  {
    "player": "Trent W",
    "picks": [
      "Scottie Scheffler",
      "Cameron Young",
      "M Fitzpatrick"
    ]
  },
  {
    "player": "Sir Steve",
    "picks": [
      "Scottie Scheffler",
      "Rory McIlroy",
      "Tyrrell Hatton"
    ]
  }
];

const fallbackPlayers = [
  { name: 'Rory McIlroy', position: 1, positionLabel: 'T1', score: 0, today: '', thru: 'Tee time', teeTime: '8:00 AM' },
  { name: 'Scottie Scheffler', position: 1, positionLabel: 'T1', score: 0, today: '', thru: 'Tee time', teeTime: '8:10 AM' },
  { name: 'Xander Schauffele', position: 1, positionLabel: 'T1', score: 0, today: '', thru: 'Tee time', teeTime: '8:20 AM' },
  { name: 'Bryson DeChambeau', position: 1, positionLabel: 'T1', score: 0, today: '', thru: 'Tee time', teeTime: '8:30 AM' },
  { name: 'Justin Thomas', position: 1, positionLabel: 'T1', score: 0, today: '', thru: 'Tee time', teeTime: '8:40 AM' },
  { name: 'Cameron Young', position: 1, positionLabel: 'T1', score: 0, today: '', thru: 'Tee time', teeTime: '8:50 AM' },
];

function simplifyName(name = '') {
  return String(name).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z]/g, '');
}

const aliasMap = {

  afitzpatrick: 'alexfitzpatrick',
  alexfitzpatrick: 'alexfitzpatrick',

  mfitzpatrick: 'mattfitzpatrick',
  mattfitzpatrick: 'mattfitzpatrick',
  
  griffin: 'bengriffin',
  bengriffin: 'bengriffin',

  goterup: 'chrisgotterup',
  gotterup: 'chrisgotterup',
  chrisgotterup: 'chrisgotterup',

  nhojgaard: 'nicolaihojgaard',
  nicolaihojgaard: 'nicolaihojgaard',
  højgaard: 'nicolaihojgaard',
  hojgaard: 'nicolaihojgaard',
  nhojgaard: 'nicolaihojgaard',
  nicolaihojgaard: 'nicolaihojgaard',
  nicolaihøjgaard: 'nicolaihojgaard',
  hojgaard: 'nicolaihojgaard',
  højgaard: 'nicolaihojgaard',
  nicolaihjgaard: 'nicolaihojgaard',
  hjgaard: 'nicolaihojgaard',
  nhojgaard: 'nicolaihojgaard',
  nicolaihojgaard: 'nicolaihojgaard',
  nicolaihøjgaard: 'nicolaihojgaard',
  hojgaard: 'nicolaihojgaard',
  højgaard: 'nicolaihojgaard',
  nicolaihjgaard: 'nicolaihojgaard',
  hjgaard: 'nicolaihojgaard',
  
  homa: 'maxhoma',
  maxhoma: 'maxhoma',

  burns: 'samburns',
  samburns: 'samburns',

  griffen: 'bengriffin',
  bengriffin: 'bengriffin',

  nhojgaard: 'nicolaihojgaard',
  nicolaihojgaard: 'nicolaihojgaard',

  mccarty: 'mattmccarty',
  mattmccarty: 'mattmccarty',

  reitan: 'kristofferreitan',
  kristofferreitan: 'kristofferreitan',

  henley: 'russellhenley',
  russellhenley: 'russellhenley',

  woodland: 'garywoodland',
  garywoodland: 'garywoodland',

  speith: 'jordanspieth',
  spieth: 'jordanspieth',
  jordanspieth: 'jordanspieth',

  fowler: 'rickiefowler',
  rickiefowler: 'rickiefowler',

  mcilroy: 'rorymcilroy', rorymcilroy: 'rorymcilroy',
  scheffler: 'scottiescheffler', sheffler: 'scottiescheffler', scottiescheffler: 'scottiescheffler',
  young: 'cameryoung', cameronyoung: 'cameryoung', cameryoung: 'cameryoung',
  schauffele: 'xanderschauffele', xanderschauffele: 'xanderschauffele',
  dechambeau: 'brysondechambeau', brysondechambeau: 'brysondechambeau',
  rahm: 'jonrahm', jonrahm: 'jonrahm',
  fleetwood: 'tommyfleetwood', tommyfleetwood: 'tommyfleetwood',
  rose: 'justinrose', justinrose: 'justinrose',
  thomas: 'justinthomas', justinthomas: 'justinthomas',
  aberg: 'ludvigaberg', ludvigaberg: 'ludvigaberg',
  lowry: 'shanelowry', shanelowry: 'shanelowry',
  morikawa: 'collinmorikawa', collinmorikawa: 'collinmorikawa',
  koepka: 'brookskoepka', brookskoepka: 'brookskoepka',
  hovland: 'viktorhovland', viktorhovland: 'viktorhovland',
  cantlay: 'patrickcantlay', patrickcantlay: 'patrickcantlay'
};

function keyName(name) {
  const s = simplifyName(name);
  return aliasMap[s] || s;
}

function scoreLabel(score) {
  if (score === 999) return 'MC';
  const n = Number(score);
  if (!Number.isFinite(n) || n === 0) return 'E';
  return n > 0 ? `+${n}` : String(n);
}

function posLabel(player) {
  if (!player || player.position >= 999) return 'MC';
  if (player.positionLabel && String(player.positionLabel).trim()) return String(player.positionLabel);
  return String(player.position);
}

function getRefreshDelay() {
  // Conservative while API is being tested: 30 minutes.
  return 30 * 60 * 1000;
}

function sortPlayers(players) {
  return [...players].sort((a,b) => {
    if ((a.position ?? 999) !== (b.position ?? 999)) return (a.position ?? 999) - (b.position ?? 999);
    if ((a.score ?? 999) !== (b.score ?? 999)) return (a.score ?? 999) - (b.score ?? 999);
    return String(a.name).localeCompare(String(b.name));
  });
}

function addPositionLabels(players) {
  const sorted = sortPlayers(players);
  const counts = new Map();
  sorted.forEach(p => { if (p.position < 999) counts.set(p.position, (counts.get(p.position) || 0) + 1); });
  return sorted.map(p => ({ ...p, positionLabel: p.position >= 999 ? 'MC' : counts.get(p.position) > 1 ? `T${p.position}` : String(p.position) }));
}

function buildMap(players) {
  const map = new Map();
  players.forEach(p => map.set(keyName(p.name), p));
  return map;
}

function evaluatePool(entries, players, previousRanks) {
  const map = buildMap(players);
  const hasRealScores = players.some(p => p.thru && !String(p.thru).toLowerCase().includes('tee'));

  const evaluated = entries.map((entry, originalIndex) => {
    const picks = entry.picks.map(pick => map.get(keyName(pick)) || {
      name: pick, position: 999, positionLabel: 'NS', score: 999, today: '', thru: 'Not Started'
    });
    const sortedPicks = [...picks].sort((a,b) => {
      if ((a.position ?? 999) !== (b.position ?? 999)) return (a.position ?? 999) - (b.position ?? 999);
      if ((a.score ?? 999) !== (b.score ?? 999)) return (a.score ?? 999) - (b.score ?? 999);
      return String(a.name).localeCompare(String(b.name));
    });
    return { ...entry, originalIndex, sortedPicks };
  });

  const ranked = hasRealScores
    ? evaluated.sort((a,b) => {
        for (let i=0;i<3;i++) {
          if (a.sortedPicks[i].position !== b.sortedPicks[i].position) return a.sortedPicks[i].position - b.sortedPicks[i].position;
        }
        return a.originalIndex - b.originalIndex;
      })
    : evaluated.sort((a,b) => a.originalIndex - b.originalIndex);

  let lastKey = null;
  let currentRank = 0;

  return ranked.map((entry, index) => {
    const key = hasRealScores ? entry.sortedPicks.map(p => p.position).join('|') : String(index + 1);
    if (key !== lastKey) { currentRank = index + 1; lastKey = key; }
    const tieCount = hasRealScores ? ranked.filter(e => e.sortedPicks.map(p => p.position).join('|') === key).length : 1;
    const rankLabel = tieCount > 1 ? `T${currentRank}` : String(currentRank);
    const prev = previousRanks?.[entry.player];
    let move = '—', moveClass = 'move-same';
    if (prev && hasRealScores) {
      if (currentRank < prev) { move = `▲ ${prev - currentRank}`; moveClass = 'move-up'; }
      else if (currentRank > prev) { move = `▼ ${currentRank - prev}`; moveClass = 'move-down'; }
    }
    return { ...entry, rankLabel, numericRank: currentRank, move, moveClass };
  });
}
const round3BaselineRanks = {
  "Shaw": 1,
  "Lamming": 1,
  "Muzza T": 3,
  "Greg B": 3,
  "Haycock Snr": 5,
  "R Fowler": 6,
  "JD Boy": 6,
  "T Wallace": 8,
  "Mal J": 9,
  "Sparky": 9,
  "Matt B": 9,
  "Nick Fitz": 9,
  "Kev Martin": 9,
  "L Adams": 14,
  "Pete Holly": 15,
  "T Rowe": 15,
  "G Ponting": 17,
  "JB": 18,
  "J Tilley": 18,
  "K McGinness": 20,
  "AD": 21,
  "D Donnelly": 22,
  "Enright": 23,
  "Doc Campbell": 23,
  "T Coleman": 23,
  "D Haycock": 23,
  "B Ashford": 23,
  "Wazza SB": 23,
  "Crusader": 23,
  "K. Sanders": 23,
  "Roche SES": 31,
  "Kitch": 32,
  "Mr Grant": 32,
  "M Little": 32,
  "Barty": 35,
  "Brom": 35,
  "Barley": 35,
  "Lynda R": 35,
  "Sir Steve": 35,
  "P Langley": 40,
  "J Turner": 40,
  "Jonesy": 42,
  "Mac The Knife": 42,
  "The Wrangler": 44,
  "D Tucker": 44,
  "P Mac": 46,
  "Trump H": 46,
  "A Rose": 48,
  "Hancock": 49,
  "Bradley C": 49,
  "A Bull": 51,
  "J Barbour": 51,
  "Sloanie": 53,
  "Brian Irish": 54,
  "R McKnight": 54,
  "Arnie Palmer": 54,
  "Baylis": 54,
  "John Edge": 54,
  "Trent W": 54,
  "Cam P": 60,
  "K Ferg": 61,
  "D McCarthy": 61,
  "Mr Manson": 61,
  "M Sanders": 61,
  "P Lund": 65,
  "Timmy S": 66,
  "Budgie": 66,
  "Maccas": 66,
  "Nath Ferg": 69,
  "Chalkey": 70
};

export default function Home() {
  const [apiState, setApiState] = useState({ mode: 'loading', players: [], updatedAt: null, message: '' });
  const [poolExpanded, setPoolExpanded] = useState(false);
  const [golfExpanded, setGolfExpanded] = useState(false);
  const previousRanks = useRef(round3BaselineRanks);

  async function loadLeaderboard() {
    try {
      const res = await fetch('/api/leaderboard');
      const data = await res.json();
      setApiState(data);
    } catch (err) {
      setApiState({ mode: 'error', players: [], updatedAt: new Date().toISOString(), message: err?.message || 'Unable to load scores.' });
    }
  }

  useEffect(() => {
    loadLeaderboard();
    const interval = setInterval(loadLeaderboard, getRefreshDelay());
    return () => clearInterval(interval);
  }, []);

  const players = useMemo(() => addPositionLabels(apiState.players?.length ? apiState.players : fallbackPlayers), [apiState]);
  const pool = useMemo(() => {
    const ranked = evaluatePool(poolEntries, players, previousRanks.current);
    const next = {};
    ranked.forEach(r => { next[r.player] = r.numericRank; });
    previousRanks.current = next;
    return ranked;
  }, [players]);

  const leader = pool[0];
  const poolLeaders = pool.filter(p => p.numericRank === pool[0]?.numericRank);
  const leaderNames = poolLeaders.map(p => p.player).join(' / ');
  const updatedText = apiState.updatedAt ? `Updated ${Math.max(0, Math.round((Date.now() - new Date(apiState.updatedAt).getTime()) / 60000))} min ago` : 'Waiting for scores';
  const golfLeaderNames = players.filter(p => p.position === players[0]?.position).map(p => p.name).join(' / ');
  const warningText = apiState.mode === 'missing-key' ? 'API key missing in Vercel. Add SLASH_GOLF_API_KEY.' : apiState.mode === 'api-error' ? `Live API fallback active: ${apiState.message}` : '';

  return (
    <main className="page">
      <div className="header">
        <div className="logo"><h1>PGA</h1><div>CHAMPIONSHIP</div><div>LIVE</div></div>
        <div className="title">
          <h2>PGA CHAMPIONSHIP</h2>
          <div className="subtitle">Aronimink Golf Club • Live Pick 3 Competition</div>
          <div className="livebar"><div className="live">{apiState.mode === 'live' ? 'LIVE' : 'READY'}</div><div className="updated">{updatedText}</div></div>
        </div>
      </div>

      {warningText && <div className="warning">{warningText}</div>}

      <div className="grid">
        <section className={`panel ${golfExpanded ? 'expanded' : ''}`}>
          <div className="panel-title">Tournament Leaderboard</div>
          <table>
            <thead><tr><th>Pos</th><th>Player</th><th>Today</th><th>Thru</th><th>Total</th></tr></thead>
            <tbody>
              {players.map((p, idx) => (
                <tr key={`${p.name}-${idx}`} className={idx >= 12 ? 'hidden-row' : ''}>
                  <td>{posLabel(p)}</td><td className="player">{p.name}</td><td className="red">{scoreLabel(p.today)}</td>
                  <td>{p.teeTime && (!p.thru || String(p.thru).toLowerCase().includes('tee')) ? p.teeTime : (p.thru || '—')}</td>
                  <td className="red">{scoreLabel(p.score)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="footer-btn" onClick={() => setGolfExpanded(!golfExpanded)}>{golfExpanded ? 'COLLAPSE TOURNAMENT LEADERBOARD ▲' : 'FULL TOURNAMENT LEADERBOARD ▶'}</button>
        </section>

        <div>
          <section className="panel">
            <div className="panel-title">Projected Pool Leader</div>
            <div className="leader-box">
              <div className="big">{leaderNames ? leaderNames.toUpperCase() : 'WAITING'}</div>
              <div className="reason">{golfLeaderNames || 'Waiting for first scores'} currently leads the tournament.<br />{leaderNames ? `${leaderNames} lead the pool on current tie-breaks.` : 'Pool leaderboard will update once scores arrive.'}</div>
              <div className="leader-updated">{updatedText}</div>
            </div>
          </section>

          <section className={`panel pool-panel ${poolExpanded ? 'expanded' : ''}`}>
            <div className="panel-title">Live Pool Leaderboard</div>
            <table>
              <thead><tr><th>Pos</th><th>Move</th><th>Player</th><th>Best Pick</th><th>Next Best</th><th>3rd Pick</th></tr></thead>
              <tbody>
                {pool.map((entry, idx) => {
                  const best = entry.sortedPicks[0], second = entry.sortedPicks[1], third = entry.sortedPicks[2];
                  const isBestLeading = best.position === players[0]?.position;
                  return (
                    <tr key={entry.player} className={idx >= 12 ? 'hidden-row' : ''}>
                      <td>{entry.rankLabel}</td><td className={entry.moveClass}>{entry.move}</td><td className="player">{entry.player}</td>
                      <td className={isBestLeading ? 'green highlight' : ''}>{best.name} <span className="small">({posLabel(best)})</span></td>
                      <td>{second.name} <span className="small">({posLabel(second)})</span></td>
                      <td>{third.name} <span className="small">({posLabel(third)})</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <button className="footer-btn" onClick={() => setPoolExpanded(!poolExpanded)}>{poolExpanded ? 'COLLAPSE POOL LEADERBOARD ▲' : 'FULL POOL LEADERBOARD ▶'}</button>
          </section>
        </div>
      </div>

      <div className="note">Live rankings are decided by best current golf position, then next best and third pick. If no player has the tournament winner in their picks, the $1,750 prize jackpots.</div>
    </main>
  );
}
