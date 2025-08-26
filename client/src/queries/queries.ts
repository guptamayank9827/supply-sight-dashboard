import { gql } from '@apollo/client';

export const FETCH_KPIS = gql`
  query KPIs($range: Int!) {
    kpis(range: $range) {
      totalStock
      totalDemand
      fillRate
      trend { date stock demand }
    }
    warehouses
  }
`;

export const FETCH_PRODUCTS = gql`
  query Products($search: String, $warehouse: String, $status: Status, $offset: Int!, $limit: Int!) {
    products(search: $search, warehouse: $warehouse, status: $status, offset: $offset, limit: $limit) {
      items {
        id name sku warehouse stock demand status
      }
    }
  }
`;

export const FETCH_PRODUCT = gql`
  query Product($id: ID!) {
    product(id: $id) { id name sku warehouse stock demand status }
  }
`;

export const UPDATE_DEMAND = gql`
  mutation UpdateDemand($id: ID!, $demand: Int!) {
    updateDemand(id: $id, demand: $demand) { id demand stock status }
  }
`;

export const TRANSFER_STOCK = gql`
  mutation TransferStock($id: ID!, $quantity: Int!, $toWarehouse: String!) {
    transferStock(id: $id, quantity: $quantity, toWarehouse: $toWarehouse) { id stock warehouse status }
  }
`;