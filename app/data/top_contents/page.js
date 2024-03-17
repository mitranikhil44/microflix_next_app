
import React from 'react';
import ContentList from '../../../components/ContentList';
import PaginationButton from '../../../components/other/PaginationButton';

const TopContets = async () => {
  const response = await getTopContentsData();
  const data = response.topContents;
  const totalPages = data[0].totalPages;

  return (
    <div>
      <ContentList contents={data} />
      <PaginationButton totalPages={totalPages} page={1} category={"top_contents"} />
    </div>
  );
};

export async function getTopContentsData() {
  const apiKey = process.env.API_KEY;
  try {
    const response = await fetch(`${apiKey}/api/blogs/?category=top_contents&page=1`, { cache: 'no-cache' });
    const topContents = await response.json();
    return {
      topContents,
    };
  } catch (error) {
    return {
      topContents: [],
    };
  }
}

export default TopContets;
