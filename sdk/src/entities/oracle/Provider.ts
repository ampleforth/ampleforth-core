import Report, { ReportData } from './Report'

export interface ProviderData {
    id: string
    address: string
    purged: boolean
    oracle: string
    reportCount: number
    report1: ReportData
    report2: ReportData
    historicalReports: ReportData[]
}

export default class Provider {
    private _reports: Report[] = []
    private _historicalReports: Report[] = []

    constructor(private data: ProviderData) {
        if (this.data.report1) {
            this._reports.push(new Report(this.data.report1))
        }
        if (this.data.report2) {
            this._reports.push(new Report(this.data.report2))
        }
        if (this.data.historicalReports) {
            this.loadHistoricalReports(this.data.historicalReports)
        }
    }

    get id(): string {
        return this.data.id
    }

    get address(): string {
        return this.data.address
    }

    get active(): boolean {
        return !this.data.purged
    }

    get reports(): Report[] {
        return this._reports.filter((r) => !r.purged)
    }

    get historicalReports(): Report[] {
        return this._historicalReports.filter((r) => !r.purged)
    }

    loadHistoricalReports(reports: ReportData[]): void {
        for (const report of reports) {
            this._historicalReports.push(new Report(report))
        }
    }
}
