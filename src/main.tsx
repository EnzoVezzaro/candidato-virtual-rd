import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { PostHogProvider } from 'posthog-js/react'
const options = {
  api_host: 'https://us.i.posthog.com',
  debug: true
}

createRoot(document.getElementById("root")!).render(<PostHogProvider apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY} options={options}>
  <App />
</PostHogProvider>);
