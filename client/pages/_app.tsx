import { wrapper } from '@/components/Store/store'
import '@/styles/globals.css'
import { Toaster } from 'react-hot-toast'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Spinner from '@/components/Layout/Spinner'

function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };

    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);
    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", end);
      router.events.off("routeChangeError", end);
    };
  }, []);
  return <>
    {/* <Spinner /> */}
    {loading ? (
      <Spinner />
    ) : (
      <>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
        <Toaster />
      </>
    )}

  </>
}

export default wrapper.withRedux(App)