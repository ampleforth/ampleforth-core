import * as abis from '../abis'
import * as deployments from '../deployments'
import * as queries from './queries'

import {
    Oracle,
    Report,
    Policy,
    Rebase,
    Token,
    TokenBalance,
    TokenApproval,
} from './entities'
import {
    client,
    MAX_PER_PAGE,
    GET_ORACLE_DATA,
    GET_PROVIDER_REPORTS,
    GET_POLICY_DATA,
    GET_REBASE_REPORTS,
    GET_TOKEN_DATA,
    GET_TOKEN_BALANCES,
    GET_TOKEN_APPROVAL,
} from './queries'

// Query methods
async function getOracle(address: string): Promise<Oracle> {
    const dt = await client
        .query(GET_ORACLE_DATA, { id: address.toLowerCase() })
        .toPromise()
    return new Oracle(dt.data.medianOracles[0])
}

async function getPolicy(address: string): Promise<Policy> {
    const dt = await client
        .query(GET_POLICY_DATA, { id: address.toLowerCase() })
        .toPromise()
    return new Policy(dt.data.policies[0])
}

async function getToken(address: string): Promise<Token> {
    const dt = await client
        .query(GET_TOKEN_DATA, { id: address.toLowerCase() })
        .toPromise()
    return new Token(dt.data.tokens[0])
}

// NOTE: issue exists while pagination in the graph such that skip can't be more than 5000
// Alternatively Query using timestamp ranges
async function getOracleProviderReports(
    oracle: Oracle,
    providerID: string,
): Promise<Report[]> {
    let skip = 0
    const reports: Report[] = []
    while (true) {
        try {
            const dt = await client
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

async function getRebaseReports(policy: Policy): Promise<Rebase[]> {
    let skip = 0
    const rebases: Rebase[] = []
    while (true) {
        try {
            const dt = await client
                .query(GET_REBASE_REPORTS, {
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

async function getTokenBalances(
    token: Token,
    addresses: string[],
): Promise<TokenBalance[]> {
    const dt = await client
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

async function getTokenBalance(
    token: Token,
    address: string,
): Promise<TokenBalance> {
    const dt = await client
        .query(GET_TOKEN_BALANCES, {
            id: token.address,
            accounts: [address.toLowerCase()],
        })
        .toPromise()
    return new TokenBalance(dt.data.tokenBalances[0])
}

async function getTokenApproval(
    token: Token,
    owner: string,
    spender: string,
): Promise<TokenApproval> {
    const dt = await client
        .query(GET_TOKEN_APPROVAL, {
            id: token.address,
            owner: owner.toLowerCase(),
            spender: spender.toLowerCase(),
        })
        .toPromise()
    return new TokenApproval(dt.data.tokenApprovals[0])
}

// Helper functions
function getAmpleforthMarketOracle(): Promise<Oracle> {
    return getOracle(deployments.Mainnet.MarketOracle.toLowerCase())
}

function getAmpleforthCPIOracle(): Promise<Oracle> {
    return getOracle(deployments.Mainnet.CPIOracle.toLowerCase())
}

function getAmpleforthPolicy(): Promise<Policy> {
    return getPolicy(deployments.Mainnet.Policy.toLowerCase())
}

function getAMPLToken(): Promise<Token> {
    return getToken(deployments.Mainnet.Token.toLowerCase())
}

export {
    abis,
    deployments,
    queries,
    // Query methods
    getOracle,
    getOracleProviderReports,
    getPolicy,
    getRebaseReports,
    getToken,
    getTokenBalance,
    getTokenBalances,
    getTokenApproval,
    // Helper functions
    getAmpleforthMarketOracle,
    getAmpleforthCPIOracle,
    getAmpleforthPolicy,
    getAMPLToken,
}
