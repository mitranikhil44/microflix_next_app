import AnimePaginationButton from '@/components/other/AnimePaginationButton';
import FetchSSRData from '@/components/other/FetchSSRData';
import AnimeContentList from '@/components/AnimeContentList';
import AnimeCategoryData from '@/components/other/AnimeCategoryData';

const AnimeHub = async () => {
  const page = 1;
  const { contents } = await FetchSSRData(page, "top_anime_content_movies");
  const totalPages = contents[0]?.totalPages;

  return (
    <div>
      <AnimeCategoryData/>
      <AnimeContentList contents={contents} />
      <AnimePaginationButton totalPages={totalPages} page={page} category={"top_anime_movies"} />
    </div>
  );
};

export default AnimeHub;
