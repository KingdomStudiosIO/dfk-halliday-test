import { Fragment, useEffect, useState } from 'react'
import HallidayLogin from 'features/halliday/components/login'
import { ChainId, type Wallet } from 'features/halliday/types'
import { getHallidayConnection, logOutWithHalliday } from 'features/halliday/utils'
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
    async function getHalliday() {
      console.log('Initializing Halliday connection via main page...')
      const client = await getHallidayConnection(HALLIDAY_CHAIN_ID, setAccount, setWallet)
      if (client) {
        setClient(client)
        console.log('✅ SUCCESS: Halliday connection initialized!')
      } else {
        console.log('❌ ERROR: Failed to initialize Halliday connection.')
      }
    }
    getHalliday()
  }, [])

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
