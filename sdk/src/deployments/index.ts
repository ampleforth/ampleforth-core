import { default as Goerli } from './Goerli.json'
import { default as Mainnet } from './Mainnet.json'
import { default as Avalanche } from './Avalanche.json'

export interface DeploymentData {
    Token: string
    Policy: string
    Orchestrator: string
    CPIOracle: string
    MarketOracle: string
}

export function getDeployment(chainID: number): DeploymentData {
    switch (chainID) {
        case 1:
            return Mainnet

        case 5:
            return Goerli

        default:
            throw new Error(
                `No deployment defined for given chainID:${chainID}`,
            )
    }
}

export interface XCDeploymentData {
    XCToken: string
    XCController: string
}

export function getXCDeployment(chainID: number): XCDeploymentData {
    switch (chainID) {
        case 43114:
            return Avalanche

        default:
            throw new Error(
                `No deployment defined for given chainID:${chainID}`,
            )
    }
}

export { Goerli, Mainnet, Avalanche }
