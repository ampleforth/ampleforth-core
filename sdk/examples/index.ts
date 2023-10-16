import {
    getAmpleforthMarketOracle,
    getAmpleforthCPIOracles,
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
    deployments,
} from '../src'

async function printAMPLData(chainID: number, client: queries.Client) {
    console.log('------------------------')
    console.log('chainID', chainID)
    const now = Date.now() / 1000
    const deployment = deployments.getDeployment(chainID)

    const marketOracle = await getAmpleforthMarketOracle(chainID, client)
    console.log('Market oracle', marketOracle.getData().toString())
    console.log('Providers ', marketOracle.providers.length)
    for (const p in marketOracle.providers) {
        const provider = marketOracle.providers[p]
        console.log(
            provider.address,
            provider.activeReports.map((r: any) => r.report.toString()),
        )
    }

    const cpiOracles = await getAmpleforthCPIOracles(chainID, client)
    const cpiOracle = cpiOracles[0]
    console.log('CPI oracle', cpiOracle.getData().toString())
    console.log('Providers ', cpiOracle.providers.length)

    const policy = await getAmpleforthPolicy(chainID, client)
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
            policy
                .nextRebasePerc(rate.toString(), policy.targetRate.toString())
                .toString(),
        )
    }

    const ampl = await getAMPLToken(chainID, client)
    const b = await getTokenBalance(
        ampl,
        '0x223592a191ECfC7FDC38a9256c3BD96E771539A9',
        client,
    )
    console.log('User Balance', b.balance.toString())

    const a = await getTokenApproval(
        ampl,
        '0xd99528ce2a83fbad03c1b50bb39e5653b91072b3',
        '0x881d40237659c251811cec9c364ef91dc08d300c',
        client,
    )
    console.log('User Approval', a.value.toString())

    const rateProviderReports = await getOracleProviderReports(
        marketOracle.address,
        marketOracle.providers[0].address,
        client,
    )
    console.log('Rate provider reports', rateProviderReports.length)

    const cpiProviderReports = await getOracleProviderReports(
        cpiOracle.address,
        cpiOracle.providers[0].address,
        client,
    )
    console.log('CPI provider reports', cpiProviderReports.length)

    const historicCpiProviderReports = await getOracleProviderReports(
        cpiOracles[1].address,
        cpiOracles[1].providers[0].address,
        client,
    )
    console.log(
        'Historic CPI provider reports',
        historicCpiProviderReports.length,
    )

    const rebases = await getRebases(policy, client)
    console.log('Rebases', rebases.length)
    policy.loadHistoricalRebases(rebases)
}

async function printXCAmpleData(chainID: number, client: queries.Client) {
    console.log('------------------------')
    console.log('chainID', chainID)

    const xcController = await getXCAmpleController(chainID, client)
    console.log('Epoch', xcController.epoch.toString())
    console.log('Supply', xcController.supply.toString())

    const xcAmple = await getXCAmpleToken(chainID, client)
    const b = await getTokenBalance(
        xcAmple,
        '0xe36ae366692acbf696715b6bddce0938398dd991',
        client,
    )
    console.log('User Balance', b.balance.toString())

    const a = await getTokenApproval(
        xcAmple,
        '0xa308de214e01c365834e3344c1088b0d2b97559c',
        '0xe36ae366692acbf696715b6bddce0938398dd991',
        client,
    )
    console.log('User Approval', a.value.toString())

    const rebases = await getXCRebases(xcController, client)
    console.log('Rebases', rebases.length)
    xcController.loadHistoricalRebases(rebases)
}

async function run() {
    console.log('Endpoint', queries.graphHostedURL(1))
    const client = queries.initializeClient(queries.graphHostedURL(1))
    await printAMPLData(1, client)
    // await printXCAmpleData(43114)
    // await printAMPLData(5)
}

run()
