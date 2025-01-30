import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.tsx'
import { ModalProvider } from './components/UILibrary/Modal/ModalContext.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


// Instatiate the React Query client
const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}> 
      <ModalProvider>
        <App />
      </ModalProvider>
    </QueryClientProvider>
  </StrictMode>,
)
