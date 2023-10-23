import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Footer from '@/components/footer/Footer'
import ThemeRegistry from '@/components/themeRegistry/ThemeRegistry'
import Favicon from "../public/favicon .ico"

const inter = Inter({ subsets: ['latin'] })
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  icons: [{ rel:'icon', url: Favicon.src }],
  title: 'location, ventes bien immobilier',
  description: "chambre, appartement, studio, villa, boutique, magasin, chambre d'hotêl, terrain pour location et ventes sur mamaisonalouer.com ",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>

      <ThemeRegistry>
      {children}
       <Footer/> 
      </ThemeRegistry>
      </body>
     
    </html>
  )
}
