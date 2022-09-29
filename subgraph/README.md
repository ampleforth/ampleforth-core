## @ampleforth/subgraph

The Graph is a tool for for indexing events emitted on the Ethereum blockchain. It provides you with an easy-to-use GraphQL API.

```
Public graphql endpoint:
https://api.thegraph.com/subgraphs/name/aalavandhan/ampleforth
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
yarn global add mustache
yarn
```

To build and deploy the subgraph to the graph hosted service:

```
# temporary deployment
./scripts/deploy.sh mainnet ampleforth/staging

# testnet deployment
./scripts/deploy.sh goerli ampleforth/ampleforth-core-goerli

# production deployment
./scripts/deploy.sh mainnet ampleforth/ampleforth-core
./scripts/deploy.sh avalanche ampleforth/ampleforth-core-avalanche
```