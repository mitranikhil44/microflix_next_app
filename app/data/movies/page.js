
import React from 'react';
import ContentList from '../../../components/ContentList';
import PaginationButton from '../../../components/other/PaginationButton';

const MoviesContent = async () => {
  const response = await getMoviesContentData();
  const data = response.moviesContent;
  const totalPages = data[0].totalPages;

  return (
    <div>
      <ContentList contents={data} />
      <PaginationButton totalPages={totalPages} page={1} category={"movies"} />
    </div>
  );
};

export async function getMoviesContentData() {
  const apiKey = process.env.API_KEY;
  try {
    const response = await fetch(`${apiKey}/api/blogs/?category=content_movies&page=1`, {cache: 'no-cache'});
    const moviesContent = await response.json();
    return {
      moviesContent,
    };
  } catch (error) {
    return {
      moviesContent: [],
    };
  }
}

export default MoviesContent;
