import { lazy, Suspense, useState } from 'react'
import { Dialog } from '@base-ui-components/react/dialog'
import { useHallidaySignOut, useInitHallidayWallet } from 'features/halliday/hooks'
import './App.css'

const HallidayLogin = lazy(() => import('features/halliday/components/login'))

function App() {
  const [account, setAccount] = useState<string | null>(null)
  const [_, setSigner] = useState<any | null>(null)
  const [wallet, setWallet] = useState<any | null>(null)
  const [open, setOpen] = useState(false)

  useInitHallidayWallet(setAccount, setSigner, setWallet)
  const logOutWithHalliday = useHallidaySignOut(setAccount, setSigner, setWallet)

  return (
    <div className="root">
      <h1>DFK Halliday Test</h1>
      <div>
        <h2>Account:</h2>
        <p>{account ? account : 'Not logged in'}</p>
        <h2>Wallet:</h2>
        <p>{wallet ? JSON.stringify(wallet) : 'Not connected'}</p>
      </div>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger disabled={!!account}>Login Modal</Dialog.Trigger>
        {/* Modals have a separate context provider & global state and are lazy loaded, so no code within them triggers until they are opened */}
        <Suspense fallback={<div>Loading...</div>}>
          {open && (
            <HallidayLogin setOpen={setOpen} setAccount={setAccount} setSigner={setSigner} setWallet={setWallet} />
          )}
        </Suspense>
      </Dialog.Root>

      <button onClick={() => logOutWithHalliday()} disabled={!account}>
        Log Out
      </button>
    </div>
  )
}

export default App
