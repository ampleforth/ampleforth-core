import { BigNumber } from 'bignumber.js'

export interface XCTokenData {
    id: string
    address: string
    decimals: number
    name: string
    symbol: string
    balanceScalar: string
    totalSupply: string
    totalSupplyExact: string
    globalAMPLSupply: string
    globalAMPLSupplyExact: string
}

export default class XCToken {
    constructor(private data: XCTokenData) {}

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

    get globalAMPLSupply(): BigNumber {
        return new BigNumber(this.data.globalAMPLSupply)
    }
}
