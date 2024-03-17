
import React from 'react';
import ContentList from '../../../../../components/ContentList';
import PaginationButton from '../../../../../components/other/PaginationButton';

const TopWebSeriesContentPages = async ({ params }) => {
  const { page } = params
  const response = await getTopWebSeriesContentPagesData(page);
  const data = response.topWebSeriesContentPages;
  const totalPages = data[0].totalPages;

  return (
    <div>
      <ContentList contents={data} />
      <PaginationButton totalPages={totalPages} page={page} category={"top_web_series"} />
    </div>
  );
};

export async function getTopWebSeriesContentPagesData(page) {
  const apiKey = process.env.API_KEY;
  try {
    const response = await fetch(`${apiKey}/api/blogs/?category=top_content_seasons&page=${page}`, { cache: 'no-cache' });
    const topWebSeriesContentPages = await response.json();
    return {
      topWebSeriesContentPages,
    };
  } catch (error) {
    return {
      topWebSeriesContentPages: [],
    };
  }
}

export default TopWebSeriesContentPages;
