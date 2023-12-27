import React from "react";
import MoviesCollection from "../components/Movie_Collection";

export default async function Home() {
  const data = await fetchContents("contents");
  const contents = data[0].data
  return (
    <main>
      <div className="text-lg">This page is under construction please explore other pages</div>
      {/* {contents && contents.map((elem, index) => (
        <MoviesCollection
        key={index + 1}
        data={elem}
        collectionName="Contents"
        linkPath={`/data/contents`}
        />
        ))} */}
    </main>
  );
}

const fetchContents = async (category) =>{
  const apiKey = process.env.API_KEY
  const response = await fetch(`${apiKey}api/blogs/?category=${category}&page=1`, {cache: "no-store"});
  const data = await response.json();
  return data
}