import { useState, useMemo } from "react";

import TopBar from './components/TopBar';
import KPICards from './components/KPICards';
import TrendChart from './components/TrendChart';
import Filters from './components/Filters';
import ProductsTable from './components/ProductsTable';

import { StatusType, PointType } from './types/types';

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

const DUMMY_CHARTPOINTS:PointType[] = [
  { date: "2025-08-22", stock: 470, demand: 450 },
  { date: "2025-08-23", stock: 450, demand: 500 },
  { date: "2025-08-24", stock: 475, demand: 550 },
  { date: "2025-08-25", stock: 500, demand: 600 }
];

function App() {
  // state
  const [range, setRange] = useState<number>(DEFAULT_RANGE);
  const [search, setSearch] = useState<string>('');
  const [warehouse, setWarehouse] = useState<string>('');
  const [status, setStatus] = useState<StatusType | ''>('');
  const [page, setPage] = useState<number>(1);

  const filters = useMemo(() => (
    { search, warehouse, status }
  ), [search, warehouse, status]);

  const kpis = DUMMY_KPIS;
  const warehouses = DUMMY_WAREHOUSES;
  const chartPoints = DUMMY_CHARTPOINTS;

  return(
    <div className="min-h-screen">

      <TopBar selectedRange={range} updateRange={setRange} />

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">

        {kpis &&
          <KPICards totalStock={kpis.totalStock} totalDemand={kpis.totalDemand} fillRate={kpis.fillRate} />
        }

        {chartPoints &&
          <div className="bg-white rounded-2xl p-4 shadow">
              <h2 className="text-brandBlue text-xl font-semibold mb-3">Stock vs Demand</h2>
              <TrendChart points={chartPoints} />
          </div>
        }

        <Filters
          search={search}
          warehouse={warehouse}
          status={status}
          warehouses={warehouses}
          setSearch={setSearch}
          setWarehouse={setWarehouse}
          setStatus={setStatus}
        />

        <ProductsTable
          page={page}
          filters={filters}
          setPage={setPage}
        />

      </main>

    </div>
  );
}

export default App
