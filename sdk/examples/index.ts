import {
    getAmpleforthMarketOracle,
    getAmpleforthCPIOracle,
    getOracleProviderReports,
    getAmpleforthPolicy,
    getRebases,
    getAMPLToken,
    getTokenBalance,
    getTokenApproval,
    getXCAmpleController,
    getXCRebases,
    getXCAmpleToken,
    queries,
} from '../src'

async function printAMPLData(chainID: number) {
    console.log('------------------------')
    console.log('chainID', chainID)
    const now = Date.now() / 1000

    const marketOracle = await getAmpleforthMarketOracle(chainID)
    console.log('Market oracle', marketOracle.getData().toString())
    console.log('Providers ', marketOracle.providers.length)

    const cpiOracle = await getAmpleforthCPIOracle(chainID)
    console.log('CPI oracle', cpiOracle.getData().toString())
    console.log('Providers ', cpiOracle.providers.length)

    const policy = await getAmpleforthPolicy(chainID)
    console.log('Epoch', policy.epoch.toString())
    console.log('Supply', policy.supply.toString())

    const nextRebaseTimestampSec = policy.nextRebaseWindow()[0].toNumber()
    console.log('Next rebase timestamp', nextRebaseTimestampSec)

    const rate = marketOracle.medianReportAt(nextRebaseTimestampSec)
    if (rate) {
        console.log('Median rate report at rebase', rate.toString())
    }
    const cpi = cpiOracle.medianReportAt(nextRebaseTimestampSec)
    if (cpi) {
        console.log('Median cpi report at rebase', cpi.toString())
    }
    if (cpi && rate) {
        console.log(
            'Next rebase perc',
            policy.nextRebasePerc(rate.toString(), cpi.toString()).toString(),
        )
    }

    const ampl = await getAMPLToken(chainID)
    const b = await getTokenBalance(
        ampl,
        '0x6723b7641c8ac48a61f5f505ab1e9c03bb44a301',
        chainID,
    )
    console.log('User Balance', b.balance.toString())

    const a = await getTokenApproval(
        ampl,
        '0xd99528ce2a83fbad03c1b50bb39e5653b91072b3',
        '0x881d40237659c251811cec9c364ef91dc08d300c',
        chainID,
    )
    console.log('User Approval', a.value.toString())

    const providerReports = await getOracleProviderReports(
        marketOracle,
        marketOracle.providers[0].id,
        chainID,
    )
    console.log('Provider reports', providerReports.length)

    const rebases = await getRebases(policy, chainID)
    console.log('Rebases', rebases.length)
    policy.loadHistoricalRebases(rebases)
}

async function printXCAmpleData(chainID: number) {
    console.log('------------------------')
    console.log('chainID', chainID)

    const xcController = await getXCAmpleController(chainID)
    console.log('Epoch', xcController.epoch.toString())
    console.log('Supply', xcController.supply.toString())

    const xcAmple = await getXCAmpleToken(chainID)
    const b = await getTokenBalance(
        xcAmple,
        '0xe36ae366692acbf696715b6bddce0938398dd991',
        chainID,
    )
    console.log('User Balance', b.balance.toString())

    const a = await getTokenApproval(
        xcAmple,
        '0xa308de214e01c365834e3344c1088b0d2b97559c',
        '0xe36ae366692acbf696715b6bddce0938398dd991',
        chainID,
    )
    console.log('User Approval', a.value.toString())

    const rebases = await getXCRebases(xcController, chainID)
    console.log('Rebases', rebases.length)
    xcController.loadHistoricalRebases(rebases)
}

async function run() {
    if (process.argv.length < 3) {
        console.log(
            'provide API Key as command line argument to run mainnet example',
        )
    } else {
        queries.initializeApiKey(process.argv[2])
        await printAMPLData(1)
    }
    await printXCAmpleData(43114)
    await printAMPLData(5)
}

run()
