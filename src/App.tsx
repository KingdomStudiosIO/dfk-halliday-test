import { Fragment, useEffect, useState } from 'react'
import HallidayLogin from 'features/halliday/components/login'
import { ChainId, type Wallet } from 'features/halliday/types'
import { getHallidayConnection, logOutWithHalliday } from 'features/halliday/utils'
import './App.css'

const HALLIDAY_CHAIN_ID = ChainId.DFK_MAINNET

function App() {
  const [account, setAccount] = useState<string | null>(null)
  const [wallet, setWallet] = useState<Wallet | null>(null)
  const [open, setOpen] = useState(false)

  async function handleLogout() {
    await logOutWithHalliday(HALLIDAY_CHAIN_ID)
    setWallet(null)
    setAccount(null)
  }

  useEffect(() => {
    console.log('Initializing Halliday connection via main page...')
    getHallidayConnection(HALLIDAY_CHAIN_ID, setAccount, setWallet)
  }, [])

  return (
    <div className="root">
      <h1>DFK Halliday Test</h1>
      <div>
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
        <HallidayLogin chainId={HALLIDAY_CHAIN_ID} open={open} setOpen={setOpen} account={account} />
        <button onClick={handleLogout} disabled={!account}>
          Log Out
        </button>
      </div>
    </div>
  )
}

export default App
