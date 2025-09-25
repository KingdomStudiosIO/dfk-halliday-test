import { Halliday, BlockchainType } from 'halliday-sdk'
import { ChainId } from './types'

export const hallidayPublicApiKeyMainnet = import.meta.env.VITE_HALLIDAY_PUBLIC_API_KEY_MAINNET
export const hallidayPublicApiKeyTestnet = import.meta.env.VITE_HALLIDAY_PUBLIC_API_KEY_TESTNET
export const hallidayVerificationId = import.meta.env.VITE_HALLIDAY_VERIFICATION_ID

export const hallidayClientByChain: {
  [key in ChainId]: Halliday
} = {
  [ChainId.DFK_MAINNET]: new Halliday({
    hallidayPublicApiKey: hallidayPublicApiKeyMainnet,
    blockchainType: BlockchainType.DFK,
    verifierClientId: hallidayVerificationId,
  }),
  [ChainId.DFK_TESTNET]: new Halliday({
    hallidayPublicApiKey: hallidayPublicApiKeyTestnet,
    blockchainType: BlockchainType.DFK_TESTNET,
    verifierClientId: hallidayVerificationId,
  }),
  [ChainId.KAIA_MAINNET]: new Halliday({
    hallidayPublicApiKey: hallidayPublicApiKeyMainnet,
    blockchainType: BlockchainType.KLAYTN_CYPRESS,
    verifierClientId: hallidayVerificationId,
  }),
  [ChainId.KAIA_TESTNET]: new Halliday({
    hallidayPublicApiKey: hallidayPublicApiKeyTestnet,
    blockchainType: BlockchainType.KLAYTN_BAOBAB,
    verifierClientId: hallidayVerificationId,
  }),
  [ChainId.METIS_MAINNET]: new Halliday({
    hallidayPublicApiKey: hallidayPublicApiKeyMainnet,
    blockchainType: 'METIS',
    verifierClientId: hallidayVerificationId,
  }),
  [ChainId.METIS_TESTNET]: new Halliday({
    hallidayPublicApiKey: hallidayPublicApiKeyTestnet,
    blockchainType: 'METIS_SEPOLIA',
    verifierClientId: hallidayVerificationId,
  }),
}
