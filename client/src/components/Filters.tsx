import { StatusType } from '../types/types';

type FilterProps = {
  search: string;
  warehouse: string;
  status: StatusType | '';
  warehouses: string[];
  setSearch: (v: string) => void;
  setWarehouse: (v: string) => void;
  setStatus: (v: StatusType | '') => void;
};

const STATUSES = [
  {label:"All Status", value:""},
  {label:"Healthy", value:"HEALTHY"},
  {label:"Low", value:"LOW"},
  {label:"Critical", value:"CRITICAL"}
];

export default function Filters(props:FilterProps) {
  const { search, warehouse, status, warehouses } = props;

  return (
    <div className="bg-white rounded-2xl p-4 shadow flex flex-col md:flex-row gap-3 md:items-center md:justify-between">

      <input
        value={search}
        onChange={(e) => props.setSearch(e.target.value)}
        placeholder="Search by name, SKU, or ID"
        className="w-full md:w-1/2 border rounded-xl px-3 py-2 text-brandBlue focus:outline-none focus:ring-2 focus:ring-slate-400"
      />

      <div className="flex w-full md:w-1/2 gap-8 md:justify-end">
        <select
          value={warehouse}
          onChange={(e) => props.setWarehouse(e.target.value)}
          className="border rounded-xl px-3 py-2 bg-white cursor-pointer"
        >
          <option value="">All Warehouses</option>
          {warehouses.map(warehouse => (
            <option key={warehouse} value={warehouse}>{warehouse}</option>
          ))}
        </select>
        <select
          value={status}
          onChange={(e) => props.setStatus(e.target.value as StatusType | '')}
          className="border rounded-xl px-3 py-2 bg-white cursor-pointer"
        >
          {STATUSES.map(status => (
            <option value={status.value}>{status.label}</option>
          ))}
        </select>
      </div>

    </div>
  );
}