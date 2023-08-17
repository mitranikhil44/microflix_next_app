import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import fs from "fs/promises";

export default function BlogPost({ blog }) {
  function createMarkup(content) {
    return { __html: content };
  }
  return (
    <div className="flex flex-col items-center mt-8 absolute top-40 py-6 h-2/5 w-9/12 px-4">
      <img src={blog.image} alt="Image" className="p-3 w-1/4 border-2 border-gray-300 rounded-lg shadow-md mb-4" />
      <h4 className="text-2xl font-semibold my-4">{blog.title}</h4>
      <hr className="w-1/2 border-t-2 border-gray-300 my-4" />
        {blog && <div className="text-lg text-gray-700" dangerouslySetInnerHTML={createMarkup(blog.details)}></div>}
    </div>
  );
}


export async function getStaticPaths() {
  const files = await fs.readdir("blogdata");
  const slugs = files.map((item) => item.replace(".json", ""));
  const paths = slugs.map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  try {
    const { slug } = params;
    const data = await fs.readFile(`blogdata/${slug}.json`, "utf-8");
    const blog = JSON.parse(data);
    return {
      props: { blog },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
