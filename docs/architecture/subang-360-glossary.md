# Subang 360 Domain Glossary

| Term | Meaning |
| --- | --- |
| Guest | Visitor without a Supabase session. Can explore, but cannot persist a saved destination. |
| Traveler | Visitor authenticated through Google. Owns saved destinations. |
| Place | A destination from the curated Subang content set. Its stable `id` is stored, while editorial content remains in the application. |
| Saved place | Relationship between one traveler and one place. It is not a copy of the place content. |
| Pending save intent | The place ID retained in the browser during the Google redirect and consumed once authentication succeeds. |
| Visited place | Device-local exploration progress. It does not require login and is not synchronized. |
