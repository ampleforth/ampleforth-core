import { constants } from '@amxx/graphprotocol-utils'
import { ethereum, BigDecimal } from '@graphprotocol/graph-ts'
import { LogRebase, LogRebaseV2 } from '../../generated/Policy/PolicyABI'
import { fetchPolicy, refreshPolicy, fetchRebaseByEpoch } from '../fetch/policy'
import { formatAMPL, formatEther } from '../utils'

let BASE_CPI = BigDecimal.fromString('109.195000000000007392')

// Triggered when either "setDeviationThreshold"
// or "setRebaseTimingParameters" is invoked
// refreshes all the hyper parameter values in the store
export function handleStorageUpdate(call: ethereum.Call): void {
  let policy = fetchPolicy(call.to)
  refreshPolicy(policy)
  policy.save()
}

// Triggered on the "LogRebase" event
// updates store with new rebase information
export function handleLogRebase(event: LogRebase): void {
  let policy = fetchPolicy(event.address)
  refreshPolicy(policy)
  policy.save()

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

  let cpi = formatEther(event.params.cpi)
  rebase.targetRate = cpi.div(BASE_CPI)
  rebase.save()

  policy.lastRebase = rebase.id
  policy.save()
}

// Triggered on the "LogRebaseV2" event
// updates store with new rebase information
export function handleLogRebaseV2(event: LogRebaseV2): void {
  let policy = fetchPolicy(event.address)
  refreshPolicy(policy)
  policy.save()

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
  rebase.targetRate = formatEther(event.params.targetRate)
  rebase.save()

  policy.lastRebase = rebase.id
  policy.save()
}
