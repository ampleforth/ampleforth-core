import { BigNumber } from 'bignumber.js'
import Rebase, { RebaseData } from './Rebase'

export interface PolicyData {
    id: string
    address: string
    rebaseFunctionNegativePercentageLimit: string
    rebaseFunctionPositivePercentageLimit: string
    rebaseFunctionNegativeGrowth: string
    rebaseFunctionPositiveGrowth: string
    rebaseLag: string
    deviationThreshold: string
    minRebaseTimeIntervalSec: string
    rebaseWindowOffsetSec: string
    rebaseWindowLengthSec: string
    lastRebase: RebaseData
    historicalRebases: RebaseData[]
}

const DATA_DEFAULTS = {
    rebaseFunctionNegativePercentageLimit: '-0.077',
    rebaseFunctionPositivePercentageLimit: '0.05',
    rebaseFunctionNegativeGrowth: '41',
    rebaseFunctionPositiveGrowth: '20',
}

export default class Policy {
    public lastRebase: Rebase
    public historicalRebases: Rebase[] = []

    constructor(private data: PolicyData) {
        this.lastRebase = new Rebase(this.data.lastRebase)
        if (this.data.historicalRebases) {
            this.loadHistoricalRebases(
                this.data.historicalRebases.map((r) => new Rebase(r)),
            )
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

    get targetRate(): BigNumber {
        return this.lastRebase.targetRate
    }

    get rebaseFunctionNegativePercentageLimit(): BigNumber {
        return new BigNumber(
            this.data.rebaseFunctionNegativePercentageLimit ||
                DATA_DEFAULTS.rebaseFunctionNegativePercentageLimit,
        )
    }

    get rebaseFunctionPositivePercentageLimit(): BigNumber {
        return new BigNumber(
            this.data.rebaseFunctionPositivePercentageLimit ||
                DATA_DEFAULTS.rebaseFunctionPositivePercentageLimit,
        )
    }

    get rebaseFunctionNegativeGrowth(): BigNumber {
        return new BigNumber(
            this.data.rebaseFunctionNegativeGrowth ||
                DATA_DEFAULTS.rebaseFunctionNegativeGrowth,
        )
    }

    get rebaseFunctionPositiveGrowth(): BigNumber {
        return new BigNumber(
            this.data.rebaseFunctionPositiveGrowth ||
                DATA_DEFAULTS.rebaseFunctionPositiveGrowth,
        )
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

    nextRebaseSupply(marketRate: string, targetRate: string): BigNumber {
        const supplyDelta = this.computeSupplyDelta(marketRate, targetRate)
        return this.supply.plus(supplyDelta)
    }

    nextRebasePerc(marketRate: string, targetRate: string): BigNumber {
        const deviation = new BigNumber(marketRate).minus(
            new BigNumber(targetRate),
        )

        if (deviation.abs().lte(this.deviationThreshold)) {
            return new BigNumber('0')
        }

        const delta = new BigNumber(marketRate)
            .div(new BigNumber(targetRate))
            .minus(new BigNumber('1'))

        const isPositiveRebase = delta.gte(0)
        const lower = isPositiveRebase
            ? new BigNumber(
                  this.rebaseFunctionPositivePercentageLimit,
              ).negated()
            : new BigNumber(this.rebaseFunctionNegativePercentageLimit)
        const upper = isPositiveRebase
            ? new BigNumber(this.rebaseFunctionPositivePercentageLimit)
            : new BigNumber(
                  this.rebaseFunctionNegativePercentageLimit,
              ).negated()
        const growth = isPositiveRebase
            ? new BigNumber(this.rebaseFunctionPositiveGrowth)
            : new BigNumber(this.rebaseFunctionNegativeGrowth)
        const scaling = new BigNumber('32')

        let exp = growth.multipliedBy(delta)
        exp = BigNumber.minimum(new BigNumber('100'), exp)
        exp = BigNumber.maximum(new BigNumber('-100'), exp)
        exp = exp.gte(new BigNumber('0'))
            ? exp
                  .multipliedBy(scaling)
                  .dp(0, BigNumber.ROUND_FLOOR)
                  .div(scaling)
            : exp.multipliedBy(scaling).dp(0, BigNumber.ROUND_CEIL).div(scaling)
        const pow = new BigNumber(2 ** exp.toNumber())
        if (pow.isEqualTo(new BigNumber('0'))) {
            return new BigNumber('0')
        }

        const numerator = upper.minus(lower)
        const intermediate = upper.div(lower).div(pow)
        const denominator = new BigNumber('1').minus(intermediate)

        return lower.plus(numerator.div(denominator))
    }

    computeSupplyDelta(marketRate: string, targetRate: string): BigNumber {
        const nextRebasePercentage = this.nextRebasePerc(marketRate, targetRate)
        return this.supply.multipliedBy(nextRebasePercentage)
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

    loadHistoricalRebases(rebases: Rebase[]): void {
        for (const rebase of rebases) {
            this.historicalRebases.push(rebase)
        }
        this.historicalRebases = this.historicalRebases.sort((r1, r2) =>
            r1.timestamp.comparedTo(r2.timestamp),
        )
    }
}
