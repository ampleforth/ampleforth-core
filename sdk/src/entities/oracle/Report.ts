import { BigNumber } from 'bignumber.js'
import { EmptyObject } from '../helpers'

export interface ReportData {
    id: string
    oracle: EmptyObject
    provider: EmptyObject
    purged: boolean
    nonce: string
    report: string
    timestamp: string
}

export default class Report {
    constructor(private data: ReportData) {}

    get oracle(): string {
        return this.data.oracle.id
    }

    get provider(): string {
        return this.data.provider.id
    }

    get purged(): boolean {
        return this.data.purged
    }

    get nonce(): BigNumber {
        return new BigNumber(this.data.nonce)
    }

    get report(): BigNumber {
        return new BigNumber(this.data.report)
    }

    get timestamp(): BigNumber {
        return new BigNumber(this.data.timestamp)
    }

    isActiveAt(
        timestamp: number,
        delay: BigNumber,
        expiry: BigNumber,
    ): boolean {
        const ts = new BigNumber(timestamp)
        const reportActive = this.timestamp.plus(delay)
        const reportExpiry = this.timestamp.plus(expiry)
        return !this.purged && ts.gt(reportActive) && ts.lte(reportExpiry)
    }

    static cmpTimestamp(a: Report, b: Report): number {
        if (a.timestamp < b.timestamp) {
            return -1
        }
        if (a.timestamp > b.timestamp) {
            return 1
        }
        return 0
    }

    static cmpReport(a: Report, b: Report): number {
        if (a.report.lt(b.report)) {
            return -1
        }
        if (a.report.gt(b.report)) {
            return 1
        }
        return 0
    }

    static median(reports: Report[]): BigNumber | null {
        const l = reports.length
        if (l == 0) {
            return null
        }
        const reports_ = reports.sort(Report.cmpReport)
        if (l % 2 == 1) {
            return reports_[l / 2 + 1].report
        }
        return reports_[l / 2 - 1].report.plus(reports_[l / 2].report).div(2)
    }
}
