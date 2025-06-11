const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");
require("dotenv").config();

const connectMongo = require("./config/db");
const { registrarVacina, buscarVacina } = require("./services/vacinaService");

const PROTO_PATH = path.join(__dirname, "proto", "vacina.proto");
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const proto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

server.addService(proto.VaccineService.service, {
  RegisterVaccine: async (call, callback) => {
    const { cpf, tipo, data } = call.request;
    try {
      const result = await registrarVacina(cpf, tipo, data);
      callback(null, result);
    } catch (error) {
      callback(error);
    }
  },

  GetVaccine: async (call, callback) => {
    const { cpf, index } = call.request;
    try {
      const result = await buscarVacina(cpf, index);
      callback(null, result);
    } catch (error) {
      callback(error);
    }
  },
});

const PORT = "0.0.0.0:50051";

connectMongo().then(() => {
  server.bindAsync(PORT, grpc.ServerCredentials.createInsecure(), () => {
    console.log(`🟢 Servidor gRPC rodando em ${PORT}`);
  });
});
