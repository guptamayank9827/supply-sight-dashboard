import { useState } from "react";

import TopBar from './components/TopBar';
import KPICards from './components/KPICards';
import TrendChart from './components/TrendChart';
import Filters from './components/Filters';
import ProductsTable from './components/ProductsTable';

import {StatusType} from './types/types';

const DEFAULT_RANGE = 7;

// Dummy Data
const DUMMY_KPIS = {
  totalStock: 500,
  totalDemand: 600,
  fillRate: 5/6
};

const DUMMY_WAREHOUSES = [
  "BLR-A",
  "DEL-B",
  "PNQ-C"
];

function App() {
  // state
  const [range, setRange] = useState<number>(DEFAULT_RANGE);
  const [search, setSearch] = useState<string>('');
  const [warehouse, setWarehouse] = useState<string>('');
  const [status, setStatus] = useState<StatusType | ''>('');

  const kpis = DUMMY_KPIS;
  const warehouses = DUMMY_WAREHOUSES;

  return(
    <div className="min-h-screen">

      <TopBar selectedRange={range} updateRange={setRange} />

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">

        {kpis &&
          <KPICards totalStock={kpis.totalStock} totalDemand={kpis.totalDemand} fillRate={kpis.fillRate} />
        }

        <TrendChart />

        <Filters
          search={search}
          warehouse={warehouse}
          status={status}
          warehouses={warehouses}
          setSearch={setSearch}
          setWarehouse={setWarehouse}
          setStatus={setStatus}
        />

        <ProductsTable />

      </main>

    </div>
  );
}

export default App
