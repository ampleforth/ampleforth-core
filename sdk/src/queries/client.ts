import { Client } from '@urql/core'
import fetch from 'isomorphic-unfetch'

type GraphEndpointsMapping = {
    [key: number]: string
}

export const GRAPH_BASE_URL = 'https://api.thegraph.com/subgraphs/name'

export const GRAPH_ENDPOINTS: GraphEndpointsMapping = {
    // chainID => endpoint
    1: 'https://gateway.thegraph.com/api/09f032e5d7ba7cc9725796c9ee511c17/subgraphs/id/3KgoMxpMHJsLK2R4W9hrF6S7WTYdcH9UW9vtnsGumY4s',
    42: `${GRAPH_BASE_URL}/ampleforth/ampleforth-core-kovan`,
    43114: `${GRAPH_BASE_URL}/ampleforth/ampleforth-core-avalanche`,
}

export const MAX_PER_PAGE = 500

export const initializeClient = (chainID = 1): Client => {
    if (GRAPH_ENDPOINTS[chainID] === null) {
        throw new Error(`No graph endpoint found for chainID:${chainID}`)
    }

    return new Client({
        fetch,
        url: GRAPH_ENDPOINTS[chainID],
        requestPolicy: 'cache-and-network',
    })
}
