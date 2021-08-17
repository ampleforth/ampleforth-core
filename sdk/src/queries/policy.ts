const REBASE_FRAGMENT = `
  {
    id
    policy {
      id
    }
    epoch
    timestamp
    supply
    previousSupply
    precentageChange
    supplyAdjustment
    targetRate
    marketRate
    cpi
  }
`

export const GET_POLICY_DATA = `
  query GetPolicyData ($id: ID!) {
    policies(where: { id: $id }) {
      id
      baseCPI
      rebaseLag
      deviationThreshold
      minRebaseTimeIntervalSec
      rebaseWindowOffsetSec
      rebaseWindowLengthSec
      lastRebase ${REBASE_FRAGMENT}
    }
  }
`

export const GET_REBASE_REPORTS = `
  query GetRebaseReports ($id: ID!, $first: Int!, $skip: Int) {
    rebases(where: { policy: $id },
      first: $first,
      skip: $skip,
      orderBy: timestamp,
      orderDirection: desc) ${REBASE_FRAGMENT}
  }
`
