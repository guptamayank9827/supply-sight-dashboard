export const typeDefs = `#graphql
    enum Status {
        HEALTHY
        LOW
        CRITICAL
    }

    type Product {
        id: ID!
        name: String!
        sku: String!
        warehouse: String!
        stock: Int!
        demand: Int!
        status: Status!
    }

    type TrendPoint {
        date: String!
        stock: Int!
        demand: Int!
    }

    type KPIs {
        totalStock: Int!
        totalDemand: Int!
        fillRate: Float!
        trend: [TrendPoint!]!
    }

    type ProductsPage {
        items: [Product!]!
        total: Int!
    }

    type Query {
        products(search: String, warehouse: String, status: Status, offset: Int = 0, limit: Int = 3): ProductsPage!
        warehouses: [String!]!
        kpis(range: Int = 7): KPIs!
        product(id: ID!): Product
    }

    type Mutation {
        updateDemand(id: ID!, demand: Int!): Product!
        transferStock(id: ID!, quantity: Int!, toWarehouse: String!): Product!
    }
`;