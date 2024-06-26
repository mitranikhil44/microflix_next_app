import PaginationButton from '@/components/other/PaginationButton';
import FetchSSRData from '@/components/other/FetchSSRData';
import dynamic from 'next/dynamic';
import CategoryData from '@/components/other/CategoryData';

const DynamicContentList = dynamic(() => import('@/components/ContentList'), {
  ssr: true,
});

export default async function PageContent({ params }) {
  const { page } = params;
  const { contents } = await FetchSSRData(page, "contents");
  const totalPages = contents[0]?.totalPages;

  return (
    <>
    <CategoryData/>
      <DynamicContentList category="contents" contents={contents} />
      <PaginationButton totalPages={totalPages} page={page} category={"contents"} />
    </>
  );
}

