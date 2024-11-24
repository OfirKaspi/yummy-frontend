import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import Auth0ProviderWithNavigate from '@/auth/Auth0ProviderWithNavigate'
import { Toaster } from '@/components/ui/sonner'
import Loader from '@/components/Loader'
import store, { persistor } from '@/store/store'
import App from '@/App'
import './global.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Loader isFullScreen />} persistor={persistor}>
        <Router>
          <QueryClientProvider client={queryClient}>
            <Auth0ProviderWithNavigate>
              <App />
              <Toaster visibleToasts={1} position='top-right' richColors />
            </Auth0ProviderWithNavigate>
          </QueryClientProvider>
        </Router>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
