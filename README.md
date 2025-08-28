# Supply Sight Dashboard

Front-End Challenge by Nuel Inc

A take-home implementation of the **Daily Inventory Dashboard** for a supply chain platform called **SupplySight**.

- **Frontend**: React + Vite + TypeScript + Tailwind CSS + Apollo Client + Recharts
- **Backend**: Express + Apollo Server (GraphQL) with an in-memory mock DB and non-deterministic trend generation
- **Features**:
  - Date-range selection: past 7d / 14d / 30d
  - KPI cards: Total Stock, Total Demand, Fill Rate
  - Line chart: Stock vs Demand trend (from `kpis(range)`)
  - Filters (Search words, Warehouse, Status)
  - Products table with Status pill + pagination (10 rows/page)
  - Row click opens a right-side drawer showing product details + two mutations:
    - Update Demand of a product
    - Transfer Stock from one warehouse to another

## Quick Start

1. Clone the repository:
  ```bash
    git clone git@github.com:guptamayank9827/supply-sight-dashboard.git
  ```

2. Install server dependencies
  ```bash
    cd server
    npm install
  ```

3. Run server
  ```bash
    npm run start
  ```

4. Install client dependencies
  Open Another tab or ```bash cd .. ```
  ```bash
    cd client
    npm install
  ```

5. Run client
  ```bash
    npm run dev
  ```

- GraphQL server: http://localhost:4000/graphql
- Front End url: http://localhost:5173

## File Structure
```
supply-sight-dashboard/
├── client/    # React + Vite + TailwindCSS frontend
├── server/    # Express + Apollo server for GraphQL
├── NOTES.md
└── README.md
```

See `NOTES.md` for decisions, tradeoffs and potential enhancements.