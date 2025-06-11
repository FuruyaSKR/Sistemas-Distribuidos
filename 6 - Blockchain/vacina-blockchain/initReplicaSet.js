const { MongoClient } = require("mongodb");

const uri =
  "mongodb://localhost:27017,localhost:27018,localhost:27019/?replicaSet=rs0";

async function main() {
  const client = new MongoClient(uri);
  await client.connect();

  const admin = client.db("admin");

  const result = await admin.command({
    replSetInitiate: {
      _id: "rs0",
      members: [
        { _id: 0, host: "mongo1:27017" },
        { _id: 1, host: "mongo2:27017" },
        { _id: 2, host: "mongo3:27017" },
      ],
    },
  });

  console.log("Replica set iniciado:", result);
  await client.close();
}

main().catch(console.error);
