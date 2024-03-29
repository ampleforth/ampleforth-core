import { constants } from '@amxx/graphprotocol-utils'
import { ethereum } from '@graphprotocol/graph-ts'
import {
  ProviderAdded,
  ProviderRemoved,
  PushReportCall,
  PurgeReportsCall,
  ProviderReportPushed,
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

// Triggered when oracle provider invokes "purgeReports"
// invalidates active reports in provider store
export function handlePurgeReports(call: PurgeReportsCall): void {
  let oracle = fetchMedianOracle(call.to)
  refreshMedianOracle(oracle)

  let provider = fetchOracleProvider(oracle, call.from)

  if (provider.report1 != null) {
    let report1 = fetchOracleReport(provider, provider.report1)
    report1.timestamp = constants.BIGINT_ONE
    report1.purged = true
    report1.save()
  }

  if (provider.report2 != null) {
    let report2 = fetchOracleReport(provider, provider.report2)
    report2.timestamp = constants.BIGINT_ONE
    report2.purged = true
    report2.save()
  }

  oracle.save()
}

// Triggered when on "ProviderReportPushed" event
// updates provider store with new report
export function handleProviderReportPushed(event: ProviderReportPushed): void {
  let oracle = fetchMedianOracle(event.address)
  refreshMedianOracle(oracle)

  let provider = fetchOracleProvider(oracle, event.params.provider)
  let currentNonce = provider.reportCount

  let report = fetchOracleReportByNonce(provider, currentNonce)
  report.report = formatEther(event.params.payload)
  report.timestamp = event.params.timestamp
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
  oracle.save()
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
