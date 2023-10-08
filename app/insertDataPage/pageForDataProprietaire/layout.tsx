import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/footer/Footer";
import ThemeRegistry from "@/components/themeRegistry/ThemeRegistry";
import Favicon from "../../../public/favicon .ico"
const inter = Inter({ subsets: ["latin"] });
export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
  icons: [{ rel:'icon', url: Favicon.src }],
  title: "insertion des donnée",
  description: "insérer des donnée associer à votre offre",
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
        <ThemeRegistry>
          {children}
          <Footer />
        </ThemeRegistry>
      </div>
    
  );
}