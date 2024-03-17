
import React from 'react';
import ContentList from '../../../../../components/ContentList';
import PaginationButton from '../../../../../components/other/PaginationButton';

const MoviesContentPages = async ({ params }) => {
  const { page } = params
  const response = await getMoviesContentPagesData(page);
  const data = response.moviesContentPage;
  const totalPages = data[0].totalPages;

  return (
    <div>
      <ContentList contents={data} />
      <PaginationButton totalPages={totalPages} page={page} category={"movies"} />
    </div>
  );
};

export async function getMoviesContentPagesData(page) {
  const apiKey = process.env.API_KEY;
  try {
    const response = await fetch(`${apiKey}/api/blogs/?category=content_movies&page=${page}`, { cache: 'no-cache' });
    const moviesContentPage = await response.json();
    return {
      moviesContentPage,
    };
  } catch (error) {
    return {
      moviesContentPage: [],
    };
  }
}

export default MoviesContentPages;
