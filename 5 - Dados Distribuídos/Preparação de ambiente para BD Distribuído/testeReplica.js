const { MongoClient } = require("mongodb");

const uri = "mongodb://mongo1:27017,mongo2:27017,mongo3:27017/?replicaSet=rs0";
const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();

    const db = client.db("testeReplica");
    const collection = db.collection("usuarios");

    const novoUsuario = {
      nome: "TesteNodeJS",
      papel: "validador",
    };

    await collection.insertOne(novoUsuario);
    console.log("Documento inserido com sucesso:", novoUsuario);

    const usuarios = await collection.find().toArray();
    console.log("Usuários encontrados no banco:");
    console.table(usuarios);
  } catch (err) {
    console.error("Erro durante operação:", err);
  } finally {
    await client.close();
  }
}

main();
