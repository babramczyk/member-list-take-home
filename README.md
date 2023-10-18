# If I had more time

- Possibly use Next.js, Remix, or whatever, i.e. for a quicker first paint, possibly server-side rendering the member list, etc.
  - I just didn't want to muck around in Next docs, deal with hydration issues, etc. -- instead, wanted to focus on the main problem. So I justed used CRA
- All `TODO`s remaining in source 😄
- Use a `<table>` for better HTML semantics, and possibly some a11y benefits
  - Opted to not use one, since I know they can be tricky WRT styling, flexbox, etc. In a production app where we had the time, we could maybe invest the time to make a `<table>` work, but I didn't want to eff with that for now
- Add a loading state in case members take longer to load (i.e. React suspense / showing a spinner after e.g 500ms, or adding a loading skeleton)
- Have more intuitive list ordering. i.e. right now on the Groups tab, if you make a user an admin, they just splice in anywhere on the admin list. It would probably be more user friendly to put them at the bottom, so it's more predictable, and closer to where the row was originally (less visual context switching)

# To-do

- Styling
  - Review colors
- Don't assume we have every field always on a member (i.e. we might not have an avatar, even though the current data gives us that always)
