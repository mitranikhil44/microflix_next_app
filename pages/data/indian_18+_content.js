import ContentList from '../../components/ContentList';

const Indian_18_Content = ({ initialContents }) => {
  return (
    <div>
      <ContentList category="bollywood/adult" initialContents={initialContents.data} />
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const data = await fetch(`https://microflix-next-app.vercel.app/api/blogs/?category=bollywood/adult&skip=0&limit=12`);
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

export default Indian_18_Content;
