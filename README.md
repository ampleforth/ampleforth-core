# ampleforth-subgraph

- Token, Policy, Oracle
- Replace dashboard calls
- Only need current state

- calls:
https://github.com/ampleforth/frg-web-api
https://web-api.ampleforth.org/eth/token-info
https://web-api.ampleforth.org/eth/token-rebase-histroy
https://web-api.ampleforth.org/eth/oracle-info
https://web-api.ampleforth.org/eth/oracle-histroy

## Available Scripts

### Subgraph

The Graph is a tool for for indexing events emitted on the Ethereum blockchain. It provides you with an easy-to-use GraphQL API. <br/>

To learn more, check out the [The Graph documentation](https://thegraph.com/docs).

#### `yarn subgraph:codegen`

Generates AssemblyScript types for smart contract ABIs and the subgraph schema.

#### `yarn subgraph:build`

Compiles the subgraph to WebAssembly.

#### `yarn subgraph:auth`

Before deploying your subgraph, you need to sign up on the
[Graph Explorer](https://thegraph.com/explorer/). There, you will be given an access token. Drop it in the command
below:

```sh
GRAPH_ACCESS_TOKEN=your-access-token-here yarn subgraph:auth
```

#### `yarn subgraph:deploy`

Deploys the subgraph to the official Graph Node.<br/>

Replace `paulrberg/create-eth-app` in the package.json script with your subgraph's name.

You may also want to [read more about the hosted service](https://thegraph.com/docs/quick-start#hosted-service).
