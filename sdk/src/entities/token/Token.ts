import { BigNumber } from 'bignumber.js'

export interface TokenData {
    id: string
    address: string
    decimals: number
    name: string
    symbol: string
    balanceScalar: string
    totalSupply: string
    totalSupplyExact: string
    scaledTotalSupply: string
    scaledTotalSupplyExact: string
}

export default class Token {
    constructor(private data: TokenData) {}

    get address(): string {
        return this.data.id
    }

    get name(): string {
        return this.data.name
    }
    get symbol(): string {
        return this.data.symbol
    }
    get decimals(): number {
        return this.data.decimals
    }

    get totalSupply(): BigNumber {
        return new BigNumber(this.data.totalSupply)
    }

    get scaledTotalSupply(): BigNumber {
        return new BigNumber(this.data.scaledTotalSupply)
    }
}
