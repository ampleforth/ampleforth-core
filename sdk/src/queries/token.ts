export const GET_TOKEN_DATA = `
  query GetTokenData ($id: ID!) {
    tokens(where: { id: $id }) {
      id
      decimals
      name
      symbol
      balanceScalar
      totalSupply
      totalSupplyExact
      scaledTotalSupply
      scaledTotalSupplyExact
    }
  }
`

export const GET_TOKEN_BALANCES = `
  query GetTokenBalances ($id: ID!, $accounts: [ID!]!) {
    tokenBalances(where: { token: $id, account_in: $accounts }) {
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

export const GET_TOKEN_APPROVAL = `
  query GetTokenApprovals ($id: ID!, $owner: ID!, $spender: ID!) {
    tokenApprovals(where: { token: $id, owner: $owner, spender: $spender }) {
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
