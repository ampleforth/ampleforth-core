const REPORT_FRAGMENT = `
  {
     id
     provider {
       id
     }
     oracle {
       id
     }
     report
     nonce
     timestamp
     purged
  }
`

export const GET_ORACLE_DATA = `
  query GetOracleData ($id: ID!) {
    medianOracles(where: { id: $id }) {
      id
      reportDelaySec
      reportExpirationTimeSec
      minimumProviders
      providers (where: {purged:false}) {
        id
        purged
        reportCount
        report1 ${REPORT_FRAGMENT}
        report2 ${REPORT_FRAGMENT}
      }
    }
  }
`

export const GET_PROVIDER_REPORTS = `
  query GetReports ($providerID: ID!, $oracleID: ID!, $first: Int!, $skip: Int) {
    oracleReports(where: { provider: $providerID, oracle: $oracleID },
      first: $first,
      skip: $skip,
      orderBy: timestamp,
      orderDirection: desc) ${REPORT_FRAGMENT}
  }
`
