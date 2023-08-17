import React, { useState } from 'react';
import Link from 'next/link';
import fs from "fs/promises";
import InfiniteScroll from 'react-infinite-scroll-component';

const Blog = (props) => {
  const [blogs, setBlogs] = useState(props.allBlogs.slice(0,6));
  const blogsLength = blogs.length;
  const [count, setCount] = useState(blogsLength);

const moreData = async () => {
  setTimeout(() => {
    fetchMoreData();
  }, 1500);
}
const fetchMoreData = async () => {
  try {
    const updatedCount = count + 6;
    const data = await fetch(`http://localhost:3000/api/blogs/?count=${updatedCount}`);
    const parsedData = await data.json();
    setCount(updatedCount); // Update the count state
    setBlogs([...blogs, ...parsedData]); // Use functional update for blogs state
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

  return (
    <div className="py-6 w-5/6 px-4 mx-auto">
    <InfiniteScroll
        dataLength={blogs.length}
        next={moreData}
        hasMore={props.allCount !== blogsLength}
        loader={<h4 className="text-center py-4">Loading...</h4>}
      >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 ">
          {blogs && blogs.map((element) => (
            <Link key={element.key} href={`/blogpost/${element.key}`}>
              <div className="bg-slate-50 relative overflow-hidden rounded-lg shadow-lg hover:scale-105 cursor-pointer transition-transform duration-300 ease-in-out 2xl:h-[38rem] lg:h-[28rem] md:h-[30rem] h-[30rem]">
                <div className="h-72 md:h-64 lg:h-56 2xl:h-96 p-5 sm:p-6 overflow-hidden flex items-center justify-center">
                  <img
                    src={element.image}
                    alt="Image"
                    className="object-cover w-full bg-white"
                  />
                </div>
                <div className="p-4">
                  <h4 className="text-lg font-semibold mb-2">{element.title}</h4>
                  <p className="text-gray-600 overflow-y-auto max-h-36">{element.introduction}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export async function getStaticProps() {
  try {
    let files = await fs.readdir("blogdata");
    const allCount = files.length;
    const allBlogs = await Promise.all(
      files.map(async (item) => {
        const data = await fs.readFile(`blogdata/${item}`, "utf-8");
        return JSON.parse(data);
      })
    );
    return {
      props: { allBlogs, allCount },
    };
  } catch (error) {
    return {
      props: {
        allBlogs: [], // Return an empty array or handle the error appropriately
        allCount: 0,
      },
    };
  }
}

export default Blog;
