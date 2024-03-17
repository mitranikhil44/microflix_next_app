
import React from 'react';
import ContentList from '../../../components/ContentList';
import PaginationButton from '../../../components/other/PaginationButton';

const Contents = async () => {
  const response = await getContentData();
  const data = response.contents;
  const totalPages = data[0].totalPages;

  return (
    <div>
      <ContentList contents={data} />
      <PaginationButton totalPages={totalPages} page={1} category={"contents"} />
    </div>
  );
};

export async function getContentData() {
  const apiKey = process.env.API_KEY;
  try {
    const response = await fetch(`${apiKey}/api/blogs/?category=contents&page=1`, {cache: 'no-cache'});
    const contents = await response.json();
    return {
      contents,
    };
  } catch (error) {
    return {
      contents: [],
    };
  }
}

export default Contents;
