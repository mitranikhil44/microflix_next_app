import React from "react";
import MoviesCollection from "../components/Movie_Collection";

const categoriesConfig = [
  { category: "contents", label: "Contents" },
  { category: "top_contents", label: "Top Contents" },
  { category: "content_movies", label: "Movies" },
  { category: "top_content_movies", label: "Top Movies" },
  { category: "content_seasons", label: "Web Series" },
  { category: "top_content_seasons", label: "Top Web Series" },
  { category: "content_adult", label: "18+ Contents" },
  { category: "top_content_adult", label: "Top 18+ Contents" },
];

export default async function Home() {
  const response = await backendData();
  const data = response.props.data;
  return (
    <main>
      <div className="text-lg">This page is under construction please explore other pages</div>
      {/* {categoriesConfig.map((config, index) => (
        <MoviesCollection
          key={index + 1}
          data={data[config.category][0].data}
          collectionName={config.label}
          linkPath={`/data/${config.category}`}
        />
      ))} */}

    </main>
  );
}

async function fetchData(category, apiKey) {
  const response = await fetch(`${apiKey}/api/blogs/?category=${category}&page=1`, {
    headers: {
      'Cache-Control': 'no-store',
    },
  });

  if (response.ok) {
    const data = await response.json();
    return { [category]: data };
  } else {
    console.error(`Error while fetching data for ${category}: ${response.statusText}`);
    return { [category]: { error: 'Error while fetching data' } };
  }
}

export async function backendData() {
  const apiKey = process.env.API_KEY || "https://microflix.vercel.app/";
  const promises = categoriesConfig.map((config) => fetchData(config.category, apiKey));

  try {
    const results = await Promise.all(promises);
    const data = results.reduce((acc, result) => ({ ...acc, ...result }), {});
    return { props: { data } };
  } catch (error) {
    console.error("Error:", error);
    return { props: { data: {} } };
  }
}