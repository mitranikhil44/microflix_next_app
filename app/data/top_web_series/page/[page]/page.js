import PaginationButton from '@/components/other/PaginationButton';
import FetchSSRData from '@/components/other/FetchSSRData';
import dynamic from 'next/dynamic';

const DynamicContentList = dynamic(() => import('@/components/ContentList'), {
  ssr: true,
});

const TopWebSeriesContentPages = async ({ params }) => {
  const { page } = params
  const { contents } = await FetchSSRData(page, "top_content_seasons");
  const totalPages = contents[0]?.totalPages;

  return (
    <div>
      <DynamicContentList contents={contents} />
      <PaginationButton totalPages={totalPages} page={page} category={"top_web_series"} />
    </div>
  );
};

export default TopWebSeriesContentPages;
