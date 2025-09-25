import { ChainId } from 'constants/sdk-extra'
import { hallidayClientByChain } from './constants'
import { LoginOptions, SupportedHallidayChains } from './types'

export async function loginWithHalliday(chainId: SupportedHallidayChains, option: LoginOptions, email?: string) {
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

export async function logOutWithHalliday() {
  try {
    // const { hallidayChainId } = getState().halliday
    const hallidayChainId = ChainId.DFK_MAINNET
    await hallidayClientByChain[hallidayChainId].logOut()
  } catch (error) {
    console.log(error)
  }
}

export async function getHallidayUserInfo(chainId: SupportedHallidayChains) {
  try {
    return await hallidayClientByChain[chainId].getUserInfo()
  } catch (error) {
    console.log(error)
    return
  }
}

export async function getHallidayWallet(id: string, chainId: SupportedHallidayChains) {
  try {
    return await hallidayClientByChain[chainId].getOrCreateHallidayAAWallet(id)
  } catch (error) {
    console.log(error)
    // if (store && (error as any).response.data.code === HallidayErrorCodes.USER_ALREADY_EXISTS) {
    //   store.dispatch(setModal({ type: ModalTypes.HallidayUserExists, show: true }))
    // }
    return
  }
}
