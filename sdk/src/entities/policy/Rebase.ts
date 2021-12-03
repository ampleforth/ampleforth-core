import { BigNumber } from 'bignumber.js'

export interface RebaseData {
    id: string
    epoch: string
    timestamp: string
    supply: string
    previousSupply: string
    precentageChange: string
    supplyAdjustment: string
    marketRate: string
    cpi: string
    targetRate: string
}

export default class Rebase {
    constructor(private data: RebaseData) {}

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

    get price(): BigNumber {
        return new BigNumber(this.data.marketRate)
    }

    get priceTarget(): BigNumber {
        return new BigNumber(this.data.targetRate)
    }

    get marketCap(): BigNumber {
        return this.price.multipliedBy(this.supply)
    }
}
