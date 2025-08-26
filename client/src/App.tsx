import TopBar from './components/TopBar';
import KPICards from './components/KPICards';
import TrendChart from './components/TrendChart';
import Filters from './components/Filters';
import ProductsTable from './components/ProductsTable';

function App() {
  return(
    <div className="min-h-screen">

      <TopBar />

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
