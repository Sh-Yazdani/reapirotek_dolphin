import ReactDOM from 'react-dom/client'

import {AppProviders} from '@/components'

import App from './app'

const render = () => {
  const rootEl = document.getElementById('root')

  if (rootEl) {
    const root = ReactDOM.createRoot(rootEl)
    root.render(
      <AppProviders>
        <App />
      </AppProviders>,
    )
  }
}

render()
