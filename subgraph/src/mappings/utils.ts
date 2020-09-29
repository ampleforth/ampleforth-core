import { BigDecimal, BigInt } from '@graphprotocol/graph-ts'

export const formatEther = (wei: BigInt): BigDecimal => {
  return wei.toBigDecimal().div(
    BigInt.fromI32(10)
      .pow(18)
      .toBigDecimal(),
  )
}

export const formatAmpl = (wei: BigInt): BigDecimal => {
  return wei.toBigDecimal().div(
    BigInt.fromI32(10)
      .pow(9)
      .toBigDecimal(),
  )
}
