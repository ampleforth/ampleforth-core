import { constants } from '@amxx/graphprotocol-utils'
import { ethereum } from '@graphprotocol/graph-ts'
import { LogRebase } from '../../generated/Policy/PolicyABI'
import { fetchPolicy, refreshPolicy, fetchRebaseByEpoch } from '../fetch/policy'
import { formatAMPL, formatEther } from '../utils'

// Triggered when either "setDeviationThreshold" or "setRebaseLag"
// or "setRebaseTimingParameters" is invoked
// refreshes all the hyper parameter values in the store
export function handleStorageUpdate(call: ethereum.Call): void {
  let policy = fetchPolicy(call.to)
  refreshPolicy(policy)
  policy.save()
}

// Triggered on the "LogRebase" event
// updates store with new rebase information
export function handleRebase(event: LogRebase): void {
  let policy = fetchPolicy(event.address)
  refreshPolicy(policy)

  let currentEpoch = event.params.epoch
  let previousEpoch = currentEpoch.minus(constants.BIGINT_ONE)
  let previousRebase = fetchRebaseByEpoch(policy, previousEpoch)

  let rebase = fetchRebaseByEpoch(policy, currentEpoch)
  rebase.policy = policy.id
  rebase.epoch = currentEpoch
  rebase.timestamp = event.block.timestamp
  rebase.previousSupply = previousRebase.supply
  rebase.supplyAdjustment = formatAMPL(event.params.requestedSupplyAdjustment)
  rebase.supply = rebase.previousSupply.plus(rebase.supplyAdjustment)
  rebase.precentageChange = rebase.supply
    .div(rebase.previousSupply)
    .minus(constants.BIGDECIMAL_ONE)
  rebase.marketRate = formatEther(event.params.exchangeRate)
  rebase.cpi = formatEther(event.params.cpi)
  rebase.targetRate = rebase.cpi.div(policy.baseCPI)

  policy.lastRebase = rebase.id

  rebase.save()
  policy.save()
}
