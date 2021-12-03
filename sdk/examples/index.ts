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
    const marketOracle = await getAmpleforthMarketOracle()
    console.log('Market oracle', marketOracle.getData().toString())
    console.log('Providers ', marketOracle.providers.length)

    const providerReports = await getOracleProviderReports(
        marketOracle,
        marketOracle.providers[0].id,
    )
    console.log(providerReports.length)

    const cpiOracle = await getAmpleforthCPIOracle()
    console.log('CPI oracle', cpiOracle.getData().toString())
    console.log('Providers ', cpiOracle.providers.length)

    const policy = await getAmpleforthPolicy()
    console.log('Epoch', policy.epoch.toString())
    console.log('Supply', policy.supply.toString())

    const rebases = await getRebaseReports(policy)
    console.log('Rebases', rebases.length)

    const ampl = await getAMPLToken()
    console.log('AMPL supply', ampl.totalSupply.toString())
    const b = await getTokenBalance(
        ampl,
        '0xd99528ce2a83fbad03c1b50bb39e5653b91072b3',
    )
    console.log('User Balance', b.balance.toString())

    const a = await getTokenApproval(
        ampl,
        '0xd99528ce2a83fbad03c1b50bb39e5653b91072b3',
        '0x881d40237659c251811cec9c364ef91dc08d300c',
    )
    console.log(a)
    console.log('User Approval', a.value.toString())
}

run()
