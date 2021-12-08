import { Client } from '@urql/core'
import fetch from 'isomorphic-unfetch'

export const GRAPH_ENDPOINT =
    'https://api.thegraph.com/subgraphs/name/aalavandhan/ampleforth'
export const MAX_PER_PAGE = 100

export const client = new Client({
    fetch,
    url: GRAPH_ENDPOINT,
    requestPolicy: 'network-only',
})
