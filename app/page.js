
import ContentListData from "@/components/ContentListData";
import CategoryData from "@/components/other/CategoryData";

import Script from "next/script";

export default function Home() {
  return (
    <>
      <div>
        <meta
          name="keywords"
          content="Microflix, microflix, movie download, free movies, Hollywood movies in Hindi, Bollywood movies, 2023 movies"
        />
        <title>
          Microflix - Watch and Download Movies in 480p, 720p & 1080p
        </title>
        <meta
          property="og:title"
          content="Microflix - Watch and Download Movies in 480p, 720p & 1080p"
        />
        <meta
          name="twitter:title"
          content="Microflix - Watch and Download Movies in 480p, 720p & 1080p"
        />
        <link rel="canonical" href="https://microflix.vercel.app/" />
        <meta
          name="description"
          content="Microflix - Download in 480p, 720p, 1080p. Enjoy high-quality Movies and Seb Series in Dubbed Audio."
        />
        <meta
          property="og:description"
          content="Microflix -  Download in 480p, 720p, 1080p. Enjoy high-quality Movies and Seb Series in Dubbed Audio."
        />
        <meta
          name="twitter:description"
          content="Microflix - Download in 480p, 720p, 1080p. Enjoy high-quality Movies and Seb Series in Dubbed Audio."
        />
        <meta property="og:url" content="https://microflix.vercel.app/" />
      </div>
      <CategoryData />
      <ContentListData/>
      {/* Google tag (gtag.js) */}
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-80H6K0RCMY"
        strategy="afterInteractive"
      />
      <Script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-80H6K0RCMY');
        `}
      </Script>
    </>
  );
}
