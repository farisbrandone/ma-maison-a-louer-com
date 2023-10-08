import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/footer/Footer";
import ThemeRegistry from "@/components/themeRegistry/ThemeRegistry";
import image from "../../../public/newgood.jpg"
import Favicon from "../../../public/favicon .ico"
const inter = Inter({ subsets: ["latin"] });
export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
  icons: [{ rel:'icon', url: Favicon.src }],
    title: "Validation",
    description: "Validation du mots de passe",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${image.src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: `cover`,
        backgroundPosition: "center",
      }}
    >
      <ThemeRegistry>
        {children}
        <Footer />
      </ThemeRegistry>
    </div>
  );
}
