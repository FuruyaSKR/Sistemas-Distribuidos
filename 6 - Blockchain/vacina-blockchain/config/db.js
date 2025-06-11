const mongoose = require("mongoose");
const uri = process.env.MONGODB_URI;

console.log("URI MongoDB:", process.env.MONGODB_URI);

async function connectMongo() {
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("✅ MongoDB conectado com sucesso!");
}

module.exports = connectMongo;
