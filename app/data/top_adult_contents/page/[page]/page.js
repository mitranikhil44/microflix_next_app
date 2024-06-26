import PaginationButton from '@/components/other/PaginationButton';
import FetchSSRData from '@/components/other/FetchSSRData';
import dynamic from 'next/dynamic';
import CategoryData from '@/components/other/CategoryData';

const DynamicContentList = dynamic(() => import('@/components/ContentList'), {
  ssr: true,
});

const TopAdultContetPages = async ({ params }) => {
  const { page } = params
  const { contents } = await FetchSSRData(page, "top_content_adult");
  const totalPages = contents[0]?.totalPages;

  return (
    <>
    <CategoryData/>
      <DynamicContentList contents={contents} />
      <PaginationButton totalPages={totalPages} page={page} category={"top_adult_contents"} />
    </>
  );
};

export default TopAdultContetPages;
