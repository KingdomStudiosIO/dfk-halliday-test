import type { Halliday } from 'halliday-sdk'
import { hallidayClientByChain } from './constants'
import { ChainId, LoginOptions, type Wallet } from './types'

export async function loginWithHalliday(client: Halliday | null, option: LoginOptions, email?: string) {
  console.log('Attempting login...')
  try {
    switch (option) {
      case LoginOptions.Google:
        await client?.logInWithGoogle()
        break
      case LoginOptions.Facebook:
        await client?.logInWithFacebook()
        break
      case LoginOptions.Twitter:
        await client?.logInWithTwitter()
        break
      case LoginOptions.Email:
        if (email) {
          await client?.logInWithEmailOTP(email)
        }
        break
      default:
        break
    }
  } catch (error) {
    console.log(error, { option, email })
  }
}

export async function logOutWithHalliday(client: Halliday | null) {
  if (!client) return
  console.log('Logging out user...')
  try {
    await client.logOut()
  } catch (error) {
    console.log(error)
  }
}

export function getHallidayClient(chainId: ChainId): Halliday | null {
  try {
    console.log('Initializing Web3Auth client...')
    const client = hallidayClientByChain[chainId]
    console.log('✅ SUCCESS: Client created and initialized!')
    return client
  } catch (error) {
    console.log('Error initializing client:', error)
    return null
  }
}

export async function getHallidayConnection(
  client: Halliday | null,
  setAccount: (account: string | null) => void,
  setWallet: (wallet: Wallet | null) => void
) {
  if (!client) return null
  try {
    const userInfo = await client.getUserInfo()
    console.log({ userInfo })

    if (userInfo) {
      console.log('🔐 User logged in')
      const wallet = await client.getOrCreateHallidayAAWallet(userInfo.signer.address)
      if (wallet) {
        setWallet(wallet)
        console.log({ wallet })
      }
      setAccount(userInfo.signer.address)
    } else {
      console.log('No user info found')
    }
    return userInfo
  } catch (error) {
    console.log('Error fetching user info:', error)
    return null
  }
}
