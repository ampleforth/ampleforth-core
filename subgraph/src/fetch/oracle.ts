import { Address, BigInt } from '@graphprotocol/graph-ts'
import { constants } from '@amxx/graphprotocol-utils'
import { OracleABI } from '../../generated/MarketOracle/OracleABI'
import {
  MedianOracle,
  OracleProvider,
  OracleReport,
} from '../../generated/schema'

export function refreshMedianOracle(oracle: MedianOracle): void {
  let oracleAddress = Address.fromString(oracle.id)
  let oracleContract = OracleABI.bind(oracleAddress)

  oracle.reportDelaySec = oracleContract.reportDelaySec()
  oracle.reportExpirationTimeSec = oracleContract.reportExpirationTimeSec()
  oracle.minimumProviders = oracleContract.minimumProviders()
}

export function fetchMedianOracle(id: Address): MedianOracle {
  let oracleId = id.toHexString()
  let oracle = MedianOracle.load(oracleId)
  if (oracle == null) {
    oracle = new MedianOracle(oracleId)
    oracle.address = id
    refreshMedianOracle(oracle as MedianOracle)
  }
  return oracle as MedianOracle
}

export function fetchOracleProvider(
  oracle: MedianOracle,
  id: Address,
): OracleProvider {
  let providerId = oracle.id.concat('|').concat(id.toHexString())
  let provider = OracleProvider.load(providerId)
  if (provider == null) {
    provider = new OracleProvider(providerId)
    provider.address = id
    provider.purged = false
    provider.oracle = oracle.id
    provider.reportCount = BigInt.fromI32(2)
    let report1 = fetchOracleReport(
      provider,
      providerId.concat('|').concat(BigInt.fromI32(0).toString()),
    )
    report1.purged = true
    report1.save()
    provider.report1 = report1.id
    let report2 = fetchOracleReport(
      provider,
      providerId.concat('|').concat(BigInt.fromI32(1).toString()),
    )
    report2.purged = true
    report2.save()
    provider.report2 = report2.id
  }
  return provider as OracleProvider
}

export function fetchOracleReport(
  provider: OracleProvider,
  reportId: string,
): OracleReport {
  let report = OracleReport.load(reportId)
  if (report == null) {
    report = new OracleReport(reportId)
    report.oracle = provider.oracle
    report.provider = provider.id
    report.report = constants.BIGDECIMAL_ZERO
    report.nonce = constants.BIGINT_ZERO
    report.timestamp = constants.BIGINT_ZERO
    report.purged = false
  }
  return report as OracleReport
}

export function fetchOracleReportByNonce(
  provider: OracleProvider,
  nonce: BigInt,
): OracleReport {
  let reportId = provider.id.concat('|').concat(nonce.toString())
  let report = fetchOracleReport(provider, reportId)
  report.nonce = nonce
  return report
}
