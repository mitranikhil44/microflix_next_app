
import ContentList from "@/components/ContentList";
import PaginationButton from '../../../../../components/other/PaginationButton';

export default async function AdultPageContent({ params }) {
  const { page } = params;
  let response = await getAdultPageContentData(page);
  const data = response.adultPageContents;
  const totalPages = data[0].totalPages;
  return (
    <>
     <ContentList contents={data} />
     <PaginationButton totalPages={totalPages} page={page} category={"18+_contents"} />
    </>
  );
}

export async function getAdultPageContentData(page) {
  const apiKey = process.env.API_KEY;
  try {
    const response = await fetch(`${apiKey}/api/blogs/?category=content_adult&page=${page}`);
    const adultPageContents = await response.json();
    return {
      adultPageContents,
    };
  } catch (error) {
    return {
      adultPageContents: [],
    };
  }
}
