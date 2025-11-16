## @ampleforth/subgraph

The Graph is a tool for for indexing events emitted on the Ethereum blockchain. It provides you with an easy-to-use GraphQL API.

```
Public graphql endpoint:
https://api.goldsky.com/api/public/project_cmgzjl03n004g5np20v5j3qpx/subgraphs/ampleforth-core/prod/gn
```

## Getting started

Run a local instance of the graph node:

```
git clone https://github.com/graphprotocol/graph-node
cd graph-node/docker

# update docker-compose.yaml with alchemy rpc endpoint
docker-compose up
```

Setup project:
```
yarn
```

To build and deploy the subgraph to the graph hosted service:

```
# temporary deployment
./scripts/deploy.sh mainnet ampleforth/staging

# testnet deployment
./scripts/deploy.sh goerli ampleforth-core-goerli

# production deployment
./scripts/deploy.sh mainnet ampleforth-core <VERSION>
./scripts/deploy.sh avalanche ampleforth-core-avalanche <VERSION>
# once deployed, update the tag that frg-web-api looks for.
goldsky subgraph tag create ampleforth-core/<VERSION> --tag prod
```
```
