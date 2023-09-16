import ContentList from '../../components/ContentList';

const Web_series = ({ initialContents }) => {
  return (
    <div>
      <ContentList category="hollywood/seasons" initialContents={initialContents.data} />
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const data = await fetch(`http://localhost:3000/api/blogs/?category=hollywood/seasons&skip=0&limit=12`);
    const seasons = await data.json();
    return {
      props: { initialContents: seasons },
    };
  } catch (error) {
    return {
      props: {
        initialContents: { files: [], count: 0, total: 0 },
      },
    };
  }
}

export default Web_series;
