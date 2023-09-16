import ContentList from '../../components/ContentList';

const Other_Country_Content = ({ initialMovies }) => {
  return (
    <div>
      <ContentList category="hollywood" initialMovies={initialMovies.data} />
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const data = await fetch(`http://localhost:3000/api/blogs/?category=hollywood&skip=0&limit=12`);
    const movies = await data.json();
    return {
      props: { initialMovies: movies },
    };
  } catch (error) {
    return {
      props: {
        initialMovies: { files: [], count: 0, total: 0 },
      },
    };
  }
}

export default Other_Country_Content;
