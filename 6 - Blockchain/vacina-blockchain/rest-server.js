const express = require("express");
const connectMongo = require("./config/db");
const vacinaService = require("./services/vacinaService");
const Vacinacao = require("./models/Vacinacao");
require("dotenv").config();

const app = express();
const PORT = process.env.REST_PORT || 3000;

app.use(express.json());

app.post("/registrar-vacina", async (req, res) => {
  const { cpf, tipo, data } = req.body;
  try {
    const resultado = await vacinaService.registrarVacina(cpf, tipo, data);
    res.json(resultado);
  } catch (err) {
    console.error("Erro ao registrar vacina:", err);
    res.status(500).json({ erro: "Erro ao registrar vacina" });
  }
});

app.get("/vacinacoes", async (req, res) => {
  try {
    const vacinas = await Vacinacao.find().sort({ timestamp: -1 });
    res.json(vacinas);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar vacinas" });
  }
});

// Inicia o servidor
connectMongo().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor REST rodando em http://localhost:${PORT}`);
  });
});
