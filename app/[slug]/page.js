import Head from "next/head";
import Image from "next/image";

export default async function Content_Post({ params }) {
  let response = await getContentData(params);
  const content = response.content
  function createMarkup(content) {
    return { __html: content };
  }
  return (
    <>
      <Head>
        <title>{content.slug}</title>
      </Head>
      <div
        className="flex flex-col justify-center items-center py-6 px-4 text-xs xs:text-sm md:text-base contentClass text-gray-700"
        dangerouslySetInnerHTML={createMarkup(content.content)}
      ></div>
    </>
  );
} 

export async function getContentData(params) {
  const apiKey = process.env.API_KEY;
  try {
    const { slug } = params;
    const data = await fetch(`${apiKey}api/getblogs/?slug=${slug}`);
    const myContent = await data.json();
    return myContent;
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
