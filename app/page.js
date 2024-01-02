import React from "react";
import MoviesCollection from "../components/Movie_Collection";
import LatestContents from "../components/LatestContents";

export default async function Home() {
  const contentsData = await fetchContents("contents");
  const contents = contentsData[0].data
  const latestData = await fetchContents("latest_contents");
  const latestContents = latestData[0].data
  return (
    <>
    <header>
      <LatestContents data={latestContents}/>
    </header>
    <section>      
        <MoviesCollection
          data={contents}
          collectionName="Contents"
          />
          </section>
    </>
  );
}

const fetchContents = async (category) =>{
  const apiKey = process.env.API_KEY
  const response = await fetch(`${apiKey}api/blogs/?category=${category}&page=1`, {cache: "no-store"});
  const data = await response.json();
  return data
}