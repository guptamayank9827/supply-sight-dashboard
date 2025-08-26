import { getKPIs, generateTrend } from './utils.js';
import { products, warehouses } from './data.js';

export const resolvers = {
  Query: {
    warehouses: () => warehouses.map(warehouse => warehouse.code),
    kpis: (_, { range = 7 }) => {
        const { totalStock, totalDemand, fillRate } = getKPIs(products);
        return {
            totalStock,
            totalDemand,
            fillRate,
            trend: generateTrend(range, products)
        };
    }
  }
};