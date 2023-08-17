import * as fs from "fs";

export default async function handler(req, res){
    if(req.method === "POST"){
        let data = await fs.promises.readdir("contact_us");
        fs.promises.writeFile(`contact_us/${data.length + 1}.json`, JSON.stringify(req.body))
        res.status(404).json([{"Success": "Thank You"}]);
    }else{
        res.status(404).json([{"Error": "Some Error Occered"}]);
    }
} 