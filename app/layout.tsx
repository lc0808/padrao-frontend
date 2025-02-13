import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Providers } from "./providers";
import { ProductProvider } from "../contexts/ProductContext";

export const metadata: Metadata = {
  title: "ECommerce",
  description: "ECommerce website",
};

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} antialiased flex flex-col min-h-screen`}
      >
        <Providers>
          <ProductProvider>
            <Header />
            <main className="flex-grow ">{children}</main>
            <Footer />
          </ProductProvider>
        </Providers>
      </body>
    </html>
  );
}
