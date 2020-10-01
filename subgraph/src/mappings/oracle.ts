import { MedianOracle, OracleProvider, OracleReport } from '../types/schema'
import {
  ProviderReportPushed,
  ProviderAdded,
  ProviderRemoved,
  OracleABI,
} from '../types/MarketOracle/OracleABI'
import { formatEther } from './utils'

export function handleReport(event: ProviderReportPushed): void {
  // get MedianOracle contract
  let oracleContract = OracleABI.bind(event.address)

  // get MedianOracle entity
  let oracle = MedianOracle.load(event.address.toHex())

  // get OracleProvider entity
  let provider = OracleProvider.load(
    oracle.id + '-' + event.params.provider.toHex(),
  )

  // create OracleReport entity
  let report = new OracleReport(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
  )

  // set values
  report.oracle = oracle.id
  report.provider = provider.id
  report.report = formatEther(event.params.payload)
  report.timestamp = event.params.timestamp
  report.blocknumber = event.block.number
  report.transactionHash = event.transaction.hash

  // query data
  let data = oracleContract.getData()
  oracle.medianReport = formatEther(data.value0)
  oracle.isValid = data.value1
  oracle.reportDelay = oracleContract.reportDelaySec()
  oracle.reportExpirationTime = oracleContract.reportExpirationTimeSec()

  // save
  report.save()
  oracle.save()
}

export function handleAddProvider(event: ProviderAdded): void {
  // get or create MedianOracle entity
  let oracle = MedianOracle.load(event.address.toHex())
  if (oracle == null) {
    oracle = new MedianOracle(event.address.toHex())
  }

  // get or create OracleProvider entity on MedianOracle
  let provider = OracleProvider.load(
    oracle.id + '-' + event.params.provider.toHex(),
  )
  if (provider == null) {
    provider = new OracleProvider(
      oracle.id + '-' + event.params.provider.toHex(),
    )
    provider.address = event.params.provider
    provider.oracle = oracle.id
  }

  // set values
  provider.active = true

  // save
  oracle.save()
  provider.save()
}

export function handleRemoveProvider(event: ProviderRemoved): void {
  // get OracleProvider entity
  let provider = new OracleProvider(
    event.address.toHex() + '-' + event.params.provider.toHex(),
  )

  // set values
  provider.active = false

  // save
  provider.save()
}
