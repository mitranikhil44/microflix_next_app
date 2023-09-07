import Link from 'next/link';
import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const Series = (props) => {
  const [series, setSeries] = useState(props.series.data || []);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(24);
  const [hasMore, setHasMore] = useState(true);



  const fetchMoreData = async () => {
    try {
      const updatedSkip = skip + limit;
      const data = await fetch(`https://microflix-next-app.vercel.app/api/blogs/?category=hollywood/seasons&skip=${updatedSkip}&limit=${limit}`);
      const parsedData = await data.json();

      if (Array.isArray(parsedData.data)) {
        setSkip(updatedSkip);
        setSeries([...series, ...parsedData.data]);
        if (series.length + limit >= parsedData.data) {
          setHasMore(false);
        }
      } else {
        console.error("Fetched data does not contain an array of series:", parsedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
      <div>
        <InfiniteScroll
          dataLength={series.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4 className='text-center my-[2%]'>Loading...</h4>}
        >
          <div className="grid grid-cols-2 mt-4 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 overflow-hidden">
            {series && series.map((element, index) => (
              <Link key={index + 1} href={`/blogpost/${element.slug}`}>
                <div className="to-black relative overflow-hidden rounded-lg shadow-lg hover:scale-105 cursor-pointer transition-transform duration-300 ease-in-out h-[100%]">
                  <div className="w-full overflow-hidden flex items-center justify-center cropped-image">
                    <img
                      src={element.image}
                      alt="Image"
                      className="object-cover w-full"
                    />
                  </div>
                  <div className="text-center mt-2">
                    <h4 className="text-sm font-semibold mb-2">{element.title}</h4>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </InfiniteScroll>
      </div>
  );
};

export async function getServerSideProps() {
  try {
    const data = await fetch(`https://microflix-next-app.vercel.app/api/blogs/?category=hollywood/seasons&skip=0&limit=24`);
    const series = await data.json();
    return {
      props: { series },
    };
  } catch (error) {
    return {
      props: {
        series: { files: [], count: 0, total: 0 },
      },
    };
  }
}

export default Series;

