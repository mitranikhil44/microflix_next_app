import fs from "fs/promises";

export default async function handler(req, res) {
  try {
    const { slug } = req.query;
    const data = await fs.readFile(`blogdata/${slug}.json`, "utf-8");
    const jsonData = JSON.parse(data);
    res.status(200).json(jsonData);
  } catch (error) {
    res.status(500).json({ error: "No Blogs Found" });
  }
}
