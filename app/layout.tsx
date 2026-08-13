import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import localFont from 'next/font/local'
import { TooltipProvider } from '@/components/Tooltip'

import './index.css'

const font = localFont({
  src: '../public/fonts/PxPlus_IBM_VGA8-modified.ttf',
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
    <head>
      <link rel="me" href="https://chaos.social/@janina" />
    </head>
    <body className={`bg-base font-sans ${font.variable}`}>
      <TooltipProvider delay={150}>
        <ThemeProvider disableTransitionOnChange storageKey="janina.lol.theme" enableColorScheme={false}>
          {children}
        </ThemeProvider>
      </TooltipProvider>
    </body>
  </html>
)

export default RootLayout
