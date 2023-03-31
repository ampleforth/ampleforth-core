import { Client, cacheExchange, fetchExchange } from '@urql/core'
import fetch from 'isomorphic-unfetch'

type GraphEndpointsMapping = {
    [key: number]: string
}

export const GRAPH_BASE_URL = 'https://api.thegraph.com/subgraphs/name'

export const GRAPH_ENDPOINTS: GraphEndpointsMapping = {
    // chainID => endpoint
    42: `${GRAPH_BASE_URL}/ampleforth/ampleforth-core-kovan`,
    43114: `${GRAPH_BASE_URL}/ampleforth/ampleforth-core-avalanche`,
}

export const MAX_PER_PAGE = 500

export const AMPLEFORTH_DAO_SUBGRAPH_ID =
    '3KgoMxpMHJsLK2R4W9hrF6S7WTYdcH9UW9vtnsGumY4s'

export const GRAPH_GATEWAY_URL = 'https://gateway.thegraph.com'

export const initializeApiKey = (apiKey: string): void => {
    GRAPH_ENDPOINTS[1] = `${GRAPH_GATEWAY_URL}/api/${apiKey}/subgraphs/id/${AMPLEFORTH_DAO_SUBGRAPH_ID}`
}

export const initializeClient = (chainID = 1): Client => {
    if (GRAPH_ENDPOINTS[chainID] === undefined) {
        if (chainID === 1) {
            throw new Error(
                `No graph endpoint found for chainID:1. Try updating your API Key with queries.initializeApiKey. See https://thegraph.com/studio/apikeys/ if you don't have an API Key`,
            )
        }
        throw new Error(`No graph endpoint found for chainID:${chainID}`)
    }

    return new Client({
        fetch,
        url: GRAPH_ENDPOINTS[chainID],
        exchanges: [cacheExchange, fetchExchange],
    })
}
