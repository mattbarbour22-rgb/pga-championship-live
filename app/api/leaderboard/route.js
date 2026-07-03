// Manual API cache control. Change this one number when you want faster/slower updates.
// Next.js uses SECONDS here: 300 = 5 min, 900 = 15 min, 1800 = 30 min, 3600 = 1 hour.
export const revalidate = 300;

const TOURN_ID = process.env.SLASH_GOLF_TOURN_ID || '033';
const YEAR = process.env.SLASH_GOLF_YEAR || '2026';
const ORG_ID = process.env.SLASH_GOLF_ORG_ID || '1';

function getArray(payload) {
  return (
    payload?.leaderboard ||
    payload?.leaderboards ||
    payload?.players ||
    payload?.leaderboardRows ||
    payload?.data?.leaderboard ||
    payload?.data?.leaderboards ||
    payload?.data?.players ||
    payload?.data ||
    (Array.isArray(payload) ? payload : [])
  );
}

function playerName(p) {
  return (
    p.playerName ||
    p.player_name ||
    p.name ||
    p.displayName ||
    p.display_name ||
    p.player?.displayName ||
    p.player?.name ||
    [p.firstName || p.first_name || p.player?.firstName, p.lastName || p.last_name || p.player?.lastName]
      .filter(Boolean)
      .join(' ')
  );
}

function parseScore(v) {
  if (v === null || v === undefined || v === '') return 0;
  const s = String(v).trim().toUpperCase();
  if (s === 'E' || s === 'EVEN') return 0;
  if (s.includes('CUT') || s === 'MC' || s === 'WD' || s === 'DQ') return 999;
  const n = Number(s.replace('+', ''));
  return Number.isFinite(n) ? n : 0;
}

function parsePos(v, score) {
  if (score === 999) return 999;
  const s = String(v || '').trim().toUpperCase();
  const m = s.match(/\d+/);
  return m ? Number(m[0]) : 999;
}

function normalize(p) {
  const scoreRaw =
    p.totalToPar ??
    p.total_to_par ??
    p.totalRelativeToPar ??
    p.total_score_relative_to_par ??
    p.scoreToPar ??
    p.score_to_par ??
    p.total ??
    p.score ??
    p.current_score ??
    p.currentScore;

  const score = parseScore(scoreRaw);

  const posRaw =
    p.position ??
    p.currentPosition ??
    p.current_position ??
    p.rank ??
    p.pos ??
    p.place;

  return {
    name: playerName(p),
    position: parsePos(posRaw, score),
    positionLabel: String(posRaw || ''),
    score,
    today: p.today ?? p.roundScore ?? p.round_score ?? p.currentRoundScore ?? '',
    thru: p.thru ?? p.holesThrough ?? p.holes_through ?? p.status ?? '',
    teeTime: p.teeTime ?? p.tee_time ?? p.startTime ?? p.start_time ?? ''
  };
}

function roundIdNumber(roundId) {
  if (roundId && typeof roundId === 'object' && '$numberInt' in roundId) {
    return Number(roundId.$numberInt);
  }

  return Number(roundId);
}

function isWithdrawnOrCutLabel(label) {
  const s = String(label || '').trim().toUpperCase();
  return ['CUT', 'MC', 'WD', 'DQ'].includes(s);
}

function applyRoundTwoCut(players, payload) {
  const roundId = roundIdNumber(payload?.roundId);
  const roundStatus = String(payload?.roundStatus || '').toLowerCase();

  // Only force the cut after Round 2 has officially finished.
  // Before that, everyone should remain live.
  if (roundId !== 2 || roundStatus !== 'official') return players;

  const activePositions = players
    .filter(p => Number(p.position) < 999)
    .map(p => Number(p.position))
    .filter(Number.isFinite);

  if (!activePositions.length) return players;

  // Standard PGA-style cut is top 65 and ties.
  // Example: if positions are 1,2,2,...,61,61,76, the cut position becomes 61.
  const cutPosition =
    Math.max(...activePositions.filter(pos => pos <= 65)) || 65;

  return players.map(p => {
    const label = String(p.positionLabel || '').trim().toUpperCase();

    // Preserve WD/DQ/CUT/MC if the API already says so.
    if (isWithdrawnOrCutLabel(label)) {
      return {
        ...p,
        position: 999,
        positionLabel: label === 'CUT' ? 'MC' : label,
        score: 999,
        thru: p.thru || '-'
      };
    }

    if (Number(p.position) > cutPosition) {
      return {
        ...p,
        position: 999,
        positionLabel: 'MC',
        score: 999,
        thru: 'MC'
      };
    }

    return p;
  });
}


export async function GET() {
  const key = process.env.SLASH_GOLF_API_KEY;
  const host = process.env.SLASH_GOLF_API_HOST || 'live-golf-data.p.rapidapi.com';

  if (!key) {
    return Response.json({
      mode: 'missing-key',
      message: 'Missing SLASH_GOLF_API_KEY',
      players: [],
      updatedAt: new Date().toISOString()
    });
  }

  const url = `https://live-golf-data.p.rapidapi.com/leaderboard?orgId=${ORG_ID}&tournId=${TOURN_ID}&year=${YEAR}`;

  try {
    const res = await fetch(url, {
      headers: {
        'x-rapidapi-key': key,
        'x-rapidapi-host': host,
      },
    });

    const text = await res.text();

    if (!res.ok) {
      return Response.json({
        mode: 'api-error',
        message: res.status === 429 ? 'RapidAPI limit reached or temporarily rate limited' : 'Could not fetch leaderboard',
        status: res.status,
        requestUrl: url,
        response: text.slice(0, 500),
        players: [],
        updatedAt: new Date().toISOString()
      });
    }

    let payload;
    try {
      payload = JSON.parse(text);
    } catch {
      return Response.json({
        mode: 'api-error',
        message: 'API returned non-JSON response',
        requestUrl: url,
        response: text.slice(0, 500),
        players: [],
        updatedAt: new Date().toISOString()
      });
    }

    const raw = getArray(payload);
    let players = Array.isArray(raw)
      ? raw.map(normalize).filter(p => p.name)
      : [];

    players = applyRoundTwoCut(players, payload);

    const playoff =
      payload?.playoff ||
      payload?.data?.playoff ||
      null;

    const currentRoundId = roundIdNumber(payload?.roundId);
    const leaders = players.filter(p => Number(p.position) === 1);

    const status = String(payload?.status || '').toLowerCase();
    const roundStatus = String(payload?.roundStatus || '').toLowerCase();

    const isTournamentOfficial =
      status === 'official';

    const isRoundOfficial =
      roundStatus === 'official';

    const isSuspended =
      status.includes('suspend') ||
      roundStatus.includes('suspend') ||
      status.includes('delay') ||
      roundStatus.includes('delay');

    const isPlayoff =
      currentRoundId === 4 &&
      !isTournamentOfficial &&
      leaders.length > 1 &&
      (
        playoff === true ||
        status.includes('playoff') ||
        roundStatus.includes('playoff')
      );

    const isPlayingNow = p => {
      const thru = String(p.thru || '').trim().toUpperCase();

      return (
        thru &&
        thru !== '-' &&
        thru !== '—' &&
        thru !== 'F' &&
        thru !== 'F*' &&
        thru !== '18' &&
        thru !== 'MC' &&
        thru !== 'CUT' &&
        thru !== 'WD' &&
        thru !== 'DQ' &&
        !thru.includes('TEE')
      );
    };

    const anyPlayerPlayingNow = players.some(isPlayingNow);

    const isBreak =
      currentRoundId >= 1 &&
      currentRoundId <= 3 &&
      players.length > 0 &&
      !isSuspended &&
      (
        isRoundOfficial ||
        !anyPlayerPlayingNow
      );

    let mode = 'ready';

    if (isPlayoff) {
      mode = 'playoff';
    } else if (isSuspended) {
      mode = 'suspended';
    } else if (isTournamentOfficial && currentRoundId === 4) {
      mode = 'complete';
    } else if (isBreak) {
      mode = 'break';
    } else if (players.length) {
      mode = 'live';
    } else {
      mode = 'ready';
    }

    return Response.json({
      mode,
      status: payload?.status || '',
      roundStatus: payload?.roundStatus || '',
      roundId: payload?.roundId || '',
      playoff,
      requestUrl: url,
      updatedAt: new Date().toISOString(),
      players,
      rawKeys: Object.keys(payload || {}),
      rawPreview: players.length ? undefined : payload
    });
  } catch (err) {
    return Response.json({
      mode: 'api-error',
      message: err?.message || String(err),
      requestUrl: url,
      players: [],
      updatedAt: new Date().toISOString()
    });
  }
}
