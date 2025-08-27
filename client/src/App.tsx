import { useState, useMemo } from "react";
import { useQuery } from '@apollo/client';
import TopBar from './components/TopBar';
import KPICards from './components/KPICards';
import TrendChart from './components/TrendChart';
import Filters from './components/Filters';
import ProductsTable from './components/ProductsTable';
import Drawer from "./components/Drawer";

import { StatusType } from './types/types';
import { FETCH_KPIS } from "./queries/queries";

const DEFAULT_RANGE = 7;

function App() {
  // state
  const [range, setRange] = useState<number>(DEFAULT_RANGE);
  const [search, setSearch] = useState<string>('');
  const [warehouse, setWarehouse] = useState<string>('');
  const [status, setStatus] = useState<StatusType | ''>('');
  const [page, setPage] = useState<number>(1);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [refreshTable, setRefreshTable] = useState<boolean>(false);


  const { data, loading, error, refetch } = useQuery(FETCH_KPIS, { variables: { range } });
  const kpis = data?.kpis || [];
  const chartPoints = kpis?.trend || [];
  const warehouses = data?.warehouses || [];

  const filters = useMemo(() => (
    { search, warehouse, status }
  ), [search, warehouse, status]);

  // handlers
  const handleRangeChange = (newRange:number) => {
    if(newRange === range)  return;

    setRange(newRange);
    refetch({range:newRange});
  }

  const handleSearchChange = (newSearch:string) => {
    if(newSearch === search)  return;

    setSearch(newSearch);
    setPage(1);
  }

  const handleWarehouseChange = (newWarehouse:string) => {
    if(newWarehouse === warehouse)  return;

    setWarehouse(newWarehouse);
    setPage(1);
  }

  const handleStatusChange = (newStatus:StatusType|"") => {
    if(newStatus === status)  return;

    setStatus(newStatus);
    setPage(1);
  }


  return(
    <div className="min-h-screen">

      <TopBar selectedRange={range} updateRange={handleRangeChange} />

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {loading && <div className="text-md text-slate-600">Loading metrics…</div>}
        {error && <div className="text-md text-red-600">Error: {error.message}</div>}
        {!loading && !error && kpis &&
          <>
            <KPICards totalStock={kpis.totalStock} totalDemand={kpis.totalDemand} fillRate={kpis.fillRate} />

            {chartPoints && chartPoints.length > 0 &&
              <div className="bg-white rounded-2xl p-4 shadow">
                  <h2 className="text-brandBlue text-xl font-semibold mb-3">Stock vs Demand</h2>
                  <TrendChart points={chartPoints} />
              </div>
            }
          </>
        }

        <Filters
          search={search}
          warehouse={warehouse}
          status={status}
          warehouses={warehouses}
          setSearch={handleSearchChange}
          setWarehouse={handleWarehouseChange}
          setStatus={handleStatusChange}
        />

        <ProductsTable
          page={page}
          filters={filters}
          refresh={refreshTable}
          updateRefresh={() => setRefreshTable(false)}
          setPage={setPage}
          onRowClick={(productId) => setSelectedProduct(productId)}
        />

        <Drawer
          productId={selectedProduct}
          warehouses={warehouses}
          onClose={() => {setSelectedProduct(null); refetch({range}); setRefreshTable(true); }}
        />

      </main>

    </div>
  );
}

export default App
