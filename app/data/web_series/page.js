import PaginationButton from '@/components/other/PaginationButton';
import FetchSSRData from '@/components/other/FetchSSRData';
import ContentList from '@/components/ContentList';
import CategoryData from '@/components/other/CategoryData';

const WebSeriesContents = async () => {
  const page = 1;
  const { contents } = await FetchSSRData(page, "content_seasons");
  const totalPages = contents[0]?.totalPages;

  return (
    <>
    <CategoryData/>
      <ContentList contents={contents} />      
      <PaginationButton totalPages={totalPages} page={1} category={"web_series"} />
    </>
  );
};

export default WebSeriesContents;
