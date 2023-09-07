import React, { useState } from "react";
import Movies_Collection from "../components/Movie_Collection"
export default function Home(props) {
  const [hollywood, setHollywood] = useState(props.parsedData.data || []);
  const [adult, setAdult] = useState(props.parseAdultData.data || []);
  return (
    <main>
      <Movies_Collection data={hollywood} collectionName={"Hollywood"} />
      <Movies_Collection data={adult} collectionName={"Adult"} />
    </main>
  )
}

export async function getServerSideProps() {
  try {
    const hollywood = await fetch(`https://microflix-next-app.vercel.app/api/blogs/?category=hollywood&skip=0&limit=24`);
    const adult = await fetch(`https://microflix-next-app.vercel.app/api/blogs/?category=hollywood/adult&skip=0&limit=24`);
    const parsedData = await hollywood.json();
    const parseAdultData = await adult.json();
    return {
      props: { parsedData, parseAdultData },
    };
  } catch (error) {
    return {
      props: {
        movies: { files: [], count: 0, total: 0 },
      },
    };
  }
}