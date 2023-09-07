import Link from 'next/link';
import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const Movies = (props) => {
  const [movie, setMovie] = useState(props.movies.data || []);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(24);
  const [hasMore, setHasMore] = useState(true);



  const fetchMoreData = async () => {
    try {
      const updatedSkip = skip + limit;
      const data = await fetch(`http://localhost:3000/api/blogs/?category=hollywood/adult&skip=${updatedSkip}&limit=${limit}`);
      const parsedData = await data.json();

      if (Array.isArray(parsedData.data)) {
        setSkip(updatedSkip);
        setMovie([...movie, ...parsedData.data]);
        if (movie.length + limit >= parsedData.data) {
          setHasMore(false);
        }
      } else {
        console.error("Fetched data does not contain an array of movies:", parsedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
      <div>
        <InfiniteScroll
          dataLength={movie.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4 className='text-center my-[2%]'>Loading...</h4>}
        >
          <div className="grid grid-cols-2 mt-4 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 overflow-hidden">
            {movie && movie.map((element) => (
              <Link key={element.slug} href={`/blogpost/${element.slug}`}>
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
    const data = await fetch(`http://localhost:3000/api/blogs/?category=hollywood/adult&skip=0&limit=12`);
    const movies = await data.json();
    return {
      props: { movies },
    };
  } catch (error) {
    return {
      props: {
        movies: { files: [], count: 0, total: 0 },
      },
    };
  }
}

export default Movies;

