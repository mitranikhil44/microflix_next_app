import AnimePaginationButton from '@/components/other/AnimePaginationButton';
import FetchSSRData from '@/components/other/FetchSSRData';
import AnimeContentList from '@/components/AnimeContentList';
import AnimeCategoryData from '@/components/other/AnimeCategoryData';

const AnimeHub = async ({params}) => {
  const { page } = params
  const { contents } = await FetchSSRData(page, "anime_content_seasons");
  const totalPages = contents[0]?.totalPages;

  return (
    <div>
      <AnimeCategoryData/>
      <AnimeContentList contents={contents} />
      <AnimePaginationButton totalPages={totalPages} page={page} category={"anime_web_series"} />
    </div>
  );
};

export default AnimeHub;
