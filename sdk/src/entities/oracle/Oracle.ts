import { BigNumber } from 'bignumber.js'
import Provider, { ProviderData } from './Provider'
import Report from './Report'

export interface OracleData {
    id: string
    address: string
    reportDelaySec: number
    reportExpirationTimeSec: number
    minimumProviders: number
    providers: ProviderData[]
}

export default class Oracle {
    private _providers: Provider[] = []

    constructor(private data: OracleData) {
        for (const provider of this.data.providers) {
            this._providers.push(new Provider(provider))
        }
    }

    get address(): string {
        return this.data.id
    }

    get delay(): BigNumber {
        return new BigNumber(this.data.reportDelaySec)
    }

    get expiry(): BigNumber {
        return new BigNumber(this.data.reportExpirationTimeSec)
    }

    get minimumProviders(): number {
        return new BigNumber(this.data.minimumProviders).toNumber()
    }

    get providers(): Provider[] {
        return this._providers
    }

    get activeProviders(): Provider[] {
        return this.providers.filter((p) => p.active)
    }

    getProvider(providerID: string): Provider | null {
        const p = this.providers.filter((p) => p.address == providerID)
        return p.length > 0 ? p[0] : null
    }

    getData(): BigNumber {
        const now = Math.trunc(Date.now() / 1000)
        const r = this.medianReportAt(now)
        return r == null ? new BigNumber(0) : (r as BigNumber)
    }

    medianReportAt(timestamp: number): BigNumber | null {
        const delay = this.delay
        const expiry = this.expiry
        const _reports = this.providers.map((p) => {
            const activeReports = p.reports
                .filter((r) =>
                    r.isActiveAt(Math.trunc(timestamp), delay, expiry),
                )
                .sort(Report.cmpTimestamp)

            // return the most recent (highest timestamp)
            return activeReports.length >= 1
                ? activeReports[activeReports.length - 1]
                : null
        })
        return _reports && _reports.length >= this.minimumProviders
            ? Report.median(_reports as Report[])
            : null
    }
}
