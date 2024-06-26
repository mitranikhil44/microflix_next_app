import PaginationButton from '@/components/other/PaginationButton';
import FetchSSRData from '@/components/other/FetchSSRData';
import ContentList from '@/components/ContentList';
import CategoryData from '@/components/other/CategoryData';

const WebSeriesContentPages = async ({ params }) => {
  const { page } = params
  const { contents } = await FetchSSRData(page, "content_seasons");
  const totalPages = contents[0]?.totalPages;

  return (
    <>
    <CategoryData/>
      <ContentList contents={contents} />
      <PaginationButton totalPages={totalPages} page={page} category={"web_series"} />
    </>
  );
};

export default WebSeriesContentPages;
