import Head from "next/head";
import Image from "next/image";

export default async function Content_Post({ params }) {
  let response = await getContentData(params);
  const content = response.content;

  function createMarkup(content) {
    return { __html: content };
  }

  const contentSceens = content.contentSceens.map((img, index) => (
    `<div class="rounded-md p-2 hover:scale-95 w-64"><Image key=${index + 1} src=${img} height={100} width={100} /></div>`
  ));
  
  const screenshotsHTML = `
    <div class="flex justify-center items-center flex-wrap">
      ${contentSceens.join('')}
    </div>
  `;

  const indexOfScreenshots = content.content.toLowerCase().indexOf("screenshots");

  const fullContentHTML = content.content.slice(0, indexOfScreenshots + 55) + screenshotsHTML + content.content.slice(indexOfScreenshots + 50);

  return (
    <>
      <Head>
        <title>{content.slug}</title>
        {/* Ads Script */}
        <script type='text/javascript' src='//pl17869772.toprevenuegate.com/84/84/ce/8484cef01a310a80e4ea6f32c0a15daa.js'></script>
      </Head>
      <div
        className="flex flex-col justify-center items-center py-6 px-4 text-xs xs:text-sm md:text-base contentClass text-gray-700"
        dangerouslySetInnerHTML={createMarkup(fullContentHTML)}
      ></div>
    </>
  );
}

export async function getContentData(params) {
  const apiKey = process.env.API_KEY;
  try {
    const { slug } = params;
    const data = await fetch(`${apiKey}api/getblogs/?slug=${slug}`, { cache: "no-store" });
    const myContent = await data.json();
    return myContent;
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
