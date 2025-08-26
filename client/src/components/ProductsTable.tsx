import { useQuery } from '@apollo/client';

import { FiltersType } from '../types/types';
import { FETCH_PRODUCTS } from '../queries/queries';

type ProductsTableProps = {
    page: number;
    filters: FiltersType;
    setPage: (pageNum:number) => void;
    onRowClick: (id:string) => void;
};

const PAGE_SIZE = 10;


export default function ProductsTable(props:ProductsTableProps) {
    const {page, filters} = props;
    const offset = (page - 1) * PAGE_SIZE;

    const { data, loading, error, refetch } = useQuery(FETCH_PRODUCTS, {
        variables: { ...filters, status: filters.status || null, offset, limit: PAGE_SIZE }
    })
    const products = data?.products?.items || [];

    const paginatedProducts = products.slice(offset, offset+PAGE_SIZE);

    const totalProducts = products?.length ?? 0;
    const totalPages = Math.max(1, Math.ceil(totalProducts / PAGE_SIZE));

    const getStatusCell = (status:string) => {
        let statusClass = "", statusText = "";
        switch (status) {
            case "HEALTHY":
                statusClass = 'bg-green-100 text-green-800';
                statusText = "🟢 Healthy";
                break;

            case "LOW":
                statusClass = 'bg-yellow-100 text-yellow-800';
                statusText = "🟡 Low";
                break;

            case "CRITICAL":
                statusClass = 'bg-red-100 text-red-800';
                statusText = "🔴 Critical";
                break;
        
            default:
                break;
        }

        return (
             <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-2xl md:rounded-full text-sm ${statusClass}`}>
                {statusText}
            </span>
        );
    }

    return (
        <section className="bg-white rounded-2xl shadow overflow-hidden">
            
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead className="bg-slate-50 text-brandBlue text-lg">
                        <tr>
                            <th className="text-left p-3">Product</th>
                            <th className="text-left p-3">SKU</th>
                            <th className="text-left p-3">Warehouse</th>
                            <th className="text-right p-3">Stock</th>
                            <th className="text-right p-3">Demand</th>
                            <th className="text-left p-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedProducts?.length === 0 && (
                            <tr><td colSpan={6} className="p-4 text-md text-center text-slate-700">No results</td></tr>
                        )}
                        {paginatedProducts?.map((product:any) => (
                            <tr
                                key={product.id}
                                onClick={() => props.onRowClick(product.id)}
                                className={`cursor-pointer hover:bg-slate-50 ${product.status === 'CRITICAL' ? 'bg-red-50' : ''}`}
                            >
                                <td className="p-3">{product.name}</td>
                                <td className="p-3">{product.sku}</td>
                                <td className="p-3">{product.warehouse}</td>
                                <td className="p-3 text-right">{product.stock.toLocaleString()}</td>
                                <td className="p-3 text-right">{product.demand.toLocaleString()}</td>
                                <td className="p-3">{getStatusCell(product.status)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex items-center justify-between p-3 border-t">
                <div className="text-sm text-slate-500">
                    Page {page} of {totalPages}
                    <span className='hidden md:inline ml-8'>Products {offset + 1} to {Math.min(totalProducts, offset+PAGE_SIZE)}</span>
                </div>

                <div className="flex gap-2">
                    <button
                        className="px-3 py-1.5 rounded border disabled:opacity-50"
                        onClick={() => props.setPage(1)}
                        disabled={page <= 1}
                    >
                        First
                    </button>
                    <button
                        className="px-3 py-1.5 rounded border disabled:opacity-50"
                        onClick={() => props.setPage(page - 1)}
                        disabled={page <= 1}
                    >
                        Prev
                    </button>
                    <button
                        className="px-3 py-1.5 rounded border disabled:opacity-50"
                        onClick={() => props.setPage(page + 1)}
                        disabled={page >= totalPages}
                    >
                        Next
                    </button>
                    <button
                        className="px-3 py-1.5 rounded border disabled:opacity-50"
                        onClick={() => props.setPage(totalPages)}
                        disabled={page >= totalPages}
                    >
                        Last
                    </button>
                </div>
            </div>

        </section>
    );
}