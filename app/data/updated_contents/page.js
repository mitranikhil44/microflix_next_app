import PaginationButton from '@/components/other/PaginationButton';
import FetchSSRData from '@/components/other/FetchSSRData';
import dynamic from 'next/dynamic';
import CategoryData from '@/components/other/CategoryData';

const DynamicContentList = dynamic(() => import('@/components/ContentList'), {
  ssr: true,
});

const UpdatedContents = async () => {
  const page = 1;
  const { contents } = await FetchSSRData(page, "updated_contents");
  const totalPages = contents[0]?.totalPages
  
  return (
    <div>
      <CategoryData/>
      <DynamicContentList contents={contents} />
      <PaginationButton totalPages={totalPages} page={page} category={"updated_contents"} />
    </div>
  );
};

export default UpdatedContents;
