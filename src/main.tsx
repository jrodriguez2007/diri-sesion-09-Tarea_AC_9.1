import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import { LanguageProvider } from './ui/helpers/LanguageProvider.tsx'
import { Root } from './Root.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <Root />
    </LanguageProvider>
  </StrictMode>,
)