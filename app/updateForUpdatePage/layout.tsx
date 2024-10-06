import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/footer/Footer";
import ThemeRegistry from "@/components/themeRegistry/ThemeRegistry";
import Favicon from "../../public/favicon .ico"
import Script from 'next/script'
const inter = Inter({ subsets: ["latin"] });
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  icons: [{ rel:'icon', url: Favicon.src }],
  title: "mise à jour des donnée",
  description: "mise à jour des donnée associer à votre offre",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        < Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9175852038588591"
     crossOrigin="anonymous" strategy="afterInteractive" />
        <ThemeRegistry>
          {children}
          <Footer />
        </ThemeRegistry>
      </div>
    
  );
}
