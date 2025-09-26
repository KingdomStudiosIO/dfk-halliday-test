import { Fragment, useEffect, useState } from 'react'
import HallidayLogin from 'features/halliday/components/login'
import { ChainId, type Wallet } from 'features/halliday/types'
import { getHallidayClient, getHallidayConnection, logOutWithHalliday } from 'features/halliday/utils'
import type { Halliday } from 'halliday-sdk'
import './App.css'

const HALLIDAY_CHAIN_ID = ChainId.DFK_MAINNET

function App() {
  const [account, setAccount] = useState<string | null>(null)
  const [wallet, setWallet] = useState<Wallet | null>(null)
  const [open, setOpen] = useState(false)
  const [client, setClient] = useState<Halliday | null>(null)

  async function handleLogout() {
    await logOutWithHalliday(client)
    setWallet(null)
    setAccount(null)
  }

  useEffect(() => {
    console.log('Initializing Halliday connection via main page...')
    const client = getHallidayClient(HALLIDAY_CHAIN_ID)
    if (client) {
      console.log({client})
      setClient(client)
      console.log('✅ SUCCESS: Halliday connection initialized!')
    } else {
      console.log('❌ ERROR: Failed to initialize Halliday connection.')
    }
  }, [])

  useEffect(() => {
    async function getConnection() {
      if (!client) return

      const maxAttempts = 3
      const delay = 500

      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        console.log(`Fetching userInfo... (attempt ${attempt})`)
        const userInfo = await getHallidayConnection(client, setAccount, setWallet)

        if (userInfo) {
          console.log('✅ Successfully retrieved user info')
          return // Success - exit early
        }

        if (attempt < maxAttempts) {
          console.log(`No user info found, retrying in ${delay}ms...`)
          await new Promise(resolve => setTimeout(resolve, delay))
        } else {
          console.log('❌ Failed to get user info after all attempts')
        }
      }
    }

    getConnection()
  }, [client])

  return (
    <div className="root">
      <h1>DFK Halliday Test</h1>
      <div>
        <h2>Client Available?:</h2>
        <p>{client ? 'Yes' : 'No'}</p>
        <h2>Account:</h2>
        <p>{account ? account : 'Not logged in'}</p>
        <h2>Wallet:</h2>
        <p>
          {wallet
            ? Object.entries(wallet).map(([key, value]) => (
                <Fragment key={key}>
                  <span>
                    {key}: {value as string}
                  </span>
                  <br />
                </Fragment>
              ))
            : 'Not connected'}
        </p>
      </div>
      <div style={{ marginTop: '20px', display: 'flex', gap: '16px', justifyContent: 'center' }}>
        <HallidayLogin client={client} open={open} setOpen={setOpen} account={account} />
        <button onClick={handleLogout} disabled={!account}>
          Log Out
        </button>
      </div>
    </div>
  )
}

export default App
