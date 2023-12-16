import React from 'react';
import ContentList from '../../../components/ContentList';

const Movies = async () => {
  const response = await serverSideProps();
  const data = response.props.initialContents[0].data
  return (
    <div>
      <ContentList category="content_seasons" initialContents={data} />
    </div>
  );
};

async function fetchData(apiKey) {
  const response = await fetch(`${apiKey}/api/blogs/?category=content_seasons&page=1`, {cache: 'no-cache'});
  const data = await response.json();
  return data;
}

export async function serverSideProps() {
  const apiKey = process.env.API_KEY;
  try {
    const movies = await fetchData(apiKey);
    return {
      props: {
        initialContents: movies,
      },
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      props: {
        initialContents: [], // Provide a default empty array if there's an error
      },
    };
  }
}

export default Movies;


