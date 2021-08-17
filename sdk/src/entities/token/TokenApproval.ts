import { BigNumber } from 'bignumber.js'
import { EmptyObject } from '../helpers'

export interface TokenApprovalData {
    id: string
    token: EmptyObject
    owner: string
    spender: string
    value: string
    valueExact: string
}

export default class TokenApproval {
    constructor(private data: TokenApprovalData) {}

    get token(): string {
        return this.data.token.id
    }

    get owner(): string {
        return this.data.owner
    }

    get spender(): string {
        return this.data.spender
    }

    get value(): BigNumber {
        return new BigNumber(this.data.value)
    }
}
