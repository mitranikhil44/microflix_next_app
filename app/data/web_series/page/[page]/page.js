
import React from 'react';
import ContentList from '../../../../../components/ContentList';
import PaginationButton from '../../../../../components/other/PaginationButton';

const WebSeriesContentPages = async ({ params }) => {
  const { page } = params
  const response = await getWebSeriesContentPagesData(page);
  const data = response.webSeriesContentPages;
  const totalPages = data[0].totalPages;

  return (
    <div>
      <ContentList contents={data} />
      <PaginationButton totalPages={totalPages} page={page} category={"web_series"} />
    </div>
  );
};

export async function getWebSeriesContentPagesData(page) {
  const apiKey = process.env.API_KEY;
  try {
    const response = await fetch(`${apiKey}/api/blogs/?category=content_seasons&page=${page}`, { cache: 'no-cache' });
    const webSeriesContentPages = await response.json();
    return {
      webSeriesContentPages,
    };
  } catch (error) {
    return {
      webSeriesContentPages: [],
    };
  }
}

export default WebSeriesContentPages;
