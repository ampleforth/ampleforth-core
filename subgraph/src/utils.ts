import { BigDecimal, BigInt } from '@graphprotocol/graph-ts'

export let BIGDECIMAL_ONE = BigDecimal.fromString("1")

export const formatAMPL = (wei: BigInt): BigDecimal => {
  return wei.toBigDecimal().div(
    BigInt.fromI32(10)
      .pow(9)
      .toBigDecimal(),
  )
}

export const formatEther = (wei: BigInt): BigDecimal => {
  return wei.toBigDecimal().div(
    BigInt.fromI32(10)
      .pow(18)
      .toBigDecimal(),
  )
}

export const increment = (a: BigInt): BigInt => {
  return a.plus(BigInt.fromI32(1))
}

export const decrement = (a: BigInt): BigInt => {
  return a.minus(BigInt.fromI32(1))
}
