import { Address, BigInt } from '@graphprotocol/graph-ts'
import { constants } from '@amxx/graphprotocol-utils'
import { ethereum } from '@graphprotocol/graph-ts'
import { LogRebase } from '../../generated/XCController/XCControllerABI'
import {
  fetchController,
  refreshController,
  fetchRebaseByEpoch,
  fetchRebase,
} from '../fetch/xc_controller'
import { fetchToken, refreshToken } from '../fetch/xc_token'
import { formatAMPL } from '../utils'

// Triggered on the "GatewayRebaseReported" event
export function handleStorageUpdate(call: ethereum.Call): void {
  let controller = fetchController(call.to)
  refreshController(controller)
  controller.save()
}

// Triggered on the "LogRebase" event
// updates store with new rebase information
export function handleRebase(event: LogRebase): void {
  let controller = fetchController(event.address)
  refreshController(controller)

  let token = fetchToken(Address.fromHexString(controller.token) as Address)
  refreshToken(token)

  let currentEpoch = event.params.epoch
  let previousRebaseID = controller.lastRebase
  let previousRebase = fetchRebase(controller, previousRebaseID)
  let previousEpoch = previousRebase.epoch

  let rebase = fetchRebaseByEpoch(controller, currentEpoch)
  rebase.controller = controller.id
  rebase.epoch = currentEpoch
  rebase.timestamp = event.params.timestampSec
  rebase.previousSupply = previousRebase.supply
  rebase.supply = token.globalAMPLSupply
  rebase.supplyAdjustment = rebase.supply.minus(rebase.previousSupply)
  rebase.precentageChange = rebase.supply
    .div(rebase.previousSupply)
    .minus(constants.BIGDECIMAL_ONE)

  controller.lastRebase = rebase.id
  controller.globalAmpleforthEpoch = currentEpoch

  rebase.save()
  controller.save()
}
