import { Client, cacheExchange, fetchExchange } from '@urql/core'
import fetch from 'isomorphic-unfetch'

export const MAX_PER_PAGE = 500
export const GRAPH_GATEWAY_URL = 'https://gateway.thegraph.com'
export const GRAPH_BASE_URL = 'https://api.thegraph.com/subgraphs/name'

type GraphEndpointsMapping = {
    [key: number]: string
}
export const GRAPH_ENDPOINTS: GraphEndpointsMapping = {
    // chainID => endpoint
    1: `https://web-api.ampleforth.org/graph-cache/ampleforth-core`,
    5: `${GRAPH_BASE_URL}/ampleforth/ampleforth-core-goerli`,
    43114: `${GRAPH_BASE_URL}/ampleforth/ampleforth-core-avalanche`,
}
export const graphHostedURL = (chainID = 1): string => {
    return GRAPH_ENDPOINTS[chainID]
}

export const AMPLEFORTH_DAO_SUBGRAPH_ID =
    '3KgoMxpMHJsLK2R4W9hrF6S7WTYdcH9UW9vtnsGumY4s'
export const graphGatewayURL = (apiKey: string): string => {
    return `${GRAPH_GATEWAY_URL}/api/${apiKey}/subgraphs/id/${AMPLEFORTH_DAO_SUBGRAPH_ID}`
}

export const initializeClient = (url: string): Client => {
    return new Client({
        fetch,
        url,
        exchanges: [cacheExchange, fetchExchange],
    })
}
