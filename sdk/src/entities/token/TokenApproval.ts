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

const emptyTokenApproval: TokenApprovalData = {
    id: '0x',
    token: {
        id: '0x',
    },
    owner: '0x',
    spender: '0x',
    value: '0',
    valueExact: '0',
}

export default class TokenApproval {
    constructor(private data: TokenApprovalData) {
        if (!data) {
            this.data = emptyTokenApproval
        }
    }

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
