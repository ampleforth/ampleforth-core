import * as abis from './abis'
import * as deployments from './deployments'
import * as queries from './queries'
import * as entities from './entities'

import {
    Oracle,
    Report,
    Policy,
    Rebase,
    Token,
    TokenBalance,
    TokenApproval,
    XCController,
    XCToken,
    XCRebase,
} from './entities'

import {
    MAX_PER_PAGE,
    GET_ORACLE_DATA,
    GET_PROVIDER_REPORTS,
    GET_POLICY_DATA,
    GET_REBASES,
    GET_TOKEN_DATA,
    GET_TOKEN_BALANCES,
    GET_TOKEN_APPROVAL,
    GET_XC_CONTROLLER_DATA,
    GET_XC_REBASES,
    GET_XC_TOKEN_DATA,
    GET_XC_TOKEN_BALANCES,
    GET_XC_TOKEN_APPROVAL,
} from './queries'

const DEFAULT_CHAIN_ID = 1
const DEFAULT_CLIENT = queries.initializeClient(
    queries.graphHostedURL(DEFAULT_CHAIN_ID),
)

// Query methods
async function getOracle(
    address: string,
    client: queries.Client,
): Promise<Oracle> {
    const dt = await client
        .query(GET_ORACLE_DATA, { id: address.toLowerCase() })
        .toPromise()
    return new Oracle(dt.data.medianOracles[0])
}

async function getPolicy(
    address: string,
    client: queries.Client,
): Promise<Policy> {
    const dt = await client
        .query(GET_POLICY_DATA, { id: address.toLowerCase() })
        .toPromise()
    return new Policy(dt.data.policies[0])
}

async function getToken(
    address: string,
    client: queries.Client,
): Promise<Token> {
    const dt = await client
        .query(GET_TOKEN_DATA, { id: address.toLowerCase() })
        .toPromise()
    return new Token(dt.data.tokens[0])
}

async function getXCController(
    address: string,
    client: queries.Client,
): Promise<XCController> {
    const dt = await client
        .query(GET_XC_CONTROLLER_DATA, { id: address.toLowerCase() })
        .toPromise()
    return new XCController(dt.data.xccontrollers[0])
}

async function getXCToken(
    address: string,
    client: queries.Client,
): Promise<XCToken> {
    const dt = await client
        .query(GET_XC_TOKEN_DATA, { id: address.toLowerCase() })
        .toPromise()
    return new XCToken(dt.data.xctokens[0])
}

// NOTE: issue exists while pagination in the graph such that
// skip can't be more than 5000.
// TODO: Alternatively Query using timestamp ranges
async function getOracleProviderReports(
    oracleAddress: string,
    providerAddress: string,
    client: queries.Client,
): Promise<Report[]> {
    let skip = 0
    const reports: Report[] = []
    while (true) {
        try {
            const dt = await client
                .query(GET_PROVIDER_REPORTS, {
                    providerID: oracleAddress
                        .toLowerCase()
                        .concat('|')
                        .concat(providerAddress.toLowerCase()),
                    first: MAX_PER_PAGE,
                    skip,
                })
                .toPromise()
            if (!dt.data || dt.data.oracleReports.length == 0) {
                break
            }
            for (const r of dt.data.oracleReports) {
                reports.push(new Report(r))
            }
            skip += MAX_PER_PAGE
        } catch (e) {
            break
        }
    }
    return reports
}

async function getRebases(
    policy: Policy,
    client: queries.Client,
): Promise<Rebase[]> {
    let skip = 0
    const rebases: Rebase[] = []
    while (true) {
        try {
            const dt = await client
                .query(GET_REBASES, {
                    id: policy.address.toLowerCase(),
                    first: MAX_PER_PAGE,
                    skip: skip,
                })
                .toPromise()
            if (!dt.data || dt.data.rebases.length == 0) {
                break
            }
            for (const r of dt.data.rebases) {
                rebases.push(new Rebase(r))
            }
            skip += MAX_PER_PAGE
        } catch (e) {
            break
        }
    }
    return rebases
}

async function getXCRebases(
    controller: XCController,
    client: queries.Client,
): Promise<XCRebase[]> {
    let skip = 0
    const rebases: XCRebase[] = []
    while (true) {
        try {
            const dt = await client
                .query(GET_XC_REBASES, {
                    id: controller.address,
                    first: MAX_PER_PAGE,
                    skip: skip,
                })
                .toPromise()
            if (!dt.data || dt.data.xcrebases.length == 0) {
                break
            }
            for (const r of dt.data.xcrebases) {
                rebases.push(new XCRebase(r))
            }
            skip += MAX_PER_PAGE
        } catch (e) {
            break
        }
    }
    return rebases
}

async function getBCTokenBalances(
    token: Token,
    addresses: string[],
    client: queries.Client,
): Promise<TokenBalance[]> {
    const dt = await client
        .query(GET_TOKEN_BALANCES, {
            id: token.address.toLowerCase(),
            accounts: addresses.map((a) => a.toLowerCase()),
        })
        .toPromise()
    const balances: TokenBalance[] = []
    for (const b of dt.data.tokenBalances) {
        balances.push(new TokenBalance(b))
    }
    return balances
}

async function getBCTokenBalance(
    token: Token,
    address: string,
    client: queries.Client,
): Promise<TokenBalance> {
    const dt = await client
        .query(GET_TOKEN_BALANCES, {
            id: token.address.toLowerCase(),
            accounts: [address.toLowerCase()],
        })
        .toPromise()
    return new TokenBalance(dt.data.tokenBalances[0])
}

async function getBCTokenApproval(
    token: Token,
    owner: string,
    spender: string,
    client: queries.Client,
): Promise<TokenApproval> {
    const dt = await client
        .query(GET_TOKEN_APPROVAL, {
            id: token.address.toLowerCase(),
            owner: owner.toLowerCase(),
            spender: spender.toLowerCase(),
        })
        .toPromise()
    return new TokenApproval(dt.data.tokenApprovals[0])
}

async function getXCTokenBalances(
    xctoken: XCToken,
    addresses: string[],
    client: queries.Client,
): Promise<TokenBalance[]> {
    const dt = await client
        .query(GET_XC_TOKEN_BALANCES, {
            id: xctoken.address.toLowerCase(),
            accounts: addresses.map((a) => a.toLowerCase()),
        })
        .toPromise()
    const balances: TokenBalance[] = []
    for (const b of dt.data.xctokenBalances) {
        balances.push(new TokenBalance(b))
    }
    return balances
}

async function getXCTokenBalance(
    xctoken: XCToken,
    address: string,
    client: queries.Client,
): Promise<TokenBalance> {
    const dt = await client
        .query(GET_XC_TOKEN_BALANCES, {
            id: xctoken.address.toLowerCase(),
            accounts: [address.toLowerCase()],
        })
        .toPromise()
    return new TokenBalance(dt.data.xctokenBalances[0])
}

async function getXCTokenApproval(
    xctoken: XCToken,
    owner: string,
    spender: string,
    client: queries.Client,
): Promise<TokenApproval> {
    const dt = await client
        .query(GET_XC_TOKEN_APPROVAL, {
            id: xctoken.address.toLowerCase(),
            owner: owner.toLowerCase(),
            spender: spender.toLowerCase(),
        })
        .toPromise()
    return new TokenApproval(dt.data.xctokenApprovals[0])
}

async function getTokenBalances(
    token: Token | XCToken,
    addresses: string[],
    client: queries.Client,
): Promise<TokenBalance[]> {
    if (token instanceof XCToken) {
        return getXCTokenBalances(token as XCToken, addresses, client)
    }
    return getBCTokenBalances(token as Token, addresses, client)
}

async function getTokenBalance(
    token: Token | XCToken,
    address: string,
    client: queries.Client,
): Promise<TokenBalance> {
    if (token instanceof XCToken) {
        return getXCTokenBalance(token as XCToken, address, client)
    }
    return getBCTokenBalance(token as Token, address, client)
}

async function getTokenApproval(
    token: Token | XCToken,
    owner: string,
    spender: string,
    client: queries.Client,
): Promise<TokenApproval> {
    if (token instanceof XCToken) {
        return getXCTokenApproval(token as XCToken, owner, spender, client)
    }
    return getBCTokenApproval(token as Token, owner, spender, client)
}

// Helper functions
function getAmpleforthMarketOracle(
    chainID = DEFAULT_CHAIN_ID,
    client: queries.Client = DEFAULT_CLIENT,
): Promise<Oracle> {
    const addresses = deployments.getDeployment(chainID)
    return getOracle(addresses.MarketOracle.toLowerCase(), client)
}

function getAmpleforthCPIOracle(
    chainID = DEFAULT_CHAIN_ID,
    client: queries.Client = DEFAULT_CLIENT,
): Promise<Oracle> {
    const addresses = deployments.getDeployment(chainID)
    return getOracle(addresses.CPIOracle.toLowerCase(), client)
}

function getAmpleforthCPIOracles(
    chainID = DEFAULT_CHAIN_ID,
    client: queries.Client = DEFAULT_CLIENT,
): Promise<Oracle[]> {
    const addresses = deployments.getDeployment(chainID)
    return Promise.all(
        [addresses.CPIOracle]
            .concat(addresses.PrevCPIOracles)
            .map((a) => getOracle(a.toLowerCase(), client)),
    )
}

function getAmpleforthPolicy(
    chainID = DEFAULT_CHAIN_ID,
    client: queries.Client = DEFAULT_CLIENT,
): Promise<Policy> {
    const addresses = deployments.getDeployment(chainID)
    return getPolicy(addresses.Policy.toLowerCase(), client)
}

function getAMPLToken(
    chainID = DEFAULT_CHAIN_ID,
    client: queries.Client = DEFAULT_CLIENT,
): Promise<Token> {
    const addresses = deployments.getDeployment(chainID)
    return getToken(addresses.Token.toLowerCase(), client)
}

function getXCAmpleController(
    chainID: number,
    client: queries.Client,
): Promise<XCController> {
    const addresses = deployments.getXCDeployment(chainID)
    return getXCController(addresses.XCController.toLowerCase(), client)
}

function getXCAmpleToken(
    chainID: number,
    client: queries.Client,
): Promise<XCToken> {
    const addresses = deployments.getXCDeployment(chainID)
    return getXCToken(addresses.XCToken.toLowerCase(), client)
}

export {
    abis,
    deployments,
    queries,
    entities,
    // Query methods
    getOracle,
    getOracleProviderReports,
    getPolicy,
    getToken,
    getRebases,
    getXCController,
    getXCToken,
    getXCRebases,
    getTokenBalance,
    getTokenBalances,
    getTokenApproval,
    // Helper functions
    getAmpleforthMarketOracle,
    getAmpleforthCPIOracle,
    getAmpleforthCPIOracles,
    getAmpleforthPolicy,
    getAMPLToken,
    getXCAmpleController,
    getXCAmpleToken,
}
