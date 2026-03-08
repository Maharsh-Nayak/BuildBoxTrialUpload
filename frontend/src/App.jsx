import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [backendRandomValue, setBackendRandomValue] = useState('loading...')
  const [apiError, setApiError] = useState('')

  const frontendRandomValue = import.meta.env.VITE_RANDOM_VALUE || 'not-set'
  const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'

  useEffect(() => {
    const loadBackendRandomValue = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/random`)
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`)
        }

        const data = await response.json()
        setBackendRandomValue(data.randomValue || 'not-set')
      } catch (error) {
        setApiError(error.message)
        setBackendRandomValue('unavailable')
      }
    }

    loadBackendRandomValue()
  }, [apiBaseUrl])

  return (
    <>
      <h1>Env Random Values</h1>
      <div className="card">
        <p>Frontend value from <code>frontend/.env</code>:</p>
        <h2>{frontendRandomValue}</h2>
      </div>
      <div className="card">
        <p>Backend value from <code>/api/random</code>:</p>
        <h2>{backendRandomValue}</h2>
        {apiError && <p className="read-the-docs">API error: {apiError}</p>}
      </div>
    </>
  )
}

export default App
