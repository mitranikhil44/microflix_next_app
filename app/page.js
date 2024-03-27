import FetchSSRData from '@/components/other/FetchSSRData';
import dynamic from 'next/dynamic';
import Script from "next/script";

const MoviesCollection = dynamic(() => import("@/components/Movie_Collection"), {
  ssr: true,
});
const LatestContents = dynamic(() => import("@/components/LatestContents"), {
  ssr: true,
});

export default async function Home() {
  const page = 1;
  const { contents: contentsData } = await FetchSSRData(page, "contents");
  const { contents: latestContentsData } = await FetchSSRData(page, "latest_contents");
  const { contents: moviesContentData } = await FetchSSRData(page, "content_movies");
  const { contents: webSeriesContentData } = await FetchSSRData(page, "content_seasons");
  const { contents: adultContentsData } = await FetchSSRData(page, "content_adult");
  
  return (
    <>
      <header>
        <LatestContents data={latestContentsData[0]?.data} />
      </header>
      <section>
        <MoviesCollection
          data={contentsData[0]?.data}
          collectionName="Contents"
        />
        <MoviesCollection
          data={moviesContentData[0]?.data}
          collectionName="Movies Contents"
        />
        <MoviesCollection
          data={webSeriesContentData[0]?.data}
          collectionName="Web Series Content"
        />
        <MoviesCollection
          data={adultContentsData[0]?.data}
          collectionName="Adult Content"
        />
      </section>
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
