export function getProductStatus(product) {
    if (product.stock > product.demand) return 'HEALTHY';
    else if(product.stock < product.demand)   return 'CRITICAL';
    else  return 'LOW';
}

export function getKPIs(products) {
    const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
    const totalDemand = products.reduce((sum, product) => sum + product.demand, 0);

    const served = products.reduce((sum, product) => sum + Math.min(product.stock, product.demand), 0);
    const fillRate = totalDemand === 0 ? 1 : served / totalDemand;

    return { totalStock, totalDemand, fillRate };
}

export function generateTrend(days, list) {
    const { totalStock, totalDemand } = getKPIs(list);
    const today = new Date();
    const chartPoints = [];

    for (let i = days - 1; i > 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);

        // add small variance
        const mulStock = 0.9 + Math.random() * 0.2;
        const mulDemand = 0.9 + Math.random() * 0.2;
        chartPoints.push({
            date: date.toISOString().slice(0, 10),
            stock: Math.round(totalStock * mulStock),
            demand: Math.round(totalDemand * mulDemand)
        });
    }

    // exact known data for today
    chartPoints.push({
        date: today.toISOString().slice(0, 10),
        stock: Math.round(totalStock),
        demand: Math.round(totalDemand)
    });

    return chartPoints;
}