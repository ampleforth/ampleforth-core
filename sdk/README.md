## @ampleforth/sdk

A collection of libraries for dAPPs to interact with the Ampleforth protocol on ethereum.

Check out the [examples](./examples).

### Getting started

```
yarn add @ampleforthorg/sdk

const {getAMPLToken, getTokenBalance} = require("@ampleforthorg/sdk")

const ampl = await getAMPLToken()
console.log(ampl.totalSupply.toString())

const b = await getTokenBalance(ampl, '0x1e6bb68acec8fefbd87d192be09bb274170a0548')
console.log(b.balance.toString())
```

## Publish

```
yarn build
npm publish --access public
```
