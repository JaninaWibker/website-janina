import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import localFont from 'next/font/local'

import './index.css'

const font = localFont({
  src: '../public/fonts/PxPlus_IBM_VGA8.ttf',
  variable: '--font-pxplus'
})

export const metadata: Metadata = {
  title: "janina's site",
  icons: {
    icon: '/images/pp_smol.png'
  }
}

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang="en" suppressHydrationWarning>
    <head />
    <body className={`bg-base font-sans ${font.variable}`}>
      <ThemeProvider disableTransitionOnChange storageKey="janina.lol.theme">
        {children}
      </ThemeProvider>
    </body>
  </html>
)

export default RootLayout
