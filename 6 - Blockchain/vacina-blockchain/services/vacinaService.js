const { ethers } = require("ethers");
require("dotenv").config();
const fs = require("fs");
const path = require("path");

const Vacinacao = require("../models/Vacinacao");

const abiPath = path.resolve(
  __dirname,
  "../artifacts/contracts/VaccineRecord.sol/VaccineRecord.json"
);
const abi = JSON.parse(fs.readFileSync(abiPath)).abi;
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, abi, signer);

async function registrarVacina(cpf, tipo, data) {
  const tx = await contract.registrarVacina(cpf, tipo, data);
  await tx.wait();

  await Vacinacao.create({ cpf, tipo, data, txHash: tx.hash });

  return { status: "ok", txHash: tx.hash };
}

async function buscarVacina(cpf, index) {
  const [tipo, data] = await contract.buscarVacina(cpf, index);
  return { tipo, data };
}

module.exports = {
  registrarVacina,
  buscarVacina,
};
