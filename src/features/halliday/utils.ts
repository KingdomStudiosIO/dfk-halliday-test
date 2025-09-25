import { hallidayClientByChain } from './constants'
import { ChainId, LoginOptions, type Wallet } from './types'

export async function loginWithHalliday(chainId: ChainId, option: LoginOptions, email?: string) {
  console.log('Attempting login...')
  try {
    switch (option) {
      case LoginOptions.Google:
        await hallidayClientByChain[chainId].logInWithGoogle()
        break
      case LoginOptions.Facebook:
        await hallidayClientByChain[chainId].logInWithFacebook()
        break
      case LoginOptions.Twitter:
        await hallidayClientByChain[chainId].logInWithTwitter()
        break
      case LoginOptions.Email:
        if (email) {
          await hallidayClientByChain[chainId].logInWithEmailOTP(email)
        }
        break
      default:
        break
    }
  } catch (error) {
    console.log(error, { option, email })
  }
}

export async function logOutWithHalliday(chainId: ChainId) {
  console.log('Logging out user...')
  try {
    await hallidayClientByChain[chainId].logOut()
  } catch (error) {
    console.log(error)
  }
}

export async function getHallidayConnection(
  chainId: ChainId,
  setAccount: (account: string | null) => void,
  setWallet: (wallet: Wallet | null) => void
) {
  try {
    console.log('Initializing Web3Auth client...')
    const client = hallidayClientByChain[chainId]
    console.log('✅ SUCCESS: Client created and initialized!')

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
  } catch (error) {
    console.log('Error fetching user info:', error)
  }
}
