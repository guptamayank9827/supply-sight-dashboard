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