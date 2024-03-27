const FetchSSRData = async (page, cateogry) => {
  const response = await ContentData(page, cateogry);
  return response;
}

export async function ContentData(page, cateogry) {
  const apiKey = process.env.API_KEY;
  try {
    const response = await fetch(`${apiKey}/api/blogs/?cateogry=${cateogry}&page=${page}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' 
      },
      cache: 'reload'
    });
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