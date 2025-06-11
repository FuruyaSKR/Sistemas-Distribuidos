const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

// 1) Carrega o proto
const packageDef = protoLoader.loadSync(__dirname + "/protos/vaccine.proto", {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
});
const { VaccineService } = grpc.loadPackageDefinition(packageDef).vaccine;

// 2) Cria o client apontando para sua API
const client = new VaccineService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

// 3) Payload de exemplo
const req = {
  name: "Maria da Silva",
  cpf: "12345678900",
  vType: "Febre Amarela",
  date: new Date().toISOString(),
};

// 4) Chama o método
client.RegisterVaccine(req, (err, res) => {
  if (err) return console.error("gRPC error:", err);
  console.log("gRPC response:", res);
});
