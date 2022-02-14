import { BigNumber } from 'bignumber.js'

export interface XCRebaseData {
    id: string
    epoch: string
    timestamp: string
    supply: string
    previousSupply: string
    precentageChange: string
    supplyAdjustment: string
}

export default class XCRebase {
    constructor(private data: XCRebaseData) {}

    get epoch(): BigNumber {
        return new BigNumber(this.data.epoch)
    }

    get timestamp(): BigNumber {
        return new BigNumber(this.data.timestamp)
    }

    get supply(): BigNumber {
        return new BigNumber(this.data.supply)
    }

    get previousSupply(): BigNumber {
        return new BigNumber(this.data.previousSupply)
    }

    get supplyAdjustment(): BigNumber {
        return new BigNumber(this.data.supplyAdjustment)
    }

    get rebasePerc(): BigNumber {
        return new BigNumber(this.data.precentageChange)
    }
}
