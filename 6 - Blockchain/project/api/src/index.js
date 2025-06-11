// index.js

// 1. Imports e configuração inicial
require("dotenv").config();
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const mongoose = require("mongoose");
const { JsonRpcProvider, Contract } = require("ethers");

// 2. Conexão com MongoDB replicado
//    - URI no formato replicaSet
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error("Erro MongoDB:", err));

// 3. Definição do modelo Mongoose para vacina
const vaccineSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    cpf: { type: String, required: true },
    vType: { type: String, required: true },
    date: { type: Date, required: true },
    txHash: { type: String, required: true },
  },
  { collection: "vaccines" }
);

const VaccineModel = mongoose.model("Vaccine", vaccineSchema);

// 4. Carregamento do .proto e criação do package gRPC
const PROTO_PATH = __dirname + "/protos/vaccine.proto";
const packageDef = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const vaccineProto = grpc.loadPackageDefinition(packageDef).vaccine;

// 5. Conexão com Ethereum local (Hardhat) e instância do contrato
const artifact = require("./contractABI.json");
const contractABI = artifact.abi;
const provider = new JsonRpcProvider(process.env.ETH_RPC);
const contract = new Contract(
  process.env.CONTRACT_ADDRESS,
  contractABI,
  provider.getSigner()
);

// 6. Implementação do método gRPC RegisterVaccine
async function registerVaccine(call, callback) {
  const { name, cpf, vType, date } = call.request;
  try {
    // 6.1 Envia transação para o contrato
    const tx = await contract.register(name, cpf, vType, Date.parse(date));
    const receipt = await tx.wait(); // espera confirmação

    // 6.2 Persiste no Mongo com o hash da transação
    const record = await VaccineModel.create({
      name,
      cpf,
      vType,
      date: new Date(date),
      txHash: receipt.transactionHash,
    });

    // 6.3 Retorna sucesso ao cliente gRPC
    callback(null, {
      success: true,
      txHash: receipt.transactionHash,
    });
  } catch (err) {
    console.error("Erro em registerVaccine:", err);
    callback({
      code: grpc.status.INTERNAL,
      message: err.message,
    });
  }
}

// 7. Criação e inicialização do servidor gRPC
function main() {
  const server = new grpc.Server();
  server.addService(vaccineProto.VaccineService.service, {
    RegisterVaccine: registerVaccine,
  });
  const bindAddress = "0.0.0.0:50051";
  server.bindAsync(
    bindAddress,
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) {
        console.error("gRPC bind error:", err);
        return;
      }
      console.log(`gRPC server rodando em ${bindAddress}`);
      server.start();
    }
  );
}

main();
