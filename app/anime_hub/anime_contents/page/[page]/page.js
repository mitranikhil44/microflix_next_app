import AnimePaginationButton from '@/components/other/AnimePaginationButton';
import FetchSSRData from '@/components/other/FetchSSRData';
import AnimeContentList from '@/components/AnimeContentList';
import AnimeCategoryData from '@/components/other/AnimeCategoryData';

const AnimeHub = async ({params}) => {
  const { page } = params
  const { contents } = await FetchSSRData(page, "anime_contents");
  const totalPages = contents[0]?.totalPages;

  return (
    <div>
      <AnimeCategoryData/>
      <AnimeContentList contents={contents} />
      <AnimePaginationButton totalPages={totalPages} page={page} category={"anime_contents"} />
    </div>
  );
};

export default AnimeHub;
