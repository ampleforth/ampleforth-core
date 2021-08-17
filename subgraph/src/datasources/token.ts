import { constants } from '@amxx/graphprotocol-utils'
import { ethereum, log } from '@graphprotocol/graph-ts'
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
} from '../fetch/token'
import { formatAMPL, formatEther } from '../utils'

// Triggered when "setMonetaryPolicy" is invoked
// refreshes store
export function handleHyperParamUpdate(call: ethereum.Call): void {
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

// Triggered when "transferFrom" is invoked
// NOTE: transferFrom does not emit Approval event
// updates store with the new approval amount to keep store in sync
export function handleApprovalUpdateOnTransferFrom(
  call: TransferFromCall,
): void {
  let token = fetchToken(call.to)
  let approval = fetchTokenApproval(token, call.inputs.from, call.from)
  approval.valueExact = approval.valueExact.minus(call.inputs.value)
  approval.value = formatAMPL(approval.valueExact)
  approval.save()
}

// Triggered when "transferAllFrom" is invoked
// NOTE: transferAllFrom does not emit Approval event
// updates store with the new approval amount to keep store in sync
export function handleApprovalUpdateOnTransferAllFrom(
  call: TransferAllFromCall,
): void {
  let token = fetchToken(call.to)
  let approval = fetchTokenApproval(token, call.inputs.from, call.from)
  let scaledBalance = fetchTokenBalance(token, call.inputs.from)
  let balanceValueExact = scaledBalance.valueExact.div(token.balanceScalar)
  approval.valueExact = approval.valueExact.minus(balanceValueExact)
  approval.value = formatAMPL(approval.valueExact)
  approval.save()
}
