type TopBarProps = {
  selectedRange: number;
  updateRange: (value:number) => void;
}

const RANGES = [7, 14, 30];

export default function TopBar(props:TopBarProps) {
  
  return (
    <header className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

          <div className="text-brandBlue text-3xl font-bold tracking-tight">SupplySight</div>

          <div className="flex gap-2">
            {RANGES.map(range => (
              <button
                key={range}
                onClick={() => props.updateRange(range)}
                className={`px-3 py-1.5 rounded-full text-sm border ${props.selectedRange === range ? 'bg-brandBlue text-white' : 'bg-white border-brandBlue hover:bg-slate-100'}`}
              >
                {range}d
              </button>
            ))}
          </div>

        </div>
    </header>
  );
}