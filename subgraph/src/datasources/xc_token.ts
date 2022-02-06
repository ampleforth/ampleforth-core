import { constants } from '@amxx/graphprotocol-utils'
import { BigInt, ethereum, log } from '@graphprotocol/graph-ts'
import {
  LogRebase,
  Approval,
  Transfer,
  TransferFromCall,
  TransferAllFromCall,
} from '../../generated/XCToken/XCTokenABI'
import {
  fetchToken,
  refreshToken,
  fetchTokenApproval,
  fetchTokenBalance,
  refreshTokenBalance,
  refreshTokenApproval,
} from '../fetch/xc_token'
import { formatAMPL, formatEther } from '../utils'

// Triggered on the "ControllerUpdated"/"LogRebase" events
// refreshes store
export function handleStorageUpdate(call: ethereum.Call): void {
  let token = fetchToken(call.to)
  refreshToken(token)
  token.save()
}

// Triggered on the "Transfer" event
// updates store with the new account balances
export function handleTransfer(event: Transfer): void {
  let token = fetchToken(event.address)
  let scaledSenderBalance = fetchTokenBalance(token, event.params.from)
  let scaledRecepientBalance = fetchTokenBalance(token, event.params.to)
  let msgSenderApproval = fetchTokenApproval(
    token,
    event.params.from,
    event.transaction.from,
  )

  refreshToken(token)
  refreshTokenBalance(token, scaledSenderBalance)
  refreshTokenBalance(token, scaledRecepientBalance)
  refreshTokenApproval(token, msgSenderApproval)

  token.save()
  scaledSenderBalance.save()
  scaledRecepientBalance.save()
  msgSenderApproval.save()
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
