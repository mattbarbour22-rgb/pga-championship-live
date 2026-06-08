PGA Championship app updated with Memorial trial fixes:
- corrected elimination logic: full live-combo coverage required
- trimmed player name rank lookup/save for arrows
- latest saved snapshot baseline used from Supabase
- no-store API fetches for leaderboard/pool-state/snapshot
- SUSPENDED status from roundStatus
- PLAYOFF status only when playoff data exists, roundId is 4, 2+ leaders are tied for position 1, and status is not Official
- COMPLETE status when status/roundStatus is Official
PGA tournament config, course/date text, pool picks, styling, and tournament ID defaults were preserved.
