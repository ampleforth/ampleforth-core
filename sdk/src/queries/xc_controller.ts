const XC_REBASE_FRAGMENT = `
  {
    id
    controller {
      id
    }
    epoch
    timestamp
    supply
    previousSupply
    precentageChange
    supplyAdjustment
  }
`

export const GET_XC_CONTROLLER_DATA = `
  query GetXCControllerData ($id: ID!) {
    xccontrollers(where: { id: $id }) {
      id
      lastRebase ${XC_REBASE_FRAGMENT}
    }
  }
`

export const GET_XC_REBASES = `
  query GetXCRebases ($id: ID!, $first: Int!, $skip: Int) {
    xcrebases(where: { controller: $id },
      first: $first,
      skip: $skip,
      orderBy: timestamp,
      orderDirection: desc) ${XC_REBASE_FRAGMENT}
  }
`
