import { BigNumber } from 'bignumber.js'
import XCRebase, { XCRebaseData } from './XCRebase'

export interface XCControllerData {
    id: string
    address: string
    lastRebase: XCRebaseData
    historicalRebases: XCRebaseData[]
}

export default class XCController {
    public lastRebase: XCRebase
    public historicalRebases: XCRebase[] = []

    constructor(private data: XCControllerData) {
        this.lastRebase = new XCRebase(this.data.lastRebase)
        if (this.data.historicalRebases) {
            this.loadHistoricalRebases(this.data.historicalRebases)
        }
    }

    get address(): string {
        return this.data.id
    }

    get epoch(): BigNumber {
        return this.lastRebase.epoch
    }

    get supply(): BigNumber {
        return this.lastRebase.supply
    }

    // TODO: convert this to binary search
    getSupplyOn(dt: string): BigNumber {
        const ts = new BigNumber(dt)
        for (let r = 0; r < this.historicalRebases.length - 1; r++) {
            const r1 = this.historicalRebases[r]
            const r2 = this.historicalRebases[r + 1]
            if (ts.gte(r1.timestamp) && ts.lt(r2.timestamp)) {
                return r1.supply
            }
        }
        return this.supply
    }

    loadHistoricalRebases(rebases: XCRebaseData[]): void {
        for (const rebase of rebases) {
            this.historicalRebases.push(new XCRebase(rebase))
        }
        this.historicalRebases = this.historicalRebases.sort((r1, r2) =>
            r1.timestamp.comparedTo(r2.timestamp),
        )
    }
}
