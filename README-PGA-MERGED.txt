PGA Championship app merged with the latest live-tested U.S. Open logic.

Kept PGA-specific branding/config/files where possible.
Updated logic includes: READY/LIVE/BREAK/SUSPENDED/PLAYOFF/COMPLETE, MC conversion, WD handling,
blank-pick protection, covered-by/elimination improvements, no-store fetches, and snapshot arrow handling.

Before deploying, check Vercel env vars for PGA:
- SLASH_GOLF_TOURN_ID
- SLASH_GOLF_YEAR
- ADMIN_SECRET
- TOURNAMENT_STATE_ID / NEXT_PUBLIC_TOURNAMENT_STATE_ID if used
