
import React from 'react';
import ContentList from '../../../components/ContentList';
import PaginationButton from '../../../components/other/PaginationButton';

const TopAdultContets = async () => {
  const response = await getTopAdultContentsData();
  const data = response.topAdultContent;
  const totalPages = data[0].totalPages;

  return (
    <div>
      <ContentList contents={data} />
      <PaginationButton totalPages={totalPages} page={1} category={"top_18+_contents"} />
    </div>
  );
};

export async function getTopAdultContentsData() {
  const apiKey = process.env.API_KEY;
  try {
    const response = await fetch(`${apiKey}/api/blogs/?category=top_content_adult&page=1`, { cache: 'no-cache' });
    const topAdultContent = await response.json();
    return {
      topAdultContent,
    };
  } catch (error) {
    return {
      topAdultContent: [],
    };
  }
}

export default TopAdultContets;
