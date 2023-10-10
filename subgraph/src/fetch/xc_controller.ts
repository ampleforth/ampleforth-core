import { Address, BigInt, BigDecimal } from '@graphprotocol/graph-ts'
import { constants } from '@amxx/graphprotocol-utils'
import { XCControllerABI } from '../../generated/XCController/XCControllerABI'
import { XCTokenABI } from '../../generated/XCToken/XCTokenABI'
import { XCController, XCRebase } from '../../generated/schema'
import { formatAMPL } from '../utils'

let INITIAL_SUPPLY = BigDecimal.fromString('50000000')

export function refreshController(controller: XCController): void {
  let controllerAddress = Address.fromString(controller.id)
  let controllerContract = XCControllerABI.bind(controllerAddress)
  controller.globalAmpleforthEpoch = controllerContract.globalAmpleforthEpoch()
  controller.nextGlobalAmpleforthEpoch =
    controllerContract.nextGlobalAmpleforthEpoch()
  controller.nextGlobalAMPLSupplyExact =
    controllerContract.nextGlobalAMPLSupply()
  controller.nextGlobalAMPLSupply = formatAMPL(
    controller.nextGlobalAMPLSupplyExact,
  )
  controller.token = controllerContract.xcAmple().toHexString()
}

export function fetchController(id: Address): XCController {
  let controllerId = id.toHexString()
  let controller = XCController.load(controllerId)
  if (controller == null) {
    controller = new XCController(controllerId)
    controller.address = id
    refreshController(controller as XCController)
    let rebase = fetchRebaseByEpoch(
      controller as XCController,
      BigInt.fromString('0'),
    )
    rebase.supply = INITIAL_SUPPLY
    rebase.previousSupply = INITIAL_SUPPLY
    rebase.save()
    controller.lastRebase = rebase.id
  }
  return controller as XCController
}

export function fetchRebase(
  controller: XCController,
  rebaseId: string,
): XCRebase {
  let rebase = XCRebase.load(rebaseId)
  if (rebase == null) {
    rebase = new XCRebase(rebaseId)
    rebase.controller = controller.id
    rebase.epoch = constants.BIGINT_ZERO
    rebase.timestamp = constants.BIGINT_ZERO
    rebase.supply = constants.BIGDECIMAL_ZERO
    rebase.previousSupply = constants.BIGDECIMAL_ZERO
    rebase.precentageChange = constants.BIGDECIMAL_ZERO
    rebase.supplyAdjustment = constants.BIGDECIMAL_ZERO
  }
  return rebase as XCRebase
}

export function fetchRebaseByEpoch(
  controller: XCController,
  epoch: BigInt,
): XCRebase {
  let rebaseId = controller.id.concat('|').concat(epoch.toString())
  let rebase = fetchRebase(controller, rebaseId)
  rebase.epoch = epoch
  return rebase
}
