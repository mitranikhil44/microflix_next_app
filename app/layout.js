import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'Coder Bugs',
//   description: 'A blog for a coder by a coder',
// }

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="robots" content="noindex, follow, nocache" />
        <meta
          name="googlebot"
          content="index, nofollow, noimageindex, max-video-preview:-1, max-image-preview:large, max-snippet:-1"
        />
        <title>Microflix - 480p, 720p & 1080p Movies Download</title>
        <meta name="twitter:title" content="Microflix - 480p, 720p & 1080p Movies Download" />
        <meta property="og:title" content="Microflix - 480p, 720p & 1080p Movies Download" />
        <meta name="description"
          content="Microflix is a popular movie downloading website that offers a wide collection of Bollywood, Tollywood, and Hollywood movies available in Hindi." />
        <meta name="twitter:description"
          content="Microflix is a popular movie downloading website that offers a wide collection of Bollywood, Tollywood, and Hollywood movies available in Hindi." />
        <meta property="og:description"
          content="Microflix is a popular movie downloading website that offers a wide collection of Bollywood, Tollywood, and Hollywood movies available in Hindi." />
        <meta name="keywords"
          content="Microflix, movie download, free movies, Hollywood movies in Hindi, Bollywood movies, 2023 movies" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Microflix" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="google-adsense-account" content="ca-pub-4724045884570258"></meta>
        <meta name="google-site-verification" content="HzCShkhNsHqze7KztqMUe4veQUNUHyTrDV6_7_2iWwM" />
        <meta name="y_key" content="yahoo" />
        <meta name="yandex-verification" content="yandex" />
        {/* Standard Favicon */}
        <link rel="icon" href="/fav_icons/favicon.ico" sizes="any" />

        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/fav_icons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/fav_icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/fav_icons/favicon-16x16.png" />

        {/* <meta name="me" content="my-link" /> */}
        {/* <meta property="og:url" content="https://www.microflix.ml/" /> */}
        {/* <link rel="canonical" href="https://nextjs.org" />
        <link rel="alternate" hreflang="en-US" href="https://nextjs.org/en-US" />
      <link rel="alternate" hreflang="de-DE" href="https://nextjs.org/de-DE" /> */}
        <meta name="custom" content="meta" />
        <meta name="me" content="microflix6@gmail.com" />

        {/* --- Ads Script --- */}
        <script async="async" data-cfasync="false" src="//pl17971947.highcpmrevenuegate.com/8a8462267705e39989e95218ff6f6dae/invoke.js"></script>
      </head>
      <body className={inter.className}>
        <div >
          <Navbar />
          <div className="sm:gridClass">
            <div>
              <div className="mx-auto">
                <div className="p-[3%]">
                  {children}
                </div>
              </div>
            </div>
            <div className='add_container'>

            </div>
          </div>
          <div className="flex justify-center items-center flex-wrap">
            <div id="container-8a8462267705e39989e95218ff6f6dae"></div>
          </div>
          <hr />
          <Footer />
        </div>
      </body>
    </html>
  )
}
