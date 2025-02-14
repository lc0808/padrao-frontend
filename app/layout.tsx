import type { Metadata } from "next";
import { Montserrat, Saira } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Providers } from "./providers";
import { ProductProvider } from "../contexts/ProductContext";
import { CartProvider } from "../contexts/CartContext";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "ECommerce",
  description: "ECommerce website",
};

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

const saira = Saira({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-saira",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${saira.variable}  antialiased flex flex-col min-h-screen`}
      >
        <Providers>
          <CartProvider>
            <ProductProvider>
              <Toaster />
              <Header />
              <main className="flex-grow ">{children}</main>
              <Footer />
            </ProductProvider>
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}
