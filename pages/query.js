import { useRouter } from 'next/router';
import Link from 'next/link';

const QueryPage = () => {
  const router = useRouter();
  const { data, searchResult } = router.query;

  const parsedSearchResult = searchResult ? JSON.parse(searchResult) : { suggestions: [] };

  return (
    <>
      <h1><strong>Movie Results for: </strong>{data}</h1>
      <div className="grid grid-cols-2 mt-4 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 overflow-hidden">
        {parsedSearchResult && parsedSearchResult.suggestions.map((element) => (
          <Link key={element.slug} href={`/content/${element.slug}`}>
            <div className="to-black relative overflow-hidden rounded-lg shadow-lg hover:scale-105 cursor-pointer transition-transform duration-300 ease-in-out h-[100%]">
              <div className="w-full overflow-hidden flex items-center justify-center cropped-image">
                <img
                  src={element.image}
                  alt="Image"
                  className="object-cover w-full"
                />
              </div>
              <div className="text-center mt-2">
                <h4 className="text-sm font-semibold mb-2">{element.title}</h4>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default QueryPage;
