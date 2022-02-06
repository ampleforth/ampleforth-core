import { BigNumber } from 'bignumber.js'
import Rebase, { RebaseData } from './Rebase'

export interface PolicyData {
    id: string
    address: string
    baseCPI: string
    rebaseLag: string
    deviationThreshold: string
    minRebaseTimeIntervalSec: string
    rebaseWindowOffsetSec: string
    rebaseWindowLengthSec: string
    lastRebase: RebaseData
    historicalRebases: RebaseData[]
}

export default class Policy {
    public lastRebase: Rebase
    public historicalRebases: Rebase[] = []

    constructor(private data: PolicyData) {
        this.lastRebase = new Rebase(this.data.lastRebase)
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

    get baseCPI(): BigNumber {
        return new BigNumber(this.data.baseCPI)
    }

    get rebaseLag(): BigNumber {
        return new BigNumber(this.data.rebaseLag)
    }

    get deviationThreshold(): BigNumber {
        return new BigNumber(this.data.deviationThreshold)
    }

    get minRebaseTimeIntervalSec(): BigNumber {
        return new BigNumber(this.data.minRebaseTimeIntervalSec)
    }

    get rebaseWindowLengthSec(): BigNumber {
        return new BigNumber(this.data.rebaseWindowLengthSec)
    }

    get rebaseWindowOffsetSec(): BigNumber {
        return new BigNumber(this.data.rebaseWindowOffsetSec)
    }

    nextRebaseWindow(): [BigNumber, BigNumber] {
        const lastRebaseTs = this.lastRebase.timestamp
        const lastRebaseWindowStart = lastRebaseTs.minus(
            lastRebaseTs.mod(this.rebaseWindowOffsetSec),
        )
        const nextRebaseWindowStart = lastRebaseWindowStart.plus(
            this.minRebaseTimeIntervalSec,
        )
        const nextRebaseWindowEnd = nextRebaseWindowStart.plus(
            this.rebaseWindowLengthSec,
        )
        return [nextRebaseWindowStart, nextRebaseWindowEnd]
    }

    nextRebaseSupply(marketRate: string, cpi: string): BigNumber {
        const supplyDelta = this.computeSupplyDelta(marketRate, cpi)
        return this.supply.plus(supplyDelta)
    }

    nextRebasePerc(marketRate: string, cpi: string): BigNumber {
        const supplyDelta = this.computeSupplyDelta(marketRate, cpi)
        const newSupply = this.supply.plus(supplyDelta)
        return newSupply.div(this.supply).minus(1)
    }

    computeSupplyDelta(marketRate: string, cpi: string): BigNumber {
        const targetRate = new BigNumber(cpi).div(this.baseCPI)
        const deviation = new BigNumber(marketRate).minus(targetRate)

        if (deviation.abs().lte(this.deviationThreshold)) {
            return new BigNumber('0')
        }

        return deviation
            .multipliedBy(this.supply)
            .div(targetRate)
            .div(this.rebaseLag)
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

    loadHistoricalRebases(rebases: RebaseData[]): void {
        for (const rebase of rebases) {
            this.historicalRebases.push(new Rebase(rebase))
        }
        this.historicalRebases = this.historicalRebases.sort((r1, r2) =>
            r1.timestamp.comparedTo(r2.timestamp),
        )
    }
}
