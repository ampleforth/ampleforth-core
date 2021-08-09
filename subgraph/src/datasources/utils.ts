import { BigDecimal, BigInt } from '@graphprotocol/graph-ts'

export const formatAmpl = (wei: BigInt): BigDecimal => {
  return wei.toBigDecimal().div(
    BigInt.fromI32(10)
      .pow(9)
      .toBigDecimal(),
  )
}

export const increment = (a: BigInt): BigInt => {
  return a.plus(BigInt.fromI32(1))
}

export const decrement = (a: BigInt): BigInt => {
  return a.minus(BigInt.fromI32(1))
}
