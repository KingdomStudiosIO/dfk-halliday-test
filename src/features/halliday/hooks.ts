import { useCallback, useEffect } from 'react'
import { ChainId } from 'constants/sdk-extra'
import { hallidayClientByChain } from './constants'
import { getHallidayWallet, logOutWithHalliday } from './utils'

export function useInitHallidayWallet(
  setAccount: (account: string | null) => void,
  setSigner: (signer: any | null) => void,
  setWallet: (wallet: any | null) => void
) {
  const chainId = ChainId.DFK_MAINNET

  useEffect(() => {
    async function getUserInfo() {
      try {
        const client = hallidayClientByChain[chainId]
        console.log('Initializing Web3Auth client...')
        // @ts-expect-error
        console.log(`Web3Auth Status: ${client.web3authClient.status}`)
        // await client.web3authClient.init()
        console.log('✅ SUCCESS: Client created and initialized!')
        // @ts-expect-error
        console.log(`Web3Auth Status: ${client.web3authClient.status}`)
        // @ts-expect-error
        console.log(client.web3authClient.connected)

        // Check if user is already logged in from previous session
        // @ts-expect-error
        if (client.web3authClient.connected) {
          // @ts-expect-error
          console.log(client.web3authClient)
          console.log('🔐 User already logged in from previous session')

          const userInfo = await client.getUserInfo()
          console.log({ userInfo })
          // @ts-expect-error
          console.log(`Web3Auth Status: ${client.web3authClient.status}`)

          if (userInfo) {
            const wallet = await getHallidayWallet(userInfo.signer.address, chainId)
            if (wallet) {
              setWallet(wallet)
              // changeAccount(wallet.account_address)
              console.log({ wallet })
            }

            console.log('getUserInfo res:', userInfo)
            setSigner(userInfo.signer)
            setAccount(userInfo.signer.address)
          } else {
            setSigner(undefined)
            console.log('No user info found')
          }
        }
      } catch (error) {
        console.log('Error fetching user info:', error)
      }
    }

    getUserInfo()
  }, [])
}

export function useHallidaySignOut(
  setAccount: (account: string | null) => void,
  setSigner: (signer: any | null) => void,
  setWallet: (wallet: any | null) => void
) {
  return useCallback(async () => {
    await logOutWithHalliday()
    setWallet(undefined)
    setSigner(undefined)
    setAccount(null)
  }, [])
}
