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

const emptyTokenBalance: ScaledTokenBalanceData = {
    id: '0x',
    token: {
        id: '0x',
        address: '0x',
        balanceScalar: '0',
    },
    account: '0x',
    value: '0',
    valueExact: '0',
}

export default class TokenBalance {
    constructor(private data: ScaledTokenBalanceData) {
        if (!data) {
            this.data = emptyTokenBalance
        }
    }

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
        return !this.scaledBalance.eq('0')
            ? this.scaledBalance.div(this.scalar)
            : new BigNumber('0')
    }
}
