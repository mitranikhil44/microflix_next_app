
import React from 'react';
import ContentList from '../../../components/ContentList';
import PaginationButton from '../../../components/other/PaginationButton';

const TopMoviesContent = async () => {
  const response = await getTopMoviesContentData();
  const data = response.topMoviesContent;
  const totalPages = data[0].totalPages;

  return (
    <div>
      <ContentList contents={data} />
      <PaginationButton totalPages={totalPages} page={1} category={"top_movies"} />
    </div>
  );
};

export async function getTopMoviesContentData(page) {
  const apiKey = process.env.API_KEY;
  try {
    const response = await fetch(`${apiKey}/api/blogs/?category=top_content_movies&page=1`, { cache: 'no-cache' });
    const topMoviesContent = await response.json();
    return {
      topMoviesContent,
    };
  } catch (error) {
    return {
      topMoviesContent: [],
    };
  }
}

export default TopMoviesContent;
