import './globals.css'
import dynamic from 'next/dynamic';
import { Inter } from 'next/font/google';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
const Navbar = dynamic(() => import("@/components/Navbar"), {
  ssr: false,
});
const Footer = dynamic(() => import("@/components/Footer"), {
  ssr: false,
});

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <>
      <html lang='en'>
        <head>
          <meta name="robots" content="noindex, follow, nocache" />
          <meta name="googlebot" content="index, nofollow, noimageindex, max-video-preview:-1, max-image-preview:large, max-snippet:-1" />
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Microflix - Watch and Download Movies in 480p, 720p & 1080p</title>
          <meta name="description" content="Microflix - Your destination for Bollywood, Tollywood, and Hollywood movies. Download in 480p, 720p, 1080p. Enjoy high-quality movies in Hindi." />
          <link rel='canonical' href='https://microflix.vercel.app/' />


          {/* ... (Social media tags) ... */}
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Microflix" />
          <meta property="og:title" content="Microflix - Watch and Download Movies in 480p, 720p & 1080p" />
          <meta property="og:description"
            content="Microflix - Your destination for Bollywood, Tollywood, and Hollywood movies. Download in 480p, 720p, 1080p. Enjoy high-quality movies in Hindi." />
          <meta property="og:image" content="https://microflix.vercel.app/fav_icons/android-chrome-512x512.png" />
          <meta property="og:url" content="https://microflix.vercel.app/" />
          <meta name="twitter:title" content="Microflix - Watch and Download Movies in 480p, 720p & 1080p" />
          <meta name="twitter:description"
            content="Microflix - Your destination for Bollywood, Tollywood, and Hollywood movies. Download in 480p, 720p, 1080p. Enjoy high-quality movies in Hindi." />
          <meta name="keywords"
            content="Microflix, movie download, free movies, Hollywood movies in Hindi, Bollywood movies, 2023 movies" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="google-adsense-account" content="ca-pub-4724045884570258"></meta>
          <meta name="google-site-verification" content="HzCShkhNsHqze7KztqMUe4veQUNUHyTrDV6_7_2iWwM" />
          <meta name="y_key" content="yahoo" />
          <meta name="yandex-verification" content="yandex" />

          {/* Favicon */}
          <link rel="icon" href="/fav_icons/favicon.ico" sizes="any" />

          {/* Apple Touch Icons */}
          <link rel="apple-touch-icon" sizes="180x180" href="/fav_icons/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/fav_icons/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/fav_icons/favicon-16x16.png" />
          <link rel="icon" type="image/png" sizes="192x192" href="/fav_icons/android-chrome-192x192.png" />
          <link rel="icon" type="image/png" sizes="512x512" href="/fav_icons/android-chrome-512x512.png" />

          {/* Ads Script */}
          <script async src="//pl17971947.highcpmrevenuegate.com/8a8462267705e39989e95218ff6f6dae/invoke.js"></script>
        </head>
        <body className={inter.className}>
          <div>
            <Navbar />
            <div className="sm:gridClass mx-auto p-[3%] container sm:w-full">
              {children}
              <Analytics />
              <SpeedInsights />
            </div>
            <div className="flex justify-center items-center flex-wrap">
              <div id="container-8a8462267705e39989e95218ff6f6dae"></div>
            </div>
            <hr />
            <Footer />
          </div>
        </body>
      </html>
    </>
  );
}


