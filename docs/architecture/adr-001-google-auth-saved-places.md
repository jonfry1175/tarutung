# ADR 001: Google Auth for Saved Places

## Status

Accepted for the Subang 360 MVP.

## Context

Visitors must be able to explore Subang without an account. Saving a destination is the only action that requires identity, and the product must not expose a login page or login item in navigation.

## Decision

- Guests can browse destinations and keep local exploration progress.
- Clicking **Simpan** while signed out opens a focused Google-only login dialog.
- OAuth uses Supabase Auth with PKCE and returns through `/auth/callback`.
- The clicked destination is held as a short-lived `PendingSaveIntent` in `sessionStorage`, then persisted after OAuth succeeds.
- Saved destinations live in `public.saved_places`, keyed by `(user_id, place_id)`.
- Row Level Security is the ownership boundary. Authenticated users can only read, insert, or delete their own rows.
- No service-role key is used in the browser.

## Consequences

- Browsing stays frictionless and the existing interface does not gain account navigation.
- Favorites follow the Google account across devices.
- Google OAuth credentials and allowed redirect URLs must be configured before production login works.
- Exploration progress remains device-local and is intentionally separate from saved destinations.
