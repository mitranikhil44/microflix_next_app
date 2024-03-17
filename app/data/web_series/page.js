
import React from 'react';
import ContentList from '../../../components/ContentList';
import PaginationButton from '../../../components/other/PaginationButton';

const WebSeriesContents = async () => {
  const response = await getWebSeriesContentsData();
  const data = response.webSeriesContents;
  const totalPages = data[0].totalPages;

  return (
    <div>
      <ContentList contents={data} />
      <PaginationButton totalPages={totalPages} page={1} category={"web_series"} />
    </div>
  );
};

export async function getWebSeriesContentsData() {
  const apiKey = process.env.API_KEY;
  try {
    const response = await fetch(`${apiKey}/api/blogs/?category=content_seasons&page=1`, { cache: 'no-cache' });
    const webSeriesContents = await response.json();
    return {
      webSeriesContents,
    };
  } catch (error) {
    return {
      webSeriesContents: [],
    };
  }
}

export default WebSeriesContents;
