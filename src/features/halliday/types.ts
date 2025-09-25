import { ChainId } from 'constants/sdk-extra'
import { GetUserInfoResponse, GetWalletResponse } from 'halliday-sdk'

export type SupportedHallidayChains =
  | ChainId.DFK_MAINNET
  | ChainId.DFK_TESTNET
  | ChainId.KAIA_MAINNET
  | ChainId.KAIA_TESTNET
  | ChainId.METIS_MAINNET
  | ChainId.METIS_TESTNET

export type Signer = GetUserInfoResponse['signer']
export type Wallet = GetWalletResponse

export enum LoginOptions {
  Google,
  Facebook,
  Twitter,
  Email,
}

export enum HallidayErrorCodes {
  USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS',
  INSUFFICIENT_FUNDS = 'INSUFFICIENT_FUNDS',
}
