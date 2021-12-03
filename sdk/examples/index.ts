import {
    getAmpleforthMarketOracle,
    getAmpleforthCPIOracle,
    getOracleProviderReports,
    getAmpleforthPolicy,
    getRebaseReports,
    getAMPLToken,
    getTokenBalance,
    getTokenApproval,
} from '../src'

async function run() {
    const now = Date.now() / 1000
    const marketOracle = await getAmpleforthMarketOracle()
    console.log('Market oracle', marketOracle.getData().toString())
    console.log('Providers ', marketOracle.providers.length)

    const cpiOracle = await getAmpleforthCPIOracle()
    console.log('CPI oracle', cpiOracle.getData().toString())
    console.log('Providers ', cpiOracle.providers.length)

    const policy = await getAmpleforthPolicy()
    console.log('Epoch', policy.epoch.toString())
    console.log('Supply', policy.supply.toString())

    const nextRebaseTimestampSec = policy.nextRebaseWindow()[0].toNumber()
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
            policy.nextRebasePerc(rate.toString(), cpi.toString()),
        )
    }

    console.log(
        'Rebase perc',
        policy
            .nextRebasePerc('1.2507983570213292', '116.78800000000001')
            .toString(),
    )

    const ampl = await getAMPLToken()
    console.log('AMPL supply', ampl.totalSupply.toString())
    const b = await getTokenBalance(
        ampl,
        '0x6723b7641c8ac48a61f5f505ab1e9c03bb44a301',
    )
    console.log('User Balance', b.balance.toString())

    const a = await getTokenApproval(
        ampl,
        '0xd99528ce2a83fbad03c1b50bb39e5653b91072b3',
        '0x881d40237659c251811cec9c364ef91dc08d300c',
    )
    console.log('User Approval', a.value.toString())

    // history
    // const providerReports = await getOracleProviderReports(
    //     marketOracle,
    //     marketOracle.providers[0].id,
    // )
    // console.log(providerReports.length)
    //
    // const rebases = await getRebaseReports(policy)
    // console.log('Rebases', rebases.length)
}

run()
