import { BigNumber } from 'bignumber.js'
import Rebase, { RebaseData } from './Rebase'

export interface PolicyData {
    id: string
    address: string
    baseCPI: string
		rebaseFunctionLowerPercentage: string
		rebaseFunctionUpperPercentage: string
		rebaseFunctionGrowth: string
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

    get rebaseFunctionLowerPercentage(): BigNumber {
        return new BigNumber(this.data.rebaseFunctionLowerPercentage)
    }

    get rebaseFunctionUpperPercentage(): BigNumber {
        return new BigNumber(this.data.rebaseFunctionUpperPercentage)
    }

    get rebaseFunctionGrowth(): BigNumber {
        return new BigNumber(this.data.rebaseFunctionGrowth)
    }

    get baseCPI(): BigNumber {
        return new BigNumber(this.data.baseCPI)
    }

    get rebaseLag(): BigNumber {
        // NOTE: HOT FIX, till AIP-5 is deployed
        // this.data.rebaseLag
        return new BigNumber('10')
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

				const delta = new BigNumber(marketRate).div(targetRate).minus(BigNumber('1'))
				let exp = new BigNumber(this.rebaseFunctionGrowth).multipliedBy(delta)
				exp = BigNumber.maximum(BigNumber('100'), exp)
				exp = BigNumber.minimum(BigNumber('-100'), exp)
				const pow = new BigNumber('2').exponentiatedBy(exp)
				if (pow.isEqualTo(BigNumber('0'))) {
					return new BigNumber('0')
				}

				const numerator = new BigNumber(this.rebaseFunctionUpperPercentage).sub(BigNumber(this.rebaseFunctionUpperPercentage))
				const intermediate = new BigNumber(this.rebaseFunctionUpper).div(BigNumber(this.rebaseFunctionLower)).div(pow)
				const denominator = new BigNumber('1').minus(intermediate)

				return new BigNumber(this.rebaseFunctionLower).plus(numerator.div(denominator))
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
