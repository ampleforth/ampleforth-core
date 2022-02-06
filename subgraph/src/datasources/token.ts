import { constants } from '@amxx/graphprotocol-utils'
import { ethereum } from '@graphprotocol/graph-ts'
import {
  LogRebase,
  Approval,
  Transfer,
  TransferFromCall,
  TransferAllFromCall,
} from '../../generated/Token/TokenABI'
import {
  fetchToken,
  refreshToken,
  fetchTokenApproval,
  fetchTokenBalance,
  refreshTokenApproval,
} from '../fetch/token'
import { formatAMPL, formatEther } from '../utils'

// Triggered when "setMonetaryPolicy" is invoked
// refreshes store
export function handleStorageUpdate(call: ethereum.Call): void {
  let token = fetchToken(call.to)
  refreshToken(token)
  token.save()
}

// Triggered on the "LogRebase" event
// refreshes store
export function handleRebase(event: LogRebase): void {
  let token = fetchToken(event.address)
  refreshToken(token)
  token.save()
}

// Triggered on the "Transfer" event
// updates store with the new account balance
export function handleTransfer(event: Transfer): void {
  let token = fetchToken(event.address)
  let scaledSenderBalance = fetchTokenBalance(token, event.params.from)
  let scaledRecepientBalance = fetchTokenBalance(token, event.params.to)
  let scaledAmountExact = token.balanceScalar.times(event.params.value)

  if (event.params.from.toHexString() != constants.ADDRESS_ZERO) {
    scaledSenderBalance.valueExact =
      scaledSenderBalance.valueExact.minus(scaledAmountExact)
    scaledSenderBalance.value = formatAMPL(scaledSenderBalance.valueExact)
  }
  scaledRecepientBalance.valueExact =
    scaledRecepientBalance.valueExact.plus(scaledAmountExact)
  scaledRecepientBalance.value = formatAMPL(scaledRecepientBalance.valueExact)

  scaledSenderBalance.save()
  scaledRecepientBalance.save()

  // NOTE: some transfer events modify approvals but do not emit the "Approval" event
  // so making a web3 call to get the latest data and update the store.
  let approval = fetchTokenApproval(
    token,
    event.params.from,
    event.transaction.from,
  )
  refreshTokenApproval(token, approval)
  approval.save()
}

// Triggered on the "Approval" event
// updates store with the new approval amount
export function handleApproval(event: Approval): void {
  let token = fetchToken(event.address)
  let approval = fetchTokenApproval(
    token,
    event.params.owner,
    event.params.spender,
  )
  approval.valueExact = event.params.value
  approval.value = formatAMPL(approval.valueExact)
  approval.save()
}
