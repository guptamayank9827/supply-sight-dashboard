import { getProductStatus, getKPIs, generateTrend } from './utils.js';
import { products, warehouses } from './data.js';

const PAGE_SIZE = 10;

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
    },

    products: (_, { search = '', warehouse, status, offset = 0, limit = PAGE_SIZE }) => {      
      let items = products.slice();

      if (search) {
        const searchQuery = search.toLowerCase();
        items = items.filter(product =>
          product.name.toLowerCase().includes(searchQuery) ||
          product.sku.toLowerCase().includes(searchQuery) ||
          product.id.toLowerCase().includes(searchQuery)
        );
      }

      if (warehouse)  items = items.filter(product => product.warehouse === warehouse);

      if (status) items = items.filter(product => getProductStatus(product) === status);

      items = items.map(product => ({ ...product, status: getProductStatus(product) }) );

      return { items };
    },

    product: (_, { id }) => {
      let product = products.find(product => product.id === id) || null;

      if(!product)  return null;

      product.status = getProductStatus(product);
      
      return product;
    }
  }

};