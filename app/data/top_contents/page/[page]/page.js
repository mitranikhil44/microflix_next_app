import PaginationButton from '@/components/other/PaginationButton';
import FetchSSRData from '@/components/other/FetchSSRData';
import dynamic from 'next/dynamic';

const DynamicContentList = dynamic(() => import('@/components/ContentList'), {
  ssr: false,
});

const TopContetPages = async ({ params }) => {
  const { page } = params
  const { contents } = await FetchSSRData(page, "top_contents");
  const totalPages = contents[0].totalPages;

  return (
    <div>
      <DynamicContentList contents={contents} />
      <PaginationButton totalPages={totalPages} page={page} category={"top_contents"} />
    </div>
  );
};

export default TopContetPages;
