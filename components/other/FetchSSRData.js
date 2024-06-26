const FetchSSRData = async (page, cateogry) => {
  const apiKey = process.env.API_KEY;
  try {
    const response = await fetch(
      `${apiKey}api/blogs?category=${cateogry}&page=${page}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store"
      }
    );
    const contents = await response.json();

    return {
      contents,
    };
  } catch (error) {
    return {
      contents: [],
    };
  }
};

export default FetchSSRData;