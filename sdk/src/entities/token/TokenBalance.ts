import { BigNumber } from 'bignumber.js'

export interface TokenScalarData {
    id: string
    address: string
    balanceScalar: string
}

export interface ScaledTokenBalanceData {
    id: string
    token: TokenScalarData
    account: string
    value: string
    valueExact: string
}

export default class TokenBalance {
    constructor(private data: ScaledTokenBalanceData) {}

    get token(): string {
        return this.data.token.id
    }

    get scalar(): BigNumber {
        return new BigNumber(this.data.token.balanceScalar)
    }

    get scaledBalance(): BigNumber {
        return new BigNumber(this.data.value)
    }

    get balance(): BigNumber {
        return this.scaledBalance.div(this.scalar)
    }
}
