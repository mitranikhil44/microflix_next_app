import PaginationButton from '@/components/other/PaginationButton';
import FetchSSRData from '@/components/other/FetchSSRData';
import dynamic from 'next/dynamic';
import CategoryData from '@/components/other/CategoryData';

const DynamicContentList = dynamic(() => import('@/components/ContentList'), {
  ssr: true,
});

const MoviesContent = async () => {
  const page = 1;
  const { contents } = await FetchSSRData(page, "content_movies");
  const totalPages = contents[0]?.totalPages;
  
  return (
    <div>
      <CategoryData/>
      <DynamicContentList contents={contents} />
      <PaginationButton totalPages={totalPages} page={page} category={"movies"} />
    </div>
  );
};

export default MoviesContent;
