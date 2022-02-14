import { constants } from '@amxx/graphprotocol-utils'
import { ethereum } from '@graphprotocol/graph-ts'
import {
  ProviderAdded,
  ProviderRemoved,
  PushReportCall,
  PurgeReportsCall,
} from '../../generated/MarketOracle/OracleABI'
import {
  fetchMedianOracle,
  fetchOracleProvider,
  fetchOracleReport,
  fetchOracleReportByNonce,
  refreshMedianOracle,
} from '../fetch/oracle'

import { increment, formatEther } from '../utils'

// Triggered when either "setReportDelaySec" or "setReportExpirationTimeSec"
// or "setMinimumProviders" is invoked
// refreshes all the hyper parameter values in the store
export function handleStorageUpdate(call: ethereum.Call): void {
  let oracle = fetchMedianOracle(call.to)
  refreshMedianOracle(oracle)
  oracle.save()
}

// Triggered when oracle provider invokes "pushReport"
// updates provider store with new report
export function handlePushReport(call: PushReportCall): void {
  let oracle = fetchMedianOracle(call.to)
  let provider = fetchOracleProvider(oracle, call.from)
  let currentNonce = provider.reportCount

  let report = fetchOracleReportByNonce(provider, currentNonce)
  report.report = formatEther(call.inputs.payload)
  report.timestamp = call.block.timestamp
  report.nonce = currentNonce

  let report1 = fetchOracleReport(provider, provider.report1)
  let report2 = fetchOracleReport(provider, provider.report2)
  if (report1.timestamp.le(report2.timestamp)) {
    provider.report1 = report.id
  } else {
    provider.report2 = report.id
  }

  provider.reportCount = increment(currentNonce)

  report.save()
  provider.save()
}

// Triggered when oracle provider invokes "purgeReports"
// invalidates active reports in provider store
export function handlePurgeReports(call: PurgeReportsCall): void {
  let oracle = fetchMedianOracle(call.to)
  let provider = fetchOracleProvider(oracle, call.from)

  let report1 = fetchOracleReport(provider, provider.report1)
  let report2 = fetchOracleReport(provider, provider.report2)

  report1.timestamp = constants.BIGINT_ONE
  report1.purged = true

  report2.timestamp = constants.BIGINT_ONE
  report2.purged = true

  report1.save()
  report2.save()
}

// Triggered when the "ProviderAdded" event fires
// adds new "active" OracleProvider to the store
export function handleAddProvider(event: ProviderAdded): void {
  let oracle = fetchMedianOracle(event.address)
  let provider = fetchOracleProvider(oracle, event.params.provider)
  provider.save()
}

// Triggered when the "ProviderRemoved" event fires
// updates existing OracleProvider from the store as "inactive"
export function handleRemoveProvider(event: ProviderRemoved): void {
  let oracle = fetchMedianOracle(event.address)
  let provider = fetchOracleProvider(oracle, event.params.provider)
  provider.purged = true
  provider.save()
}
