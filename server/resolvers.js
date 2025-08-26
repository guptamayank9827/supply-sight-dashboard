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

      if(!product)  throw new Error('Product not found');

      product.status = getProductStatus(product);
      
      return product;
    }
  },

  Mutation: {
    updateDemand: (_, { id, demand }) => {
      const idx = products.findIndex(product => product.id === id);

      if (idx < 0) throw new Error('Product not found');

      products[idx] = { ...products[idx], demand };

      return products[idx];
    },

    transferStock: (_, { id, quantity, toWarehouse }) => {
      if (quantity <= 0) throw new Error('Quantity must be positive');

      const idx = products.findIndex(product => product.id === id);
      if (idx === -1) throw new Error('Product not found');

      // Decrement stock from source product
      const source = products[idx];
      if (source.stock < quantity) throw new Error('Insufficient stock to transfer');
      source.stock -= quantity;

      // If a product with same sku exists at destination warehouse, add stock; else create a sibling product
      const targetIdx = products.findIndex(product => product.sku === source.sku && product.warehouse === toWarehouse);
      if (targetIdx !== -1) {
        products[targetIdx].stock += quantity;
      }
      else {
        const newId = 'P-' + Math.floor(1000 + Math.random() * 9000);
        const newProd = {
          ...source,
          id: newId,
          warehouse: toWarehouse,
          stock: quantity,
          demand: quantity
        };

        products.push(newProd);
      }

      return source;
    }
  }

};