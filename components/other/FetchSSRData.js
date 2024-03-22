const FetchSSRData = async (page, cateogry) => {
  const response = await ContentData(page, cateogry);
  return response;
}

export async function ContentData(page, cateogry) {
  const apiKey = process.env.API_KEY;
  try {
    const response = await fetch(`${apiKey}/api/blogs/?category=${cateogry}&page=${page}`, { cache: "reload" });
    const contents = await response.json();
    return {
      contents,
    };
  } catch (error) {
    return {
      contents: [],
    };
  }
}

export default FetchSSRData;