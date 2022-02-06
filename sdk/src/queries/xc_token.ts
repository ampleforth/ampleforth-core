export const GET_XC_TOKEN_DATA = `
  query GetTokenData ($id: ID!) {
    xctokens(where: { id: $id }) {
      id
      decimals
      name
      symbol
      balanceScalar
      totalSupply
      totalSupplyExact
      globalAMPLSupply
      globalAMPLSupplyExact
    }
  }
`

export const GET_XC_TOKEN_BALANCES = `
  query GetTokenBalances ($id: ID!, $accounts: [ID!]!) {
    xctokenBalances(where: { token: $id, account_in: $accounts }) {
      id
      token {
        id
        balanceScalar
      }
      account
      value
      valueExact
    }
  }
`

export const GET_XC_TOKEN_APPROVAL = `
  query GetTokenApprovals ($id: ID!, $owner: ID!, $spender: ID!) {
    xctokenApprovals(where: { token: $id, owner: $owner, spender: $spender }) {
      id
      token {
        id
      }
      owner
      spender
      value
      valueExact
    }
  }
`
