import {
    getAmpleforthMarketOracle,
    getAmpleforthCPIOracle,
    getOracleProviderReports,
    getAmpleforthPolicy,
    getRebaseReports,
    getAMPLToken,
    getTokenBalance,
    // getTokenApproval,
} from '../index'

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
        '0x85a07da377a4de02409fa2a05616743f1392bb90',
    )
    console.log('User Balance', b.balance.toString())
}

run()
