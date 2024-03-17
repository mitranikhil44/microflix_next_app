
import React from 'react';
import ContentList from '../../../../../components/ContentList';
import PaginationButton from '../../../../../components/other/PaginationButton';

const TopAdultContetPages = async ({ params }) => {
  const { page } = params
  const response = await getTopAdultContentPagesData(page);
  const data = response.topAdultContentPages;
  const totalPages = data[0].totalPages;

  return (
    <div>
      <ContentList contents={data} />
      <PaginationButton totalPages={totalPages} page={page} category={"top_18+_contents"} />
    </div>
  );
};

export async function getTopAdultContentPagesData(page) {
  const apiKey = process.env.API_KEY;
  try {
    const response = await fetch(`${apiKey}/api/blogs/?category=top_content_adult&page=${page}`, { cache: 'no-cache' });
    const topAdultContentPages = await response.json();
    return {
      topAdultContentPages,
    };
  } catch (error) {
    return {
      topAdultContentPages: [],
    };
  }
}

export default TopAdultContetPages;
