import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'
import { Dialog } from '@base-ui-components/react/dialog'
import { ChainId } from 'constants/sdk-extra'
import { LoginOptions } from 'features/halliday/types'
import { getHallidayUserInfo, getHallidayWallet, loginWithHalliday } from 'features/halliday/utils'
import styles from './index.module.css'

type HallidayLoginProps = {
  setOpen: (open: boolean) => void
  setAccount: (account: string | null) => void
  setSigner: (signer: any) => void
  setWallet: (wallet: any) => void
}

export default function HallidayLogin({ setOpen, setAccount, setSigner, setWallet }: HallidayLoginProps) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  // const { hallidayChainId } = useSelector(s => s.halliday)
  const hallidayChainId = ChainId.DFK_MAINNET

  function isValidEmail(email: string) {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  }

  function handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value)
    setError('')
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      login(LoginOptions.Email)()
    }
  }

  function login(option: LoginOptions) {
    return function () {
      if (option === LoginOptions.Email && !isValidEmail(email)) {
        setError('Please enter a valid email address.')
      } else {
        loginWithHalliday(hallidayChainId, option, email)
      }
    }
  }

  useEffect(() => {
    async function getUserInfo() {
      const userInfo = await getHallidayUserInfo(hallidayChainId)
      if (userInfo) {
        console.log('got user info', { userInfo })
        if (userInfo) {
          const wallet = await getHallidayWallet(userInfo.signer.address, hallidayChainId)
          if (wallet) {
            setWallet(wallet)
            // changeAccount(wallet.account_address)
            console.log({ wallet })
          }
          setSigner(userInfo.signer)
          setAccount(userInfo.signer.address)
          setOpen(false)
        } else {
          setSigner(undefined)
        }
      } else {
        console.log('No user info found', { userInfo })
      }
    }

    getUserInfo()
  }, [])

  return (
    <Dialog.Portal>
      <Dialog.Backdrop className={styles.Backdrop} />
      <Dialog.Popup className={styles.Popup}>
        <Dialog.Title className={styles.Title}>DFK Smart Account</Dialog.Title>
        <p className={styles.description}>Create or log in to your smart account with just your email.</p>
        <div className={styles.email}>
          <input
            type="text"
            value={email}
            onChange={handleEmailChange}
            onKeyDown={handleKeyDown}
            placeholder="user@email.com"
          />
          <button className={styles.loginButton} onClick={login(LoginOptions.Email)} disabled={email.trim() === ''}>
            Log in
          </button>
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.divider}>
          <hr />
          <span>or</span>
          <hr />
        </div>
        <p className={styles.socialDescription}>Create or log in to your smart account via social login.</p>
        <div className={styles.socials}>
          <button onClick={login(LoginOptions.Google)}>Google</button>
          <button onClick={login(LoginOptions.Twitter)}>Twitter</button>
        </div>
      </Dialog.Popup>
    </Dialog.Portal>
  )
}
