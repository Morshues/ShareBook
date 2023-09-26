import '@/app/globals.css'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <NextThemesProvider>
        <Component  {...pageProps} />
      </NextThemesProvider>
    </NextUIProvider>
  )
}

export default MyApp;