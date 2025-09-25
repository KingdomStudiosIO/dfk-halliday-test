import { ChainId } from 'constants/sdk-extra'
import { Halliday, BlockchainType } from 'halliday-sdk'
import { SupportedHallidayChains } from './types'

export const hallidayPublicApiKey = {
  [ChainId.DFK_MAINNET]: import.meta.env.VITE_HALLIDAY_PUBLIC_API_KEY_MAINNET,
  [ChainId.DFK_TESTNET]: import.meta.env.VITE_HALLIDAY_PUBLIC_API_KEY_TESTNET,
  [ChainId.KAIA_MAINNET]: import.meta.env.VITE_HALLIDAY_PUBLIC_API_KEY_MAINNET,
  [ChainId.KAIA_TESTNET]: import.meta.env.VITE_HALLIDAY_PUBLIC_API_KEY_TESTNET,
  [ChainId.METIS_MAINNET]: import.meta.env.VITE_HALLIDAY_PUBLIC_API_KEY_MAINNET,
  [ChainId.METIS_TESTNET]: import.meta.env.VITE_HALLIDAY_PUBLIC_API_KEY_TESTNET,
}

export const hallidayVerificationId = {
  [ChainId.DFK_MAINNET]: import.meta.env.VITE_HALLIDAY_VERIFICATION_ID,
  [ChainId.DFK_TESTNET]: import.meta.env.VITE_HALLIDAY_VERIFICATION_ID,
  [ChainId.KAIA_MAINNET]: import.meta.env.VITE_HALLIDAY_VERIFICATION_ID,
  [ChainId.KAIA_TESTNET]: import.meta.env.VITE_HALLIDAY_VERIFICATION_ID,
  [ChainId.METIS_MAINNET]: import.meta.env.VITE_HALLIDAY_VERIFICATION_ID,
  [ChainId.METIS_TESTNET]: import.meta.env.VITE_HALLIDAY_VERIFICATION_ID,
}

export const hallidayDestinationChain = {
  [ChainId.DFK_MAINNET]: BlockchainType.DFK,
  [ChainId.DFK_TESTNET]: BlockchainType.DFK_TESTNET,
  [ChainId.KAIA_MAINNET]: BlockchainType.KLAYTN_CYPRESS,
  [ChainId.KAIA_TESTNET]: BlockchainType.KLAYTN_BAOBAB,
  [ChainId.METIS_MAINNET]: 'METIS',
  [ChainId.METIS_TESTNET]: 'METIS_SEPOLIA',
}

export const hallidayClientByChain: {
  [key in SupportedHallidayChains]: Halliday
} = {
  [ChainId.DFK_MAINNET]: new Halliday({
    hallidayPublicApiKey: hallidayPublicApiKey[ChainId.DFK_MAINNET],
    blockchainType: BlockchainType.DFK,
    verifierClientId: hallidayVerificationId[ChainId.DFK_MAINNET],
  }),
  [ChainId.DFK_TESTNET]: new Halliday({
    hallidayPublicApiKey: hallidayPublicApiKey[ChainId.DFK_TESTNET],
    blockchainType: BlockchainType.DFK_TESTNET,
    verifierClientId: hallidayVerificationId[ChainId.DFK_TESTNET],
  }),
  [ChainId.KAIA_MAINNET]: new Halliday({
    hallidayPublicApiKey: hallidayPublicApiKey[ChainId.KAIA_MAINNET],
    blockchainType: BlockchainType.KLAYTN_CYPRESS,
    verifierClientId: hallidayVerificationId[ChainId.KAIA_MAINNET],
  }),
  [ChainId.KAIA_TESTNET]: new Halliday({
    hallidayPublicApiKey: hallidayPublicApiKey[ChainId.KAIA_TESTNET],
    blockchainType: BlockchainType.KLAYTN_BAOBAB,
    verifierClientId: hallidayVerificationId[ChainId.KAIA_TESTNET],
  }),
  [ChainId.METIS_MAINNET]: new Halliday({
    hallidayPublicApiKey: hallidayPublicApiKey[ChainId.METIS_MAINNET],
    blockchainType: 'METIS',
    verifierClientId: hallidayVerificationId[ChainId.METIS_MAINNET],
  }),
  [ChainId.METIS_TESTNET]: new Halliday({
    hallidayPublicApiKey: hallidayPublicApiKey[ChainId.METIS_TESTNET],
    blockchainType: 'METIS_SEPOLIA',
    verifierClientId: hallidayVerificationId[ChainId.METIS_TESTNET],
  }),
}
