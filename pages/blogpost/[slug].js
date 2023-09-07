import React, { useState } from 'react';

export default function BlogPost(props) {
  const [blog, setBlog] = useState(props.myBlog);
  function createMarkup(content) {
    return { __html: content };
  }

  return (
    <div className="flex flex-col justify-center  items-center py-6 px-4">
      <div className="cropped-image">
        <img src={blog.image} alt="Image" className="p-3 border-2 border-gray-300 rounded-lg shadow-md mb-4" />
      </div>
      <h4 className="text-lg font-semibold my-4 text-center text-white">{blog.title}</h4>
      <hr />
      <div>
        {blog && <div className="text-xs xs:text-sm md:text-base contentClass space-y-6 text-gray-700" dangerouslySetInnerHTML={createMarkup(blog.content)}></div>}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const { slug } = context.query;
    const data = await fetch(`https://microflix-next-app.vercel.app/api/getblogs/?slug=${slug}`);
    const ads = await fetch(`https://microflix-next-app.vercel.app/api/getads`);
    const myBlog = await data.json();
    const myAds = await ads.json();
    return {
      props: { myBlog, myAds },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
