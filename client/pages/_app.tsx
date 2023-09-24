import { wrapper } from '@/components/Store/store'
import '@/styles/globals.css'
import { Toaster } from 'react-hot-toast'
import type { AppProps } from 'next/app'

function App({ Component, pageProps }: AppProps) {
  return <>
    <Component {...pageProps} />
    <Toaster />
  </>
}

export default wrapper.withRedux(App)