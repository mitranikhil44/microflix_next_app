import PaginationButton from '@/components/other/PaginationButton';
import FetchSSRData from '@/components/other/FetchSSRData';
import dynamic from 'next/dynamic';

const DynamicContentList = dynamic(() => import('@/components/ContentList'), {
  ssr: false,
});

const AdultContents = async () => {
  const page = 1;
  const { contents } = await FetchSSRData(page, "content_adult");
  const totalPages = contents[0].totalPages;

  return (
    <div>
      <DynamicContentList contents={contents} />
      <PaginationButton totalPages={totalPages} page={page} category={"adult_contents"} />
    </div>
  );
};

export default AdultContents;
