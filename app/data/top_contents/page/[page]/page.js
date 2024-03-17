
import React from 'react';
import ContentList from '../../../../../components/ContentList';
import PaginationButton from '../../../../../components/other/PaginationButton';

const TopContetPages = async ({ params }) => {
  const { page } = params
  const response = await getTopContentPagesData(page);
  const data = response.topContentPages;
  const totalPages = data[0].totalPages;

  return (
    <div>
      <ContentList contents={data} />
      <PaginationButton totalPages={totalPages} page={page} category={"top_contents"} />
    </div>
  );
};

export async function getTopContentPagesData(page) {
  const apiKey = process.env.API_KEY;
  try {
    const response = await fetch(`${apiKey}/api/blogs/?category=top_contents&page=${page}`, { cache: 'no-cache' });
    const topContentPages = await response.json();
    return {
      topContentPages,
    };
  } catch (error) {
    return {
      topContentPages: [],
    };
  }
}

export default TopContetPages;
