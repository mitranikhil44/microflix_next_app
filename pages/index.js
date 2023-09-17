import MoviesCollection from "../components/Movie_Collection";

export default function Home(props) {
  const { hollywoodData, hollywoodAdultData, bollywoodData, bollywoodAdultData } = props;

  return (
    <main>
      <MoviesCollection data={hollywoodData.data} collectionName={"Other Country Content"} linkPath="/data/other_country_content" />
      <MoviesCollection data={hollywoodAdultData.data} collectionName={"Other Country 18+ Content"} linkPath="/data/other_country_18+_content" />
      <MoviesCollection data={bollywoodData.data} collectionName={"Indian Content"} linkPath="/data/indian_content" />
      <MoviesCollection data={bollywoodAdultData.data} collectionName={"Indian 18+ Content"} linkPath="/data/indian_18+_content" />
    </main>
  );
}

export async function getServerSideProps() {
  try {
    const fetchData = async (category, skip, limit) => {
      const response = await fetch(`https://microflix-next-app.vercel.app/api/blogs/?category=${category}&skip=${skip}&limit=${limit}`);
      return await response.json();
    };

    const [hollywoodData, hollywoodAdultData, bollywoodData, bollywoodAdultData] = await Promise.all([
      await fetchData("hollywood", 0, 24),
      await fetchData("hollywood/adult", 0, 24),
      await fetchData("bollywood", 0, 24),
      await fetchData("bollywood/adult", 0, 24),
    ]);

    return {
      props: { hollywoodData, bollywoodData, hollywoodAdultData, bollywoodAdultData },
    };

  } catch (error) {
    console.error("Error:", error);
    return {
      props: {
        hollywoodData: { data: [] },
        bollywoodData: { data: [] },
        hollywoodAdultData: { data: [] },
        bollywoodAdultData: { data: [] },
      },
    };
  }
}
