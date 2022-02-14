import * as abis from './abis'
import * as deployments from './deployments'
import * as queries from './queries'

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
    initializeClient,
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

// Query methods
async function getOracle(address: string, chainID: number): Promise<Oracle> {
    const dt = await initializeClient(chainID)
        .query(GET_ORACLE_DATA, { id: address.toLowerCase() })
        .toPromise()
    return new Oracle(dt.data.medianOracles[0])
}

async function getPolicy(address: string, chainID: number): Promise<Policy> {
    const dt = await initializeClient(chainID)
        .query(GET_POLICY_DATA, { id: address.toLowerCase() })
        .toPromise()
    return new Policy(dt.data.policies[0])
}

async function getToken(address: string, chainID: number): Promise<Token> {
    const dt = await initializeClient(chainID)
        .query(GET_TOKEN_DATA, { id: address.toLowerCase() })
        .toPromise()
    return new Token(dt.data.tokens[0])
}

async function getXCController(
    address: string,
    chainID: number,
): Promise<XCController> {
    const dt = await initializeClient(chainID)
        .query(GET_XC_CONTROLLER_DATA, { id: address.toLowerCase() })
        .toPromise()
    return new XCController(dt.data.xccontrollers[0])
}

async function getXCToken(address: string, chainID: number): Promise<XCToken> {
    const dt = await initializeClient(chainID)
        .query(GET_XC_TOKEN_DATA, { id: address.toLowerCase() })
        .toPromise()
    return new XCToken(dt.data.xctokens[0])
}

// NOTE: issue exists while pagination in the graph such that
// skip can't be more than 5000.
// TODO: Alternatively Query using timestamp ranges
async function getOracleProviderReports(
    oracle: Oracle,
    providerID: string,
    chainID: number,
): Promise<Report[]> {
    let skip = 0
    const reports: Report[] = []
    while (true) {
        try {
            const dt = await initializeClient(chainID)
                .query(GET_PROVIDER_REPORTS, {
                    providerID: providerID,
                    oracleID: oracle.address,
                    first: MAX_PER_PAGE,
                    skip: skip,
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

async function getRebases(policy: Policy, chainID: number): Promise<Rebase[]> {
    let skip = 0
    const rebases: Rebase[] = []
    while (true) {
        try {
            const dt = await initializeClient(chainID)
                .query(GET_REBASES, {
                    id: policy.address,
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
    chainID: number,
): Promise<XCRebase[]> {
    let skip = 0
    const rebases: XCRebase[] = []
    while (true) {
        try {
            const dt = await initializeClient(chainID)
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
    chainID: number,
): Promise<TokenBalance[]> {
    const dt = await initializeClient(chainID)
        .query(GET_TOKEN_BALANCES, {
            id: token.address,
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
    chainID: number,
): Promise<TokenBalance> {
    const dt = await initializeClient(chainID)
        .query(GET_TOKEN_BALANCES, {
            id: token.address,
            accounts: [address.toLowerCase()],
        })
        .toPromise()
    return new TokenBalance(dt.data.tokenBalances[0])
}

async function getBCTokenApproval(
    token: Token,
    owner: string,
    spender: string,
    chainID: number,
): Promise<TokenApproval> {
    const dt = await initializeClient(chainID)
        .query(GET_TOKEN_APPROVAL, {
            id: token.address,
            owner: owner.toLowerCase(),
            spender: spender.toLowerCase(),
        })
        .toPromise()
    return new TokenApproval(dt.data.tokenApprovals[0])
}

async function getXCTokenBalances(
    xctoken: XCToken,
    addresses: string[],
    chainID: number,
): Promise<TokenBalance[]> {
    const dt = await initializeClient(chainID)
        .query(GET_XC_TOKEN_BALANCES, {
            id: xctoken.address,
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
    chainID: number,
): Promise<TokenBalance> {
    const dt = await initializeClient(chainID)
        .query(GET_XC_TOKEN_BALANCES, {
            id: xctoken.address,
            accounts: [address.toLowerCase()],
        })
        .toPromise()
    return new TokenBalance(dt.data.xctokenBalances[0])
}

async function getXCTokenApproval(
    xctoken: XCToken,
    owner: string,
    spender: string,
    chainID: number,
): Promise<TokenApproval> {
    const dt = await initializeClient(chainID)
        .query(GET_XC_TOKEN_APPROVAL, {
            id: xctoken.address,
            owner: owner.toLowerCase(),
            spender: spender.toLowerCase(),
        })
        .toPromise()
    return new TokenApproval(dt.data.xctokenApprovals[0])
}

async function getTokenBalances(
    token: Token | XCToken,
    addresses: string[],
    chainID: number,
): Promise<TokenBalance[]> {
    if (token instanceof XCToken) {
        return getXCTokenBalances(token as XCToken, addresses, chainID)
    }
    return getBCTokenBalances(token as Token, addresses, chainID)
}

async function getTokenBalance(
    token: Token | XCToken,
    address: string,
    chainID: number,
): Promise<TokenBalance> {
    if (token instanceof XCToken) {
        return getXCTokenBalance(token as XCToken, address, chainID)
    }
    return getBCTokenBalance(token as Token, address, chainID)
}

async function getTokenApproval(
    token: Token | XCToken,
    owner: string,
    spender: string,
    chainID: number,
): Promise<TokenApproval> {
    if (token instanceof XCToken) {
        return getXCTokenApproval(token as XCToken, owner, spender, chainID)
    }
    return getBCTokenApproval(token as Token, owner, spender, chainID)
}

// Helper functions
function getAmpleforthMarketOracle(chainID = 1): Promise<Oracle> {
    const addresses = deployments.getDeployment(chainID)
    return getOracle(addresses.MarketOracle.toLowerCase(), chainID)
}

function getAmpleforthCPIOracle(chainID = 1): Promise<Oracle> {
    const addresses = deployments.getDeployment(chainID)
    return getOracle(addresses.CPIOracle.toLowerCase(), chainID)
}

function getAmpleforthPolicy(chainID = 1): Promise<Policy> {
    const addresses = deployments.getDeployment(chainID)
    return getPolicy(addresses.Policy.toLowerCase(), chainID)
}

function getAMPLToken(chainID = 1): Promise<Token> {
    const addresses = deployments.getDeployment(chainID)
    return getToken(addresses.Token.toLowerCase(), chainID)
}

function getXCAmpleController(chainID: number): Promise<XCController> {
    const addresses = deployments.getXCDeployment(chainID)
    return getXCController(addresses.XCController.toLowerCase(), chainID)
}

function getXCAmpleToken(chainID: number): Promise<XCToken> {
    const addresses = deployments.getXCDeployment(chainID)
    return getXCToken(addresses.XCToken.toLowerCase(), chainID)
}

export {
    abis,
    deployments,
    queries,
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
    getAmpleforthPolicy,
    getAMPLToken,
    getXCAmpleController,
    getXCAmpleToken,
}
