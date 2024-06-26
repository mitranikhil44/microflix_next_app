import "./globals.css";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import { WebStoreProvider } from "@/context";

const Navbar = dynamic(() => import("@/components/Navbar"), {
  ssr: false,
});
const Footer = dynamic(() => import("@/components/Footer"), {
  ssr: false,
});

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="robots" content="follow, index, follow, imageindex" />
        <meta name="googlebot" content="index, follow, imageindex" />
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Cache-Control" content="no-store" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />

        {/* ... (Social media tags) ... */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Microflix" />
        <meta
          property="og:image"
          content="https://microflix.vercel.app/fav_icons/android-chrome-512x512.png"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="google-adsense-account"
          content="ca-pub-4724045884570258"
        ></meta>
        <meta
          name="google-site-verification"
          content="HzCShkhNsHqze7KztqMUe4veQUNUHyTrDV6_7_2iWwM"
        />
        <meta name="y_key" content="yahoo" />
        <meta name="yandex-verification" content="yandex" />

        {/* Favicon */}
        <link rel="icon" href="/fav_icons/favicon.ico" sizes="any" />

        {/* Apple Touch Icons */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/fav_icons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/fav_icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/fav_icons/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/fav_icons/android-chrome-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/fav_icons/android-chrome-512x512.png"
        />

        {/* Adsterra Ads Script */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-Q52T10QC04"
        ></Script>

        {/* Monetag Ads Script */}
        <meta name="monetag" content="a20e628094014ce867ca075c43b2bcaf"></meta>
      </head>
      <body
        className={`font-sans antialiased bg-gray-900 text-white ${inter.className}`}
      >
        <WebStoreProvider>
          <div>
            <Navbar />
            <div className="sm:gridClass mx-auto p-[3%] xl:w-[1560px] m-auto sm:w-[75%] w-full">
              {children}
              <Analytics />
              <SpeedInsights />
            </div>
            <hr />
            <Footer />
          </div>
        </WebStoreProvider>
      </body>
    </html>
  );
}
