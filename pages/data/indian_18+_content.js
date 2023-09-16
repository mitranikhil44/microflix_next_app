import ContentList from '../../components/ContentList';

const Indian_18_Content = ({ initialMovies }) => {
  return (
    <div>
      <ContentList category="bollywood/adult" initialMovies={initialMovies.data} />
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const data = await fetch(`http://localhost:3000/api/blogs/?category=bollywood/adult&skip=0&limit=12`);
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

export default Indian_18_Content;
