
import React from 'react';
import ContentList from '../../../components/ContentList';
import PaginationButton from '../../../components/other/PaginationButton';

const TopWebSeriesContents = async () => {
  const response = await getTopWebSeriesContentsData();
  const data = response.topWebSeriesContents;
  const totalPages = data[0].totalPages;

  return (
    <div>
      <ContentList contents={data} />
      <PaginationButton totalPages={totalPages} page={1} category={"top_web_series"} />
    </div>
  );
};

export async function getTopWebSeriesContentsData() {
  const apiKey = process.env.API_KEY;
  try {
    const response = await fetch(`${apiKey}/api/blogs/?category=top_content_seasons&page=1`, { cache: 'no-cache' });
    const topWebSeriesContents = await response.json();
    return {
      topWebSeriesContents,
    };
  } catch (error) {
    return {
      topWebSeriesContents: [],
    };
  }
}

export default TopWebSeriesContents;
