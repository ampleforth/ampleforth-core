import { Address, BigInt } from '@graphprotocol/graph-ts'
import { constants } from '@amxx/graphprotocol-utils'
import { TokenABI } from '../../generated/Token/TokenABI'
import { Token, TokenBalance, TokenApproval } from '../../generated/schema'
import { formatAMPL } from '../utils'

let SCALED_TOTAL_SUPPLY = BigInt.fromString(
  '115792089237316195423570985008687907853269984665640564039457550000000000000000',
)

export function refreshToken(token: Token): void {
  let tokenAddress = Address.fromHexString(token.id) as Address
  let tokenContract = TokenABI.bind(tokenAddress)

  token.decimals = tokenContract.decimals()
  token.name = tokenContract.name()
  token.symbol = tokenContract.symbol()
  token.policy = tokenContract.monetaryPolicy().toString()

  token.totalSupplyExact = tokenContract.totalSupply()
  token.totalSupply = formatAMPL(token.totalSupplyExact)
  token.scaledTotalSupplyExact = SCALED_TOTAL_SUPPLY
  token.scaledTotalSupply = formatAMPL(token.scaledTotalSupplyExact)
  token.balanceScalar = token.scaledTotalSupplyExact.div(token.totalSupplyExact)
}

export function fetchToken(id: Address): Token {
  let token = Token.load(id.toHexString())
  if (token == null) {
    token = new Token(id.toHexString())
    token.address = id
    refreshToken(token as Token)
  }
  return token as Token
}

export function fetchTokenBalance(
  token: Token,
  account: Address,
): TokenBalance {
  let id = token.id.concat('|').concat(account.toHexString())
  let balance = TokenBalance.load(id)
  if (balance == null) {
    balance = new TokenBalance(id)
    balance.token = token.id
    balance.account = account
    balance.value = constants.BIGDECIMAL_ZERO
    balance.valueExact = constants.BIGINT_ZERO
  }
  return balance as TokenBalance
}

export function fetchTokenApproval(
  token: Token,
  owner: Address,
  spender: Address,
): TokenApproval {
  let id = token.id
    .concat('|')
    .concat(owner.toHexString())
    .concat(spender.toHexString())
  let approval = TokenApproval.load(id)
  if (approval == null) {
    approval = new TokenApproval(id)
    approval.token = token.id
    approval.owner = owner
    approval.spender = spender
    approval.value = constants.BIGDECIMAL_ZERO
    approval.valueExact = constants.BIGINT_ZERO
  }
  return approval as TokenApproval
}
