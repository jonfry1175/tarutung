create table if not exists public.saved_places (
  user_id uuid not null references auth.users(id) on delete cascade,
  place_id text not null check (char_length(place_id) between 1 and 100),
  created_at timestamptz not null default now(),
  primary key (user_id, place_id)
);

alter table public.saved_places enable row level security;

revoke all on table public.saved_places from anon;
grant select, insert, delete on table public.saved_places to authenticated;

drop policy if exists "Users can read own saved places" on public.saved_places;
create policy "Users can read own saved places"
on public.saved_places
for select
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "Users can save own places" on public.saved_places;
create policy "Users can save own places"
on public.saved_places
for insert
to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete own saved places" on public.saved_places;
create policy "Users can delete own saved places"
on public.saved_places
for delete
to authenticated
using ((select auth.uid()) = user_id);
