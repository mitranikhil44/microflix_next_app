import ContentList from '../../components/ContentList';

const Indian_Content = ({ initialContents }) => {
  return (
    <div>
      <ContentList category="bollywood" initialContents={initialContents.data} />
    </div>
  );
};

export async function getServerSideProps() {
  const apiKey = process.env.API_KEY;
  try {
    const data = await fetch(`${apiKey}api/blogs/?category=bollywood&skip=0&limit=12`);
    const movies = await data.json();
    return {
      props: { initialContents: movies },
    };
  } catch (error) {
    return {
      props: {
        initialContents: { files: [], count: 0, total: 0 },
      },
    };
  }
}

export default Indian_Content;
