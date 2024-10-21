import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import './global.css'

import AppRoutes from '@/AppRoutes'
import Auth0ProviderWithNavigate from '@/auth/Auth0ProviderWithNavigate'
import { Toaster } from '@/components/ui/sonner'
import { store } from '@/store/store'

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
      <Router>
        <QueryClientProvider client={queryClient}>
          <Auth0ProviderWithNavigate>
            <AppRoutes />
            <Toaster visibleToasts={1} position='top-right' richColors />
          </Auth0ProviderWithNavigate>
        </QueryClientProvider>
      </Router>
    </Provider>
  </StrictMode>,
)
