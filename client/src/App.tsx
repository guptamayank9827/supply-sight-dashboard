import { useState } from "react";

import TopBar from './components/TopBar';
import KPICards from './components/KPICards';
import TrendChart from './components/TrendChart';
import Filters from './components/Filters';
import ProductsTable from './components/ProductsTable';

const DEFAULT_RANGE = 7;

function App() {
  // state
  const [range, setRange] = useState<number>(DEFAULT_RANGE);

  return(
    <div className="min-h-screen">

      <TopBar selectedRange={range} updateRange={setRange} />

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">

        <KPICards />

        <TrendChart />

        <Filters />

        <ProductsTable />

      </main>

    </div>
  );
}

export default App
