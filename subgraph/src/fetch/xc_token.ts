import { Address, BigInt } from '@graphprotocol/graph-ts'
import { constants } from '@amxx/graphprotocol-utils'
import { XCTokenABI } from '../../generated/XCToken/XCTokenABI'
import {
  XCToken,
  XCTokenBalance,
  XCTokenApproval,
} from '../../generated/schema'
import { formatAMPL } from '../utils'

let SCALED_GLOBAL_SUPPLY = BigInt.fromString(
  '115792089237316195423570985008687907853269984665640564039457550000000000000000',
)

export function refreshToken(token: XCToken): void {
  let tokenAddress = Address.fromString(token.id)
  let tokenContract = XCTokenABI.bind(tokenAddress)
  token.decimals = tokenContract.decimals()
  token.name = tokenContract.name()
  token.symbol = tokenContract.symbol()
  token.controller = tokenContract.controller().toHexString()
  token.globalAMPLSupplyExact = tokenContract.globalAMPLSupply()
  token.globalAMPLSupply = formatAMPL(token.globalAMPLSupplyExact)
  token.totalSupplyExact = tokenContract.totalSupply()
  token.totalSupply = formatAMPL(token.totalSupplyExact)
  token.balanceScalar = SCALED_GLOBAL_SUPPLY.div(token.globalAMPLSupplyExact)
}

export function fetchToken(id: Address): XCToken {
  let token = XCToken.load(id.toHexString())
  if (token == null) {
    token = new XCToken(id.toHexString())
    token.address = id
    refreshToken(token as XCToken)
  }
  return token as XCToken
}

export function fetchTokenBalance(
  token: XCToken,
  account: Address,
): XCTokenBalance {
  let id = token.id.concat('|').concat(account.toHexString())
  let balance = XCTokenBalance.load(id)
  if (balance == null) {
    balance = new XCTokenBalance(id)
    balance.token = token.id
    balance.account = account
    balance.value = constants.BIGDECIMAL_ZERO
    balance.valueExact = constants.BIGINT_ZERO
  }
  return balance as XCTokenBalance
}

export function fetchTokenApproval(
  token: XCToken,
  owner: Address,
  spender: Address,
): XCTokenApproval {
  let id = token.id
    .concat('|')
    .concat(owner.toHexString())
    .concat(spender.toHexString())
  let approval = XCTokenApproval.load(id)
  if (approval == null) {
    approval = new XCTokenApproval(id)
    approval.token = token.id
    approval.owner = owner
    approval.spender = spender
    approval.value = constants.BIGDECIMAL_ZERO
    approval.valueExact = constants.BIGINT_ZERO
  }
  return approval as XCTokenApproval
}

export function refreshTokenBalance(
  token: XCToken,
  balance: XCTokenBalance,
): void {
  let tokenAddress = Address.fromString(token.id)
  let tokenContract = XCTokenABI.bind(tokenAddress)
  let unscaledBalance = tokenContract.balanceOf(balance.account)
  balance.valueExact = token.balanceScalar.times(unscaledBalance)
  balance.value = formatAMPL(balance.valueExact)
}

export function refreshTokenApproval(
  token: XCToken,
  approval: XCTokenApproval,
): void {
  let tokenAddress = Address.fromString(token.id)
  let tokenContract = XCTokenABI.bind(tokenAddress)
  approval.valueExact = tokenContract.allowance(
    Address.fromString(approval.owner.toHexString()),
    Address.fromString(approval.spender.toHexString()),
  )
  approval.value = formatAMPL(approval.valueExact)
}
