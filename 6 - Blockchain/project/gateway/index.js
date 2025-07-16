const express = require("express");
const cors = require("cors");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

// Carrega o .proto
const packageDef = protoLoader.loadSync(__dirname + "/protos/vaccine.proto", {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const { VaccineService } = grpc.loadPackageDefinition(packageDef).vaccine;

// Instancia o client gRPC
const client = new VaccineService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

const app = express();
app.use(cors());
app.use(express.json());

// Endpoint REST para registrar vacina
app.post("/registrar-vacina", (req, res) => {
  console.log(req.body); // <- Veja o que chega do front
  const { cpf, tipo, data } = req.body;
  const payload = {
    name: "Usuário",
    cpf,
    vType: tipo,
    date: data, // <-- nome igual ao campo do front
  };
  client.RegisterVaccine(payload, (err, reply) => {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
    res.json(reply);
  });
});

// Endpoint REST para listar vacinas por CPF
app.get("/vacinas", (req, res) => {
  // Para listar todas, só chame sem filtro. Para filtrar por CPF, filtre depois no front.
  client.ListVaccines({}, (err, reply) => {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
    // Filtra por CPF (se vier na query)
    const cpfBusca = req.query.cpf;
    let vacinas = reply.vaccines || [];
    if (cpfBusca) {
      vacinas = vacinas.filter((v) => v.cpf === cpfBusca);
    }
    // Renomeia para manter compatibilidade com seu front
    vacinas = vacinas.map((v) => ({
      cpf: v.cpf,
      tipo: v.vType,
      data: v.date,
      txHash: v.txHash,
      name: v.name,
    }));
    res.json(vacinas);
  });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log("REST Gateway ouvindo em http://localhost:" + PORT);
});
