// import { Token, Rebase } from '../types/schema'
// import { LogRebase, PolicyABI } from '../types/Policy/PolicyABI'
// import { TokenABI } from '../types/Policy/TokenABI'
// import { Address, BigDecimal, BigInt } from '@graphprotocol/graph-ts'
// import { formatAmpl, formatEther } from './utils'

// let BASE_CPI = BigDecimal.fromString('109.195000000000007392')
// let REBASE_WINDOW_OFFSET = BigInt.fromI32(7200)
// let MIN_REBASE_TIME = BigInt.fromI32(86400)

// export function handleRebase(event: LogRebase): void {
//   // get policy contract
//   let policyContract = PolicyABI.bind(event.address)

//   // get or create Token entity
//   let tokenAddress = Address.fromString(
//     '0xD46bA6D942050d489DBd938a2C909A5d5039A161',
//   )
//   let tokenContract = TokenABI.bind(tokenAddress)
//   let token = Token.load(tokenAddress.toHex())
//   if (token == null) {
//     token = new Token(tokenAddress.toHex())
//     token.policyAddress = event.address
//     token.decimals = tokenContract.decimals()
//     token.name = tokenContract.name()
//     token.symbol = tokenContract.symbol()
//     token.baseCpi = BASE_CPI
//   }

//   // create Rebase entity
//   let rebase = new Rebase(
//     event.transaction.hash.toHex() + '-' + event.logIndex.toString(),
//   )
//   rebase.token = token.id
//   rebase.epoch = event.params.epoch
//   rebase.timestamp = event.block.timestamp
//   rebase.blocknumber = event.block.number
//   rebase.transactionHash = event.transaction.hash

//   // query supply adjustment
//   rebase.supplyAdjustment = formatAmpl(event.params.requestedSupplyAdjustment)
//   let cpi = formatEther(event.params.cpi)
//   rebase.targetRate = cpi.div(token.baseCpi)
//   rebase.marketRate = formatEther(event.params.exchangeRate)
//   token.totalSupply = formatAmpl(tokenContract.totalSupply())
//   rebase.newSupply = token.totalSupply
//   rebase.previousSupply = token.totalSupply.minus(rebase.supplyAdjustment)
//   rebase.precentageChange = token.totalSupply
//     .div(rebase.previousSupply)
//     .minus(BigDecimal.fromString('1'))
//     .times(BigDecimal.fromString('100'))

//   // query hyperparams
//   token.rebaseWindowOffset = policyContract.rebaseWindowOffsetSec()
//   token.rebaseWindowLength = policyContract.rebaseWindowLengthSec()
//   token.minRebaseTime = policyContract.minRebaseTimeIntervalSec()
//   token.deviationTreshold = formatEther(policyContract.deviationThreshold())

//   // query circulating supplies
//   token.lockedBalance = BigDecimal.fromString('0')
//     .plus(
//       getBalance(tokenContract, '0xb22eD4BEC314D475A8782E0b6869f0144D46859C'),
//     )
//     .plus(
//       getBalance(tokenContract, '0xf0D611B2610352600F7055e418E547e1c956c046'),
//     )
//     .plus(
//       getBalance(tokenContract, '0xbdb30Cf89eFdd8C7410d9b3d0De04bC41B962770'),
//     )
//     .plus(
//       getBalance(tokenContract, '0x89Fe954538a92Eca58AdaEc339cA6374AF079a13'),
//     )
//   token.circulatingSupply = token.totalSupply.minus(token.lockedBalance)

//   // query next rebase
//   token.lastRebase = rebase.id
//   token.nextRebaseTimestamp = REBASE_WINDOW_OFFSET.minus(
//     event.block.timestamp.mod(MIN_REBASE_TIME),
//   )
//     .plus(MIN_REBASE_TIME)
//     .mod(MIN_REBASE_TIME)
//     .plus(event.block.timestamp)

//   // save
//   token.save()
//   rebase.save()
// }

// const getBalance = (tokenContract: TokenABI, account: string): BigDecimal => {
//   return formatAmpl(tokenContract.balanceOf(Address.fromString(account)))
// }
