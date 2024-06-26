import PaginationButton from '@/components/other/PaginationButton';
import FetchSSRData from '@/components/other/FetchSSRData';
import dynamic from 'next/dynamic';
import CategoryData from '@/components/other/CategoryData';

const DynamicContentList = dynamic(() => import('@/components/ContentList'), {
  ssr: true,
});

export default async function AdultPageContent({ params }) {
  const { page } = params;
  const { contents } = await FetchSSRData(page, "content_adult");
  const totalPages = contents[0]?.totalPages
  return (
    <>
    <CategoryData/>
     <DynamicContentList contents={contents} />
     <PaginationButton totalPages={totalPages} page={page} category={"adult_contents"} />
    </>
  );
}