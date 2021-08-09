import { decimals, constants } from '@amxx/graphprotocol-utils'

import {
  ProviderReportPushed,
  ProviderAdded,
  ProviderRemoved,
  SetReportDelaySecCall,
  SetReportExpirationTimeSecCall,
  SetMinimumProvidersCall,
  PushReportCall,
  PurgeReportsCall,
} from '../../generated/MarketOracle/OracleABI'

import {
  fetchMedianOracle,
  fetchOracleProvider,
  fetchOracleReport,
  fetchOracleReportByNonce,
  refreshMedianOracle,
  ORACLE_DECIMALS,
} from '../fetch/oracle'

import { increment } from './utils'

// Triggered when the "setReportDelaySec" in invoked
// updates the reportDelaySec value in the store
export function handleSetReportDelaySec(call: SetReportDelaySecCall): void {
  let oracle = fetchMedianOracle(call.to)
  refreshMedianOracle(oracle)
  oracle.save()
}

// Triggered when the "setReportExpirationTimeSec" in invoked
// updates the reportExpirationTimeSecvalue in the store
export function handleSetReportExpirationTimeSec(
  call: SetReportExpirationTimeSecCall,
): void {
  let oracle = fetchMedianOracle(call.to)
  refreshMedianOracle(oracle)
  oracle.save()
}

// Triggered when the "setMinimumProviders" in invoked
// updates the minimumProviders in the store
export function handleSetMinimumProviders(call: SetMinimumProvidersCall): void {
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
  report.report = decimals.toDecimals(call.inputs.payload, ORACLE_DECIMALS)
  report.timestamp = call.block.timestamp
  report.nonce = currentNonce

  let report1 = fetchOracleReport(provider, provider.activeReport1)
  let report2 = fetchOracleReport(provider, provider.activeReport2)
  if (report1.timestamp.le(report2.timestamp)) {
    provider.activeReport1 = report.id
  } else {
    provider.activeReport2 = report.id
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

  let report1 = fetchOracleReport(provider, provider.activeReport1)
  let report2 = fetchOracleReport(provider, provider.activeReport2)

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
  provider.active = true
  provider.save()
}

// Triggered when the "ProviderRemoved" event fires
// updates existing OracleProvider from the store as "inactive"
export function handleRemoveProvider(event: ProviderRemoved): void {
  let oracle = fetchMedianOracle(event.address)
  let provider = fetchOracleProvider(oracle, event.params.provider)
  provider.active = false
  provider.save()
}
