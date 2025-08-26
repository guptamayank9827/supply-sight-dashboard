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