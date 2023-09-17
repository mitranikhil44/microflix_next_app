import { useState } from 'react';
import ContentList from '../../components/ContentList';

const Movies = ({ otherMovies, indianMovies }) => {
  const [selectedCategory, setSelectedCategory] = useState('otherMovies');
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <div className="flex justify-center my-4">
        <button
          onClick={() => handleCategoryChange('otherMovies')}
          className={`mr-4 ${selectedCategory === 'otherMovies' ? 'text-blue-500' : 'text-gray-400'} hover:text-blue-500`}
        >
          Other Movies
        </button>
        <button
          onClick={() => handleCategoryChange('indianMovies')}
          className={`ml-4 ${selectedCategory === 'indianMovies' ? 'text-blue-500' : 'text-gray-400'} hover:text-blue-500`}
        >
          Indian Movies
        </button>
      </div>

      {selectedCategory === 'otherMovies' && otherMovies && (
        <ContentList category="hollywood/movies" initialContents={otherMovies} />
      )}

      {selectedCategory === 'indianMovies' && indianMovies && (
        <ContentList category="bollywood/movies" initialContents={indianMovies} />
      )}
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const hData = await fetch(`https://microflix-next-app.vercel.app/api/blogs/?category=hollywood/movies&skip=0&limit=12`);
    const bData = await fetch(`https://microflix-next-app.vercel.app/api/blogs/?category=bollywood/movies&skip=0&limit=12`);
    let hMovies = await hData.json();
    let bMovies = await bData.json();
    hMovies = hMovies.data || [];
    bMovies = bMovies.data || [];

    return {
      props: {
        otherMovies: hMovies,
        indianMovies: bMovies
      },
    };
  } catch (error) {
    return {
      props: {
        otherMovies: [], // Provide a default empty array if there's an error
        indianMovies: [], // Provide a default empty array if there's an error
      },
    };
  }
}

export default Movies;
