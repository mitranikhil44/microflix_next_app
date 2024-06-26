import PaginationButton from '@/components/other/PaginationButton';
import FetchSSRData from '@/components/other/FetchSSRData';
import dynamic from 'next/dynamic';
import CategoryData from '@/components/other/CategoryData';

const DynamicContentList = dynamic(() => import('@/components/ContentList'), {
  ssr: true,
});

const TopContets = async () => {
  const page = 1;
  const { contents } = await FetchSSRData(page, "top_contents");
  const totalPages = contents[0]?.totalPages;

  return (
    <>
    <CategoryData/>
      <DynamicContentList contents={contents} />
      <PaginationButton totalPages={totalPages} page={page} category={"top_contents"} />
    </>
  );
};

export default TopContets;
