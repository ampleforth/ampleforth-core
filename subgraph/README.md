## @ampleforth/subgraph

The Graph is a tool for for indexing events emitted on the Ethereum blockchain. It provides you with an easy-to-use GraphQL API.

## Getting started

Run a local instance of the graph node:

```
git clone https://github.com/graphprotocol/graph-node
cd graph-node/docker
# update docker-compose.yaml with alchemy rpc endpoint
docker-compose up
```

To build and deploy the subgraph on your local graph node:

```
./scripts/prepare.sh mainnet # or kovan
yarn remove-local # skip if deploying for the first time
yarn create-local
yarn deploy-local
```

To deploy the subgraph to prod:

```
./scripts/prepare.sh mainnet

# create an account with thegraph.com and get access key
yarn graph auth --product hosted-service <ACCESS_TOKEN>

yarn deploy
```
