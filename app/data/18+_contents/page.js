import React from 'react';
import ContentList from '../../../components/ContentList';
import PaginationButton from '../../../components/other/PaginationButton';

const AdultContents = async () => {
  const response = await getAdultContentData();
  const data = response.adultContents;
  const totalPages = data[0].totalPages;

  return (
    <div>
      <ContentList contents={data} />
      <PaginationButton totalPages={totalPages} page={1} category={"18+_contents"} />
    </div>
  );
};

export async function getAdultContentData() {
  const apiKey = process.env.API_KEY;
  try {
    const response = await fetch(`${apiKey}/api/blogs/?category=content_adult&page=1`, {cache: 'no-cache'});
    const adultContents = await response.json();
    return {
      adultContents,
    };
  } catch (error) {
    return {
      adultContents: [],
    };
  }
}

export default AdultContents;
