# U.S. Open Pick 3 Live

Clean production-ready Next.js app for the golf pick-em pool.

## Key Features

- Live golf leaderboard via RapidAPI
- Pool leaderboard with Pick 3 ranking logic
- Tee-time order before play starts
- Live leaderboard order once play begins
- Waiting players remain in tee-time order
- Cut/elimination logic
- Elimination reasons: `COVERED BY <name>` or `ALL MC`
- Round-move arrows compared to previous completed round
- Admin-only snapshot route; public page is read-only
- Central tournament configuration in `app/lib/tournament.js`

## Required Vercel Environment Variables

```txt
SLASH_GOLF_API_KEY=your_rapidapi_key
SLASH_GOLF_API_HOST=live-golf-data.p.rapidapi.com
SLASH_GOLF_ORG_ID=1
SLASH_GOLF_TOURN_ID=026
SLASH_GOLF_YEAR=2026
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_secret_key
TOURNAMENT_STATE_ID=2026-us-open
ADMIN_SECRET=choose-a-private-secret
```

## Admin Round Snapshot

After a round is finished, visit:

```txt
https://YOUR-SITE.vercel.app/api/admin/save-round-snapshot?secret=YOUR_ADMIN_SECRET
```

The route checks that all golfers are `F`, `F*`, or `MC` before saving. It updates Supabase once and sets `previous_ranks` to the completed-round baseline.

## Supabase Table

Use table `public.tournament_state` with these columns:

```sql
create table if not exists public.tournament_state (
  id text primary key,
  tournament_name text,
  previous_ranks jsonb default '{}'::jsonb,
  current_ranks jsonb default '{}'::jsonb,
  locked_eliminated jsonb default '[]'::jsonb,
  cut_locked boolean default false,
  leaderboard_updated_at text,
  updated_at timestamptz default now()
);
```

For U.S. Open, create a row with:

```txt
id = 2026-us-open
```

## Changing Tournament

Edit `app/lib/tournament.js`, then update Vercel env vars:

- `SLASH_GOLF_TOURN_ID`
- `SLASH_GOLF_YEAR`
- `TOURNAMENT_STATE_ID`

Keep `tournamentTimezone` as an IANA timezone, for example:

- U.S. Open New York: `America/New_York`
- Texas: `America/Chicago`
- British Open: `Europe/London`
- Masters: `America/New_York`
