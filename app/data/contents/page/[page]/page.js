import ContentList from "@/components/ContentList";
import PaginationButton from '../../../../../components/other/PaginationButton';
export default async function PageContent({ params }) {
  const { page } = params;
  let response = await getContentPageData(page);
  const data = response.pageContents;
  const totalPages = data[0].totalPages;

  return (
    <>
     <ContentList category="contents" contents={data} />
     <PaginationButton totalPages={totalPages} page={page} category={"contents"} />
    </>
  );
}

export async function getContentPageData(page) {
  const apiKey = process.env.API_KEY;
  try {
    const response = await fetch(`${apiKey}/api/blogs/?category=contents&page=${page}`, {cache: 'no-cache'});
    const pageContents = await response.json();
    return {
      pageContents,
    };
  } catch (error) {
    return {
      pageContents: [],
    };
  }
}
