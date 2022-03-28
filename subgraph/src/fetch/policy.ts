import { Address, BigInt, BigDecimal, log } from '@graphprotocol/graph-ts'
import { constants } from '@amxx/graphprotocol-utils'
import { PolicyABI } from '../../generated/Policy/PolicyABI'
import { Policy, Rebase } from '../../generated/schema'
import { formatEther } from '../utils'

let BASE_CPI = BigDecimal.fromString('109.195000000000007392')
let INITIAL_SUPPLY = BigDecimal.fromString('50000000')
let INITIAL_RATE = constants.BIGDECIMAL_ONE

export function refreshPolicy(policy: Policy): void {
  let policyAddress = Address.fromHexString(policy.id) as Address
  let policyContract = PolicyABI.bind(policyAddress)
  policy.baseCPI = BASE_CPI
  let lower = policyContract.try_rebaseFunctionLowerPercentage()
  if (lower.reverted) {
    log.info('rebaseFunctionLowerPercentage reverted', [])
  } else {
    policy.rebaseFunctionLowerPercentage = formatEther(lower.value)
  }
  let upper = policyContract.try_rebaseFunctionUpperPercentage()
  if (upper.reverted) {
    log.info('rebaseFunctionUpperPercentage reverted', [])
  } else {
    policy.rebaseFunctionUpperPercentage = formatEther(upper.value)
  }
  let growth = policyContract.try_rebaseFunctionGrowth()
  if (growth.reverted) {
    log.info('rebaseFunctionGrowth reverted', [])
  } else {
    policy.rebaseFunctionGrowth = formatEther(growth.value)
  }
  policy.rebaseLag = policyContract.rebaseLag()
  policy.deviationThreshold = formatEther(policyContract.deviationThreshold())
  policy.minRebaseTimeIntervalSec = policyContract.minRebaseTimeIntervalSec()
  policy.rebaseWindowOffsetSec = policyContract.rebaseWindowOffsetSec()
  policy.rebaseWindowLengthSec = policyContract.rebaseWindowLengthSec()
}

export function fetchPolicy(id: Address): Policy {
  let policyId = id.toHexString()
  let policy = Policy.load(policyId)
  if (policy == null) {
    policy = new Policy(policyId)
    policy.address = id
    refreshPolicy(policy as Policy)
    let rebase = fetchRebaseByEpoch(policy as Policy, BigInt.fromString('0'))
    rebase.supply = INITIAL_SUPPLY
    rebase.previousSupply = INITIAL_SUPPLY
    rebase.targetRate = INITIAL_RATE
    rebase.marketRate = INITIAL_RATE
    rebase.cpi = BASE_CPI
    rebase.save()
    policy.lastRebase = rebase.id
  }
  return policy as Policy
}

export function fetchRebase(policy: Policy, rebaseId: string): Rebase {
  let rebase = Rebase.load(rebaseId)
  if (rebase == null) {
    rebase = new Rebase(rebaseId)
    rebase.policy = policy.id
    rebase.epoch = constants.BIGINT_ZERO
    rebase.timestamp = constants.BIGINT_ZERO
    rebase.supply = constants.BIGDECIMAL_ZERO
    rebase.previousSupply = constants.BIGDECIMAL_ZERO
    rebase.precentageChange = constants.BIGDECIMAL_ZERO
    rebase.supplyAdjustment = constants.BIGDECIMAL_ZERO
    rebase.targetRate = constants.BIGDECIMAL_ZERO
    rebase.marketRate = constants.BIGDECIMAL_ZERO
    rebase.cpi = constants.BIGDECIMAL_ZERO
  }
  return rebase as Rebase
}

export function fetchRebaseByEpoch(policy: Policy, epoch: BigInt): Rebase {
  let rebaseId = policy.id.concat('|').concat(epoch.toString())
  let rebase = fetchRebase(policy, rebaseId)
  rebase.epoch = epoch
  return rebase
}
