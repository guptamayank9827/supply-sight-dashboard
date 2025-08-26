type DrawerProps = {
    productId: string | null;
    warehouses: string[];
    onClose: () => void;
};

const DUMMY_PRODUCT = {demand: 120, id:"P-1001", name:"12mm Hex Bolt", sku:"HEX-12-100", status:"HEALTHY", stock:180, warehouse:"BLR-A"};

export default function Drawer(props:DrawerProps) {
    const { productId, warehouses } = props;

    const open = !!productId;
    const product = DUMMY_PRODUCT;

    if (!open || !product) return null;

    const updateDemand = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.target as HTMLFormElement
        const data = new FormData(form);

        const demand = parseInt((data.get('demand') as string) || '0', 10) || 0;
        
        if(!demand) return null;
        console.log("update demand");
    }

    const transferStock = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const form = event.target as HTMLFormElement
        const data = new FormData(form);
        const quantity = parseInt((data.get('quantity') as string) || '0', 10) || 0;
        const toWarehouse = (data.get('toWarehouse') as string) || '';
        
        if(!quantity || !toWarehouse)   return;
        console.log("transfer stock");
    }

    return(
        <div className="fixed inset-0 z-20">
            <div className="absolute inset-0 bg-black/20" onClick={props.onClose} />
            <aside className="absolute right-0 top-0 h-full w-full sm:w-[28rem] bg-white shadow-xl p-4 overflow-y-auto">
                {product && (
                    <div className="space-y-6">
                        <header className="flex items-center justify-between">
                            <h3 className="text-xl font-semibold">{product.name}</h3>
                            <button className="p-2 hover:bg-slate-100" onClick={props.onClose}>✕</button>
                        </header>

                        <dl className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                                <dt className="text-slate-500">ID</dt>
                                <dd className="font-medium">{product.id}</dd>
                            </div>
                            <div>
                                <dt className="text-slate-500">SKU</dt>
                                <dd className="font-medium">{product.sku}</dd>
                            </div>
                            <div>
                                <dt className="text-slate-500">Warehouse</dt>
                                <dd className="font-medium">{product.warehouse}</dd>
                            </div>
                            <div>
                                <dt className="text-slate-500">Status</dt>
                                <dd className="font-medium">{product.status}</dd>
                            </div>
                            <div>
                                <dt className="text-slate-500">Stock</dt>
                                <dd className="font-medium">{product.stock}</dd>
                            </div>
                            <div>
                                <dt className="text-slate-500">Demand</dt>
                                <dd className="font-medium">{product.demand}</dd>
                            </div>
                        </dl>

                        <section className="border rounded-xl p-4">
                            <h4 className="font-semibold mb-3">Update Demand</h4>
                            <form
                                className="flex gap-3"
                                onSubmit={(e) => updateDemand(e)}
                            >
                                <input name="demand" type="number" min={0} defaultValue={product.demand} className="border rounded-xl px-3 py-2 w-40" />
                                <button className="px-3 py-2 rounded-xl bg-brandBlue text-white">Save</button>
                            </form>
                        </section>

                        <section className="border rounded-xl p-4">
                            <h4 className="font-semibold mb-3">Transfer Stock</h4>
                            <form
                                className="grid grid-cols-2 gap-3"
                                onSubmit={(e) => transferStock(e)}
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
                            </form>
                        </section>

                    </div>
                )}
            </aside>
        </div>
    );
}