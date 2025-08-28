# NOTES

## [GitHub Link](https://github.com/guptamayank9827/supply-sight-dashboard)
https://github.com/guptamayank9827/supply-sight-dashboard

## Major Decisions & Trade-offs
- **Monorepo**: Makes it easy to run dev for both server and client together and to ship a single production server that serves static assets.

- **In-memory Database**: Keeps the mock API simple. Mutations update the same in-memory array so changes persist until server restarts.

- **JS on server, TS on client**: Keeps server minimal while still giving strong type checking on the UI.

- **Modular UI components**: Speeds up the development and debugging process, keeps the codebase small, readable & reusable

- **File Structure**: All types, queries, schemas, seed data, helper functions are separated into different files and imported for ease of maintenace, readability, and understandability.

- **Status server-side vs client-side**: Status is computed on the server to support filtering by status in GraphQL directly. Also computed on the client for UI rendering parity.

- **KPI trend generation**: Pseudo-randomization to create plausible daily Stock vs Demand curves for 7/14/30 date ranges.

- **Update demand**: Simply updates the demand of the current product, since there are no constraints to it.

- **Transfer stock**: Because the sample schema has a single `warehouse` per product row, `transferStock` moves stock quantity from the product's current warehouse to a same SKU-product in the *target* warehouse. Otherwise, if a same-SKU product does not exist at the target, it's created. This is sufficient to show the UX and mutation wiring for transfers without modeling multi-location inventory tables.

- **Pagination**: Implemented via query variables `offset` and `limit` with total count for page controls.

## Error & Loading States
- Each mutation from the right-drawer shows success/error messages as a toasts on the right-bottom of screen.
- Each failed query shows an error message toast on the right-bottom of the screen.
- Empty states/No data shows 'No Result' on the table, an empty chart, and dashed values for the KPI cards, keeping the dashboard framework intact.

## What I'd Improve With More Time
- **Unit/Integration tests** using Vitest/RTL for components, and Apollo mocks for data layer.
- **Data modelling** store KPIs daily to directly fetch & show trend charts with actual data. Store demand and stock mutations with dates for granular-level details.
- **Design polish**: More consistent & themed UI to match with the brand design, and styles for hover/pressed/focused states for table rows and buttons.
- **Dashboard layout**: Introduce Skeleton screens for each UI component, to show while data is fetched from live server.
- **Server persistence**: Use a persistent GraphQL database to store data.
- **CI/CD**: Add GitHub Actions workflow for typecheck, lint, build, and auto-deployments.
- **Accessibility** enhancements: Focus traps and keyboard interactions in the drawer are set up, but additional a11y passes would be valuable.