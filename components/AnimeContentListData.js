import AnimePaginationButton from '@/components/other/AnimePaginationButton';
import FetchSSRData from '@/components/other/FetchSSRData';
import AnimeContentList from '@/components/AnimeContentList';

const AnimeHub = async () => {
  const page = 1;
  const { contents } = await FetchSSRData(page, "anime_contents");
  const totalPages = contents[0]?.totalPages;

  return (
    <div>
      <AnimeContentList contents={contents} />
      <AnimePaginationButton totalPages={totalPages} page={page} category={"anime_contents"} />
    </div>
  );
};

export default AnimeHub;
