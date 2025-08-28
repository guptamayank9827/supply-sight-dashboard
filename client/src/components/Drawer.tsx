import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { FETCH_PRODUCT, UPDATE_DEMAND, TRANSFER_STOCK } from '../queries/queries';
import { MessageType } from '../types/types';

type DrawerProps = {
    productId: string | null;
    warehouses: string[];
    onClose: () => void;
    setMessage: (message:string|null, type:MessageType) => void;
};


export default function Drawer(props:DrawerProps) {
    const [showUpdateError, setShowUpdateError] = useState<boolean>(false);
    const [showTransferError, setShowTransferError] = useState<boolean>(false);

    const { productId, warehouses } = props;
    const open = !!productId;

    const { data, loading, error, refetch } = useQuery(FETCH_PRODUCT, { variables: { id:productId }, skip: !open });
    const [updateDemand] = useMutation(UPDATE_DEMAND);
    const [transferStock] = useMutation(TRANSFER_STOCK);

    useEffect(() => {
        if(error)   props.setMessage(`Error fetching product details for ${productId}`, "error");
    }, [error]);
    
    const product = data?.product;

    if (!open || !product) return null;


    const handleUpdateDemand = async (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.target as HTMLFormElement
        const data = new FormData(form);

        const demand = parseInt((data.get('demand') as string) || '0', 10) || 0;

        if(!demand) {
            setShowUpdateError(true);
            return null;
        }
        setShowUpdateError(false);

        await updateDemand({ variables: { id: product.id, demand } });
        await refetch();

        props.setMessage(`Updated demand to ${demand}`, "success");
    }

    const handleTransferStock = async (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const form = event.target as HTMLFormElement
        const data = new FormData(form);
        const quantity = parseInt((data.get('quantity') as string) || '0', 10) || 0;
        const toWarehouse = (data.get('toWarehouse') as string) || '';
        
        if(!quantity || !toWarehouse)   {
            setShowTransferError(true);
            return null;
        }

        setShowTransferError(false);

        await transferStock({ variables: { id: product.id, quantity, toWarehouse } });
        await refetch();

        props.setMessage(`Successfully transferred ${quantity} to ${toWarehouse}`, "success");
    }

    return(
        <div className="fixed inset-0 z-20">
            <div className="absolute inset-0 bg-black/20" onClick={props.onClose} />
            <aside className="absolute right-0 top-0 h-full w-full sm:w-[28rem] bg-white shadow-xl p-4 overflow-y-auto">
                {loading && <div className="text-sm text-slate-600">Loading…</div>}

                <div className="space-y-6">
                    <header className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold">{product?.name || "--"}</h3>
                        <button className="p-2 hover:bg-slate-100" onClick={props.onClose}>✕</button>
                    </header>

                    <dl className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                            <dt className="text-slate-500">ID</dt>
                            <dd className="font-medium">{product?.id || "-"}</dd>
                        </div>
                        <div>
                            <dt className="text-slate-500">SKU</dt>
                            <dd className="font-medium">{product?.sku || "-"}</dd>
                        </div>
                        <div>
                            <dt className="text-slate-500">Warehouse</dt>
                            <dd className="font-medium">{product?.warehouse || "-"}</dd>
                        </div>
                        <div>
                            <dt className="text-slate-500">Status</dt>
                            <dd className="font-medium">{product?.status || "-"}</dd>
                        </div>
                        <div>
                            <dt className="text-slate-500">Stock</dt>
                            <dd className="font-medium">{product?.stock || "-"}</dd>
                        </div>
                        <div>
                            <dt className="text-slate-500">Demand</dt>
                            <dd className="font-medium">{product?.demand || "-"}</dd>
                        </div>
                    </dl>

                    {product &&
                        <>
                            <section className="border rounded-xl p-4">
                                <h4 className="font-semibold mb-3">Update Demand</h4>
                                <form
                                    className="flex gap-3"
                                    onSubmit={(e) => handleUpdateDemand(e)}
                                >
                                    <input name="demand" type="number" min={0} defaultValue={product.demand} className="border rounded-xl px-3 py-2 w-40" />
                                    <button className="px-3 py-2 rounded-xl bg-brandBlue text-white">Save</button>
                                </form>
                                {showUpdateError &&
                                    <div className='text-error'>Enter a Valid Demand value</div>
                                }
                            </section>

                            <section className="border rounded-xl p-4">
                                <h4 className="font-semibold mb-3">Transfer Stock</h4>
                                <form
                                    className="grid grid-cols-2 gap-3"
                                    onSubmit={(e) => handleTransferStock(e)}
                                >
                                    <input name="quantity" type="number" min={1} placeholder="Quantity" className="border rounded-xl px-3 py-2" />
                                    <select name="toWarehouse" className="border rounded-xl px-3 py-2">
                                        <option value="">Select Warehouse</option>
                                        {warehouses?.map((warehouse: string) => (
                                            <option key={warehouse} value={warehouse} disabled={warehouse === product.warehouse}>{warehouse}</option>
                                        ))}
                                    </select>
                                    <div className="col-span-2">
                                        <button className="w-full px-3 py-2 rounded-xl bg-brandBlue text-white">Transfer</button>
                                    </div>
                                    {showTransferError &&
                                        <div className='text-error'>Enter both fields</div>
                                    }
                                </form>
                            </section>
                        </>
                    }

                    </div>

            </aside>
        </div>
    );
}