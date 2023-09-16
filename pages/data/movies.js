import ContentList from '../../components/ContentList';

const Movies = ({ initialContents }) => {
  return (
    <div>
      <ContentList category="hollywood/movies" initialContents={initialContents.data} />
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const data = await fetch(`http://localhost:3000/api/blogs/?category=hollywood/movies&skip=0&limit=12`);
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

export default Movies;
