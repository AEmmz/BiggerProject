// /api/new-meetup/
import { MongoClient } from "mongodb";

const handler = async (req, res, next) => {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://aemmerling:Laangels27@cluster0.ls6ot.mongodb.net/NextJSTest"
    );
    const database = client.db();
    const nextJsCollection = database.collection("NextJSTest");

    const result = await nextJsCollection.insertOne(data);
    console.log(result);
    await client.close();

    res.status(201).json({ message: "Meetup Inserted" });
  }
};

export default handler;
