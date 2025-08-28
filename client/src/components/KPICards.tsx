type KPICardsProps = {
  totalStock: number
  totalDemand: number
  fillRate: number
}

const KPICard = ({ label, value }: { label: string, value: string }) => (
  <div className="bg-white rounded-2xl p-4 shadow flex-1">
    <div className="text-md text-slate-500">{label}</div>
    <div className="text-2xl text-brandBlue font-semibold mt-1">{value || "-"}</div>
  </div>
)

export default function KPICards({ totalStock, totalDemand, fillRate }: KPICardsProps) {
  if(!fillRate) fillRate = 0;

  return (
    <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <KPICard label="Total Stock" value={totalStock?.toLocaleString()} />
      <KPICard label="Total Demand" value={totalDemand?.toLocaleString()} />
      <KPICard label="Fill Rate" value={`${fillRate ? `${(fillRate * 100).toFixed(2)}%` : "-"}`} />
    </section>
  )
}
