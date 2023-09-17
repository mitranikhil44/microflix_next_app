import ContentList from '../../components/ContentList';

const Other_Country_Content = ({ initialContents }) => {
  return (
    <div>
      <ContentList category="hollywood" initialContents={initialContents.data} />
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const data = await fetch(`https://microflix-next-app.vercel.app/api/blogs/?category=hollywood&skip=0&limit=12`);
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

export default Other_Country_Content;
