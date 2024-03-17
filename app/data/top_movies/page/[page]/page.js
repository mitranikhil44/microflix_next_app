
import React from 'react';
import ContentList from '../../../../../components/ContentList';
import PaginationButton from '../../../../../components/other/PaginationButton';

const TopMoviesContentPages = async ({ params }) => {
  const { page } = params
  const response = await getTopMoviesContentPagesData(page);
  const data = response.topMoviesContentPages;
  const totalPages = data[0].totalPages;

  return (
    <div>
      <ContentList contents={data} />
      <PaginationButton totalPages={totalPages} page={page} category={"top_movies"} />
    </div>
  );
};

export async function getTopMoviesContentPagesData(page) {
  const apiKey = process.env.API_KEY;
  try {
    const response = await fetch(`${apiKey}/api/blogs/?category=top_content_movies&page=${page}`, { cache: 'no-cache' });
    const topMoviesContentPages = await response.json();
    return {
      topMoviesContentPages,
    };
  } catch (error) {
    return {
      topMoviesContentPages: [],
    };
  }
}

export default TopMoviesContentPages;
