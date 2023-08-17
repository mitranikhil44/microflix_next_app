import fs from "fs/promises";

export default async function handler(req, res) {
  try {
    var files = await fs.readdir("blogdata");
    files = files.slice(req.query.count - 6, parseInt(req.query.count));
    const allBlogs = await Promise.all(
      files.map(async (item) => {
        const data = await fs.readFile(`blogdata/${item}`, "utf-8");
        return JSON.parse(data);
      })
    );
    res.status(200).json(allBlogs);
  } catch (error) {
    res.status(500).json({ error: "Error while fetching blogs" });
  }
}
