import { useState } from 'react';
import ContentList from '../../components/ContentList';

const Web_Series = ({ otherSeasons, indianSeasons }) => {
  const [selectedCategory, setSelectedCategory] = useState('otherSeasons');
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <div className="flex justify-center my-4">
        <button
          onClick={() => handleCategoryChange('otherSeasons')}
          className={`mr-4 ${selectedCategory === 'otherSeasons' ? 'text-blue-500' : 'text-gray-400'} hover:text-blue-500`}
        >
          Other Series
        </button>
        <button
          onClick={() => handleCategoryChange('indianSeasons')}
          className={`ml-4 ${selectedCategory === 'indianSeasons' ? 'text-blue-500' : 'text-gray-400'} hover:text-blue-500`}
        >
          Indian Series
        </button>
      </div>

      {selectedCategory === 'otherSeasons' && otherSeasons && (
        <ContentList category="hollywood/movies" initialContents={otherSeasons} />
      )}

      {selectedCategory === 'indianSeasons' && indianSeasons && (
        <ContentList category="bollywood/movies" initialContents={indianSeasons} />
      )}
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const hData = await fetch(`https://microflix-next-app.vercel.app/api/blogs/?category=hollywood/seasons&skip=0&limit=12`);
    const bData = await fetch(`https://microflix-next-app.vercel.app/api/blogs/?category=bollywood/seasons&skip=0&limit=12`);
    let hSeasons = await hData.json();
    let bSeasons = await bData.json();
    hSeasons = hSeasons.data || [];
    bSeasons = bSeasons.data || [];

    return {
      props: {
        otherSeasons: hSeasons,
        indianSeasons: bSeasons
      },
    };
  } catch (error) {
    return {
      props: {
        otherSeasons: [], // Provide a default empty array if there's an error
        indianSeasons: [], // Provide a default empty array if there's an error
      },
    };
  }
}

export default Web_Series;
