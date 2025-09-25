import { GetUserInfoResponse, GetWalletResponse } from 'halliday-sdk'

export enum ChainId {
  DFK_MAINNET = 53935,
  DFK_TESTNET = 335,
  KAIA_MAINNET = 8217,
  KAIA_TESTNET = 1001,
  METIS_MAINNET = 1088,
  METIS_TESTNET = 59902,
}

export type Signer = GetUserInfoResponse['signer']
export type Wallet = GetWalletResponse

export enum LoginOptions {
  Google,
  Facebook,
  Twitter,
  Email,
}
