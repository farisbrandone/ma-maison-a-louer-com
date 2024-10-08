import Header from '@/components/header/Header'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Footer from '@/components/footer/Footer'
import ThemeRegistry from '@/components/themeRegistry/ThemeRegistry'
import Favicon from "../../public/favicon .ico"
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  icons: [{ rel:'icon', url: Favicon.src }],
  title: 'location, ventes bien immobilier',
  description: "chambre, appartement, studio, villa, boutique, magasin, chambre d'hotêl, terrain pour location et ventes sur mamaisonalouer.com ",
}
export const metadata2: Metadata = {
   title: "google-adsense-account",
    description: "ca-pub-9175852038588591",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
   
     <>
      < Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9175852038588591"
     crossOrigin="anonymous" strategy="afterInteractive" />
      <ThemeRegistry>
      {children}
       <Footer/> 
      </ThemeRegistry>
     </>
     
  )
}
