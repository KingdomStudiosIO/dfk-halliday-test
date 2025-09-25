import { ChangeEvent, KeyboardEvent, useState } from 'react'
import { Dialog } from '@base-ui-components/react/dialog'
import { LoginOptions } from 'features/halliday/types'
import { loginWithHalliday } from 'features/halliday/utils'
import type { Halliday } from 'halliday-sdk/dist/types/wallet'
import styles from './index.module.css'

type HallidayLoginProps = {
  client: Halliday | null
  open: boolean
  setOpen: (open: boolean) => void
  account: string | null
}

export default function HallidayLogin({ client, open, setOpen, account }: HallidayLoginProps) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

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
        loginWithHalliday(client, option, email)
      }
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger disabled={!!account}>Login Modal</Dialog.Trigger>
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
    </Dialog.Root>
  )
}
