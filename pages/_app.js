import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import "../styles/globals.css";

export const metadata = {
  title: 'Coder Bugs',
  description: 'A blog for a coder by a coder',
  scriptTag:
    '<script async="async" data-cfasync="false" src="//revelationschemes.com/8a8462267705e39989e95218ff6f6dae/invoke.js"></script>',
};

function MyApp({ Component, pageProps }) {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const adsData = await fetch('https://microflix-next-app.vercel.app/api/getads/');
        const parsedAdsData = await adsData.json();

        if (Array.isArray(parsedAdsData)) {
          setAds(parsedAdsData);
        } else {
          console.error('Fetched ads data is not an array:', parsedAdsData);
        }
      } catch (error) {
        console.error('Error fetching ads data:', error);
      }
    };

    fetchAds();
  }, []);

  return (
    <div className="m-auto">
      <Navbar />
        <div className="sm:gridClass">
          <div>
            <div className="mx-auto">
              {ads.map((ad, index) => (
                <div key={index + 1}>
                  <div className="sm:hidden">
                    {ad.horizontal_banner && ad.horizontal_banner.adult.mobile && (
                      <div dangerouslySetInnerHTML={{ __html: ad.horizontal_banner.adult.mobile }} />
                    )}
                  </div>
                  <div className="hidden sm:block lg:hidden">
                    {ad.horizontal_banner && ad.horizontal_banner.adult.tablet && (
                      <div dangerouslySetInnerHTML={{ __html: ad.horizontal_banner.adult.tablet }} />
                    )}
                  </div>
                  <div className="hidden lg:block">
                    {ad.horizontal_banner && ad.horizontal_banner.adult.window && (
                      <div dangerouslySetInnerHTML={{ __html: ad.horizontal_banner.adult.window }} />
                    )}
                  </div>
                </div>
              ))}
              <hr />
              <div className="p-[3%] ">
                <Component {...pageProps} />
              </div>
            </div>
          </div>
          <div>
            {ads.map((ad, index) => (
              <div key={index + 1}>
                <div className="hidden sm:block lg:hidden">
                  {ad.vertical_banner && ad.vertical_banner.adult.tablet && (
                    <div dangerouslySetInnerHTML={{ __html: ad.vertical_banner.adult.tablet }} />
                  )}
                </div>
                <div className="hidden lg:block">
                  {ad.vertical_banner && ad.vertical_banner.adult.window && (
                    <div dangerouslySetInnerHTML={{ __html: ad.vertical_banner.adult.window }} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      <div className="flex justify-center items-center flex-wrap">
        <div id="container-8a8462267705e39989e95218ff6f6dae"></div>
      </div>
      <hr />
      <Footer />
    </div>
  );
}

export default MyApp;
