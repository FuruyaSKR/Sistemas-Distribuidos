const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");

const PROTO_PATH = path.join(__dirname, "../proto/vacina.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const proto = grpc.loadPackageDefinition(packageDefinition);

const client = new proto.VaccineService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

module.exports = client;
