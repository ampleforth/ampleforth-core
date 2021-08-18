import {
    getAmpleforthMarketOracle,
    getAmpleforthCPIOracle,
    getOracleProviderReports,
    getAmpleforthPolicy,
    getRebaseReports,
    getAMPLToken,
    getTokenBalance,
    // getTokenApproval,
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
    console.log('Rebase Perc', policy.rebasePerc.toString())

    const rebases = await getRebaseReports(policy)
    console.log('Rebases', rebases.length)

    const ampl = await getAMPLToken()
    console.log('AMPL supply', ampl.totalSupply.toString())
    const b = await getTokenBalance(
        ampl,
        '0x1e6bb68acec8fefbd87d192be09bb274170a0548',
    )
    console.log('User Balance', b.balance.toString())
}

run()
